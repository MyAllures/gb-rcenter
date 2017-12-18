define(['site/hall/lhc/PlayWay-xywf'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this.showTable("一肖","传统玩法-一肖","tema",$("#tema"),"");
            this._super();
        }
    });
});