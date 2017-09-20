define(['site/lotteryResult/BaseLotteryResultDetail', "site/lotteryResult/Zodiac"], function (BaseLotteryResultDetail, Zodiac) {
    return BaseLotteryResultDetail.extend({
        zodiac: null,
        init: function () {
            this.zodiac = new Zodiac();
            this._super();
        },
        assemblyData: function (data) {
            if(!this.zodiac) {
                this.zodiac = new Zodiac();
            }
            for (var i = 0; i < data.length; i++) {
                //时间格式转换
                var openTime = new Date(data[i].openTime);
                var openDay = openTime.getFullYear() + "-" + _this.getTen(openTime.getMonth() + 1) + "-" + _this.getTen(openTime.getDate());
                var openSecond = _this.getTen(openTime.getHours()) + ":" + _this.getTen(openTime.getMinutes()) + ":" + _this.getTen(openTime.getSeconds());
                data[i].openTime = openDay + " " + openSecond;
                data[i].name = _this.name;
                var ball = [];
                var sx = [];
                var openCode = data[i].openCode === null ? '' : data[i].openCode;
                var spball = openCode.split(",");
                for (var j = 0; j < spball.length; j++) {
                    ball.push(spball[j]);
                    // var num = parseInt(spball[j]);
                    sx.push(this.zodiac.getSxName(spball[j]));
                }
                data[i].ball = ball;
                data[i].sx = sx;
            }
        }
    });
});