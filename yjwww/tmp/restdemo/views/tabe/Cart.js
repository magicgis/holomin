/**
 * Cart，购物车详细
 */
appctrl.controller('CartCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,CartService) {
    $log.debug("enter Cart ctrl");
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
        $log.debug("Cart ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Cart ctrl afterEnter");
        if (ctrlReinitMap.get('CartCtrl')) {
            ctrlReinitMap.remove('CartCtrl');
            $log.debug("Cart ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Cart ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Cart ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Cart ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Cart);
        }else{
            $scope.obj=CartService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Cart ctrl get id="+id);
        if(isblank0(id)) {
            CartService.newget().then(function (data) {
                $log.debug("Cart ctrl newget then");
                $scope.obj=data;
            });
        }else{
            CartService.get(id).then(function (data) {
                $log.debug("Cart ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Cart ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            CartService.create($scope.obj).then(function (data) {
                $log.debug("Cart ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Cart/"+$scope.obj.id);
            });
        }else{
            CartService.update($scope.obj).then(function (data) {
                $log.debug("Cart ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Cart/"+$scope.obj.id);
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
    ctrlReinitMap.remove('CartCtrl');
});
