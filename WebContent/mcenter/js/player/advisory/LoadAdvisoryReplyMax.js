/**
 * 玩家管理-咨询
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this = this;
            $(".show-a-menu").click(function(){
                _this.showReply($(this));
            });
        },

        onPageLoad: function () {
            this._super();
            this.showReply($(".show-a-menu:last"));
        },

        showReply: function (obj) {
            var _this = this;
            var  $this = obj;
            var $reply = $this.parents('table.table-bordered').next().html();
            $(".delDiv").parent().removeClass("show");
            $(".delDiv").remove();
            var div_form = $("#reply div.replyDivs");
            var clone_div = $(div_form).clone(true);
            $(clone_div).find("[name=playerAdvisoryId_s]").attr("name","playerAdvisoryId");
            $(clone_div).find("[name=replyTitle_s]").attr("name","replyTitle");
            $(clone_div).find("[name=replyContent_s]").attr("name","replyContent");
            $(clone_div).addClass("delDiv");
            /*如果没有 就添加*/
            if(!$reply){
                $this.parents('table.table-bordered').next().html(clone_div);
                $this.parents('table.table-bordered').next().toggleClass('show');
            }
            var id = $this.parents('table.table-bordered').next().attr("id");
            var title = $this.parent().parent().prev().find(".al-left").text().trim();
            if(title.indexOf(window.top.message.player_auto['追问追问'])==0){
                title =  title.replace(window.top.message.player_auto['追问'],window.top.message.player_auto['回复追问']);
            }else{
                title =  window.top.message.player_auto['追问']+title;
            }
            $this.parents('table.table-bordered').next().find("input[name='replyTitle']").val(title);
            $this.parents('table.table-bordered').next().find("input[name='playerAdvisoryId']").val(id);
            _this.resizeDialog();
        },
        /**
         * 判断回复次数
         * @param e
         */
        checkReplyCount : function (e) {
            var target = e.currentTarget;
            var formData = window.top.topPage.getCurrentFormData(e);
            var playerAdvisoryId = $(target).parent().parent().attr("id");
            var playerId = $(target).parent().parent().attr("playerId");

            window.top.topPage.ajax({
                type:"post",
                url:root+"/player/view/checkReplyCount.html",
                data:{'search.playerAdvisoryId':playerAdvisoryId},
                success: function (data) {
                    if(data=="true"){
                        window.top.topPage.ajax({
                            type:"post",
                            url:root+"/player/save/reply.html",
                            dataType: "json",
                            data:formData,
                            success: function (data) {
                                if (data.state) {
                                    page.showPopover(e, {}, 'success', data.msg, true);
                                    setTimeout(function () {
                                        window.top.topPage.closeDialog();
                                    },1500);
                                    /*window.top.topPage.showSuccessMessage(data.msg, function () {
                                        window.top.topPage.closeDialog();
                                    });*/
                                }else{
                                    page.showPopover(e, {}, 'danger', data.msg, true);
                                    $(e.currentTarget).unlock();
                                }
                            }
                        })
                    }else{
                        page.showPopover(e, {}, 'danger', window.top.message.fund['fund.playerAdvisory.ReplyMax'], true);
                        //window.top.topPage.showWarningMessage(window.top.message.fund['fund.playerAdvisory.ReplyMax']);
                        $(e.currentTarget).unlock();
                    }
                }
            });
        }
    });

});