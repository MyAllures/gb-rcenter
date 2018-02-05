/**
 * 跨度
 */
define(['site/hall/ssc/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            $($(".comb-type a")[0]).click();
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
                var betCode = $(this).data('code');
                var code = $('#lotteryCode').val();
                var name = $(this).text();


                $(".main-left .table-common tbody tr td").find('input').val("");
                $(".main-left .table-common tbody tr td").removeClass("bg-yellow");
                $('table.num').find('input').attr('data-bet-code', betCode);
                ajaxRequest({
                    url: root + '/ssc/getBetOdds.html',
                    data: {code: code, betCode: betCode},
                    success: function (data) {
                        if (!$.isEmptyObject(data)) {
                            for (var i = 0; i < 10; i++) {
                                var $strong, $input;
                                $input = $('input.num' + data[i].betNum);
                                $strong = $('strong.num' + data[i].betNum);

                                $strong.text(data[i].odd);
                                $input.attr('data-odds', data[i].odd);
                                $input.attr('data-name', name + '-' + data[i].betNum);
                            }
                        } else {
                            console.log(name + ":odd is null");
                        }
                    }
                })
            })
        }
    })
});