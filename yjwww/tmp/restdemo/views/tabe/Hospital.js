/**
 * Hospital，医院详细
 */
appctrl.controller('HospitalCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,HospitalService) {
    $log.debug("enter Hospital ctrl");
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
        $log.debug("Hospital ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Hospital ctrl afterEnter");
        if (ctrlReinitMap.get('HospitalCtrl')) {
            ctrlReinitMap.remove('HospitalCtrl');
            $log.debug("Hospital ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Hospital ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Hospital ctrl init id="+id);
		$scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Hospital ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Hospital);
        }else{
            $scope.obj=HospitalService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Hospital ctrl get id="+id);
        if(isblank0(id)) {
            HospitalService.newget().then(function (data) {
                $log.debug("Hospital ctrl newget then");
                $scope.obj=data;
            });
        }else{
            HospitalService.get(id).then(function (data) {
                $log.debug("Hospital ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Hospital ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            HospitalService.create($scope.obj).then(function (data) {
                $log.debug("Hospital ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Hospital/"+$scope.obj.id);
            });
        }else{
            HospitalService.update($scope.obj).then(function (data) {
                $log.debug("Hospital ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Hospital/"+$scope.obj.id);
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
    ctrlReinitMap.remove('HospitalCtrl');
});
