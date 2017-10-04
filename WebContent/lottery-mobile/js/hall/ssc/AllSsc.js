define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.isGfwf();
            this.selectFun();
            this.getZhuShu();
            /*this.sscYixing_random();*/
        },



        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode', {numArr: numArr, len: numArr.length});
            var sum = parseInt(numArr[0]) + parseInt(numArr[1]) + parseInt(numArr[2]) + parseInt(numArr[3]) + parseInt(numArr[4]);
            html += "<i class='lottery-block'>" + sum + "</i>";
            if (sum % 2 == 0) {
                html += "<i class='lottery-block'>双</i>";
            } else {
                html += "<i class='lottery-block'>单</i>";
            }
            if (sum > 22) {
                html += "<i class='lottery-block'>大</i>";
            } else {
                html += "<i class='lottery-block'>小</i>";
            }
            if (parseInt(numArr[0]) > parseInt(numArr[4])) {
                html += "<i class='lottery-block'>龙</i>";
            } else if (parseInt(numArr[0]) < parseInt(numArr[4])) {
                html += "<i class='lottery-block'>虎</i>";
            } else {
                html += "<i class='lottery-block'>和</i>"
            }
            $("#lastOpenCode").html(html);
        },
        getOdds: function () {
            var url = root + '/' + this.type + '/' + this.code + '/getOdds.html';
            var _this = this;
            mui.ajax(url, {
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    $(".bet-table-list[data-subCode]").each(function () {
                        var subCode = $(this).attr("data-subCode");
                        var $tdBet = $(this).find("td[data-bet-num]");
                        $tdBet.each(function () {
                            var betNum = $(this).attr('data-bet-num');
                            var thisData = data[subCode];
                            var bet = thisData[betNum];
                            $(this).attr("data-odds", bet.odd);
                            $(this).attr("data-bet-code", bet.betCode);
                            $(this).children("span[name=odd]").text(bet.odd);
                        })
                    });
                }
            })
        },

        //传统,官方玩法切换
        isGfwf: function () {
            var _this = this;
            mui("body").on("tap", "a#is-gfwf", function () {
                var flag = $(this).attr("data-flag");
                _this.gotoUrl(root + '/' + _this.type + '/' + _this.code + '/index.html?betCode=&isGfwf='+flag);

            });
        },

        ////////////////////////////官方玩法gfwf///////////////////////////////////
        selectFun: function () {
            var _this = this;

            document.getElementById("show-t-gfwf").addEventListener('tap',function(){

                document.getElementById("dingdan").classList.toggle('mui-active');
            });

            //直选复式
            mui(".gfwf-playName")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.toggle('Fixed');
            });
            mui(".gfwf-bg")[0].addEventListener('tap',function(){
                mui(".gfwf-wrap")[0].classList.remove('Fixed');
            });

            //选择球
            mui(".screen-munber.gfwf").on('tap','a',function(){
               /* alert($("div.newball-item-20 a").attr("class").length)*/
                this.classList.toggle('mui-active');
                $(this).parent().parent().parent().prev().find("i.mui-control-item").removeClass("mui-active");
                _this.getZhuShu();

            });
            //清
            mui(".newball-content-top").on('tap','.qing',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                _this.getZhuShu();

            });
            //全
            mui(".newball-content-top").on('tap','.quan',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).addClass("mui-active");
                _this.getZhuShu();
            });
            //大
            mui(".newball-content-top").on('tap','.da',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var Barr = [, , , , , 5, 6, 7, 8, 9];
                for (var i = 0; i <= Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //小
            mui(".newball-content-top").on('tap','.xiao',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                var Barr = [0, 1, 2, 3, 4, , , , ,];
                for (var i = 0; i <= Aarr.length; ++i) {
                    if (Aarr[i] == Barr[i]) {
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //奇
            mui(".newball-content-top").on('tap','.ji',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                for (var i = 0; i < 12; i++) {
                    if (i%2 != 0) {   //奇数
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });
            //偶
            mui(".newball-content-top").on('tap','.ou',function(){
                var flag = $(this).attr("data-flag");
                $("a."+flag).removeClass("mui-active");
                for (var i = 0; i < 12; i++) {
                    if (i%2 == 0) {   //奇数
                        $("a."+flag+"."+i).addClass("mui-active");
                    }
                }
                _this.getZhuShu();
            });

            //机选
            mui(".btn-jixuan-gfwf")[0].addEventListener('tap',function(){
                this.classList.remove('mui-active');
                $("div.newball-item-20 a").removeClass("mui-active");
                mui(".btn-reset-gfwf")[0].classList.add('mui-active');
                _this.sscYixing_random();
                _this.getZhuShu();
            });
            //机选清除
            mui(".btn-reset-gfwf")[0].addEventListener('tap',function(){
                this.classList.remove('mui-active');
                mui(".btn-jixuan-gfwf")[0].classList.add('mui-active');
                $("div.newball-item-20 a").removeClass("mui-active");
                _this.getZhuShu();
            });


        },

        //获取注数
        getZhuShu : function () {
            var gfwfBetCode=$("#gfwf-betCode").val();
            if(gfwfBetCode =="sscYixing"){
                var len=$("div.newball-item-20 .mui-active").length;
                $("#quantity").text(len);
                $("#inputMoney").text(len*2);//目前写死
            }
        },

        //定位胆机选
        sscYixing_random : function () {
            var random = parseInt(Math.random() * 10);
            var wei = parseInt(Math.random() * 5);
            if(wei == 0){
                    $("a.n-btn.wang").removeClass("mui-active");
                    $("a.n-btn.wang."+random).addClass("mui-active");
            } else if(wei == 1){
                    $("a.n-btn.qian").removeClass("mui-active");
                    $("a.n-btn.qian."+random).addClass("mui-active");
            } else if(wei == 2){
                    $("a.n-btn.bai").removeClass("mui-active");
                    $("a.n-btn.bai."+random).addClass("mui-active");
            } else if(wei == 3){
                    $("a.n-btn.shi").removeClass("mui-active");
                    $("a.n-btn.shi."+random).addClass("mui-active");
            } else if(wei == 4){
                    $("a.n-btn.ge").removeClass("mui-active");
                    $("a.n-btn.ge."+random).addClass("mui-active");
            }
        }

    });
});