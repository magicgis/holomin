/**
 * Wwwhome，手机页首页配置详细
 */
appctrl.controller('WwwhomeCtrl', function($scope, $rootScope,$location, $log,MemberdoctorService,Storage,zspecService,CommonService,WwwhomeService) {
  $log.debug("enter Wwwhome ctrl");
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=false;
  /**对象*/
  $scope.obj={};
  /**搜索关键字*/
  $scope.searchData='';
  /**页码*/
  $scope.member_id=0;
  if(Storage.get(LOGINED_USER)!=null){
    $scope.member_id=Storage.get(LOGINED_USER).id;
  }
  $scope.page=_.clone(_Page);
  $scope.page.where="member_id="+$scope.member_id;
  /**给会员发消息的医生数量 */
  $scope.msgnum=0;
  if(isblank(pubnowtab)){
    pubnowtab='A';
    Storage.set("TAB",pubnowtab);
  }
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Wwwhome ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("Wwwhome ctrl afterEnter");
    if (ctrlReinitMap.get('WwwhomeCtrl')) {
      ctrlReinitMap.remove('WwwhomeCtrl');
      $log.debug("Wwwhome ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("Wwwhome ctrl init"+$scope.member_id);
    WwwhomeService.get(1).then(function (data) {
      $scope.obj=data;
    });
    if(wxNoOpenid()) {
      window.location.href=outGetOpenidUrl;
      return;
    }
    $scope.checkver();
    $scope.havaMessage();
  };
  /**
   * 版本检查，只有安卓苹果才升级
   */
  $scope.checkver=function(){
    CommonService.alertm("亲 你的版本过低，请先升级").then(function(res) {
      window.location.href = 'http://yijian.zjjnyd.com/yijianwwwupdatea/yijian.apk';
    });
    _ClientInfo.cli1=1
 /*   if(!_ClientInfo || !_ClientInfo.cli)
      return;*/
    //只有安卓苹果才升级
    if(_ClientInfo.cli!=0 && _ClientInfo.cli!=1)
      return;
    _ClientInfo.cli1=1;
    //检查版本号
    zspecService.verControl(_ClientInfo.ver,_ClientInfo.cli).then(function(data){
      if(data.msg=="FORCE"){
        if(_ClientInfo.cli==1){
          CommonService.alertm("亲 你的版本过低，请先升级").then(function(res) {
            window.location.href = 'http://yijian.zjjnyd.com/yijianwwwupdatea/yijian.apk';
          });
        }else if(_ClientInfo.cli==2){
          CommonService.alertm("亲 你的版本过低，请先升级").then(function(res) {
            window.location.href = 'https://itunes.apple.com/us/app/yi-yao-yi-jian-tong/id1102726482';
          });
        }
      }else if(data.msg=="ADVICE"){
        if(_ClientInfo.cli==1){
          CommonService.confirm("亲 你的版本过低，请先升级").then(function(res) {
            if(res) {
              window.location.href = 'http://yijian.zjjnyd.com/yijianwwwupdatea/yijian.apk';
            }
          });
        }else if(_ClientInfo.cli==2){
          CommonService.confirm("亲 你的版本过低，请先升级").then(function(res) {
            if(res) {
              window.location.href = 'https://itunes.apple.com/us/app/yi-yao-yi-jian-tong/id1102726482';
            }
          });
        }
      }else{
        return;
      }
    });
  }
  /**
   * 是否有新消息，打点
   */
  $scope.havaMessage=function(){
    if(Storage.get(LOGINED_USER)==null){
      $log.debug("null");
      return;
    }
    MemberdoctorService.first(null,$scope.page).then(function (data) {
      $log.debug("MemberdoctorList ctrl query then"+data);
      angular.forEach(data, function (item) {
        if(item.mmsgnotread>0){
          $scope.msgnum++;
        }
      });
    });
  }
  /**
   * 搜索
   */
  $scope.search=function(){
    $log.debug("kw ="+$scope.searchData);
    if(isblank($scope.searchData))
      return;
    $scope.rx('#/tab/ProductListSearch/'+$scope.searchData);
  };

  $scope.init();
  ctrlReinitMap.remove('WwwhomeCtrl');
});
