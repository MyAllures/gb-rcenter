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
            this._super();
            //显示与隐藏按钮

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
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            _this.unInitSwitch($bootstrapSwitch).bootstrapSwitch({
                onText: "已下架",
                offText: "下架"
            });
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //preview
            var _this = this;
            $(this.formSelector).on('click', 'tbody td img', function (e, opt) {
                e.imgs = [$(this).data('src')];
            });
            $(this.formSelector).on("switchChange.bootstrapSwitch", 'input[name="my-checkbox"]',function(e,state) {
                var $this = $(this);
                $this.bootstrapSwitch('indeterminate',true);
                var _target = e.currentTarget;
                var value = $this.attr("isRemove");//$(this).siblings('input').attr('isRemove');
                var check = value == 'true';
                var id = $this.attr("pid");//$(this).siblings('input').attr('pid');
                var _msg;
                if (check) {
                    _msg = "确定启用吗？启用后将在前台显示！";
                    window.top.topPage.showConfirmMessage(_msg, function (confirm) {
                        _this._changeDisplayState(e, _target, confirm, id, check,$this)
                    });
                } else {
                    var obj = {};
                    obj.page = _this;
                    obj.currentTarget = $(this);
                    var opt={};
                    opt.text="消息";
                    opt.callback= function (e,opt) {
                        $this.bootstrapSwitch('indeterminate',false);
                        window.top.page.query(e);

                    };
                    opt.target=root+"/vSiteContentAudit/removeContent.html?entityId="+id+"&siteId="+$("[name='siteId']").val()+"&contentType="+$("[name='contentType']").val();
                    window.top.topPage.doDialog(obj,opt);
                    //_msg = "确定下架吗？下架后前端将隐藏！";

                }
            });
        },

        //手动切换效果
        _changeDisplayState: function (e, _target, confirm, id, state,ckbox) {
            var _this=this;
            if (confirm) {
                window.top.topPage.ajax({
                    url: root + "/vSiteContentAudit/removeLogo.html",
                    type: "post",
                    dataType: "json",
                    data: {"entityId": id, "remove": !state,"siteId":$("[name='siteId']").val(),"contentType":$("[name='contentType']").val()},
                    success: function (data) {
                        if (data.state) {
                            ckbox.bootstrapSwitch('indeterminate',false);
                            page.showPopover({"currentTarget":$(e.currentTarget).parent().parent()},{"callback": function () {
                                window.top.page.query({currentTarget:e.currentTarget,page:_this});
                            }},"success","操作成功",true);

                        }else{
                            page.showPopover(e,{},"fail","操作失败",true);
                        }
                    }
                });
            }else{
                ckbox.bootstrapSwitch('indeterminate',false);
                ckbox.bootstrapSwitch('state', state,true);
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