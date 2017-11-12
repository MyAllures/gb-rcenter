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
                        _this.onResize();
                        window.onresize=_this.onResize;
                        if(window.top.location.hash!=""){
                            window.top.topPage.showPage(window.top.location.hash.substr(1));
                        }else {
                            window.top.location.hash = currentPage;
                        }
                    }
                    _this.showMenu();
                }
            });
        },
        onResize:function () {
            $("#mainFrame").css("minHeight", $(window).height() - $(".top:first").outerHeight() - $(".footer:first").outerHeight());
            $("#mainFrame").css("maxHeight", $(window).height() - $(".top:first").outerHeight() - $(".footer:first").outerHeight());
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
    });

});