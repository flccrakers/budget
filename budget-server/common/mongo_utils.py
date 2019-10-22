from flask import jsonify
from bson import ObjectId
import datetime


def json_ify(data):
    returned_data = convert_object_id_and_date_in_string(data)
    return jsonify(returned_data)


def convert_object_id_and_date_in_string(data):
    returned_data = {}
    for key in data:
        if isinstance(data[key], ObjectId):
            if key == '_id':
                returned_data['id'] = str(data[key])
            else:
                returned_data[key] = str(data[key])
        elif isinstance(data[key], datetime.datetime):
            returned_data[key] = str(data[key])
        else:
            returned_data[key] = data[key]

    return returned_data


def remove_object_id(data):
    returned_data = {}
    for key in data:
        if not key == '_id':
            returned_data[key] = data[key]
    return returned_data


def convent_string_into_object_id(data):
    return_object = {}
    for key in data:
        if key == 'id':
            return_object['_id'] = ObjectId(data[key])
        else:
            return_object[key] = data[key]

    return return_object
