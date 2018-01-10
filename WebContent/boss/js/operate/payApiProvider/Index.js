/**
 * Created by jeff on 15-8-14.
 */
define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
            $(this.formSelector).on("click",".dropdown-menu-stop", function (event) {
                event.stopPropagation();//阻止事件向上冒泡
            });
        },
        onPageLoad: function () {
            this._super();
            _this = this;
            //Global cache
            $("._cacheBtn").on("click",function () {
                _this.doCacheBtn($(this));

            });
        },
        //删除
        deleteMessage: function (e,option) {
            this.showConfirm(e,option,window.top.message.content['pay.delete']);
        },
        showConfirm: function (e,option,msg) {
            window.top.topPage.showConfirmMessage( msg , function( bol ){
                if(bol){
                    window.top.topPage.doAjax(e,option);
                }else{
                    $(e.currentTarget).unlock();
                }
            });
        } ,

        //恢复按钮失效
        doCacheBtn : function ($this) {
            $this.attr('disabled', true);
            var text = $this.text();
            $this.text(text);
            $.ajax({
                url: root + "/operate/payApiProvider/refreshI18nVersion.html",
                success: function (data) {
                    alert(data == 'true' ? $this.text()+'成功！' : $this.text()+'失败，详情请查看服务器日志！');
                    $this.attr('disabled', false);
                    $this.text(text);
                }
            });
        },
    });
});