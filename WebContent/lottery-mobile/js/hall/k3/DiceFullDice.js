define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("围骰/全骰","传统玩法-围骰/全骰","ds","","");
            this._super();
        },

    });
});