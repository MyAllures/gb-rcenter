/**
 * 一字组合
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
            $('.comb-type a').on('click', function () {
                $('.comb-type>a').removeClass('active');
                $(this).addClass('active');
                $("#inputMoney").val("");
                var $totalSum = $('table.sum');
                var betCode = $(this).data('code');
                if (betCode === 'ten_thousand') {
                    $totalSum.removeClass('hide');
                } else {
                    $totalSum.addClass('hide');
                }
                $(".main-left .table-common tbody tr td").find('input').val("");
                $(".main-left .table-common tbody tr td").removeClass("bg-yellow");
                $('table.num').find('input').attr('data-bet-code', betCode);
                _this.getBetOdds();
            })
        },
        getBetOdds: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/ssc/getBetOdds.html',
                data: {code: _this.code, betCode: $('.comb-type a.active').data("code")},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        for (var i = 0; i < 10; i++) {
                            var $strong, $input;
                            $input = $('input.num' + data[i].betNum);
                            $strong = $('strong.num' + data[i].betNum);
                            $strong.text(data[i].odd);
                            $input.attr('data-odds', data[i].odd);
                            $input.attr('data-name', $('.comb-type a.active').text() + '-' + data[i].betNum);
                        }
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        }
    })
});