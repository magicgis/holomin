/**
 * PrescriptProduct，药方产品详细
 */
appctrl.controller('PrescriptProductCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,$ionicHistory,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,PrescriptProductService) {
    $log.debug("enter PrescriptProduct ctrl");
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
        $log.debug("PrescriptProduct ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("PrescriptProduct ctrl afterEnter");
        if (ctrlReinitMap.get('PrescriptProductCtrl')) {
            ctrlReinitMap.remove('PrescriptProductCtrl');
            $log.debug("PrescriptProduct ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("PrescriptProduct ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("PrescriptProduct ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("PrescriptProduct ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_PrescriptProduct);
        }else{
            $scope.obj=PrescriptProductService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("PrescriptProduct ctrl get id="+id);
        if(isblank0(id)) {
            PrescriptProductService.newget().then(function (data) {
                $log.debug("PrescriptProduct ctrl newget then");
                $scope.obj=data;
            });
        }else{
            PrescriptProductService.get(id).then(function (data) {
                $log.debug("PrescriptProduct ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("PrescriptProduct ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            PrescriptProductService.create($scope.obj).then(function (data) {
                $log.debug("PrescriptProduct ctrl save then");
                $scope.obj=data;
              $ionicHistory.goBack();
            });
        }else{
            PrescriptProductService.update($scope.obj).then(function (data) {
                $log.debug("PrescriptProduct ctrl update then");
                $scope.obj=data;
              CommonService.alertm("修改成功！").then(function(){
                $ionicHistory.goBack();
              });
            /*  ctrlReinitMap.put("PrescriptProductListCtrl",1);
                $location.path("/tab/PrescriptProductList/"+$scope.obj.prescriptId);*/
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
    ctrlReinitMap.remove('PrescriptProductCtrl');
});
