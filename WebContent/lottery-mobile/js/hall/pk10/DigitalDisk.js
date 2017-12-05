define(['site/hall/pk10/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        init: function () {
            this.showTable("数字盘","传统玩法-数字盘","szp","","");
            this._super();

        }

    });
});