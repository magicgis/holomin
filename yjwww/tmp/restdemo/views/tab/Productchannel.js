/**
 * Productchannel，商品目录详细
 */
appctrl.controller('ProductchannelCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductchannelService) {
    $log.debug("enter Productchannel ctrl");
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
        $log.debug("Productchannel ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Productchannel ctrl afterEnter");
        if (ctrlReinitMap.get('ProductchannelCtrl')) {
            ctrlReinitMap.remove('ProductchannelCtrl');
            $log.debug("Productchannel ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Productchannel ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Productchannel ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Productchannel ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Productchannel);
        }else{
            $scope.obj=ProductchannelService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ProductchannelService.get(id).then(function (data) {
			$log.debug("Productchannel ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ProductchannelCtrl');
});
