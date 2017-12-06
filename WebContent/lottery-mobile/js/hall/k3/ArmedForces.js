define(['site/hall/k3/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("三军","传统玩法-三军","ds","","");
            this._super();
        },

    });
});