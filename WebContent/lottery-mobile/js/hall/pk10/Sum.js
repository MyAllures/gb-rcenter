define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("冠亚和","传统玩法-冠亚和","szp","","");
            this._super();
        }

    });
});