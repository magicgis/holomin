/**
 * OrderrList，订单列表
 * @param act 0患者病历，1我开的，2我首推的
 * @param memberId 患者
 */
appctrl.controller('OrderrListCtrl', function($scope, $rootScope,$timeout,
                                           $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                           $location, $state,
                                           $cordovaNetwork, $cordovaGoogleAnalytics,$log,Storage,$stateParams,
                                           ENV,OrderrService,CommonService) {
    $log.debug("enter OrderrList ctrl");
    /**参数*/
    var act = $stateParams.act; //0患者病历，1我开的，2我首推的
    var memberId = $stateParams.memberId;  //患者
    $log.debug("act="+act+",memberId="+memberId);
    /**页码*/
    $scope.page=_.clone(_Page);
    /**页面显示的列表*/
    $scope.list=[];
    /**
     * 进入前
     */
    $scope.$on('$ionicView.beforeEnter', function() {
        $log.debug("OrderrList ctrl beforeEnter");
    });
    /**
     * 进入后
     */
    $scope.$on('$ionicView.afterEnter', function() {
        $log.debug("OrderrList ctrl afterEnter");
        if (ctrlReinitMap.get('OrderrListCtrl')) {
            ctrlReinitMap.remove('OrderrListCtrl');
            $log.debug("OrderrList ctrl afterEnter init");
            $scope.init();
        }
    });

    /**
     * 初始化
     */
    $scope.init=function(){
        $log.debug("OrderrList ctrl init ");
	    //$scope.page.where=Storage.get("OrderrList"+"QueryWhere");
        //iotype	开单类型	jsonmap~{'0':'医生药笺','1':'平台医生药笺','2':'用户自采购'}
        //status	支付状态	jsonmap~{'0':'未支付','1':'已发起支付申请','2':'支付成功','-1':'放弃支付'}
        //statusgoods	收发货状态	jsonmap~{'0':'未发货','1':'部分发货','2':'已全部发货','3':'部分收货','4':'已全部收货','-1':'放弃'}
        //status_carriage_type	提货方式	jsonmap~{'0':'物流发货','1':'到店自提'}
        //act 0患者病历，1我开的，2我首推的 3 医生药笺和用户自采购
        $log.debug("act="+act+",memberId="+memberId);
        if(act==0){
            $scope.page.where="iotype=0 and memberId="+memberId;
            //$scope.first("status  = 0  and  iotype=0" );

        }else if(act==1){
            $scope.page.where="iotype=0 and doctorWr="+$scope.meuser.id;
            //$scope.page.where="iotype=0 and doctorId="+$scope.meuser.id;
            //$scope.first("   iotype=0 and doctorId="+$scope.meuser.id );
            //$scope.page.where=" iotype=0";
        }else if(act==2){
            //act===2
            //$scope.page.where="status=2 and (iotype=1 or iotype=2) and doctorId="+$scope.meuser.id;
            $scope.page.where="(iotype=1 or iotype=2) and doctorId="+$scope.meuser.id;
            //$scope.first("  iotype=2 and doctorId="+$scope.meuser.id );
        } else if(act==3){
            //act===3
            //$scope.page.where="status=2 and (iotype=1 or iotype=2) and doctorId="+$scope.meuser.id;
            $scope.page.where="((iotype=2 and doctorId="+$scope.meuser.id+")or"+ ("( iotype=0 and doctorWr="+$scope.meuser.id+"))"+"and status=2 and statusgoods=4") ;
            //$scope.first("  iotype=2 and doctorId="+$scope.meuser.id );else{
        } else if(act==4){
            //上月的所以成交订单
          $scope.page.where="((iotype=2 and doctorId="+$scope.meuser.id+")or"+ ("( iotype=0 and doctorWr="+$scope.meuser.id+"))")+" and status=2 and statusgoods=4 and gmtRecv like'"+LastMonth()+"%'" ;
        }
		  $scope.page.pageNo=1;
      $scope.page.hasNextPage=false;
      $scope.page.orderstr = "gmtCreate desc";
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
          item.sumprice= item.sumprice.toFixed(2);
            $scope.list.push(item);
        });
        if(data && data.length < $scope.page.pageSize){
            $scope.page.hasNextPage=false;
        }else{
            $scope.page.hasNextPage=true;
        }
      if($scope.list.length<1){
        CommonService.alertm('上月未成交订单');
      }
    };

    /**
     * 第一次查询
     */
    $scope.first=function(){
        OrderrService.first(null,$scope.page).then(function (data) {
            $log.debug("OrderrList ctrl query then");
            $scope.addList(data);
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    /**
     * 下拉加载更多查询
     */
    $scope.more=function(){
        $log.debug("OrderrList ctrl more=========");
        if(!$scope.page.hasNextPage){
            return;
        }
        OrderrService.more($scope.page).then(function (data) {
            $log.debug("OrderrList ctrl more then");
            $scope.addList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.init();
    ctrlReinitMap.remove('OrderrListCtrl');
});
