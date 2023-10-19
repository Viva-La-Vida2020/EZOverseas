## 安装依赖-都用的最新的
python==3.9
flask
joblib
pymysql
llama_index
openai
google-cloud-dialogflow


# chatbot
## google-cloud-dialogflow
设置应用默认凭据前，需确保自己加入某个Google clould 项目中。
设置应用默认凭据https://cloud.google.com/docs/authentication/provide-credentials-adc?hl=zh-cn#local-dev
1. 安装并初始化 gcloud CLI。
2. 创建凭据文件
3. 将创建的凭据文件路径设置为环境变量

## chatbot本地数据库
修改 `connect_database（）` 中配置。

```shell
CREATE DATABASE suitntie;
USE suitntie;
source <sql path>
```

## 测试
```shell
input = "What's the language requirement of Bachelor of Occupational Therapy in Australian Catholic University?"
```

