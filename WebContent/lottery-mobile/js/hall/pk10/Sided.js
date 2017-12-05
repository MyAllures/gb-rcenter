define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("双面","传统玩法-双面","szp","","");
            this._super();
        },

    });
});