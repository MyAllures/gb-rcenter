define(['site/hall/GfwfCommon', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({

        init: function () {
            this._super();
            this.checkPl3Handicap();
        },

        checkNoSon : function (betCode,thisClassList){
            var _this = this;
            $("div.s-menu.second").hide();
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            if(    dataCode !="3star"
                && dataCode !="First2"
                && dataCode !="After2"
            //只有一个子菜单直接关闭遮照
            /*  && dataCode !="DingWeiDan"
             && dataCode !="BuDingWei"*/
            ){
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
            }
            //三星
            if(betCode =="3star" && jspName==undefined){
                jspName="3star";
            }
            //前二
            if(betCode =="First2" && jspName==undefined){
                jspName="First2Zxfs";
            }
            //后二
            if(betCode =="After2" && jspName==undefined){
                jspName="After2Zxfs";
            }
            //定位胆
            if(betCode =="DingWeiDan" && jspName==undefined){
                jspName="YixingDwd";
            }
            //不定位
            if(betCode =="Sxymbdw" && jspName==undefined){
                jspName="Sxymbdw";
            }

            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            var _this=this;
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pl3_yixing_dwd","jspStr":"YixingDwd"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                    if(!_this.isOpen){
                        _this.closeHandicap();
                    }
                }
            });
        },


        getHandicap:function ( ) {
            if (this.isRunning) {
                return;
            }
            var _this = this;
            var url = root + '/commonLottery/getExpect.html';
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                async: false,
                data: {'code': this.code},
                beforeSend: function () {
                    _this.isRunning = true;
                },
                success: function (data) {
                    if (data) {
                        var expect = $("#expect").text();
                        $("#expect").html(data.expect);
                        $("#leftTime").attr("data-time", data.leftTime);
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') &&_this.isOpen && data.leftOpenTime >0){
                            _this.closeHandicap();
                            $("#leftTime").parent().html("距离开盘时间还有：<font id='leftTime' >")
                            $("#leftTime").attr("data-time", data.leftOpenTime);
                            _this.isOpen = false;
                        }
                        if ((_this.code == 'fc3d' || _this.code == 'tcpl3') && !_this.isOpen&& data.leftOpenTime <=0){
                            var dtime = $("#leftTime").attr("data-time");
                            $("#leftTime").attr("data-time", dtime);
                            _this.isOpen = true;
                            _this.openHandicap();
                        }
                        if (typeof callback == 'function') {
                            callback();
                        }
                    } else { //handicap为空
                        $(".mui-table-view-cell.mui-collapse").html('sorry,该彩票暂停!');
                    }
                },
                complete: function () {
                    _this.isRunning = false;
                }
            })
        },


        showClearPopup:function () {

        },

        checkPl3Handicap:function () {
            if (!this.isOpen){
                this.closeHandicap();
            }
        }
    });
});