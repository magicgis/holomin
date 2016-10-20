/**
 * MedicalrecPageList，病历之病史页面列表
 */
appctrl.controller('MedicalrecPageListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,MedicalrecPageService,zspecService,CommonService,$ionicScrollDelegate) {
    $log.debug("enter MedicalrecPageList ctrl");
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
        $log.debug("MedicalrecPageList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MedicalrecPageList ctrl afterEnter");
        if (ctrlReinitMap.get('MedicalrecPageListCtrl')) {
            ctrlReinitMap.remove('MedicalrecPageListCtrl');
            $log.debug("MedicalrecPageList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MedicalrecPageList ctrl init ");
	    $scope.page.where=Storage.get("MedicalrecPageList"+"QueryWhere");
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
        MedicalrecPageService.first(null,$scope.page).then(function (data) {
            $log.debug("MedicalrecPageList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("MedicalrecPageList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        MedicalrecPageService.more($scope.page).then(function (data) {
            $log.debug("MedicalrecPageList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    /**
     * 删除病历 ,实际上把病历的有效状态改成无效
     */
    $scope.deletePage=function(obj){
      CommonService.confirm("是否确认将该病历移除?").then(function(res) {if(res) {
        $log.debug("MedicalrecPageList ctrl delete ");
        obj.statusValidOrNot=0;
        MedicalrecPageService.update(obj).then(function (data) {
          $log.debug("MedicalrecPageList ctrl delete");
          $location.path("/tab/MedicalrecPageList");
          $ionicScrollDelegate.scrollTop();
          $scope.init();
        });
      } else {
      }});
    };
    $scope.gotoMedicalPage=function(id){{
      $location.path("/tab/MedicalrecPage/"+id);
    }};


  $scope.init();
    ctrlReinitMap.remove('MedicalrecPageListCtrl');
});
