define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("正码","传统玩法-正码","tema",$("#tema"),"");
            this._super();

        },

    });
});