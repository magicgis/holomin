/**
 * 各种定制化的服务
 */

appservice
/**
 * http ajax注入
 */
  .factory('sessionInjector', ['$rootScope','$q','Storage', function($rootScope, $q,Storage) {
    return{
      'request': function(config) {
        //console.log("request");
        //config.header.xx=111;
        if(config.params){
          config.params.ver=_ClientInfo.ver;
          var clientInfo=Storage.get(CLIENT_INFO);
          if(clientInfo){
            if(clientInfo.cli)config.params.cli=clientInfo.cli;
            if(clientInfo.openid)config.params.openid=clientInfo.openid;
            if(clientInfo.openidmd5)config.params.openidmd5=clientInfo.openidmd5;
            if(clientInfo.token)config.params.token=clientInfo.token;
          }else{
            config.params.cli=_ClientInfo.cli;
          }
        }
        if(config.headers){
          //改变HEADER会改变请求结构，要服务器支持
          //config.headers["xx"]=111;
          //config.headers.yy=222;
        }
        //console.log(config);
        return config || $q.when(config);
      },
      'requestError': function(rejection) {
        //console.log('requestError:' + rejection);
        return rejection;
      },
      //success -> don't intercept
      'response': function(response) {
        //console.log('response:' + response);
        return  response || $q.when(response);
      },
      //error -> if 401 save the request and broadcast an event
      'responseError': function(response) {
        //console.log('responseError:');
        //console.log( response);
        if (response.status === 401) {
          var deferred = $q.defer(),
            req = {
              config: response.config,
              deferred: deferred
            };
          //$rootScope.requests401.push(req);
          $rootScope.$broadcast('event.NeedLoginException','serv');
          return deferred.promise;
        }
        if (response.status === 406) { //NOT_ACCEPTABLE
          var deferred = $q.defer();
          $rootScope.$broadcast('event.alertm',response.data);
          return deferred.promise;
        }
        return $q.reject(response);
      }
    };
  }])
  //本地存储
  .factory('Storage', function() {
    "use strict";
    return {
      /**
       * 保存对象
       * @param key
       * @param data
       * @returns {*}
       */
      set: function(key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      /**
       * 取出对象
       * @param key
       * @returns {*}
       */
      get: function(key) {
        return window.JSON.parse(window.localStorage.getItem(key));
      },
      /**
       * 删除
       * @param key
       * @returns {*}
       */
      remove: function(key) {
        return window.localStorage.removeItem(key);
      },
      /**
       * 清空
       * @returns {*}
       */
      clear: function() {
        return window.localStorage.clear();
      }
    };
  })
  //埋点服务
  .factory('PpService', function($http, $rootScope, $q, ENV) {
    return {
      /**
       * 注册a
       * @param username 用户名/手机号
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      send: function(key,ppid) {
        console.log("putPoint:"+key+","+ppid);
        var url =ENV.api+"/putpoint";
        $http({
          method: 'GET',
          url: url,
          params: {key:key,ppid:ppid}
        }).success();
      }
    };
  })
  //注册登录服务
  .factory('RegService', function($http, $rootScope, $q, ENV, Storage) {
    return {
      /**
       * 注册a
       * @param username 用户名/手机号
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      rega: function(username) {
        var deferred = $q.defer();
        var url =ENV.api+"/rega";
        $http({
          method: 'GET',
          url: url,
          params: {username:username}
        }).success(
          function (data, status, header, config) {
            deferred.resolve(data);
          }
        );

        return deferred.promise;
      },
      /**
       * 注册b
       * @param username 用户名/手机号
       * @param imgcaptcha 图验码
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      regb: function(smscode,imgcaptcha) {
        var deferred = $q.defer();
        var url =ENV.api+"/regb";
        $http({
          method: 'GET',
          url: url,
          params: {username:username,captcha:imgcaptcha}
        }).success(
          function (data, status, header, config) {
            deferred.resolve(data);
          }
        );

        return deferred.promise;
      },
      /**
       * 注册c
       * @param user
       * @param member
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      regcb: function(user,member) {
        var deferred = $q.defer();
        var url =ENV.api+"/regc";
        var usermember=_.extend(user, member);

        $http({
          method: 'GET',
          url: url,
          params: usermember
        }).success(
          function (data, status, header, config) {
            deferred.resolve(data);
          }
        );
        return deferred.promise;
      },
      /**
       * 消费者登录
       * @param user
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      dologin: function(user) {
        var deferred = $q.defer();
        var url =ENV.api+"/dologin";
        $http({
          method: 'GET',
          url: url,
          params: {username:user.username,password:user.password,roleId:user.roleId,isauto:user.isauto}
        }).success(
          function (data, status, header, config) {
            deferred.resolve(data);
          }
        );
        return deferred.promise;
      },
      /**
       * 商家登录
       * @param user
       * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
       */
      dologin1: function(user) {
        var deferred = $q.defer();
        var url =ENV.api+"/dologin1";
        $http({
          method: 'GET',
          url: url,
          params: {username:user.username,password:user.password}
        }).success(
          function (data, status, header, config) {
            deferred.resolve(data);
          }
        );
        return deferred.promise;
      },
      getAndroidVersion: function() {

        return $http.post(ENV.api + "/getAndroidVersion.html")
          .success(function(data, status, headers, config) {
            $rootScope.$broadcast('lxs.AndroidVersionUpdate', data);
          });
      }
    };
  })
  .factory('CommonService', function($http, $rootScope, $ionicPopup, ENV, Storage) {

    return {
      /**
       * 弹警告信息窗口，
       * 使用方法 CommonService.alertm('消息','标题').then(function (res) {});
       * @param msg
       * @param title 可以为空
       * @returns {Object|*}
       */
      alertm: function(msg,title){
        return alertPopup = $ionicPopup.alert({
          title: title ? title : PRJCNAME,
          template: msg ,
          okText:'确定',
          okType: 'button-positive'
        });
      },
      /**
       * 二次确认窗口
       * 使用方法 CommonService.confirm('消息','标题').then(function(res) {if(res) {} else {}});
       * @param msg
       * @param title
       */
      confirm: function(msg,title) {
        return confirmPopup = $ionicPopup.confirm({
          title: title ? title : PRJCNAME ,
          template: msg ,
          cancelText: '取消', // String (default: 'Cancel'). The text of the Cancel button.
          okText: '确定'
        });
      },
      /**
       * 获取IOS版本号
       * @returns {*}
       */
      getIOSVersion: function() {
        return $http.post(ENV.api + "/getIOSVersion.html")
          .success(function(data, status, headers, config) {
            $rootScope.$broadcast('lxs.IOSVersionUpdate', data);
          });
      },
      getAndroidVersion: function() {

        return $http.post(ENV.api + "/getAndroidVersion.html")
          .success(function(data, status, headers, config) {
            $rootScope.$broadcast('lxs.AndroidVersionUpdate', data);
          });
      }
    };
  })

  .filter('link', function($sce) {
    return function(content) {
      if (typeof content === 'string') {
        var userLinkRegex = /href="\/user\/([\S]+)"/gi;
        var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
        var externalLinkRegex = /href="((?!#\/user\/)[\S]+)"/gi;
        return $sce.trustAsHtml(
          content
            .replace(userLinkRegex, 'href="#/user/$1"')
            .replace(noProtocolSrcRegex, 'src="https://$1"')
            .replace(externalLinkRegex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"")
        );
      }
      return content;
    };
  })
  .filter('protocol', function() {
    return function(src) {
      // add https protocol
      if (/^\/\//gi.test(src)) {
        return 'https:' + src;
      } else {
        return src;
      }
    };
  })
  .filter('avatarFilter', function() {
    return function(src) {
      // add https protocol
      if (src) {
        src = src.replace("https://avatars.githubusercontent.com", "http://7xj5bc.com1.z0.glb.clouddn.com");
        src = src + "&imageView2/2/w/120";
      }
      return src;
    };
  })
  .filter('rxFilter', function() {
    return function(src) {
      if (src) {
        src = src + "&imageView2/2/w/120";
      }
      return src;
    };
  })
  //显示HTML
  //使用方法：<p ng-bind-html="product.txt | to_trusted"></p>
  .filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])
  // Collection-repeat image recycling while loading
  // https://github.com/driftyco/ionic/issues/1742
  //使用方法：<img reset-img ng-src="{{wwwhome.headimg2}}" imgType="TOP2" />
  //imgType:Doc医生头像，Mem患者头像
  .directive('resetImg', function($document) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attributes) {
        var applyNewSrc = function(src) {
          var imgType=$attributes.resetImg
          if(isblank(src) || src==''){
            if(imgType=='Doc'){
              src="res/img/yishengtouxiang.png";
            }else if(imgType=='Mem'){
              src="res/img/touxiang.png";
            }else if(imgType=='Blank'){
              src="res/img/blank.png"; //一张1PX的透明空白图
            }else{
              src="res/img/ccc.jpg";
            }
          }
          else if((src.indexOf("http://")==0 || src.indexOf("https://")==0)){

          }else{
            src=imgbase+src;
          }

          var newImg = $element.clone(true);

          newImg.attr('src', src);
          newImg.attr('ng-src', src);
          $element.replaceWith(newImg);
          $element = newImg;
        };

        $attributes.$observe('src', applyNewSrc);
        $attributes.$observe('ngSrc', applyNewSrc);
      }
    };
  })
  //要求：路由中要有相应的RA/B/C/D_xxx
  //tab.html中，点击TAB，pubnowtab被赋值
  // 自动tab,在链接后面加上之前的ABCD <a href="#/tab/Product/{{11+22}}" auto-tab ></a>
  .directive('autoTab', function($compile) {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        var href=attrs.href;
        href="#/tab/R"+pubnowtab+"_"+href.substring(6);;
        var newele = ele.clone(true);
        newele.attr('href', href);
        newele.attr('ng-href', href);
        ele.replaceWith(newele);
        ele = newele;
        $compile(ele.contents())(scope);
      }
    };
  })
  //埋点，用法
  //<a href="#/tab/my" put-point="key2" ppid="3">{{111+222}}</a>
  //<button put-point="key1" ppid="{{ppp.id}}" ng-click ="nowtabs('D')">按钮{{33+44}}</button>
  .directive('putPoint', function($compile,$timeout,$http,ENV) {
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        ele.bind('click', function() {
          $timeout(function() {
            //console.log("putPoint:"+attrs.putPoint+","+attrs.ppid);
            var url =ENV.api+"/putpoint";
            $http({
              method: 'GET',
              url: url,
              params: {key:attrs.putPoint,ppid:attrs.ppid}
            });

          }, 0);
        });
      }
    };
  })
