from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from DataFunction import get_predict_para, get_model, predict_rate
from flask_cors import CORS
import secrets
import string

app = Flask(__name__)
CORS(app)


def generate_secret_key(length=24):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    secret_key = ''.join(secrets.choice(alphabet) for i in range(length))
    return secret_key


app.secret_key = generate_secret_key()


@app.route('/form', methods=['GET', 'POST'])
def hello_world():  # put application's code here
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
        # rate = PredictRate(res)
        # session['rate'] = rate
        # return redirect(url_for('show_rate'))


@app.route('/rate')
def show_rate():
    Rate = session.get('rate', None)
    return render_template('rate.html', Rate=Rate)


if __name__ == '__main__':
    app.run()
