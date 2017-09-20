/**
 * Created by cj on 15-7-29.
 */
define(['common/BaseListPage', 'bootstrapswitch'], function (BaseListPage, bootstrapSwitch) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
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
            var _this = this;

            //显示与隐藏按钮
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            _this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch(
                {
                    onText: window.top.message.content['floatPic.display.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    disabled: true,
                    onInit: function (e) {
                    }
                }
            );

            //干掉disabled的遮罩效果
            $('table .bootstrap-switch').each(function () {
                $(this).addClass('warn');
            });

            //加上confirm
            $('table .bootstrap-switch span').click(function (e) {
                var _target = e.currentTarget;
                var value = $(this).siblings('input').attr('st');
                var check = value == 'true';
                var id = $(_target).parents('td').siblings('th').children().val();
                var _msg;
                if (check) {
                    _msg = window.top.message.content['floatPic.display.notice.off'];
                } else {
                    _msg = window.top.message.content['floatPic.display.notice.on'];
                }
                window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                    _this._changeDisplayState(e, _target, confirm, id, check)
                });
            });
            /*$(this.formSelector).on('mouseover', '.singleModeTemplateImageType', function () {
                var src = $(this).attr("src");
                if(src!=""){
                    var dotIdx = src.lastIndexOf(".");
                    var subfix = src.substring(dotIdx+1);
                    var overImg = src.substring(0,dotIdx)+"-hover."+subfix;
                    $(this).attr("src",overImg);
                }
            });
            $(this.formSelector).on('mouseout', '.singleModeTemplateImageType', function () {
                var src = $(this).attr("src");
                if(src!=""){
                    var outImg = src.replace("-hover","");
                    $(this).attr("src",outImg);
                }
            });

            $(this.formSelector).on('mouseover', '.listModeTemplateImageType', function () {
                var overImg = $(this).attr("mouseoverimage");
                $(this).attr("src",overImg);
            });
            $(this.formSelector).on('mouseout', '.listModeTemplateImageType', function () {
                var normalImg = $(this).attr("normalEffect");
                $(this).attr("src",normalImg);
            });*/
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
            //preview
            var _this = this;
            $(this.formSelector).on('click', 'tbody td img', function (e, opt) {
                e.imgs = [$(this).data('src')];
                //window.top.topPage.imageSilde(e,opt);
            });
        },

        //手动切换效果
        _changeDisplayState: function (e, _target, confirm, id, state) {
            var _this=this;
            if (confirm) {
                window.top.topPage.ajax({
                    url: root + "/cttFloatPic/changeStatus.html",
                    type: "post",
                    dataType: "json",
                    data: {"result.id": id, "result.status": !state},
                    success: function (data) {
                        if (data.state) {
                            $(_target).siblings('input').bootstrapSwitch('disabled', false);
                            $(_target).siblings('input').bootstrapSwitch('state', !state);
                            $(_target).siblings('input').bootstrapSwitch('disabled', true);
                            $(_target).siblings('input').attr('st', !state);
                            window.top.page.query({currentTarget:e.currentTarget,page:_this});
                        }
                    }
                });
            }
        },
        batchDelete: function (e, opt) {
            var _this = this;
            var selectIds = this.getSelectIdsArray(e);
            if (selectIds.length > 0) {
                var ids = this.getSelectIds(e, opt);
                window.top.topPage.ajax({
                    url: root + "/cttFloatPic/exsitUsing.html",
                    type: "post",
                    dataType: "json",
                    data: ids,
                    success: function (data) {
                        var _msg;
                        if (data) {
                            _msg = window.top.message.content['floatPic.notice.delete.hasUsing'];
                        } else {
                            _msg = window.top.message.content['floatPic.notice.delete.noUsing'];
                        }
                        window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                            if (confirm) {
                                _this._doDelete(ids, e, opt);
                            }
                        });
                    }
                });
            }
            $(e.currentTarget).unlock();
        },
        /**
         * 删除
         * @param ids
         * @private
         */
        _doDelete: function (ids, e, opt) {
            window.top.topPage.ajax({
                url: root + "/cttFloatPic/batchDelete.html",
                type: "post",
                dataType: "json",
                data: ids,
                success: function (data) {
                    if (data.state) {
                        window.top.topPage.showSuccessMessage(data.okMsg);
                        window.top.page.query(e, opt);
                        $(e.currentTarget).parent().addClass('hide');
                    } else {
                        window.top.topPage.showErrorMessage(data.errMsg);
                    }
                }
            });
        }
    });
});