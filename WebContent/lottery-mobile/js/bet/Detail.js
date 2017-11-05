/**
 * 彩票投注记录js
 * Created by bill on 17-5-20.
 */
define(['site/common/BasePage', 'site/plugin/template'], function (BasePage, Template) {
    var _this;
    return BasePage.extend({
        /**
         * 初始化
         */
        init: function () {
            this._super();
            this.muiInit();
            this.iosGoBack();
            Template.helper('formatPrice', function (price, type) {
                price = price.toFixed(3);
                if (price) {
                    var arrayPrice = price.toString().split(".");
                    if (type == 'integer') {
                        return arrayPrice[0] ? arrayPrice[0] : "0";
                    } else if (type == 'decimal') {
                        if (arrayPrice[1] && arrayPrice[1].length >= 2) {
                            return arrayPrice[0] + '.' + arrayPrice[1].substr(0, 2);
                        }
                        return price;
                    }
                } else {
                    if (type == 'integer') {
                        return "0";
                    } else if (type == 'decimal') {
                        return ".00";
                    }
                }
            });
        },
        /**
         * 绑定事件
         */
        bindButtonEvents: function () {
            _this = this;
            var aniShow = "pop-in";
            //页面点击事件
            mui('body').on('tap', 'a', function () {
                var id = this.getAttribute("data-wid");
                if (!id) {
                    id = this.getAttribute('href');
                }
                var href = this.getAttribute('href');

                //非plus环境，直接走href跳转
                if (!mui.os.plus) {
                    location.href = href;
                    return;
                }

                var titleType = this.getAttribute("data-title-type");

                var webview_style = {
                    popGesture: "close"
                };
                var extras = {};
                if (titleType == "native") {

                } else if (href && ~href.indexOf('.html')) {
                    var webview = plus.webview.create(this.href, id, webview_style, extras);
                    webview.addEventListener("titleUpdate", function () {
                        setTimeout(function () {
                            webview.show(aniShow, 250);
                        }, 100);
                    });
                }
            });
            mui('body').on('tap', '[data-href]', function () {
                var href = $(this).data("href");
                _this.gotoUrl(href);
            });
            _this.getOrderDetail();
        },
        /**
        获取我的投注记录详情
         **/
        getOrderDetail: function () {

            mui.ajax(root + "/bet/getOrderDetail.html",{
                data:{"search.id" : $('#betId').val()},
                type:"post",
                dataType:"json",
                success: function (data) {
                    if(data){
                        if(!$.isEmptyObject(data.lottery) && data.lottery[0].openCode){
                            var openCode = data.lottery[0].openCode.split(",");
                            data.openCode = openCode;
                        }else {
                            data.openCode = "noCode";
                        }
                        if(!$.isEmptyObject(data.bet)) {
                            data.bet.betAmount = data.bet.betAmount.toFixed(2);
                            //时间格式转换
                            var betTime = new Date(data.bet.betTime);
                            data.bet.betTime = betTime.getFullYear() + "-" + _this.getTen(betTime.getMonth() + 1) + "-" + _this.getTen(betTime.getDate()) + "  " +
                                _this.getTen(betTime.getHours()) + ":" + _this.getTen(betTime.getMinutes()) + ":" + _this.getTen(betTime.getSeconds());

                        }
                        //填充数据
                        var html = Template('template_betDetailTemplate', {data: data});
                        $("#betDetail").html(html);
                    }
                }
            })
        },
        getTen: function (k) {
            if(k < 10)
                k = "0" + k;
            return k;
        }
    })

});
