/**
 * Created by jeff on 15-6-19.
 * 公共区域-快捷菜单
 */
define(['common/BasePage', 'nestable','curl/curl/plugin/json'], function(BasePage, nestable) {
    return BasePage.extend({
        formSelector:'.menu-item',
        mouse_count:0,
        timer:null,
        init:function (){
            this._super();
            this.bindEvent();
            /*this.loadShortcutMenu();*/
        },
        bindEvent:function(){
            var that = this;
            $("ul li.menu").off("click").click(function(event){
                $("ul li.menu").toggleClass("open");
                if(that.isHasLoad()){
                    that.loadShortcutMenu();
                }
                $("dl.menu-item").slideToggle(200);
                $(document).one("click", function () {
                    $("ul>li.menu").removeClass("open");
                    !$('dl.menu-item').is(':hidden') && $("dl.menu-item").hide();
                });
                event.stopPropagation();
            });
            //that.bindButtonEvents();
        },
        loadShortcutMenu:function(){
            var that = this;
            window.top.topPage.ajax({
                type: "GET",
                url: root+"/userShortcutMenu/getShortcutMenu.html",
                error: function (request) {

                },
                success: function (data) {
                    //隐藏loading
                    $("#shortcutMenu_loading").hide();
                    //html填充
                    $("#shortcutMenu_list").html(data);
                    //绑定事件
                    that.onPageLoad();
                    that.isHasLoad(false);
                }
            });
            //that.bindButtonEvents();
        },
        onPageLoad:function(){

            var that = this;
            //删除单个
            $("#shortcutMenu_list a.del").off("click").click(function(){
                var $this = $(this);

                var $this_data = $this.data();

                window.top.topPage.ajax({
                    type: "GET",
                    url: root+"/userShortcutMenu/deleteShortcutMenu.html",
                    data:{
                        'result.id':$this_data.id
                    },
                    success: function (data) {
                        data = eval('('+data+')');
                        if(data.state){
                            $this.parent("dd").remove();
                            if(!($("dd.add").length-1)){
                                $("#shortcutMenu_list").append($("#shortcutMenu_add").html());
                            }
                            if($("#shortcutMenu_list dd.tuo").length<1){
                                $("dd.none").removeClass('hide');
                            }
                        }
                        //that.shortcutSave();
                    }
                });
            });
            /**
             * 拖动排序初始化
             *
             */
            $(".dd").nestable({
                listNodeName:'ol',
                itemNodeName:'dd',
                handleClass:'dd-handle1',
                maxDepth:1
            });

            $(".dd").on('change', function() {
                var $this = $(this);
                that.UpdateShortcutMenuSort();
            });

            //显示删除按钮
            $("dl#shortcutMenu_list dd")
                .on("mouseover",function(){
                    $(this).addClass("shut");
                })
                .on("mouseleave",function(){
                    $(this).removeClass("shut");
            });

            $('.dd-item').mousedown(function(){

                //定时器
                that.mouse_count = 1;
                that.timer = setInterval(function(){that.mouse_count += 100;},100)
            });
            $('.dd-list').mouseup(function () {
                //取消定时器
                if(that.mouse_count && that.mouse_count < 300){
                    console.log(window.top.message.setting_auto['点击'])
                }
                that.mouse_count = 0;
                clearInterval(that.timer);
            });

        },
        /**
         * 是否需要加载
         * 1.有参数为设定 false 为不需要加载
         * 2.没有参数 返回当前值
         * @param bol
         * @returns {boolean}
         */
        isHasLoad:function(bol){
            var $menu = $(".menu .meun-shortcut");
            if(typeof bol !== 'undefined'){
                $menu.attr("data-reload",bol||'');
            }else{
                return !!$menu.attr("data-reload");
            }
        },
        /**
         * 每次拖动修改排序
         * @constructor
         */
        UpdateShortcutMenuSort:function(){
            var shortcutMenus = [];
            $('.dd-handle1').each(function(a,b){
                shortcutMenus.push({'sort':a+1,'id':$(b).data().id})
            });
            var ajaxData = JSON.stringify({'result':shortcutMenus});
            window.top.topPage.ajax({
                type:'POST',
                dataType:'JSON',
                contentType: 'application/json',
                url:root+'/userShortcutMenu/updateShortcutMenuSort.html',
                data:ajaxData,
                success:function(data){

                }
            })
        }
    })
});

