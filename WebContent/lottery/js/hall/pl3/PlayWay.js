/**
 * pl3彩票系列
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        //大彩种
        type: null,
        //小彩种
        code: null,
        //基本路径
        baseUrl: null,
        init: function () {
            this.type = $('[name=type]').val();
            this.code = $('[name=code]').val();
            this.baseUrl = root + '/' + this.type;
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        },
        refreshTableCommon:function(betCode){
            var _this = this;
            ajaxRequest({
                url: root + '/' + _this.type + '/' + _this.code + '/getOdds.html',
                data: {betCode: betCode},
                dataType: 'text',
                beforeSend: function () {
                    $(".main-left .table-common").html('<img src="' + resRoot + '/themes/default/img/base_loading.gif" class="isLoading" style="display: block;margin: auto;margin: 50px auto;">');
                },
                success: function (data) {
                    $(".main-left .table-common").html(data);
                    _this.fillData();
                    //加载新页面需要重新声明td事件
                    _this.bindTdInput();
                },error:function (XMLHttpRequest, textStatus, errorThrown){
                    console.log("load playway status:"+textStatus+" error:"+errorThrown);
                    $(".main-left .table-common").html('<li class="init-tip">暂无数据</li>');
                }
            });
        },
        //重新加载列表后,手动填充数据方法
        fillData:function(){
        }
    })
});