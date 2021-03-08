import axios from 'axios';
import CONFIG from './config';
import {Loading, Message, MessageBox} from 'element-ui';

let Utils = {};
Utils.$http = axios;
Utils.CONFIG = CONFIG;
Utils.ajaxCount = 0;

/**
 * Gets the tip text 获取提示文字
 * @param {string} [type] - 提示文字类型
 * @param {string} [code] - 提示代码
 * @return {string} 提示文字
 */
Utils.getTipText = function(type, code) {
  if (!type || !code) return '';
  return CONFIG[type][code] || '';
};

/**
 * Shows the tip. 显示提示
 * @param {string} [type] - 提示框类型
 * @param {string} [textType] - 提示文字类型
 * @param {string} [code] - 提示代码
 * @param {string} [text] - 提示文字
 * @param {string} [duration=3000] - 提示框持续时间
 */
Utils.showTip = function(type, textType, code, text, duration = 3000) {
  Utils.hasToken() && Message({
    type: type || 'info',
    showClose: false,
    duration,
    message: text || Utils.getTipText(textType, code)
  });
};

/**
 * Shows the message. 显示ajax请求返回的message
 * @param {string} text - 提示框文字
 * @param {Object} [otherOptions={}] - 提示框配置
 */
Utils.showMsg = function(text, otherOptions = {}) {
  let options = {
    showClose: false,
    message: text
  };
  Object.assign(options, otherOptions);
  Utils.hasToken() && Message(options);
};

/**
 * Hides the tip. 关闭提示框
 */
Utils.hideTip = function() {
  Message.close();
};

/**
 * Shows the modal dialog. 弹出框
 * @param {string} [type] - 弹出框类型
 * @param {string} textType - 弹出文字类型
 * @param {string} code - 弹出文字代码
 */
Utils.showModalDialog = function(type, textType, code) {
  MessageBox.alert(Utils.getTipText(textType, code), '提示', {
    confirmButtonText: '确定',
    type: type || 'success'
  });
};

/**
 * Shows the modal dialog. 对象深拷贝
 * @param {Object} obj - 要拷贝的对象
 * @return {Object} 拷贝后的对象
 */
Utils.objectDeepClone = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Gets the json. 获取json数据
 * @param {string} url - url
 * @param {Function} success - 成功回调
 * @param {Function} error - 失败回调
 * @param {Object} [params={}] - 请求参数
 * @param {string} [method='get'] - 请求方式
 * @param {boolean} [isFile=false] - 请求是否含文件
 * @param {boolean} [isShowPop=false] - 是否需要显示全屏加载动画
 */
Utils.getJson = function(url, success, error, params = {}, method = 'get', isFile = false, isShowPop = false) {
  if (!url) return;
  let loadingInstance;
  if (isShowPop) {
    loadingInstance = Loading.service({
      fullscreen: true,
      customClass: 'loading page-loading'
    });
  }
  let options = {
    method: method,
    url: url,
    timeout: 2 * 1000 * 60,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: params
  };
  if (isFile) {
    options.headers = {
      'Content-Type': 'multipart/form-data'
    };
  }
  Utils.$http(options)
    .then(function(res) {
      /*
       * if(!(--Utils.ajaxCount) && isShowPop) {
       *  loadingInstance.close()
       * }
       */
      if (isShowPop) {
        loadingInstance.close();
      }
      res = res ? res.data : {};
      if (Object.keys(res).length === 0 || !res.code) {
        if (typeof error === 'function') error(res);
        return false;
      }
      if (res.code === 200) {
        if (typeof success === 'function') success(res);
      } else {
        if (typeof error === 'function') error(res);
        res.code !== 401 && Utils.showTip('', '', '', res.msg ? res.msg : Utils.getTipText('error', '-1'));
      }
    }, function(err) {
      Utils.showTip('error', 'error', err === 413 ? '-11' : '-1');
      if (isShowPop) {
        loadingInstance.close();
      }
      if (typeof error === 'function') error(err);
    });
};

/**
 * 利用axios发送ajax请求
 * @param {string} method - 请求方式
 * @param {string} url - url
 * @param {Function} success - 成功回调
 * @param {Function} error - 失败回调
 * @param {Object} [otherOptions={}] - 请求参数
 * @param {boolean} [showMsg=true] - 请求成功后 是否显示提示文字
 * @param {boolean} [hasFile=false] - 请求是否含文件
 */
