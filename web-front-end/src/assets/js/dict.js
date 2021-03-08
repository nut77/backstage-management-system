// 相关键键值对字典
import axios from 'axios';
import CONFIG from './config';
import store from '../../store/index';

let dict = {};

dict.aliasLevel = {
  '1': '灰名单',
  '2': '白名单',
  '3': '黑名单'
};

dict.aliasSampleLevel = {
  '1': '灰样本',
  '2': '白样本',
  '3': '黑样本'
};

dict.aliasType = {
  '1': '未定性',
  '2': '被攻击者邮箱',
  '3': '攻击者邮箱'
};

dict.aliasThreatLev = {
  '0': '灰邮箱',
  '1': '白邮箱',
  '2': '攻击者自己购买的邮箱',
  '3': '被攻击成功，并没有用来实施其他的攻击行为',
  '4': '被攻击成功，且用来发送、实施其他攻击行为',
  '5': '被攻击但没有攻击成功',
  '6': '攻击者自己注册邮箱、自己用来实施攻击的邮箱'
};

dict.aliasSampleType = {
  '1': '同源样本',
  '2': '离散样本'
};

dict.aliasDetect = {
  '0': '正在检测',
  '1': '检测完成',
  '2': '检测异常'
};

dict.threatLevColor = [
  'rgba(246, 90, 75, 0.2)', 'rgba(246, 90, 75, 0.3)', 'rgba(246, 90, 75, 0.4)',
  'rgba(246, 90, 75, 0.5)', 'rgba(246, 90, 75, 0.6)', 'rgba(246, 90, 75, 0.8)', 'rgba(246, 90, 75, 1)'];

dict.level = [
  {label: '灰名单', value: 1},
  {label: '白名单', value: 2},
  {label: '黑名单', value: 3}
];

dict.sampleLevel = [
  {label: '灰样本', value: 1},
  {label: '白样本', value: 2},
  {label: '黑样本', value: 3}
];

dict.type = [
  {label: '未定性', value: 1},
  {label: '被攻击者邮箱', value: 2},
  {label: '攻击者邮箱', value: 3}
];

dict.threatLev = [
  {label: '灰邮箱', value: 0},
  {label: '白邮箱', value: 1},
  {label: '攻击者自己购买的邮箱', value: 2},
  {label: '被攻击成功，并没有用来实施其他的攻击行为', value: 3},
  {label: '被攻击成功，且用来发送、实施其他攻击行为', value: 4},
  {label: '被攻击但没有攻击成功', value: 5},
  {label: '攻击者自己注册邮箱、自己用来实施攻击的邮箱', value: 6}
];

dict.sampleType = [
  {label: '同源样本', value: 1},
  {label: '离散样本', value: 2}
];

dict.detect = [
  {label: '正在检测', value: 0},
  {label: '检测完成', value: 1},
  {label: '检测异常', value: 2}
];

// 威胁等级 （样本、邮件）
dict.threatLevel = [
  {label: '正常', value: 0},
  {label: '低危', value: 1},
  {label: '中危', value: 2},
  {label: '高危', value: 3},
  {label: '危急', value: 4}
];

dict.aliasThreatLevel = {
  0: '正常',
  1: '低危',
  2: '中危',
  3: '高危',
  4: '危急'
};

dict.countryOption = ['美国', '英国', '俄罗斯', '日本', '韩国', '朝鲜', '中国台湾', '印度'];

