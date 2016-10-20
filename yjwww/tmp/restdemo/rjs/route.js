/**
 * 配置路由
 */
app.config(function($stateProvider, $urlRouterProvider) {
    console.log("app.config");
    $stateProvider

        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "views/tab.html"
            //,controller: 'tabCtrl'
        })
         //医患关系列表
        .state('tab.MemberdoctorList', {
            url: '/MemberdoctorList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MemberdoctorList.html',
                    controller: 'MemberdoctorListCtrl'
                }
            }
        })
         //医患关系详细
        .state('tab.Memberdoctor', {
            url: '/Memberdoctor/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Memberdoctor.html',
                    controller: 'MemberdoctorCtrl'
                }
            }
        })
         //医生的药架列表
        .state('tab.DoctorProductList', {
            url: '/DoctorProductList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DoctorProductList.html',
                    controller: 'DoctorProductListCtrl'
                }
            }
        })
         //医生的药架详细
        .state('tab.DoctorProduct', {
            url: '/DoctorProduct/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DoctorProduct.html',
                    controller: 'DoctorProductCtrl'
                }
            }
        })
         //医患聊天记录列表
        .state('tab.DmmsgList', {
            url: '/DmmsgList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DmmsgList.html',
                    controller: 'DmmsgListCtrl'
                }
            }
        })
         //医患聊天记录详细
        .state('tab.Dmmsg', {
            url: '/Dmmsg/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Dmmsg.html',
                    controller: 'DmmsgCtrl'
                }
            }
        })
         //药师患者聊天记录列表
        .state('tab.DgmmsgList', {
            url: '/DgmmsgList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DgmmsgList.html',
                    controller: 'DgmmsgListCtrl'
                }
            }
        })
         //药师患者聊天记录详细
        .state('tab.Dgmmsg', {
            url: '/Dgmmsg/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Dgmmsg.html',
                    controller: 'DgmmsgCtrl'
                }
            }
        })
         //实体药店列表
        .state('tab.DrugstoreList', {
            url: '/DrugstoreList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DrugstoreList.html',
                    controller: 'DrugstoreListCtrl'
                }
            }
        })
         //实体药店详细
        .state('tab.Drugstore', {
            url: '/Drugstore/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Drugstore.html',
                    controller: 'DrugstoreCtrl'
                }
            }
        })
         //医院列表
        .state('tab.HospitalList', {
            url: '/HospitalList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/HospitalList.html',
                    controller: 'HospitalListCtrl'
                }
            }
        })
         //医院详细
        .state('tab.Hospital', {
            url: '/Hospital/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Hospital.html',
                    controller: 'HospitalCtrl'
                }
            }
        })
         //病历列表
        .state('tab.MedicalrecList', {
            url: '/MedicalrecList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecList.html',
                    controller: 'MedicalrecListCtrl'
                }
            }
        })
         //病历详细
        .state('tab.Medicalrec', {
            url: '/Medicalrec/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Medicalrec.html',
                    controller: 'MedicalrecCtrl'
                }
            }
        })
         //病历之病史页面列表
        .state('tab.MedicalrecPageList', {
            url: '/MedicalrecPageList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecPageList.html',
                    controller: 'MedicalrecPageListCtrl'
                }
            }
        })
         //病历之病史页面详细
        .state('tab.MedicalrecPage', {
            url: '/MedicalrecPage/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecPage.html',
                    controller: 'MedicalrecPageCtrl'
                }
            }
        })
         //病历之检查报告列表
        .state('tab.MedicalrecRptList', {
            url: '/MedicalrecRptList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecRptList.html',
                    controller: 'MedicalrecRptListCtrl'
                }
            }
        })
         //病历之检查报告详细
        .state('tab.MedicalrecRpt', {
            url: '/MedicalrecRpt/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecRpt.html',
                    controller: 'MedicalrecRptCtrl'
                }
            }
        })
         //病历之健康指标列表
        .state('tab.MedicalrecHealthList', {
            url: '/MedicalrecHealthList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecHealthList.html',
                    controller: 'MedicalrecHealthListCtrl'
                }
            }
        })
         //病历之健康指标详细
        .state('tab.MedicalrecHealth', {
            url: '/MedicalrecHealth/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MedicalrecHealth.html',
                    controller: 'MedicalrecHealthCtrl'
                }
            }
        })
         //内容频道列表
        .state('tab.CmschannelList', {
            url: '/CmschannelList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/CmschannelList.html',
                    controller: 'CmschannelListCtrl'
                }
            }
        })
         //内容频道详细
        .state('tab.Cmschannel', {
            url: '/Cmschannel/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Cmschannel.html',
                    controller: 'CmschannelCtrl'
                }
            }
        })
         //内容列表
        .state('tab.CmscontentList', {
            url: '/CmscontentList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/CmscontentList.html',
                    controller: 'CmscontentListCtrl'
                }
            }
        })
         //内容详细
        .state('tab.Cmscontent', {
            url: '/Cmscontent/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Cmscontent.html',
                    controller: 'CmscontentCtrl'
                }
            }
        })
         //内容列表
        .state('tab.CmscontentExtTxtList', {
            url: '/CmscontentExtTxtList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/CmscontentExtTxtList.html',
                    controller: 'CmscontentExtTxtListCtrl'
                }
            }
        })
         //内容详细
        .state('tab.CmscontentExtTxt', {
            url: '/CmscontentExtTxt/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/CmscontentExtTxt.html',
                    controller: 'CmscontentExtTxtCtrl'
                }
            }
        })
         //手机页首页配置列表
        .state('tab.WwwhomeList', {
            url: '/WwwhomeList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/WwwhomeList.html',
                    controller: 'WwwhomeListCtrl'
                }
            }
        })
         //手机页首页配置详细
        .state('tab.Wwwhome', {
            url: '/Wwwhome/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Wwwhome.html',
                    controller: 'WwwhomeCtrl'
                }
            }
        })
         //专题列表
        .state('tab.TopicList', {
            url: '/TopicList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/TopicList.html',
                    controller: 'TopicListCtrl'
                }
            }
        })
         //专题详细
        .state('tab.Topic', {
            url: '/Topic/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Topic.html',
                    controller: 'TopicCtrl'
                }
            }
        })
         //商品列表
        .state('tab.ProductList', {
            url: '/ProductList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductList.html',
                    controller: 'ProductListCtrl'
                }
            }
        })
         //商品详细
        .state('tab.Product', {
            url: '/Product/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Product.html',
                    controller: 'ProductCtrl'
                }
            }
        })
         //商品详细列表
        .state('tab.ProductExtTxtList', {
            url: '/ProductExtTxtList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductExtTxtList.html',
                    controller: 'ProductExtTxtListCtrl'
                }
            }
        })
         //商品详细详细
        .state('tab.ProductExtTxt', {
            url: '/ProductExtTxt/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductExtTxt.html',
                    controller: 'ProductExtTxtCtrl'
                }
            }
        })
         //商品目录列表
        .state('tab.ProductchannelList', {
            url: '/ProductchannelList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductchannelList.html',
                    controller: 'ProductchannelListCtrl'
                }
            }
        })
         //商品目录详细
        .state('tab.Productchannel', {
            url: '/Productchannel/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Productchannel.html',
                    controller: 'ProductchannelCtrl'
                }
            }
        })
         //药品生产厂家列表
        .state('tab.ManufacturerList', {
            url: '/ManufacturerList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ManufacturerList.html',
                    controller: 'ManufacturerListCtrl'
                }
            }
        })
         //药品生产厂家详细
        .state('tab.Manufacturer', {
            url: '/Manufacturer/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Manufacturer.html',
                    controller: 'ManufacturerCtrl'
                }
            }
        })
         //商品类型列表
        .state('tab.ProductTypeList', {
            url: '/ProductTypeList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductTypeList.html',
                    controller: 'ProductTypeListCtrl'
                }
            }
        })
         //商品类型详细
        .state('tab.ProductType', {
            url: '/ProductType/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductType.html',
                    controller: 'ProductTypeCtrl'
                }
            }
        })
         //商品类型包含商品列表
        .state('tab.ProductTypeLinkProductList', {
            url: '/ProductTypeLinkProductList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductTypeLinkProductList.html',
                    controller: 'ProductTypeLinkProductListCtrl'
                }
            }
        })
         //商品类型包含商品详细
        .state('tab.ProductTypeLinkProduct', {
            url: '/ProductTypeLinkProduct/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/ProductTypeLinkProduct.html',
                    controller: 'ProductTypeLinkProductCtrl'
                }
            }
        })
         //意见建议列表
        .state('tab.SuggestionList', {
            url: '/SuggestionList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/SuggestionList.html',
                    controller: 'SuggestionListCtrl'
                }
            }
        })
         //意见建议详细
        .state('tab.Suggestion', {
            url: '/Suggestion/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Suggestion.html',
                    controller: 'SuggestionCtrl'
                }
            }
        })
         //账号信息修改列表
        .state('tab.UserList', {
            url: '/UserList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/UserList.html',
                    controller: 'UserListCtrl'
                }
            }
        })
         //账号信息修改详细
        .state('tab.User', {
            url: '/User/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/User.html',
                    controller: 'UserCtrl'
                }
            }
        })
         //个人会员列表
        .state('tab.MemberList', {
            url: '/MemberList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/MemberList.html',
                    controller: 'MemberListCtrl'
                }
            }
        })
         //个人会员详细
        .state('tab.Member', {
            url: '/Member/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Member.html',
                    controller: 'MemberCtrl'
                }
            }
        })
         //医生会员列表
        .state('tab.DoctorList', {
            url: '/DoctorList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DoctorList.html',
                    controller: 'DoctorListCtrl'
                }
            }
        })
         //医生会员详细
        .state('tab.Doctor', {
            url: '/Doctor/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Doctor.html',
                    controller: 'DoctorCtrl'
                }
            }
        })
         //药剂师列表
        .state('tab.DruggistList', {
            url: '/DruggistList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/DruggistList.html',
                    controller: 'DruggistListCtrl'
                }
            }
        })
         //药剂师详细
        .state('tab.Druggist', {
            url: '/Druggist/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Druggist.html',
                    controller: 'DruggistCtrl'
                }
            }
        })
         //业务员列表
        .state('tab.SellerList', {
            url: '/SellerList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/SellerList.html',
                    controller: 'SellerListCtrl'
                }
            }
        })
         //业务员详细
        .state('tab.Seller', {
            url: '/Seller/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Seller.html',
                    controller: 'SellerCtrl'
                }
            }
        })
         //购物车列表
        .state('tab.CartList', {
            url: '/CartList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/CartList.html',
                    controller: 'CartListCtrl'
                }
            }
        })
         //购物车详细
        .state('tab.Cart', {
            url: '/Cart/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Cart.html',
                    controller: 'CartCtrl'
                }
            }
        })
         //订单列表
        .state('tab.OrderrList', {
            url: '/OrderrList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrList.html',
                    controller: 'OrderrListCtrl'
                }
            }
        })
         //订单详细
        .state('tab.Orderr', {
            url: '/Orderr/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Orderr.html',
                    controller: 'OrderrCtrl'
                }
            }
        })
         //订单列表
        .state('tab.OrderrFinishedList', {
            url: '/OrderrFinishedList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrFinishedList.html',
                    controller: 'OrderrFinishedListCtrl'
                }
            }
        })
         //订单详细
        .state('tab.OrderrFinished', {
            url: '/OrderrFinished/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrFinished.html',
                    controller: 'OrderrFinishedCtrl'
                }
            }
        })
         //订单详细列表
        .state('tab.OrderrdetailList', {
            url: '/OrderrdetailList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrdetailList.html',
                    controller: 'OrderrdetailListCtrl'
                }
            }
        })
         //订单详细详细
        .state('tab.Orderrdetail', {
            url: '/Orderrdetail/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/Orderrdetail.html',
                    controller: 'OrderrdetailCtrl'
                }
            }
        })
         //订单详细列表
        .state('tab.OrderrdetailFinishedList', {
            url: '/OrderrdetailFinishedList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrdetailFinishedList.html',
                    controller: 'OrderrdetailFinishedListCtrl'
                }
            }
        })
         //订单详细详细
        .state('tab.OrderrdetailFinished', {
            url: '/OrderrdetailFinished/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrdetailFinished.html',
                    controller: 'OrderrdetailFinishedCtrl'
                }
            }
        })
         //订单号搜索历史列表
        .state('tab.OrderrSnSearchhisList', {
            url: '/OrderrSnSearchhisList',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrSnSearchhisList.html',
                    controller: 'OrderrSnSearchhisListCtrl'
                }
            }
        })
         //订单号搜索历史详细
        .state('tab.OrderrSnSearchhis', {
            url: '/OrderrSnSearchhis/:id',
            views: {
                'tab-a': {
                    templateUrl: 'views/tab/OrderrSnSearchhis.html',
                    controller: 'OrderrSnSearchhisCtrl'
                }
            }
        })
 
        .state('tab.home', {
            url: '/home',
            views: {
                'tab-a': {
                    templateUrl: 'views/home.html'
                    //,controller: 'homeCtrl'
                }
            }
        })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
});