/**
 * Cmscontent，内容详细
 */
appctrl.controller('CmscontentCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, CmscontentService,$stateParams,$ionicHistory) {
    $log.debug("enter Cmscontent ctrl");
  $scope.page=_.clone(_Page);
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
        $log.debug("Cmscontent ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Cmscontent ctrl afterEnter");
        if (ctrlReinitMap.get('CmscontentCtrl')) {
            ctrlReinitMap.remove('CmscontentCtrl');
            $log.debug("Cmscontent ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("Cmscontent ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Cmscontent ctrl init id="+id);
      $scope.page.where="statusApplyPassRefuse=1 and cmschannelId="+id;
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
		$scope.first();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Cmscontent ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Cmscontent);
        }else{
            $scope.obj=CmscontentService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
		CmscontentService.get(id).then(function (data) {
			$log.debug("Cmscontent ctrl get then");
			$scope.obj=data;
		});
    };
  /**
   * 第一次查询
   */
  $scope.first=function(){
    CmscontentService.first(null,$scope.page).then(function (data) {
      $log.debug("Cmscontent ctrl query then");
      $scope.obj=data[0];
      $scope.$broadcast('scroll.refreshComplete');
    });

  };
  /**
   * 返回
   */
  $scope.fanhui=function(){
    $ionicHistory.goBack();
  };
    $scope.init();
    ctrlReinitMap.remove('CmscontentCtrl');
});