dict.countryOptions = [
  {
    label: 'A',
    options: [
      '阿尔巴尼亚',
      '阿尔及利亚',
      '阿富汗',
      '阿根廷',
      '爱尔兰',
      '埃及',
      '埃塞俄比亚',
      '爱沙尼亚',
      '阿拉斯加',
      '阿森松',
      '阿联酋',
      '阿鲁巴岛',
      '阿曼',
      '巴布亚新几内亚',
      '安道尔',
      '安哥拉',
      '安圭拉岛',
      '安提瓜和巴布达',
      '澳大利亚',
      '奥地利',
      '澳门',
      '阿塞拜疆']
  },
  {
    label: 'B',
    options: [
      '巴巴多斯',
      '巴哈马',
      '白俄罗斯',
      '百慕大',
      '巴基斯坦',
      '巴拉圭',
      '巴勒斯坦',
      '巴林',
      '巴拿马',
      '保加利亚',
      '巴西',
      '北马里亚纳',
      '贝宁',
      '比利时',
      '秘鲁',
      '冰岛',
      '博茨瓦纳',
      '波多黎各',
      '玻利维亚',
      '波黑',
      '波兰',
      '伯利兹',
      '不丹',
      '布基纳法索',
      '布隆迪',
      '布维岛'
    ]
  },
  {
    label: 'C',
    options: [
      '朝鲜',
      '赤道几内亚'
    ]
  },
  {
    label: 'D',
    options: [
      '丹麦',
      '德国',
      '东帝汶',
      '东萨摩亚',
      '多哥',
      '多米尼加',
      '多米尼克'
    ]
  },
  {
    label: 'E',
    options: [
      '厄瓜多尔',
      '厄立特里亚',
      '俄罗斯'
    ]
  },
  {
    label: 'F',
    options: [
      '法国',
      '法罗群岛',
      '梵蒂冈',
      '法属波利尼西亚',
      '法属圭亚那',
      '法属南部领土',
      '斐济',
      '菲律宾',
      '芬兰',
      '佛得角',
      '福克兰群岛'
    ]
  },
  {
    label: 'G',
    options: [
      '冈比亚',
      '刚果',
      '格陵兰岛',
      '格林纳达',
      '哥伦比亚',
      '哥斯达黎加',
      '瓜德罗普',
      '关岛',
      '古巴',
      '圭亚那'
    ]
  },
  {
    label: 'H',
    options: [
      '海地',
      '韩国',
      '哈萨克斯坦',
      '赫德岛和麦克唐纳岛',
      '荷兰',
      '荷属安的列斯',
      '洪都拉斯'
    ]
  },
  {
    label: 'J',
    options: [
      '加纳',
      '加拿大',
      '柬埔寨',
      '加蓬',
      '吉布提',
      '基里巴斯',
      '津巴布韦',
      '几内亚',
      '几内亚比绍'
    ]
  },
  {
    label: 'K',
    options: [
      '喀麦隆',
      '卡塔尔',
      '利比里亚',
      '科克群岛',
      '科科斯岛',
      '科摩罗',
      '肯尼亚',
      '科特迪瓦',
      '科威特'
    ]
  },
  {
    label: 'L',
    options: [
      '莱索托',
      '老挝',
      '黎巴嫩',
      '利比亚',
      '列支敦士登',
      '留尼汪岛',
      '罗马尼亚',
      '卢森堡',
      '卢旺达'
    ]
  },
  {
    label: 'M',
    options: [
      '马达加斯加',
      '马尔代夫',
      '马耳他',
      '马来西亚',
      '马拉维',
      '马里',
      '毛里求斯',
      '毛里塔尼亚',
      '马提尼克',
      '美国',
      '美属太平洋群岛',
      '美属维尔京群岛',
      '蒙古',
      '孟加拉国',
      '缅甸',
      '摩洛哥',
      '莫桑比克',
      '墨西哥'
    ]
  },
  {
    label: 'N',
    options: [
      '纳米比亚',
      '南非',
      '南斯拉夫',
      '瑙鲁',
      '尼泊尔',
      '尼加拉瓜',
      '尼日尔',
      '尼日利亚',
      '纽埃岛',
      '诺福克岛',
      '挪威'
    ]
  },
  {
    label: 'P',
    options: [
      '葡萄牙',
      'R',
      '日本',
      '瑞典',
      '瑞士'
    ]
  },
  {
    label: 'S',
    options: [
      '萨尔瓦多',
      '塞拉利昂',
      '塞内加尔',
      '塞浦路斯',
      '塞舌尔',
      '沙特阿拉伯',
      '圣诞岛',
      '圣多美和普林西比',
      '圣赫勒拿',
      '圣卢西亚',
      '圣马力诺',
      '斯里兰卡',
      '斯威士兰',
      '苏丹',
      '苏里南',
      '所罗门群岛',
      '索马里'
    ]
  },
  {
    label: 'T',
    options: [
      '泰国',
      '汤加',
      '坦桑尼亚',
      '土耳其',
      '突尼斯',
      '图瓦卢'
    ]
  },
  {
    label: 'W',
    options: [
      '瓦努阿图',
      '危地马拉',
      '委内瑞拉',
      '文莱',
      '乌干达',
      '乌拉圭'
    ]
  },
  {
    label: 'X',
    options: [
      '西班牙',
      '希腊',
      '新加坡',
      '新西兰',
      '匈牙利',
      '西萨摩亚',
      '叙利亚'
    ]
  },
  {
    label: 'Y',
    options: [
      '牙买加',
      '意大利',
      '伊拉克',
      '伊朗',
      '印度',
      '印度尼西亚',
      '英国',
      '以色列',
      '约旦',
      '越南'
    ]
  },
  {
    label: 'Z',
    options: [
      '乍得',
      '赞比亚',
      '扎伊尔',
      '直布罗陀',
      '智利',
      '中非',
      '中国',
      '中国台湾',
      '中国香港'
    ]
  }
];

dict.state = [
  {label: '正在检测', value: 0},
  {label: '检测完成', value: 1},
  {label: '检测异常', value: 2}
];

dict.blackPosition = [
  {label: '未命中', value: 0},
  {label: '邮件内容中有黑名单', value: 1},
  {label: '邮件头中有黑名单', value: 2},
  {label: '邮箱名是黑名单', value: 3},
  // {label: '任意位置', value: 4}
  {label: '其它位置  ', value: 4}
];

dict.readState = [
  // {label: '全部', value: ''},
  {label: '已读', value: 1},
  {label: '未读', value: 0}
];

