/**
 * Product，商品详细
 */
appctrl.controller('ProductCtrl', function($scope, $rootScope, $log, $timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,
                                           $stateParams,$ionicHistory,
                                           ENV,CommonService,ProductService,DoctorProductService) {
    $log.debug("enter Product ctrl");
    /**参数*/
    var id = $stateParams.id;
    $scope.act = $stateParams.act;
    /**页面对象*/
    $scope.vm={};
    $scope.vm.isedit=false;
    if(id==='0')
        $scope.vm.isedit=true;
    /**对象*/
    $scope.obj={};
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("Product ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("Product ctrl afterEnter");
        if (ctrlReinitMap.get('ProductCtrl')) {
            ctrlReinitMap.remove('ProductCtrl');
            $log.debug("Product ctrl afterEnter init");
            $scope.init();
        }
    });
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("Product ctrl init id="+id);
        $scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("Product ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_Product);
        }else{
            $scope.obj=ProductService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("Product ctrl get id="+id);
        if(isblank0(id)) {
            ProductService.newget().then(function (data) {
                $log.debug("Product ctrl newget then");
                $scope.obj=data;
            });
        }else{
            ProductService.get(id).then(function (data) {
                $log.debug("Product ctrl get then");
                $scope.obj=data;
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("Product ctrl get id="+id);
        $log.debug($scope.obj)
        if(isblank0(id)) {
            ProductService.create($scope.obj).then(function (data) {
                $log.debug("Product ctrl save then");
                $scope.obj=data;
                $location.path("/tab/Product/"+$scope.obj.id);
            });
        }else{
            ProductService.update($scope.obj).then(function (data) {
                $log.debug("Product ctrl update then");
                $scope.obj=data;
                $location.path("/tab/Product/"+$scope.obj.id);
            });
        }
    };
    /**
     * 加入药架
     * @param product 药对象
     */
    $scope.addToDoctorProduct=function(product){
        var doctorProduct={productId: product.id}
        DoctorProductService.create(doctorProduct,null).then(function (data) {
            CommonService.alertm('加入成功').then(function (res) {});
        });
        $ionicHistory.goBack();
        //$scope.rx('#/tab/DoctorProductList/0');
    };

    /**
     * 已加入药架
     */

    $scope.yijiaru=function(){
        CommonService.alertm('药品已在您的药架');
        $ionicHistory.goBack();

    }
    $scope.init();
    ctrlReinitMap.remove('ProductCtrl');
});
