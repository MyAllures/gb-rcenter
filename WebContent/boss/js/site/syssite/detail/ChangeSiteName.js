//模板页面
define(['common/BaseEditPage','jqFileInput','css!themesCss/fileinput/fileinput','bootstrapswitch', 'UE.I18N.'+window.top.language], function(BaseEditPage,fileinput,bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw:true,
        ue:[],
        init: function (title) {
            this.formSelector = "form";
            this._super();
            var _this = this;
            $(".check-box").bootstrapSwitch();
            $(".form-textarea").each(function(idx,item){
                _this.initUEditor(idx);
            });
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();
            });
            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceContent=$(".apiNameVal"+sourceLocal).val();
                var targetLocal=$(".current").attr("local");
                $(".apiNameVal"+targetLocal).val(sourceContent);
                var sourceorderIndex=$(this).attr("orderIndex");
                var targetOrderIndex = $(".current").attr("tagIndex");
                /*var cover = $(".apiTypeCoverVal"+sourceLocal).val();
                 $(".apiTypeCoverVal"+targetLocal).val(cover);
                 var coverImg = $("#apiTypeCoverImg"+sourceLocal).attr("src");
                 $("#apiTypeCoverImg"+targetLocal).attr("src",coverImg);*/

                var introduceStatus = $(".apiIntroduceStatusVal"+sourceLocal).val();
                var targetVal = $(".apiIntroduceStatusVal"+targetLocal).val();
                if(introduceStatus!=targetVal){
                    $("[name=introduceStatus"+targetLocal+"]").click();
                    $(".apiIntroduceStatusVal"+targetLocal).val(introduceStatus);
                }

                /* var introduce = _this.getSendContent(sourceorderIndex-1);
                 _this.setSendContent(targetOrderIndex-1,introduce);*/
                var introduce = $(".apiIntroduceVal"+sourceLocal).val();
                $(".apiIntroduceVal"+targetLocal).val(introduce);
            });
            var $bootstrapSwitch = $("[type=checkbox]");
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                        onText: window.top.message.common['switch.on'],
                        offText: window.top.message.common['switch.off'],
                        onSwitchChange: function (e, state) {
                            var local = $(this).attr("local");
                            if(state){
                                $(".apiIntroduceStatusVal"+local).val("normal");
                            }else{
                                $(".apiIntroduceStatusVal"+local).val("disable");
                            }
                        }
                    }
                );




            //修改编辑状态
            $(this.formSelector).on("click","a[name='tag']", function () {
                var local=$(this).attr("local");
                $("#curLanguage").val($(this).attr("tagIndex"));
                $(".tab-pane").each(function(index,item){
                    var lang = $(item).attr("lang");
                    var flag = false;
                    $(item).find(".field").each(function(idx,field){
                        if($(field).val()==""){
                            flag=true;
                        }
                    });
                    if(flag){
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.unedited']);
                    }else{
                        $("#option"+lang).show();
                        $("#span"+lang).text(window.top.message.common['switch.CloseReminder.edited']);
                    }
                    if(local==lang){
                        $("#option"+lang).hide();
                    }
                });
                $("#span"+local).text(window.top.message.common['switch.CloseReminder.editing']);

            });

        },
        changeCurrentLang:function(e,p){
            try{
                var curIndex = $("#curLanguage").val();
                var allTags = $(".tabLanguage").length;
                for(var i=0;i<allTags;i++){
                    if(curIndex<allTags){
                        curIndex++;
                        $("#tag"+curIndex).click();
                    }else{
                        curIndex=1;
                        $("#tag"+curIndex).click();
                    }
                    break;
                }
            }finally{
                $(e.currentTarget).unlock();
            }

        },
        /** 切换站点信息 */
        queryView: function (e) {
            var id = $("#Id").val();
            if ( !parseInt(id)) {
                window.top.topPage.showInfoMessage('请输入正确的站点ID!');
                $(e.currentTarget).unlock();
            } else {
                window.top.topPage.ajax({
                    url: root + '/site/detail/queryViewSiteBasic.html?search.id=' + id,
                    success: function (data) {
                        if (data=="true") {
                            window.top.topPage.ajax({
                                url: root + '/site/detail/viewSiteBasic.html?search.id=' + id,
                                success: function (data) {
                                    $("#mainFrame", this.formSelector).html(data);
                                    $(e.currentTarget).unlock();
                                }
                            })
                        } else {
                            window.top.topPage.showWarningMessage("没有此站点的信息");
                            $(e.currentTarget).unlock();
                        }
                    }
                });
            }
        }
    });
});