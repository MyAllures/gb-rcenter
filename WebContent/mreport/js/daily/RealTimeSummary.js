/**
 * 数据中心首页-首页js
 */
define(['common/BasePage','site/swiper.min','site/g2.min','site/data-set.min'], function (BasePage,Swiper,G2,DataSet) {
    return BasePage.extend({
        /**
         * 初使化
         */
        init: function () {
            'use strict';
            this._super();

            //初始化Swiper
            this.initSwiper();

            //初始化G2
            this.initG2('visitor');//默认展示实时访客

        },


        onPageLoad: function () {

        },

        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            var _this = this;
            $("#swiper-wrapper>.swiper-slide").click(function(e,option){
                $("#swiper-wrapper>.swiper-slide").removeClass("btn-primary");
                $(this).addClass("btn-primary");
                _this.changeCartogram(this);
            });

            // $('#Searchresult tr').click(function(){
            //     rundomData()
            // })
        },

        initSwiper:function(){
            var swiper = new Swiper('.swiper-info', {
                slidesPerView: 6,
                spaceBetween: 15,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                //direction: 'vertical',
                //loop: true
            });
        },

        initG2:function(realtimeType){
            $("#mountNode").html(null);
            const data = this.setData(realtimeType);
            if(data == null || data.length < 1) return;
            const ds = new DataSet();
            var keys = Object.keys(data[0]);
            keys.splice(0,1);
            const chart = new G2.Chart({
                container: 'mountNode',
                forceFit: true,
                width: 500,
                height: 500
            });
            if('realtimeProfitLoss' == realtimeType){
                chart.source(data);
                chart.scale({
                    time: {
                        range: [ 0 , 1 ]
                    }
                });
                chart.axis(keys[0], {
                    label: {
                        formatter: function(val) {
                            return val;
                        }
                    }
                });
                chart.area().position('time*'+keys[0]).shape('smooth');
                chart.line().position('time*'+keys[0]).size(2).shape('smooth');
            }else{
                const dv = ds.createView().source(data);
                dv.transform({
                    type: 'fold',
                    fields: keys, // 展开字段集
                    key: 'name', // key字段
                    value: 'sum', // value字段
                });
                chart.axis('sum', {
                    label: {
                        formatter: function(val) {
                            return val;
                        }
                    }
                });
				/*,[ '#0072ff', '#02c16e', '#ff5050' ]*/
				/*,[ '#0072ff', '#02c16e', '#ff5050' ]*/
                chart.line().position('time*sum').color('name').shape('smooth');
                chart.point().position('time*sum').color('name').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                });

                chart.source(dv,{
                    time: {
                        range: [ 0, 1 ]
                    }
                });
            }
            chart.tooltip({
                crosshairs: {
                    type: 'line'
                }
            });
            chart.render();
        },

        /**
         * 更换实时报表统计图
         */
        changeCartogram:function(e){
            var realtimeGroup = $(e).attr("realtimeGroup");
            this.initG2(realtimeGroup);
        },

        /**组装统计图数据*/
        setData: function(realtimeType){
            var profilesJson = $.parseJSON($("#profilesJson").val());
            var array = [];
            if(profilesJson == null && profilesJson.length < 1){
                return array;
            }
            for(var i = 1; i<=profilesJson.length; i++) {
                var profile = profilesJson[i-1];
                var data = {};
                data['time'] = i < 10 ? '0'+i+':00': (i > 23 ? '23:59' : i + ':00');
                if ('visitor' == realtimeType) {
                    data['访客量(全部)'] = profile.countVisitor;
                    data['访客量(PC端)'] = profile.visitorPc;
                    data['访客量(H5)'] = profile.visitorH5;
                } else if ('active' == realtimeType) {
                    data['实时活跃(全部)'] = profile.countActive;
                    data['实时活跃(PC端)'] = profile.activePc;
                    data['实时活跃(安卓App)'] = profile.activeAndroid;
                    data['实时活跃(H5)'] = profile.activeH5;
                    data['实时活跃(IOSapp)'] = profile.activeIos;
                } else if ('register' == realtimeType) {
                    data['注册用户数(全部)'] = profile.countRegister;
                    data['注册用户数(手机端)'] = profile.registerPhone;
                    data['注册用户数(PC)'] = profile.registerPc;
                    data['注册用户数(安卓App)'] = profile.registerAndroid;
                    data['注册用户数(H5)'] = profile.registerH5;
                    data['注册用户数(IOSapp)'] = profile.registerIos;
                } else if ('deposit' == realtimeType) {
                    data['终端存款金额(全部)'] = profile.countDeposit;
                    data['终端存款金额(手机端)'] = profile.depositPhone;
                    data['终端存款金额(PC)'] = profile.depositPc;
                    data['终端存款金额(安卓App)'] = profile.depositAndroid;
                    data['终端存款金额(H5)'] = profile.depositH5;
                    data['终端存款金额(IOSapp)'] = profile.depositIos;
                } else if ('effcTransaction' == realtimeType) {
                    data['有效投注额(全部)'] = profile.countEffcTransaction;
                    data['有效投注额(手机端)'] = profile.effcTransactionPhone;
                    data['有效投注额(PC)'] = profile.effcTransactionPc;
                    data['有效投注额(安卓App)'] = profile.effcTransactionAndroid;
                    data['有效投注额(H5)'] = profile.effcTransactionH5;
                    data['有效投注额(IOSapp)'] = profile.effcTransactionIos;
                } else if ('online' == realtimeType) {
                    data['实时在线(全部)'] = profile.countOnline;
                    data['实时在线(手机端)'] = profile.onlinePhone;
                    data['实时在线(PC)'] = profile.onlinePc;
                    data['实时在线(安卓App)'] = profile.onlineAndroid;
                    data['实时在线(H5)'] = profile.onlineH5;
                    data['实时在线(IOSapp)'] = profile.onlineIos;
                } else if ('realtimeProfitLoss' == realtimeType) {
                    data['损益'] = profile.realtimeProfitLoss;
                }
                array.push(data);
            }
            return array;
        }
    });
});