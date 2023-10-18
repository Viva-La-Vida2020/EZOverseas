# import lightgbm as lgb
import pandas as pd
import os
# from tqdm import tqdm
# import numpy as np
# from sklearn.model_selection import train_test_split
# import onnxmltools
# from onnxmltools import convert
import joblib


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


# def GetInputData(Gender,
#                  University,
#                  GPA,
#                  TargetSchool,
#                  TargetMajor,
#                  GRE=-1,
#                  TOEFL=-1,
#                  IELTS=-1,
#                  Intern_1=-1,
#                  Intern_2=-1,
#                  Intern_3=-1,
#                  Project_1=-1,
#                  Project_2=-1,
#                  Project_3=-1,
#                  Paper_1=-1,
#                  Paper_2=-1,
#                  Paper_3=-1):

#     InputDict = {
#         'Gender': -1,
#         'University': -1,
#         'GPA': -1,
#         'GRE': -1,
#         'Score': -1,
#         'Intern_1': -1,
#         'Intern_2': -1,
#         'Intern_3': -1,
#         'Project_1': -1,
#         'Project_2': -1,
#         'Project_3': -1,
#         'Paper_1': -1,
#         'Paper_2': -1,
#         'Paper_3': -1
#     }

#     # Process Gender
#     if Gender == 'Male' or Gender == '男':
#         InputDict['Gender'] = 1
#     elif Gender == 'Female' or Gender == '女':
#         InputDict['Gender'] = 0

#     # Process University
#     if University in [
#             '清华大学', '北京大学', 'Peking University', 'Tsinghua University'
#     ]:
#         InputDict['University'] = 1
#     if University in [
#             '复旦大学', '上海交通大学', '浙江大学', '南京大学', '中国科学技术大学',
#             'Zhejiang University', 'Fudan University',
#             'Shanghai Jiao Tong University'
#     ]:
#         InputDict['University'] = 2
#     if University in [
#             '华中科技大学', '武汉大学', '西安交通大学', '四川大学', '中山大学', '哈尔滨工业大学', '同济大学',
#             '北京航空航天大学', '东南大学', '北京师范大学', '北京理工大学', '中国人民大学', '南开大学', '天津大学',
#             '山东大学', '中南大学', '西北工业大学', '华南理工大学', '厦门大学', '吉林大学', '华东师范大学',
#             '中国农业大学', '电子科技大学', '大连理工大学', '湖南大学', '重庆大学', '兰州大学', '东北大学',
#             '中国海洋大学', '西北农林科技大学', '中央民族大学', '国防科技大学'
#     ]:
#         InputDict['University'] = 3
#     if University in [
#             '北京科技大学', '武汉理工大学', '南京理工大学', '北京协和医学院', '西南大学', '华中师范大学', '暨南大学',
#             '河海大学', '南京师范大学', '北京交通大学', '南京农业大学', '华东理工大学', '苏州大学', '华中农业大学',
#             '中南财经政法大学', '南京航空航天大学', '西安电子科技大学', '合肥工业大学', '西南交通大学', '西北大学',
#             '湖南师范大学', '郑州大学', '东北师范大学', '北京邮电大学', '华南师范大学', '哈尔滨工程大学',
#             '上海财经大学', '云南大学', '上海大学', '西南财经大学', '东华大学', '中国政法大学', '海军军医大学',
#             '北京化工大学', '中国石油大学（北京）', '中国地质大学（武汉）', '北京外国语大学', '南昌大学', '中国传媒大学',
#             '太原理工大学', '北京工业大学', '空军军医大学', '江南大学', '陕西师范大学', '中国矿业大学',
#             '对外经济贸易大学', '福州大学', '北京林业大学', '中国石油大学（华东）', '安徽大学', '长安大学', '辽宁大学',
#             '贵州大学', '中央财经大学', '北京体育大学', '河北工业大学', '北京中医药大学', '东北农业大学',
#             '东北林业大学', '四川农业大学', '中国药科大学', '新疆大学', '中国矿业大学（北京）', '中国地质大学（北京）',
#             '天津医科大学', '上海外国语大学', '大连海事大学', '广西大学', '华北电力大学', '内蒙古大学', '海南大学',
#             '石河子大学', '宁夏大学', '延边大学', '中央音乐学院', '西藏大学', '青海大学'
#     ]:
#         InputDict['University'] = 4
#     if University == '其他':
#         InputDict['University'] = 5
#     if University in [
#             'Massachusetts Institute of Technology (MIT)',
#             'University of Cambridge', 'University of Oxford',
#             'Harvard University', 'Stanford University',
#             'Imperial College London',
#             'ETH Zurich (Swiss Federal Institute of Technology)',
#             'National University of Singapore (NUS)',
#             'UCL (University College London)',
#             'University of California, Berkeley (UCB)'
#     ]:
#         InputDict['University'] = 6
#     if University in [
#             'University of Chicago', 'University of Pennsylvania',
#             'Cornell University', 'University of Melbourne',
#             'California Institute of Technology (Caltech)', 'Yale University',
#             'Princeton University',
#             'University of New South Wales (UNSW Sydney)',
#             'University of Sydney', 'University of Toronto',
#             'University of Edinburgh', 'Columbia University', 'Universite PSL',
#             'Nanyang Technological University, Singapore (NTU)',
#             'University of Hong Kong (UKU)', 'Johns Hopkins University',
#             'University of Tokyo',
#             'University of California, Los Angeles (UCLA)'
#     ]:
#         InputDict['University'] = 7
#     if University in [
#             'McGill University', 'University of Manchester',
#             'University of Michigan-Ann Arbor',
#             'Australian National University', 'University of British Columbia',
#             'Ecole Polytechnique Fédérale de Lausanne (EPFL)',
#             'Technical University of Munich', 'InstitutPolytechnique de Paris',
#             'New York University (NYU)', "King's College London",
#             'Seoul National University', 'Monash University',
#             'University of Queensland',
#             'London School of Economics and Political Science (LSE)',
#             'Kyoto University', 'Delft University of Technology',
#             'Northwestern University', 'Chinese University of Hong Kong (CUHK)'
#     ]:
#         InputDict['University'] = 8
#     if University in [
#             'Carnegie Mellon University', 'University of Amsterdam',
#             'Ludwig-Maximilians-Universität München', 'University of Bristol',
#             'KAIST - Korea Advanced Institute of Science & Technology',
#             'Duke University', 'University of Texas at Austin',
#             'Sorbonne University',
#             'Hong Kong University of Science and Technology (HKUST)',
#             'KU Leuven', 'University of California, San Diego (UCSD)',
#             'University of Washington',
#             'University of Illinois at Urbana-Champaign',
#             'Hong Kong Polytechnic University', 'Universiti Malaya (UM)',
#             'University of Warwick', 'University of Auckland',
#             'National Taiwan University (NTU)', 'City University of Hong Kong',
#             'Universite Paris-Saclay', 'University of Western Australia',
#             'Brown University', 'KTH Royal Institute of Technology',
#             'University of Leeds', 'University of Glasgow',
#             'Yonsei University', 'Durham University', 'Korea University',
#             'Osaka University',
#             'Trinity College Dublin, The University of Dublin',
#             'University of Southampton', 'Pennsylvania State University',
#             'University of Birmingham', 'Lund University',
#             'Universidade de São Paulo', 'Lomonosov Moscow State University',
#             'Universität Heidelberg', 'The University of Adelaide',
#             'University of Technology Sydney', 'Tokyo Institute of Technology',
#             'University of Zurich', 'Boston University',
#             'Universidad Nacional Autónoma de México (UNAM)',
#             'Universidad de Buenos Aires (UBA)', 'University of St Andrews',
#             'Georgia Institute of Technology', 'Freie Universitaet Berlin',
#             'Purdue University',
#             'Pohang University of Science and Technology (POSTECH)',
#             'University of Nottingham'
#     ]:
#         InputDict['University'] = 9
#     if University == 'Others':
#         InputDict['University'] = 10

#     # Process GPA
#     InputDict['GPA'] = eval(GPA)

#     # Process GRE
#     if GRE == '':
#         InputDict['GRE'] = -1
#     else:
#         InputDict['GRE'] = int(GRE)

#     # Process TOEFL or IELTS
#     if TOEFL == '' and IELTS == '':
#         InputDict['Score'] = -1
#     if TOEFL == '' and IELTS != '':
#         InputDict['Score'] = int(IELTS)
#     if TOEFL != '' and IELTS == '':
#         TOEFL = int(TOEFL)
#         if TOEFL >= 118 and TOEFL <= 120:
#             TOEFL = 9
#         if TOEFL >= 115 and TOEFL <= 117:
#             TOEFL = 8.5
#         if TOEFL >= 110 and TOEFL <= 114:
#             TOEFL = 8
#         if TOEFL >= 102 and TOEFL <= 109:
#             TOEFL = 7.5
#         if TOEFL >= 94 and TOEFL <= 101:
#             TOEFL = 7
#         if TOEFL >= 79 and TOEFL <= 93:
#             TOEFL = 6.5
#         if TOEFL >= 60 and TOEFL <= 78:
#             TOEFL = 6
#         if TOEFL >= 46 and TOEFL <= 59:
#             TOEFL = 5.5
#         if TOEFL >= 35 and TOEFL <= 45:
#             TOEFL = 5
#         if TOEFL >= 32 and TOEFL <= 34:
#             TOEFL = 4.5
#         if TOEFL >= 0 and TOEFL <= 31:
#             TOEFL = 0
#         InputDict['Score'] = TOEFL
#     if TOEFL != '' and IELTS != '':
#         TOEFL = int(TOEFL)
#         IELTS = int(IELTS)
#         if TOEFL >= 118 and TOEFL <= 120:
#             TOEFL = 9
#         if TOEFL >= 115 and TOEFL <= 117:
#             TOEFL = 8.5
#         if TOEFL >= 110 and TOEFL <= 114:
#             TOEFL = 8
#         if TOEFL >= 102 and TOEFL <= 109:
#             TOEFL = 7.5
#         if TOEFL >= 94 and TOEFL <= 101:
#             TOEFL = 7
#         if TOEFL >= 79 and TOEFL <= 93:
#             TOEFL = 6.5
#         if TOEFL >= 60 and TOEFL <= 78:
#             TOEFL = 6
#         if TOEFL >= 46 and TOEFL <= 59:
#             TOEFL = 5.5
#         if TOEFL >= 35 and TOEFL <= 45:
#             TOEFL = 5
#         if TOEFL >= 32 and TOEFL <= 34:
#             TOEFL = 4.5
#         if TOEFL >= 0 and TOEFL <= 31:
#             TOEFL = 0
#         InputDict['Score'] = max(TOEFL, IELTS)

