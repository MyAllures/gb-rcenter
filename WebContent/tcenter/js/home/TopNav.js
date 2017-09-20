define(['bootstrap-dialog','jsrender'], function (BootstrapDialog,jsrender) {
    return Class.extend({
        topMenu:"#side-menu",
        init: function () {
            var _this = this;
            window.top.topPage.ajax({
                cache: true,
                type: "GET",
                url: "index/content.html",
                success: function (data) {
                    $("#page-content").html(data);
                    if(location.hash.length>1) {
                        document.title = window.top.topPage.currentMenuTitle(location.hash.substr(1));
                        $("#mainFrame").load(root+location.hash.substr(1));
                    }else{
                        $(_this.topMenu + " li a").first().click();
                    }
                }
            });
            _this.language();
        },
        /**
         *
         */
        exit: function () {
            if(confirm(window.top.message.home_auto['您确定要退出系统'])) {
                window.location.reload();
                //$.ajax({
                //    url: joy.getWebRootPath()+"/logout?_joy_key__logout_method_code=11",
                //    error: function (request) {
                //        alert("发生未预期的错误！");
                //    },
                //    success: function (data) {
                //        window.location.reload();
                //    }
                //});
            }
        },
        /**
         * 多语言选项初始化
         * ＠author: Simon
         */
        language : function(){
            var _this=this;
            window.top.topPage.ajax({
                url:root+'/index/language.html',
                dataType:'json',
                cache: false,
                type:"get",
                success:function(data){
                    var languageCurrent = data.languageCurrent;
                    var languageI18n = data.languageI18n;
                    var languageWarn = window.top.message.common['language.change.warn'];
                    var lis = '';
                    var ali;
                    if(data.languageDicts) {
                        $.each(data.languageDicts, function (key, value) {
                            var val = languageI18n[value.dictCode];
                            var vals = val.split("#");
                            lis += '<li><a href="javascript:void(0)" change="language" ><img src="' + resComRoot + vals[1] + '" class="m-r-xs" data-rel=\'{"lang":"' + vals[2] + '","country":"' + vals[3] + '"}\'>' + vals[0] + '</a></li>'
                            if (key.indexOf(languageCurrent) > -1) {
                                ali = '<img src="' + resComRoot + vals[1] + '" data-rel=\'{"languageWarn":"' + languageWarn + '"}\' class="m-r-xs">' + vals[0] + '<span class="caret m-l-xs"></span>'
                            }
                        });
                    }
                    $("#divLanguage ul").html(lis);
                    $("#divLanguage button").html(ali);
                    _this.changelanguage();
                }});
        },
        /**
         * 多语言选项切换
         * ＠author: Simon
         */
        changelanguage :function(){
            $(document).on("click","ul li [change='language']", function () {
                var img = $(this).children("img");
                var data_rel = $.parseJSON(img.attr("data-rel"));
                var warn_msg = $.parseJSON($(this).parent().parent().prev().children("img").attr("data-rel"));
                window.top.topPage.showConfirmMessage(warn_msg.languageWarn,function(result)
                {
                    if(result) {
                        window.top.topPage.ajax({
                            url:root+'/index/language/change.html',
                            dataType:'json',
                            cache: false,
                            data: {'lang':data_rel.lang,'country':data_rel.country},
                            type:"get",
                            success:function(data){
                                window.top.topPage.showSuccessMessage(data.msg,function(){
                                    location.reload();
                                });
                            }});
                    }
                });
            });
        }

    });

});