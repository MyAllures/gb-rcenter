define(['common/BaseEditPage','zeroClipboard'], function(BaseEditPage,ZeroClipboard) {
    var _this=this;
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#mainFrame form";
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
            $(".tab-pane").css("display","block");
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //复制按钮
            this.copyText('a[name="copy"]');
            $("ul li a","#mainFrame .panel").on("click",function(e){
                var $href = $(this).attr("data-href");
                $(".tab-content").load(root+$href);
                $("form","#mainFrame").attr("action",root+$href);
            });
        },

        reloadView:function(e,option){
            if(e.returnValue){
                $("#mainFrame").load(root+"/vSiteMasterManage/view.html?id="+$("[name='id']").val());
            }
        },

        /*requery:function(event,option) {
            $("#mainFrame").load(window.top.topPage.getCurrentFormAction(event));
        },*/

        requery:function(event,option) {
            if (event.returnValue==true)
                $("div.panel ul li.active a").trigger("click");
        },

        _requery:function(event,option) {
            $("div.panel ul li.active a").trigger("click");
        },

        accountSaveCallBack:function(event,option) {
            if (event.returnValue==true) {
                this.query(event,option);
            } else if (event.returnValue) {
                $("#mainFrame").load(root+"/vSysSiteManage/siteBasic.html?search.step=1&search.sysUserId="+event.returnValue);
            }
        },
        accountCallback: function (e, opt) {
            var _this = this;
            if(opt.data.state){
                page.showPopover(e, {"callback": function (event,option) {
                    console.log(opt.data.url);
                    window.top.topPage.doDialog({page:_this},{text:window.top.message.common['msg'],
                        target: root + "/siteSubAccount/showUrl.html?username="+opt.data.username+"&host="+opt.data.host+"&secret="+opt.data.secret});
                },"placement":"left"}, 'success', '操作成功', true);
            }else{
                var msg = opt.data.msg;
                if(msg==null||msg==""){
                    msg = "操作失败";
                }

                page.showPopover(e, {"callback": function () {
                },"placement":"left"}, 'danger', msg, true);
            }
        }

    });
});