#     # Process Internship
#     if Intern_1 in [
#             '沃尔玛', '亚马逊', '国家电网有限公司', '中国石油天然气集团有限公司', '中国石油化工集团有限公司',
#             '沙特阿美公司', '苹果公司', '大众公司', '中国建筑集团有限公司', 'CVS Health公司', '联合健康集团',
#             '埃克森美孚', '丰田汽车公司', '伯克希尔－哈撒韦公司', '壳牌公司', '麦克森公司', 'Alphabet公司',
#             '三星电子', '托克集团', '鸿海精密工业股份有限公司', '美源伯根公司', '中国工商银行股份有限公司', '嘉能可',
#             '中国建设银行股份有限公司', '中国平安保险', '开市客', '道达尔能源公司', '中国农业银行股份有限公司',
#             'Stellantis集团', '信诺', '中国中化控股有限责任公司', '美国电话电报公司', '微软',
#             '中国铁路工程集团有限公司', '英国石油公司', '嘉德诺', '雪佛龙', '梅赛德斯-奔驰集团',
#             '中国铁道建筑集团有限公司', '中国人寿保险', '三菱商事株式会社', '中国银行股份有限公司', '家得宝',
#             '中国宝武钢铁集团有限公司', '沃博联', '京东集团股份有限公司', '安联保险集团', '安盛', '马拉松原油公司',
#             'Elevance Health公司', '克罗格', '俄罗斯天然气工业股份公司', '福特汽车公司', '威瑞森电信',
#             '阿里巴巴集团控股有限公司', '富腾公司', '中国移动通信集团有限公司', '中国五矿集团有限公司', '宝马集团',
#             '中国交通建设集团有限公司', '本田汽车', '德国电信', '摩根大通公司', '通用汽车公司', '中国海洋石油集团有限公司',
#             'Centene公司', '卢克石油公司', '上海汽车集团股份有限公司', '山东能源集团有限公司', '中国华润有限公司',
#             'Meta Platforms公司', '意大利忠利保险公司', '美国康卡斯特电信公司', 'Phillips 66公司',
#             '恒力集团有限公司', '正威国际集团有限公司', '厦门建发集团有限公司', '日本伊藤忠商事株式会社',
#             '中国第一汽车集团有限公司', '中国医药集团有限公司', '中国邮政集团有限公司', '瓦莱罗能源公司', '日本电报电话公司',
#             '法国农业信贷银行', '国家能源投资集团有限责任公司', '戴尔科技公司', '塔吉特公司', '三井物产株式会社',
#             '中国南方电网有限责任公司', '意大利国家电力公司', '中粮集团有限公司', '现代汽车', '房利美', '日本邮政控股公司',
#             '法国电力公司', '华为投资控股有限公司', '联合包裹速递服务公司', '印度人寿保险公司', '德国邮政敦豪集团',
#             '中国电力建设集团有限公司', '美国劳氏公司', '中国中信集团有限公司', '雀巢公司', '信实工业公司', '美国银行',
#             '厦门国贸控股集团有限公司', '强生', '博世集团', '巴斯夫公司', '中国人民保险集团股份有限公司', '埃尼石油公司',
#             '意昂集团', '日立', 'Equinor公司', '皇家阿霍德德尔海兹集团', '索尼', 'SK集团', '俄罗斯石油公司',
#             '家乐福', '物产中大集团股份有限公司', '腾讯控股有限公司', '东风汽车集团有限公司', '法国巴黎银行', 'ADM公司',
#             '绿地控股集团股份有限公司', '乐购', '中国远洋海运集团有限公司', '巴西国家石油公司', '联邦快递',
#             'Engie集团', '中国电信集团有限公司', '哈门那公司', '慕尼黑再保险集团', '美国富国银行', '州立农业保险公司',
#             '中国兵器工业集团有限公司', '辉瑞制药有限公司', '碧桂园控股有限公司', '中国铝业集团有限公司', '引能仕控股株式会社',
#             '花旗集团', '印度石油公司', '百事公司', '中国航空工业集团有限公司', '英特尔公司', '西班牙国家银行',
#             'Seven & I 控股公司', '日本永旺集团', '汇丰银行控股公司', '太平洋建设集团有限公司', '美国邮政',
#             '招商局集团有限公司', '安赛乐米塔尔', '宝洁公司', '交通银行股份有限公司', '迪奥公司', '丸红株式会社',
#             '布鲁克菲尔德资产管理公司', '西门子', '厦门象屿集团有限公司', '日产汽车', '北京汽车集团有限公司',
#             '晋能控股集团有限公司', '日本生命保险公司', '通用电气公司', '墨西哥石油公司', '第一生命控股有限公司',
#             '国际商业机器公司', '瑞士罗氏公司', '艾伯森公司', '联想集团有限公司', '丰田通商公司', '大都会人寿',
#             '招商银行股份有限公司', '保德信金融集团', '江西铜业集团有限公司', '泰国国家石油有限公司', '万科企业股份有限公司',
#             '苏黎世保险集团', '浙江荣盛控股集团有限公司', '中国保利集团有限公司', '中国太平洋保险股份有限公司)',
#             '华特迪士尼公司', 'Energy Transfer公司', '洛克希德－马丁', '广州汽车工业集团有限公司', 'LG电子',
#             '浦项制铁控股公司', '河钢集团有限公司', '印度石油天然气公司', '房地美', '丰益国际', '松下控股公司',
#             '巴西JBS公司', '高盛', '中国建材集团有限公司', '雷神技术公司', '英杰华集团', '山东魏桥创业集团有限公司',
#             '荷兰全球保险集团', '力拓集团', '惠普公司', '英国励正集团', '波音', '联合利华', '马士基集团',
#             '空中客车公司', '兴业银行股份有限公司', '陕西煤业化工集团有限责任公司', '中国光大集团股份公司', '摩根士丹利',
#             '起亚公司', '必和必拓集团', '日本制铁集团公司', '中国华能集团有限公司', '马来西亚国家石油公司',
#             '鞍钢集团有限公司', '万喜集团', '邦吉公司', '法国兴业银行', 'HCA 医疗保健公司', '英国劳埃德银行集团',
#             '印尼国家石油公司', '中国机械工业集团有限公司', '台积公司', '上海浦东发展银行股份有限公司', '艾伯维',
#             '法国达飞海运集团', '浙江吉利控股集团有限公司', '德国联邦铁路公司', '巴西淡水河谷公司', '加拿大鲍尔集团',
#             '中国电子科技集团有限公司', '软银集团', '陶氏公司', '印度国家银行', '雷诺', '青山控股集团有限公司',
#             '百威英博', '三菱日联金融集团', '盛虹控股集团有限公司', '特斯拉', '中国船舶集团有限公司', 'Talanx公司',
#             '美的集团股份有限公司', '好事达', '沃达丰集团', '诺华公司', '韩国电力公司', '日本出光兴产株式会社',
#             '雷普索尔公司', '圣戈班集团', '东京海上日动火灾保险公司', '拜耳集团', '美国国际集团', '德国艾德卡公司',
#             '陕西延长石油)', '百思买', '特许通讯公司', '国家电力投资集团有限公司', '西斯科公司', '默沙东',
#             '美国纽约人寿保险公司', '浙江恒逸集团有限公司', '卡特彼勒', '小米集团', '中国联合网络通信股份有限公司',
#             '埃森哲', '中国能源建设集团有限公司', '俄罗斯联邦储蓄银行', 'Orange公司', '伍尔沃斯集团',
#             '中国民生银行股份有限公司', '思科公司', '美洲电信', '路易达孚集团', '宏利金融', '电装公司', '住友商事',
#             'TJX公司', '日本KDDI电信公司', '法国BPCE银行集团', '大众超级市场公司', '康菲石油公司',
#             '美国利宝互助保险集团', '前进保险公司', '英格卡集团', '友邦保险控股有限公司', '美国全国保险公司',
#             '东京电力公司', '江苏沙钢集团有限公司', '泰森食品', 'EXOR集团', '葛兰素史克集团', '巴拉特石油公司',
#             '瑞士再保险股份有限公司', '中国中煤能源集团有限公司', '意大利联合圣保罗银行', '苏商建设集团有限公司',
#             '西班牙电话公司', '百时美施贵宝公司', '浙江省交通投资集团有限公司', '赛诺菲', 'Iberdrola公司',
#             '利安德巴塞尔工业公司', '韩华集团', '加拿大皇家银行', 'Alimentation Couche-Tard公司',
#             'MS&AD保险集团控股有限公司', '采埃孚', '和硕', '德国大陆集团', '耐克公司', '法国布伊格集团',
#             '中国兵器装备集团公司', '费森尤斯集团', '仁宝电脑', '迪尔公司', '乔治威斯顿公司', '美国运通公司',
#             '上海建工集团股份有限公司', '中国航天科技集团有限公司', '沃尔沃集团', '中国电子信息产业集团有限公司', '雅培公司',
#             '中国华电集团有限公司', 'StoneX集团', '首钢集团有限公司', 'Plains GP Holdings公司',
#             '奥地利石油天然气集团', '英美资源集团', '山东钢铁集团有限公司', '伊塔乌联合银行控股公司',
#             '中国太平保险集团有限责任公司', '法国国营铁路集团', '杭州钢铁集团有限公司', '德国中央合作银行', '安达保险公司',
#             '金川集团股份有限公司', '法国邮政', '中国航天科工集团有限公司', '森宝利公司',
#             'Enterprise Products Partners公司', '蒂森克虏伯', '瑞银集团', '泰康保险集团股份有限公司',
#             '美国教师退休基金会', '甲骨文公司', '广达电脑公司', '德意志银行', '三菱电机股份有限公司', '西班牙对外银行',
#             '安徽海螺集团有限责任公司', '大和房建', '赛默飞世尔科技公司', '新希望控股集团有限公司', 'KOC集团',
#             '日本钢铁工程控股公司', '可口可乐公司', '广州市建筑集团有限公司', '通用动力', 'CHS公司',
#             '北京建龙重工集团有限公司', '中国核工业集团有限公司', '西班牙ACS集团', '多伦多道明银行', '欧莱雅',
#             '巴登-符滕堡州能源公司', 'LG化学公司', '印度塔塔汽车公司', 'ELO集团', '深圳市投资控股有限公司',
#             'SK海力士公司', '巴克莱', 'Enbridge公司', '国泰金融控股股份有限公司', '日本明治安田生命保险公司',
#             '意大利邮政集团', '联合服务汽车协会', 'Finatis公司', '阿斯利康', 'KB金融集团', '损保控股有限公司',
#             'Cenovus Energy公司', '中国中车集团有限公司', '敬业集团有限公司', '西北互助人寿保险公司',
#             '日本三井住友金融集团', '纽柯', '现代摩比斯公司', 'Exelon公司', '麦格纳国际', '长江和记实业有限公司',
#             '菲尼克斯医药公司', '万通互惠理财公司', '德迅集团', '怡和集团', 'Raízen公司', '美国诺斯洛普格拉曼公司',
#             '铜陵有色金属集团控股有限公司', '三菱化学控股', '3M公司', '英美烟草集团', '日本瑞穗金融集团',
#             '海尔智家股份有限公司', '新加坡奥兰集团', '紫金矿业集团股份有限公司', '贺利氏控股集团', '爱信',
#             'Travelers公司', '中国大唐集团有限公司', '龙湖集团控股有限公司', '蜀道投资集团有限责任公司',
#             '中国航空油料集团有限公司', '艾睿电子', '新华人寿保险股份有限公司', '霍尼韦尔国际公司',
#             '日本三菱重工业股份有限公司', 'Dollar General公司', '施耐德电气', '湖南钢铁集团有限公司',
#             '潞安化工集团有限公司', '西门子能源', '波兰国营石油公司', '荷兰国际集团', '菲尼克斯集团控股公司',
#             '法国威立雅环境集团', 'Coop集团', '高通', '上海医药集团股份有限公司', '山西焦煤集团有限责任公司',
#             'CarMax公司', 'SAP公司', '新疆中泰', '塔塔钢铁', '比亚迪股份有限公司',
#             'Rajesh Exports公司', 'Inditex公司', '巴西布拉德斯科银行', '富邦金融控股股份有限公司',
#             '顺丰控股股份有限公司', '住友生命保险公司', '第一资本金融公司', '佳能', '广西投资集团有限公司', '富士通',
#             '云南省投资控股集团有限公司', '武田药品公司', '铃木汽车', 'Migros集团', 'TD Synnex公司',
#             '潍柴动力股份有限公司', '新疆广汇实业投资', '菲利普－莫里斯国际公司', '全球燃料服务公司', '加拿大丰业银行',
#             '森科能源公司', '山东高速集团有限公司', '海亮集团有限公司', 'CRH公司', 'Investor公司', '纬创集团',
#             '林德集团', '三星人寿保险', '巴西银行', '成都兴城投资集团有限公司', '广州医药集团有限公司',
#             'Performance Food Group公司', '上海德龙钢铁集团有限公司', 'GS加德士', 'Mercadona公司',
#             'CJ集团', '美敦力公司', '三星C&T公司', '台湾中油股份有限公司', '住友电工', 'X5零售集团', '达美航空',
#             '美国航空集团', '东芝', 'Netflix公司', '麦德龙', '派拉蒙环球公司', '普利司通',
#             'US Foods Holding公司', '丹纳赫公司', '珠海格力电器股份有限公司', '豪瑞', 'Medipal控股公司',
#             '捷普公司', '任仕达公司', '星巴克公司', 'Coles集团', '瑞士信贷', '莱茵集团', 'DSV公司',
#             '瑞士ABB集团', '亿滋国际', '达能', '优美科公司', '输入/英', 'WALMART', 'AMAZONCOM',
#             'STATE GRID', 'CHINA NATIONAL PETROLEUM', 'SINOPEC GROUP',
#             'SAUDI ARAMCO', 'APPLE', 'VOLKSWAGEN',
#             'CHINA STATE CONSTRUCTION ENGINEERING', 'CVS HealthCVS HEALTH',
#             'UNITEDHEALTH GROUP', 'EXXON MOBIL', 'TOYOTA MOTOR',
#             'BERKSHIRE HATHAWAY', 'SHELL', 'MCKESSON', 'AlphabetALPHABET',
#             'SAMSUNG ELECTRONICS', 'TRAFIGURA GROUP',
#             'HON HAI PRECISION INDUSTRY', 'AMERISOURCEBERGEN',
#             'INDUSTRIAL  COMMERCIAL BANK OF CHINA', 'GLENCORE',
#             'CHINA CONSTRUCTION BANK', 'PING AN INSURANCE', 'COSTCO WHOLESALE',
#             'TOTALENERGIES', 'AGRICULTURAL BANK OF CHINA',
#             'StellantisSTELLANTIS', 'CIGNA', 'SINOCHEM HOLDINGS', 'ATT',
#             'MICROSOFT', 'CHINA RAILWAY ENGINEERING GROUP', 'BP',
#             'CARDINAL HEALTH', 'CHEVRON', 'MERCEDESBENZ GROUP',
#             'CHINA RAILWAY CONSTRUCTION', 'CHINA LIFE INSURANCE', 'MITSUBISHI',
#             'BANK OF CHINA', 'HOME DEPOT', 'CHINA BAOWU STEEL GROUP',
#             'WALGREENS BOOTS ALLIANCE', 'JDCOM', 'ALLIANZ', 'AXA',
#             'MARATHON PETROLEUM', 'Elevance HealthELEVANCE HEALTH', 'KROGER',
#             'GAZPROM', 'FORD MOTOR', 'VERIZON COMMUNICATIONS',
#             'ALIBABA GROUP HOLDING', 'FORTUM', 'CHINA MOBILE COMMUNICATIONS',
#             'CHINA MINMETALS', 'BMW GROUP',
#             'CHINA COMMUNICATIONS CONSTRUCTION', 'HONDA MOTOR',
#             'DEUTSCHE TELEKOM', 'JPMORGAN CHASE', 'GENERAL MOTORS',
#             'CHINA NATIONAL OFFSHORE OIL', 'CenteneCENTENE', 'LUKOIL',
#             'SAIC MOTOR', 'SHANDONG ENERGY GROUP', 'CHINA RESOURCES',
#             'Meta PlatformsMETA PLATFORMS', 'ASSICURAZIONI GENERALI',
#             'COMCAST', 'Phillips PHILLIPS', 'HENGLI GROUP',
#             'AMER INTERNATIONAL GROUP', 'XIAMEN CD', 'ITOCHU',
#             'CHINA FAW GROUP', 'SINOPHARM', 'CHINA POST GROUP',
#             'VALERO ENERGY', 'NIPPON TELEGRAPH AND TELEPHONE',
#             'CRDIT AGRICOLE', 'CHINA ENERGY INVESTMENT', 'DELL TECHNOLOGIES',
#             'TARGET', 'MITSUI', 'CHINA SOUTHERN POWER GRID', 'ENEL', 'COFCO',
#             'HYUNDAI MOTOR', 'FANNIE MAE', 'JAPAN POST HOLDINGS',
#             'ELECTRICIT DE FRANCE', 'HUAWEI INVESTMENT  HOLDING',
#             'UNITED PARCEL SERVICE', 'LIFE INSURANCE CORP OF INDIA',
#             'DEUTSCHE POST DHL GROUP', 'POWERCHINA', 'LOWES', 'CITIC GROUP',
#             'NESTL', 'RELIANCE INDUSTRIES', 'BANK OF AMERICA',
#             'XIAMEN ITG HOLDING GROUP', 'JOHNSON  JOHNSON', 'BOSCH GROUP',
#             'BASF', 'PEOPLES INSURANCE CO OF CHINA', 'ENI', 'EON', 'HITACHI',
#             'EquinorEQUINOR', 'ROYAL AHOLD DELHAIZE', 'SONY', 'SKSK',
#             'ROSNEFT OIL', 'CARREFOUR', 'WUCHAN ZHONGDA GROUP',
#             'TENCENT HOLDINGS', 'DONGFENG MOTOR', 'BNP PARIBAS',
#             'ADMARCHER DANIELS MIDLAND', 'GREENLAND HOLDING GROUP', 'TESCO',
#             'COSCO SHIPPING', 'PETROBRAS', 'FEDEX', 'EngieENGIE',
#             'CHINA TELECOMMUNICATIONS', 'HUMANA', 'MUNICH RE GROUP',
#             'WELLS FARGO', 'STATE FARM INSURANCE',
#             'CHINA NORTH INDUSTRIES GROUP', 'PFIZER',
#             'COUNTRY GARDEN HOLDINGS', 'ALUMINUM CORP OF CHINA',
#             'ENEOS HOLDINGS', 'CITIGROUP', 'INDIAN OIL', 'PEPSICO',
#             'AVIATION INDUSTRY CORP OF CHINA', 'INTEL', 'BANCO SANTANDER',
#             'Seven  I SEVEN  I HOLDINGS', 'AEON', 'HSBC HOLDINGS',
#             'PACIFIC CONSTRUCTION GROUP', 'US POSTAL SERVICE',
#             'CHINA MERCHANTS GROUP', 'ARCELORMITTAL', 'PROCTER  GAMBLE',
#             'BANK OF COMMUNICATIONS', 'CHRISTIAN DIOR', 'MARUBENI',
#             'BROOKFIELD ASSET MANAGEMENT', 'SIEMENS', 'XMXYG', 'NISSAN MOTOR',
#             'BEIJING AUTOMOTIVE GROUP', 'JINNENG HOLDING GROUP',
#             'NIPPON LIFE INSURANCE', 'GENERAL ELECTRIC', 'PEMEX',
#             'DAIICHI LIFE HOLDINGS', 'INTERNATIONAL BUSINESS MACHINES',
#             'ROCHE GROUP', 'ALBERTSONS', 'LENOVO GROUP', 'TOYOTA TSUSHO',
#             'METLIFE', 'CHINA MERCHANTS BANK', 'PRUDENTIAL FINANCIAL',
#             'JIANGXI COPPER', 'PTT', 'CHINA VANKE', 'ZURICH INSURANCE GROUP',
#             'ZHEJIANG RONGSHENG HOLDING GROUP', 'CHINA POLY GROUP',
#             'CHINA PACIFIC INSURANCE GROUP', 'WALT DISNEY',
#             'Energy TransferENERGY TRANSFER', 'LOCKHEED MARTIN',
#             'GUANGZHOU AUTOMOBILE INDUSTRY GROUP', 'LGLG ELECTRONICS',
#             'POSCO HOLDINGS', 'HBIS GROUP', 'OIL  NATURAL GAS', 'FREDDIE MAC',
#             'WILMAR INTERNATIONAL', 'PANASONIC HOLDINGS', 'JBSJBS',
#             'GOLDMAN SACHS GROUP', 'CHINA NATIONAL BUILDING MATERIAL GROUP',
#             'RAYTHEON TECHNOLOGIES', 'AVIVA',
#             'SHANDONG WEIQIAO PIONEERING GROUP', 'AEGON', 'RIO TINTO GROUP',
#             'HP', 'LEGAL  GENERAL GROUP', 'BOEING', 'UNILEVER', 'MAERSK GROUP',
#             'AIRBUS', 'INDUSTRIAL BANK', 'SHAANXI COAL  CHEMICAL INDUSTRY',
#             'CHINA EVERBRIGHT GROUP', 'MORGAN STANLEY', 'KIA', 'BHP GROUP',
#             'NIPPON STEEL CORPORATION', 'CHINA HUANENG GROUP', 'PETRONAS',
#             'ANSTEEL GROUP', 'VINCI', 'BUNGE', 'SOCIT GNRALE',
#             'HCA HCA HEALTHCARE', 'LLOYDS BANKING GROUP', 'PERTAMINA',
#             'SINOMACH', 'TAIWAN SEMICONDUCTOR MANUFACTURING',
#             'SHANGHAI PUDONG DEVELOPMENT BANK', 'ABBVIE', 'CMA CGM',
#             'ZHEJIANG GEELY HOLDING GROUP', 'DEUTSCHE BAHN', 'VALE',
#             'POWER CORP OF CANADA', 'CHINA ELECTRONICS TECHNOLOGY GROUP',
#             'SOFTBANK GROUP', 'DOW', 'STATE BANK OF INDIA', 'RENAULT',
#             'TSINGSHAN HOLDING GROUP', 'ANHEUSERBUSCH INBEV',
#             'MITSUBISHI UFJ FINANCIAL GROUP', 'SHENGHONG HOLDING GROUP',
#             'TESLA', 'CHINA STATE SHIPBUILDING', 'TalanxTALANX', 'MIDEA GROUP',
#             'ALLSTATE', 'VODAFONE GROUP', 'NOVARTIS', 'KOREA ELECTRIC POWER',
#             'IDEMITSU KOSAN', 'REPSOL', 'SAINTGOBAIN', 'TOKIO MARINE HOLDINGS',
#             'BAYER', 'AMERICAN INTERNATIONAL GROUP', 'EDEKA ZENTRALE',
#             'SHAANXI YANCHANG PETROLEUM GROUP', 'BEST BUY',
#             'CHARTER COMMUNICATIONS', 'STATE POWER INVESTMENT', 'SYSCO',
#             'MERCK', 'NEW YORK LIFE INSURANCE', 'ZHEJIANG HENGYI GROUP',
#             'CATERPILLAR', 'XIAOMI', 'CHINA UNITED NETWORK COMMUNICATIONS',
#             'ACCENTURE', 'CHINA ENERGY ENGINEERING GROUP', 'SBERBANK',
#             'OrangeORANGE', 'WOOLWORTHS GROUP', 'CHINA MINSHENG BANKING',
#             'CISCO SYSTEMS', 'AMRICA MVIL', 'LOUIS DREYFUS',
#             'MANULIFE FINANCIAL', 'DENSO', 'SUMITOMO', 'TJXTJX', 'KDDIKDDI',
#             'BPCEGROUPE BPCE', 'PUBLIX SUPER MARKETS', 'CONOCOPHILLIPS',
#             'LIBERTY MUTUAL INSURANCE GROUP', 'PROGRESSIVE', 'INGKA GROUP',
#             'AIA GROUP', 'NATIONWIDE', 'TOKYO ELECTRIC POWER',
#             'JIANGSU SHAGANG GROUP', 'TYSON FOODS', 'EXOREXOR GROUP', 'GSK',
#             'BHARAT PETROLEUM', 'SWISS RE', 'CHINA NATIONAL COAL GROUP',
#             'INTESA SANPAOLO', 'SUSUN CONSTRUCTION GROUP', 'TELEFNICA',
#             'BRISTOLMYERS SQUIBB', 'ZHEJIANG COMMUNICATIONS INVESTMENT GROUP',
#             'SANOFI', 'IberdrolaIBERDROLA', 'LYONDELLBASELL INDUSTRIES',
#             'HANWHA', 'ROYAL BANK OF CANADA',
#             'Alimentation CoucheTardALIMENTATION COUCHETARD',
#             'MSADMSAD INSURANCE GROUP HOLDINGS', 'ZF FRIEDRICHSHAFEN',
#             'PEGATRON', 'CONTINENTAL', 'NIKE', 'BOUYGUES',
#             'CHINA SOUTH INDUSTRIES GROUP', 'FRESENIUS', 'COMPAL ELECTRONICS',
#             'DEERE', 'GEORGE WESTON', 'AMERICAN EXPRESS',
#             'SHANGHAI CONSTRUCTION GROUP',
#             'CHINA AEROSPACE SCIENCE  TECHNOLOGY', 'VOLVO',
#             'CHINA ELECTRONICS', 'ABBOTT LABORATORIES', 'CHINA HUADIAN',
#             'StoneXSTONEX GROUP', 'SHOUGANG GROUP',
#             'Plains GP HoldingsPLAINS GP HOLDINGS', 'OMV GROUP',
#             'ANGLO AMERICAN', 'SHANDONG IRON  STEEL GROUP',
#             'ITA UNIBANCO HOLDING', 'CHINA TAIPING INSURANCE GROUP',
#             'SNCF GROUP', 'HANGZHOU IRON AND STEEL GROUP', 'DZ BANK', 'CHUBB',
#             'JINCHUAN GROUP', 'LA POSTE', 'CHINA AEROSPACE SCIENCE  INDUSTRY',
#             'J SAINSBURY',
#             'Enterprise Products PartnersENTERPRISE PRODUCTS PARTNERS',
#             'THYSSENKRUPP', 'UBS GROUP', 'TAIKANG INSURANCE GROUP', 'TIAA',
#             'ORACLE', 'QUANTA COMPUTER', 'DEUTSCHE BANK',
#             'MITSUBISHI ELECTRIC', 'BANCO BILBAO VIZCAYA ARGENTARIA',
#             'ANHUI CONCH GROUP', 'DAIWA HOUSE INDUSTRY',
#             'THERMO FISHER SCIENTIFIC', 'NEW HOPE HOLDING GROUP',
#             'KOCKO HOLDING', 'JFE HOLDINGS', 'COCACOLA',
#             'GUANGZHOU MUNICIPAL CONSTRUCTION GROUP', 'GENERAL DYNAMICS',
#             'CHSCHS', 'BEIJING JIANLONG HEAVY INDUSTRY GROUP',
#             'CHINA NATIONAL NUCLEAR', 'ACSACS', 'TORONTODOMINION BANK',
#             'LORAL', 'ENERGIE BADENWRTTEMBERG', 'LGLG CHEM', 'TATA MOTORS',
#             'ELOELO GROUP', 'SHENZHEN INVESTMENT HOLDINGS', 'SKSK HYNIX',
#             'BARCLAYS', 'EnbridgeENBRIDGE', 'CATHAY FINANCIAL HOLDING',
#             'MEIJI YASUDA LIFE INSURANCE', 'POSTE ITALIANE',
#             'UNITED SERVICES AUTOMOBILE ASSN', 'FinatisFINATIS', 'ASTRAZENECA',
#             'KBKB FINANCIAL GROUP', 'SOMPO HOLDINGS',
#             'Cenovus EnergyCENOVUS ENERGY', 'CRRC GROUP', 'JINGYE GROUP',
#             'NORTHWESTERN MUTUAL', 'SUMITOMO MITSUI FINANCIAL GROUP', 'NUCOR',
#             'HYUNDAI MOBIS', 'ExelonEXELON', 'MAGNA INTERNATIONAL',
#             'CK HUTCHISON HOLDINGS', 'PHOENIX PHARMA',
#             'MASSACHUSETTS MUTUAL LIFE INSURANCE',
#             'KUEHNE  NAGEL INTERNATIONAL', 'JARDINE MATHESON', 'RazenRAZEN',
#             'NORTHROP GRUMMAN', 'TONGLING NONFERROUS METALS GROUP',
#             'MITSUBISHI CHEMICAL HOLDINGS', 'MM', 'BRITISH AMERICAN TOBACCO',
#             'MIZUHO FINANCIAL GROUP', 'HAIER SMART HOME', 'OLAM GROUP',
#             'ZIJIN MINING GROUP', 'HERAEUS HOLDING', 'AISIN',
#             'TravelersTRAVELERS', 'CHINA DATANG', 'LONGFOR GROUP HOLDINGS',
#             'SHUDAO INVESTMENT GROUP', 'CHINA NATIONAL AVIATION FUEL GROUP',
#             'ARROW ELECTRONICS', 'NEW CHINA LIFE INSURANCE',
#             'HONEYWELL INTERNATIONAL', 'MITSUBISHI HEAVY INDUSTRIES',
#             'Dollar GeneralDOLLAR GENERAL', 'SCHNEIDER ELECTRIC',
#             'HUNAN IRON  STEEL GROUP', 'LUAN CHEMICAL GROUP', 'SIEMENS ENERGY',
#             'PKN ORLEN GROUP', 'ING GROUP', 'PHOENIX GROUP HOLDINGS',
#             'VEOLIA ENVIRONNEMENT', 'CoopCOOP GROUP', 'QUALCOMM',
#             'SHANGHAI PHARMACEUTICALS HOLDING', 'SHANXI COKING COAL GROUP',
#             'CarMaxCARMAX', 'SAPSAP', 'XINJIANG ZHONGTAI GROUP', 'TATA STEEL',
#             'BYD', 'Rajesh ExportsRAJESH EXPORTS', 'InditexINDITEX',
#             'BANCO BRADESCO', 'FUBON FINANCIAL HOLDING', 'SF HOLDING',
#             'SUMITOMO LIFE INSURANCE', 'CAPITAL ONE FINANCIAL', 'CANON',
#             'GUANGXI INVESTMENT GROUP', 'FUJITSU',
#             'YUNNAN PROVINCIAL INVESTMENT HOLDING GROUP',
#             'TAKEDA PHARMACEUTICAL', 'SUZUKI MOTOR', 'MigrosMIGROS GROUP',
#             'TD SynnexTD SYNNEX', 'WEICHAI POWER',
#             'XINJIANG GUANGHUI INDUSTRY INVESTMENT',
#             'PHILIP MORRIS INTERNATIONAL', 'WORLD FUEL SERVICES',
#             'BANK OF NOVA SCOTIA', 'SUNCOR ENERGY', 'SHANDONG HISPEED GROUP',
#             'HAILIANG GROUP', 'CRHCRH', 'InvestorINVESTOR', 'WISTRON', 'LINDE',
#             'SAMSUNG LIFE INSURANCE', 'BANCO DO BRASIL',
#             'CHENGDU XINGCHENG INVESTMENT GROUP',
#             'GUANGZHOU PHARMACEUTICAL HOLDINGS',
#             'Performance Food GroupPERFORMANCE FOOD GROUP',
#             'SHANGHAI DELONG STEEL GROUP', 'GSGS CALTEX', 'MercadonaMERCADONA',
#             'CJCJ CORP', 'MEDTRONIC', 'CTSAMSUNG CT', 'CPC',
#             'SUMITOMO ELECTRIC INDUSTRIES', 'XX RETAIL GROUP',
#             'DELTA AIR LINES', 'AMERICAN AIRLINES GROUP', 'TOSHIBA',
#             'NetflixNETFLIX', 'METRO', 'PARAMOUNT GLOBAL', 'BRIDGESTONE',
#             'US Foods HoldingUS FOODS HOLDING', 'DANAHER',
#             'GREE ELECTRIC APPLIANCES', 'HOLCIM', 'MedipalMEDIPAL HOLDINGS',
#             'JABIL', 'RANDSTAD', 'STARBUCKS', 'ColesCOLES GROUP',
#             'CREDIT SUISSE GROUP', 'RWE', 'DSVDSV', 'ABBABB',
#             'MONDELEZ INTERNATIONAL', 'DANONE', 'UMICORE'
#     ]:
#         InputDict['Intern_1'] = 1
#     elif Intern_1 == 'Others' or Intern_1 == '其他':
#         InputDict['Intern_1'] = 0

