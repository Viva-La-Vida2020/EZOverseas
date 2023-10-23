import pandas as pd
import joblib
import pymysql as mysql

# df.columns = [
#     'research', 'toefl', 'intern', 'greV', 'greQ', 'greA', 'gpa', 'major',
#     'univ', 'target_univ', 'admit'
# ]


def get_predict_para(res):
    return {
        'research': int(res['research']),
        'toefl': int(res['toefl']),
        'intern': res['intern'],
        'greV': int(res['greV']),
        'greQ': int(res['greQ']),
        'greA': float(res['greA']),
        'gpa': float(res['gpa']),
        'major': res['major'],
        'univ': res['univ'],
        'target_univ': res['target_univ'],
    }


def get_model(data):
    return f"./models/{data['targetSchool']}.{data['targetMajor']}.pkl"


def predict_rate(predict_para):
    # return 80

    target_model = './models/model_lgbm.pkl'  # TODO:

    loaded_model = joblib.load(target_model)
    X = pd.DataFrame(predict_para)
    y_prob = loaded_model.predict_proba(X)[:, 1]
    rate = str(round(float(y_prob * 100), 2)) + '%'
    return rate


def connect_database():
    conn = mysql.connect(host='localhost',
                         user='root',
                         password='pillar2580',
                         database='suitntie')

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