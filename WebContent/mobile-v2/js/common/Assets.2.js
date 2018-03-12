/**
 * 资产 API
 * Created by fei on 16-12-5.
 */
$('._userAsset').removeClass('mui-hide');
mui('.mui-bar-nav').on('tap', '.menu', function () {
    if (document.activeElement) {
        document.activeElement.blur();
    }
    $('.mui-hide-bar').show();
    $('body').addClass('has-menu-ex');
    return false;
});
mui('body').on('tap', '.mui-hide-bar', function() {
    $(this).hide();
    $('body').removeClass('has-menu-ex');
    return false;
});
$('.mui-bar-nav .menu .ex').height(function () {
    return $(window).height() - 49 - $('nav').height();
});

function getSiteApi() {
    mui.ajax(root + '/api/getSiteApi.html', {
        type: 'POST',
        dateType: 'json',
        beforeSend: function () {
            $('table#api-balance').html('');
        },
        success: function (data) {
            if(data) {
                var d = eval('(' + data + ')');
                $('#bar-username').html(d.username);
                $('.bar-wallet').html(d.currSign + d.playerWallet);
                $('.bar-asset').html(d.currSign + d.playerAssets);
                var apis = d.apis;
                for (var i = 0; i < apis.length; i++) {
                    var html = '<tr><td>' + apis[i].apiName + '</td>';
                    if (apis[i].status == 'maintain') {
                        html += '<td class="_money" id="_api_' + apis[i].apiId + '"><span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span></td></tr>';
                    } else {
                        html += '<td class="_money" id="_api_' + apis[i].apiId + '">' + d.currSign + '' + apis[i].balance + '</td></tr>';
                    }
                    $('table#api-balance').append(html);
                }
                initScroll();
            }else {
                sessionStorage.is_login = "false";
            }
        },
        error: function (xhr) {
            if(xhr.status == '600')
                sessionStorage.is_login = "false";
        }

    });
}

(function(){if (isLogin==='true') {getSiteApi()}})();

mui('header').on('tap', '.btn-refresh', function () {
    var loading = '<div class="loader api-loader"><div class="loader-inner ball-pulse api-div"><div></div><div></div><div></div></div></div>';
    $('.bar-wallet').html(loading);
    $('.bar-asset').html(loading);
    $('table#api-balance').find('td._money').html(loading);

    setTimeout(function () {
        mui.ajax(root + '/api/refreshApi.html', {
            type: 'POST',
            dateType: 'json',
            success: function (data) {
                var d = eval('(' + data + ')');
                $('.bar-wallet').html(d.currSign + d.playerWallet);
                $('.bar-asset').html(d.currSign + d.playerAssets);
                var apis = d.apis;
                for (var i = 0; i < apis.length; i++) {
                    var html;
                    if (apis[i].status == 'maintain') {
                        html = '<span class="text-red" style="font-size: 10px;">' + window.top.message.common_auto["游戏维护中"] + '</span>';
                    } else {
                        html = d.currSign + apis[i].balance;
                    }
                    $('td#_api_' + apis[i].apiId).html(html);
                }
                initScroll();
            }
        });
    }, 1000);
});

/**
 * 跳转页面
 */
mui('header').on('tap', 'a[data-url]', function () {
    var url = $(this).attr("data-url");
    if($(this).parent().find(".btn-deposit").size()>0 && os == 'app_ios'){
        gotoIndex(1);
    }else {
        gotoUrl(url);
    }
});

function initScroll() {
    $('.mui-assets').height($(window).height() - 210 - $('nav').height());
    mui('.mui-assets').scroll({
        scrollY: true,
        indicators: true,
        deceleration: 0.0001,
        bounce: true
    })
}