#     if Intern_2 in [
#             '沃尔玛', '亚马逊', '国家电网有限公司', '中国石油天然气集团有限公司', '中国石油化工集团有限公司',
#             '沙特阿美公司', '苹果公司', '大众公司', '中国建筑集团有限公司', 'CVS Health公司', '联合健康集团',
#             '埃克森美孚', '丰田汽车公司', '伯克希尔－哈撒韦公司', '壳牌公司', '麦克森公司', 'Alphabet公司',
#             '三星电子', '托克集团', '鸿海精密工业股份有限公司', '美源伯根公司', '中国工商银行股份有限公司', '嘉能可',
#             '中国建设银行股份有限公司', '中国平安保险', '开市客', '道达尔能源公司', '中国农业银行股份有限公司',
#             'Stellantis集团', '信诺', '中国中化控股有限责任公司', '美国电话电报公司', '微软',
#             '中国铁路工程集团有限公司', '英国石油公司', '嘉德诺', '雪佛龙', '梅赛德斯-奔驰集团',
#             '中国铁道建筑集团有限公司', '中国人寿保险', '三菱商事株式会社', '中国银行股份有限公司', '家得宝',
#             '中国宝武钢铁集团有限公司', '沃博联', '京东集团股份有限公司', '安联保险集团', '安盛', '马拉松原油公司',
#             'Elevance Health公司', '克罗格', '俄罗斯天然气工业股份公司', '福特汽车公司', '威瑞森电信',
#             '阿里巴巴集团控股有限公司', '富腾公司', '中国移动通信集团有限公司', '中国五矿集团有限公司', '宝马集团',
#             '中国交通建设集团有限公司', '本田汽车', '德国电信', '摩根大通公司', '通用汽车公司', '中国海洋石油集团有限公司',
#             'Centene公司', '卢克石油公司', '上海汽车集团股份有限公司', '山东能源集团有限公司', '中国华润有限公司',
#             'Meta Platforms公司', '意大利忠利保险公司', '美国康卡斯特电信公司', 'Phillips 66公司',
#             '恒力集团有限公司', '正威国际集团有限公司', '厦门建发集团有限公司', '日本伊藤忠商事株式会社',
#             '中国第一汽车集团有限公司', '中国医药集团有限公司', '中国邮政集团有限公司', '瓦莱罗能源公司', '日本电报电话公司',
#             '法国农业信贷银行', '国家能源投资集团有限责任公司', '戴尔科技公司', '塔吉特公司', '三井物产株式会社',
#             '中国南方电网有限责任公司', '意大利国家电力公司', '中粮集团有限公司', '现代汽车', '房利美', '日本邮政控股公司',
#             '法国电力公司', '华为投资控股有限公司', '联合包裹速递服务公司', '印度人寿保险公司', '德国邮政敦豪集团',
#             '中国电力建设集团有限公司', '美国劳氏公司', '中国中信集团有限公司', '雀巢公司', '信实工业公司', '美国银行',
#             '厦门国贸控股集团有限公司', '强生', '博世集团', '巴斯夫公司', '中国人民保险集团股份有限公司', '埃尼石油公司',
#             '意昂集团', '日立', 'Equinor公司', '皇家阿霍德德尔海兹集团', '索尼', 'SK集团', '俄罗斯石油公司',
#             '家乐福', '物产中大集团股份有限公司', '腾讯控股有限公司', '东风汽车集团有限公司', '法国巴黎银行', 'ADM公司',
#             '绿地控股集团股份有限公司', '乐购', '中国远洋海运集团有限公司', '巴西国家石油公司', '联邦快递',
#             'Engie集团', '中国电信集团有限公司', '哈门那公司', '慕尼黑再保险集团', '美国富国银行', '州立农业保险公司',
#             '中国兵器工业集团有限公司', '辉瑞制药有限公司', '碧桂园控股有限公司', '中国铝业集团有限公司', '引能仕控股株式会社',
#             '花旗集团', '印度石油公司', '百事公司', '中国航空工业集团有限公司', '英特尔公司', '西班牙国家银行',
#             'Seven & I 控股公司', '日本永旺集团', '汇丰银行控股公司', '太平洋建设集团有限公司', '美国邮政',
#             '招商局集团有限公司', '安赛乐米塔尔', '宝洁公司', '交通银行股份有限公司', '迪奥公司', '丸红株式会社',
#             '布鲁克菲尔德资产管理公司', '西门子', '厦门象屿集团有限公司', '日产汽车', '北京汽车集团有限公司',
#             '晋能控股集团有限公司', '日本生命保险公司', '通用电气公司', '墨西哥石油公司', '第一生命控股有限公司',
#             '国际商业机器公司', '瑞士罗氏公司', '艾伯森公司', '联想集团有限公司', '丰田通商公司', '大都会人寿',
#             '招商银行股份有限公司', '保德信金融集团', '江西铜业集团有限公司', '泰国国家石油有限公司', '万科企业股份有限公司',
#             '苏黎世保险集团', '浙江荣盛控股集团有限公司', '中国保利集团有限公司', '中国太平洋保险股份有限公司)',
#             '华特迪士尼公司', 'Energy Transfer公司', '洛克希德－马丁', '广州汽车工业集团有限公司', 'LG电子',
#             '浦项制铁控股公司', '河钢集团有限公司', '印度石油天然气公司', '房地美', '丰益国际', '松下控股公司',
#             '巴西JBS公司', '高盛', '中国建材集团有限公司', '雷神技术公司', '英杰华集团', '山东魏桥创业集团有限公司',
#             '荷兰全球保险集团', '力拓集团', '惠普公司', '英国励正集团', '波音', '联合利华', '马士基集团',
#             '空中客车公司', '兴业银行股份有限公司', '陕西煤业化工集团有限责任公司', '中国光大集团股份公司', '摩根士丹利',
#             '起亚公司', '必和必拓集团', '日本制铁集团公司', '中国华能集团有限公司', '马来西亚国家石油公司',
#             '鞍钢集团有限公司', '万喜集团', '邦吉公司', '法国兴业银行', 'HCA 医疗保健公司', '英国劳埃德银行集团',
#             '印尼国家石油公司', '中国机械工业集团有限公司', '台积公司', '上海浦东发展银行股份有限公司', '艾伯维',
#             '法国达飞海运集团', '浙江吉利控股集团有限公司', '德国联邦铁路公司', '巴西淡水河谷公司', '加拿大鲍尔集团',
#             '中国电子科技集团有限公司', '软银集团', '陶氏公司', '印度国家银行', '雷诺', '青山控股集团有限公司',
#             '百威英博', '三菱日联金融集团', '盛虹控股集团有限公司', '特斯拉', '中国船舶集团有限公司', 'Talanx公司',
#             '美的集团股份有限公司', '好事达', '沃达丰集团', '诺华公司', '韩国电力公司', '日本出光兴产株式会社',
#             '雷普索尔公司', '圣戈班集团', '东京海上日动火灾保险公司', '拜耳集团', '美国国际集团', '德国艾德卡公司',
#             '陕西延长石油)', '百思买', '特许通讯公司', '国家电力投资集团有限公司', '西斯科公司', '默沙东',
#             '美国纽约人寿保险公司', '浙江恒逸集团有限公司', '卡特彼勒', '小米集团', '中国联合网络通信股份有限公司',
#             '埃森哲', '中国能源建设集团有限公司', '俄罗斯联邦储蓄银行', 'Orange公司', '伍尔沃斯集团',
#             '中国民生银行股份有限公司', '思科公司', '美洲电信', '路易达孚集团', '宏利金融', '电装公司', '住友商事',
#             'TJX公司', '日本KDDI电信公司', '法国BPCE银行集团', '大众超级市场公司', '康菲石油公司',
#             '美国利宝互助保险集团', '前进保险公司', '英格卡集团', '友邦保险控股有限公司', '美国全国保险公司',
#             '东京电力公司', '江苏沙钢集团有限公司', '泰森食品', 'EXOR集团', '葛兰素史克集团', '巴拉特石油公司',
#             '瑞士再保险股份有限公司', '中国中煤能源集团有限公司', '意大利联合圣保罗银行', '苏商建设集团有限公司',
#             '西班牙电话公司', '百时美施贵宝公司', '浙江省交通投资集团有限公司', '赛诺菲', 'Iberdrola公司',
#             '利安德巴塞尔工业公司', '韩华集团', '加拿大皇家银行', 'Alimentation Couche-Tard公司',
#             'MS&AD保险集团控股有限公司', '采埃孚', '和硕', '德国大陆集团', '耐克公司', '法国布伊格集团',
#             '中国兵器装备集团公司', '费森尤斯集团', '仁宝电脑', '迪尔公司', '乔治威斯顿公司', '美国运通公司',
#             '上海建工集团股份有限公司', '中国航天科技集团有限公司', '沃尔沃集团', '中国电子信息产业集团有限公司', '雅培公司',
#             '中国华电集团有限公司', 'StoneX集团', '首钢集团有限公司', 'Plains GP Holdings公司',
#             '奥地利石油天然气集团', '英美资源集团', '山东钢铁集团有限公司', '伊塔乌联合银行控股公司',
#             '中国太平保险集团有限责任公司', '法国国营铁路集团', '杭州钢铁集团有限公司', '德国中央合作银行', '安达保险公司',
#             '金川集团股份有限公司', '法国邮政', '中国航天科工集团有限公司', '森宝利公司',
#             'Enterprise Products Partners公司', '蒂森克虏伯', '瑞银集团', '泰康保险集团股份有限公司',
#             '美国教师退休基金会', '甲骨文公司', '广达电脑公司', '德意志银行', '三菱电机股份有限公司', '西班牙对外银行',
#             '安徽海螺集团有限责任公司', '大和房建', '赛默飞世尔科技公司', '新希望控股集团有限公司', 'KOC集团',
#             '日本钢铁工程控股公司', '可口可乐公司', '广州市建筑集团有限公司', '通用动力', 'CHS公司',
#             '北京建龙重工集团有限公司', '中国核工业集团有限公司', '西班牙ACS集团', '多伦多道明银行', '欧莱雅',
#             '巴登-符滕堡州能源公司', 'LG化学公司', '印度塔塔汽车公司', 'ELO集团', '深圳市投资控股有限公司',
#             'SK海力士公司', '巴克莱', 'Enbridge公司', '国泰金融控股股份有限公司', '日本明治安田生命保险公司',
#             '意大利邮政集团', '联合服务汽车协会', 'Finatis公司', '阿斯利康', 'KB金融集团', '损保控股有限公司',
#             'Cenovus Energy公司', '中国中车集团有限公司', '敬业集团有限公司', '西北互助人寿保险公司',
#             '日本三井住友金融集团', '纽柯', '现代摩比斯公司', 'Exelon公司', '麦格纳国际', '长江和记实业有限公司',
#             '菲尼克斯医药公司', '万通互惠理财公司', '德迅集团', '怡和集团', 'Raízen公司', '美国诺斯洛普格拉曼公司',
#             '铜陵有色金属集团控股有限公司', '三菱化学控股', '3M公司', '英美烟草集团', '日本瑞穗金融集团',
#             '海尔智家股份有限公司', '新加坡奥兰集团', '紫金矿业集团股份有限公司', '贺利氏控股集团', '爱信',
#             'Travelers公司', '中国大唐集团有限公司', '龙湖集团控股有限公司', '蜀道投资集团有限责任公司',
#             '中国航空油料集团有限公司', '艾睿电子', '新华人寿保险股份有限公司', '霍尼韦尔国际公司',
#             '日本三菱重工业股份有限公司', 'Dollar General公司', '施耐德电气', '湖南钢铁集团有限公司',
#             '潞安化工集团有限公司', '西门子能源', '波兰国营石油公司', '荷兰国际集团', '菲尼克斯集团控股公司',
#             '法国威立雅环境集团', 'Coop集团', '高通', '上海医药集团股份有限公司', '山西焦煤集团有限责任公司',
#             'CarMax公司', 'SAP公司', '新疆中泰', '塔塔钢铁', '比亚迪股份有限公司',
#             'Rajesh Exports公司', 'Inditex公司', '巴西布拉德斯科银行', '富邦金融控股股份有限公司',
#             '顺丰控股股份有限公司', '住友生命保险公司', '第一资本金融公司', '佳能', '广西投资集团有限公司', '富士通',
#             '云南省投资控股集团有限公司', '武田药品公司', '铃木汽车', 'Migros集团', 'TD Synnex公司',
#             '潍柴动力股份有限公司', '新疆广汇实业投资', '菲利普－莫里斯国际公司', '全球燃料服务公司', '加拿大丰业银行',
#             '森科能源公司', '山东高速集团有限公司', '海亮集团有限公司', 'CRH公司', 'Investor公司', '纬创集团',
#             '林德集团', '三星人寿保险', '巴西银行', '成都兴城投资集团有限公司', '广州医药集团有限公司',
#             'Performance Food Group公司', '上海德龙钢铁集团有限公司', 'GS加德士', 'Mercadona公司',
#             'CJ集团', '美敦力公司', '三星C&T公司', '台湾中油股份有限公司', '住友电工', 'X5零售集团', '达美航空',
#             '美国航空集团', '东芝', 'Netflix公司', '麦德龙', '派拉蒙环球公司', '普利司通',
#             'US Foods Holding公司', '丹纳赫公司', '珠海格力电器股份有限公司', '豪瑞', 'Medipal控股公司',
#             '捷普公司', '任仕达公司', '星巴克公司', 'Coles集团', '瑞士信贷', '莱茵集团', 'DSV公司',
#             '瑞士ABB集团', '亿滋国际', '达能', '优美科公司', '输入/英', 'WALMART', 'AMAZONCOM',
#             'STATE GRID', 'CHINA NATIONAL PETROLEUM', 'SINOPEC GROUP',
#             'SAUDI ARAMCO', 'APPLE', 'VOLKSWAGEN',
#             'CHINA STATE CONSTRUCTION ENGINEERING', 'CVS HealthCVS HEALTH',
#             'UNITEDHEALTH GROUP', 'EXXON MOBIL', 'TOYOTA MOTOR',
#             'BERKSHIRE HATHAWAY', 'SHELL', 'MCKESSON', 'AlphabetALPHABET',
#             'SAMSUNG ELECTRONICS', 'TRAFIGURA GROUP',
#             'HON HAI PRECISION INDUSTRY', 'AMERISOURCEBERGEN',
#             'INDUSTRIAL  COMMERCIAL BANK OF CHINA', 'GLENCORE',
#             'CHINA CONSTRUCTION BANK', 'PING AN INSURANCE', 'COSTCO WHOLESALE',
#             'TOTALENERGIES', 'AGRICULTURAL BANK OF CHINA',
#             'StellantisSTELLANTIS', 'CIGNA', 'SINOCHEM HOLDINGS', 'ATT',
#             'MICROSOFT', 'CHINA RAILWAY ENGINEERING GROUP', 'BP',
#             'CARDINAL HEALTH', 'CHEVRON', 'MERCEDESBENZ GROUP',
#             'CHINA RAILWAY CONSTRUCTION', 'CHINA LIFE INSURANCE', 'MITSUBISHI',
#             'BANK OF CHINA', 'HOME DEPOT', 'CHINA BAOWU STEEL GROUP',
#             'WALGREENS BOOTS ALLIANCE', 'JDCOM', 'ALLIANZ', 'AXA',
#             'MARATHON PETROLEUM', 'Elevance HealthELEVANCE HEALTH', 'KROGER',
#             'GAZPROM', 'FORD MOTOR', 'VERIZON COMMUNICATIONS',
#             'ALIBABA GROUP HOLDING', 'FORTUM', 'CHINA MOBILE COMMUNICATIONS',
#             'CHINA MINMETALS', 'BMW GROUP',
#             'CHINA COMMUNICATIONS CONSTRUCTION', 'HONDA MOTOR',
#             'DEUTSCHE TELEKOM', 'JPMORGAN CHASE', 'GENERAL MOTORS',
#             'CHINA NATIONAL OFFSHORE OIL', 'CenteneCENTENE', 'LUKOIL',
#             'SAIC MOTOR', 'SHANDONG ENERGY GROUP', 'CHINA RESOURCES',
#             'Meta PlatformsMETA PLATFORMS', 'ASSICURAZIONI GENERALI',
#             'COMCAST', 'Phillips PHILLIPS', 'HENGLI GROUP',
#             'AMER INTERNATIONAL GROUP', 'XIAMEN CD', 'ITOCHU',
#             'CHINA FAW GROUP', 'SINOPHARM', 'CHINA POST GROUP',
#             'VALERO ENERGY', 'NIPPON TELEGRAPH AND TELEPHONE',
#             'CRDIT AGRICOLE', 'CHINA ENERGY INVESTMENT', 'DELL TECHNOLOGIES',
#             'TARGET', 'MITSUI', 'CHINA SOUTHERN POWER GRID', 'ENEL', 'COFCO',
#             'HYUNDAI MOTOR', 'FANNIE MAE', 'JAPAN POST HOLDINGS',
#             'ELECTRICIT DE FRANCE', 'HUAWEI INVESTMENT  HOLDING',
#             'UNITED PARCEL SERVICE', 'LIFE INSURANCE CORP OF INDIA',
#             'DEUTSCHE POST DHL GROUP', 'POWERCHINA', 'LOWES', 'CITIC GROUP',
#             'NESTL', 'RELIANCE INDUSTRIES', 'BANK OF AMERICA',
#             'XIAMEN ITG HOLDING GROUP', 'JOHNSON  JOHNSON', 'BOSCH GROUP',
#             'BASF', 'PEOPLES INSURANCE CO OF CHINA', 'ENI', 'EON', 'HITACHI',
#             'EquinorEQUINOR', 'ROYAL AHOLD DELHAIZE', 'SONY', 'SKSK',
#             'ROSNEFT OIL', 'CARREFOUR', 'WUCHAN ZHONGDA GROUP',
#             'TENCENT HOLDINGS', 'DONGFENG MOTOR', 'BNP PARIBAS',
#             'ADMARCHER DANIELS MIDLAND', 'GREENLAND HOLDING GROUP', 'TESCO',
#             'COSCO SHIPPING', 'PETROBRAS', 'FEDEX', 'EngieENGIE',
#             'CHINA TELECOMMUNICATIONS', 'HUMANA', 'MUNICH RE GROUP',
#             'WELLS FARGO', 'STATE FARM INSURANCE',
#             'CHINA NORTH INDUSTRIES GROUP', 'PFIZER',
#             'COUNTRY GARDEN HOLDINGS', 'ALUMINUM CORP OF CHINA',
#             'ENEOS HOLDINGS', 'CITIGROUP', 'INDIAN OIL', 'PEPSICO',
#             'AVIATION INDUSTRY CORP OF CHINA', 'INTEL', 'BANCO SANTANDER',
#             'Seven  I SEVEN  I HOLDINGS', 'AEON', 'HSBC HOLDINGS',
#             'PACIFIC CONSTRUCTION GROUP', 'US POSTAL SERVICE',
#             'CHINA MERCHANTS GROUP', 'ARCELORMITTAL', 'PROCTER  GAMBLE',
#             'BANK OF COMMUNICATIONS', 'CHRISTIAN DIOR', 'MARUBENI',
#             'BROOKFIELD ASSET MANAGEMENT', 'SIEMENS', 'XMXYG', 'NISSAN MOTOR',
#             'BEIJING AUTOMOTIVE GROUP', 'JINNENG HOLDING GROUP',
#             'NIPPON LIFE INSURANCE', 'GENERAL ELECTRIC', 'PEMEX',
#             'DAIICHI LIFE HOLDINGS', 'INTERNATIONAL BUSINESS MACHINES',
#             'ROCHE GROUP', 'ALBERTSONS', 'LENOVO GROUP', 'TOYOTA TSUSHO',
#             'METLIFE', 'CHINA MERCHANTS BANK', 'PRUDENTIAL FINANCIAL',
#             'JIANGXI COPPER', 'PTT', 'CHINA VANKE', 'ZURICH INSURANCE GROUP',
#             'ZHEJIANG RONGSHENG HOLDING GROUP', 'CHINA POLY GROUP',
#             'CHINA PACIFIC INSURANCE GROUP', 'WALT DISNEY',
#             'Energy TransferENERGY TRANSFER', 'LOCKHEED MARTIN',
#             'GUANGZHOU AUTOMOBILE INDUSTRY GROUP', 'LGLG ELECTRONICS',
#             'POSCO HOLDINGS', 'HBIS GROUP', 'OIL  NATURAL GAS', 'FREDDIE MAC',
#             'WILMAR INTERNATIONAL', 'PANASONIC HOLDINGS', 'JBSJBS',
#             'GOLDMAN SACHS GROUP', 'CHINA NATIONAL BUILDING MATERIAL GROUP',
#             'RAYTHEON TECHNOLOGIES', 'AVIVA',
#             'SHANDONG WEIQIAO PIONEERING GROUP', 'AEGON', 'RIO TINTO GROUP',
#             'HP', 'LEGAL  GENERAL GROUP', 'BOEING', 'UNILEVER', 'MAERSK GROUP',
#             'AIRBUS', 'INDUSTRIAL BANK', 'SHAANXI COAL  CHEMICAL INDUSTRY',
#             'CHINA EVERBRIGHT GROUP', 'MORGAN STANLEY', 'KIA', 'BHP GROUP',
#             'NIPPON STEEL CORPORATION', 'CHINA HUANENG GROUP', 'PETRONAS',
#             'ANSTEEL GROUP', 'VINCI', 'BUNGE', 'SOCIT GNRALE',
#             'HCA HCA HEALTHCARE', 'LLOYDS BANKING GROUP', 'PERTAMINA',
#             'SINOMACH', 'TAIWAN SEMICONDUCTOR MANUFACTURING',
#             'SHANGHAI PUDONG DEVELOPMENT BANK', 'ABBVIE', 'CMA CGM',
#             'ZHEJIANG GEELY HOLDING GROUP', 'DEUTSCHE BAHN', 'VALE',
#             'POWER CORP OF CANADA', 'CHINA ELECTRONICS TECHNOLOGY GROUP',
#             'SOFTBANK GROUP', 'DOW', 'STATE BANK OF INDIA', 'RENAULT',
#             'TSINGSHAN HOLDING GROUP', 'ANHEUSERBUSCH INBEV',
#             'MITSUBISHI UFJ FINANCIAL GROUP', 'SHENGHONG HOLDING GROUP',
#             'TESLA', 'CHINA STATE SHIPBUILDING', 'TalanxTALANX', 'MIDEA GROUP',
#             'ALLSTATE', 'VODAFONE GROUP', 'NOVARTIS', 'KOREA ELECTRIC POWER',
#             'IDEMITSU KOSAN', 'REPSOL', 'SAINTGOBAIN', 'TOKIO MARINE HOLDINGS',
#             'BAYER', 'AMERICAN INTERNATIONAL GROUP', 'EDEKA ZENTRALE',
#             'SHAANXI YANCHANG PETROLEUM GROUP', 'BEST BUY',
#             'CHARTER COMMUNICATIONS', 'STATE POWER INVESTMENT', 'SYSCO',
#             'MERCK', 'NEW YORK LIFE INSURANCE', 'ZHEJIANG HENGYI GROUP',
#             'CATERPILLAR', 'XIAOMI', 'CHINA UNITED NETWORK COMMUNICATIONS',
#             'ACCENTURE', 'CHINA ENERGY ENGINEERING GROUP', 'SBERBANK',
#             'OrangeORANGE', 'WOOLWORTHS GROUP', 'CHINA MINSHENG BANKING',
#             'CISCO SYSTEMS', 'AMRICA MVIL', 'LOUIS DREYFUS',
#             'MANULIFE FINANCIAL', 'DENSO', 'SUMITOMO', 'TJXTJX', 'KDDIKDDI',
#             'BPCEGROUPE BPCE', 'PUBLIX SUPER MARKETS', 'CONOCOPHILLIPS',
#             'LIBERTY MUTUAL INSURANCE GROUP', 'PROGRESSIVE', 'INGKA GROUP',
#             'AIA GROUP', 'NATIONWIDE', 'TOKYO ELECTRIC POWER',
#             'JIANGSU SHAGANG GROUP', 'TYSON FOODS', 'EXOREXOR GROUP', 'GSK',
#             'BHARAT PETROLEUM', 'SWISS RE', 'CHINA NATIONAL COAL GROUP',
#             'INTESA SANPAOLO', 'SUSUN CONSTRUCTION GROUP', 'TELEFNICA',
#             'BRISTOLMYERS SQUIBB', 'ZHEJIANG COMMUNICATIONS INVESTMENT GROUP',
#             'SANOFI', 'IberdrolaIBERDROLA', 'LYONDELLBASELL INDUSTRIES',
#             'HANWHA', 'ROYAL BANK OF CANADA',
#             'Alimentation CoucheTardALIMENTATION COUCHETARD',
#             'MSADMSAD INSURANCE GROUP HOLDINGS', 'ZF FRIEDRICHSHAFEN',
#             'PEGATRON', 'CONTINENTAL', 'NIKE', 'BOUYGUES',
#             'CHINA SOUTH INDUSTRIES GROUP', 'FRESENIUS', 'COMPAL ELECTRONICS',
#             'DEERE', 'GEORGE WESTON', 'AMERICAN EXPRESS',
#             'SHANGHAI CONSTRUCTION GROUP',
#             'CHINA AEROSPACE SCIENCE  TECHNOLOGY', 'VOLVO',
#             'CHINA ELECTRONICS', 'ABBOTT LABORATORIES', 'CHINA HUADIAN',
#             'StoneXSTONEX GROUP', 'SHOUGANG GROUP',
#             'Plains GP HoldingsPLAINS GP HOLDINGS', 'OMV GROUP',
#             'ANGLO AMERICAN', 'SHANDONG IRON  STEEL GROUP',
#             'ITA UNIBANCO HOLDING', 'CHINA TAIPING INSURANCE GROUP',
#             'SNCF GROUP', 'HANGZHOU IRON AND STEEL GROUP', 'DZ BANK', 'CHUBB',
#             'JINCHUAN GROUP', 'LA POSTE', 'CHINA AEROSPACE SCIENCE  INDUSTRY',
#             'J SAINSBURY',
#             'Enterprise Products PartnersENTERPRISE PRODUCTS PARTNERS',
#             'THYSSENKRUPP', 'UBS GROUP', 'TAIKANG INSURANCE GROUP', 'TIAA',
#             'ORACLE', 'QUANTA COMPUTER', 'DEUTSCHE BANK',
#             'MITSUBISHI ELECTRIC', 'BANCO BILBAO VIZCAYA ARGENTARIA',
#             'ANHUI CONCH GROUP', 'DAIWA HOUSE INDUSTRY',
#             'THERMO FISHER SCIENTIFIC', 'NEW HOPE HOLDING GROUP',
#             'KOCKO HOLDING', 'JFE HOLDINGS', 'COCACOLA',
#             'GUANGZHOU MUNICIPAL CONSTRUCTION GROUP', 'GENERAL DYNAMICS',
#             'CHSCHS', 'BEIJING JIANLONG HEAVY INDUSTRY GROUP',
#             'CHINA NATIONAL NUCLEAR', 'ACSACS', 'TORONTODOMINION BANK',
#             'LORAL', 'ENERGIE BADENWRTTEMBERG', 'LGLG CHEM', 'TATA MOTORS',
#             'ELOELO GROUP', 'SHENZHEN INVESTMENT HOLDINGS', 'SKSK HYNIX',
#             'BARCLAYS', 'EnbridgeENBRIDGE', 'CATHAY FINANCIAL HOLDING',
#             'MEIJI YASUDA LIFE INSURANCE', 'POSTE ITALIANE',
#             'UNITED SERVICES AUTOMOBILE ASSN', 'FinatisFINATIS', 'ASTRAZENECA',
#             'KBKB FINANCIAL GROUP', 'SOMPO HOLDINGS',
#             'Cenovus EnergyCENOVUS ENERGY', 'CRRC GROUP', 'JINGYE GROUP',
#             'NORTHWESTERN MUTUAL', 'SUMITOMO MITSUI FINANCIAL GROUP', 'NUCOR',
#             'HYUNDAI MOBIS', 'ExelonEXELON', 'MAGNA INTERNATIONAL',
#             'CK HUTCHISON HOLDINGS', 'PHOENIX PHARMA',
#             'MASSACHUSETTS MUTUAL LIFE INSURANCE',
#             'KUEHNE  NAGEL INTERNATIONAL', 'JARDINE MATHESON', 'RazenRAZEN',
#             'NORTHROP GRUMMAN', 'TONGLING NONFERROUS METALS GROUP',
#             'MITSUBISHI CHEMICAL HOLDINGS', 'MM', 'BRITISH AMERICAN TOBACCO',
#             'MIZUHO FINANCIAL GROUP', 'HAIER SMART HOME', 'OLAM GROUP',
#             'ZIJIN MINING GROUP', 'HERAEUS HOLDING', 'AISIN',
#             'TravelersTRAVELERS', 'CHINA DATANG', 'LONGFOR GROUP HOLDINGS',
#             'SHUDAO INVESTMENT GROUP', 'CHINA NATIONAL AVIATION FUEL GROUP',
#             'ARROW ELECTRONICS', 'NEW CHINA LIFE INSURANCE',
#             'HONEYWELL INTERNATIONAL', 'MITSUBISHI HEAVY INDUSTRIES',
#             'Dollar GeneralDOLLAR GENERAL', 'SCHNEIDER ELECTRIC',
#             'HUNAN IRON  STEEL GROUP', 'LUAN CHEMICAL GROUP', 'SIEMENS ENERGY',
#             'PKN ORLEN GROUP', 'ING GROUP', 'PHOENIX GROUP HOLDINGS',
#             'VEOLIA ENVIRONNEMENT', 'CoopCOOP GROUP', 'QUALCOMM',
#             'SHANGHAI PHARMACEUTICALS HOLDING', 'SHANXI COKING COAL GROUP',
#             'CarMaxCARMAX', 'SAPSAP', 'XINJIANG ZHONGTAI GROUP', 'TATA STEEL',
#             'BYD', 'Rajesh ExportsRAJESH EXPORTS', 'InditexINDITEX',
#             'BANCO BRADESCO', 'FUBON FINANCIAL HOLDING', 'SF HOLDING',
#             'SUMITOMO LIFE INSURANCE', 'CAPITAL ONE FINANCIAL', 'CANON',
#             'GUANGXI INVESTMENT GROUP', 'FUJITSU',
#             'YUNNAN PROVINCIAL INVESTMENT HOLDING GROUP',
#             'TAKEDA PHARMACEUTICAL', 'SUZUKI MOTOR', 'MigrosMIGROS GROUP',
#             'TD SynnexTD SYNNEX', 'WEICHAI POWER',
#             'XINJIANG GUANGHUI INDUSTRY INVESTMENT',
#             'PHILIP MORRIS INTERNATIONAL', 'WORLD FUEL SERVICES',
#             'BANK OF NOVA SCOTIA', 'SUNCOR ENERGY', 'SHANDONG HISPEED GROUP',
#             'HAILIANG GROUP', 'CRHCRH', 'InvestorINVESTOR', 'WISTRON', 'LINDE',
#             'SAMSUNG LIFE INSURANCE', 'BANCO DO BRASIL',
#             'CHENGDU XINGCHENG INVESTMENT GROUP',
#             'GUANGZHOU PHARMACEUTICAL HOLDINGS',
#             'Performance Food GroupPERFORMANCE FOOD GROUP',
#             'SHANGHAI DELONG STEEL GROUP', 'GSGS CALTEX', 'MercadonaMERCADONA',
#             'CJCJ CORP', 'MEDTRONIC', 'CTSAMSUNG CT', 'CPC',
#             'SUMITOMO ELECTRIC INDUSTRIES', 'XX RETAIL GROUP',
#             'DELTA AIR LINES', 'AMERICAN AIRLINES GROUP', 'TOSHIBA',
#             'NetflixNETFLIX', 'METRO', 'PARAMOUNT GLOBAL', 'BRIDGESTONE',
#             'US Foods HoldingUS FOODS HOLDING', 'DANAHER',
#             'GREE ELECTRIC APPLIANCES', 'HOLCIM', 'MedipalMEDIPAL HOLDINGS',
#             'JABIL', 'RANDSTAD', 'STARBUCKS', 'ColesCOLES GROUP',
#             'CREDIT SUISSE GROUP', 'RWE', 'DSVDSV', 'ABBABB',
#             'MONDELEZ INTERNATIONAL', 'DANONE', 'UMICORE'
#     ]:
#         InputDict['Intern_2'] = 1
#     elif Intern_2 == 'Others' or Intern_2 == '其他':
#         InputDict['Intern_2'] = 0

