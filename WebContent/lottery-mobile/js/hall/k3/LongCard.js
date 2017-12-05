define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("长牌","传统玩法-长牌","ds","","");
            this._super();

        },

    });
});