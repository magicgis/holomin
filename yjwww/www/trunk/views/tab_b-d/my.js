appctrl.controller('myCtrl', function($scope, $state, $rootScope, $timeout,
                                      $cordovaClipboard, $cordovaEmailComposer, $cordovaGoogleAnalytics,$ionicPopover,
                                      $ionicHistory, $ionicLoading, $ionicPopup, $log, ENV
  ,CommonService,Storage,WxService,DoctorService,$location

) {
  console.log("enter my ctrl");
  $scope.watersite={};

  $scope.$on('$ionicView.beforeEnter', function() {
    console.log("my ctrl beforeEnter");
  });

  $scope.$on('$ionicView.afterEnter', function() {
    console.log("my ctrl afterEnter");
    if (ctrlReinitMap.get('myCtrl')) {
      ctrlReinitMap.remove('myCtrl');
      $scope.init();
    }
    $scope.user=Storage.get(LOGINED_USER_B);
  });
  $scope.lnglat=[0,0];
  $scope.pageinit=function(){
    console.log("my pageinit ");
  };
  /**
   * 初始化
   */
  $scope.init=function(){
    console.log("my init ");
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()&&YIJIAN) {
      window.location.href=outGetOpenidUrl_b;
      return;
    }
    if(wxNoOpenid()&&YJTCM){
      window.location.href=outGetOpenidUrl_b_yjtcm;
      return;
    }
    $scope.user=Storage.get(LOGINED_USER_B);
    if ($scope.user == null) {
      $scope.$broadcast('scroll.refreshComplete');
      return;
    }
    if($scope.user!=null){
      DoctorService.get($scope.user.id).then(function (data) {
        $log.debug("my ctrl get then");
        $scope.obj=data;
        $log.debug(data);
      });
    }
  };
  /**
   * 上拉刷新
   */
  $scope.doRefresh=function(){
    $scope.init();
  };
  /**
   * 收到登录成功通知
   */
  $scope.$on('event.logined', function() {
    console.log("my ctrl event.logined");
    $scope.init();
  });

  /**
   * 打开登录窗口
   */
  $scope.login=function(){
    $rootScope.$broadcast('event.NeedLoginException','my');
  };
  /**
   * 退出
   */
  $scope.logout=function(){
    CommonService.confirm('确认退出？').then(function(res) {if(res) {
      $scope.user=null;
      Storage.remove(LOGINED_USER_B);
      if(window.localStorage.length!=0){
        var clientInfo=Storage.get(CLIENT_INFO);
        clientInfo.token=null;
        Storage.set(CLIENT_INFO,clientInfo);
      }
      $ionicHistory.goBack();

    } else {}});
  };
  /**
   * 清除缓存
   */
  $scope.clear=function(){
    if(window.localStorage.length!=0){
      var clientInfo=Storage.get(CLIENT_INFO);
      var user=Storage.get(LOGINED_USER_B);
    }
    Storage.clear();
    Storage.set(CLIENT_INFO,clientInfo);
    Storage.set(LOGINED_USER_B,user);
    CommonService.alertm('清除缓存');
    $scope.init();
  };
  /**
   * 找回密码
   */
  $scope.editpassword=function(){
    CommonService.alertm('请与客服联系，我们确认后给你重新分配初始密码');
  };
  $scope.init();

});
