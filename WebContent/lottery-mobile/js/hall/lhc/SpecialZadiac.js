define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("特肖","传统玩法-特肖","tema",$("#tema"),"");
            this._super();

        },

    });
});