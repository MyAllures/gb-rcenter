/**
 * 资金记录js
 * Created by linsen on 17-5-27.
 */
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    return BasePage.extend({
        timeCode : "today",
        //记录当前页数,交易记录等信息
        trans : [],

         _this:null,
         noreCode:'<div class="mui-content"> <div class="no-data-img no-record"></div> </div>',
        /**
         * 初始化
         */
        init: function () {
            this._super();
            this.muiInit();
            this.iosGoBack();
            mui('#transContent').pullRefresh({
                container: '#transContent',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: "上拉加载",
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '已经到底了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: _this.getTransOrders
                }
            });
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            _this=this;
            //初始化当前页面
            _this.trans[_this.timeCode] = {};
            _this.trans[_this.timeCode].pageNumber = 1;
            var title = document.getElementById("title");
            //选项卡点击事件
            var isLoadTrans2 = false, isLoadTrans3 = false;
            mui('.mui-bar-tab').on('tap', 'a', function (e) {
                var targetTab = $(this).data('target');
                //显示/隐藏对应内容
                if(!(targetTab=="auto")){
                $("[id*='trans-']").addClass("mui-hidden");
                $("#trans-" + targetTab).removeClass("mui-hidden");
                 $("#au").removeClass("auto-active");
                }

                //加载资金交易记录数据
                //已经加载过的不再加载
                _this.timeCode = targetTab;
                if(_this.trans[_this.timeCode] == null){
                    //初始化对象
                    _this.trans[_this.timeCode] = {};
                    _this.trans[_this.timeCode].pageNumber = 1;
                }
                if(targetTab == 'yesterday' && !isLoadTrans2){
                    _this.getTransOrders(true);
                    isLoadTrans2 = true;
                }else if(targetTab == 'thisMonth' && !isLoadTrans3){
                    _this.getTransOrders(true);
                    isLoadTrans3 = true;
                }else if(targetTab == 'auto'){
                    _this.trans[_this.timeCode].endTime=$("#endTime").val();
                    _this.trans[_this.timeCode].startTime=$("#startTime").val();
                }
                //每次切换页面都启用上啦加载
                mui('#transContent').pullRefresh().refresh(true);
            });

            mui('body').on('tap', '.mui-btn-block', function () {
               var st= $("#startTime").val();
               var et=$("#endTime").val();
               var myDate = new Date();
               if(new Date(et).getTime()>myDate.getTime()){
                   _this.toast("请重新选择时间！");
                   return ;
               }
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 41);
               if(new Date(st).getTime()<myDate.getTime()){
                   _this.toast("请重新选择时间！");
                   return;
               }

                _this.trans[_this.timeCode].endTime=et;
                _this.trans[_this.timeCode].startTime=st;
                _this.trans[_this.timeCode].type=$("#typeValue").val();
                _this.trans[_this.timeCode].pageNumber=1;
                _this.getTransOrders(true);
                //返回顶部
                mui("#transContent").scroll().scrollTo(0,0,0);
                $(".mui-scrollbar-indicator").css("transform","translate3d(0,0,0)");
                //隐藏上个菜单内容和显示当前
                $("[id*='trans-']").addClass("mui-hidden");
                $("#trans-auto").removeClass("mui-hidden");

                $("#offCanvasWrapper").removeClass("mui-active");
                $("#offCanvasSideRight").removeClass("mui-active");
                $(".mui-inner-wrap").css("transform","translate3d(0,0,0)");
                $(".mui-tab-item").removeClass("mui-active");
                $("#au").addClass("auto-active");
            });


            //设置开始时间选择器
            mui("body").on("tap", "#startTime", function () {
                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 40);
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#startTime").val(),
                    beginDate: myDate,
                    endDate: new Date(),
                    labels: ['年', '月', '日']//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    $("#startTime").val(e.value);
                    //结束时间不能小于开始时间
                    if (new Date($("#endTime").val()).getTime() < new Date(e.value).getTime())
                        $("#endTime").val(e.value);
                    dtpicker.dispose();
                })
            });
            //设置结束时间选择器
            mui("body").on("tap", "#endTime", function () {
                var myDate = new Date();
                var dayOfMonth = myDate.getDate();
                myDate.setDate(dayOfMonth - 40);
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#endTime").val(),
                    beginDate: myDate,
                    endDate: new Date(),
                    labels: ['年', '月', '日']//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    if (new Date(e.value).getTime() < new Date($("#startTime").val()).getTime()) {
                        $("#endTime").val($("#startTime").val());
                    }else{
                        $("#endTime").val(e.value);
                    }
                })
            });

            //设置类型选择器
            mui("body").on("tap", "#transType", function () {
                var typePicker = new mui.PopPicker();
                typePicker.setData([{
                    value:'0',
                    text: '全部'
                }, {
                    value:'1',
                    text: '投注'
                }, {
                    value:'2',
                    text: '派彩'
                }, {
                    value:'3',
                    text: '存款'
                }, {
                    value:'4',
                    text: '提款'
                }, {
                    value:'5',
                    text: '返点'
                }, {
                    value:'6',
                    text: '重结扣款'
                }, {
                    value:'7',
                    text: '重结派彩'
                }, {
                    value:'8',
                    text: '待结撤单'
                }, {
                    value:'9',
                    text: '已结撤销'
                }
                ]);
                typePicker.pickers[0].setSelectedIndex($("#typeValue").val());
                typePicker.show(function (e) {
                    $("#transType").val(e[0].text);
                    $("#typeValue").val(e[0].value);
                })
            });
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
            this.getTransOrders(true);
        },
        /**
        获取交易记录
         **/
        getTransOrders: function (isReload) {
            //判断如果该页面没有更多数据则不加载
            if(_this.trans[_this.timeCode].isNoMore) {
                mui('#transContent').pullRefresh().endPullupToRefresh(true);
                return;
            }
            var queryStartDate=null;
            var queryEndDate=null;
            var type=0;
            if(_this.trans[_this.timeCode].endTime){
                queryEndDate=_this.trans[_this.timeCode].endTime;
            }
            if(_this.trans[_this.timeCode].startTime){
                queryStartDate=_this.trans[_this.timeCode].startTime;
             }
             if(_this.trans[_this.timeCode].type){
                 type=_this.trans[_this.timeCode].type;
             }

            mui.ajax(root + "/moneyrecord/transOrders.html",{
                data:{"timeCode" : _this.timeCode, "paging.pageNumber" : _this.trans[_this.timeCode].pageNumber++,"queryStartDate":queryStartDate,"queryEndDate":queryEndDate,"type":type},
                type:"post",
                dataType:"json",
                beforeSend: function () {

                },
                success: function (data) {
                    if(data.length > 0){
                        for(var i = 0; i < data.length; i++){
                            //交易记录额
                            var money = data[i].money;
                            //余额
                            var balance = data[i].balance;
                            //交易类型
                            var transactionType=data[i].transactionType;
                            var memo=data[i].memo;
                            //时间格式转换
                            var transactionTime = new Date(data[i].transactionTime);
                            var transDay = transactionTime.getFullYear() + "-" + _this.getTen(transactionTime.getMonth() + 1)  + "-" + _this.getTen(transactionTime.getDate());
                            var transSecond = _this.getTen(transactionTime.getHours()) + ":" + _this.getTen(transactionTime.getMinutes()) + ":" + _this.getTen(transactionTime.getSeconds());
                            data[i].transDay = transDay;
                            data[i].transSecond = transSecond;
                        }

                        //填充数据
                        var html = Template('template_myTransTemplate', {list: data});

                        if(isReload)
                            $("#trans-" + _this.timeCode).html(html);
                        else
                            $("#trans-" + _this.timeCode).append(html);

                        mui('#transContent').pullRefresh().endPullupToRefresh(false);
                    }else {
                        if(isReload){
                            $("#trans-" + _this.timeCode).html(_this.noreCode);
                        }
                        if(!(_this.timeCode=="auto")){
                        _this.trans[_this.timeCode].isNoMore = true;
                        }
                        mui('#transContent').pullRefresh().endPullupToRefresh(true);
                    }
                }
            })
        },
        getTen: function (k) {
            if(k < 10)
                k = "0" + k;
            return k;
        },
    })

});