Utils.ajax = function(method, url, success, error, otherOptions = {}, showMsg = true, hasFile = false) {
  if (!url) return;
  let options = {
    method: method,
    url,
    timeout: 10 * 1000 * 60
  };
  Object.assign(options, otherOptions);

  if (hasFile) {
    options.headers = {
      'Content-Type': 'multipart/form-data'
    };
  }
  Utils.$http(options)
    .then(function(res) {
      res = res ? res.data : {};

      if (Object.keys(res).length === 0 || !res.code) return false;

      if (res && res.code === 200) {
        if (typeof success === 'function') success(res);
      } else if (typeof error === 'function') error(res);

      showMsg && Utils.showMsg(res.msg);
    }, function(err) {
      Utils.showTip('error', 'error', '-1');
      if (typeof error === 'function') error(err);
    });
};

/**
 * 当前系统localstorage 是否有token
 * @return  {boolean}
 */
Utils.hasToken = function() {
  let token = localStorage.token;
  return !!(token !== 'null' && token);
};

/**
 * jump. 打开新窗口
 * @param {string} url - url
 */
Utils.jump = function(url) {
  url && window.open(url + '?Authorization=' + localStorage.token, '_blank');
};

/**
 * formatFileSize. 文件大小格式化
 * @param {(null|string|number)} fileSize - 文件大小,单位字节
 */
Utils.formatFileSize = function(fileSize) {
  if (fileSize == null || fileSize === '' || !fileSize) {
    return '0B';
  }
  let unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  let srcSize = parseFloat(fileSize);
  index = Math.floor(Math.log(srcSize) / Math.log(1024));
  let size = srcSize / Math.pow(1024, index);
  size = size.toFixed(2);
  return size + unitArr[index];
};

/**
 * 按指定格式-格式化时间
 * @param {string} fmt - 时间格式化方式
 * @param {boolean} hasweek - 是否显示星期
 * @return {string} 格式化后的时间
 * @example
 * new Date().Format("yyyy-MM-dd hh:mm:ss")
 */
Date.prototype.Format = function (fmt, hasweek) {
  let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    // 季度
    'q+': Math.floor((this.getMonth() + 3) / 3),
    // 毫秒
    'S': this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))); }

  return fmt + (hasweek ? '&nbsp;&nbsp;&nbsp;&nbsp;' + weekday[this.getDay()] : '');
};

/**
 * 判断输入的域名格式是否正确
 * @param {string} str - 待判断的域名
 * @return {boolean}
 * @example
 * Utils.isDomain('www.123.co')
 */
Utils.isDomain = function (str) {
  // let reg = /[a-zA-Z0-9][a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][a-zA-Z0-9]{0,62})+\.?/; (([a-z0-9\\-]{2,}\\[?\\.\\]?)+
  let reg = '(^([a-z0-9]{2,}\.)+(abogado|ac|academy|accountants|active|actor|ad|adult|' +
    'ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|amsterdam|an|android|ao|aq|aquarelle' +
    '|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba' +
    '|band|bank|bar|barclaycard|barclays|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi' +
    '|bid|bike|bingo|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo' +
    '|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cal' +
    '|camera|camp|cancerresearch|canon|capetown|capital|caravan|cards|care|career|careers|cartier' +
    '|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|chat|cheap|christmas|chrome' +
    '|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach' +
    '|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting' +
    '|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella' +
    '|cv|cw|cx|cy|cymru|cz|dabur|dad|dance|dating|day|dclk|de|deals|degree|delivery|democrat|dental' +
    '|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs' +
    '|domains|doosan|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering' +
    '|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert' +
    '|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fit|fitness' +
    '|fj|fk|flights|florist|flowers|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund' +
    '|furniture|futbol|ga|gal|gallery|garden|gb|gbiz|gd|ge|gent|gf|gg|ggee|gh|gi|gift|gifts|gives' +
    '|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|goog|google|gop|gov|gp|gq|gr|graphics|gratis' +
    '|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|hangout|haus|healthcare|help|here|hermes' +
    '|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|ifm' +
    '|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments' +
    '|io|iq|ir|irish|is|it|iwc|jcb|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|kddi|ke|kg|kh|ki|kim' +
    '|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kyoto|kz|la|lacaixa|land|lat|latrobe|lawyer|lb' +
    '|lc|lds|lease|legal|lgbt|li|lidl|life|lighting|limited|limo|link|lk|loans|london|lotte|lotto' +
    '|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|marriott' +
    '|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda' +
    '|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz' +
    '|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra' +
    '|nrw|ntt|nu|nyc|nz|okinawa|om|one|ong|onl|ooo|org|organic|osaka|otsuka|ovh|pa|paris|partners|parts' +
    '|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place' +
    '|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property' +
    '|ps|pt|pub|pw|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair' +
    '|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu' +
    '|sa|saarland|sale|samsung|sarl|sb|sc|sca|scb|schmidt|schule|schwarz|science|scot|sd|se|services' +
    '|sew|sexy|sg|sh|shiksha|shoes|shriram|si|singles|sj|sk|sky|sl|sm|sn|so|social|software|sohu|solar' +
    '|solutions|soy|space|spiegel|sr|st|style|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy' +
    '|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|temasek|tennis|tf|tg|th|tienda|tips' +
    '|tires|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|toshiba|town|toys|tp|tr|trade|training|travel' +
    '|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung' +
    '|vet|vg|vi|viajes|video|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch' +
    '|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xyz|yachts' +
    '|yandex|ye|yoga|yokohama|youtube|yt|za|zm|zone|zuerich|zw)$)';
  return new RegExp(reg).test(str);
};

