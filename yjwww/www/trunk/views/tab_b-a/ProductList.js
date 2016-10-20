/**
 * ProductList，商品列表
 */
appctrl.controller('ProductListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                           ENV,ProductService,CommonService) {
    $log.debug("enter ProductList ctrl");
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
        if (ctrlReinitMap.get('ProductListCtrl')) {
            ctrlReinitMap.remove('ProductListCtrl');
            $log.debug("ProductList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("ProductList ctrl init ");
        $scope.page.where=Storage.get("ProductList"+"QueryWhere");
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
        CommonService.alertm('药品正在上架中...');
      }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        ProductService.first(null,$scope.page).then(function (data) {
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

    $scope.init();
    ctrlReinitMap.remove('ProductListCtrl');
});
