/**
 * MemberdoctorList，会员端 私人医生
 */
appctrl.controller('MemberdoctorListCtrl', function($scope, $rootScope,$log,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,
                                           Storage,
                                           ENV,CommonService,MemberdoctorService) {
    $log.debug("enter MemberdoctorList ctrl 11");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    if(Storage.get(LOGINED_USER)!=null){
      var memberId=Storage.get(LOGINED_USER).id;
    }

    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("MemberdoctorList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("MemberdoctorList ctrl afterEnter");
        if (ctrlReinitMap.get('MemberdoctorListCtrl')) {
            ctrlReinitMap.remove('MemberdoctorListCtrl');
            $log.debug("MemberdoctorList ctrl afterEnter init");
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MemberdoctorList ctrl init ");
	    $scope.page.where="(statusDm=1 or statusDm=2) and memberId="+memberId;
        $log.debug($scope.page.where);
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
        if($scope.list.length<1){
            CommonService.alertm('您还没有添加私人医生！');
        }
        $log.debug("MemberdoctorList list  $scope.list $scope.list $scope.list");
        $log.debug( $scope.list);
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        MemberdoctorService.first(null,$scope.page).then(function (data) {
            $log.debug("MemberdoctorList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("MemberdoctorList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        MemberdoctorService.more($scope.page).then(function (data) {
            $log.debug("MemberdoctorList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

  $scope.cancelAttention=function(obj){
    CommonService.confirm("取消关注该医生？").then(function(res) {
      if(res) {
        obj.statusDm=0;
        MemberdoctorService.update(obj).then(function (data) {
          $scope.init();
        });
      }
    });
  }
  $scope.searchForName=function(searchName){;
    $scope.page.cmd="searchName="+searchName;
    $scope.page.where="(statusDm=1 or statusDm=2) and memberId="+memberId+" and dname like '%"+searchName+"%'";
    $log.debug($scope.page.where);
    $scope.page.pageNo=1;
    $scope.page.hasNextPage=false;
    $scope.list=[];
    $scope.first();
  }

    $scope.init();
    ctrlReinitMap.remove('MemberdoctorListCtrl');
});
