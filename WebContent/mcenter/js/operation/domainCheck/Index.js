/**
 * Created by hanson on 2018-05-06
 */

define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        _this: null,
        init: function () {
            this._super();
            _this = this;

            if ($('#minus').val() != '0') {
                //1、判断如果当前时间减去最后一次检测时间小鱼120分，则按钮不可点击。并显示倒计时
                var minus = $('#minus').val();
                $('#detection_show').html("<h4 style='color: #0b0b0b'>"+minus+"分钟后</br>可再次检测</h4>");
                $('.detection_btn').addClass('disabled').lock();
            }
            if ($('#checkTaskStatus').val() == '0') {
                //2、判断任务状态是否已成功，如果为0则显示检测中?上次未结束是否可以再发起？
                _this.showChecking();
            }
        },
        detectionall: function (event) {
            window.top.topPage.ajax({
                url: root + "/operation/domainCheckData/manualcheck.html",
                type: "post",
                dataType: "json",
                cache: false,
                async: false,
                success: function (data) {
                    if(data=='0'){
                        window.top.topPage.showErrorMessage("域名检测资源繁忙，请2分钟后重试.");
                        $('#detection_show').html("<h4 style='color: #0b0b0b'>资源繁忙</br>稍后再试</h4>");
                    }else{
                        _this.showChecking();
                    }
                },
                error: function (err) {
                    window.top.topPage.showErrorMessage("域名检测失败，请稍后再试.");
                    $('#detection_show').html("<h4 style='color: #0b0b0b'>检测失败</br>稍后再试</h4>");
                    $(event.currentTarget).unlock();
                }
            });
        },
        showChecking: function () {
            $('#editable').find("tbody").find("tr").empty();
            $('.bdtop3').hide();
            var htmlStr = "<td colspan='11' style='text-align: center;height: 350px;' valign='center'>" +
                "<h3 style='color: #0a6aa1'>系统正在进行域名检测扫描，请耐心等待。。。</h3></br>" +
                "<img src='"+resRoot+"/images/loading-1.gif'/>"+
                "</td>";
            $('#editable').find("tbody").find("tr").append(htmlStr);
            $('._enter_submit').addClass('disabled').lock();
            $('#detection_show').html("<h4 style='color: #0b0b0b'>检测中</br>请耐心等待</h4>");
        }
    });

});