from translation import translator


def get_errors_from_code(error_code, locale, logger, additionalMessage=''):
    return {
        'Type': 'error',
        'Message': translator.translate("ERRORS." + error_code, locale, logger) + additionalMessage,
        'ErrorCode': error_code}
