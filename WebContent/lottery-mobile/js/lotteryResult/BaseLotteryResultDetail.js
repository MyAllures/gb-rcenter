/**
 * 彩票投注记录js
 * Created by bill on 17-5-20.
 */
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {

    return BasePage.extend({
         _this:null,
         paging:1,
         noreCode:'<div class="mui-content"> <div class="no-data-img no-record"></div> </div>',
         isNoMore:false,
         name:"",
        init: function () {
            this._super();
            _this = this;
            _this.name=$("#name").val();
            //mui初始化
            this.muiInit();
            mui('#pullrefresh').pullRefresh({
                container: '#pullrefresh',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: "上拉加载",
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '已经到底了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: _this.getLotteryResult
                }
            });
            this.bindEvent();
            this.iosGoBack();
            _this.getLotteryResult(true);
        },

        bindEvent:function () {
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
        },

        getLotteryResult: function (isReload) {
            if(_this.isNoMore){
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                return;
            }
            var code=$("#code").val();
            var queryEndDate = $("#queryEndDate").val();
            mui.ajax(root + "/lotteryResultHistory/getLotteryResultDetail.html",{
                data:{'search.code': code, "paging.pageNumber" : _this.paging++ ,"search.queryEndDate":queryEndDate},
                type:"post",
                dataType:"json",
                beforeSend: function () {
                    
                },
                success: function (data) {
                    if(data.length > 0){
                        _this.assemblyData(data);
                        for(var i = 0;i < data.length; i++){
                            var obj = data[i];
                            var openCodeSum = 0;
                            if(obj.ball != undefined && obj.ball.length > 0){
                                for(var j = 0; j < obj.ball.length; j++){
                                    openCodeSum += parseInt(obj.ball[j]);
                                }
                            }
                            obj.openCodeSum = openCodeSum;
                            data[i] = obj;
                        }
                        var html = Template('template_myLotteryTemplate', {list: data});
                        if(isReload)
                            $("#container").html(html);
                        else{
                            $("#container").append(html);
                        }
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
                    }else {
                        if(isReload) {
                            $("#pullrefresh").html(_this.noreCode);
                            mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
                        }
                        _this.isNoMore = true;
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    }
                }
            })
        },
        getTen: function (k) {
            if(k < 10)
                k = "0" + k;
            return k;
        },
        //组装数据
        assemblyData:function (data) {
            for(var i=0;i<data.length;i++){
                //时间格式转换
                var openTime = new Date(data[i].openTime);
                var openDay = openTime.getFullYear() + "-" + _this.getTen(openTime.getMonth() + 1)  + "-" + _this.getTen(openTime.getDate());
                var openSecond = _this.getTen(openTime.getHours()) + ":" + _this.getTen(openTime.getMinutes()) + ":" + _this.getTen(openTime.getSeconds());
                data[i].openTime = openDay+" "+openSecond;
                data[i].name=_this.name;
                var ball=[];
                var openCode = data[i].openCode === null ? '' : data[i].openCode;
                var spball=openCode.split(",");
                for(var j=0;j<spball.length;j++){
                    ball.push(spball[j]);
                }
                data[i].ball=ball;
            }
        }

    })

});
