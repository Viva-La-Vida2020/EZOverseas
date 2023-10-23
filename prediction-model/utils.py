import pandas as pd
import joblib
import pickle
import pymysql as mysql
import os

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
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, '..'))
    target_model = parent_dir + '/prediction-model/models/model_lgbm.pkl'  # TODO:
    print('target_model', target_model)
    # # 加载模型
    # with open(target_model, 'rb') as file:
    #     loaded_model = pickle.load(file)
    loaded_model = joblib.load(target_model)
    print('s---------1')
    X = pd.DataFrame([predict_para])
    print('X', X)
    y_prob = loaded_model.predict_proba(X)[:, 1]
    print('y_prob', y_prob)
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