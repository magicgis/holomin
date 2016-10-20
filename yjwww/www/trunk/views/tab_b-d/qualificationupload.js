/**
 * qualificationupload，资质上传
 */
appctrl.controller('qualificationuploadCtrl', function($scope, $rootScope, $log, $timeout,
                                                       $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                       $location, $state,
                                                       $cordovaNetwork, $cordovaGoogleAnalytics,
                                                       $stateParams,$ionicHistory,
                                                       ENV,CommonService,DoctorService,Upload,Storage) {
  $log.debug("enter qualificationupload ctrl");
  /**参数*/
  var id = $stateParams.id;
  /**页面对象*/
  $scope.vm={};
  $scope.vm.isedit=false;
  /**页面显示的列表*/
  /**页码*/
  $scope.page=_.clone(_Page);
  $scope.list=[];
  $scope.obj={};
  $scope.pushNotification={};
  $scope.pushNotificationChange = function() {
    $log.debug('是否加入空中诊室',$scope.pushNotification.checked);
    if($scope.pushNotification.checked){
      $scope.obj.itypeAir = 0;
    }else{
      $scope.obj.itypeAir = 1;
    }

};

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("qualificationupload ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("qualificationupload ctrl afterEnter");
    if (ctrlReinitMap.get('qualificationuploadCtrl')) {
      ctrlReinitMap.remove('qualificationuploadCtrl');
      $log.debug("qualificationupload ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 结束后
   */
  $scope.$on('$destroy', function() {
    $log.debug("qualificationupload ctrl destroy");
  });
  /**
   * 初始化
   */
  $scope.init=function(){
    $scope.get();
  };
  /**
   * 获取网络对象
   */
  $scope.get=function(){
    if(!id)
      return;
    DoctorService.get(id).then(function (data) {
      $log.debug("DoctorService ctrl get then");
      $scope.obj=data;
      if(isblank0($scope.obj.itypeAir)){
        $scope.pushNotification.checked=true;
      }else{
        $scope.pushNotification.checked=false;
      }
    });
  };
  $scope.save=function(){
    $log.debug("qualificationupload ctrl get id="+id);
    if(isblank($scope.obj.imgqa)||isblank($scope.obj.imgreg)){
      CommonService.alertm("必须上传资格证书和执业注册证！");
      return;
    }
    CommonService.confirm("是否确认提交").then(function(res) {
      if(res) {
        DoctorService.update($scope.obj).then(function (data) {
          $log.debug("qualificationupload ctrl update then");
          CommonService.alertm("上传成功！");
          $location.path("/tab/my");
        });
      }
    });
  };
  $scope.modelOptionsObj = {};
  $scope.vmfiles=$scope;
  /**
   * 如果"files_img1"这个控件发生改变，则进行上传
   */
  $scope.$watch('vmfiles.files_img1', function (files) {
    $scope.file_num =1;
    $log.debug("vmfiles.files_img1 change!");
    var file;
    if(files==null)
      return;
    if (angular.isArray(files)) {
      file=files[0];
    }else{
      file=files;
    }
    $log.debug("upload...");
    $log.debug(file);
    $scope.uploadPic(file, $scope.obj,"img1");
  });
  /**
   * 如果"vmfiles.files_img2"这个控件发生改变，则进行上传
   */
  $scope.$watch('vmfiles.files_img2', function (files) {
    $scope.file_num =2;
    $log.debug("vmfiles.files_img2 change!");
    var file;
    if(files==null)
      return;
    if (angular.isArray(files)) {
      file=files[0];
    }else{
      file=files;
    }
    $log.debug("upload...");
    $log.debug(file);
    $scope.uploadPic(file, $scope.obj,"imgreg");
  });
  /**
   * 如果"vmfiles.files_img3"这个控件发生改变，则进行上传
   */
  $scope.$watch('vmfiles.files_img3', function (files) {
    $scope.file_num =3;
    $log.debug("vmfiles.files_img3 change!");
    var file;
    if(files==null)
      return;
    if (angular.isArray(files)) {
      file=files[0];
    }else{
      file=files;
    }
    $log.debug("upload...");
    $log.debug(file);
    $scope.uploadPic(file, $scope.obj,"imgqa");
  });

  $scope.init();
  ctrlReinitMap.remove('qualificationuploadCtrl');
});
