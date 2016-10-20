/**
 * ProductList，商品列表
 */
appctrl.controller('ProductListSearchCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,$stateParams,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,ProductService,CommonService) {
    $log.debug("enter ProductList ctrl");
    /**参数keyword*/
    $scope.kw = $stateParams.kw;
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("ProductList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("ProductList ctrl afterEnter");
        if (ctrlReinitMap.get('ProductListSearchCtrl')) {
            ctrlReinitMap.remove('ProductListSearchCtrl');
            $log.debug("ProductList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
      if(YIJIAN){
        $log.debug("ProductList ctrl init ");
        $scope.page.where="title like '%"+$scope.kw+"%'";
        $scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.list=[];
        $scope.first();
      }else{
        if(isblank($scope.kw)){
          $scope.page.where="";
        }else{
          $scope.page.where="title like '%"+$scope.kw+"%'";
        }
        $scope.page.pageNo=1;
        $scope.page.hasNextPage=false;
        $scope.list=[];
        $scope.first();
        $scope.kw="";
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
    $scope.first=function(){
        ProductService.first(null,$scope.page).then(function (data) {
            if(data.length==0){
              CommonService.alertm('暂无该产品信息');
            }
            $log.debug("ProductList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("ProductList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        ProductService.more($scope.page).then(function (data) {
            $log.debug("ProductList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
  /**
   * 搜索
   */
  $scope.search=function(){
    $log.debug("kw ="+$scope.searchData);
    if(isblank($scope.searchData)){
      $scope.init();
    }else{
      $scope.page.where="commonname like '%"+$scope.searchData+"%' ";
    /*  if(act==0){
        $scope.page.where="commonname like '%"+$scope.searchData+"%' and statusMaterial=0";
      }else{
        $scope.page.where="commonname like '%"+$scope.searchData+"%' and statusMaterial=1";
      }*/

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
    ProductService.first(null,$scope.page).then(function (data) {
      $log.debug("DoctorList ctrl query then");
      if(data == "" || data == undefined || data == null){
        CommonService.alertm("查无此产品！");
        return;
      }else{
        $scope.addList(data);
        $scope.$broadcast('scroll.refreshComplete');
      }
    });
  };


  $scope.init();
    ctrlReinitMap.remove('ProductListSearchCtrl');
});
