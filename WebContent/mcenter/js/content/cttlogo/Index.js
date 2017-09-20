/**
 * Created by snekey on 15-8-13.
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();

            //双击图片查看大图
            $(this.formSelector).on('click', 'tbody td img', function (e, opt) {
                e.imgs = [$(this).data('src')];
                window.top.topPage.imageSilde(e,opt);
            });
        },
        onPageLoad: function () {
            this._super();
            var _this = this;
            //判断默认logo的状态
            if($('#hasUsing').val()=="false"){//${views.content['logo.status.using']}
                $("#default").attr("class","co-green");
                $("#default").text(window.top.message.content['logo.status.using']);
            }else{
                $("#default").text(window.top.message.content['logo.status.toBeUse']);
            }
        },

        /**
         * 批量删除
         * @param e
         * @param opt
         * @returns {boolean}
         */
        deleteConfirm : function(e,opt){
            var ids = this.getSelectIdsArray(e);
            var spanClass = new Array();
            for(var i=0;i<ids.length;i++){
                spanClass.push($("#"+ids[i]).children().attr('class'));
            };
            var m ;
            if($.inArray("co-green",spanClass)>=0){
                m = window.top.message.content['logo.deleteUsingLogo'];
            }else if($.inArray("_wait",spanClass)>=0){
                m = window.top.message.content['logo.deleteToBeUseLogo'];
            }else if($.inArray("co-grayd",spanClass)>=0){
                m =window.top.message.content['logo.deleteConfirm'];
            }else{
                if(ids.length<=0){
                    m =window.top.message.content['logo.deleteNoSelect'];
                }else{
                    m =window.top.message.content['logo.deleteConfirm'];
                }

            }
            var b = false;
            window.top.topPage.showConfirmMessage(m, function (b) {
                if(b){
                    window.top.topPage.doAjax(e,opt);
                };
            })
            return false;
        },
    })
})
