import pandas as pd
import joblib
import pymysql as mysql
import os

# df.columns = [
#     'research', 'toefl', 'intern', 'greV', 'greQ', 'greA', 'gpa', 'major',
#     'univ', 'target_univ', 'admit'
# ]


def get_predict_para(res):
    return {
        'research': [int(res['research'])],
        'toefl': [int(res['toefl'])],
        'intern': [res['intern']],
        'greV': [int(res['greV'])],
        'greQ': [int(res['greQ'])],
        'greA': [float(res['greA'])],
        'gpa': [float(res['gpa'])],
        'major': [res['major']],
        'univ': [res['univ']],
        'target_univ': [res['target_univ']],
    }
    # return {
    #     'research': [1],
    #     'toefl': [120],
    #     'intern': [3],
    #     'greV': [150],
    #     'greQ': [150],
    #     'greA': [4.0],
    #     'gpa': [0.8],
    #     'major': ['CS'],
    #     'univ': [1],
    #     'target_univ': ['Cornell University']
    # }


def get_model(data):
    return f"./models/{data['targetSchool']}.{data['targetMajor']}.pkl"


def predict_rate(predict_para):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, '..'))
    target_model = parent_dir + '/prediction-model/models/model_lgbm.pkl'
    lr_model = parent_dir + '/prediction-model/models/model_lr.pkl'
    print('target_model', target_model)
    # # 加载模型
    # with open(target_model, 'rb') as file:
    #     loaded_model = pickle.load(file)
    loaded_model_lgbm = joblib.load(target_model)
    loaded_model_lr = joblib.load(lr_model)
    print('s---------1')
    X = pd.DataFrame.from_dict(predict_para).astype('category')
    # X = pd.DataFrame(predict_para).astype('category')
    print('X', X)
    y_prob = loaded_model_lgbm.predict_proba(X)
    print('y_prob', y_prob)
    y_prob_lr = loaded_model_lr.predict_proba(y_prob)[0]
    print('y_prob_lr', y_prob_lr)
    rate = str(round(float(y_prob_lr[1] * 100), 2)) + '%'
    return rate


def connect_database():
    conn = mysql.connect(host='localhost',
                         user='root',
                         password='Zxy001212',
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