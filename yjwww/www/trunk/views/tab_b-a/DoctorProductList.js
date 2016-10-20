/**
 * DoctorProductList，医生的药架列表
 * @param act 0:从我的过来，看看，1;从开药方过来，要求返回药id的
 */
appctrl.controller('DoctorProductListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,$stateParams,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,$ionicHistory,
                                           ENV,DoctorProductService,zspecService,CommonService,$ionicPopup) {
    $log.debug("enter DoctorProductList ctrl");
    /**参数*/
    $scope.act = $stateParams.act;
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("DoctorProductList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("DoctorProductList ctrl afterEnter");
        if (ctrlReinitMap.get('DoctorProductListCtrl')) {
            ctrlReinitMap.remove('DoctorProductListCtrl');
            $log.debug("DoctorProductList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("DoctorProductList ctrl init ");
	    $scope.page.where=Storage.get("DoctorProductList"+"QueryWhere");
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
        //CommonService.alertm('您的药架还没有药品，请先添加药品！');
          $scope.showConfirm();
      }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        DoctorProductService.first(null,$scope.page).then(function (data) {
            $log.debug("DoctorProductList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("DoctorProductList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        DoctorProductService.more($scope.page).then(function (data) {
            $log.debug("DoctorProductList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    /**
     * 选择这样产品
     * @param doctorProduct
     */
    $scope.chooseThis=function(doctorProduct){
        $scope.cartAdd(doctorProduct.productIdProductObj);
        $ionicHistory.goBack();

    };
    /**
     * 删除yaojian
     * @param id
     */
    $scope.delDoctorProduct=function(id){
        CommonService.confirm('确认删除？').then(function(res) {if(res) {
            zspecService.delDoctorProduct(id).then(function (data) {
                $log.debug("delDoctorProduct then");
                $scope.init();
            });

        } else {}});

    };
  //点进去去看产品  如果是在开药里则不能点
  $scope.gotoProduct= function (pid) {
    if($scope.act==1){
      return;
    }else{
      $scope.rx('#/tab/Product/0/'+pid);
    }
  }
//  confirm 对话框
    $scope.showConfirm = function() {
        CommonService.confirm('您的药架还没有药品请先添加药品!').then(function(res) {
            if (res&&YIJIAN) {
                $scope.rx('#/tab/ProductchannelList');
            }else if(res&&YJTCM){
              $scope.rx('#/tab/ProductList');
            } else {

            }
        });
    };
    $scope.init();
    ctrlReinitMap.remove('DoctorProductListCtrl');
});
