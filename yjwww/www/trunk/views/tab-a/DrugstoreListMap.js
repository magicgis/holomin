/**
 * DrugstoreList，实体药店列表地图版
 */
appctrl.controller('DrugstoreListMapCtrl', function($scope, $rootScope,$timeout,
                                                    $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                                    $location, $state,$ionicScrollDelegate,
                                                    $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,
                                                    ENV,DrugstoreService,GaodeService,WxService,CommonService,zspecService) {
  $log.debug("enter DrugstoreList ctrl");
  /**页码*/
  $scope.page=_.clone(_Page);
  /**页面显示的列表*/
  $scope.list=[];
  /**地图*/
  $scope.map={};
  $scope.vm=[];
  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("DrugstoreList ctrl beforeEnter");
  });
  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("DrugstoreList ctrl afterEnter");
    if (ctrlReinitMap.get('DrugstoreListMapCtrl')) {
      ctrlReinitMap.remove('DrugstoreListMapCtrl');
      $log.debug("DrugstoreList ctrl afterEnter init");
      $scope.init();
    }
  });

  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("DrugstoreList ctrl init ");

    $scope.pcc=areaTree;
    $scope.mobileLocate();
  };
  /**
   * 手机定位
   */
  $scope.mobileLocate=function(){
    //获取手机经纬度
    //如果获取到，发到服务器
    if( _ClientInfo.cli == 1) {
      //安卓
      //$scope.mobileLocateAnd();
      $scope.mobileLocateAnd();
    } else if(_ClientInfo.cli==2) {
      //ios
      $scope.mobileLocateIos();

    } else if(_ClientInfo.cli==3) {
      // 微信
      $scope.mobileLocateWx();
    }else{
      // 浏览器
      $scope.mobileLocateWeb();
    }
  }
  /**
   * 手机定位安卓
   */
  $scope.mobileLocateAnd=function(){
    if(gaodeLocationService){
      gaodeLocationService.getCurrentPosition(
        /**
         * 定位成功
         * @param jsonObj {code:0,latitude:123.456,longitude:456.789};
         */
        function(jsonObj){
          zspecService.dgLocation(jsonObj.longitude,jsonObj.latitude).then(function (data) {
            $scope.addList(data);
            $scope.areaReduction();
            $scope.mapCenterToFirst();
          });
        },
        /**
         * 失败
         * @param jsonObj {code:0,errorInfo:'失败原因',errorDetail:'详细原因'}
         */
        function(jsonObj){
          CommonService.alertm('定位失败,code='+jsonObj.code+','+jsonObj.errorInfo+','+jsonObj.errorDetail);
        }
      );
    }
  }
  /**
   * 手机定位苹果
   */
  $scope.mobileLocateIos=function(){
    if(maplocation){
      maplocation.getGaoDeLocation(
        function(jsonObj){
          zspecService.dgLocation(jsonObj.longitude,jsonObj.latitude).then(function (data) {
            $scope.addList(data);
            $scope.areaReduction();
            $scope.mapCenterToFirst();
          });
        });
    }
  }
  /**
   * 手机定位微信
   */
  $scope.mobileLocateWx=function(){
    // alert('开始微信定位');
    WxService.config().then(function (data) {
      WxService.getLocation().then(function (lnglat) {
        zspecService.dgLocation(lnglat.longitude,lnglat.latitude).then(function (data) {
          $scope.addList(data);
          $scope.areaReduction();
          $scope.mapCenterToFirst();
        });
      });
    })
  }
  /**
   * 手机定位普通
   */
  $scope.mobileLocateWeb=function(){
    //默认选浙江
    $scope.province=areaTree[3];
    $scope.city= $scope.province.children[0];
    $scope.county=$scope.city.children[1];
    $scope.query="";

    $scope.page.where="areaid="+$scope.county.id;
    $scope.page.pageNo=1;
    $scope.page.hasNextPage=false;
    $scope.list=[];
    $scope.first();
  }
  /**
   * 地区还原
   */
  $scope.areaReduction=function(){
    angular.forEach(areaTree, function (item) {
      if(parseInt( $scope.vm.areaid / 10000)*10000==item.id) {
        $scope.province = item;
        angular.forEach(item.children, function (item2) {
          if (parseInt($scope.vm.areaid / 100) * 100 == item2.id) {
            $scope.city = item2;
            angular.forEach(item2.children, function (item3) {
              if (item3.id == $scope.vm.areaid) {
                $scope.county = item3;
                return;
              }
            });
          }
        });
      }
    });
  }
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
      $scope.mapMarker(item);
      $scope.vm.areaid=item.areaid;
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
    DrugstoreService.first(null,$scope.page).then(function (data) {
      $log.debug("DrugstoreList ctrl query then");
      $scope.addList(data);
      $scope.mapCenterToFirst();
      $scope.$broadcast('scroll.refreshComplete');
    });

  };

  /**
   * 下拉加载更多查询
   */
  $scope.more=function(){
    $log.debug("DrugstoreList ctrl more=========");
    if(!$scope.page.hasNextPage){
      return;
    }
    DrugstoreService.more($scope.page).then(function (data) {
      $log.debug("DrugstoreList ctrl more then");
      $scope.addList(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  /**
   * 地图初始化
   */
  $scope.mapinit=function(){
    $log.debug("mapinit ");
    $scope.map=GaodeService.createMap("amap","gaode_container_shopdrugstore");
  };
  /**
   * 将中心移动到列表第一个
   */
  $scope.mapCenterToFirst=function(){
    $log.debug("mapCenterToFirst ");
    var drugstore=$scope.list[0];
    var firstlnglat=[116.397428,39.90923];
    if(drugstore && drugstore.centerlng&& drugstore.centerlat&& drugstore.centerlng!=0&& drugstore.centerlat!=0)
      firstlnglat=[drugstore.centerlng,drugstore.centerlat];
    $scope.mapCenterTo(firstlnglat);
  };
  /**
   * 将中心移动到
   * @param lnglat ex. [116.205467, 39.907761]
   */
  $scope.mapCenterTo=function(lnglat){
    $log.debug("mapCenterTo ");
    $scope.map.setZoomAndCenter(14, lnglat);
  };
  /**
   *  地图上放点
   * @param drugstore 药店 obj1就是marker
   */
  $scope.mapMarker = function (drugstore) {
    if(drugstore.obj1){
      //已经放过了
      return ;
    }
    var firstlnglat=[116.397428,39.90923];
    if(drugstore && drugstore.centerlng&& drugstore.centerlat&& drugstore.centerlng!=0&& drugstore.centerlat!=0)
      firstlnglat=[drugstore.centerlng,drugstore.centerlat];
    var marker = new AMap.Marker({
      icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
      position: firstlnglat
    });
    marker.setMap($scope.map);
  };
  /**
   *药店联系
   * @param  药店联系
   */
  $scope.yaodianlianxi=function(obj){
    $scope.mapCenterTo([obj.centerlng,obj.centerlat]);
    CommonService.alertm('请与药店客服联系');
    //CommonService.alertm('请与药店客服联系').then(function (res) {});
  };

  /**
   * 根据区县查找，此处JS和HTML的对象没有同步，因此页面把对象传递上来
   * @param county
   */
  $scope.searchByCounty=function(county){
    if(county==$scope.city.children[0]){
      CommonService.alertm("请选择 区");

    }
    $scope.county=county;
    $scope.query="areaid="+$scope.county.id;
    $scope.page.where=$scope.query;
    $scope.list=[];
    $scope.first();
  };
  /**
   * 导航
   * @param obj Drugstore
   */
  $scope.nav=function(obj){
    $log.debug('home gpsWp');
    $ionicScrollDelegate.scrollTop();
    var deflnglat=[116.397428,39.90923];
    if(_ClientInfo.cli == null || _ClientInfo.cli == 0) {
      // 浏览器
      GaodeService.drivingNav([obj.centerlng,obj.centerlat],deflnglat);
    } else if(_ClientInfo.cli==3) {
      // 微信
      // alert('开始微信定位');
      WxService.config().then(function (data) {
        WxService.getLocation().then(function(lnglat) {
          GaodeService.drivingNav([obj.centerlng,obj.centerlat],lnglat);
        }, function(res) {
          CommonService.alertm("定位失败");
        });
      })
    } else if(_ClientInfo.cli==2) {
      if(maplocation){
        maplocation.getGaoDeLocation(
          function(jsonObj){
            GaodeService.drivingNav([obj.centerlng,obj.centerlat],[jsonObj.longitude,jsonObj.latitude]);
          },
          function(){
            CommonService.alertm("高德导航定位失败");
          });
      }
    }else{
      //安卓
      if(gaodeLocationService){
        gaodeLocationService.getCurrentPosition(
          /**
           * 定位成功
           * @param jsonObj {code:0,latitude:123.456,longitude:456.789};
           */
          function(jsonObj){
            //CommonService.alertm(',code='+jsonObj.code+',latitude='+jsonObj.latitude+',longitude='+jsonObj.longitude);
            GaodeService.drivingNav([obj.centerlng,obj.centerlat],[jsonObj.longitude,jsonObj.latitude]);
          },
          /**
           * 失败
           * @param jsonObj {code:0,errorInfo:'失败原因',errorDetail:'详细原因'}
           */
          function(jsonObj){
            //CommonService.alertm(',code='+jsonObj.code+',errorInfo='+jsonObj.errorInfo+',errorDetail='+jsonObj.errorDetail);
            CommonService.alertm("定位失败");
          }
        );
      }
    }
  };
  $scope.mapinit();
  $scope.init();
  ctrlReinitMap.remove('DrugstoreListMapCtrl');
});
