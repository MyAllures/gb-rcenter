define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("半波","传统玩法-半波","tema",$("#tema"),"");
            this._super();

        },

    });
});