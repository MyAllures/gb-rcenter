define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("特码","传统玩法-特码","tema",$("#tema"),"");
            this._super();

        },

    });
});