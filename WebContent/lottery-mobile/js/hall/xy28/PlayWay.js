define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        getRandomNumber:function(len){
            var list = [];
            var sum = 0;
            for (var i = 0; i < len; ++i) {
                var value = Math.floor(Math.random() * 10);
                list[i] = value;
                sum += value;
            }
            var tmpStr = Template('template_lastOpenCode', {numArr:list,sum:sum});
            return tmpStr;
        },/**
         * 展示最近开奖记录
         */
        showRecentHistory: function (data) {
            var openList = '';
            $.each(data, function (index, value) {
                var numArr = value.openCode ? value.openCode.split(",") : [];
                var sum = 0;
                $.each(numArr, function (ind, val) {
                    sum += parseInt(val);
                });
                openList = openList + Template('template_recentHistory', {
                        number: value.expect,
                        list: numArr,
                        len: numArr.length,
                        sum:sum
                    });
            });
            $("#recentHistory").html(openList);
        },
        showLastOpenCode: function (openCodeArr) {
            var sum = 0;
            $.each(openCodeArr, function(index, value) {
                sum += parseInt(value);
            });
            var tmpStr = Template('template_lastOpenCode', {numArr:openCodeArr,sum:sum});
            $("#lastOpenCode").html(tmpStr);
        }

    });
});