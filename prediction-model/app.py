from flask import Flask, render_template, request, session, jsonify
import os
import openai
from flask_cors import CORS
import secrets
import string
from CallGptAPI import connect_database, chat_with_gpt
from utils import get_predict_para, get_model, predict_rate

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
        predict_para = get_predict_para(request.json)
        target_model = get_model(request.json)
        # print(target_model)  # TODO: DELETE
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
    context_load = os.path.exists(f'./storage/{user_id}')
    print('context load? ', context_load)
    print(
        'parameters: ',
        question,
        user_id,
        session_id,
    )
    # TODO: Please use this format for returning data: $${'message': 'xxx'}$$
    print('question', question)
    result = chat_with_gpt(question, user_id, session_id, cursor,
                             context_load, True)
    if not result:
        result = 'error'
    response = {'message': f'{result}'}
    return jsonify(response)


if __name__ == '__main__':
    app.run()
