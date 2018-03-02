/**
 * 资金管理-出款详细
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        allFee: null,
        init: function () {
            this.formSelector = "form[name=withdrawStatusViewForm]";
            this._super(this.formSelector);
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this=this;
            //复制按钮
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                var opt = {};
                if($(e.target).attr("id")=="transactionNo-copy"){
                    opt.placement = "left";
                }else{
                    opt.placement = "right";
                }
                page.showPopover(e, opt, 'success', window.top.message.fund_auto['复制成功'], true);
            });

            $("[about='playerAccount']").click(function () {
                if ($(this).next().attr('style') != 'display: block;') {
                    $(this).next().attr('style', 'display: block;');
                } else {
                    $(this).next().removeAttr('style');
                }
            });
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },

        editRemark: function (e, opt) {
            $(".edit-btn-css").addClass("hide");
            $(".save-btn-css").removeClass("hide");
            $(".cancel-btn-css").removeClass("hide");
            $("[name='remarkContent']").removeAttr("readonly");
            $(e.currentTarget).unlock();
        },
        cancelEdit: function (e, opt) {
            $(".edit-btn-css").removeClass("hide");
            $(".save-btn-css").addClass("hide");
            $(".cancel-btn-css").addClass("hide");
            var checkRemark = $("input[name=checkRemark]").val();
            $("[name='remarkContent']").val(checkRemark);
            $("[name='remarkContent']").attr("readonly", "readonly");
            $(e.currentTarget).unlock();
        },
        afterSaveRemark: function (e, opt) {
            var _this = this;
            var status = $("[name='withdrawStatus']").val();
            if (opt.data.state) {
                var checkRemark = $("textarea[name='remarkContent']").val();
                $("input[name=checkRemark]").val(checkRemark);
                if(status=='1'){
                    opt.callback= function () {

                    };
                }else{
                    opt.callback='cancelEdit';
                }

                e.page.showPopover(e, opt, 'success', window.top.message.common['operation.success'], true);
            } else {
                e.page.showPopover(e, opt, 'danger', window.top.message.common['operation.fail'], true);
            }
        },
        userDetail: function (e){
            var origin = window.location.origin;
            var playerId = $("input[name='playerId']").val();
            var url = origin + "/mcenter/#/player/playerView.html?search.id=" + playerId;
            window.open(url);
            $(e.currentTarget).unlock();
        },
        agentDetail: function (e){
            var origin = window.location.origin;
            var agentId = $("input[name='agentId']").val();
            var url = origin + "/mcenter/#/userAgent/agent/detail.html?search.id=" + agentId;
            window.open(url);
            $(e.currentTarget).unlock();
        },
        /**
         * 刷新页面
         * @param e
         * @param opt
         */
        refreshBack: function (e, opt) {
            if(e.returnValue) {
                window.location.reload();
            }
        }
    });
});