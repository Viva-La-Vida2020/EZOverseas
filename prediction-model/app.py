from flask import Flask, render_template, request, session, jsonify
import openai
from DataFunction import get_predict_para, get_model, predict_rate
from flask_cors import CORS
import secrets
import string
from CallGptAPI import *
from utils import *

app = Flask(__name__)
CORS(app)

# set api key
api_key = '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'
openai.api_key = api_key

# connect to mysql
cursor = connect_database()


def generate_secret_key(length=24):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    secret_key = ''.join(secrets.choice(alphabet) for i in range(length))
    return secret_key


app.secret_key = generate_secret_key()


@app.route('/form', methods=['GET', 'POST'])
def get_form_data():  # put application's code here
    if request.method == 'GET':
        return render_template('form.html')
    elif request.method == 'POST':
        print(request.json)
        Gender = request.json['gender']
        print(Gender)
        predict_para = get_predict_para(request.json)
        print(predict_para)
        target_model = get_model(request.json)
        print(target_model)
        rate = predict_rate(predict_para, target_model)

        response = {'message': rate}
        return jsonify(response)


@app.route('/rate')
def get_rate():
    Rate = session.get('rate', None)
    return render_template('rate.html', Rate=Rate)


@app.route('/chat', methods=['POST'])
def chat():
    print('chat triggered')
    print(request.json)
    question = request.json['question']
    user_id = request.json['user_id']
    session_id = request.json['session_id']
    context_load = os.path.exists('./storage/' + user_id)
    print('context load? ', context_load)
    print('parameters: ', question, user_id, session_id, )
    # response = chat_with_gpt(question, user_id, session_id, cursor, context_load, True)

    # return response


if __name__ == '__main__':
    app.run()
