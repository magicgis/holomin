/**使用者角色 '5':'会员','6':'医生'*/
var roleId=6;
/**
 * 商家-配置路由
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
            templateUrl: "views/pub_tcm/tabs_b.html",
            controller: 'tabCtrl'
        })

        ///////////////////a1

        //首页
        .state('tab.Home', {
            url: '/Home',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/Home.html',
                    controller: 'HomeCtrl'
                }
            }
        })

        // 我的二维码
        .state('tab.RA_DoctorQrcode', {
            url: '/RA_DoctorQrcode/:id',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-d/DoctorQrcode.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        //诊室坐诊中医患列表
        .state('tab.RA_MemberDoctorList', {
            url: '/RA_MemberDoctorList',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-b/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })
        //医患聊天记录列表
        .state('tab.RA_DmmsgList', {
            url: '/RA_DmmsgList/:fromto/:memberId/:doctorId',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-b/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
        ////查看病例单列表
        .state('tab.RA_OrderrList', {
            url: '/RA_OrderrList/:act/:memberId',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        ////订单详细
        .state('tab.RA_Orderr', {
            url: '/RA_Orderr/:id',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////：开药笺
        .state('tab.RA_Orderryaojian', {
            url: '/RA_Orderryaojian/:id',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/Orderryaojian.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
      .state('tab.RA_DrugstoreList', {
        url: '/RA_DrugstoreList/:act',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-a/drugstoreList.html',
            controller: 'DrugstoreListCtrl'
          }
        }
      })
      .state('tab.RB_DrugstoreList', {
        url: '/RB_DrugstoreList/:act',
        views: {
          'tab_f-b': {
            templateUrl: 'views/tab_f-a/drugstoreList.html',
            controller: 'DrugstoreListCtrl'
          }
        }
      })

        ///////////////////a2

        //药品服务列表
        .state('tab.RA_ProductTypeList', {
            url: '/RA_ProductTypeList',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/ProductTypeList.html',
                    controller: 'ProductTypeListCtrl'
                }
            }
        })
        //云药房搜索
        .state('tab.RA_ProductListSearch', {
            url: '/RA_ProductListSearch/:kw',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/ProductListSearch.html',
                    controller: 'ProductListSearchCtrl'
                }
            }
        })
        ////商品类型包含商品列表
        .state('tab.RA_ProductTypeLinkProduct', {
            url: '/RA_ProductTypeLinkProduct',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/ProductTypeLinkProductList.html',
                    controller: 'ProductTypeLinkProductListCtrl'
                }
            }
        })
        ////商品详细
        .state('tab.RA_Product', {
            url: '/RA_Product/:act/:id',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        ///////////////////a3

        //药品服务列表
      .state('tab.ProductchannelList', {
        url: '/RA_ProductchannelList',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_b-a/ProductchannelList.html',
            controller: 'ProductchannelListCtrl'
          }
        }
      })
        ///////////////////a4
      //产品列表
      .state('tab.ProductList', {
        url: '/RA_ProductList',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_b-a/ProductList.html',
            controller: 'ProductListCtrl'
          }
        }
      })
        ////医生的药架列表
        .state('tab.RA_DoctorProductList', {
            url: '/RA_DoctorProductList/:act',
            views: {
                'tab_f-a': {
                    templateUrl: 'views/tab_f-a/DoctorProductList.html',
                    controller: 'DoctorProductListCtrl'
                }
            }
        })

        ////医生的常用处方0表示从首页过来、1表示从开具药笺过来
      .state('tab.RA_PrescriptList', {
        url: '/RA_PrescriptList/:act',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-a/PrescriptList.html',
            controller: 'PrescriptListCtrl'
          }
        }
      })
      ////药方添加
      .state('tab.RA_PrescriptCreate', {
        url: '/RA_PrescriptCreate/:act',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-a/PrescriptCreate.html',
            controller: 'PrescriptCreateCtrl'
          }
        }
      })

      //医生的处方药品列表
      .state('tab.RA_PrescriptProductList', {
        url: '/RA_PrescriptProductList/:id',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-a/PrescriptProductList.html',
            controller: 'PrescriptProductListCtrl'
          }
        }
      })
      //医生的处方药品明细
      .state('tab.RA_PrescriptProduct', {
        url: '/RA_PrescriptProduct/:id',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-a/PrescriptProduct.html',
            controller: 'PrescriptProductCtrl'
          }
        }
      })
        ///////////////////b

        //tab里的患者
        .state('tab.MemberDoctorList', {
            url: '/MemberDoctorList',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-b/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })
      //  修改密码
      .state('tab.RA_User', {
        url: '/RA_User/:id',
        views: {
          'tab_f-a': {
            templateUrl: 'views/tab_f-d/User.html',
            controller: 'UserCtrl'
          }
        }
      })
      //云药房搜索
      .state('tab.RB_ProductListSearch', {
        url: '/RB_ProductListSearch',
        views: {
          'tab_f-b': {
            templateUrl: 'views/tab_f-a/ProductListSearch.html',
            controller: 'ProductListSearchCtrl'
          }
        }
      })
      ////商品详细
      .state('tab.RB_Product', {
        url: '/RB_Product/:act/:id',
        views: {
          'tab_f-b': {
            templateUrl: 'views/tab_f-a/Product.html',
            controller: 'ProductCtrl'
          }
        }
      })
        //医患聊天记录列表
        .state('tab.RB_DmmsgList', {
            url: '/RB_DmmsgList/:fromto/:memberId/:doctorId',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-b/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
        ////查看病例单列表
        .state('tab.RB_OrderrList', {
            url: '/RB_OrderrList/:act/:memberId',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        ////订单详细
        .state('tab.RB_Orderr', {
            url: '/RB_Orderr/:id',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////开药笺
        .state('tab.RB_Orderryaojian', {
            url: '/RB_Orderryaojian/:id',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-a/Orderryaojian.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////医生药架
        .state('tab.RB_DoctorProductList', {
            url: '/RB_DoctorProductList/:act',
            views: {
                'tab_f-b': {
                    templateUrl: 'views/tab_f-a/DoctorProductList.html',
                    controller: 'DoctorProductListCtrl'
                }
            }
        })

        ///////////////////C
        .state('tab.fuwu', {
            url: '/fuwu',
            views: {
                'tab_f-c': {
                    templateUrl: 'views/tab_f-c/fuwu.html'

                }
            }
        })
      //电话页
      .state('tab.RC_phone', {
        url: '/RC_phone',
        views: {
          'tab_f-c': {
            templateUrl: 'views/tab_f-c/phone.html'
          }
        }
      })
        ///////////////////d

        //////我的
        .state('tab.my', {
            url: '/my',
            views: {
                'tab_f-d': {
                    controller: 'myCtrl',
                    templateUrl: 'views/tab_f-d/my.html'

                }
            }
        })
        ///// 我的结算
        .state('tab.RD_DoctorCount', {
            url: '/RD_DoctorCount/:id',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/DoctorCount.html',
                    controller: 'StatiAllDoctorCtrl'
                }
            }
        })
        ///// 我的结算
      .state('tab.RD_StatiDoctorMonthList', {
        url: '/RD_StatiDoctorMonthList',
        views: {
          'tab_f-d': {
            templateUrl: 'views/tab_f-d/DoctorCount.html',
            controller: 'StatiDoctorMonthListCtrl'
          }
        }
      })
        /////订单列表
        .state('tab.RD_OrderrList', {
            url: '/RD_OrderrList/:act/:memberId',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        /////资质上传
      .state('tab.RD_qualificationupload', {
        url: '/RD_qualificationupload/:id',
        views: {
          'tab_f-d': {
            templateUrl: 'views/tab_f-d/qualificationupload.html',
            controller: 'qualificationuploadCtrl'
          }
        }
      })
        ////订单详细
        .state('tab.RD_Orderr', {
            url: '/RD_Orderr/:id',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        //建设中跳转
        .state('tab.RD_myserve', {
            url: '/RD_myserve',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/myserve.html'
                }
            }
        })

        // 我的二维码
        .state('tab.RD_DoctorQrcode', {
            url: '/RD_DoctorQrcode/:id',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/DoctorQrcode.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        // 信息修改
        .state('tab.RD_Editdoctor', {
            url: '/RD_Editdoctor',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/Editdoctor.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        //  修改密码
        .state('tab.RD_User', {
            url: '/RD_User/:id',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/User.html',
                    controller: 'UserCtrl'
                }
            }
        })


        //设置
        .state('tab.RD_Shezhi', {
            url: '/RD_Shezhi',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/Shezhi.html',
                    controller: 'myCtrl'
                }
            }
        })
        //关于易健
        .state('tab.RD_yijian', {
            url: '/RD_yijian',
            views: {
                'tab_f-d': {
                    templateUrl: 'views/tab_f-d/yijian.html'
                }
            }
        })
        //////我的
        .state('tab.tmp1', {
            url: '/tmp1',
            views: {
                'tab_f-d': {
                    controller: 'tmp1Ctrl',
                    templateUrl: 'views/tab_f-d/tmp1.html'

                }
            }
        })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/Home');
});
