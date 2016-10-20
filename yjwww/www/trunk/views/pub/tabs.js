appctrl.controller('tabCtrl', function($scope, $rootScope, $log, $timeout,
                                       $ionicTabsDelegate, $ionicPopover, $ionicModal, $ionicLoading,
                                       $location, $state,$ionicHistory,
                                       $cordovaNetwork, $cordovaGoogleAnalytics,
                                       CommonService,Storage,RegService,zspecService,WxService,$sce,
                                       ENV,Upload) {
  $log.debug("enter tab ctrl");
  //显示的版本号
  $scope.h5ver=h5ver;
  $scope.hdver=_ClientInfo.ver;
  // 登录用户信息
  $scope.rolemem = 303;
  $scope.user={};
  //购物车 list<Cart> ，产品在cart.obj1中
  $scope.listCart=[];
  //购物车总价
  $scope.cartPrice=0.0;
  $scope.tab = 'sms';
  $scope.countdown = 0;
  //我User
  $scope.meuser=Storage.get(LOGINED_USER);
  if(!$scope.meuser)
    $scope.meuser={};
  $scope.vm={};

  /**
   * 进入前
   */
  $scope.$on('$ionicView.beforeEnter', function() {
    $log.debug("tab ctrl beforeEnter");
  });

  /**
   * 进入后
   */
  $scope.$on('$ionicView.afterEnter', function() {
    $log.debug("tab ctrl afterEnter");
    if (ctrlReinitMap.get('tabCtrl')) {
      ctrlReinitMap.remove('tabCtrl');
      $log.debug("tab ctrl afterEnter init");
      $scope.init();
    }
  });
  /**
   * 通知：需要登录，弹出登录窗口
   * @param event
   * @param data 从哪里过来的 'serv':ajax注入返回的
   */
  $scope.$on('event.NeedLoginException', function(event,data) {
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()&&YIJIAN) {
      window.location.href=outGetOpenidUrl;
      return;
    }
    if(wxNoOpenid()&&YJTCM) {
      window.location.href=outGetOpenidUrl_yjtcm;
      return;
    }
    $log.debug("收到通知：event.NeedLoginException,data="+data);
    if(data==="reg"){
      $scope.user=Storage.get(REG_USER);
      $scope.user.password='';
      $scope.user.rememberpwd=true;
      $scope.user.autologin=true;
    }else{
      $scope.user=Storage.get(LOGINED_USER);
      if ($scope.user == null || $scope.user === "")
        $scope.user = {};
    }
    $scope.openPopLogin();
  });
  /**
   * [多客户端版本]
   * 通知：需要微信支付，弹出微信支付窗口
   * @param event
   * @param data 是Json对象json.data=["WaJsapiPaymentParam", waJsapiPaymentParam]
   */
  $scope.$on('event.NeedWxpayWindow', function(event,data) {
    $log.debug("收到通知：event.NeedWxpayWindow,data="+JSON.stringify(data));
    $scope.openPopWxpay();
    if(_ClientInfo.cli===0) {
      var payid=data.id;
      WxService.config().then(function (data) {
        zspecService.wxPay(payid).then(function (data) {
          var waJsapiPaymentParam=data;
          console.log("waJsapiPaymentParam"+waJsapiPaymentParam);
          WxService.pay(waJsapiPaymentParam).then(function (data) {
            $scope.alertm("支付成功");
          });
        });
      });
    }
    if(_ClientInfo.cli===1) {
      var waAppapiPaymentParam=data.obj["WaAppapiPaymentParam"];

    }
    if(_ClientInfo.cli===2) {

    }
    if(_ClientInfo.cli==null || _ClientInfo.cli===3) {

    }
  });
  ///////////通知
  /**
   * 通知：需要支付宝支付，弹出支付宝支付窗口
   * @param event
   * @param data 是Json对象json.data=["orderinfo", orderinfo]
   */
  $scope.$on('event.NeedAlipayWindow', function(event,data) {
    $log.debug("收到通知：event.NeedAlipayWindow,data="+JSON.stringify(data));
    if(_ClientInfo.cli===0) {
      // web
      $scope.vm.payid=data.id;
      $scope.vm.payurl=$sce.trustAsResourceUrl(wbase+"/pub/alipay/jump.html?id="+$scope.vm.payid);
      $scope.openPopApay();
    }
    if(_ClientInfo.cli===1) {
      // android
      // 支付宝支付
    }
    if(_ClientInfo.cli===2) {
      // iOS
    }
    if(_ClientInfo.cli===3) {

    }
  });

  /**
   * 弹个警告框
   * @param event
   * @param data 消息内容
   */
  $scope.$on('event.alertm', function(event,data) {
    $log.debug("收到通知：event.alertm,data="+data);
    CommonService.alertm(data).then(function (res) {});
  });
  /**
   * 通知:更新购物车数量
   */
  $scope.$on('refereshCartNum', function(event,data) {
    $scope.initCartNum();
  });

  /**
   * 初始化
   */
  $scope.init=function(){
    $log.debug("tab ctrl init");
    $scope.listCart=Storage.get(LISTCART);
    if(!$scope.listCart)$scope.listCart=[];
  };

  /**
   * 点击TAB做的事，覆盖了href
   * @param nowtab
   */
  $scope.nowtabs=function(nowtab){
    $log.debug("当前的tab="+nowtab);
    pubnowtab=nowtab;
    Storage.set("TAB",pubnowtab);
    if('B'===nowtab){
      $scope.jumpPage('ProductType2/mclass');
      //$scope.jumpPage('RB_ProductType/woman');
    }else if('C'===nowtab){
      $scope.jumpPage('Cart');
    }else if('D'===nowtab){
      $scope.jumpPage('my');
    }else{
      $scope.jumpPage('Wwwhome');
    }
  };
  /**
   * 返回屏幕一半高度
   * @returns {number}
   */
  $scope.getHalfHeight=function(){
    return 300;
  }

  /**
   * 根据当前tab自动放置页面
   * ex. ng-click="rx('#/tab/Product/'+obj1.productId)"
   * @param src
   */
  $scope.rx=function(src){
    src="R"+pubnowtab+"_"+src.substring(6);
    $scope.jumpPage(src);
  }
  /**
   * 跳转
   * @param uri
   */
  $scope.jumpPage=function(uri) {
    $location.path("/tab/"+uri);
  };
  /**
   * 把xxxController放到ctrlReinitMap中，这样他们未来回到页面时，会重刷数据
   * @param key
   */
  $scope.ctrlMapPut = function(key) {
    ctrlReinitMap.put(key,1);
  };
  /**
   * 后退
   */
  $scope.goBack = function() {
    if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
  }

  ///////////登录html
  /**
   * login页中的登录方式切换
   * @param tab
   */
  $scope.tabChange = function(tab) {
    $scope.tab = tab;
  };
  /**
   * 请求验证码
   */
  $scope.requestCode = function(user) {
    $log.debug("请求验证码");
    $log.debug(user);
    if(!checkPhoneNum(user.username)){
      CommonService.alertm("手机号无效");
      return;
    }
    zspecService.requestCode(user.username).then(function() {
      CommonService.alertm("验证码已发送");
      $scope.count(60);
    });
  };
  /**
   * 倒计时
   */
  $scope.count = function(n) {
    $scope.countdown = n;
    if (n != 0) {
      $timeout(function() {
        $scope.count(n - 1);
      }, 1000);
    }
  };
  /**
   * 短信验证登陆 之用户版
   */
  $scope.dologinbysms = function(user) {
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()&&YIJIAN) {
      window.location.href=outGetOpenidUrl;
      return;
    }
    if(wxNoOpenid()&&YJTCM) {
      window.location.href=outGetOpenidUrl_yjtcm;
      return;
    }
    if(user.password.length<6){
      CommonService.alertm('您输入的密码有误');
      return;
    }
    user.roleId=5;
    $log.debug("短信验证登陆");
    zspecService.dologinbysms(user).then(function (data) {
      $scope.popLogin.hide();
      //密码复原
      var oldUser= _.clone($scope.user);
      $scope.user=data;
      $scope.user.passwordmd5=$scope.user.password;
      Storage.set(LOGINED_USER,$scope.user);
      //token以clientInfo为准，因此从user中复制过去
      var clientInfo=Storage.get(CLIENT_INFO);
      if(!clientInfo){
        clientInfo=_.clone(_ClientInfo);
      }
      clientInfo.token=$scope.user.token;
      Storage.set(CLIENT_INFO,clientInfo);
      $scope.meuser=Storage.get(LOGINED_USER);

      //如果是安卓或苹果，上传CID
      if (_ClientInfo.cli == 1 || _ClientInfo.cli == 2) {
        //获取cid并且上传
        getui.init(function(cid) {
          Storage.set(GETUICID, cid);
          zspecService.putCid(cid);
        });
      }else{
        console.log("非app不上传cid");
      }

      $location.path("/tab/Editmember");
      //$ionicHistory.goBack();
      $rootScope.$broadcast('event.logined'); //通知其它人登录成功
    });
  }


  /**
   * 登录
   */
  $scope.dologin=function(user){
    //如果是微信版，同时本地无openid，去外面转一圈取openid回来
    if(wxNoOpenid()&&YIJIAN) {
      window.location.href=outGetOpenidUrl;
      return;
    }
    if(wxNoOpenid()&&YJTCM) {
      window.location.href=outGetOpenidUrl_yjtcm;
      return;
    }
    $scope.user=user;
    user.roleId=5;
    user.isauto=0;
    console.log(user);
    RegService.dologin(user).then(function (data) {
      $scope.popLogin.hide();
      //密码复原
      var oldUser= _.clone($scope.user);
      if(!data || !data.password){
        CommonService.alertm('账密错误，登录失败，请重试');
        return;
      }
      //以下为登录成功
      $scope.user=data;
      $scope.user.passwordmd5=$scope.user.password;
      $scope.user.password=oldUser.password;

      Storage.set(LOGINED_USER_ALL,$scope.user);
      //token以clientInfo为准，因此从user中复制过去
      var clientInfo=Storage.get(CLIENT_INFO);
      if(!clientInfo){
        clientInfo=_.clone(_ClientInfo);
      }
      clientInfo.token=$scope.user.token;
      Storage.set(CLIENT_INFO,clientInfo);
      $scope.meuser=Storage.get(LOGINED_USER_ALL);
      //如果是安卓或苹果，上传CID
      if (_ClientInfo.cli == 1 || _ClientInfo.cli == 2) {
        //获取cid并且上传
        getui.init(function(cid) {
          Storage.set(GETUICID, cid);
          zspecService.putCid(cid);
        });
      }
      $ionicHistory.goBack();
      $rootScope.$broadcast('event.logined'); //通知其它人登录成功
    });
  }

  ///////////////////////////以下是弹窗系列

  /**弹出窗_登录*/
  $scope.popLogin={};
  /**
   * 设定弹出窗口_登录
   */
  $ionicPopover.fromTemplateUrl('views/pub/login.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popLogin = popover;
  });
  /**打开窗口_登录*/
  $scope.openPopLogin = function(e) {
    $scope.popLogin.show(e);
  };
  /**关闭窗口_登录*/
  $scope.closePopLogin = function(e) {
    $log.debug("closePopLogin");
    $scope.popLogin.hide();
    //$ionicHistory.goBack();
  };
  /**弹出窗_微信支付*/
  $scope.popWxpay={};
  /**
   * 设定弹出窗口_微信支付
   */
  $ionicPopover.fromTemplateUrl('views/pub/wxpay.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popWxpay = popover;
  });
  /**打开窗口_微信支付*/
  $scope.openPopWxpay = function(e) {
    $scope.popWxpay.show(e);
  };

  /**弹出窗_支付宝支付*/
  $scope.popApay={};
  /**
   * 设定弹出窗口_微信支付
   */
  $ionicPopover.fromTemplateUrl('views/pub/apay.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popApay = popover;
  });
  /**打开窗口_微信支付*/
  $scope.openPopApay = function(e) {
    $scope.popApay.show(e);
  };
  /////////////////////////







  ///////////////////购物车系列
  /**
   * 购物车检查
   */
  $scope.checkCart = function() {
    $log.debug("tabs check Cart");
    $scope.listCart = Storage.get(LISTCART);
    var foundErr=false;
    angular.forEach($scope.listCart, function (cartItem) {
      if(!cartItem.obj1)
        foundErr=true;
    });
    if(foundErr){
      $scope.listCart=[];
      Storage.remove(LISTCART);
    }
    $scope.refereshPrice();

  }
  /**
   * 初始化购物车数量
   */
  $scope.initCartNum = function() {
    $log.debug("tabs initCartNum");
    $scope.listCart = Storage.get(LISTCART);
    if(!$scope.listCart)$scope.listCart=[];
    var cartnum = 0;
    angular.forEach($scope.listCart, function (cartItem) {
      cartnum += cartItem.num;
    });
    $scope.cartTNum = cartnum;
  };
  /**
   * 购物车里此商品数量
   * @param product
   */
  $scope.cartNum=function(product) {
    var cart=$scope.cartFind(product.id);
    if(cart)
      return cart.num ;
    return 0;
  };
  /**
   * 购物车加1
   * @param product
   */
  $scope.cartAdd=function(product) {
    var cart=$scope.cartFind(product.id);
    if(!cart)
      cart=$scope.cartCreate(product.id);
    cart.price=product.price;
    cart.num += 1;
    //obj1放成产品，以后在购物车界面上会用到
    cart.obj1=product;
    Storage.set(LISTCART, $scope.listCart);
    $scope.refereshPrice();
  };
  /**
   * 购物车减1
   * @param product
   */
  $scope.cartRemove=function(product){
    var cart = $scope.cartFind(product.id);
    if(!cart)
      return;
    if (cart.num > 1) {
      cart.num -= 1;
      Storage.set(LISTCART,$scope.listCart);
      $scope.refereshPrice();
    } else {
      $scope.cartDel(product.id);
    }
  };
  /**
   * 在购物车里找到ProductId的对象，如果没有，返回空
   * @param productId 产品ID
   * @return cart
   */
  $scope.cartFind=function(productId){
    if(!$scope.listCart)$scope.listCart=[];
    for(var i=0; i<$scope.listCart.length; i++) {
      if($scope.listCart[i].productId===productId)
        return $scope.listCart[i]
    }
    return null;
  };
  /**
   * 在购物车里找到ProductId的对象，如果没有，创建一个
   * @param productId 产品ID
   * @return cart
   */
  $scope.cartCreate=function(productId){
    var cart= _.clone(_Cart);
    cart.productId=productId;
    cart.num=0;
    if(!$scope.listCart)$scope.listCart=[];
    $scope.listCart.push(cart);
    return cart;
  };
  /**
   * 在购物车删除productId的对象
   * @param productId 产品ID
   */
  $scope.cartDel=function(productId) {
    CommonService.confirm("是否确认将该商品从购物车移除?").then(function(res) {if(res) {
      var index = $scope.cartFindIndex(productId);
      if (index > -1) {
        $scope.listCart.remove(index);
      }

      Storage.set(LISTCART,$scope.listCart);

      if ($scope.listCart.length == 0) {
        $scope.listCart = null;
      }

      $scope.refereshPrice();
    } else {

    }});
  };
  /**
   * 在购物车里找到productId的对象的下标，用于购物车数组删除
   * @param productId 水站产品ID
   * @return int
   */
  $scope.cartFindIndex=function(productId){
    for(var i=0; i<$scope.listCart.length; i++) {
      if($scope.listCart[i].productId===productId)
        return i;
    }
    return -1;
  };
  /**
   * 重算价格
   */
  $scope.refereshPrice=function() {
    $scope.cartPrice = 0.0;

    if ($scope.listCart != null && $scope.listCart.length > 0) {
      for(var i=0; i<$scope.listCart.length; i++) {
        $scope.cartPrice += $scope.listCart[i].obj1.price * $scope.listCart[i].num;
      }
      $scope.cartPrice=$scope.cartPrice.toFixed(2);
    }
    // 通知购物车数量变化 (12-19 12:37:31)
    $scope.$emit('refereshCartNum', 'aaa');
  };


  //图片上传
  /**图片上传进度 %*/
  $scope.progressPercentage =0;
  /**图片上传错误信息*/
  $scope.errorMsg = null;
  /**
   * ng图片上传，多个控件的话，这个函数有一个即可
   * ex.$scope.upload(file, $scope.obj,"img1");
   * @param file 上传文件对象
   * @param obj 返回的URL放在这个对象中
   * @param attr 返回的URL放在这个对象的这个属性中
   */
  $scope.uploadPic = function(file, obj,attr) {
    $log.debug("$scope.uploadPic...");
    var clientInfo=Storage.get(CLIENT_INFO);
    var token=(clientInfo)?clientInfo.token:'';
    token =urlValueTranslation(token);
    file.upload = Upload.upload({
      url: restbase+'/upload',
      resumeSizeUrl: restbase+'/upload?name=' + encodeURIComponent(file.name)+"&token="+token,
      resumeChunkSize:100000,
      headers: {
        'optional-header': 'header-value'
      },
      data: {},
      file: file
    }).progress(function (evt) {
      //进度条
      $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $scope.progressPercentage = ($scope.progressPercentage>100)?100:$scope.progressPercentage;
      //$log.debug('progess:' + $scope.progressPercentage + '%,' + evt.config.file.name);
    }).success(function (data) {
      angular.forEach(data.result, function (item) {
        if(item.fieldName=='url'){
          //$log.debug(item.value);
          if(item.value!=null){
            obj[attr]=wbase+item.value;
          }
        }
      });
    });
    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    file.upload.xhr(function (xhr) {

    });
  };
  /**
   * Cordova的文件上传
   * ex.$scope.ftUpload(path,function(ret){var jr=jsonpObj2Obj(ret);});
   * @param fileURL 文件路径
   * @param succ 成功函数
   * @param fail 失败函数
   */
  $scope.ftUpload=function(fileURL,succ,fail) {
    var clientInfo=Storage.get(CLIENT_INFO);
    var token=(clientInfo)?clientInfo.token:'';
    token =urlValueTranslation(token);
    var options = new FileUploadOptions();
    options.fileKey = "file";   // 表单元素的名称。同input标签中的name属性。
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1); // 文件名称
    options.params = {token:token};
    $log.debug("token="+token);
    //$log.debug(options);
    var ft = new FileTransfer();
    // fileURL 待上传文件路径
    // encodeURI("***") 上传服务器路径
    ft.upload(fileURL, (wbase+"/filetransfer?name="+"&token="+token), succ, fail, options);
  }

  $scope.modelOptionsObj = function(){};//这个是angularjs文件上传用到的函数，可以是空函数，但必须要有，否则会出错。
  $scope.init();
  ctrlReinitMap.remove('tabCtrl');
});
