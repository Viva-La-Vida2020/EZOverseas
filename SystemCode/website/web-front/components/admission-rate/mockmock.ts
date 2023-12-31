// 能用就行
// 能用就行
// 能用就行
const getUniversityCategory = (university: string): number => {
    if (universities_1.includes(university) || universities_6.includes(university)) return 1;
    if (universities_2.includes(university) || universities_7.includes(university)) return 2;
    if (universities_3.includes(university) || universities_8.includes(university)) return 3;
    if (universities_4.includes(university) || universities_9.includes(university)) {
        return 4
    }
    else {
        return 5
    }
}

const universities_1 = ['清华大学', '北京大学'];
const universities_2 = ['复旦大学', '上海交通大学', '浙江大学', '南京大学', '中国科学技术大学'];
const universities_3 = ['华中科技大学', '武汉大学', '西安交通大学', '四川大学', '中山大学', '哈尔滨工业大学', '同济大学', '北京航空航天大学', '东南大学', '北京师范大学', '北京理工大学', '中国人民大学', '南开大学', '天津大学', '山东大学', '中南大学', '西北工业大学', '华南理工大学', '厦门大学', '吉林大学', '华东师范大学', '中国农业大学', '电子科技大学', '大连理工大学', '湖南大学', '重庆大学', '兰州大学', '东北大学',
    '中国海洋大学', '西北农林科技大学', '中央民族大学', '国防科技大学'];
const universities_4 = ['北京科技大学', '武汉理工大学', '南京理工大学', '北京协和医学院', '西南大学', '华中师范大学', '暨南大学', '河海大学', '南京师范大学', '北京交通大学', '南京农业大学', '华东理工大学', '苏州大学', '华中农业大学', '中南财经政法大学', '南京航空航天大学', '西安电子科技大学', '合肥工业大学', '西南交通大学', '西北大学', '湖南师范大学', '郑州大学', '东北师范大学', '北京邮电大学', '华南师范大学',
    '哈尔滨工程大学', '上海财经大学', '云南大学', '上海大学', '西南财经大学', '东华大学', '中国政法大学', '海军军医大学', '北京化工大学', '中国石油大学（北京）', '中国地质大学（武汉）', '北京外国语大学', '南昌大学', '中国传媒大学', '太原理工大学', '北京工业大学', '空军军医大学', '江南大学', '陕西师范大学', '中国矿业大学', '对外经济贸易大学', '福州大学', '北京林业大学', '中国石油大学（华东）', '安徽大学', '长安大学',
    '辽宁大学', '贵州大学', '中央财经大学', '北京体育大学', '河北工业大学', '北京中医药大学', '东北农业大学', '东北林业大学', '四川农业大学', '中国药科大学', '新疆大学', '中国矿业大学（北京）', '中国地质大学（北京）', '天津医科大学', '上海外国语大学', '大连海事大学', '广西大学', '华北电力大学', '内蒙古大学', '海南大学', '石河子大学', '宁夏大学', '延边大学', '中央音乐学院', '西藏大学', '青海大学']
const universities_5 = ['其他国内高校']
const universities_6 = ['Massachusetts Institute of Technology (MIT)', 'University of Cambridge', 'University of Oxford', 'Harvard University', 'Stanford University', 'Imperial College London', 'ETH Zurich (Swiss Federal Institute of Technology)', 'National University of Singapore (NUS)', 'UCL (University College London)', 'University of California, Berkeley (UCB)'];
const universities_7 = ['University of Chicago', 'University of Pennsylvania', 'Cornell University', 'University of Melbourne', 'California Institute of Technology (Caltech)', 'Yale University', 'Princeton University', 'University of New South Wales (UNSW Sydney)', 'University of Sydney', 'University of Toronto', 'University of Edinburgh', 'Columbia University', 'Universite PSL',
    'Nanyang Technological University, Singapore (NTU)', 'University of Hong Kong (UKU)', 'Johns Hopkins University', 'University of Tokyo', 'University of California, Los Angeles (UCLA)'];
