/**
 * 服务:Wx，微信JSAPI
 * 使用方法：
 *         WxService.config().then(function (data) {
            console.log("my.js config then ");
            WxService.getLocation().then(function(lnglat){
                $scope.lnglat=lnglat;
            });
         });
 */
appservice
    .service('WxService', function($resource, $rootScope,$q,$http,$log,Storage,ENV) {
        $log.debug("WxService in");
        var configed=false;
        var latitude;
        var longitude;
        return {
            /**
             * 配置
             * @param wxConfig
             */
            config: function () {
                var deferred = $q.defer();
                /*
                if(configed){
                    deferred.resolve();
                    return deferred.promise;
                }
                */
                var url =ENV.api+"/wxConfig";
                var thisurl=location.href.split('#')[0]; //不用encodeURIComponent
                $http({
                    method: 'GET',
                    url: url,
                    params:{surl:thisurl}
                }).success(
                    function (data, status, header, config) {
                        //wxConfig=data.obj["wxConfig"];
                        $log.debug("wx config");
                        wxConfig=data;
                        $log.debug(wxConfig);
                        wx.config({
                            debug: false, // 开启调试模式
                            appId: wxConfig.appId, // 必填，公众号的唯一标识
                            timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                            nonceStr: wxConfig.noncestr, // 必填，生成签名的随机串
                            signature: wxConfig.signature,// 必填，签名，见附录1
                            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
                        });
                        /*以后试下在config加success参数*/
                        wx.ready(function(){
                            $log.debug("if debug is true then you will see config.wx.ready");
                            configed=true;
                            deferred.resolve();
                        });
                        wx.error(function(res){
                            $log.debug("config.wx.error");
                            console.log(res);
                            configed=false;
                            deferred.reject(res);
                        });

                    }
                );
                return deferred.promise;
            },
            /**
             * 获取当前GPS定位信息
             * ex.WxService.config().then(function (data) {WxService.getLocation().then(function(lnglat){$scope.lnglat=lnglat;});});
             * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
             */
            getLocation:function(){
                var deferred = $q.defer();
                wx.getLocation({
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        deferred.resolve([longitude,latitude]);
                     }
                });
                return deferred.promise;
            },
            /**
             * 扫一扫
             * @param _needResult 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
             * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
             */
            scanQRCode:function(_needResult){
                var thisNeedResult=(_needResult)?_needResult:0;
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        deferred.resolve(result);
                    }
                });
                return deferred.promise;
            },
            /**
             * 支付请求
             * @param waJsapiPaymentParam _WaJsapiPaymentParam={appid:"",timestamp1:0,noncestr:"",package1:"",signtype:"MD5",paysign:""}
             * @returns {.watchAcceleration.promise|*|promise|fd.g.promise|qFactory.Deferred.promise}
             */
            pay:function(waJsapiPaymentParam){
              var deferred = $q.defer()
                wx.chooseWXPay({
                    timestamp: waJsapiPaymentParam.timestamp1, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: waJsapiPaymentParam.noncestr, // 支付签名随机串，不长于 32 位
                    package: waJsapiPaymentParam.package1, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: waJsapiPaymentParam.signtype, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: waJsapiPaymentParam.paysign, // 支付签名
                    success: function (res) {
                        //CommonService.alertm(res).then(function (res) {});
                        console.log("wx.chooseWXPay success");
                        console.log(res);
                        deferred.resolve(res);
                    }
//                    ,
//                    fail:function (res) {
//                        console.log("wx.chooseWXPay fail");
//                        console.log(res);
//                        deferred.reject(res);
//                    }
                });
                return deferred.promise;
            },
            tmp1:function(){
                return 0;
            },
            tmp:function(){
                return 0;
            }
        };
    });
