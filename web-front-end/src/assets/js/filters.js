// 过滤器
import Vue from 'vue';
import Dict from './dict';

// 转换空字符串
Vue.filter('transformNull', function(value, defaultString) {
  defaultString = (defaultString || defaultString === 0) ? defaultString : '-';
  return value || value === 0 ? value : defaultString;
});

// 数组字符串呈现
Vue.filter('arrayToString', function(value, defaultString = '-', isHtml = false) {

  if (!(value instanceof Array)) return value || defaultString;
  let str = value && value.length ? '' : defaultString;
  let arr = [];
  if (value) {
    for (let item of value) {
      arr.push(item);
      str += `<p>${item}</p>`;
    }
  }
  return isHtml ? str : (arr.length ? arr.join(',') : defaultString);
});

// 转换危险等级
Vue.filter('transformThreatLvl', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasThreatLev[value] || defaultString;
  return returnString;
});

// 转换类型
Vue.filter('transformType', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasType[value] || defaultString;
  return returnString;
});

// 转换等级
Vue.filter('transformLevel', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasLevel[value] || defaultString;
  return returnString;
});

// 转换等级(样本)
Vue.filter('transformSampleLevel', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasSampleLevel[value] || defaultString;
  return returnString;
});

// 码址等级(样本)
Vue.filter('transformSampleType', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasSampleType[value] || defaultString;
  return returnString;
});

// 转换状态
Vue.filter('transformStatus', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = defaultString;
  switch (value) {
    case 0:
      returnString = '正在检测';
      break;
    case 1:
      returnString = '检测完成';
      break;
    case 2:
      returnString = '检测异常';
      break;
  }
  return returnString;
});

// 转换检测状态
Vue.filter('transformDetect', function(value, defaultString) {
  defaultString = defaultString || '-';
  let returnString = Dict.aliasDetect[value] || defaultString;
  return returnString;
});

// 转换 关联分析详情-左上角-基本信息-标题
Vue.filter('transformBaseInfoTitle', function(data, type, value) {
  if (['emailBox', 'emailAccount', 'hash', 'ip', 'domain', 'phone', 'esid'].includes(type)) return value;
  if (['email'].includes(type)) return data.hash;
  if (['apt'].includes(type)) return data.title;
  if (['docReport'].includes(type)) return data.fileName;
  if (['sample'].includes(type)) return data.md5;
  if (['networkVisit'].includes(type)) return data.esId;
  return '';
});

// 威胁等级
Vue.filter('transformThreatLevel', function(value, defaultString) {
  return Dict.aliasThreatLevel[value] || (defaultString || '-');
});

function transformIdToName(list, value, defaultString) {
  defaultString = defaultString || '-';
  let item = list.find(item => item.value === value);
  return item ? item.label : defaultString;
}

// 转换机构ID为机构名
Vue.filter('transformInIdToName', function(value, defaultString) {
  return transformIdToName(Dict.officeList, value, defaultString);
});

// 转换方向ID为方向名 目前label和value用的同一个值，不用转
Vue.filter('transformCountryIdToName', function(value, defaultString) {
  return value || defaultString || '-';
  // return transformIdToName(Dict.country, value, defaultString);
});

// 转换组织ID为组织名 目前label和value用的同一个值，不用转
Vue.filter('transformOrgIdToName', function(value, defaultString) {
  return value || defaultString || '-';
  // return transformIdToName(Dict.organization, value, defaultString);
});

Vue.filter('transformTimestampFormat', function(value, format = 'yyyy-MM-dd hh:mm:ss', defaultString) {
  if (!value) return defaultString || '-';
  return new Date(value).Format(format);
});

// 转换图片地址
Vue.filter('transformFileSrc', function(value, basePath, defaultString = '') {
  if (!value) return defaultString || '';
  return basePath + value + '?Authorization=' + localStorage.token;
});

// windows-系统标注-call-time
Vue.filter('transformCallTimeFormat', function(value, defaultString) {
  if (!value) return defaultString || '-';
  value = value.slice(1, -1);
  return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
});

// 转换360网络访问可疑等级
Vue.filter('transform360NdType', function(value, defaultString) {
  if (!value) return defaultString || '-';
  let level = ['10,20', 30, 40, '50,60,70'];
  let type = ['白名单', '灰名单,有样本', '灰名单,无样本', '恶意样本'];

  let index = level.findIndex(item => item.toString().includes(value));
  return type[index === -1 ? 0 : index];
});