#     if Intern_3 in [
#             '沃尔玛', '亚马逊', '国家电网有限公司', '中国石油天然气集团有限公司', '中国石油化工集团有限公司',
#             '沙特阿美公司', '苹果公司', '大众公司', '中国建筑集团有限公司', 'CVS Health公司', '联合健康集团',
#             '埃克森美孚', '丰田汽车公司', '伯克希尔－哈撒韦公司', '壳牌公司', '麦克森公司', 'Alphabet公司',
#             '三星电子', '托克集团', '鸿海精密工业股份有限公司', '美源伯根公司', '中国工商银行股份有限公司', '嘉能可',
#             '中国建设银行股份有限公司', '中国平安保险', '开市客', '道达尔能源公司', '中国农业银行股份有限公司',
#             'Stellantis集团', '信诺', '中国中化控股有限责任公司', '美国电话电报公司', '微软',
#             '中国铁路工程集团有限公司', '英国石油公司', '嘉德诺', '雪佛龙', '梅赛德斯-奔驰集团',
#             '中国铁道建筑集团有限公司', '中国人寿保险', '三菱商事株式会社', '中国银行股份有限公司', '家得宝',
#             '中国宝武钢铁集团有限公司', '沃博联', '京东集团股份有限公司', '安联保险集团', '安盛', '马拉松原油公司',
#             'Elevance Health公司', '克罗格', '俄罗斯天然气工业股份公司', '福特汽车公司', '威瑞森电信',
#             '阿里巴巴集团控股有限公司', '富腾公司', '中国移动通信集团有限公司', '中国五矿集团有限公司', '宝马集团',
#             '中国交通建设集团有限公司', '本田汽车', '德国电信', '摩根大通公司', '通用汽车公司', '中国海洋石油集团有限公司',
#             'Centene公司', '卢克石油公司', '上海汽车集团股份有限公司', '山东能源集团有限公司', '中国华润有限公司',
#             'Meta Platforms公司', '意大利忠利保险公司', '美国康卡斯特电信公司', 'Phillips 66公司',
#             '恒力集团有限公司', '正威国际集团有限公司', '厦门建发集团有限公司', '日本伊藤忠商事株式会社',
#             '中国第一汽车集团有限公司', '中国医药集团有限公司', '中国邮政集团有限公司', '瓦莱罗能源公司', '日本电报电话公司',
#             '法国农业信贷银行', '国家能源投资集团有限责任公司', '戴尔科技公司', '塔吉特公司', '三井物产株式会社',
#             '中国南方电网有限责任公司', '意大利国家电力公司', '中粮集团有限公司', '现代汽车', '房利美', '日本邮政控股公司',
#             '法国电力公司', '华为投资控股有限公司', '联合包裹速递服务公司', '印度人寿保险公司', '德国邮政敦豪集团',
#             '中国电力建设集团有限公司', '美国劳氏公司', '中国中信集团有限公司', '雀巢公司', '信实工业公司', '美国银行',
#             '厦门国贸控股集团有限公司', '强生', '博世集团', '巴斯夫公司', '中国人民保险集团股份有限公司', '埃尼石油公司',
#             '意昂集团', '日立', 'Equinor公司', '皇家阿霍德德尔海兹集团', '索尼', 'SK集团', '俄罗斯石油公司',
#             '家乐福', '物产中大集团股份有限公司', '腾讯控股有限公司', '东风汽车集团有限公司', '法国巴黎银行', 'ADM公司',
#             '绿地控股集团股份有限公司', '乐购', '中国远洋海运集团有限公司', '巴西国家石油公司', '联邦快递',
#             'Engie集团', '中国电信集团有限公司', '哈门那公司', '慕尼黑再保险集团', '美国富国银行', '州立农业保险公司',
#             '中国兵器工业集团有限公司', '辉瑞制药有限公司', '碧桂园控股有限公司', '中国铝业集团有限公司', '引能仕控股株式会社',
#             '花旗集团', '印度石油公司', '百事公司', '中国航空工业集团有限公司', '英特尔公司', '西班牙国家银行',
#             'Seven & I 控股公司', '日本永旺集团', '汇丰银行控股公司', '太平洋建设集团有限公司', '美国邮政',
#             '招商局集团有限公司', '安赛乐米塔尔', '宝洁公司', '交通银行股份有限公司', '迪奥公司', '丸红株式会社',
#             '布鲁克菲尔德资产管理公司', '西门子', '厦门象屿集团有限公司', '日产汽车', '北京汽车集团有限公司',
#             '晋能控股集团有限公司', '日本生命保险公司', '通用电气公司', '墨西哥石油公司', '第一生命控股有限公司',
#             '国际商业机器公司', '瑞士罗氏公司', '艾伯森公司', '联想集团有限公司', '丰田通商公司', '大都会人寿',
#             '招商银行股份有限公司', '保德信金融集团', '江西铜业集团有限公司', '泰国国家石油有限公司', '万科企业股份有限公司',
#             '苏黎世保险集团', '浙江荣盛控股集团有限公司', '中国保利集团有限公司', '中国太平洋保险股份有限公司)',
#             '华特迪士尼公司', 'Energy Transfer公司', '洛克希德－马丁', '广州汽车工业集团有限公司', 'LG电子',
#             '浦项制铁控股公司', '河钢集团有限公司', '印度石油天然气公司', '房地美', '丰益国际', '松下控股公司',
#             '巴西JBS公司', '高盛', '中国建材集团有限公司', '雷神技术公司', '英杰华集团', '山东魏桥创业集团有限公司',
#             '荷兰全球保险集团', '力拓集团', '惠普公司', '英国励正集团', '波音', '联合利华', '马士基集团',
#             '空中客车公司', '兴业银行股份有限公司', '陕西煤业化工集团有限责任公司', '中国光大集团股份公司', '摩根士丹利',
#             '起亚公司', '必和必拓集团', '日本制铁集团公司', '中国华能集团有限公司', '马来西亚国家石油公司',
#             '鞍钢集团有限公司', '万喜集团', '邦吉公司', '法国兴业银行', 'HCA 医疗保健公司', '英国劳埃德银行集团',
#             '印尼国家石油公司', '中国机械工业集团有限公司', '台积公司', '上海浦东发展银行股份有限公司', '艾伯维',
#             '法国达飞海运集团', '浙江吉利控股集团有限公司', '德国联邦铁路公司', '巴西淡水河谷公司', '加拿大鲍尔集团',
#             '中国电子科技集团有限公司', '软银集团', '陶氏公司', '印度国家银行', '雷诺', '青山控股集团有限公司',
#             '百威英博', '三菱日联金融集团', '盛虹控股集团有限公司', '特斯拉', '中国船舶集团有限公司', 'Talanx公司',
#             '美的集团股份有限公司', '好事达', '沃达丰集团', '诺华公司', '韩国电力公司', '日本出光兴产株式会社',
#             '雷普索尔公司', '圣戈班集团', '东京海上日动火灾保险公司', '拜耳集团', '美国国际集团', '德国艾德卡公司',
#             '陕西延长石油)', '百思买', '特许通讯公司', '国家电力投资集团有限公司', '西斯科公司', '默沙东',
#             '美国纽约人寿保险公司', '浙江恒逸集团有限公司', '卡特彼勒', '小米集团', '中国联合网络通信股份有限公司',
#             '埃森哲', '中国能源建设集团有限公司', '俄罗斯联邦储蓄银行', 'Orange公司', '伍尔沃斯集团',
#             '中国民生银行股份有限公司', '思科公司', '美洲电信', '路易达孚集团', '宏利金融', '电装公司', '住友商事',
#             'TJX公司', '日本KDDI电信公司', '法国BPCE银行集团', '大众超级市场公司', '康菲石油公司',
#             '美国利宝互助保险集团', '前进保险公司', '英格卡集团', '友邦保险控股有限公司', '美国全国保险公司',
#             '东京电力公司', '江苏沙钢集团有限公司', '泰森食品', 'EXOR集团', '葛兰素史克集团', '巴拉特石油公司',
#             '瑞士再保险股份有限公司', '中国中煤能源集团有限公司', '意大利联合圣保罗银行', '苏商建设集团有限公司',
#             '西班牙电话公司', '百时美施贵宝公司', '浙江省交通投资集团有限公司', '赛诺菲', 'Iberdrola公司',
#             '利安德巴塞尔工业公司', '韩华集团', '加拿大皇家银行', 'Alimentation Couche-Tard公司',
#             'MS&AD保险集团控股有限公司', '采埃孚', '和硕', '德国大陆集团', '耐克公司', '法国布伊格集团',
#             '中国兵器装备集团公司', '费森尤斯集团', '仁宝电脑', '迪尔公司', '乔治威斯顿公司', '美国运通公司',
#             '上海建工集团股份有限公司', '中国航天科技集团有限公司', '沃尔沃集团', '中国电子信息产业集团有限公司', '雅培公司',
#             '中国华电集团有限公司', 'StoneX集团', '首钢集团有限公司', 'Plains GP Holdings公司',
#             '奥地利石油天然气集团', '英美资源集团', '山东钢铁集团有限公司', '伊塔乌联合银行控股公司',
#             '中国太平保险集团有限责任公司', '法国国营铁路集团', '杭州钢铁集团有限公司', '德国中央合作银行', '安达保险公司',
#             '金川集团股份有限公司', '法国邮政', '中国航天科工集团有限公司', '森宝利公司',
#             'Enterprise Products Partners公司', '蒂森克虏伯', '瑞银集团', '泰康保险集团股份有限公司',
#             '美国教师退休基金会', '甲骨文公司', '广达电脑公司', '德意志银行', '三菱电机股份有限公司', '西班牙对外银行',
#             '安徽海螺集团有限责任公司', '大和房建', '赛默飞世尔科技公司', '新希望控股集团有限公司', 'KOC集团',
#             '日本钢铁工程控股公司', '可口可乐公司', '广州市建筑集团有限公司', '通用动力', 'CHS公司',
#             '北京建龙重工集团有限公司', '中国核工业集团有限公司', '西班牙ACS集团', '多伦多道明银行', '欧莱雅',
#             '巴登-符滕堡州能源公司', 'LG化学公司', '印度塔塔汽车公司', 'ELO集团', '深圳市投资控股有限公司',
#             'SK海力士公司', '巴克莱', 'Enbridge公司', '国泰金融控股股份有限公司', '日本明治安田生命保险公司',
#             '意大利邮政集团', '联合服务汽车协会', 'Finatis公司', '阿斯利康', 'KB金融集团', '损保控股有限公司',
#             'Cenovus Energy公司', '中国中车集团有限公司', '敬业集团有限公司', '西北互助人寿保险公司',
#             '日本三井住友金融集团', '纽柯', '现代摩比斯公司', 'Exelon公司', '麦格纳国际', '长江和记实业有限公司',
#             '菲尼克斯医药公司', '万通互惠理财公司', '德迅集团', '怡和集团', 'Raízen公司', '美国诺斯洛普格拉曼公司',
#             '铜陵有色金属集团控股有限公司', '三菱化学控股', '3M公司', '英美烟草集团', '日本瑞穗金融集团',
#             '海尔智家股份有限公司', '新加坡奥兰集团', '紫金矿业集团股份有限公司', '贺利氏控股集团', '爱信',
#             'Travelers公司', '中国大唐集团有限公司', '龙湖集团控股有限公司', '蜀道投资集团有限责任公司',
#             '中国航空油料集团有限公司', '艾睿电子', '新华人寿保险股份有限公司', '霍尼韦尔国际公司',
#             '日本三菱重工业股份有限公司', 'Dollar General公司', '施耐德电气', '湖南钢铁集团有限公司',
#             '潞安化工集团有限公司', '西门子能源', '波兰国营石油公司', '荷兰国际集团', '菲尼克斯集团控股公司',
#             '法国威立雅环境集团', 'Coop集团', '高通', '上海医药集团股份有限公司', '山西焦煤集团有限责任公司',
#             'CarMax公司', 'SAP公司', '新疆中泰', '塔塔钢铁', '比亚迪股份有限公司',
#             'Rajesh Exports公司', 'Inditex公司', '巴西布拉德斯科银行', '富邦金融控股股份有限公司',
#             '顺丰控股股份有限公司', '住友生命保险公司', '第一资本金融公司', '佳能', '广西投资集团有限公司', '富士通',
#             '云南省投资控股集团有限公司', '武田药品公司', '铃木汽车', 'Migros集团', 'TD Synnex公司',
#             '潍柴动力股份有限公司', '新疆广汇实业投资', '菲利普－莫里斯国际公司', '全球燃料服务公司', '加拿大丰业银行',
#             '森科能源公司', '山东高速集团有限公司', '海亮集团有限公司', 'CRH公司', 'Investor公司', '纬创集团',
#             '林德集团', '三星人寿保险', '巴西银行', '成都兴城投资集团有限公司', '广州医药集团有限公司',
#             'Performance Food Group公司', '上海德龙钢铁集团有限公司', 'GS加德士', 'Mercadona公司',
#             'CJ集团', '美敦力公司', '三星C&T公司', '台湾中油股份有限公司', '住友电工', 'X5零售集团', '达美航空',
#             '美国航空集团', '东芝', 'Netflix公司', '麦德龙', '派拉蒙环球公司', '普利司通',
#             'US Foods Holding公司', '丹纳赫公司', '珠海格力电器股份有限公司', '豪瑞', 'Medipal控股公司',
#             '捷普公司', '任仕达公司', '星巴克公司', 'Coles集团', '瑞士信贷', '莱茵集团', 'DSV公司',
#             '瑞士ABB集团', '亿滋国际', '达能', '优美科公司', '输入/英', 'WALMART', 'AMAZONCOM',
#             'STATE GRID', 'CHINA NATIONAL PETROLEUM', 'SINOPEC GROUP',
#             'SAUDI ARAMCO', 'APPLE', 'VOLKSWAGEN',
#             'CHINA STATE CONSTRUCTION ENGINEERING', 'CVS HealthCVS HEALTH',
#             'UNITEDHEALTH GROUP', 'EXXON MOBIL', 'TOYOTA MOTOR',
#             'BERKSHIRE HATHAWAY', 'SHELL', 'MCKESSON', 'AlphabetALPHABET',
#             'SAMSUNG ELECTRONICS', 'TRAFIGURA GROUP',
#             'HON HAI PRECISION INDUSTRY', 'AMERISOURCEBERGEN',
#             'INDUSTRIAL  COMMERCIAL BANK OF CHINA', 'GLENCORE',
#             'CHINA CONSTRUCTION BANK', 'PING AN INSURANCE', 'COSTCO WHOLESALE',
#             'TOTALENERGIES', 'AGRICULTURAL BANK OF CHINA',
#             'StellantisSTELLANTIS', 'CIGNA', 'SINOCHEM HOLDINGS', 'ATT',
#             'MICROSOFT', 'CHINA RAILWAY ENGINEERING GROUP', 'BP',
#             'CARDINAL HEALTH', 'CHEVRON', 'MERCEDESBENZ GROUP',
#             'CHINA RAILWAY CONSTRUCTION', 'CHINA LIFE INSURANCE', 'MITSUBISHI',
#             'BANK OF CHINA', 'HOME DEPOT', 'CHINA BAOWU STEEL GROUP',
#             'WALGREENS BOOTS ALLIANCE', 'JDCOM', 'ALLIANZ', 'AXA',
#             'MARATHON PETROLEUM', 'Elevance HealthELEVANCE HEALTH', 'KROGER',
#             'GAZPROM', 'FORD MOTOR', 'VERIZON COMMUNICATIONS',
#             'ALIBABA GROUP HOLDING', 'FORTUM', 'CHINA MOBILE COMMUNICATIONS',
#             'CHINA MINMETALS', 'BMW GROUP',
#             'CHINA COMMUNICATIONS CONSTRUCTION', 'HONDA MOTOR',
#             'DEUTSCHE TELEKOM', 'JPMORGAN CHASE', 'GENERAL MOTORS',
#             'CHINA NATIONAL OFFSHORE OIL', 'CenteneCENTENE', 'LUKOIL',
#             'SAIC MOTOR', 'SHANDONG ENERGY GROUP', 'CHINA RESOURCES',
#             'Meta PlatformsMETA PLATFORMS', 'ASSICURAZIONI GENERALI',
#             'COMCAST', 'Phillips PHILLIPS', 'HENGLI GROUP',
#             'AMER INTERNATIONAL GROUP', 'XIAMEN CD', 'ITOCHU',
#             'CHINA FAW GROUP', 'SINOPHARM', 'CHINA POST GROUP',
#             'VALERO ENERGY', 'NIPPON TELEGRAPH AND TELEPHONE',
#             'CRDIT AGRICOLE', 'CHINA ENERGY INVESTMENT', 'DELL TECHNOLOGIES',
#             'TARGET', 'MITSUI', 'CHINA SOUTHERN POWER GRID', 'ENEL', 'COFCO',
#             'HYUNDAI MOTOR', 'FANNIE MAE', 'JAPAN POST HOLDINGS',
#             'ELECTRICIT DE FRANCE', 'HUAWEI INVESTMENT  HOLDING',
#             'UNITED PARCEL SERVICE', 'LIFE INSURANCE CORP OF INDIA',
#             'DEUTSCHE POST DHL GROUP', 'POWERCHINA', 'LOWES', 'CITIC GROUP',
#             'NESTL', 'RELIANCE INDUSTRIES', 'BANK OF AMERICA',
#             'XIAMEN ITG HOLDING GROUP', 'JOHNSON  JOHNSON', 'BOSCH GROUP',
#             'BASF', 'PEOPLES INSURANCE CO OF CHINA', 'ENI', 'EON', 'HITACHI',
#             'EquinorEQUINOR', 'ROYAL AHOLD DELHAIZE', 'SONY', 'SKSK',
#             'ROSNEFT OIL', 'CARREFOUR', 'WUCHAN ZHONGDA GROUP',
#             'TENCENT HOLDINGS', 'DONGFENG MOTOR', 'BNP PARIBAS',
#             'ADMARCHER DANIELS MIDLAND', 'GREENLAND HOLDING GROUP', 'TESCO',
#             'COSCO SHIPPING', 'PETROBRAS', 'FEDEX', 'EngieENGIE',
#             'CHINA TELECOMMUNICATIONS', 'HUMANA', 'MUNICH RE GROUP',
#             'WELLS FARGO', 'STATE FARM INSURANCE',
#             'CHINA NORTH INDUSTRIES GROUP', 'PFIZER',
#             'COUNTRY GARDEN HOLDINGS', 'ALUMINUM CORP OF CHINA',
#             'ENEOS HOLDINGS', 'CITIGROUP', 'INDIAN OIL', 'PEPSICO',
#             'AVIATION INDUSTRY CORP OF CHINA', 'INTEL', 'BANCO SANTANDER',
#             'Seven  I SEVEN  I HOLDINGS', 'AEON', 'HSBC HOLDINGS',
#             'PACIFIC CONSTRUCTION GROUP', 'US POSTAL SERVICE',
#             'CHINA MERCHANTS GROUP', 'ARCELORMITTAL', 'PROCTER  GAMBLE',
#             'BANK OF COMMUNICATIONS', 'CHRISTIAN DIOR', 'MARUBENI',
#             'BROOKFIELD ASSET MANAGEMENT', 'SIEMENS', 'XMXYG', 'NISSAN MOTOR',
#             'BEIJING AUTOMOTIVE GROUP', 'JINNENG HOLDING GROUP',
#             'NIPPON LIFE INSURANCE', 'GENERAL ELECTRIC', 'PEMEX',
#             'DAIICHI LIFE HOLDINGS', 'INTERNATIONAL BUSINESS MACHINES',
#             'ROCHE GROUP', 'ALBERTSONS', 'LENOVO GROUP', 'TOYOTA TSUSHO',
#             'METLIFE', 'CHINA MERCHANTS BANK', 'PRUDENTIAL FINANCIAL',
#             'JIANGXI COPPER', 'PTT', 'CHINA VANKE', 'ZURICH INSURANCE GROUP',
#             'ZHEJIANG RONGSHENG HOLDING GROUP', 'CHINA POLY GROUP',
#             'CHINA PACIFIC INSURANCE GROUP', 'WALT DISNEY',
#             'Energy TransferENERGY TRANSFER', 'LOCKHEED MARTIN',
#             'GUANGZHOU AUTOMOBILE INDUSTRY GROUP', 'LGLG ELECTRONICS',
#             'POSCO HOLDINGS', 'HBIS GROUP', 'OIL  NATURAL GAS', 'FREDDIE MAC',
#             'WILMAR INTERNATIONAL', 'PANASONIC HOLDINGS', 'JBSJBS',
#             'GOLDMAN SACHS GROUP', 'CHINA NATIONAL BUILDING MATERIAL GROUP',
#             'RAYTHEON TECHNOLOGIES', 'AVIVA',
#             'SHANDONG WEIQIAO PIONEERING GROUP', 'AEGON', 'RIO TINTO GROUP',
#             'HP', 'LEGAL  GENERAL GROUP', 'BOEING', 'UNILEVER', 'MAERSK GROUP',
#             'AIRBUS', 'INDUSTRIAL BANK', 'SHAANXI COAL  CHEMICAL INDUSTRY',
#             'CHINA EVERBRIGHT GROUP', 'MORGAN STANLEY', 'KIA', 'BHP GROUP',
#             'NIPPON STEEL CORPORATION', 'CHINA HUANENG GROUP', 'PETRONAS',
#             'ANSTEEL GROUP', 'VINCI', 'BUNGE', 'SOCIT GNRALE',
#             'HCA HCA HEALTHCARE', 'LLOYDS BANKING GROUP', 'PERTAMINA',
#             'SINOMACH', 'TAIWAN SEMICONDUCTOR MANUFACTURING',
#             'SHANGHAI PUDONG DEVELOPMENT BANK', 'ABBVIE', 'CMA CGM',
#             'ZHEJIANG GEELY HOLDING GROUP', 'DEUTSCHE BAHN', 'VALE',
#             'POWER CORP OF CANADA', 'CHINA ELECTRONICS TECHNOLOGY GROUP',
#             'SOFTBANK GROUP', 'DOW', 'STATE BANK OF INDIA', 'RENAULT',
#             'TSINGSHAN HOLDING GROUP', 'ANHEUSERBUSCH INBEV',
#             'MITSUBISHI UFJ FINANCIAL GROUP', 'SHENGHONG HOLDING GROUP',
#             'TESLA', 'CHINA STATE SHIPBUILDING', 'TalanxTALANX', 'MIDEA GROUP',
#             'ALLSTATE', 'VODAFONE GROUP', 'NOVARTIS', 'KOREA ELECTRIC POWER',
#             'IDEMITSU KOSAN', 'REPSOL', 'SAINTGOBAIN', 'TOKIO MARINE HOLDINGS',
#             'BAYER', 'AMERICAN INTERNATIONAL GROUP', 'EDEKA ZENTRALE',
#             'SHAANXI YANCHANG PETROLEUM GROUP', 'BEST BUY',
#             'CHARTER COMMUNICATIONS', 'STATE POWER INVESTMENT', 'SYSCO',
#             'MERCK', 'NEW YORK LIFE INSURANCE', 'ZHEJIANG HENGYI GROUP',
#             'CATERPILLAR', 'XIAOMI', 'CHINA UNITED NETWORK COMMUNICATIONS',
#             'ACCENTURE', 'CHINA ENERGY ENGINEERING GROUP', 'SBERBANK',
#             'OrangeORANGE', 'WOOLWORTHS GROUP', 'CHINA MINSHENG BANKING',
#             'CISCO SYSTEMS', 'AMRICA MVIL', 'LOUIS DREYFUS',
#             'MANULIFE FINANCIAL', 'DENSO', 'SUMITOMO', 'TJXTJX', 'KDDIKDDI',
#             'BPCEGROUPE BPCE', 'PUBLIX SUPER MARKETS', 'CONOCOPHILLIPS',
#             'LIBERTY MUTUAL INSURANCE GROUP', 'PROGRESSIVE', 'INGKA GROUP',
#             'AIA GROUP', 'NATIONWIDE', 'TOKYO ELECTRIC POWER',
#             'JIANGSU SHAGANG GROUP', 'TYSON FOODS', 'EXOREXOR GROUP', 'GSK',
#             'BHARAT PETROLEUM', 'SWISS RE', 'CHINA NATIONAL COAL GROUP',
#             'INTESA SANPAOLO', 'SUSUN CONSTRUCTION GROUP', 'TELEFNICA',
#             'BRISTOLMYERS SQUIBB', 'ZHEJIANG COMMUNICATIONS INVESTMENT GROUP',
#             'SANOFI', 'IberdrolaIBERDROLA', 'LYONDELLBASELL INDUSTRIES',
#             'HANWHA', 'ROYAL BANK OF CANADA',
#             'Alimentation CoucheTardALIMENTATION COUCHETARD',
#             'MSADMSAD INSURANCE GROUP HOLDINGS', 'ZF FRIEDRICHSHAFEN',
#             'PEGATRON', 'CONTINENTAL', 'NIKE', 'BOUYGUES',
#             'CHINA SOUTH INDUSTRIES GROUP', 'FRESENIUS', 'COMPAL ELECTRONICS',
#             'DEERE', 'GEORGE WESTON', 'AMERICAN EXPRESS',
#             'SHANGHAI CONSTRUCTION GROUP',
#             'CHINA AEROSPACE SCIENCE  TECHNOLOGY', 'VOLVO',
#             'CHINA ELECTRONICS', 'ABBOTT LABORATORIES', 'CHINA HUADIAN',
#             'StoneXSTONEX GROUP', 'SHOUGANG GROUP',
#             'Plains GP HoldingsPLAINS GP HOLDINGS', 'OMV GROUP',
#             'ANGLO AMERICAN', 'SHANDONG IRON  STEEL GROUP',
#             'ITA UNIBANCO HOLDING', 'CHINA TAIPING INSURANCE GROUP',
#             'SNCF GROUP', 'HANGZHOU IRON AND STEEL GROUP', 'DZ BANK', 'CHUBB',
#             'JINCHUAN GROUP', 'LA POSTE', 'CHINA AEROSPACE SCIENCE  INDUSTRY',
#             'J SAINSBURY',
#             'Enterprise Products PartnersENTERPRISE PRODUCTS PARTNERS',
#             'THYSSENKRUPP', 'UBS GROUP', 'TAIKANG INSURANCE GROUP', 'TIAA',
#             'ORACLE', 'QUANTA COMPUTER', 'DEUTSCHE BANK',
#             'MITSUBISHI ELECTRIC', 'BANCO BILBAO VIZCAYA ARGENTARIA',
#             'ANHUI CONCH GROUP', 'DAIWA HOUSE INDUSTRY',
#             'THERMO FISHER SCIENTIFIC', 'NEW HOPE HOLDING GROUP',
#             'KOCKO HOLDING', 'JFE HOLDINGS', 'COCACOLA',
#             'GUANGZHOU MUNICIPAL CONSTRUCTION GROUP', 'GENERAL DYNAMICS',
#             'CHSCHS', 'BEIJING JIANLONG HEAVY INDUSTRY GROUP',
#             'CHINA NATIONAL NUCLEAR', 'ACSACS', 'TORONTODOMINION BANK',
#             'LORAL', 'ENERGIE BADENWRTTEMBERG', 'LGLG CHEM', 'TATA MOTORS',
#             'ELOELO GROUP', 'SHENZHEN INVESTMENT HOLDINGS', 'SKSK HYNIX',
#             'BARCLAYS', 'EnbridgeENBRIDGE', 'CATHAY FINANCIAL HOLDING',
#             'MEIJI YASUDA LIFE INSURANCE', 'POSTE ITALIANE',
#             'UNITED SERVICES AUTOMOBILE ASSN', 'FinatisFINATIS', 'ASTRAZENECA',
#             'KBKB FINANCIAL GROUP', 'SOMPO HOLDINGS',
#             'Cenovus EnergyCENOVUS ENERGY', 'CRRC GROUP', 'JINGYE GROUP',
#             'NORTHWESTERN MUTUAL', 'SUMITOMO MITSUI FINANCIAL GROUP', 'NUCOR',
#             'HYUNDAI MOBIS', 'ExelonEXELON', 'MAGNA INTERNATIONAL',
#             'CK HUTCHISON HOLDINGS', 'PHOENIX PHARMA',
#             'MASSACHUSETTS MUTUAL LIFE INSURANCE',
#             'KUEHNE  NAGEL INTERNATIONAL', 'JARDINE MATHESON', 'RazenRAZEN',
#             'NORTHROP GRUMMAN', 'TONGLING NONFERROUS METALS GROUP',
#             'MITSUBISHI CHEMICAL HOLDINGS', 'MM', 'BRITISH AMERICAN TOBACCO',
#             'MIZUHO FINANCIAL GROUP', 'HAIER SMART HOME', 'OLAM GROUP',
#             'ZIJIN MINING GROUP', 'HERAEUS HOLDING', 'AISIN',
#             'TravelersTRAVELERS', 'CHINA DATANG', 'LONGFOR GROUP HOLDINGS',
#             'SHUDAO INVESTMENT GROUP', 'CHINA NATIONAL AVIATION FUEL GROUP',
#             'ARROW ELECTRONICS', 'NEW CHINA LIFE INSURANCE',
#             'HONEYWELL INTERNATIONAL', 'MITSUBISHI HEAVY INDUSTRIES',
#             'Dollar GeneralDOLLAR GENERAL', 'SCHNEIDER ELECTRIC',
#             'HUNAN IRON  STEEL GROUP', 'LUAN CHEMICAL GROUP', 'SIEMENS ENERGY',
#             'PKN ORLEN GROUP', 'ING GROUP', 'PHOENIX GROUP HOLDINGS',
#             'VEOLIA ENVIRONNEMENT', 'CoopCOOP GROUP', 'QUALCOMM',
#             'SHANGHAI PHARMACEUTICALS HOLDING', 'SHANXI COKING COAL GROUP',
#             'CarMaxCARMAX', 'SAPSAP', 'XINJIANG ZHONGTAI GROUP', 'TATA STEEL',
#             'BYD', 'Rajesh ExportsRAJESH EXPORTS', 'InditexINDITEX',
#             'BANCO BRADESCO', 'FUBON FINANCIAL HOLDING', 'SF HOLDING',
#             'SUMITOMO LIFE INSURANCE', 'CAPITAL ONE FINANCIAL', 'CANON',
#             'GUANGXI INVESTMENT GROUP', 'FUJITSU',
#             'YUNNAN PROVINCIAL INVESTMENT HOLDING GROUP',
#             'TAKEDA PHARMACEUTICAL', 'SUZUKI MOTOR', 'MigrosMIGROS GROUP',
#             'TD SynnexTD SYNNEX', 'WEICHAI POWER',
#             'XINJIANG GUANGHUI INDUSTRY INVESTMENT',
#             'PHILIP MORRIS INTERNATIONAL', 'WORLD FUEL SERVICES',
#             'BANK OF NOVA SCOTIA', 'SUNCOR ENERGY', 'SHANDONG HISPEED GROUP',
#             'HAILIANG GROUP', 'CRHCRH', 'InvestorINVESTOR', 'WISTRON', 'LINDE',
#             'SAMSUNG LIFE INSURANCE', 'BANCO DO BRASIL',
#             'CHENGDU XINGCHENG INVESTMENT GROUP',
#             'GUANGZHOU PHARMACEUTICAL HOLDINGS',
#             'Performance Food GroupPERFORMANCE FOOD GROUP',
#             'SHANGHAI DELONG STEEL GROUP', 'GSGS CALTEX', 'MercadonaMERCADONA',
#             'CJCJ CORP', 'MEDTRONIC', 'CTSAMSUNG CT', 'CPC',
#             'SUMITOMO ELECTRIC INDUSTRIES', 'XX RETAIL GROUP',
#             'DELTA AIR LINES', 'AMERICAN AIRLINES GROUP', 'TOSHIBA',
#             'NetflixNETFLIX', 'METRO', 'PARAMOUNT GLOBAL', 'BRIDGESTONE',
#             'US Foods HoldingUS FOODS HOLDING', 'DANAHER',
#             'GREE ELECTRIC APPLIANCES', 'HOLCIM', 'MedipalMEDIPAL HOLDINGS',
#             'JABIL', 'RANDSTAD', 'STARBUCKS', 'ColesCOLES GROUP',
#             'CREDIT SUISSE GROUP', 'RWE', 'DSVDSV', 'ABBABB',
#             'MONDELEZ INTERNATIONAL', 'DANONE', 'UMICORE'
#     ]:
#         InputDict['Intern_3'] = 1
#     elif Intern_3 == 'Others' or Intern_3 == '其他':
#         InputDict['Intern_3'] = 0

