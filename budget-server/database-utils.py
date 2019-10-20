import datetime
from bson import ObjectId
from flask import jsonify


def json_ify(data):
    returned_data = {}
    for key in data:
        if isinstance(data[key], ObjectId):
            returned_data[key] = str(data[key])
        elif isinstance(data[key], datetime.datetime):
            returned_data[key] = str(data[key])
        else:
            returned_data[key] = data[key]
    return jsonify(returned_data)


def remove_object_id(data):
    returned_data = {}
    for key in data:
        if not key == '_id':
            returned_data[key] = data[key]
    return returned_data
