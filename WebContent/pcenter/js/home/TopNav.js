define(['bootstrap-dialog', 'jsrender'], function (BootstrapDialog, jsrender) {
    return Class.extend({
        topMenu: ".sidebar-nav",
        init: function () {
            var _this = this;
           /* window.top.topPage.ajax({
                cache: true,
                type: "GET",
                url: "index/content.html?t=" + new Date().getTime(),
                success: function (data) {
                    $("#page-content").html(data);
                    /!*if (location.hash.length > 1) {
                        $("#mainFrame").load(root + location.hash.substr(1));
                    } else {
                        $(_this.topMenu + " [nav-target='mainFrame']").first().click();
                    }*!/
                }
            });*/
            if (location.hash.length > 1) {
                var $select = $(".sidebar-nav .select", window.top.document);
                $select.removeClass("select");
                var url = location.hash.substr(1);
                var data = url.split("?");
                var $current = $(".sidebar-nav a[data^='"+data[0]+"']", window.top.document);
                $current.parent().addClass("select");
                //采用统一的打开方式，解决权限密码问题
                window.top.topPage.hashEvent.currentTarget=$current[0];
                window.top.topPage.ajax({
                    url: root+url,
                    type: 'GET',
                    dataType: "html",
                    eventCall:eventCall=function(e){
                        window.top.topPage.showPage();
                    },
                    success: function(data) {
                        document.title = window.top.topPage.currentMenuTitle(url);
                        $("#mainFrame").html(data);
                    }
                });
            } else {
                $(_this.topMenu + " [nav-target='mainFrame']").first().click();
            }
            _this.language();

        },
        bindEvent: function () {
        },
        /**
         * 多语言选项初始化
         * ＠author: Simon
         */
        language: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/index/language.html',
                dataType: 'json',
                cache: false,
                type: "get",
                success: function (data) {
                    var languageCurrent = data.languageCurrent;
                    var languageI18n = data.languageI18n;
                    var languageWarn = window.top.message.common['language.change.warn'];
                    var lis = '';
                    var ali;
                    if (data.languageDicts) {
                        $.each(data.languageDicts, function (key, value) {
                            var language = value.language;//zh_CN
                            var val = languageI18n[language];
                            var vals = val.split("#");
                            lis += '<li><a href="javascript:void(0)" change="language" lang="' + vals[2] + '" country="' + vals[3] + '" rel="' + vals[2] + '"><span class="flag ' + vals[2] + '"></span>' + vals[0] + '</a>'
                            if (language.indexOf(languageCurrent) > -1) {
                                ali = '<span class="flag ' + vals[2] + '"></span>' + vals[0]
                            }
                        });
                    }
                    $("#divLanguage ul").html(lis);
                    $("#divLanguage p").html(ali);
                    _this.changelanguage(languageCurrent);
                }
            });
        },
        /**
         * 多语言选项切换
         * ＠author: Simon
         */
        changelanguage: function (currLang) {
            $(document).on("click", "ul li [change='language']", function () {
                var lang = $(this).attr("lang");
                var country = $(this).attr("country");
                if (currLang != lang + '_' + country) {
                    window.top.topPage.ajax({
                        url: root + '/index/language/change.html',
                        dataType: 'json',
                        cache: false,
                        data: {'lang': lang, 'country': country},
                        type: "get",
                        success: function (data) {
                            location.reload();
                        }
                    });
                } else {
                    $('#divLanguage ul').hide();
                }
            });
        }
    });

});