define(['site/hall/xy28/xy28/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this.showTable(this.getSecondText(),"传统玩法-"+this.getSecondText(),"hhs","","");
            this._super();
        },

        getSecondText : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="混合";
            if(BetCode=="hh "){
                BetCode1="混合";
            }else if(BetCode=="hztm"){
                BetCode1="和值特码";
            }
            return BetCode1;
        },
    });
});