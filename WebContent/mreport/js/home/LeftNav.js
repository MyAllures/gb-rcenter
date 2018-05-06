define(['bootstrap-dialog','jsrender'], function (BootstrapDialog, jsrender) {
    return Class.extend({
        topMenu:"#side-menu",
        init: function () {
            var _this = this;
            var defaultIndex = "/home/index.html";
            window.top.topPage.ajax({
                cache: true,
                type: "GET",
                url: "index/content.html",
                success: function (data) {
                    $("#side-menu-nav").html(data);
                    if(window.top.location.hash!="") {
                        window.top.topPage.showPage(window.top.location.hash.substr(1));
                        _this.lightUp();
                    } else {
                        window.top.location.hash = defaultIndex;
                        _this.lightUp();
                    }
                },
                complete: function () {
                    // 一定要等ajax加载完菜单之后再绑定事件
                    _this.bindEvent();
                }
            });

            _this.language();
        },

        /**
         * 当前对象事件初始化
         */
        bindEvent: function () {
            _this = this;

            window.top.topPage.bindNavigation();

            // 左侧一级菜单收缩
            $('.list-group-item').click(function() {
                if($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).children().filter('.hideMenu').stop().slideUp();
                } else {
                    $(this).addClass("active").siblings().removeClass("active");
                    $('.hideMenu').stop().slideUp();
                    $(this).children().filter('.hideMenu').stop().slideDown();
                }
            });

            // 左侧二级菜单点亮
            $('.hideMenu a').click(function(e) {
                e.stopPropagation();//阻止事件冒泡
                if ($(this).attr("href")!=='#') {
                    $(this).parent().addClass("active").siblings().removeClass("active");
                }
            });

            $('.dropdown-toggle').click(function(e) {
                $(this).next('.dropdown-menu').stop().slideToggle();
                $(this).focus();
                $(this).blur(function() {
                    $(this).next('.dropdown-menu').stop().slideUp();
                });
            });
        },

        /**
         * 点亮菜单
         */
        lightUp: function () {
            var currentPage = window.top.location.hash.substr(1);
            $("a[nav-target]").each(function() {
                if($(this).attr("href").indexOf(currentPage)>=0) {
                    $(this).parent().addClass('active');
                    return false;
                }
            });
        },

        /**
         * 退出系统
         */
        exit: function () {
            if(confirm(window.top.message.home_auto['您确定要退出系统'])) {
                window.location.reload();
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
                    if (result) {
                        window.top.topPage.ajax({
                            url: root + '/index/language/change.html',
                            dataType: 'json',
                            cache: false,
                            data: {'lang': data_rel.lang, 'country': data_rel.country},
                            type: "get",
                            success: function (data) {
                                window.top.topPage.showSuccessMessage(data.msg, function () {
                                    location.reload();
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});