const universities_8 = ['McGill University', 'University of Manchester', 'University of Michigan-Ann Arbor', 'Australian National University', 'University of British Columbia', 'Ecole Polytechnique Fédérale de Lausanne (EPFL)', 'Technical University of Munich', 'InstitutPolytechnique de Paris', 'New York University (NYU)', "King's College London", 'Seoul National University',
    'Monash University', 'University of Queensland', 'London School of Economics and Political Science (LSE)', 'Kyoto University', 'Delft University of Technology', 'Northwestern University', 'Chinese University of Hong Kong (CUHK)'];
const universities_9 = ['Carnegie Mellon University', 'University of Amsterdam', 'Ludwig-Maximilians-Universität München', 'University of Bristol', 'KAIST - Korea Advanced Institute of Science & Technology', 'Duke University', 'University of Texas at Austin', 'Sorbonne University', 'Hong Kong University of Science and Technology (HKUST)', 'KU Leuven', 'University of California, San Diego (UCSD)',
    'University of Washington', 'University of Illinois at Urbana-Champaign', 'Hong Kong Polytechnic University', 'Universiti Malaya (UM)', 'University of Warwick', 'University of Auckland', 'National Taiwan University (NTU)', 'City University of Hong Kong', 'Universite Paris-Saclay', 'University of Western Australia', 'Brown University', 'KTH Royal Institute of Technology',
    'University of Leeds', 'University of Glasgow', 'Yonsei University', 'Durham University', 'Korea University', 'Osaka University', 'Trinity College Dublin, The University of Dublin', 'University of Southampton', 'Pennsylvania State University', 'University of Birmingham', 'Lund University', 'Universidade de São Paulo', 'Lomonosov Moscow State University', 'Universität Heidelberg',
    'The University of Adelaide', 'University of Technology Sydney', 'Tokyo Institute of Technology', 'University of Zurich', 'Boston University', 'Universidad Nacional Autónoma de México (UNAM)', 'Universidad de Buenos Aires (UBA)', 'University of St Andrews', 'Georgia Institute of Technology', 'Freie Universitaet Berlin', 'Purdue University', 'Pohang University of Science and Technology (POSTECH)', 'University of Nottingham'];
const universities_10 = ['Others']

const universities = [...universities_1, ...universities_2, ...universities_3, ...universities_4, ...universities_5, ...universities_6, ...universities_7, ...universities_8, ...universities_9, ...universities_10]
const board_universities = [...universities_6, ...universities_7, ...universities_8, ...universities_9, ...universities_10];
const us_university = [
    'Massachusetts Institute of Technology (MIT)',
    'Harvard University',
    'Stanford University',
    'University of California, Berkeley (UCB)',
    'University of Chicago',
    'University of Pennsylvania',
    'Cornell University',
    'California Institute of Technology (Caltech)',
    'Yale University',
    'Princeton University',
    'Columbia University',
    'Johns Hopkins University',
    'University of California, Los Angeles (UCLA)',
    'University of Michigan-Ann Arbor',
    'New York University (NYU)',
    'Northwestern University',
    'Carnegie Mellon University',
    'Duke University',
    'University of Texas at Austin',
    'University of California, San Diego (UCSD)',
    'University of Washington',
    'University of Illinois at Urbana-Champaign',
    'Brown University',
    'Pennsylvania State University',
    'Purdue University',
    'Georgia Institute of Technology',
    'Boston University'
];;



