"""The main Flask app that serve the different query send by the client"""
# !/usr/bin/python3
import datetime
import json
import logging.handlers

from bson import ObjectId
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_pymongo import PyMongo

DEBUG_APP = True
APP = Flask(__name__)
APP.config["MONGO_URI"] = "mongodb://localhost/budgetdb"
mongo = PyMongo(APP)
CORS(APP)

LOG_FILENAME = "flask-budget.log"
LOG_LEVEL = logging.DEBUG  # Could be e.g. "DEBUG" or "WARNING"
logger = logging.getLogger(__name__)
# Set the log level to LOG_LEVEL
logger.setLevel(LOG_LEVEL)
# Make a handler that writes to a file, making a new file at midnight and keeping 3 backups
handler = logging.handlers.TimedRotatingFileHandler(LOG_FILENAME, when="midnight", backupCount=3)
# Format each log message like this
formatter = logging.Formatter('%(asctime)s %(levelname)-8s %(message)s')
# Attach the formatter to the handler
handler.setFormatter(formatter)
# Attach the handler to the logger
logger.addHandler(handler)


class JSONEncoder(json.JSONEncoder):
    """ extend json-encoder class"""

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)

        return json.JSONEncoder.default(self, o)


# APP.json_encoder = JSONEncoder


@APP.route("/")
def hello():
    """Welcome function to test Flask"""
    return "Welcome to the budget server"


@APP.route('/add_account/', methods=['POST'])
def add_account(name):
    body_data = json.loads(request.form.get('json'))
    name = body_data['name']
    print(name)


@APP.route('/get_account_list/')
def get_account_list():
    account_list = mongo.db.accounts_list.find()
    print(account_list)
    json_response = {"IsSuccess": True, "Message": '', "ErrorType": '', "GeneralException": '',
                     "Payload": account_list}
    return jsonify(json_response)


@APP.route('/get_account_data/<account_id>')
def get_account_data(account_id=None):
    tango = mongo.db.tangos.find_one({"_id": ObjectId(account_id)})
    try:
        print(tango['path'])
        return send_file(tango['path'])
    except Exception as e:
        print(str(e))
        json_response = {"IsSuccess": False, "Message": '', "ErrorType": '', "GeneralException": str(e),
                         "Payload": None}
        return jsonify(json_response)


if __name__ == '__main__':
    APP.run(debug=DEBUG_APP, host='localhost', port=6767)