/**
 * 判断输入的MD5值格式是否正确（32位16进制）
 * @param {string} str - 待判断MD5值
 * @return {boolean}
 */
Utils.isMd5 = function (str) {
  let reg = /^([a-fA-F0-9]{32})$/;
  return reg.test(str);
};

/**
 * 判断输入的密码格式是否正确（密码为6到16位的大小写字母、数字和特殊字符混合）
 * @param {string} pwd - 待判断密码
 * @return {boolean}
 */
Utils.isValidPwd = function (pwd) {
  let count = 0;
  // 判断密码长度是6-16位
  if (pwd.length >= 6 && pwd.length <= 16) ++count;

  // 判断密码是否包含大写字母
  if (/[A-Z]+/.test(pwd)) ++count;

  // 判断密码是否包含小写字母
  if (/[a-z]+/.test(pwd)) ++count;

  // 判断密码是否包含数字
  if (/[0-9]+/.test(pwd)) ++count;

  // 判断密码是否包含特殊字符
  if (/[~@#%\+\-=\/\(_\)\*\&\<\>\[\"\;\'\|\$\^\?\!.\{\}\`]+/.test(pwd)) ++count;

  return count === 5;
};

/**
 * 判断输入的电话号码格式是否正确
 * @param {string} phone - 电话号码
 * @return {boolean}
 */
Utils.isPhone = function (phone) {
  let reg = /^1[3|4|5|8][0-9]\d{8}$/;
  return reg.test(phone);
};

/**
 * 更改localstorage的值--登录相关
 * @param {Object} obj - 传入的修改的对象
 */
Utils.localstorage = function (obj) {
  if (Object.keys(obj).length === 0) {
    localStorage.setItem('userName', '');
    localStorage.clear();
    return false;
  }
  // 给localstorage添加属性（主要用来保存当前登录用户信息）
  for (let key in obj) {
    localStorage.setItem(key, key === 'token' ? `Bearer ${obj[key]}` : obj[key]);
  }
};

/**
 * 获取localstorage的值
 * @param {string }key - 键名
 */
Utils.getLocalstorage = function (key) {
  return localStorage.getItem(key) || '';
};

/**
 * 数组转为字符串的展示
 * @param {Array} arr - 数组
 * @param {string} [sep=','] - 分隔符
 * @param {string} [emptyVal=''] - 数组为空时默认显示
 * @return {string} 转换后的字符串
 */
Utils.arrJoinWithSep = function (arr, sep = ',', emptyVal = '') {
  if (Array.isArray(arr)) {
    return arr.length === 0 ? emptyVal : arr.join(sep);
  }
  return arr || emptyVal;
};

/**
 * 字符串的展示
 * @param {string} str - 待展示的字符串
 * @param {string} [emptyVal=''] - 数组为空时默认显示
 * @return {string} 转换后的字符串
 */
Utils.str = function (str, emptyVal = '-') {
  return str || emptyVal;
};

/**
 * 将对象中指定属性值设为true/false
 * @param {Object} obj - 传入的对象
 * @param {string[]} keys - 需要设置的键名数组
 * @param {boolean} val - 需要设置的值（true/false）
 */
Utils.setObjKeyIsBoolean = function (obj, keys, val) {
  if (Array.isArray(keys)) {
    for (let name of keys) {
      obj[name] = val;
    }
  } else {
    obj[keys] = val;
  }
};

/**
 * 更新表格数据
 * @param {Object} that - vue实例
 * @param {string} url - url
 * @param {Object} [params={}] - 请求参数
 * @param {string} [method='post'] - 请求方式
 * @param {boolean} [isReturnFirstPage=true] - 请求完成后是否需要回到表格第一页
 * @param {boolean} [isLoginOut=false] - 请求完成后是否需要退出登录（重置密码后需要）
 */
Utils.updateTableData = function (that, url, params, method = 'post', isReturnFirstPage = true, isLoginOut = false) {
  let dialogs = Object.keys(that.isShowDialog);

  that.table.isLoading = true;
  Utils.ajax(method, url, () => {
    that.table.isLoading = false;
    that.dialogVisible(dialogs, false);

    if (isLoginOut) {
      that.$utils.localstorage({});
      Message({
        message: '用户修改成功且密码已被重置，请重新登录。',
        customClass: 'dha-message',
        duration: 2500,
        onClose() {
          that.$router.push('/login');
        }
      });
      return;
    }

    if (isReturnFirstPage) {
      that.table.currentPage = 1;
    }
    that.getData();
  }, () => {
    that.table.isLoading = false;
    that.dialogVisible(dialogs, false);
  }, {
    data: params
  });
};

/**
 * 将对象中的属性值置空 （属性值目前只考虑 字符串、数组、对象）
 * @param {Object} obj - 需要处理的对象
 * @param {Object} opt - 额外的重置默认值
 */
Utils.resetObject = function (obj, opt = {}) {
  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key] = [];
    } else if (typeof obj[key] === 'object') {
      obj[key] = {};
    } else {
      obj[key] = '';
    }
    undefined !== opt[key] && (obj[key] = opt[key]);
  }
};

