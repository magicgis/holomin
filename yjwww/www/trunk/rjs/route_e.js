/**使用者角色 '5':'会员','6':'医生'*/
var roleId=5;
/**
 * 配置路由
 */
app.config(function($stateProvider, $urlRouterProvider,$logProvider,ENV,$ionicConfigProvider) {
    $logProvider.debugEnabled(ENV.debug);
    $ionicConfigProvider.views.swipeBackEnabled(false);
  console.log("app.config.route");
    $stateProvider
        //菜单
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/pub_tcm/tabs.html",
            controller: 'tabCtrl'
        })
        ///////////////////////a
        //手机页首页配置详细
        .state('tab.Wwwhome', {
            url: '/Wwwhome',
            views: {
                'tab_e-a': {
                    controller: 'WwwhomeCtrl',
                    templateUrl: 'views/tab_e-a/Wwwhome.html'

                }
            }
        })
      .state('tab.putToken', {
        url: '/putToken/:id/:token',
        views: {
          'tab_e-a': {
            controller: 'putTokenCtrl',
            templateUrl: 'views/tab_e-a/Wwwhome.html'
          }
        }
      })
        //商品类型详细 ckey版
        .state('tab.ProductType', {
            url: '/ProductType/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        //内容频道
      .state('tab.CmschannelList', {
        url: '/CmschannelList/:act/:parentid',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/CmschannelList.html',
            controller: 'CmschannelListCtrl'
          }
        }
      })
      //内容频道
      .state('tab.RA_CmschannelList', {
        url: '/RA_CmschannelList/:act/:parentid',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/CmschannelList.html',
            controller: 'CmschannelListCtrl'
          }
        }
      })
      //内容频道
      .state('tab.RB_CmschannelList', {
        url: '/RB_CmschannelList/:act/:parentid',
        views: {
          'tab_e-b': {
            templateUrl: 'views/tab_e-a/CmschannelList.html',
            controller: 'CmschannelListCtrl'
          }
        }
      })
      .state('tab.RA_Cmscontent', {
        url: '/RA_Cmscontent/:id',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/Cmscontent.html',
            controller: 'CmscontentCtrl'
          }
        }
      })
      .state('tab.RB_Cmscontent', {
        url: '/RB_Cmscontent/:id',
        views: {
          'tab_e-b': {
            templateUrl: 'views/tab_e-a/Cmscontent.html',
            controller: 'CmscontentCtrl'
          }
        }
      })
      .state('tab.Cmscontent', {
        url: '/Cmscontent/:id',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/Cmscontent.html',
            controller: 'CmscontentCtrl'
          }
        }
      })
        .state('tab.RA_ProductType', {
            url: '/RA_ProductType/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        .state('tab.RB_ProductType', {
            url: '/RB_ProductType/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
        //商品类型详细 id版
        .state('tab.ProductType1', {
            url: '/ProductType1/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RA_ProductType1', {
            url: '/RA_ProductType1/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RB_ProductType1', {
            url: '/RB_ProductType1/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
        .state('tab.RC_ProductType1', {
            url: '/RC_ProductType1/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/ProductType.html',
                    controller: 'ProductType1Ctrl'
                }
            }
        })
      .state('tab.RA_receiveWay', {
        url: '/RA_receiveWay/:id',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-c/receiveWay.html',
            controller: 'OrderrCtrl'
          }
        }
      })
      .state('tab.RB_receiveWay', {
        url: '/RB_receiveWay/:id',
        views: {
          'tab_e-b': {
            templateUrl: 'views/tab_e-c/receiveWay.html',
            controller: 'OrderrCtrl'
          }
        }
      })
      .state('tab.RC_receiveWay', {
        url: '/RC_receiveWay/:id',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/receiveWay.html',
            controller: 'OrderrCtrl'
          }
        }
      })
      .state('tab.RD_receiveWay', {
        url: '/RD_receiveWay/:id',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-c/receiveWay.html',
            controller: 'OrderrCtrl'
          }
        }
      })
        //商品详细
        .state('tab.Product', {
            url: '/Product/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RA_Product', {
            url: '/RA_Product/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RB_Product', {
            url: '/RB_Product/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RC_Product', {
            url: '/RC_Product/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        .state('tab.RD_Product', {
            url: '/RD_Product/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        ///////////////////////a
        //轻松找药
        .state('tab.Freefinddrug', {
            url: '/Freefinddrug',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Freefinddrug.html'
                }
            }
        })
      ///////////////////////b
      //中医文化专题列表
      .state('tab.TopicList', {
        url: '/TopicList',
        views: {
          'tab_e-b': {
            templateUrl: 'views/tab_e-b/TopicList.html',
            controller: 'TopicListCtrl'
          }
        }
      })
        ///////////////////////a
        //科室找药的商品列表.新加了状态。如果为0.说明是道地药材，其他的为成品
        .state('tab.ProductList', {
            url: '/ProductList/:act',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductList.html',
                    controller: 'ProductListCtrl'
                }
            }
        })
        ///////////////////////a
        //药剂师列表
        .state('tab.DruggistList', {
            url: '/DruggistList',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/DruggistList.html',
                    controller: 'DruggistListCtrl'
                }
            }
        })
        //私人药师
      .state('tab.MemberdoctorList', {
        url: '/MemberdoctorList',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/MemberdoctorList.html',
            controller: 'MemberdoctorListCtrl'
          }
        }
      })
      //会员档案
      .state('tab.memberFile', {
        url: '/memberFile',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-d/memberFile.html',
            controller: 'myCtrl'
          }
        }
      })
        //名医名家分类列表
        //根据科室Id 找医生列表
      .state('tab.RA_DoctorList', {
        url: '/RA_DoctorList/:fromto/:productchannelId',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/DoctorList.html',
            controller: 'DoctorListCtrl'
          }
        }
      })
      //名医名家
      .state('tab.DoctorTypeList', {
        url: '/DoctorTypeList',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/DoctorTypeList.html',
            controller: 'doctorTypeListCtrl'
          }
        }
      })
      //名医名家之详情
      .state('tab.Doctor', {
        url: '/Doctor/:id',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/Doctor.html',
            controller: 'DoctorCtrl'
          }
        }
      })
        ///////////////////////a
        // 会员端 医患聊天记录列表
      .state('tab.DmmsgList', {
        url: '/DmmsgList/:fromto/:memberId/:doctorId',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/DmmsgList.html',
            controller: 'DmmsgListCtrl'
          }
        }
      })
        //预订医生
        .state('tab.DoctorSuggestion', {
            url: '/DoctorSuggestion',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/DoctorBooking.html',
                    controller: 'BookingCtrl'
                }
            }
        })
        //预订药品
        .state('tab.DrugSuggestion', {
            url: '/DrugSuggestion',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/DrugBooking.html',
                    controller: 'BookingCtrl'
                }
            }
        })
        //建设中跳转
        .state('tab.Madingpage', {
            url: '/Madingpage',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Madingpage.html'

                }
            }
        })
        //地图 A B C D
        .state('tab.RA_DrugstoreListMap', {
            url: '/RA_DrugstoreListMap',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
      //医生科室包含医生
      .state('tab.RA_DoctorTypeLinkDoctor', {
        url: '/RA_DoctorTypeLinkDoctor/:id',
        views: {
          'tab_e-a': {
            templateUrl: 'views/tab_e-a/DoctorTypeLinkDoctor.html',
            controller: 'doctorTypeLinkDoctorCtrl'
          }
        }
      })
        .state('tab.RB_DrugstoreListMap', {
            url: '/RB_DrugstoreListMap',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        //
        .state('tab.RC_DrugstoreListMap', {
            url: '/RC_DrugstoreListMap',
            views: {
                'tab_e-c': {
                    templateUrl: 'views/tab_e-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
        //
        .state('tab.RD_DrugstoreListMap', {
            url: '/RD_DrugstoreListMap',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-a/DrugstoreListMap.html',
                    controller: 'DrugstoreListMapCtrl'
                }
            }
        })
         //搜索
        .state('tab.RA_ProductListSearch', {
            url: '/RA_ProductListSearch/:kw',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/ProductList.html',
                    controller: 'ProductListSearchCtrl'
                }
            }
        })
        //搜索
        .state('tab.RB_ProductListSearch', {
            url: '/RB_ProductListSearch/:kw',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-a/ProductList.html',
                    controller: 'ProductListSearchCtrl'
                }
            }
        })
        //专题详细
        .state('tab.Topic', {
            url: '/Topic/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-a/Topic.html',
                    controller: 'TopicCtrl'
                }
            }
        })
        //专题详细
      .state('tab.RB_Topic', {
        url: '/RB_Topic/:id',
        views: {
          'tab_e-b': {
            templateUrl: 'views/tab_e-a/Topic.html',
            controller: 'TopicCtrl'
          }
        }
      })
        ///////////////////////b
        //商品类型详细2 带2级菜单
        .state('tab.ProductType2', {
            url: '/ProductType2/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-b/ProductType2.html',
                    controller: 'ProductType2Ctrl'
                }
            }
        })
        ///////////////////////c
        //购物车详细
        .state('tab.Cart', {
            url: '/Cart',
            views: {
                'tab_e-c': {
                    templateUrl: 'views/tab_e-c/Cart.html',
                    controller: 'CartCtrl'
                }
            }
        })
        /**
         * 收货地址list
         */
      .state('tab.UserAddrList', {
        url: '/UserAddrList/:id',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/UserAddrList.html',
            controller: 'UserAddrListCtrl'
          }
        }
      })
      .state('tab.UserAddr', {
        url: '/UserAddr/:id/:orderrId',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/UserAddr.html',
            controller: 'UserAddrCtrl'
          }
        }
      })

      //收货地址地图
      .state('tab.mapaddr', {
        cache: false,
        url: '/mapaddr',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/mapaddr.html',
            controller: 'mapaddrCtrl'
          }
        }
      })
        //确认订单页面
      .state('tab.orderrPay', {
        url: '/orderrPay/:id',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/orderrPay.html',
            controller: 'orderrPayCtrl'
          }
        }
      })
      //确认订单页面
      .state('tab.RD_orderrPay', {
        url: '/RD_orderrPay/:id',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-c/orderrPay.html',
            controller: 'orderrPayCtrl'
          }
        }
      })
        //购物车详细
        .state('tab.RA_Cart', {
            url: '/RA_Cart',
            views: {
                'tab_e-c': {
                    templateUrl: 'views/tab_e-c/Cart.html',
                    controller: 'CartCtrl'
                }
            }
        })
        ///////////////////////c
        //订单详细
        .state('tab.RA_Orderr', {
            url: '/RA_Orderr/:id',
            views: {
                'tab_e-a': {
                    templateUrl: 'views/tab_e-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RB_Orderr', {
            url: '/RB_Orderr/:id',
            views: {
                'tab_e-b': {
                    templateUrl: 'views/tab_e-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RC_Orderr', {
            url: '/RC_Orderr/:id',
            views: {
                'tab_e-c': {
                    templateUrl: 'views/tab_e-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        .state('tab.RD_Orderr', {
            url: '/RD_Orderr/:id',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-c/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
      .state('tab.DrugstoreList', {
        url: '/DrugstoreList/:act',
        views: {
          'tab_e-c': {
            templateUrl: 'views/tab_e-c/drugstoreList.html',
            controller: 'DrugstoreListCtrl'
          }
        }
      })

        ///////////////////////d
        //我的
        .state('tab.my', {
            url: '/my',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/my.html',
                    controller: 'myCtrl'
                }
            }
        })
      //我的药单
      .state('tab.mylist', {
        url: '/mylist',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-d/mylist.html',
            controller: 'myCtrl'
          }
        }
      })
        .state('tab.Yijian', {
            url: '/Yijian',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/yijian.html'
                }
            }
        })
      //关于我们
      .state('tab.aboutus', {
        url: '/aboutus',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-d/aboutus.html'
          }
        }
      })
        //设置
        .state('tab.Shezhi', {
            url: '/Shezhi',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/Shezhi.html',
                    controller: 'myCtrl'
                }
            }
        })
        //意见反馈
        .state('tab.Suggestion', {
            url: '/Suggestion',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/Suggestion.html',
                    controller: 'SuggestionCtrl'
                }
            }
        })
        //全部订单
        .state('tab.OrderrList', {
            url: '/OrderrList/:status',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        //修改账户
        .state('tab.Editmember', {
            url: '/Editmember',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/Editmember.html',
                    controller: 'myCtrl'
                    //controller: 'UserCtrl'

                }
            }
        })
        //修改密码
        .state('tab.User', {
            url: '/User/:id',
            views: {
                'tab_e-d': {
                    templateUrl: 'views/tab_e-d/User.html',
                    controller: 'UserCtrl'
                }
            }
        })
      //我的病历处方列表
      .state('tab.RD_myresumeprescriptionlist', {
        url: '/RD_myresumeprescriptionlist',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-d/myresumeprescriptionlist.html',
            controller: 'myresumeprescriptionlistCtrl'
          }
        }
      })
      //新增的病历处方
      .state('tab.myresumeprescription', {
        url: '/myresumeprescription',
        views: {
          'tab_e-d': {
            templateUrl: 'views/tab_e-d/myresumeprescription.html',
            controller: 'myresumeprescriptionCtrl'
          }
        }
      })
    $urlRouterProvider.otherwise('/tab/Wwwhome');

});