dict.relationalObj = [
  {label: '样本', value: 'sample'},
  {label: '邮件', value: 'email'},
  {label: '邮箱', value: 'emailBox'},
  {label: '高级威胁情报', value: 'apt'},
  {label: '第三方数据', value: 'networkVisit', isHidden: !store.state.systemConfig.has360NetworkVisit},
  {label: '报告', value: 'docReport'}
];

// 数据接口数据类型
dict.aliasDataInterfaceType = {
  /*
   * email: '邮件',
   * sample: '样本',
   * emailbox: '邮箱登录日志',
   * emailregister: '邮箱注册信息'
   */
};
dict.dataInterfaceType = [
  /*
   * {label: '邮件', value: 'email'},
   * {label: '样本', value: 'sample'},
   * {label: '邮箱登录日志', value: 'emailbox'},
   * {label: '邮箱注册信息', value: 'emailregister'}
   */
];

// 数据接口同步周期
dict.aliasDataSyncCycle = {
  7: '7天',
  15: '15天',
  30: '1个月',
  90: '3个月'
};
dict.dataSyncCycle = [
  {label: '7天', value: 7},
  // 测试用
  {label: '2小时', value: 2},

  {label: '15天', value: 15},
  {label: '1个月', value: 30},
  {label: '3个月', value: 90}
];

// 邮箱码址可能表述名没统一  所以键名有多个
dict.relationalAttr = {
  'ip': 'ipattr',
  'domain': 'domainattr',
  'hash': 'hashattr',
  'emailAccount': 'emailattr',
  'email': 'emailattr',
  'emailBox': 'emailattr',
  'phone': 'phoneattr',
  'esid': 'esidattr'
};

// 码址类型 英中文对照
dict.codeAttrKeyAndType = {
  emailattr: '邮箱账号',
  ipattr: 'IP',
  hashattr: 'HASH',
  domainattr: '域名',
  phoneattr: '手机号'
};

dict.taskType = {
  sample: '样本',
  email: '邮件',
  emailBox: '邮箱',
  docReport: '报告',
  networkVisit: '360'
};

// 关联分析 后台返回参数对应实际传参type
dict.relationalKeyAndType = {
  emailResults: 'email',
  sampleResults: 'sample',
  emailBoxResults: 'emailBox',
  aptResults: 'apt',
  reportResult: 'docReport',
  networkVisitResult: 'networkVisit',
  // 邮箱账号
  emails: 'emailattr',
  ips: 'ipattr',
  hashs: 'hashattr',
  domains: 'domainattr',
  phones: 'phoneattr'
};

dict.examineState = [
  {label: '已审核', value: 1},
  {label: '未审核', value: 0}
];

dict.taskState = [
  {label: '检测完成', value: 0},
  {label: '同源样本', value: 1},
  {label: '离散样本', value: 2},
  {label: '检测异常', value: 3},
  {label: '非PE文件', value: 4}
];

dict.resetCountryWithOrgs = async function() {
  dict.country = [];
  dict.countryIn = [];
  dict.organization = [];
  dict.countryWithOrgs = {};
};
dict.resetNodeList = async function() {
  dict.nodeList = [];
};
dict.resetOfficeList = async function() {
  dict.officeList = [];
};

dict.updateCountry = async function() {
  try {
    let res = await axios.get(CONFIG.api.countryList);
    dict.country = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

dict.updateCountryIn = async function() {
  try {
    let res = await axios.get(CONFIG.api.countryListIn);
    dict.countryIn = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

dict.updateOrganization = async function() {
  try {
    let res = await axios.get(CONFIG.api.orgList);
    dict.organization = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

dict.updateCountryWithOrgs = async function() {
  try {
    let res = await axios.get(CONFIG.api.countryWithOrgs);
    let data = res.data.data;
    for (let item of data) {
      dict.countryWithOrgs[item.label] = dict.countryWithOrgs[item.label] || [];
      dict.countryWithOrgs[item.label].push(item.value);
    }
  } catch (e) {
    console.log(e);
  }
};

dict.updateNodeList = async function() {
  try {
    let res = await axios.get(CONFIG.api.nodeSampleList);
    for (let item of res.data.data) {
      dict.nodeList.push({label: item.alias || item.name, value: item.name});
    }
  } catch (e) {
    console.log(e);
  }
};

dict.updateOfficeList = async function() {
  try {
    let res = await axios.get(CONFIG.api.officeAll);
    dict.officeList = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

dict.updateRoleList = async function() {
  try {
    let res = await axios.get(CONFIG.api.roleAll);
    dict.roleList = res.data.data || [];
  } catch (e) {
    console.log(e);
  }
};

dict.nodeList = [];
dict.updateDict = function () {
  // 更新方向、组织和方向组织列表
  dict.resetCountryWithOrgs();
  dict.updateCountry();
  dict.updateOrganization();
  dict.updateCountryWithOrgs();
  dict.updateCountryIn();

  // 更新机构列表
  dict.resetOfficeList();
  dict.updateOfficeList();

  /*
   * 更新节点列表 - 前端探针节点
   * dict.resetNodeList();
   * dict.updateNodeList();
   */
};

export default dict;
