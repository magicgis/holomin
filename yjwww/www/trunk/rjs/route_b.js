/**使用者角色 '5':'会员','6':'医生'*/
var roleId=6;
/**
 * 商家-配置路由
 */
app.config(function($stateProvider, $urlRouterProvider,$logProvider,ENV) {
    $logProvider.debugEnabled(ENV.debug);
    console.log("app.config.route");
    $stateProvider

        //菜单
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/pub/tabs_b.html",
            controller: 'tabCtrl'
        })

        ///////////////////a1

        //首页
        .state('tab.ProductTypeLinkProductListHome', {
            url: '/ProductTypeLinkProductListHome',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/ProductTypeLinkProductListHome.html',
                    controller: 'ProductTypeLinkProductListHomeCtrl'
                }
            }
        })

        // 我的二维码
        .state('tab.RA_DoctorQrcode', {
            url: '/RA_DoctorQrcode/:id',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-d/DoctorQrcode.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        //诊室坐诊中医患列表
        .state('tab.RA_MemberDoctorList', {
            url: '/RA_MemberDoctorList',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-b/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })
        //医患聊天记录列表
        .state('tab.RA_DmmsgList', {
            url: '/RA_DmmsgList/:fromto/:memberId/:doctorId',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-b/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
        ////查看病例单列表
        .state('tab.RA_OrderrList', {
            url: '/RA_OrderrList/:act/:memberId',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        ////订单详细
        .state('tab.RA_Orderr', {
            url: '/RA_Orderr/:id',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////：开药笺
        .state('tab.RA_Orderryaojian', {
            url: '/RA_Orderryaojian/:id',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/Orderryaojian.html',
                    controller: 'OrderrCtrl'
                }
            }
        })


        ///////////////////a2

        //药品服务列表
        .state('tab.RA_ProductchannelList', {
            url: '/RA_ProductchannelList',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/ProductchannelList.html',
                    controller: 'ProductchannelListCtrl'
                }
            }
        })
        //产品列表
        .state('tab.RA_ProductList', {
            url: '/RA_ProductList',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/ProductList.html',
                    controller: 'ProductListCtrl'
                }
            }
        })
        ////商品详细
        .state('tab.RA_Product', {
            url: '/RA_Product/:act/:id',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
        ///////////////////a3

        //建设中跳转
        .state('tab.RA_Madingpage', {
            url: '/RA_Madingpage',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab-a/Madingpage.html'
                }
            }
        })

        ///////////////////a4
        ////医生的药架列表
        .state('tab.RA_DoctorProductList', {
            url: '/RA_DoctorProductList/:act',
            views: {
                'tab_b-a': {
                    templateUrl: 'views/tab_b-a/DoctorProductList.html',
                    controller: 'DoctorProductListCtrl'
                }
            }
        })
        ///////////////////b
      //药品服务列表
      .state('tab.RB_ProductchannelList', {
        url: '/RB_ProductchannelList',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-a/ProductchannelList.html',
            controller: 'ProductchannelListCtrl'
          }
        }
      })
      .state('tab.RB_ProductList', {
        url: '/RB_ProductList',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-a/ProductList.html',
            controller: 'ProductListCtrl'
          }
        }
      })
      .state('tab.RB_Product', {
        url: '/RB_Product/:act/:id',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-a/Product.html',
            controller: 'ProductCtrl'
          }
        }
      })
        //tab里的患者
        .state('tab.MemberDoctorList', {
            url: '/MemberDoctorList',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-b/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })

        //医患聊天记录列表
        .state('tab.RB_DmmsgList', {
            url: '/RB_DmmsgList/:fromto/:memberId/:doctorId',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-b/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
        ////查看病例单列表
        .state('tab.RB_OrderrList', {
            url: '/RB_OrderrList/:act/:memberId',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        ////订单详细
        .state('tab.RB_Orderr', {
            url: '/RB_Orderr/:id',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////开药笺
        .state('tab.RB_Orderryaojian', {
            url: '/RB_Orderryaojian/:id',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-a/Orderryaojian.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        ////医生药架
        .state('tab.RB_DoctorProductList', {
            url: '/RB_DoctorProductList/:act',
            views: {
                'tab_b-b': {
                    templateUrl: 'views/tab_b-a/DoctorProductList.html',
                    controller: 'DoctorProductListCtrl'
                }
            }
        })
      ////c查看会员档案
      .state('tab.RB_memberFile', {
        url: '/RB_memberFile/:memberId',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/memberFile.html',
            controller: 'memberFileCtrl'
          }
        }
      })
      ////c查看会员档案
      .state('tab.RA_memberFile', {
        url: '/RA_memberFile/:memberId',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/memberFile.html',
            controller: 'memberFileCtrl'
          }
        }
      })
      //查看病历
      .state('tab.RA_Medicalrec', {
        url: '/RA_Medicalrec/:memberId',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/Medicalrec.html',
            controller: 'MedicalrecCtrl'
          }
        }
      })
      .state('tab.RB_Medicalrec', {
        url: '/RB_Medicalrec/:memberId',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/Medicalrec.html',
            controller: 'MedicalrecCtrl'
          }
        }
      })
      //病历之病史页面列表
      .state('tab.RA_MedicalrecPageList', {
        url: '/RA_MedicalrecPageList/:memberId',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecPageList.html',
            controller: 'MedicalrecPageListCtrl'
          }
        }
      })
      //病历之病史页面列表
      .state('tab.RB_MedicalrecPageList', {
        url: '/RB_MedicalrecPageList/:memberId',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecPageList.html',
            controller: 'MedicalrecPageListCtrl'
          }
        }
      })
      //病历之病史页面详细
      .state('tab.RA_MedicalrecPage', {
        url: '/RA_MedicalrecPage/:id',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecPage.html',
            controller: 'MedicalrecPageCtrl'
          }
        }
      })
      .state('tab.RB_MedicalrecPage', {
        url: '/RB_MedicalrecPage/:id',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecPage.html',
            controller: 'MedicalrecPageCtrl'
          }
        }
      })
      //病历之检查报告列表
      .state('tab.RA_MedicalrecRptList', {
        url: '/RA_MedicalrecRptList/:memberId',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecRptList.html',
            controller: 'MedicalrecRptListCtrl'
          }
        }
      })
      .state('tab.RB_MedicalrecRptList', {
        url: '/RB_MedicalrecRptList/:memberId',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecRptList.html',
            controller: 'MedicalrecRptListCtrl'
          }
        }
      })
      //病历之检查报告详细
      .state('tab.RA_MedicalrecRpt', {
        url: '/RA_MedicalrecRpt/:id',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecRpt.html',
            controller: 'MedicalrecRptCtrl'
          }
        }
      })
      //病历之检查报告详细
      .state('tab.RB_MedicalrecRpt', {
        url: '/RB_MedicalrecRpt/:id',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecRpt.html',
            controller: 'MedicalrecRptCtrl'
          }
        }
      })
      //病历之健康指标列表
      .state('tab.RA_MedicalrecHealthList', {
        url: '/RA_MedicalrecHealthList/:memberId',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecHealthList.html',
            controller: 'MedicalrecHealthListCtrl'
          }
        }
      })
      .state('tab.RB_MedicalrecHealthList', {
        url: '/RB_MedicalrecHealthList/:memberId',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecHealthList.html',
            controller: 'MedicalrecHealthListCtrl'
          }
        }
      })
      //病历之健康指标详细
      .state('tab.RA_MedicalrecHealth', {
        url: '/RA_MedicalrecHealth/:id',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-b/MedicalrecHealth.html',
            controller: 'MedicalrecHealthCtrl'
          }
        }
      })
      .state('tab.RB_MedicalrecHealth', {
        url: '/RB_MedicalrecHealth/:id',
        views: {
          'tab_b-b': {
            templateUrl: 'views/tab_b-b/MedicalrecHealth.html',
            controller: 'MedicalrecHealthCtrl'
          }
        }
      })
      //药房搜索
      .state('tab.RA_ProductListSearch', {
        url: '/RA_ProductListSearch/:kw',
        views: {
          'tab_b-a': {
            templateUrl: 'views/tab_b-a/ProductListSearch.html',
            controller: 'ProductListSearchCtrl'
          }
        }
      })
        ///////////////////C
        .state('tab.fuwu', {
            url: '/fuwu',
            views: {
                'tab_b-c': {
                    templateUrl: 'views/tab_b-c/fuwu.html'

                }
            }
        })
        //建设中跳转
        .state('tab.RC_Madingpage', {
            url: '/RC_Madingpage',
            views: {
                'tab_b-c': {
                    templateUrl: 'views/tab-a/Madingpage.html'
                }
            }
        })
      //电话页
      .state('tab.RC_phone', {
        url: '/RC_phone',
        views: {
          'tab_b-c': {
            templateUrl: 'views/tab_b-c/phone.html'
          }
        }
      })
        ///////////////////d

        //////我的
        .state('tab.my', {
            url: '/my',
            views: {
                'tab_b-d': {
                    controller: 'myCtrl',
                    templateUrl: 'views/tab_b-d/my.html'

                }
            }
        })
        ///// 我的结算
        .state('tab.RD_StatiDoctorMonthList', {
            url: '/RD_StatiDoctorMonthList',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-d/StatiDoctorMonthList.html',
                    controller: 'StatiDoctorMonthListCtrl'
                }
            }
        })
        /////订单列表
        .state('tab.RD_OrderrList', {
            url: '/RD_OrderrList/:act/:memberId',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-a/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
        ////订单详细
        .state('tab.RD_Orderr', {
            url: '/RD_Orderr/:id',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-a/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
        //建设中跳转
        .state('tab.RD_Madingpage', {
            url: '/RD_Madingpage',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab-a/Madingpage.html'
                }
            }
        })

        // 我的二维码
        .state('tab.RD_DoctorQrcode', {
            url: '/RD_DoctorQrcode/:id',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-d/DoctorQrcode.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        // 信息修改
        .state('tab.RD_Editdoctor', {
            url: '/RD_Editdoctor',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-d/Editdoctor.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
        //  修改密码
        .state('tab.RD_User', {
            url: '/RD_User/:id',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-d/User.html',
                    controller: 'UserCtrl'
                }
            }
        })
      //意见反馈
      .state('tab.Suggestion', {
        url: '/Suggestion',
        views: {
          'tab_b-c': {
            templateUrl: 'views/tab-d/Suggestion.html',
            controller: 'SuggestionCtrl'
          }
        }
      })

        //设置
        .state('tab.RD_Shezhi', {
            url: '/RD_Shezhi',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab-d/Shezhi.html',
                    controller: 'myCtrl'
                }
            }
        })
      .state('tab.Yijian', {
        url: '/Yijian',
        views: {
          'tab_b-d': {
            templateUrl: 'views/tab-d/yijian.html'
          }
        }
      })
        //关于易健
        .state('tab.RD_yijian', {
            url: '/RD_yijian',
            views: {
                'tab_b-d': {
                    templateUrl: 'views/tab_b-d/yijian.html'
                }
            }
        })
        //////我的
        .state('tab.tmp1', {
            url: '/tmp1',
            views: {
                'tab_b-d': {
                    controller: 'tmp1Ctrl',
                    templateUrl: 'views/tab_b-d/tmp1.html'

                }
            }
        })
      /////资质上传
      .state('tab.RD_qualificationupload', {
        url: '/RD_qualificationupload/:id',
        views: {
          'tab_b-d': {
            templateUrl: 'views/tab_b-d/qualificationupload.html',
            controller: 'qualificationuploadCtrl'
          }
        }
      })
      //临时测试
      .state('tab.tmp', {
        url: '/tmp',
        views: {
          'tab_b-d': {
            templateUrl: 'views/tab-d/tmp.html',
            controller: 'tmpCtrl'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/ProductTypeLinkProductListHome');
});
