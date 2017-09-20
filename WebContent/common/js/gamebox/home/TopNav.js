define(['bootstrap-dialog','jsrender'], function (BootstrapDialog,jsrender) {
    return Class.extend({
        topMenu:".navbar-nav",
        init: function () {
            var _this = this;
            window.top.topPage.ajax({
                cache: true,
                type: "GET",
                loading:true,
                url: root+"/sysResource/fetchAllMenus.html",
                success: function (data) {
                    if(data == "[]"){
                        window.top.topPage.showErrorMessage("获取菜单为空");
                        return;
                    }
                    var json = eval(data);
                    var currentPage='';
                    if(json.length>0) {
                        var html = $("#topMenuTmpl").render({m: json});
                        $(_this.topMenu).html(html);
                        if(json[0].object.resourceUrl){
                            currentPage = "#/" + json[0].object.resourceUrl;
                        }else{
                            if(json[0].children.length>0){
                                currentPage="#/"+json[0].children[0].object.resourceUrl;
                            }
                        }
                        $("#mainFrame").css("minHeight", $(window).height() - $(".top:first").outerHeight() - $(".footer:first").outerHeight());
                        $("#left-menu").css("height",$("#mainFrame").height()+50+"px");
                        if(window.top.location.hash!=""){
                            window.top.topPage.showPage(window.top.location.hash.substr(1));
                        }else {
                            window.top.location.hash = currentPage;
                        }
                    }
                    _this.showMenu();
                }
            });
            _this.language();
            _this.buildHomeLink();
        },

        setFirstUrl: function (url) {
            window.top.topPage.ajax({
                cache: true,
                type: "GET",
                sync:false,
                loading: true,
                url: url,
                success: function (data) {
                    var targetSelect;
                    if(location.hash.length>1){
                        if($("[href='"+location.hash.substr(1)+"'][nav-top]").length==0) {
                            $("#mainFrame").html(data);
                            targetSelect="#mainFrame";
                        }else{
                            targetSelect="#mainFrame";
                        }
                        $(targetSelect).html("");
                        window.top.topPage.ajax({
                            cache: true,
                            type: "GET",
                            sync:false,
                            loading: false,
                            url: root+location.hash.substr(1),
                            success: function (data1) {
                                $(targetSelect).html(data1);
                            }
                        });
                    }else{
                        $("#mainFrame").html(data)
                    }
                }
            });
        },

        showMenu: function () {
            {$(".navbar-nav .dropdown").hover(
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').show();
                    $(this).toggleClass('open');
                },
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').hide();
                    $(this).toggleClass('open');
                }
            );}
        },

        buildHomeLink: function () {
            $(".home a").bind("click",function(e)
            {
                if(root!=window.location.href && root+"/index.html"!=window.location.href)
                {
                    window.location.href=root;
                }
                return false;
            });
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
                            var val = languageI18n[value.language];
                            var vals = val.split("#");
                            if (value.language.indexOf(languageCurrent) > -1) {
                                ali = '<img src="' + resComRoot + vals[1] + '" data-rel=\'{"languageWarn":"' + languageWarn + '"}\' class="m-r-xs">' + vals[0] + '<span class="caret m-l-xs"></span>'
                            }else{
                                lis += '<li><a href="javascript:void(0)" change="language" ><img src="' + resComRoot + vals[1] + '" class="m-r-xs" data-rel=\'{"lang":"' + vals[2] + '","country":"' + vals[3] + '"}\'>' + vals[0] + '</a></li>'
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