#     # Process Project
#     if Project_1 == '国际级':
#         InputDict['Project_1'] = 1
#     elif Project_1 == '国家级':
#         InputDict['Project_1'] = 2
#     elif Project_1 == '省级':
#         InputDict['Project_1'] = 3
#     elif Project_1 == '市级':
#         InputDict['Project_1'] = 4
#     elif Project_1 == '校级':
#         InputDict['Project_1'] = 5

#     if Project_2 == '国际级':
#         InputDict['Project_2'] = 1
#     elif Project_2 == '国家级':
#         InputDict['Project_2'] = 2
#     elif Project_2 == '省级':
#         InputDict['Project_2'] = 3
#     elif Project_2 == '市级':
#         InputDict['Project_2'] = 4
#     elif Project_2 == '校级':
#         InputDict['Project_2'] = 5

#     if Project_3 == '国际级':
#         InputDict['Project_3'] = 1
#     elif Project_3 == '国家级':
#         InputDict['Project_3'] = 2
#     elif Project_3 == '省级':
#         InputDict['Project_3'] = 3
#     elif Project_3 == '市级':
#         InputDict['Project_3'] = 4
#     elif Project_3 == '校级':
#         InputDict['Project_3'] = 5

#     # Process Paper
#     if Paper_1 == 'T':
#         InputDict['Paper_1'] = 1
#     elif Paper_1 == 'A':
#         InputDict['Paper_1'] = 2
#     elif Paper_1 == 'B':
#         InputDict['Paper_1'] = 3
#     elif Paper_1 == 'C':
#         InputDict['Paper_1'] = 4
#     elif Paper_1 == 'D':
#         InputDict['Paper_1'] = 5
#     elif Paper_1 == 'E':
#         InputDict['Paper_1'] = 6

