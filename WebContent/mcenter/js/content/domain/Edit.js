/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
            this.domainIdEnable();
            this.showMassage();
        },
        bindEvent: function () {
            var _this=this;
            this._super();

            this.resizeDialog();
            //$(this.formSelector).on("change blur", "textarea[name='result.domain']", function () {
            $(this.formSelector).on("input","textarea[name='result.domain']", function () {
                //线路域名没填或格式不对，提交按钮禁用
                _this.domainIdEnable();
            })
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'right'
            });
        },
        getValidateRule:function($form){
            var that = this;
            var rule = that._super($form);
            $form.validate(rule);
        },
        saveDomain:function(e,p){
            var that = this;
            //设为默认
            $("input[name='result.isDefault']").val($("#isDefault").is(":checked"));
            if (!this.validateForm(e)) {
                return false;
            }
            if (!that.validateForm(e)) {
                return false;
            }
            return true;
        } ,
        //选择管理中心隐藏层级
        isShowRank: function (e) {
            var _this=this;
             var pagUrl= e.key;
            var isEnable=$("input[name='result.isEnable']").val();
            _this.showMassage();
            $("#user_for_agent").hide();
            $(".isDefault").hide();

            //主页,线路检测
            if(pagUrl == "/" || pagUrl == "/index/cname.html"){
                //是主页,绑定完成,启用,全部层级 显示默认域名选项
                var resolveStatus = $("input[name='result.resolveStatus']").val();
                if(pagUrl == '/' && resolveStatus=='5' && isEnable=='true'){
                    $(".isDefault").show();
                }
                $("#user_for_agent").show();
            }
            //管理中心域名,代理,总代
            else if(pagUrl=='/mcenter/passport/login.html'|| pagUrl=='/tcenter/passport/login.html' || pagUrl=='/acenter/passport/login.html'){
                //隐藏是否是默认域名选项

            }
                //VIP通道  和  在线支付
            else if(pagUrl=='/passport/login.html' || pagUrl=='/onLinePay'){
            }

            _this.resizeDialog();
        },
        //线路域名是否有效
        domainIdEnable: function () {
            var checkNum = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
            var domain=$("textarea[name='result.domain']").val();
            if(domain!=""){
                var last = domain.charAt(domain.length - 1);
                if (last == '\n') {
                    domain = domain.substring(0, domain.length - 1);
                }
                var urls = domain.split(",");
                var isDomain = true;
                var badUrl = "";
                var newDomailUrl = "";
                for(var i=0;i<urls.length;i++){
                    var newStr =urls[i].replace(/^\s+|\s+$/g,'');
                    if(!checkNum.test(newStr)){
                        isDomain = false;
                        badUrl += urls[i] + ",";
                    }
                    newDomailUrl += newStr + ",";
                }
                if(newDomailUrl!=""){
                    newDomailUrl = newDomailUrl.substring(0, newDomailUrl.length - 1);
                    $("textarea[name='result.domain']").val(newDomailUrl);
                }

                if(!isDomain){
                    if(badUrl.length>0){
                        badUrl = badUrl.substring(0,badUrl.length-1);
                        var e = {};
                        var _this=this;
                        e.currentTarget = $("textarea[name='result.domain']");
                        page.showPopover(e, {}, 'warning', _this.formatStr(window.top.message.content_auto['输入的域名'],badUrl),true);
                    }
                    $("._search").lock();
                    $("._search").addClass("disabled");
                    $("#isCorrect").hide();
                }else{
                    $("._search").unlock();
                    $("#isCorrect").show();
                    $("._search").removeClass("disabled");
                }
            }else{
                $("._search").lock();
                $("#isCorrect").hide();
                $("._search").addClass("disabled");
            }
            /*var domain=$("textarea[name='result.domain']").val();
            var checkNum = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
            if(domain&&$.trim(domain).length>0){
                //&&checkNum.test(domain)){
                $("._search").unlock();
                $("._search").removeClass("disabled");
                $("#isCorrect").removeClass('hide');
            }else{
                $("._search").lock();
                $("._search").addClass("disabled");
                $("#isCorrect").addClass('hide');
            }*/
        },
        showMassage : function () {
            //显示提示语
            $("#managerMsg").text($("[data-value='"+ $("[name='result.pageUrl']").val()+"']").text());
        }
    });
});