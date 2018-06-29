define(['common/BasePage'], function (BasePage) {
    return BasePage.extend({
        init: function () {
            this._super();
        },
        bindEvent: function () {
            var the = this;
            this._super();
            $("#checkSite").click(function () {
                the.checkSite();
            });
            $("#ipSearch").click(function () {
                the.ipSearch();
            });
        },
        checkSite: function () {
            var site_id = $("#site_id").val();
            $("#check_result_msg").empty();
            $("#check_result_msg").html("请稍后。。");
            window.top.topPage.ajax({
                url: root + '/applineAnalyze/check.html',
                type: 'POST',
                dataType: 'json',
                data: {"siteId": site_id},
                success: function (data) {
                    $("#check_result_msg").empty();
                    $("#check_result_msg").html("<h2>线路检测结果</h2><p>是否配置app域名地址：" + data.isDomainCfg + "</p><p>域名地址：" + data.domain + "</p><p>ip列表：" + data.ips + "</p><p>" + data.checkRst + "</p>");
                },
                error: function (data) {

                }
            });
        },
        ipSearch: function () {
            var ip = $("#ip").val();
            $("#check_ip_msg").empty();
            $("#check_ip_msg").html("日志检索中请稍后。。");
            window.top.topPage.ajax({
                url: root + '/applineAnalyze/analyze.html',
                type: 'POST',
                data: {"ip": ip},
                success: function (data) {
                    $("#check_ip_msg").empty();
                    $("#check_ip_msg").html("<h1>已成功，以下是流量日志：</h1>" + data);
                },
                error: function (data) {

                }
            });
        }
    });
});