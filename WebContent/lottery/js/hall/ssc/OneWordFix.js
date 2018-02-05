/**
 * 一字定位
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.getBetOdds();
        },
        bindButtonEvents: function () {
            this._super();
            var _this = this;
            /**
             * 切换选项
             */
            $('.fix-type a').on('click', function () {
                $('.fix-type>a').removeClass('active');
                $(this).addClass('active');
                $("#inputMoney").val("");
                var $totalSum = $('table.total-sum');
                var betCode = $(this).data('code');
                if (betCode === 'ten_thousand') {
                    $totalSum.removeClass('hide');
                } else {
                    $totalSum.addClass('hide');
                }
                $(".main-left .table-common tbody tr td").find('input').val("");
                $(".main-left .table-common tbody tr td").removeClass("bg-yellow");
                _this.getBetOdds();
            })
        },
        getBetOdds: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/' + _this.type + '/getOneWordFixOdd.html',
                data: {code:_this.code,betCode: $('.fix-type a.active').data("code")},
                dataType: 'json',
                success: function (data) {
                    var num;
                    for (num in data) {
                        var lottery = data[num];
                        var odd = lottery.odd;
                        var $td = $('td[data-num=' + num + ']');
                        $td.find("strong").text(lottery.betNum);
                        $td.find(".color-red").text(odd);
                        $td.find("input").attr("data-odds", odd);
                        $td.find("input").attr("data-bet-code", lottery.betCode);
                        $td.find("input").attr("data-bet-num", lottery.betNum);
                        if (num.indexOf("总") != -1){
                            $td.find("input").attr("data-name", '总和-' + num);
                        }else{
                        $td.find("input").attr("data-name", $('.fix-type a.active').text() + '-' + num);
                        }
                    }
                }
            })

        }
    })
});