/**
 * 传入的字符串首字母大写
 * @param {string} str - 传入字符串
 * @return {string} 返回首字母大写后的字符串
 */
Utils.upperFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 判断对象是否为空对象
 * @param {Object} obj - 传入对象
 * @return {boolean} 返回对象是否为空对象
 */
Utils.isEmptyObject = obj => {
  let arr = [];
  if (obj && typeof obj === 'object') {
    arr = Object.keys(obj);
    return arr.length === 0;
  }
  return true;
};

/**
 * 返回指定dom对象 自己或其祖先节点 含有指定的类选择器 的dom
 * @param {Object} dom - 传入对象
 * @param {string} selector - class选择器
 * @return {Object} 返回符合的dom或者null
 */
Utils.getParentNodeByClass = (dom, selector) => {
  if (dom.getAttribute('class') && dom.getAttribute('class').includes(selector)) return dom;
  do {
    dom = dom.parentNode;
    let cls = dom.getAttribute('class');
    if (cls && cls.includes(selector)) return dom;
  } while (dom.parentNode);
  return null;
};

/**
 * 用千分位表示数字 以','隔开
 * @param {(number}string)} x - 待转换的值
 * @return {string} 返回千分位表示的数字
 */
Utils.numberWithCommas = (x) => {
  if (x === undefined) {
    return '0';
  }
  if (typeof x !== 'number') x = parseInt(x);
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 给对象属性赋值 不改变对象属性数量，赋值源对象就算是空值也会有值的目标数据
 * @param {Object} target - 传入目标对象，被赋值对象 target
 * @param {Object} source - 传入源对象，赋值对象，有基础数据 source
 * @return {Object} 返回赋值后的对象
 */
Utils.setObjectPropValue = (target, source) => {
  if (!target) return false;
  for (let key in target) {
    target[key] = source[key] === undefined ? target[key] : source[key];
  }
  return target;
};

// 拿到表格的高度和最高高度 高度===最高高度
Utils.getTableMaxHeight = (minusSelectors = ['.el-row:first-child', '.el-pagination'], minusHeight = 0, containerSelector = '.el-main_container', adjustHeight = 0) => {
  // 相关常量 clientHeight-包含了padding (content + padding)
  let BOX_PADDING_HEIGHT = 20;

  let [container, minusHeightTotal] = [document.querySelector(containerSelector), minusHeight];
  if (!container) return 200;
  let [boxHeight, maxHeight] = [container.clientHeight - BOX_PADDING_HEIGHT, 200];

  // if (navigator.userAgent.includes('Firefox')) minusHeightTotal += 20; // 火狐浏览器需要多减20
  for (let selector of minusSelectors) {
    let dom = container.querySelector(selector);
    if (!dom) continue;
    minusHeightTotal += dom.clientHeight;
  }

  maxHeight = boxHeight - minusHeightTotal - adjustHeight;
  return maxHeight > 200 ? maxHeight : 200;
};

export default Utils;
