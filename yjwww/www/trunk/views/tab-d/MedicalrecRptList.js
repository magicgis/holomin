/**
 * MedicalrecRptList，病历之检查报告列表
 */
appctrl.controller('MedicalrecRptListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,MedicalrecRptService,zspecService,CommonService,$ionicScrollDelegate) {
    $log.debug("enter MedicalrecRptList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    var medicalrecId=0;
    if(Storage.get(LOGINED_USER)!=null){
      medicalrecId=Storage.get(LOGINED_USER).id;
    };
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MedicalrecRptList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecRptList ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecRptListCtrl')) {
            ctrlReinitMap.remove('MedicalrecRptListCtrl');
            $log.debug("MedicalrecRptList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecRptList ctrl init ");
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
        MedicalrecRptService.first(null,$scope.page).then(function (data) {
            $log.debug("MedicalrecRptList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("MedicalrecRptList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        MedicalrecRptService.more($scope.page).then(function (data) {
            $log.debug("MedicalrecRptList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 删除病历报告
   * @param id
   */
    $scope.deleteRpt=function(obj){
      CommonService.confirm("是否确认将该报告移除?").then(function(res) {if(res) {
        $log.debug("MedicalrecRptList ctrl delete ");
        obj.statusValidOrNot=0;
        MedicalrecRptService.update(obj).then(function (data) {
          $log.debug("MedicalrecRptList ctrl delete");
          $location.path("/tab/MedicalrecRptList");
          $ionicScrollDelegate.scrollTop();
          $scope.init();
        });
      } else {
      }});
    }
    $scope.init();
    ctrlReinitMap.remove('MedicalrecRptListCtrl');
});
