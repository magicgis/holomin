/**
 * User，账号信息修改详细
 */
appctrl.controller('UserCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,Storage,
                                             ENV,CommonService,UserService) {
    $log.debug("enter User ctrl");
	/**参数*/
    var id = $stateParams.id;
    $scope.user=Storage.get(LOGINED_USER_B);
    id=($scope.user)?$scope.user.id:0;
    /**页面对象*/
    $scope.vm={};
    $scope.vm.isedit=false;
    if(id==='0')
        $scope.vm.isedit=true;
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("User ctrl beforeEnter");
        $scope.user=Storage.get(LOGINED_USER_B);
        id=($scope.user)?$scope.user.id:0;
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("User ctrl afterEnter");
        if (ctrlReinitMap.get('UserCtrl')) {
            ctrlReinitMap.remove('UserCtrl');
            $log.debug("User ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("User ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("User ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_User);
        }else{
            $scope.obj=UserService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("User ctrl get id="+id);
        if(isblank0(id)) {
            UserService.newget().then(function (data) {
                $log.debug("User ctrl newget then");
                $scope.obj=data;
            });
        }else{
            UserService.get(id).then(function (data) {
                $log.debug("User ctrl get then");
                $scope.obj=data;
                $scope.obj.password="";
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("User ctrl get id="+id);
        $log.debug($scope.obj);
      if(isblank($scope.obj.password)){
        CommonService.alertm('密码输入不能为空！');
        $scope.vm.isedit=false;
        return;
      }
      if($scope.obj.password.length<6){
        $scope.vm.isedit=false;
        CommonService.alertm('密码不能少于6位！');
        return;
      }
        if(isblank0(id)) {
            UserService.create($scope.obj).then(function (data) {
                $log.debug("User ctrl save then");
                $scope.obj=data;
                $location.path("/tab/my1/"+$scope.obj.id);
            });
        }else{
            UserService.update($scope.obj).then(function (data) {
                $log.debug("User ctrl update then");
                $scope.obj=data;
                $log.debug($scope.obj.id);
                CommonService.alertm('密码修改成功，请退出后重新登录','密码修改').then(function (res) {
                  $scope.user=null;
                  Storage.remove(LOGINED_USER_B);
                  if(window.localStorage.length!=0){
                    var clientInfo=Storage.get(CLIENT_INFO);
                    clientInfo.token=null;
                    Storage.set(CLIENT_INFO,clientInfo);
                  }
                  location.replace(document.referrer);
                });
            });
        }
    };
    $scope.init();
    ctrlReinitMap.remove('UserCtrl');
});
