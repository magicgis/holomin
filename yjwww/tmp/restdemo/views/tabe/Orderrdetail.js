/**
 * Orderrdetail，订单详细详细
 */
appctrl.controller('OrderrdetailCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,OrderrdetailService) {
    $log.debug("enter Orderrdetail ctrl");
	/**参数*/
    var id = $stateParams.id;
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
        $log.debug("Orderrdetail ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Orderrdetail ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrdetailCtrl')) {
            ctrlReinitMap.remove('OrderrdetailCtrl');
            $log.debug("Orderrdetail ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Orderrdetail ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Orderrdetail ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Orderrdetail ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Orderrdetail);
        }else{
            $scope.obj=OrderrdetailService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Orderrdetail ctrl get id="+id);
        if(isblank0(id)) {
            OrderrdetailService.newget().then(function (data) {
                $log.debug("Orderrdetail ctrl newget then");
                $scope.obj=data;
            });
        }else{
            OrderrdetailService.get(id).then(function (data) {
                $log.debug("Orderrdetail ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Orderrdetail ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            OrderrdetailService.create($scope.obj).then(function (data) {
                $log.debug("Orderrdetail ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Orderrdetail/"+$scope.obj.id);
            });
        }else{
            OrderrdetailService.update($scope.obj).then(function (data) {
                $log.debug("Orderrdetail ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Orderrdetail/"+$scope.obj.id);
            });
        }
    };
    /**
     * 点击了叉叉，如果是id=0，返回上一页
     */
    $scope.clickx=function(){
        if(id==='0')
            goBack();
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrdetailCtrl');
});
