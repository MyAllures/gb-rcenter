define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({

        init: function () {
            this._super();
        },

        getGfwfOdd:function(){
            var _this = this;
            var betCode=$("#gfwfBetCode").val();
            var betCode1=_this.getInitbetCode(betCode);
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/'+betCode+'/getOdds.html', {
                data: {"betCode": betCode1},
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            });
        },

        getBetName : function (name,betCode) {
            if(betCode=="k3_tongxuan_santong"){
                return name+"-三同号通选";
            }else if(betCode=="k3_danxuan_santong"){
                return name+"-三同号单选";
            }else if(betCode=="k3_fuxuan_ertong"){
                return name+"-二同号复选";
            }else if(betCode=="k3_danxuan_ertong"){
                return name+"-二同号单选";
            }else if(betCode=="k3_sanbutong"){
                return name+"-三不同号";
            }else if(betCode=="k3_erbutong"){
                return name+"-二不同号";
            }else if(betCode=="k3_tongxuan_sanlian"){
                return name+"-三连号通选";
            }
        },




    });
});