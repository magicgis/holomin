/**
 * MemberdoctorList，医患关系列表
 */
appctrl.controller('MemberdoctorListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,MemberdoctorService,CommonService) {
    $log.debug("enter MemberdoctorList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
  $scope.searchData='';
    /**页面显示的列表*/
    $scope.list=[];
  if(Storage.get(LOGINED_USER_B)!=null){
    var doctorId=Storage.get(LOGINED_USER_B).id;
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
            $scope.init();
        }
    });
  /**
   * 搜索
   */
  $scope.search=function(searchData){
    if(isblank(searchData)){
      $scope.init();
    }else{
      $scope.page.where="(statusDm=1 or statusDm=2) and doctorId="+doctorId +"and mname like '%"+searchData+"%' ";
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first2();
    }
  };

  /**
   * 根据搜索的医生姓名进行查询
   */
  $scope.first2=function(){
    MemberdoctorService.first(null,$scope.page).then(function (data) {
      $log.debug("DoctorList ctrl query then");
      if(data == "" || data == undefined || data == null){
        CommonService.alertm("查无此患者！");
        return;
      }else{
        $scope.addList(data);
        $scope.$broadcast('scroll.refreshComplete');
      }
    });
  };
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("MemberdoctorList ctrl init ");
	    $scope.page.where="(statusDm=1 or statusDm=2) and doctorId="+doctorId
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
          CommonService.alertm('您列表中找不到患者！');
        }
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

    /**
     * 去聊天列表页
     */
    $scope.goUrlDmmsgList=function(memberdoctor){
        //我正在看的患者，这个在tab_b中定义的全局scope对象
        Storage.set(MEMBER_DOCTOR_WATCHING,memberdoctor.memberIdMemberObj);
        console.log($scope.memberMyWatching);
        $scope.rx('#/tab/DmmsgList/1/'+memberdoctor.memberId+'/'+memberdoctor.doctorId);
    };
    $scope.searchForName =function(searchName){
      if(isblank(searchName)){
        $scope.init();
        return;
      }
      $scope.page.cmd="searchName="+searchName;
      $scope.page.where="(statusDm=1 or statusDm=2) and doctorId="+doctorId +"and mname like '%"+searchName+"%'";
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first();
    }

    $scope.init();
    ctrlReinitMap.remove('MemberdoctorListCtrl');
});
