/**
 * Created by bill on 17-4-4.
 */
define(['common/MobileBasePage'], function (Mobile) {
    return Mobile.extend({
        init : function () {
            this._super();
            mui('.mui-scroll-wrapper').scroll({
                scrollY: true, //是否竖向滚动
                scrollX:false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: true, //是否显示滚动条
                //bounce: false, //是否启用回弹
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        onPageLoad : function () {
            this._super();
        },
        bindEvent : function () {
            this._super();
            var _this = this;
            mui("body").on('tap', '[data-href]', function (e) {
                _this.gotoUrl($(this).data("href"));
            });
            $('.fqa dt:first-child+.mui-content').show();
            $('.fqa dt').on('tap', function(){
                $('.fqa dt').not(this).next('dd').slideUp('fast');
                $(this).next('dd').slideToggle();
                var $table = $(this).next().find("table");
                if($table.size()>0){
                    setTimeout(_this.tableScroll($table),1000);
                }
            });
        }
        /*tableScroll: function ($table) {
            for (var i = 0; i < $table.size(); i++) {
                if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
                    //给表格添加横向滚动
                    $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                        "mui-segmented-control-inverted'> " +
                        "<div class='mui-scroll'></div></div>");
                    mui(".scroll2").scroll();

                    var scrollHeight = $($table.get(i)).height();
                    $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
                }
            }
        }*/
    })
});