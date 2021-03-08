const CONFIG = {
  Key: 'user',
  user: {
    // 1、admin 超级管理员 2、user普通用户
    type: 'admin',
    isLogin: true
  },
  page: {
    pageSize: 30,
    pageSizes: [30, 70, 100, 150],
    total: 0
  },
  baseFileUrl: '/api',
  api: {
    // 登录
    login: 'admin/login',

    // 退出
    loginOut: 'loginOut',

    // 修改密码
    modifyPwd: 'core/user/updatePassword',

    // 公用
    countryList: 'country/all',
    countryListIn: 'country/queryIns',
    orgList: 'organization/all',
    countryWithOrgs: 'country/countryOrgAll',

    // 机构管理
    officeList: 'core/in/page',
    officeAdd: 'core/in/create',
    officeUpdate: 'core/in/update',
    officeRemove: 'core/in/delete',
    officeExist: 'core/in/isRepeat',
    officeAll: 'core/in/all',

    // 用户管理
    userList: 'core/user/page',
    userAdd: 'core/user/create',
    userUpdate: 'core/user/update',
    userRemove: 'core/user/delete',
    userExist: 'core/user/isRepeat',
    roleAll: 'core/role/label/all',

    // 方向
    countryTableList: 'country/queryPage',
    countryAdd: 'country/create',
    countryUpdate: 'country/update',
    countryRemove: 'country/delete',

    // 组织
    orgTableList: 'organization/queryPage',
    orgAdd: 'organization/create',
    orgUpdate: 'organization/update',
    orgRemove: 'organization/delete',

    // 标签
    labelList: 'label/queryPage',
    labels: 'label/getAllLabelNames',
    mergeLabel: 'label/merge',
    removeLabel: 'label/delete',
    addLabel: 'label/create',
    getLabels: 'label/query',

    // 码址管理
    codeExist: 'code/exists',
    codeAdd: 'code/create',
    codeRemove: 'code/delete',
    codeQueryList: 'code/queryPage/code',
    codeQuery: 'code/queryCode',
    codeVerify: 'code/verifyCode',
    codePreVerifyRecord: 'code/preVerifyCodes',

    // 系统管理-数据管理-样本文件
    systemSampleList: 'sample/system/list',
    systemSampleRemove: 'sample/system/delete',
    systemSampleUpload: 'sample/system/upload',
    systemAllSampleIps: 'sample/allSampleIps',
    systemAllSampleDomains: 'sample/allSampleDomains',

    // 邮件
    emailNames: 'email/emailNames',
    emailTaskNames: 'email/emailTask',
    emailUsers: 'email/emailUsers',
    emailSessionDetail: 'email/emailDescription',
    queryEmails: 'email/page',
    basic: 'email/basic',
    content: 'email/content',
    src: 'email/content',
    head: 'email/head',
    attachments: 'email/attachments',
    url: 'email/links',
    emailTaskUpload: 'email/upload',
    emailDelete: 'email/removeEmail',
    setReadState: 'email/readState',
    setReadStateAll: 'email/readStateAll',
    taskNameExists: 'email/existsTaskName',
    queryTasks: 'email/task/page',
    emailTaskRemove: 'email/task/remove',
    taskEmailUsers: 'email/task/emailUsers',
    taskEmailTaskNames: 'email/task/emailTaskNames',
    emailIps: 'email/emailIps',
    emailIpPositions: 'email/emailIpLocation',
    emailPorts: 'email/emailPorts',
    emailLanguages: 'email/emailLanguage',

    // 样本
    sampleUpload: 'sample/upload',
    sampleTaskNameExists: 'sample/existsTaskName',
    sampleDelete: 'sample/delete',
    sampleTaskNames: 'sample/sampleTask',
    sampleTaskUsers: 'sample/sampleUser',
    sampleIps: 'sample/sampleIps',
    sampleIpPositions: 'sample/samplePositions',
    samplePorts: 'sample/samplePorts',
    sampleDomains: 'sample/sampleDomains',
    sampleFileTypes: 'sample/sampleFileTypes',
    sampleQuery: 'sample/queryPage',
    sampleTaskDelete: 'sample/task/sampleTaskDelete',
    sampleSessionDetail: 'sample/task/SampleTaskInfo',
    taskSampleTaskNames: 'sample/task/sampleTaskNames',
    taskSampleTaskUsers: 'sample/task/sampleUser',
    taskQuery: 'sample/task/page',

    // 邮箱
    emailBoxList: 'emailBox/page',
    emailBoxs: 'emailBox/nameList',
    emailBoxUsers: 'emailBox/emailBoxUsers',
    boxTaskNames: 'emailBox/taskNames',
    uploadEmailLogin: 'emailBox/upload',
    emailBoxRemove: 'emailBox/remove',
    emailBoxTaskList: 'emailBox/task/page',
    emailBoxTaskNames: 'emailBox/task/taskNames',
    emailBoxUserNames: 'emailBox/task/user',
    emailBoxTaskRemove: 'emailBox/task/remove',
    emailBoxExistsTaskName: 'emailBox/existsTaskName',

    // 报告
    docReportList: 'doc/page',
    docReportTaskNames: 'doc/docReportTaskNames',
    docReportUserNames: 'doc/docReportUserNames',
    uploadDocReport: 'doc/uploadDocReport',
    docRemove: 'doc/remove',
    docCodes: 'doc/codes',
    docTaskList: 'doc/task/page',
    docTaskNames: 'doc/task/taskNames',
    docTaskUser: 'doc/task/user',
    docTaskRemove: 'doc/task/remove',
    docExistsTaskName: 'doc/existsTaskName',
    docDownload: 'docReport/download',

    // 邮箱注册信息
    emailRegistList: 'emailRegist/emailRegistList',
    uploadEmailRegist: 'emailRegist/uploademailRegist',
    removeEmailRegist: 'emailRegist/delete',
    updateEmailRegist: 'emailRegist/update',

    // 高级威胁情报
    highThreatIntelligence: 'apt/list',
    highThreatIntelligenceCodes: 'apt/codes',

    // 数据接口
    dataInterface: 'dataTransmission/queryPage',
    dataInterfaceAdd: 'dataTransmission/save',
    dataInterfaceUpdate: 'dataTransmission/update',
    dataInterfaceRemove: 'dataTransmission/remove',
    dataInterfaceChangeState: 'dataTransmission/changeState',
    dataInterfaceTest: 'dataTransmission/testConnection',
    dataInterfaceDataTypeList: 'dataTransmission/dataTypeList',
    dataInterfaceNameExist: 'dataTransmission/existsDataName',

    // 关联分析
    search: 'searchHistory/search',
    searchHistoryList: 'searchHistory/list',
    searchHistoryAdd: 'searchHistory/create',
    searchObjs: 'search/objs',
    searchCodes: 'search/codes',
    searchEsid: 'search/esid',

    /* 关联分析详情 */
    // 基本信息
    baseInfo_email: 'email/basic',
    baseInfo_emailBox: 'emailBox/detail/baseInfo',
    baseInfo_docReport: 'doc/baseInfo',
    baseInfo_networkVisit: 'network/baseInfo',
    baseInfo_apt: 'apt/baseInfo',
    baseInfo_sample: 'sample/baseInfo',

    // 左下
    leftBottom_emailBox_register: 'emailRegist/email',
    emailboxLoginLogList: 'emailBox/detail/list',
    emailBoxLocationList: 'emailBox/detail/countryList',
    emailBoxPie: 'emailBox/detail/emailBoxPie',
    emailBoxLine: 'emailBox/detail/emailLoginLine',
    // 研判建议用户列表
    suggestUser: 'research/queryAllUser',
    // 研判建议列表
    suggestList: 'research/queryPage',
    // 研判建议发表建议
    suggestPublish: 'research/create',
    // 样本基因同源信息
    sampleHomologys: 'sample/getHomologys',
    // 样本基本信息
    leftBottom_sample_baseInfo: 'sample/report/baseInfo',
    // 样本动态行为
    leftBottom_sample_dynamic: 'sample/report/dynamicInfo',
    // 样本系统标注
    leftBottom_sample_signature: 'sample/report/signatureInfo',
    // 样本威胁行为
    leftBottom_sample_threaten: 'sample/report/threatenInfo',
    // 样本安卓基本信息
    leftBottom_sample_android_baseInfo: 'sample/report/android/baseInfo',
    // 样本linux基本信息
    leftBottom_sample_linux_baseInfo: 'sample/linux/baseInfo',
    // 证书
    leftBottom_sample_certificate: 'sample/report/android/certificateInfo',
    // 权限
    leftBottom_sample_auth: 'sample/report/android/permissionsInfo',
    // 共享库二进制分析
    leftBottom_sample_libAnalysis: 'sample/report/android/binaryInfo',
    // 安全分析
    leftBottom_sample_safeAnalysis: 'sample/report/android/securityInfo',
    // 恶意代码分析
    leftBottom_sample_maliCode: 'sample/report/android/malWare',
    // 静态分析
    leftBottom_sample_static: 'sample/linux/static',
    // 网络分析
    leftBottom_sample_network: 'sample/linux/network',
    // 历史记录
    accessRecordQuery: 'accessRecord/query',

    // 任务图谱
    byTaskNameAndCriteria: 'taskFileInfo/byTaskNameAndCriteria',
    emailTask: 'email/task/taskFilePage',
    emailTaskTree: 'email/task',
    emailBoxTask: 'emailBox/task/taskFilesPage',
    emailBoxTaskTree: 'emailBox/task',
    networkVisitTask: 'network/task/taskFilesPage',
    networkVisitTaskTree: 'network/task',
    docReportTask: 'doc/task/taskFilesPage',
    docReportTaskTree: 'doc/task',
    sampleTask: 'sample/task/taskFilesPage',
    sampleTaskTree: 'sample/task/SampleTaskInfo',
    sampleTaskList: 'sample/task/SampleTaskFiles',

    // 威胁导览
    statSampleThreat: 'threatView/staticSampleAll',
    statSampleFileType: 'threatView/fileTypeList',
    statEmailThreat: 'threatView/staticEmailAll',
    statEmailLang: 'threatView/lanList',
    statCodeAddrType: 'threatView/statisticsCodeList',
    statCodeAddrLevel: 'threatView/statisticsCode',
    newUrgentThreatSampleList: 'threatView/highThreatListSample',
    newUrgentThreatEmailList: 'threatView/highThreatListEmail',

    // 360网络访问
    networkVisitConnIP: 'network/allConnIP',
    networkVisitDomain: 'network/allDomain',
    networkVisitDomainIp: 'network/allDomainIp',
    networkVisitMd5: 'network/allMd5',
    networkVisitTaskName: 'network/allTaskName',
    networkVisitUser: 'network/allUser',
    networkVisitCheck: 'network/check',
    networkVisitCheckAll: 'network/checkAll',
    networkVisitQuery: 'network/page',
    networkVisitRemove: 'network/delete',
    networkVisitHasTaskName: 'network/hasTaskName',
    networkVisitUpload: 'network/upload',
    networkVisit: 'network',
    networkVisitTaskAllTaskName: 'network/task/allTaskName',
    networkVisitTaskQuery: 'network/task/page',
    networkVisitTaskRemove: 'network/task/remove',
    networkVisitTaskUser: 'network/task/user',

    // 节点管理
    nodeList: 'datanode/list',
    nodeUpdate: 'datanode/update',
    nodeSampleList: 'datanode/simplelist',

    // 分析建模-创建模型
    modelRelationCreate: 'modelRelation/create',
    modelRelationFamily: 'modelRelation/queryFamily',
    modelRelationFamilyDetail: 'modelRelation/queryFamilyDetail',
    modelRelationDetail: 'modelRelation/relations',
    modelRelationDetailExtend: 'modelRelation/extendRelations',
    modelRelationTaskAndStr: 'modelRelation/queryTask',
    modelRelationTaskAndStrItem: 'modelRelation/queryObj',
    modelRelationList: 'modelRelation/queryPage',
    modelRelationTaskList: 'modelRelation/taskList',
    modelRelationDelete: 'modelRelation/delete'
  },
  success: {
    '1': '加载数据成功',
    '101': '操作成功',
    '102': '密码修改成功，即将跳到登录页面',
    '103': '审核成功',
    '104': '已退出',
    '105': '上传成功',
    '106': '注册成功',
    '107': '上传成功，请稍后查看...'
  },
  error: {
    '-1': '加载数据失败，请检查网络！',
    // 仅针对413状态码
    '-11': '上传成功',
    '-2': '未知错误！',
    '-1009': '请再次输入密码！',
    '-1010': '请输入密码！',
    '-1011': '请再次输入新密码！',
    '-1012': '两次输入密码不一致！',
    '-1013': '新密码和旧密码相同！',
    '-1020': '请输入任务名！',
    '-1021': '请选择文件！',
    '-1022': '请输入解压密码！',
    '-1023': '描述不能超过512个字符！',
    '-1024': '6~16位大小写字母、数字和特殊字符混合',
    '-1025': '备注内容长度不能等于0，大于512',
    '-1030': '您没有选中相关数据',
    '-1031': '请上传zip格式文件!',
    '-1041': '请输入IP地址',
    '-1042': 'IP地址格式有误',
    '-1043': '请输入域名',
    '-1044': '域名格式有误',
    '-1045': '请输入邮箱账号',
    '-1046': '邮箱账号格式有误',
    '-1047': '请输入HASH',
    '-1048': 'HASH格式有误',
    '-1050': '任务已经存在',
    '-1051': '上传文件不得大于500M',
    '-1052': '没有相关邮件',
    '-1053': '没有相关邮箱',
    '-1054': '没有相关报告',
    '-1055': '请输入用户名!',
    '-1056': '请输入正确的电话号码',
    '-1057': '请选择用户角色',
    '-1058': '请选择所属机构',
    '-1059': '没有相关样本',
    '-1060': '4~20位的字母、数字组成且以字母开头',
    '-1061': '研判建议不能为空!',
    '-1062': '请选择方向!',
    '-1063': '请选择组织!',
    '-1064': '请选择文件!',
    '-1065': '审核码址不存在!'
  }
};

export default CONFIG;