/**
 * 动态编译，可以在html中放置ng-click等
 * see http://stackoverflow.com/questions/18157305/angularjs-compiling-dynamic-html-strings-from-database
 * 使用方法 <div dynamic="obj.msg"></div>
 */
  .directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  })
  // 防重复提交 使用方法在标签中写 forbid-Re-Submit
  .directive('forbidReSubmit', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attributes) {
        $element.on('$destroy', function() {
          $element.attr('disabled', false);
        });
        $element.bind('click', function() {
          $timeout(function() {
            $element.attr('disabled', true);
          }, 5000);
        });
      }
    };
  })
  /*
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'AE',
      link: function(scope, element, attributes) {
        scope.$watch(attributes.hideTabs, function(value){
          $rootScope.hideTabs = value;
        });

        scope.$on('$destroy', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
   */
  /*   */
  //使用,1.tabs页面<ion-tabs class="tabs-icon-top tabs-positie {{hideTabs}}> ...</ion-tabs>
  //2.跳转后页面:<ion-view hide-tabs>..</ion-view>
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'AE',
      link: function($scope) {
        $rootScope.hideTabs = 'tabs-item-hide';
        $scope.$on('$destroy', function() {
          $rootScope.hideTabs = ' ';
        });
      }
    };
   })

;

appservice
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
  }]);

Array.prototype.remove=function(dx) {
  if(isNaN(dx)||dx>this.length) {
    return false;
  }
  for(var i=0,n=0;i<this.length;i++) {
    if(this[i]!=this[dx]) {
      this[n++]=this[i]
    }
  }
  this.length-=1
}
