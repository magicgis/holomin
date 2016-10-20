appctrl.controller('DoctorCtrl', function($scope, $rootScope, $log, $timeout,
                                          $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                          $location, $state,
                                          $stateParams,$ionicHistory,
                                          ENV,CommonService,DoctorService,MemberdoctorService,Storage,zspecService) {
  $log.debug("enter Doctor ctrl");
  /**参数*/
  /**页面显示的列表*/
  /**页码*/
  $scope.page=_.clone(_Page);
  var id = $stateParams.id;
  $scope.list=[];
  $scope.obj={};
  $scope.newobj={}
  $scope.newobj.member_id=0;
  if(Storage.get(LOGINED_USER)!=null){
    $scope.newobj.memberId=Storage.get(LOGINED_USER).id;
    $scope.newobj.mname=Storage.get(LOGINED_USER).name;
  }

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("Doctor ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("Doctor ctrl afterEnter");
    if (ctrlReinitMap.get('DoctorCtrl')) {
      ctrlReinitMap.remove('DoctorCtrl');
      $log.debug("Doctor ctrl afterEnter init");
      $scope.init();
    }
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
    $scope.page.cmd="memberId="+$scope.newobj.memberId;
    DoctorService.get(id,$scope.page).then(function (data) {
      $log.debug("DoctorService ctrl get then");
      $scope.obj=data;
      $scope.dataProcessing(data);
    });
  };
  /**
   * 科室：对传过来的json进行处理
   */
  $scope.dataProcessing=function(data){
    angular.forEach(data.obj1, function (item) {
      angular.forEach(item.children, function (item2) {
        if(data.productchannelId==item2.id){
          $scope.obj.productchannelIdProductchannelObj=item2;
          $scope.obj.ks1=item;
        }
      });
    });
  }

  /**
   *  关注医生
   */
  $scope.follow=function(obj){
    if( isblankobj(obj.obj2)){
      $scope.newobj.statusDm=2;
      $scope.newobj.doctorId=obj.id;
      $scope.newobj.dname=obj.name;
      $scope.newobj.productchannelId=obj.productchannelId;
      CommonService.confirm("关注此医生").then(function(res) {
        if(res) {
          zspecService.createMemberDoctorFollow( $scope.newobj).then(function (data) {
            $scope.init();
          });
        }
      });
    }else if(obj.obj2.statusDm==1){
      CommonService.confirm("该医生已经是您的私人医生了")
      return;
    }else if(obj.obj2.statusDm==0){
      CommonService.confirm("再次关注此医生").then(function(res) {
        if(res) {
          MemberdoctorService.get(obj.obj2.id).then(function (data) {
            data.statusDm=2;
            MemberdoctorService.update(data).then(function (data) {
              $scope.init();
            });
          });
        }
      });
    }
  };
  $scope.followAndGotoMD= function(obj){
    if( isblankobj(obj.obj2)){
      $scope.newobj.statusDm=2;
      $scope.newobj.doctorId=obj.id;
      $scope.newobj.dname=obj.name;
      $scope.newobj.productchannelId=obj.productchannelId;
      CommonService.confirm("您好！恭喜您成为免费体验会员，活动期间医师咨询免费，欢迎加入").then(function(res) {
        if(res) {
          zspecService.createMemberDoctorFollow( $scope.newobj).then(function (data) {
            $scope.init();
            $location.path("/tab/DmmsgList/0/"+ $scope.newobj.memberId+"/"+obj.id);
          });
        }
      });
    }else if(obj.obj2.statusDm==2||obj.obj2.statusDm==1){
      $location.path("/tab/DmmsgList/0/"+obj.obj2.memberId+"/"+obj.obj2.doctorId);
    }else if(obj.obj2.statusDm==0){
      CommonService.confirm("再次关注此医生").then(function(res) {
        if(res) {
          MemberdoctorService.get(obj.obj2.id).then(function (data) {
            data.statusDm=2;
            MemberdoctorService.update(data).then(function (data) {
              $scope.init();
              $location.path("/tab/DmmsgList/0/"+ $scope.newobj.memberId+"/"+obj.id);
            });
          });
        }
      });
    }
  };



  $scope.init();
  ctrlReinitMap.remove('DoctorCtrl');
});
