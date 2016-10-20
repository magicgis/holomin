/**
 * UserAddr，用户的收货地址详细
 */
appctrl.controller('UserAddrCtrl', function($scope, $rootScope, $log, $timeout,
                                             $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                             $location, $state,
                                             $cordovaNetwork, $cordovaGoogleAnalytics,
                                             $stateParams,
                                             ENV,CommonService,UserAddrService,Storage,$ionicHistory) {
    $log.debug("enter UserAddr ctrl");
	/**参数*/
    var id = $stateParams.id;
    var orderrId= $stateParams.orderrId;
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
        $log.debug("UserAddr ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("UserAddr ctrl afterEnter");
        if (ctrlReinitMap.get('UserAddrCtrl')) {
            ctrlReinitMap.remove('UserAddrCtrl');
            $log.debug("UserAddr ctrl afterEnter init");
            $scope.init();
        }
	});
    /**
     * 结束后
     */
	$scope.$on('$destroy', function() {
		$log.debug("UserAddr ctrl destroy");
	});
    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("UserAddr ctrl init id="+id);
      $scope.pcc = areaTree;
		  $scope.get();
    };
    /**
     * 获取本地对象
     */
    $scope.getlocal=function(){
        $log.debug("UserAddr ctrl getlocal id="+id);
        if(isblank0(id)){
            $scope.obj= _.clone(_UserAddr);
        }else{
            $scope.obj=UserAddrService.getlocal(id);
        }
        $log.debug($scope.obj);
    };
    /**
     * 获取网络对象
     */
    $scope.get=function(){
        $log.debug("UserAddr ctrl get id="+id);
        if(isblank0(id)) {
            UserAddrService.newget().then(function (data) {
                $log.debug("UserAddr ctrl newget then");
                $scope.obj=data;
            });
        }else{
            UserAddrService.get(id).then(function (data) {
                $log.debug("UserAddr ctrl get then");
                $scope.obj=data;
                $scope.vm.sex=$scope.obj.sexMap[$scope.obj.sex];
            });
        }
    };
    /**
     * 保存
     */
    $scope.save=function(){
        $log.debug("UserAddr ctrl get id="+id);
        if(!isblank($scope.vm.county)){
          $scope.obj.areaid=$scope.vm.county.id;
        };
        if(isblank($scope.obj.manname)||isblank($scope.obj.mobile)||isblank($scope.obj.address)||isblank0($scope.obj.areaid)){
          CommonService.alertm('请填写正确的地址信息');
          $scope.vm.isedit=true;
          return;
        };
        if(!$scope.checkPhoneNum($scope.obj.mobile)){
          CommonService.alertm('请输入合法的手机格式');
          $scope.vm.isedit=true;
          return;
        };
        if(isblank0(id)) {
            if(Storage.get(LOGINED_USER)!=null){
              $scope.obj.memberId=Storage.get(LOGINED_USER).id;
            };
            UserAddrService.create($scope.obj).then(function (data) {
                $log.debug("UserAddr ctrl save then");
                $scope.obj=data;
                $location.path("/tab/UserAddrList/"+orderrId);
            });
        }else{
            UserAddrService.update($scope.obj).then(function (data) {
                $log.debug("UserAddr ctrl update then");
                $scope.obj=data;
                $location.path("/tab/UserAddrList/"+orderrId);
            });
        }
        $scope.vm.sex=$scope.obj.sexMap[$scope.obj.sex];
    };
  /**
   * 确认为收货地址
   */
      $scope.setAdd=function(){
        Storage.set("MemberUserAddrId",$scope.obj.id);
        Storage.set("MemberUserAddr",$scope.obj.areaidString+$scope.obj.address);
        $location.path("/tab/RC_receiveWay/"+orderrId);
      }
  /**
   * 设置为默认地址
   */
      $scope.setDefaultAdd=function(){
        Storage.set("DefaultMemberUserAddrId",$scope.obj.id);
        Storage.set("DefaultMemberUserAddr",$scope.obj.areaidString+$scope.obj.address);
        $location.path("/tab/RC_receiveWay/"+orderrId);
      }
      /**
       * 点击了叉叉，如果是id=0，返回上一页
       */
      $scope.clickx=function(){
          if(id==='0')
              goBack();
      };
  /**
   * 返回
   */
  $scope.fanhui=function(){
    $ionicHistory.goBack();
  };
      $scope.init();
      ctrlReinitMap.remove('UserAddrCtrl');
    //检查手机号
      $scope.checkPhoneNum = function (phone){
        var ChinaMOBILE = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8])\d{8}$/; //移动
        var ChinaUNICOM =/^1(3[0-2]|5[56]|8[56]|4[5]|7[6])\d{8}$/;        //联通
        var ChinaTELECOM =/^(13|15|17|18)\d{9}$/;                        //电信
        var ChinaTest =/^(101234)\d{5}$/;                        //TEST
        if(ChinaMOBILE.test(phone)|| ChinaUNICOM.test(phone)|| ChinaTELECOM.test(phone)|| ChinaTest.test(phone)){
          return true;
        }else{
          console.log("错误的手机号");
          return false;
        }
      };
});
