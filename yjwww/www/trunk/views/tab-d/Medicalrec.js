/**
 * Medicalrec，病历详细
 */
appctrl.controller('MedicalrecCtrl', function($scope, $rootScope,$stateParams, $location, $log, Storage, ENV, CommonService, MedicalrecService,$ionicScrollDelegate) {
  $log.debug("enter Medicalrec ctrl");
  /**参数*/
  var id = $stateParams.id;
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=false;
  /**对象*/
  $scope.obj={};
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Medicalrec ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("Medicalrec ctrl afterEnter");
    if (ctrlReinitMap.get('MedicalrecCtrl')) {
      ctrlReinitMap.remove('MedicalrecCtrl');
      $log.debug("Medicalrec ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 结束后
   */
  $scope.$on('$destroy', function() {
    $log.debug("Medicalrec ctrl destroy");
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("Medicalrec ctrl init id="+id);
    $scope.get();
  };
  /**
   * 获取本地对象
   */
  $scope.getlocal=function(){
    $log.debug("Medicalrec ctrl getlocal id="+id);
    if(isblank0(id)){
      $scope.obj= _.clone(_Medicalrec);
    }else{
      $scope.obj=MedicalrecService.getlocal(id);
    }
    $log.debug($scope.obj);
  };
  /**
   * 获取网络对象
   */
  $scope.get=function(){
    MedicalrecService.get(id).then(function (data) {
      $log.debug("Medicalrec ctrl get then");
      if(isblank0(data.id)){
        if(Storage.get(LOGINED_USER)!=null){
          $scope.obj.id=Storage.get(LOGINED_USER).id;
        }
        MedicalrecService.create($scope.obj).then(function (data) {
          $log.debug(" Medicalrec ctrl save then");
        });
      }
      $scope.obj=data;
    });
  };
  $scope.save=function(){
    MedicalrecService.update($scope.obj).then(function (data){
      $scope.get();
    });
  }
  $scope.gotoMedicalrecPage=function(){
    $location.path("/tab/MedicalrecPage/"+$scope.obj.id);
  };
  $scope.gotoMedicalrecPageList=function(){
    Storage.set("MedicalrecId",$scope.obj.id);
    Storage.set("MedicalrecPageListQueryWhere","medicalrecId="+$scope.obj.id);
    $location.path("/tab/MedicalrecPageList");
  };
  $scope.toping=function(){
    $ionicScrollDelegate.scrollTop();
  };
  $scope.init();
  ctrlReinitMap.remove('MedicalrecCtrl');
});
