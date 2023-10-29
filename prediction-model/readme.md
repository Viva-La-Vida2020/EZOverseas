## install packages all these us
python==3.9
flask==1.1.2
joblib==1.0.0
pymysql==1.1.0
flask-cors == 4.0.0
openai==0.28.1
google-cloud-dialogflow==2.7.0


# chatbot
## Configure google-cloud-dialogflow
Before you set your app default credentials, make sure you're part of a Google clould project. Set the default credential https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=zh-cn#local-dev for the app

i. Install and initialize the gcloud CLI.

ii. Create a credential file

iii. Set the path of the created credential file to an environment variable

## Configure the local database for the chatbot.
Modify the configuration in `connect_database()`.

```shell
CREATE DATABASE suitntie;
USE suitntie;
source <sql path>
```

## 测试
```shell
input = "What's the language requirement of Bachelor of Occupational Therapy in Australian Catholic University?"
```

