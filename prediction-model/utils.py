import pandas as pd
import joblib
import pymysql as mysql


def get_predict_para(res):
    return {
        'Gender': res['gender'],
        'University': res['university'],
        'GPA': res['gpa'],
        'GRE': res['gre'],
        'Score': res['score'],
        'Intern_1': res['relatedIntern1'],
        'Intern_2': res['relatedIntern2'],
        'Intern_3': res['relatedIntern3'],
        'Project_1': res['project1'],
        'Project_2': res['project2'],
        'Project_3': res['project3'],
        'Paper_1': res['paper1'],
        'Paper_2': res['paper2'],
        'Paper_3': res['paper3'],
    }


def get_model(data):
    return f"./models/{data['targetSchool']}.{data['targetMajor']}.pkl"


def predict_rate(predict_para, target_model):
    return 80

    target_model = './models/NUS.CS.pkl'  # TODO:

    loaded_model = joblib.load(target_model)
    X = pd.DataFrame(predict_para)
    y_prob = loaded_model.predict_proba(X)[:, 1]
    rate = str(round(float(y_prob * 100), 2)) + '%'
    return rate


def connect_database():
    conn = mysql.connect(
        host='localhost',
        user='root',
        password='wojiaoliyiyao123',
        database='ISY5001'
    )

    cursor = conn.cursor()
    return cursor



# if __name__ == '__main__':
#     conn = mysql.connect(
#         host='localhost',
#         user='root',
#         password='wojiaoliyiyao123',
#         database='ISY5001'
#     )
#
#     cursor = conn.cursor()
#     university = 'Australian Catholic University'
#     program = 'Bachelor of Occupational Therapy'
#     keyword = [university, program]
#
#     criteria = query_entry_criteria(keyword, cursor)
#     print(criteria)