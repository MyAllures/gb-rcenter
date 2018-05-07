/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage','gb/share/ListFiltersPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super();
            //this.initShowTab()
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
        },

        /**
         * 查看活动详情点击时间
         * @param e
         * @param opt
         */
        showMonitorDetail: function (e, obj) {
            _this = this;
            if ($(obj).attr("data-content") != '') {
                return;
            }

            var detailId = $(obj).attr("detailId");
            var activityType = $(obj).attr("activityType");
            //异步取监控详情;
            window.top.topPage.ajax({
                url: root + '/activityHall/vActivityMonitor/showMonitorDetail.html',
                dataType: "json",
                data: {"search.id": detailId},
                success: function (data) {
                    if (data != null) {
                        $(obj).attr("data-content", data.msg);
                        $(obj).trigger("mouseover");
                        $(obj).attr("data-content", "");
                    }
                }
            });
        },

        onPageLoad:function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'click',
                html: true
            });
            var _this=this;
            $(".showMonitorDetail").click(function (e,opt) {
                _this.showMonitorDetail(e,this);
            });
        },

        /**
         * 审核成功弹窗
         * @param e
         */
        successDialog: function (e) {
            var ids = this.getSelectIdsArray(e).join(",");
            var playerRechargeIds = [],counter = 0;
            $("table tbody input[type=checkbox]",this.getCurrentForm(e)).not("[name=my-checkbox]").each(function(node,obj) {
                if(obj.checked) {
                    playerRechargeIds[counter] = $(obj).attr("data-id");
                    counter++;
                }
            });

            if (ids != "") {
                var sumPerson = $(".function-menu-show").attr("sumPerson");
                var code = $(".function-menu-show").attr("code");
                var btnOption = {};
                btnOption.target = root + "/activityHall/vActivityPlayerApply/successDialog.html?code="+code+"&ids=" + ids +"&sumPerson="+sumPerson;
                btnOption.callback = this.back;
                btnOption.text = e.currentTarget.title;
                window.top.topPage.doDialog(e, btnOption);
            }

        },
        /**
         * 审核失败弹窗
         * @param e
         */
        failDialog: function (e,opt) {
            var ids = this.getSelectIdsArray(e).join(",");
            if (ids != "") {
                var activityName = $('.textVal').text();
                var activityTypeCode = $('.h3').attr("data-code");
                var btnOption = {};
                btnOption.target = root + "/activityHall/vActivityPlayerApply/failDialog.html?ids=" + ids + "&search.activityName=" + activityName + "&search.activityTypeCode=" + activityTypeCode;
                btnOption.callback = this.back;
                btnOption.text = e.currentTarget.title;
                window.top.topPage.doDialog(e, btnOption);
            }

        },

        hasFailReason: function (e,opt) {
            var _this = this;
            window.top.topPage.ajax({
                type: 'POST',
                url: root + "/activityHall/vActivityPlayerApply/hasReason.html",
                dataType: "json",
                success: function (data) {
                    if(data.state){
                        _this.failDialog(e,opt)
                    }else{
                        window.top.topPage.showConfirmMessage(window.top.message.operation_auto['确认审核失败吗'], function (state) {
                            if(state){
                                //_this.auditFail(e,opt);
                                window.top.topPage.doAjax(e, opt);
                            }
                        });
                    }
                    $(e.currentTarget).unlock();
                }
            });
            return false;
        },
        /*auditFail: function (e,opt) {
            var _this = this;
            var ids = this.getSelectIdsArray(e);
            var data = {};
            data.ids = ids;
            var activityTypeCode = $('.h3').attr("data-code");
            window.top.topPage.ajax({
                type: "post",
                url: root + "/operation/vActivityPlayerApply/auditStatus.html?activityType="+activityTypeCode+"&result.checkState=3",
                data: {"ids":ids},
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.msg, function (result) {
                            e.returnValue = true;
                            _this.back(e);
                        });
                    }else{
                        alert(window.top.message.operation_auto['失败']);
                    }
                }
            });
        },*/
        /**
         * 回调：审核通过后回调到列表页面
         * jerry
         */
        back: function (e) {
            if (e.returnValue) {
                $('.search_btn').click();
            }
        }

    });
});