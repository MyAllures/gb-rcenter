define([], function () {
    return Class.extend({
        zodiacMap: undefined,
        init: function () {
            this.zodiacMapInit();
        },
        zodiacMapInit: function () {
            var _this = this;
            mui.ajax(root + "/lottery/lhc/hklhc/getZodiacMap.html",{
                type:"post",
                dataType:"json",
                async:false,
                success: function (data) {
                    if(data){
                        _this.zodiacMap = data;
                    }
                }
            });
        },
        getSxName: function (value) {
            if (!this.zodiacMap) {
                this.zodiacMapInit();
            }
            return this.zodiacMap?this.zodiacMap[value]:"";
        }
    });
});