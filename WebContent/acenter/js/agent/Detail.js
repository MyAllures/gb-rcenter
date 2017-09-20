/**
 * Created by cj on 15-9-7.
 */
define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#agentDetail";
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化
             */
            this._super();

            var clip = new ZeroClipboard($('a[name="copy"]'));
            //复制
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.home_auto['复制成功'], true);
            });
            //查询所有订单，链接到“角色管理”->“代理管理”->“资金”页面判断标识 add by eagle on 20151203
            //var extendLinks = $("#funds").attr("data-link");
            //if(extendLinks == 'yes') {
            //    var tabId = $("#funds").attr("href");
            //    var url = $("#funds").attr("data-href");
            //    window.top.topPage.ajax({
            //        url: url,
            //        success: function (data) {
            //            $(tabId).html(data);
            //            $(".panel-options li").removeClass();
            //            $("#funds").parent().addClass("active");
            //            $("#funds").attr("aria-expanded",true);
            //            $(".panel-body").children().children().removeClass("active");
            //            $(tabId).addClass("active");
            //        },
            //        error: function (data) {
            //
            //        }
            //    })
            //}
            //add end
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            $(this.formSelector).on("click", ".propormpt", function () {
                alert("该链接内容开发中！");
            });
            $(this.formSelector).on("click", ".funds", function () {
                $("#funds").click();
            });
            var _this = this;
            //这里初始化所有的事件
            /*有标签页时调用*/
            this.initShowTab();

        },
        toTmpl:function(e,btnOption){
            if(e.returnValue){
                $("#tot").attr('href','/noticeTmpl/tmpIndex.html');
                $("#tot").click();
            }
        },
        reloadView:function( event , option){
            if(event.returnValue){
                $("#reloadView").click();
            }
        },
        reloadViewWithoutReturnValue:function( event , option){
            $("#reloadView").click();
        },
        returnPage : function (e) {
            if(e.returnValue==true){
                $("#reloadView").click();
            }
        }

    });
});