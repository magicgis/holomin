/**
 * DoctorTypeList，医生科室列表
 */
appctrl.controller('doctorTypeListCtrl', function($scope, $rootScope, $location, $log, Storage, ENV, CommonService, ProductchannelService,DoctorService) {
    $log.debug("enter doctorTypeList ctrl");
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("DoctorTypeList ctrl beforeEnter");
    });

    /**
     * 初始化
     */
    $scope.init=function(){
	    $scope.page.where="family = ' '";
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
      if(YIJIAN){
        $scope.list.reverse();
      }
    };
    /**
     * 第一次查询
     */
    $scope.first=function(){
      ProductchannelService.first(null,$scope.page).then(function (data) {
            $log.debug("DoctorTypeList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("DoctorTypeList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
      ProductchannelService.more($scope.page).then(function (data) {
            $log.debug("DoctorTypeList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 搜索
   */
  $scope.doSearchDoctorType=function(searchDoctorType){
    if(isblank(searchDoctorType)){
      $scope.init();
    }else{
      if(YIJIAN){
        $scope.page.where="itypeAir=0 and statusAir=1 and name like '%"+searchDoctorType+"%' ";
      }else{
        $scope.page.where="name like '%"+searchDoctorType+"%' ";
      }
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first2(searchDoctorType);
    }

  };
  /**
   * 根据搜索的医生姓名进行查询
   */
  $scope.first2=function(searchDoctorType){
    DoctorService.first(null,$scope.page).then(function (data) {
      $log.debug("DoctorList ctrl query then");
      if(data == "" || data == undefined || data == null){
        CommonService.alertm("查无此医生！").then(function(){
          $scope.init();
        });

        return;
      }else{//在科室分类里查找到医生，就跳转到医生列表
        if(YIJIAN){
          $location.path("/tab/RA_DoctorList/3/"+searchDoctorType);
        }else{
          $location.path("/tab/RA_DoctorList/2/"+searchDoctorType);
        }
        /*
         $scope.addList(data);
         $scope.$broadcast('scroll.refreshComplete');*/
      }
    });
  };
    $scope.init();
    ctrlReinitMap.remove('DoctorTypeListCtrl');
});
