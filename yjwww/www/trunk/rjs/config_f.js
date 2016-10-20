/**
 * 配置文件，用在中医项目中项目名称出现在这里及index.html中的<body ng-app>标签中
 * 会员版与B版共用
 *
 */
var app=angular.module('zionic', ['ionic', 'ngCordova', 'ngResource',
  'zionic.config', 'zionic.services', 'zionic.controllers'
])
var appctrl=angular.module('zionic.controllers', []);
var appconfig=angular.module("zionic.config", []);
var appservice=angular.module('zionic.services', []);
/**
 * ENV环境变量设置
 */
appconfig.constant("ENV", {
  // "name": "production",
  "accessToken": '',
  "debug": true,
  "www": abase,
  "api": restbase,
  // "api": "http://localhost:3000/api/v1",
  "appleId": 'id981408438',
  'version':'1.0.1'
})
;

/**外面转一圈取openid的url消费者版本*/
var outGetOpenidUrl  ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3456316e6c41a32f&redirect_uri=http%3A%2F%2Fyijian.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
var outGetOpenidUrl_b="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3456316e6c41a32f&redirect_uri=http%3A%2F%2Fyijian.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex_b.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
var outGetOpenidUrl_c="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3456316e6c41a32f&redirect_uri=http%3A%2F%2Fyijian.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex_c.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
var outGetOpenidUrl_yjtcm ="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx112870cce7abcd4e&redirect_uri=http%3A%2F%2Fyjtcm.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex_e.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
var outGetOpenidUrl_b_yjtcm="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx112870cce7abcd4e&redirect_uri=http%3A%2F%2Fyjtcm.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex_f.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
var outGetOpenidUrl_c_yjtcm="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx112870cce7abcd4e&redirect_uri=http%3A%2F%2Fyjtcm.zjjnyd.com%2Fyijian%2Fpub%2Fwx%2Findex_g.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

/**
 * 默认的头
 * @type {{title: boolean, view: defaultHeader, back: boolean, logout: boolean, positison: boolean, positisontext: string}}
 */
var defaultHeader={
  title: false,
  view: this,
  back: false,
  logout:false,
  positison: true,
  positisontext:''
};
/**需要重新init的Controller的Map*/
var ctrlReinitMap=new HashMap();
/**当前的tab值:A/B/C/D*/
var pubnowtab='A';
///////////常用固定值
var wxConfig={
  appId:'', // 必填，公众号的唯一标识
  timestamp: null, // 必填，生成签名的时间戳
  noncestr: null, // 必填，生成签名的随机串
  signature:null// 必填，签名，见附录1
};
/**项目中文名称*/
var PRJCNAME="大御医";
var islogin=true;
/**默认一页数量*/
var DEFPAGESIZE=20;
/**默认地图显示级1-18*/
var DEFMAPLEVEL=15;
/**服务器返回没登录的状态*/
var RESP_STATUS_NOLOGIN = 401;

///////////////项目用到的数据库常量
/**分类的id*/
var ProductTypeClazz=99;
/**新品的id*/
var ProductTypeNew=31;
/**男人的id*/
var ProductTypeNew1=33;
/**女人的id*/
var ProductTypeNew2=35;
/**老人的id*/
var ProductTypeNew3=37;
/**小孩的id*/
var ProductTypeNew4=39;
/**中西药品的id*/
var ProductTypeNew5=3;
/**中西药品的id*/
var ProductTypeNew6=17;
/**中西药品的id*/
var ProductTypeNew7=13;
/**中西药品的id*/
var ProductTypeNew8=22;
//////////////存本地的变量名
/**List的查询where.hql就是XxxListQueryWhere，比如：ProductTypeLinkProductListQueryWhere，不再一一列举
 * ex.Storage.set("ProductTypeLinkProductList"+"QueryWhere","");
 * */


/**地图中心点 格式：[120.17189,30.264664]*/
var MAP_CENTER="mapcenter";
/**注册输入完成后的用户*/
var REG_USER="reguser";
/**登录后服务器给的用户*/
var LOGINED_USER="logineduser";
/**登录后服务器给的医生*/
var LOGINED_USER_B="logineduser_b";
/**登录后服务器给的业务员*/
var LOGINED_USER_C="logineduser_c";
/**本地购物技车*/
var LISTCART="listCart";
/**地图位置信息**/
var MAP_LOCATION = "maplocation";
/**用户收货地址 List[UserAddr]*/
var USERADDRESSLIST = "userAddressList";
/**首页地址 selectAddr对象*/
var INDEXSELECTEDADDRESS = "indexselectedaddress";
/**首页保存的坐标信息 */
var INDEXLNGLAT = "indexlnglat";
/**doctor正在看的患者member Memer对象 $scope.memberDoctorWatching*/
var MEMBER_DOCTOR_WATCHING="memberDoctorWatching";
/**开药方时的药列表 List[Product]*/
var LIST_PRODUCT   ="listProduct";
/**开药方时的药订单 NOWORDERR*/
var NOW_ORDERR_DIAG   ="nowOrderrDiagnose";
/**开药方时的贴数 NOWORDERR*/
var NOW_ORDERR_EACHNUM   ="nowOrderrEachnum";
/**开药方时，从药架选中的药*/
var ORDERRDETAIL_DOCTOR_PRODUCT_CHOOSE="orderrdetailDoctorProductChoose";
/**是否要读字段 ORDERRDETAIL_DOCTOR_PRODUCT_CHOOSE*/
var shouldReadORDERRDETAIL_DOCTOR_PRODUCT_CHOOSE=false;
/**个推*/
var GETUICID="cid";
var YIJIAN=false;
var YJTCM=true;
console.log("Config Done");



