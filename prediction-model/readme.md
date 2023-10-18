## 安装依赖-都用的最新的
llama_index
openai
google-cloud-dialogflow

## 本地数据库
修改 `connect_database（）` 中配置。

```shell
CREATE DATABASE isy5001;
USE isy5001;
CREATE TABLE programs_and_major (
    id INT AUTO_INCREMENT PRIMARY KEY,
    univ_name VARCHAR(100),
    program_name VARCHAR(100),
    entry_criteria TEXT
);
```

