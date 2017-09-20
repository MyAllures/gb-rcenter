define(['gb/home/TopNav'], function (TopPage) {

    return TopPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            var _this = this;
            _this.language();
            window.top.topPage.ajax({
                cache: true,
                type: "GET",
                loading:true,
                url: "sysResource/fetchRootMenus.html",
                success: function (data) {
                    var json = eval(data);
                    if(json.length>0) {
                        if(!json[0].object.resourceUrl){
                            var html = $("#topMenuTmpl").render({m: json});
                            $(_this.topMenu).html(html);
                            $( $(_this.topMenu).children().children("a")[0]).click()
                        }else {
                            window.top.topPage.ajax({
                                cache: true,
                                type: "GET",
                                sync:false,
                                loading: false,
                                url: json[0].object.resourceUrl,
                                success: function (data) {
                                    var html = $("#topMenuTmpl").render({m: json});
                                    $(_this.topMenu).html(html);
                                    $(".top-navigation").removeClass("hide");
                                    var targetSelect;
                                    if(location.hash.length>1){
                                        if($("[href='"+location.hash.substr(1)+"'][nav-top]").length==0) {
                                            $("#page-content").html(data);
                                            targetSelect="#mainFrame";
                                        }else{
                                            targetSelect="#page-content";
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
                                                //加载二级菜单第一条
                                                var menuitem= $("#side-menu li a[nav-target]",targetSelect);
                                                if(menuitem.length>0){
                                                    $('.preloader').show();
                                                    $("#mainFrame").load(root+$(menuitem[0]).attr("href"),function() {
                                                        $('.preloader').hide();
                                                    });
                                                }
                                            }
                                        });
                                    }else{
                                        $("#page-content").html(data)
                                    }
                                }
                            });
                        }
                        $("#page-content").css("minHeight", $(window).height() - $(".top:first").outerHeight() - $(".footer:first").outerHeight());
                    }
                }
            });
        }
    });
});