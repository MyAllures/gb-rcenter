define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("点数","传统玩法-点数","ds","","");
            this._super();

        },

    });
});