const companies = ['WALMART', 'AMAZONCOM', 'STATE GRID', 'CHINA NATIONAL PETROLEUM', 'SINOPEC GROUP', 'SAUDI ARAMCO', 'APPLE', 'VOLKSWAGEN', 'CHINA STATE CONSTRUCTION ENGINEERING', 'CVS HealthCVS HEALTH', 'UNITEDHEALTH GROUP', 'EXXON MOBIL', 'TOYOTA MOTOR', 'BERKSHIRE HATHAWAY', 'SHELL', 'MCKESSON', 'AlphabetALPHABET', 'SAMSUNG ELECTRONICS', 'TRAFIGURA GROUP',
    'HON HAI PRECISION INDUSTRY', 'AMERISOURCEBERGEN', 'INDUSTRIAL  COMMERCIAL BANK OF CHINA', 'GLENCORE', 'CHINA CONSTRUCTION BANK', 'PING AN INSURANCE', 'COSTCO WHOLESALE', 'TOTALENERGIES', 'AGRICULTURAL BANK OF CHINA', 'StellantisSTELLANTIS', 'CIGNA', 'SINOCHEM HOLDINGS', 'ATT', 'MICROSOFT', 'CHINA RAILWAY ENGINEERING GROUP', 'BP', 'CARDINAL HEALTH', 'CHEVRON',
    'MERCEDESBENZ GROUP', 'CHINA RAILWAY CONSTRUCTION', 'CHINA LIFE INSURANCE', 'MITSUBISHI', 'BANK OF CHINA', 'HOME DEPOT', 'CHINA BAOWU STEEL GROUP', 'WALGREENS BOOTS ALLIANCE', 'JDCOM', 'ALLIANZ', 'AXA', 'MARATHON PETROLEUM', 'Elevance HealthELEVANCE HEALTH', 'KROGER', 'GAZPROM', 'FORD MOTOR', 'VERIZON COMMUNICATIONS', 'ALIBABA GROUP HOLDING', 'FORTUM', 'CHINA MOBILE COMMUNICATIONS',
    'CHINA MINMETALS', 'BMW GROUP', 'CHINA COMMUNICATIONS CONSTRUCTION', 'HONDA MOTOR', 'DEUTSCHE TELEKOM', 'JPMORGAN CHASE', 'GENERAL MOTORS', 'CHINA NATIONAL OFFSHORE OIL', 'CenteneCENTENE', 'LUKOIL', 'SAIC MOTOR', 'SHANDONG ENERGY GROUP', 'CHINA RESOURCES', 'Meta PlatformsMETA PLATFORMS', 'ASSICURAZIONI GENERALI', 'COMCAST', 'Phillips PHILLIPS', 'HENGLI GROUP', 'AMER INTERNATIONAL GROUP',
    'XIAMEN CD', 'ITOCHU', 'CHINA FAW GROUP', 'SINOPHARM', 'CHINA POST GROUP', 'VALERO ENERGY', 'NIPPON TELEGRAPH AND TELEPHONE', 'CRDIT AGRICOLE', 'CHINA ENERGY INVESTMENT', 'DELL TECHNOLOGIES', 'TARGET', 'MITSUI', 'CHINA SOUTHERN POWER GRID', 'ENEL', 'COFCO', 'HYUNDAI MOTOR', 'FANNIE MAE', 'JAPAN POST HOLDINGS', 'ELECTRICIT DE FRANCE', 'HUAWEI INVESTMENT  HOLDING', 'UNITED PARCEL SERVICE',
    'LIFE INSURANCE CORP OF INDIA', 'DEUTSCHE POST DHL GROUP', 'POWERCHINA', 'LOWES', 'CITIC GROUP', 'NESTL', 'RELIANCE INDUSTRIES', 'BANK OF AMERICA', 'XIAMEN ITG HOLDING GROUP', 'JOHNSON  JOHNSON', 'BOSCH GROUP', 'BASF', 'PEOPLES INSURANCE CO OF CHINA', 'ENI', 'EON', 'HITACHI', 'EquinorEQUINOR', 'ROYAL AHOLD DELHAIZE', 'SONY', 'SKSK', 'ROSNEFT OIL', 'CARREFOUR', 'WUCHAN ZHONGDA GROUP',
    'TENCENT HOLDINGS', 'DONGFENG MOTOR', 'BNP PARIBAS', 'ADMARCHER DANIELS MIDLAND', 'GREENLAND HOLDING GROUP', 'TESCO', 'COSCO SHIPPING', 'PETROBRAS', 'FEDEX', 'EngieENGIE', 'CHINA TELECOMMUNICATIONS', 'HUMANA', 'MUNICH RE GROUP', 'WELLS FARGO', 'STATE FARM INSURANCE', 'CHINA NORTH INDUSTRIES GROUP', 'PFIZER', 'COUNTRY GARDEN HOLDINGS', 'ALUMINUM CORP OF CHINA', 'ENEOS HOLDINGS',
    'CITIGROUP', 'INDIAN OIL', 'PEPSICO', 'AVIATION INDUSTRY CORP OF CHINA', 'INTEL', 'BANCO SANTANDER', 'Seven  I SEVEN  I HOLDINGS', 'AEON', 'HSBC HOLDINGS', 'PACIFIC CONSTRUCTION GROUP', 'US POSTAL SERVICE', 'CHINA MERCHANTS GROUP', 'ARCELORMITTAL', 'PROCTER  GAMBLE', 'BANK OF COMMUNICATIONS', 'CHRISTIAN DIOR', 'MARUBENI', 'BROOKFIELD ASSET MANAGEMENT', 'SIEMENS', 'XMXYG',
    'NISSAN MOTOR', 'BEIJING AUTOMOTIVE GROUP', 'JINNENG HOLDING GROUP', 'NIPPON LIFE INSURANCE', 'GENERAL ELECTRIC', 'PEMEX', 'DAIICHI LIFE HOLDINGS', 'INTERNATIONAL BUSINESS MACHINES', 'ROCHE GROUP', 'ALBERTSONS', 'LENOVO GROUP', 'TOYOTA TSUSHO', 'METLIFE', 'CHINA MERCHANTS BANK', 'PRUDENTIAL FINANCIAL', 'JIANGXI COPPER', 'PTT', 'CHINA VANKE', 'ZURICH INSURANCE GROUP',
    'ZHEJIANG RONGSHENG HOLDING GROUP', 'CHINA POLY GROUP', 'CHINA PACIFIC INSURANCE GROUP', 'WALT DISNEY', 'Energy TransferENERGY TRANSFER', 'LOCKHEED MARTIN', 'GUANGZHOU AUTOMOBILE INDUSTRY GROUP', 'LGLG ELECTRONICS', 'POSCO HOLDINGS', 'HBIS GROUP', 'OIL  NATURAL GAS', 'FREDDIE MAC', 'WILMAR INTERNATIONAL', 'PANASONIC HOLDINGS', 'JBSJBS', 'GOLDMAN SACHS GROUP',
    'CHINA NATIONAL BUILDING MATERIAL GROUP', 'RAYTHEON TECHNOLOGIES', 'AVIVA', 'SHANDONG WEIQIAO PIONEERING GROUP', 'AEGON', 'RIO TINTO GROUP', 'HP', 'LEGAL  GENERAL GROUP', 'BOEING', 'UNILEVER', 'MAERSK GROUP', 'AIRBUS', 'INDUSTRIAL BANK', 'SHAANXI COAL  CHEMICAL INDUSTRY', 'CHINA EVERBRIGHT GROUP', 'MORGAN STANLEY', 'KIA', 'BHP GROUP', 'NIPPON STEEL CORPORATION',
    'CHINA HUANENG GROUP', 'PETRONAS', 'ANSTEEL GROUP', 'VINCI', 'BUNGE', 'SOCIT GNRALE', 'HCA HCA HEALTHCARE', 'LLOYDS BANKING GROUP', 'PERTAMINA', 'SINOMACH', 'TAIWAN SEMICONDUCTOR MANUFACTURING', 'SHANGHAI PUDONG DEVELOPMENT BANK', 'ABBVIE', 'CMA CGM', 'ZHEJIANG GEELY HOLDING GROUP', 'DEUTSCHE BAHN', 'VALE', 'POWER CORP OF CANADA', 'CHINA ELECTRONICS TECHNOLOGY GROUP',
    'SOFTBANK GROUP', 'DOW', 'STATE BANK OF INDIA', 'RENAULT', 'TSINGSHAN HOLDING GROUP', 'ANHEUSERBUSCH INBEV', 'MITSUBISHI UFJ FINANCIAL GROUP', 'SHENGHONG HOLDING GROUP', 'TESLA', 'CHINA STATE SHIPBUILDING', 'TalanxTALANX', 'MIDEA GROUP', 'ALLSTATE', 'VODAFONE GROUP', 'NOVARTIS', 'KOREA ELECTRIC POWER', 'IDEMITSU KOSAN', 'REPSOL', 'SAINTGOBAIN', 'TOKIO MARINE HOLDINGS',
    'BAYER', 'AMERICAN INTERNATIONAL GROUP', 'EDEKA ZENTRALE', 'SHAANXI YANCHANG PETROLEUM GROUP', 'BEST BUY', 'CHARTER COMMUNICATIONS', 'STATE POWER INVESTMENT', 'SYSCO', 'MERCK', 'NEW YORK LIFE INSURANCE', 'ZHEJIANG HENGYI GROUP', 'CATERPILLAR', 'XIAOMI', 'CHINA UNITED NETWORK COMMUNICATIONS', 'ACCENTURE', 'CHINA ENERGY ENGINEERING GROUP', 'SBERBANK', 'OrangeORANGE',
    'WOOLWORTHS GROUP', 'CHINA MINSHENG BANKING', 'CISCO SYSTEMS', 'AMRICA MVIL', 'LOUIS DREYFUS', 'MANULIFE FINANCIAL', 'DENSO', 'SUMITOMO', 'TJXTJX', 'KDDIKDDI', 'BPCEGROUPE BPCE', 'PUBLIX SUPER MARKETS', 'CONOCOPHILLIPS', 'LIBERTY MUTUAL INSURANCE GROUP', 'PROGRESSIVE', 'INGKA GROUP', 'AIA GROUP', 'NATIONWIDE', 'TOKYO ELECTRIC POWER', 'JIANGSU SHAGANG GROUP', 'TYSON FOODS',
    'EXOREXOR GROUP', 'GSK', 'BHARAT PETROLEUM', 'SWISS RE', 'CHINA NATIONAL COAL GROUP', 'INTESA SANPAOLO', 'SUSUN CONSTRUCTION GROUP', 'TELEFNICA', 'BRISTOLMYERS SQUIBB', 'ZHEJIANG COMMUNICATIONS INVESTMENT GROUP', 'SANOFI', 'IberdrolaIBERDROLA', 'LYONDELLBASELL INDUSTRIES', 'HANWHA', 'ROYAL BANK OF CANADA', 'Alimentation CoucheTardALIMENTATION COUCHETARD',
    'MSADMSAD INSURANCE GROUP HOLDINGS', 'ZF FRIEDRICHSHAFEN', 'PEGATRON', 'CONTINENTAL', 'NIKE', 'BOUYGUES', 'CHINA SOUTH INDUSTRIES GROUP', 'FRESENIUS', 'COMPAL ELECTRONICS', 'DEERE', 'GEORGE WESTON', 'AMERICAN EXPRESS', 'SHANGHAI CONSTRUCTION GROUP', 'CHINA AEROSPACE SCIENCE  TECHNOLOGY', 'VOLVO', 'CHINA ELECTRONICS', 'ABBOTT LABORATORIES', 'CHINA HUADIAN',
    'StoneXSTONEX GROUP', 'SHOUGANG GROUP', 'Plains GP HoldingsPLAINS GP HOLDINGS', 'OMV GROUP', 'ANGLO AMERICAN', 'SHANDONG IRON  STEEL GROUP', 'ITA UNIBANCO HOLDING', 'CHINA TAIPING INSURANCE GROUP', 'SNCF GROUP', 'HANGZHOU IRON AND STEEL GROUP', 'DZ BANK', 'CHUBB', 'JINCHUAN GROUP', 'LA POSTE', 'CHINA AEROSPACE SCIENCE  INDUSTRY', 'J SAINSBURY',
    'Enterprise Products PartnersENTERPRISE PRODUCTS PARTNERS', 'THYSSENKRUPP', 'UBS GROUP', 'TAIKANG INSURANCE GROUP', 'TIAA', 'ORACLE', 'QUANTA COMPUTER', 'DEUTSCHE BANK', 'MITSUBISHI ELECTRIC', 'BANCO BILBAO VIZCAYA ARGENTARIA', 'ANHUI CONCH GROUP', 'DAIWA HOUSE INDUSTRY', 'THERMO FISHER SCIENTIFIC', 'NEW HOPE HOLDING GROUP', 'KOCKO HOLDING', 'JFE HOLDINGS',
    'COCACOLA', 'GUANGZHOU MUNICIPAL CONSTRUCTION GROUP', 'GENERAL DYNAMICS', 'CHSCHS', 'BEIJING JIANLONG HEAVY INDUSTRY GROUP', 'CHINA NATIONAL NUCLEAR', 'ACSACS', 'TORONTODOMINION BANK', 'LORAL', 'ENERGIE BADENWRTTEMBERG', 'LGLG CHEM', 'TATA MOTORS', 'ELOELO GROUP', 'SHENZHEN INVESTMENT HOLDINGS', 'SKSK HYNIX', 'BARCLAYS', 'EnbridgeENBRIDGE', 'CATHAY FINANCIAL HOLDING', 'MEIJI YASUDA LIFE INSURANCE', 'POSTE ITALIANE',
    'UNITED SERVICES AUTOMOBILE ASSN', 'FinatisFINATIS', 'ASTRAZENECA', 'KBKB FINANCIAL GROUP', 'SOMPO HOLDINGS', 'Cenovus EnergyCENOVUS ENERGY', 'CRRC GROUP', 'JINGYE GROUP', 'NORTHWESTERN MUTUAL', 'SUMITOMO MITSUI FINANCIAL GROUP', 'NUCOR', 'HYUNDAI MOBIS', 'ExelonEXELON', 'MAGNA INTERNATIONAL', 'CK HUTCHISON HOLDINGS', 'PHOENIX PHARMA', 'MASSACHUSETTS MUTUAL LIFE INSURANCE',
    'KUEHNE  NAGEL INTERNATIONAL', 'JARDINE MATHESON', 'RazenRAZEN', 'NORTHROP GRUMMAN', 'TONGLING NONFERROUS METALS GROUP', 'MITSUBISHI CHEMICAL HOLDINGS', 'MM', 'BRITISH AMERICAN TOBACCO', 'MIZUHO FINANCIAL GROUP', 'HAIER SMART HOME', 'OLAM GROUP', 'ZIJIN MINING GROUP', 'HERAEUS HOLDING', 'AISIN', 'TravelersTRAVELERS', 'CHINA DATANG', 'LONGFOR GROUP HOLDINGS', 'SHUDAO INVESTMENT GROUP',
    'CHINA NATIONAL AVIATION FUEL GROUP', 'ARROW ELECTRONICS', 'NEW CHINA LIFE INSURANCE', 'HONEYWELL INTERNATIONAL', 'MITSUBISHI HEAVY INDUSTRIES', 'Dollar GeneralDOLLAR GENERAL', 'SCHNEIDER ELECTRIC', 'HUNAN IRON  STEEL GROUP', 'LUAN CHEMICAL GROUP', 'SIEMENS ENERGY', 'PKN ORLEN GROUP', 'ING GROUP', 'PHOENIX GROUP HOLDINGS', 'VEOLIA ENVIRONNEMENT', 'CoopCOOP GROUP', 'QUALCOMM',
    'SHANGHAI PHARMACEUTICALS HOLDING', 'SHANXI COKING COAL GROUP', 'CarMaxCARMAX', 'SAPSAP', 'XINJIANG ZHONGTAI GROUP', 'TATA STEEL', 'BYD', 'Rajesh ExportsRAJESH EXPORTS', 'InditexINDITEX', 'BANCO BRADESCO', 'FUBON FINANCIAL HOLDING', 'SF HOLDING', 'SUMITOMO LIFE INSURANCE', 'CAPITAL ONE FINANCIAL', 'CANON', 'GUANGXI INVESTMENT GROUP', 'FUJITSU', 'YUNNAN PROVINCIAL INVESTMENT HOLDING GROUP',
    'TAKEDA PHARMACEUTICAL', 'SUZUKI MOTOR', 'MigrosMIGROS GROUP', 'TD SynnexTD SYNNEX', 'WEICHAI POWER', 'XINJIANG GUANGHUI INDUSTRY INVESTMENT', 'PHILIP MORRIS INTERNATIONAL', 'WORLD FUEL SERVICES', 'BANK OF NOVA SCOTIA', 'SUNCOR ENERGY', 'SHANDONG HISPEED GROUP', 'HAILIANG GROUP', 'CRHCRH', 'InvestorINVESTOR', 'WISTRON', 'LINDE', 'SAMSUNG LIFE INSURANCE', 'BANCO DO BRASIL', 'CHENGDU XINGCHENG INVESTMENT GROUP',
    'GUANGZHOU PHARMACEUTICAL HOLDINGS', 'Performance Food GroupPERFORMANCE FOOD GROUP', 'SHANGHAI DELONG STEEL GROUP', 'GSGS CALTEX', 'MercadonaMERCADONA', 'CJCJ CORP', 'MEDTRONIC', 'CTSAMSUNG CT', 'CPC', 'SUMITOMO ELECTRIC INDUSTRIES', 'XX RETAIL GROUP', 'DELTA AIR LINES', 'AMERICAN AIRLINES GROUP', 'TOSHIBA', 'NetflixNETFLIX', 'METRO', 'PARAMOUNT GLOBAL', 'BRIDGESTONE', 'US Foods HoldingUS FOODS HOLDING', 'DANAHER',
    'GREE ELECTRIC APPLIANCES', 'HOLCIM', 'MedipalMEDIPAL HOLDINGS', 'JABIL', 'RANDSTAD', 'STARBUCKS', 'ColesCOLES GROUP', 'CREDIT SUISSE GROUP', 'RWE', 'DSVDSV', 'ABBABB', 'MONDELEZ INTERNATIONAL', 'DANONE', 'UMICORE']


    const target_uni = [
        "Worcester Polytechnic Institute",
        "Wayne State University",
        "Virginia Polytechnic Institute and State University",
        "University of Wisconsin Madison",
        "University of Washington",
        "University of Utah",
        "University of Texas Dallas",
        "University of Texas Austin",
        "University of Texas Arlington",
        "University of Southern California",
        "University of Pennsylvania",
        "University of North Carolina Charlotte",
        "University of North Carolina Chapel Hill",
        "University of Minnesota Twin Cities",
        "University of Michigan Ann Arbor",
        "University of Massachusetts Amherst",
        "University of Maryland College Park",
        "University of Illinois Urbana-Champaign",
        "University of Illinois Chicago",
        "University of Florida",
        "University of Colorado Boulder",
        "University of Cincinnati",
        "University of California Santa Cruz",
        "University of California Santa Barbara",
        "University of California San Diego",
        "University of California Los Angeles",
        "University of California Irvine",
        "University of California Davis",
        "University of Arizona",
        "Texas A and M University College Station",
        "Syracuse University",
        "SUNY Stony Brook",
        "SUNY Buffalo",
        "Stanford University",
        "Rutgers University New Brunswick/Piscataway",
        "Purdue University",
        "Princeton University",
        "Ohio State University Columbus",
        "Northwestern University",
        "Northeastern University",
        "North Carolina State University",
        "New York University",
        "New Jersey Institute of Technology",
        "Massachusetts Institute of Technology",
        "Johns Hopkins University",
        "Harvard University",
        "Georgia Institute of Technology",
        "George Mason University",
        "Cornell University",
        "Columbia University",
        "Clemson University",
        "Carnegie Mellon University",
        "California Institute of Technology",
        "Arizona State University"
    ];
    

export { universities, board_universities, getUniversityCategory, companies, us_university, target_uni };
