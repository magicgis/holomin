/**
 * DoctorProduct，医生的药架详细
 */
appctrl.controller('DoctorProductCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,DoctorProductService) {
    $log.debug("enter DoctorProduct ctrl");
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
        $log.debug("DoctorProduct ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("DoctorProduct ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorProductCtrl')) {
            ctrlReinitMap.remove('DoctorProductCtrl');
            $log.debug("DoctorProduct ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("DoctorProduct ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("DoctorProduct ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("DoctorProduct ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_DoctorProduct);
        }else{
            $scope.obj=DoctorProductService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("DoctorProduct ctrl get id="+id);
        if(isblank0(id)) {
            DoctorProductService.newget().then(function (data) {
                $log.debug("DoctorProduct ctrl newget then");
                $scope.obj=data;
            });
        }else{
            DoctorProductService.get(id).then(function (data) {
                $log.debug("DoctorProduct ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("DoctorProduct ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            DoctorProductService.create($scope.obj).then(function (data) {
                $log.debug("DoctorProduct ctrl save then");
                $scope.obj=data;
                $location.path("/tab/DoctorProduct/"+$scope.obj.id);
            });
        }else{
            DoctorProductService.update($scope.obj).then(function (data) {
                $log.debug("DoctorProduct ctrl update then");
                $scope.obj=data;
                $location.path("/tab/DoctorProduct/"+$scope.obj.id);
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
    ctrlReinitMap.remove('DoctorProductCtrl');
});
