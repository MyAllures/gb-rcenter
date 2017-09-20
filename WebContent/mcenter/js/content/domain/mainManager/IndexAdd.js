/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
            this.resizeDialog();
            this.domainIdEnable();
        },
        bindEvent: function () {
            this._super();
            var _this=this;
            this.onRankCheckboxChange();
            //主域名，层级全选，管理中心去不选
                $(".all_rank").click();
            $(this.formSelector).on("change blur","input[name='result.domain']", function () {
                //线路域名没填或格式不对，提交按钮禁用
                _this.domainIdEnable();
            })

        },
        onPageLoad: function () {
            this._super();
        },
        onRankCheckboxChange:function(){
            $('input[type=radio]').on('click',function(){
                var $this = $(this);
                var allRank = $this.hasClass('all_rank');
                $('input[type=checkbox].rank').prop('checked',allRank).prop('disabled',allRank)
                $("input[name='result.isForAllRank']").val(allRank);
            });

            $('input[type=checkbox].rank').on('click',function(){
                $(this).is(":checked") && $('input[name="result.rankType"].some_rank').prop('checked',true);
            });
        },
        getValidateRule:function($form){
            var that = this;
            var rule = that._super($form);
            $form.validate(rule);
        },
        saveDomain:function(e,p){
            if (!this.validateForm(e)) {
                return false;
            }
            $("input[name='result.isForAllRank']").val($("input.all_rank").is(":checked"));
            $('input[type=checkbox].rank').prop('disabled',false);
            return true;
        } ,
        viewPrompt: function (e) {
            _this=this;
            window.top.topPage.showSuccessMessage(window.top.message.content['sysdomain.success'], function () {
                _this.closePage();
            });
            //this.closePage();
        },
        //线路域名是否有效
        domainIdEnable: function () {
            var domain=$("input[name='result.domain']").val();
            var checkNum = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
            if($.trim(domain).length>0&&checkNum.test(domain)){
                $("._search").unlock();
                $("._search").removeClass("disabled");
            }else{
                $("._search").lock();
                $("._search").addClass("disabled");
            }
        }
    });
});