/**
 * Created by eagle on 15-11-08.
 */

define(['common/BaseEditPage'], function(BaseEditPage) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {
            this._super();

        },

        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件
        },

        /**
         *  设置真实姓名
         */
        showConfirmRealNameNext:function(e) {
            $("#realName1").hide();
            $("#realName2").show();
            $("[name='flag']").val(true);
            $("#confirmRealName").attr("name","confirmRealName");//此处解决compare有值返回上一步验证估计把name滞空
            $(e.currentTarget).unlock();
        },

        /**
         * 设置真实姓名 返回上一步
         */
        showConfirmRealNamePre:function(e) {
            $("#realName1").show();
            $("#realName2").hide();
            $("[name='flag']").val(false);
            $("#confirmRealName").attr("name","");//此处解决compare有值返回上一步验证估计把name滞空
            $(e.currentTarget).unlock();
        },

        /**
         * 回调关闭窗口
         * @param e
         * @param options
         */
        closeRealNameDialog:function(e,options) {
            var _this = this;
            e.returnValue = true;
            _this.closePage(e,options);
            var realName = $('[name="result.realName"]').val();
            if (options.text == 'ok' && realName != null && realName != '') {
                var overName = realName.substring(0, 1) + '*' + realName.substring(realName.length-1, realName.length);
                $('span.sname', parent.document).attr("class", "safeico sname realname-select");
                $('input[name=realName]', parent.document).val(overName);
                $('a.disable-gray', parent.document).hide();
                $('a.hidebtn', parent.document).removeClass('hidebtn');

                $('div.realName', parent.document).html('<input type="text" readonly="readonly" class="input bn" name="bankcardMasterName">')
                $('input[name=bankcardMasterName]', parent.document).val(overName);
                $('input[name=bankcardNumber2]', parent.document).removeAttr('disabled');
                $('input[name=bankDeposit]', parent.document).removeAttr('disabled');
                $('div.opeBtn', parent.document).append(window.top.message.accountManagement_auto['title确认'])
            }
            // window.top.topPage.showPage();
        }


    });
});