#     if Paper_2 == 'T':
#         InputDict['Paper_2'] = 1
#     elif Paper_2 == 'A':
#         InputDict['Paper_2'] = 2
#     elif Paper_2 == 'B':
#         InputDict['Paper_2'] = 3
#     elif Paper_2 == 'C':
#         InputDict['Paper_2'] = 4
#     elif Paper_2 == 'D':
#         InputDict['Paper_2'] = 5
#     elif Paper_2 == 'E':
#         InputDict['Paper_2'] = 6

#     if Paper_3 == 'T':
#         InputDict['Paper_3'] = 1
#     elif Paper_3 == 'A':
#         InputDict['Paper_3'] = 2
#     elif Paper_3 == 'B':
#         InputDict['Paper_3'] = 3
#     elif Paper_3 == 'C':
#         InputDict['Paper_3'] = 4
#     elif Paper_3 == 'D':
#         InputDict['Paper_3'] = 5
#     elif Paper_3 == 'E':
#         InputDict['Paper_3'] = 6

#     # Process Target Model
#     TargetModel = './models/' + TargetSchool + '.' + TargetMajor + '.pkl'

#     return [InputDict, TargetModel]

# def PredictRate(data):
#     loaded_model = joblib.load(data[1])
#     X = pd.DataFrame([data[0]])
#     y_prob = loaded_model.predict_proba(X)[:, 1]
#     rate = str(round(float(y_prob * 100), 2)) + '%'
#     return rate


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
