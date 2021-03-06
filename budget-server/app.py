"""The main Flask app that serve the different query send by the client"""
# !/usr/bin/python3
import datetime
import json
import logging.handlers
import time

from werkzeug.utils import secure_filename
from os.path import join, dirname, realpath, splitext
from bson import ObjectId
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_pymongo import PyMongo

from common.mongo_utils import convert_object_id_and_date_in_string
from errors import errors
from import_export import importer

DEBUG_APP = True
APP = Flask(__name__)
APP.config['UPLOAD_FOLDER'] = 'uploaded-files'
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


@APP.route('/get_account_list/', methods=['GET'])
def get_account_list():
    print("try to get accounts")
    account_data = []
    try:
        account_list = mongo.db.accounts.find({})
        for account in account_list:
            account_data.append(convert_object_id_and_date_in_string(account))
        json_response = {"IsSuccess": True, "Message": '', "ErrorType": '', "GeneralException": '',
                         "Payload": account_data}
        return jsonify(json_response)
    except errors:
        print(errors)
        return errors


def save_file_in_uploads(file):
    filename = secure_filename(file.filename)
    directory = join(dirname(realpath(__file__)), APP.config['UPLOAD_FOLDER'])
    target = join(directory, filename)
    logger.info("saving " + str(target))
    file.save(target)


@APP.route('/upload_data_from_xlsx', methods=['POST'])
def upload_data_form_xlsx():
    file_check_response = {
        "IsSuccess": False,
        "Payload": [{
            "ErrorCode": "NO_FILE",
            "Message": errors.get_errors_from_code('NO_FILE', 'en-us', logger),
            "Type": 'error'
        }],
        "GeneralException": 'NO_FILE'
    }
    if 'file' not in request.files:
        print("there is no file")
        logger.debug("There is no file")
        return jsonify(file_check_response)
    print(request)
    file = request.files['file']
    save_file_in_uploads(file)
    json_data = importer.get_json_form_xlsx_file(file.filename)
    file_check_response = {
        "IsSuccess": True,
        "Payload": json_data,
        "GeneralException": ''
    }
    return jsonify(file_check_response)


@APP.route('/update_data_for_account', methods=['POST'])
def update_data_for_account():
    print("I'm trying to update")
    body_data = json.loads(request.form.get('json'))
    account_id = body_data['accountId']
    filename = body_data['filename']
    account = mongo.db.accounts.find_one({"_id": ObjectId(account_id)})
    account['data'] = importer.get_json_form_xlsx_file(filename)
    print(account)
    mongo.db.accounts.replace_one({'_id': ObjectId(account_id)}, account)
    file_check_response = {
        "IsSuccess": True,
        "Payload": '',
        "GeneralException": ''
    }
    print(jsonify(file_check_response))
    return jsonify(file_check_response)


@APP.route('/get_account_data', methods=['POST'])
def get_account_data():
    body_data = json.loads(request.form.get('json'))
    account_id = body_data['accountId']
    year = body_data['year']
    month = body_data['month']
    account_data = mongo.db.accounts.find_one({"_id": ObjectId(account_id)})
    returned_data = []
    if account_data is not None:
        for data in account_data['data']:
            current_date = datetime.datetime.strptime(data['date'], "%Y-%m-%d").date()
            if year is None and month is None:
                data['date'] = time.mktime(current_date.timetuple())
                returned_data.append(data)
            elif current_date.year == year and current_date.month == month:
                data['date'] = time.mktime(current_date.timetuple())
                returned_data.append(data)

    # print(returned_data)
    json_response = {"IsSuccess": True, "Message": '', "ErrorType": '', "GeneralException": '',
                     "Payload": returned_data}
    return jsonify(json_response)


@APP.route('/get_budget_data', methods=['POST'])
def get_budget_data():
    returned_data = []
    budget_data = mongo.db.budget.find()

    for budget in budget_data:
        returned_data.append(budget)
    json_response = {"IsSuccess": True, "Message": '', "ErrorType": '', "GeneralException": '',
                     "Payload": returned_data[0]['data']}
    return jsonify(json_response)


@APP.route('/update_budget_data', methods=['POST'])
def update_budget_data():
    budgets = mongo.db.budget.find()
    current_budgets = []
    body_data = json.loads(request.form.get('json'))
    for budget in budgets:
        current_budgets.append(convert_object_id_and_date_in_string(budget))
    current_budgets[0]['data'] = body_data['data']
    mongo.db.budget.replace_one({'_id': ObjectId(current_budgets[0]['id'])}, current_budgets[0])
    json_response = {"IsSuccess": True, "Message": '', "ErrorType": '', "GeneralException": '',
                     "Payload": ''}
    return jsonify(json_response)


if __name__ == '__main__':
    APP.run(debug=DEBUG_APP, host='localhost', port=6767)
