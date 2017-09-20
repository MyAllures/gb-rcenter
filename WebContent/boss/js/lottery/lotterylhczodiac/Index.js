/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name=lotteryLhcZodiac]";
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _that = this;
            $('#zodiacSelect',_that.formSelector).on('change', function (e) {
                var zodiac=Number($(this).val());
                var  zodiacs=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
                var  changeZodiac=new Array(12);
                var index;
                for(zodiac,i=0;zodiac>=0;i++,zodiac--){
                    changeZodiac[i]=zodiacs[zodiac];
                    index=i;
                }
                for(i=11;i>zodiac;i--){
                    if(index++<11){
                        changeZodiac[index]=zodiacs[i];
                    }
                }
                var text="";
                var map = new Map();

                for (var i=0;i<zodiacs.length;i++){
                    var key = zodiacs[i];
                    var num= changeZodiac.indexOf(zodiacs[i])+1;
                    var list = new Array();
                    for(num;num<=49;num+=12){
                        list.push(num);
                    }
                    map.set(key,list);

                }
                for(var i=0;i<5;i++){
                    text+=" <tr>";
                    for(var j=0;j<zodiacs.length;j++ ){
                        var n=map.get(zodiacs[j])[i];
                        if(n){
                            if(n<10){
                                n="0"+n;
                            }
                            text+="<td><span class='cpq-num cpq-cqssc' num='"+n+"'>"+n+"</span></td>";
                        }else {
                            text+="<td><span class='cpq-num'></span></td>";
                        }

                    }
                    text+=" </tr>";
                }
                $("#zodiacTbody").html(text);

            });

        },
        onPageLoad:function () {

        },



    });
});