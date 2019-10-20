import os
import json


def translate(field, locale, logger):
    """Translate according to the language chosen"""
    # logger.debug("Field: "+field)
    if field:
        locale_file = os.path.join('locales', locale + '.json')
        if not os.path.isfile(locale_file):
            locale_file = 'locales/en-us.json'
        with open(locale_file) as current_file:
            locale_data = json.load(current_file)
        spliced = field.split('.')
        if len(spliced) > 1:
            return locale_data[spliced[0]][spliced[1]]

        return locale_data[field]
    else:
        logger.debug("translation field: " + field + " is not known")
        return 'UNKNOWN TRANSLATION FIELD ' + field
