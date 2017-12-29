/**
 * 资金管理-充值管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form";
            this._super();
            this.queryCount();
        },
        bindEvent: function () {
            var _this = this;
            $(this.formSelector).on("click", "table tr", function (e) {
                _this.selectTr(e);
            });
        },
        /**
         * 重写query中onPageLoad方法，为了查询回调函数带页面初始化方法
         * @param form
         */
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover() //弹窗
                .on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
                    $(this).parent().siblings().find('[data-toggle="popover"]').popover('hide');
                });
            $('body').on('click', function(event) {
                var target = $(event.target);
                if (!target.hasClass('popover') //弹窗内部点击不关闭
                    && target.parent('.popover-content').length === 0
                    && target.parent('.popover-title').length === 0
                    && target.parent('.popover').length === 0
                    && target.data("toggle") !== "popover") {
                    //弹窗触发列不关闭，否则显示后隐藏
                    $('[data-toggle="popover"]',_this.formSelector).popover('hide');
                }
            });


        },
        /**
         * 检测转账状态
         * @param e
         * @param option
         */
        checkStatus: function (e, option) {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/operate/transferBySite/checkTransfer.html?search.transactionNo=" + option.transactionNo + "&siteId=" + option.siteId,
                loading: true,
                dataType: 'json',
                success: function (data) {
                    if (data.state == true) {
                        var transferState = data.transferState;
                        if (transferState == 'success') {
                            window.top.topPage.showInfoMessage("该笔订单已自动处理为成功！");
                        } else if (transferState == 'failure') {
                            window.top.topPage.showInfoMessage("该笔订单已自动处理为失败！失败原因为：" + data.reason);
                        } else {
                            window.top.topPage.showInfoMessage("获取api结果为处理中，请稍后再试！获取api结果为：" + data.reason);
                        }
                    } else {
                        window.top.topPage.showErrorMessage("非法请求：无订单或者订单已处理，可刷新页面重新尝试！");
                    }
                    _this.query(e);
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    window.top.topPage.showInfoMessage("服务忙，请稍后再试！");
                    $(e.currentTarget).unlock();
                }
            })
        },
        selectTr: function (e) {
            var $checkbox = $(e.currentTarget).find("input[type=checkbox]");
            var $checkTarget = $("input[type=checkbox]:checked");
            if (e.target.tagName != 'INPUT' && $checkbox.val() != $checkTarget.val()) {
                $("input[type=checkbox]").prop("checked", false);
                $(e.currentTarget).find("input[type=checkbox]").prop("checked", true);
            } else {
                $(e.currentTarget).find("input[type=checkbox]").prop("checked", false);
            }
        },
        /**
         * 执行查询
         * @param event         事件对象
         */
        query : function(event) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            if(!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading:true,
                    url:window.top.topPage.getCurrentFormAction(event),
                    headers: {
                        "Soul-Requested-With":"XMLHttpRequest"
                    },
                    type:"post",
                    data:this.getCurrentFormData(event),
                    success:function(data){
                        var $result=$(".search-list-container",$form);
                        $result.html(data);
                        event.page.onPageLoad();
                        event.page.toolBarCheck(event);
                        $(event.currentTarget).unlock()},
                    error:function(data, state, msg){
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }});
                this.queryCount();
            } else {
                $(event.currentTarget).unlock();
            }
        },
        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function () {
            var _this = this;
            var url = root + "/gameApiLog/count.html";
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#paginationDiv").html(data);
                    _this.initSelect();
                    $(_this.formSelector + " .search-wrapper [selectDiv]").attr("callback", "selectListChange");
                },
                error: function (data) {

                }
            })
        }

    });
});