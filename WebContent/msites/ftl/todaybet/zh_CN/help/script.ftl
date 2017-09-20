<script>
    $(function () {
        $(".rt .type1 .step .bor_box p ,.rt .type1 .step ul li").hover(function () {
            var index = $(this).index() + 1;
            $(this).addClass("acti").siblings().removeClass("acti");
            $(".rt .type1 .step .bor_box p").removeClass("acti");
            $(".rt .type1 .step .bor_box p:lt(" + index + ")").addClass("acti");
        }, function () {
            $(".rt .type1 .step .bor_box p").removeClass("acti");
        });

        $(".Newest .Analysis .box3 .timer_wrap").each(function (index, element) {
            $(this).attr("index", "ti" + index);
            $(this).addClass("ti" + index);
        });

        setInterval(function () {
            $(".Newest .Analysis .box3 .timer_wrap").each(function (index, element) {
                //console.log();
                abc('".Newest .Analysis .box3 ".' + $(this).attr("index") + '"');
            });

        }, 1000);

        $('.list ul li.li1 h4').click(function () {
            var clickStatus = $(this).parent('li').attr('sl');
            if (typeof clickStatus == 'undefined') {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').addClass('sli');
                $('.list ul li .slide').slideUp(300);
                $(this).parent('li').find('div').slideDown(300);
                $(this).parent('li').attr('sl', '0');
            } else if (clickStatus == 1) {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').addClass('sli');
                $('.list ul li .slide').slideUp(300);
                $(this).parent('li').find('div').slideDown(300);
                $('.list ul li').attr('sl', '1');
                $(this).parent('li').attr('sl', '0');
            } else if (clickStatus == 0) {
                $('.list ul li').removeClass('sli');
                $(this).parent('li').removeClass('sli');
                $(this).parent('li').find('div').slideUp();
                $(this).parent('li').attr('sl', '1');
            }
        });
        $('.help_list .lis ul li').click(function () {
            var w = $(this).index();
            $(this).addClass('sli').siblings().removeClass('sli');
            $('.help_list .help_col').eq(w).addClass('show').siblings().removeClass('show');
        });
    });
</script>