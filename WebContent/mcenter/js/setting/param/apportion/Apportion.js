/**
 * Created by cj on 15-9-15.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
            $('.wrapper [name$=paramValue]', this.formSelector).on('keyup', function(e) {
                this.value = this.value.replace(/[^\d.]/g,"");
                this.value = this.value.replace(/^\./g,"");
                this.value = this.value.replace(/\.{2,}/g,".");
                this.value = this.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                //this.value = (Math.floor(this.value * 100) / 100).toFixed(2)
                this.value=this.value.replace(/[^\d\.]/g,'');
                this.value = this.value.replace(/(\.\d\d)\d+/ig,"$1");
                if (this.value > 100) {
                    this.value = 100;
                }
                $(this).parents('td').prev().find('span').text((10000 - (this.value*100))/100);
            }).on('blur', function(e) {
                this.value = this.value.replace(/(\.\d\d)\d+/ig,"$1");
                if (!this.value || $.trim(this.value) == 0) {
                    this.value = 0;
                }
                $(this).parents('td').prev().find('span').text((10000 - (this.value*100))/100);
            });
            //popover
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'right'
            });
        },
        switchEdit: function (e, opt) {
            var trs = $(e.currentTarget).parent().next().find('tr:gt(0)');
            $.each(trs, function(index, obj) {
                var $td = $(obj).find('td:last');
                var $showDiv = $td.find('div:first');
                $showDiv.hasClass('hide') ? $showDiv.removeClass('hide') : $showDiv.addClass('hide');
                var $editDiv = $td.find('div:last');
                $editDiv.hasClass('hide') ? $editDiv.removeClass('hide') : $editDiv.addClass('hide');
            })
            $('.operate-btn').removeClass('hide');
        },
        /**
         * 取消按钮
         * @param e
         * @param opt
         */
        refreshPage: function (e, opt) {
            $('#mainFrame').load(this.getCurrentFormAction(e));
        }
    });
});