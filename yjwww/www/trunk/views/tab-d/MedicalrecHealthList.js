/**
 * MedicalrecHealthList，病历之健康指标列表
 */
appctrl.controller('MedicalrecHealthListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,MedicalrecHealthService,zspecService,CommonService,$ionicScrollDelegate) {
    $log.debug("enter MedicalrecHealthList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    var medicalrecId=0;
    if(Storage.get(LOGINED_USER)!=null){
      medicalrecId=Storage.get(LOGINED_USER).id;
    }
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MedicalrecHealthList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecHealthList ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecHealthListCtrl')) {
            ctrlReinitMap.remove('MedicalrecHealthListCtrl');
            $log.debug("MedicalrecHealthList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
      $log.debug("MedicalrecHealthList ctrl init ");
	    $scope.page.where="statusValidOrNot=1 and medicalrecId="+medicalrecId;
      $scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.list=[];
        $scope.first();
    };
    /**
     * 上拉刷新
     */
    $scope.doRefresh=function(){
        $scope.init();
    };
    /**
     * 给list上加数据
     * @param data
     */
    $scope.addList=function(data){
        angular.forEach(data, function (item) {
            $scope.list.push(item);
        });
        if(data && data.length < $scope.page.pageSize){
            $scope.page.hasNextPage=false;
        }else{
            $scope.page.hasNextPage=true;
        }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        MedicalrecHealthService.first(null,$scope.page).then(function (data) {
            $log.debug("MedicalrecHealthList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("MedicalrecHealthList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        MedicalrecHealthService.more($scope.page).then(function (data) {
            $log.debug("MedicalrecHealthList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 删除健康指标，实际上把健康指标的有效状态改成无效
   * @param obj
   */
    $scope.deleteHealth=function(obj){
      CommonService.confirm("是否确认将该健康指标移除?").then(function(res) {if(res) {
        $log.debug("MedicalrecHealthList ctrl delete ");
        obj.statusValidOrNot=0;
        MedicalrecHealthService.update(obj).then(function (data) {
          $log.debug("MedicalrecHealthList ctrl delete");
          $location.path("/tab/MedicalrecHealthList");
          $ionicScrollDelegate.scrollTop();
          $scope.init();
        });
      } else {
      }});
    }

    $scope.init();
    ctrlReinitMap.remove('MedicalrecHealthListCtrl');
});
