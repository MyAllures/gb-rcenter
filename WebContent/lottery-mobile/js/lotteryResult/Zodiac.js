define([], function () {
    return Class.extend({
        zodiacMap: undefined,
        init: function () {
            this.zodiacMapInit();
        },
        zodiacMapInit: function () {
            var _this = this;
            mui.ajax(root + "/lhc/hklhc/getZodiacMap.html",{
                type:"post",
                dataType:"json",
                async:false,
                success: function (data) {
                    if(data){
                        _this.zodiacMap = data;
                    }
                }
            });
            //
            // var date = new Date();
            // var year = date.getFullYear();  //表示年份的四位数字
            // if (date.getTime() < (new Date('2017-1-28 00:00:00')).getTime()) {
            //     year = 2016;
            // }
            // var startIndex = year % 12;
            // for (var i = startIndex, count = 0; count < 12; i = (i + 1) % 12, ++count) {
            //     this.sxArr[count] = {
            //         name: this.sx[i],
            //         number: null
            //     };
            // }
            // this.sxArr[0].number = [1, 13, 25, 37, 49];
            // this.sxArr[1].number = [12, 24, 36, 48];
            // this.sxArr[2].number = [11, 23, 35, 47];
            // this.sxArr[3].number = [10, 22, 34, 46];
            // this.sxArr[4].number = [9, 21, 33, 45];
            // this.sxArr[5].number = [8, 20, 32, 44];
            // this.sxArr[6].number = [7, 19, 31, 43];
            // this.sxArr[7].number = [6, 18, 30, 42];
            // this.sxArr[8].number = [5, 17, 29, 41];
            // this.sxArr[9].number = [4, 16, 28, 40];
            // this.sxArr[10].number = [3, 15, 27, 39];
            // this.sxArr[11].number = [2, 14, 26, 38];
        },
        getSxName: function (value) {
            if (!this.zodiacMap) {
                this.zodiacMapInit();
            }
            return this.zodiacMap?this.zodiacMap[value]:"";
        }
    });
});