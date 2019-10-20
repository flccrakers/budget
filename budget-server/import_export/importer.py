import datetime
import os

import xlrd  # Reading an excel file using Python


def get_json_form_xlsx_file(filename):
    # print(filename)
    directory = 'uploaded-files'
    json = []
    wb = xlrd.open_workbook(os.path.join(directory, filename))
    sheet = wb.sheet_by_index(0)
    for i in range(3, sheet.nrows):
        # print(sheet.row_values(i))
        if sheet.row_values(i)[0] != '':
            tuple_date = xlrd.xldate_as_tuple(int(sheet.row_values(i)[0]), wb.datemode)
            date = str(tuple_date[0]) + '-' + str(tuple_date[1]) + '-' + str(tuple_date[2])
            reason = sheet.row_values(i)[3]
            amount = sheet.row_values(i)[4]
            credit = ''
            debit = ''
            if amount > 0:
                credit = abs(amount)
            else:
                debit = abs(amount)
            json.append({'date': date, 'reason': reason, 'credit': credit, 'debit': debit})

    return json
