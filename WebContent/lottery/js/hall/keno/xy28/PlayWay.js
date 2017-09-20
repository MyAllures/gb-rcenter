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
        bindButtonEvents: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        }
    });
});