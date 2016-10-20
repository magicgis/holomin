/**
 * OrderrFinished，订单详细
 */
appctrl.controller('OrderrFinishedCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, OrderrFinishedService) {
    $log.debug("enter OrderrFinished ctrl");
	/**参数*/
    var id = $stateParams.id;
    /**页面对象*/
    $scope.vm={};
	/**对象*/
	$scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("OrderrFinished ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("OrderrFinished ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrFinishedCtrl')) {
            ctrlReinitMap.remove('OrderrFinishedCtrl');
            $log.debug("OrderrFinished ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("OrderrFinished ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrFinished ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("OrderrFinished ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_OrderrFinished);
        }else{
            $scope.obj=OrderrFinishedService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		OrderrFinishedService.get(id).then(function (data) {
			$log.debug("OrderrFinished ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('OrderrFinishedCtrl');
});
