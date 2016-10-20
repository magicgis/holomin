/**
 * CmschannelList，内容频道列表
 */
appctrl.controller('CmschannelListCtrl', function($scope, $rootScope,$stateParams, $location, $log, Storage, ENV, CommonService, CmschannelService,$ionicHistory) {
  $log.debug("enter CmschannelList ctrl");
  /**页码*/
  $scope.page=_.clone(_Page);
  /**页面显示的列表*/
  $scope.list=[];

  $scope.dianji=0;
  $scope.fanhuiyn=0;
  var act=$stateParams.act;
  //参数
  var parentid=$stateParams.parentid;
  if(parentid=="zydj"){
    $scope.dianji=1;
  }
  if(parentid=="zyzx"){
    $scope.fanhuiyn=1;
  }
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("CmschannelList ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("CmschannelList ctrl afterEnter");
    if (ctrlReinitMap.get('CmschannelListCtrl')) {
      ctrlReinitMap.remove('CmschannelListCtrl');
      $log.debug("CmschannelList ctrl afterEnter init");
      $scope.init();
    }
  });

  /**
   * 初始化
   */
  $scope.init=function(){
    if(act=='0'){
      $log.debug("CmschannelList ctrl init ");
      $scope.page.where="statusValidOrNot=1 and ckey= '"+parentid+"'";
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first3();
    }else{
      $scope.page.where="statusValidOrNot=1 and parentid= "+parentid;
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first();
    }

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
  $scope.first3=function(){
    CmschannelService.first(null,$scope.page).then(function (data) {
      $log.debug("CmschannelList ctrl query then");
      if(data == "" || data == undefined || data == null){
        CommonService.alertm("暂无数据！");
        return;
      }
      $scope.page.where="statusValidOrNot=1 and parentid= "+data[0].id;
      $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.list=[];
      $scope.first();

      $scope.$broadcast('scroll.refreshComplete');
    });

  };
  /**
   * 第一次查询
   */
  $scope.first=function(){
    CmschannelService.first(null,$scope.page).then(function (data) {
      $log.debug("CmschannelList ctrl query then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });

  };
  /**
   * 查树
   */
  $scope.tree=function(){
    CmschannelService.tree($scope.page).then(function (data) {
      $log.debug("CmschannelList ctrl tree then");
      $scope.addList(data);
      $scope.$broadcast('scroll.refreshComplete');
    });

  };

  /**
   * 下拉加载更多查询
   */
  $scope.more=function(){
    $log.debug("CmschannelList ctrl more=========");
    if(!$scope.page.hasNextPage){
      return;
    }
    CmschannelService.more($scope.page).then(function (data) {
      $log.debug("CmschannelList ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  /**
   * 返回
   */
  $scope.fanhui=function(){
    $ionicHistory.goBack();
  };

  $scope.init();
  ctrlReinitMap.remove('CmschannelListCtrl');
});
