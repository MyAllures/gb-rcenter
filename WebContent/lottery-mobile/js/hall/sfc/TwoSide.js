define(['site/hall/sfc/PlayWay-xywf', 'site/plugin/template'], function (PlayWay, Template) {

    return PlayWay.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

        },

        showTable : function(){
            var BetCode=$("#gfwfBetCode").val();
            var BetCode1="双面";
            $("a[data-code='"+BetCode+"']").addClass("mui-active");
            $("a[data-code='sm']").addClass("mui-active");
            $(".x_3.gfwf-playName").text(BetCode1);
            $("span.x_1.gfwf-tit").text(BetCode1);
            $(".s-title.title1 span").text(BetCode1);
            $(".s-title.title2 span").text(BetCode1);
            $("#toobarTitle").text("传统玩法-"+BetCode1);
            if (this.os == 'app_android' && isLotterySite == 'true') {
                window.gamebox.setTitle("传统玩法-"+BetCode1);
            }
            $("a[data-code='sm'] span").text(BetCode1);
        },

        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';

            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {

                    var sumdata = data['sfc_sum8'];
                    var dradata = data['sfc_dragon_tiger_18'];
                    var firstdata = data['sfc_first'];
                    var seconddata = data['sfc_second'];
                    var thirddata = data['sfc_third'];
                    var fourthdata = data['sfc_fourth'];
                    var fifthdata = data['sfc_fifth'];
                    var sixthdata = data['sfc_sixth'];
                    var sevendata = data['sfc_seventh'];
                    var eightdata = data['sfc_eighth'];
                    var sumtd = $("div.bet-table-list.divnum8 table tbody tr td");
                    for (j = 0; j < sumtd.length; j++) {
                        if (j==0){
                            _this.setTdData($(sumtd[j]),sumdata['总单']);
                        }else if(j==1){
                            _this.setTdData($(sumtd[j]),sumdata['总双']);
                        }else if(j==2){
                            _this.setTdData($(sumtd[j]),sumdata['总大']);
                        }else if(j==3){
                            _this.setTdData($(sumtd[j]),sumdata['总小']);
                        }else if(j==4){
                            _this.setTdData($(sumtd[j]),sumdata['总尾大']);
                        }else if(j==5){
                            _this.setTdData($(sumtd[j]),sumdata['总尾小']);
                        }else if(j==6){
                            // _this.setTdData($(sumtd[j]),dradata['龙']);
                        }else if(j==7){
                            // _this.setTdData($(sumtd[j]),dradata['虎']);
                        }

                    }
                    for (i = 0; i < 8; i++) {
                        var balltd = $("div.bet-table-list.divnum"+i+" table tbody tr td");
                        var szdata;
                        if (i==0){
                            szdata =firstdata;
                        }else if (i==1){
                            szdata = seconddata;
                        }else if (i==2){
                            szdata =thirddata;
                        }else if (i==3){
                            szdata =fourthdata;
                        }else if (i==4){
                            szdata =fifthdata;
                        }else if (i==5){
                            szdata =sixthdata;
                        }else if (i==6){
                            szdata =sevendata;
                        }else if (i==7){
                            szdata =eightdata;
                        }
                        for (k = 0; k < balltd.length; k++) {
                            if (k==0){
                                _this.setTdData($(balltd[k]),szdata['大']);
                            }else if(k==1){
                                _this.setTdData($(balltd[k]),szdata['小']);
                            }else if(k==2){
                                _this.setTdData($(balltd[k]),szdata['单']);
                            }else if(k==3){
                                _this.setTdData($(balltd[k]),szdata['双']);
                            }else if(k==4){
                                _this.setTdData($(balltd[k]),szdata['尾大']);
                            }else if(k==5){
                                _this.setTdData($(balltd[k]),szdata['尾小']);
                            }else if(k==6){
                                _this.setTdData($(balltd[k]),szdata['合单']);
                            }else if(k==7){
                                _this.setTdData($(balltd[k]),szdata['合双']);
                            }
                        }

                    }
                }
            })
        },
        setTdData: function (tdobj, data,i) {
            var spans = tdobj.find("span");
            if (data.betNum=='龙'){
                $(spans[0]).text("总龙");
                tdobj.attr("data-name", tdobj.data("name") + "-总龙");
            }else if(data.betNum=='虎'){
                $(spans[0]).text("总虎");
                tdobj.attr("data-name", tdobj.data("name") + "-总虎");
            }else {
                $(spans[0]).text(data.betNum);
                tdobj.attr("data-name", tdobj.data("name") + "-" + data.betNum);
            }
            $(spans[1]).text(data.odd);
            tdobj.attr("data-odds", data.odd);
            tdobj.attr("data-bet-code", data.betCode);
            tdobj.attr("data-bet-num", data.betNum);

        }
    });
});