/**
 * 时时彩js
 */
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        arrNum2 : [], //获取点击数的数组
        arrNum3 : [],
        arrNum4 : [],
        arrNum5 : [],
        arrNum6 : [],
        arrNum7 : [],
        arrNum8 : [],
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        }
    })
});