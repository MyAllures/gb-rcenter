define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("短牌","传统玩法-短牌","ds","","");
            this._super();
        },

    });
});