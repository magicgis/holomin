/**
 * Product，商品详细
 */
appctrl.controller('ProductCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductService) {
    $log.debug("enter Product ctrl");
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
        $log.debug("Product ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Product ctrl afterEnter");
        if (ctrlReinitMap.get('ProductCtrl')) {
            ctrlReinitMap.remove('ProductCtrl');
            $log.debug("Product ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Product ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Product ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Product ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Product);
        }else{
            $scope.obj=ProductService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		ProductService.get(id).then(function (data) {
			$log.debug("Product ctrl get then");
			$scope.obj=data;
		});
    };
    $scope.init();
    ctrlReinitMap.remove('ProductCtrl');
});
