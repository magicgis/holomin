/**使用者角色 '5':'会员','6':'医生'*/
var roleId=5;
/**
 * 配置路由
 */
app.config(function($stateProvider, $urlRouterProvider,$logProvider,ENV) {
    $logProvider.debugEnabled(ENV.debug);
    console.log("app.config.route");
    $stateProvider
        //菜单
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/pub/tabs.html",
            controller: 'tabCtrl'
        })
        ///////////////////////a
        //手机页首页配置详细
        .state('tab.Wwwhome', {
            url: '/Wwwhome',
            views: {
                'tab-a': {
                    controller: 'WwwhomeCtrl',
                    templateUrl: 'views/tab-a/Wwwhome.html'

                }
            }
        })
        //商品类型详细 ckey版
        .state('tab.ProductType', {
            url: '/ProductType/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        .state('tab.RA_ProductType', {
            url: '/RA_ProductType/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        .state('tab.RB_ProductType', {
            url: '/RB_ProductType/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        //商品类型详细 id版
        .state('tab.ProductType1', {
            url: '/ProductType1/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RA_ProductType1', {
            url: '/RA_ProductType1/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RB_ProductType1', {
            url: '/RB_ProductType1/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RC_ProductType1', {
            url: '/RC_ProductType1/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
      //
      .state('tab.RA_ProductTypeLinkProductList', {
        url: '/RA_ProductTypeLinkProductList/:id',
        views: {
          'tab-b': {
            templateUrl: 'views/tab-b/ProductTypeLinkProductList.html',
            controller: 'ProductTypeLinkProductListCtrl'
          }
        }
      })
      .state('tab.RB_ProductTypeLinkProductList', {
        url: '/RB_ProductTypeLinkProductList/:id',
        views: {
          'tab-b': {
            templateUrl: 'views/tab-b/ProductTypeLinkProductList.html',
            controller: 'ProductTypeLinkProductListCtrl'
          }
        }
      })
      .state('tab.RC_ProductTypeLinkProductList', {
        url: '/RC_ProductTypeLinkProductList/:id',
        views: {
          'tab-b': {
            templateUrl: 'views/tab-b/ProductTypeLinkProductList.html',
            controller: 'ProductTypeLinkProductListCtrl'
          }
        }
      })
        //商品详细
        .state('tab.Product', {
            url: '/Product/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RA_Product', {
            url: '/RA_Product/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RB_Product', {
            url: '/RB_Product/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RC_Product', {
            url: '/RC_Product/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RD_Product', {
            url: '/RD_Product/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        ///////////////////////a
        //商品目录列表
        .state('tab.ProductchannelList', {
            url: '/ProductchannelList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductchannelList.html',
                    controller: 'ProductchannelListCtrl'
                }
            }
        })
        ///////////////////////a
        //轻松找药
        .state('tab.Freefinddrug', {
            url: '/Freefinddrug',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/Freefinddrug.html'
                }
            }
        })
        ///////////////////////a
        //科室找药的商品列表
        .state('tab.ProductList', {
            url: '/ProductList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductList.html',
                    controller: 'ProductListCtrl'
                }
            }
        })
        ///////////////////////a
        //药剂师列表
        .state('tab.DruggistList', {
            url: '/DruggistList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/DruggistList.html',
                    controller: 'DruggistListCtrl'
                }
            }
        })
        ///////////////////////a
        //私人药师
        .state('tab.MemberdoctorList', {
            url: '/MemberdoctorList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })
        ///////////////////////a
        // 会员端 医患聊天记录列表
        .state('tab.DmmsgList', {
            url: '/DmmsgList/:fromto/:memberId/:doctorId',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
      .state('tab.doctorTypeList', {
        url: '/doctorTypeList',
        views: {
          'tab-a': {
            templateUrl: 'views/tab-a/doctorTypeList.html',
            controller: 'doctorTypeListCtrl'
          }
        }
      })
      //根据科室Id 找医生列表
      .state('tab.RA_DoctorList', {
        url: '/RA_DoctorList/:fromto/:productchannelId',
        views: {
          'tab-a': {
            templateUrl: 'views/tab-a/DoctorList.html',
            controller: 'DoctorListCtrl'
          }
        }
      })
        //预订医生
        .state('tab.DoctorSuggestion', {
            url: '/DoctorSuggestion',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/DoctorBooking.html',
                    controller: 'BookingCtrl'
                }
            }
        })
        //预订药品
        .state('tab.DrugSuggestion', {
            url: '/DrugSuggestion',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/DrugBooking.html',
                    controller: 'BookingCtrl'
                }
            }
        })
        //建设中跳转
        .state('tab.Madingpage', {
            url: '/Madingpage',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/Madingpage.html'

                }
            }
        })
      //pay
      .state('tab.payPage', {
        url: '/payPage/:memId/:docId',
        views: {
          'tab-a': {
            templateUrl: 'views/tab-a/payPage.html',
              controller:'payPageCtrl'
          }
        }
      })
      .state('tab.Doctor', {
        url: '/Doctor/:id',
        views: {
          'tab-a': {
            templateUrl: 'views/tab-a/Doctor.html',
            controller:'DoctorCtrl'

          }
        }
      })
        //地图 A B C D
        .state('tab.RA_DrugstoreListMap', {
            url: '/RA_DrugstoreListMap',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        .state('tab.RB_DrugstoreListMap', {
            url: '/RB_DrugstoreListMap',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        //
        .state('tab.RC_DrugstoreListMap', {
            url: '/RC_DrugstoreListMap',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        //
        .state('tab.RD_DrugstoreListMap', {
            url: '/RD_DrugstoreListMap',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        //搜索
        .state('tab.RA_ProductListSearch', {
            url: '/RA_ProductListSearch/:kw',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/ProductList.html',
                    controller: 'ProductListSearchCtrl'
                }
            }
        })
        //搜索
        .state('tab.RB_ProductListSearch', {
            url: '/RB_ProductListSearch/:kw',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-a/ProductList.html',
                    controller: 'ProductListSearchCtrl'
                }
            }
        })
      .state('tab.RC_ProductListSearch', {
        url: '/RC_ProductListSearch/:kw',
        views: {
          'tab-b': {
            templateUrl: 'views/tab-a/ProductList.html',
            controller: 'ProductListSearchCtrl'
          }
        }
      })
        //专题详细
        .state('tab.Topic', {
            url: '/Topic/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-a/Topic.html',
                    controller: 'TopicCtrl'
                }
            }
        })

        ///////////////////////b
        //商品类型详细2 带2级菜单
        .state('tab.ProductType2', {
            url: '/ProductType2/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-b/ProductType2.html',
                    controller: 'ProductType2Ctrl'
                }
            }
        })
        ///////////////////////c
        //购物车详细
        .state('tab.Cart', {
            url: '/Cart',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/Cart.html',
                    controller: 'CartCtrl'
                }
            }
        })
        //购物车详细
        .state('tab.RA_Cart', {
            url: '/RA_Cart',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/Cart.html',
                    controller: 'CartCtrl'
                }
            }
        })
        ///////////////////////c
        //订单详细
        .state('tab.RA_Orderr', {
            url: '/RA_Orderr/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RB_Orderr', {
            url: '/RB_Orderr/:id',
            views: {
                'tab-b': {
                    templateUrl: 'views/tab-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RC_Orderr', {
            url: '/RC_Orderr/:id',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RD_Orderr', {
            url: '/RD_Orderr/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
    /**
     * 收货方式
     */
        .state('tab.RA_receiveWay', {
            url: '/RA_receiveWay/:id',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/receiveWay.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RB_receiveWay', {
            url: '/RB_receiveWay/:id',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/receiveWay.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RC_receiveWay', {
            url: '/RC_receiveWay/:id',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/receiveWay.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RD_receiveWay', {
            url: '/RD_receiveWay/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-c/receiveWay.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
    /**
     * 收货地址list
     */
        .state('tab.UserAddrList', {
            url: '/UserAddrList/:id',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/UserAddrList.html',
                    controller: 'UserAddrListCtrl'
                }
            }
        })
        .state('tab.UserAddr', {
            url: '/UserAddr/:id/:orderrId',
            views: {
                'tab-c': {
                    templateUrl: 'views/tab-c/UserAddr.html',
                    controller: 'UserAddrCtrl'
                }
            }
        })

        ///////////////////////d
        //我的
        .state('tab.my', {
            url: '/my',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/my.html',
                    controller: 'myCtrl'
                }
            }
        })
        .state('tab.Yijian', {
            url: '/Yijian',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/yijian.html'
                }
            }
        })
        //设置
        .state('tab.Shezhi', {
            url: '/Shezhi',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/Shezhi.html',
                    controller: 'myCtrl'
                }
            }
        })
        //意见反馈
        .state('tab.Suggestion', {
            url: '/Suggestion',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/Suggestion.html',
                    controller: 'SuggestionCtrl'
                }
            }
        })
        //全部订单
        .state('tab.OrderrList', {
            url: '/OrderrList/:status',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        //修改账户
        .state('tab.Editmember', {
            url: '/Editmember',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/Editmember.html',
                    controller: 'myCtrl'
                    //controller: 'UserCtrl'

                }
            }
        })
        //修改密码
        .state('tab.User', {
            url: '/User/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/User.html',
                    controller: 'UserCtrl'
                }
            }
        })
        //会员档案
        .state('tab.memberFile', {
            url: '/memberFile',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/memberFile.html',
                    controller: 'myCtrl'
                }
            }
        })

        //病历详细
        .state('tab.Medicalrec', {
            url: '/Medicalrec/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/Medicalrec.html',
                    controller: 'MedicalrecCtrl'
                }
            }
        })
        //病历列表
        .state('tab.MedicalrecList', {
            url: '/MedicalrecList',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecList.html',
                    controller: 'MedicalrecListCtrl'
                }
            }
        })
        //病历之病史页面列表
        .state('tab.MedicalrecPageList', {
            url: '/MedicalrecPageList',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecPageList.html',
                    controller: 'MedicalrecPageListCtrl'
                }
            }
        })
        //病历之病史页面详细
        .state('tab.MedicalrecPage', {
            url: '/MedicalrecPage/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecPage.html',
                    controller: 'MedicalrecPageCtrl'
                }
            }
        })
        //病历之检查报告列表
        .state('tab.MedicalrecRptList', {
            url: '/MedicalrecRptList',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecRptList.html',
                    controller: 'MedicalrecRptListCtrl'
                }
            }
        })
        //病历之检查报告详细
        .state('tab.MedicalrecRpt', {
            url: '/MedicalrecRpt/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecRpt.html',
                    controller: 'MedicalrecRptCtrl'
                }
            }
        })
        //病历之健康指标列表
        .state('tab.MedicalrecHealthList', {
            url: '/MedicalrecHealthList',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecHealthList.html',
                    controller: 'MedicalrecHealthListCtrl'
                }
            }
        })
        //病历之健康指标详细
        .state('tab.MedicalrecHealth', {
            url: '/MedicalrecHealth/:id',
            views: {
                'tab-d': {
                    templateUrl: 'views/tab-d/MedicalrecHealth.html',
                    controller: 'MedicalrecHealthCtrl'
                }
            }
        })
      //临时测试
      .state('tab.tmp', {
        url: '/tmp',
        views: {
          'tab-d': {
            templateUrl: 'views/tab-d/tmp.html',
            controller: 'tmpCtrl'
          }
        }
      })
    ;
    $urlRouterProvider.otherwise('/tab/Wwwhome');

});
