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
                //同时检查GB,OP的任务情况，如果都为进行中，则提示进行中; 状态不一致，提示异常，重新检测
                window.top.topPage.ajax({
                    url: root + "/operation/domainCheckData/checkTaskStatus.html",
                    type: "post",
                    cache: false,
                    success: function (data) {
                        if(data=='0'){
                            _this.showChecking();
                        }else{
                            window.top.topPage.showErrorMessage("域名检测任务异常，请重新检测，或者联系......");
                            $('#detection_show').html("<h4 style='color: #0b0b0b'>域名检测任务正在进行中</br>请稍等......</h4>");
                        }
                    },
                    error: function (err) {
                        window.top.topPage.showErrorMessage("域名检测任务失败，请稍后再试.");
                        $('#detection_show').html("<h4 style='color: #0b0b0b'>检测失败</br>稍后再试</h4>");
                        $(event.currentTarget).unlock();
                    }
                });



            }

        },
        detectionall: function (event) {
            window.top.topPage.ajax({
                url: root + "/operation/domainCheckData/manualcheck.html",
                type: "post",
                cache: false,
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
            $('#editable').find("tbody").empty();
            $('.bdtop3').hide();
            var htmlStr = "<tr><td colspan='11' style='text-align: center;height: 350px;' valign='center'>" +
                "<h3 style='color: #0a6aa1'>系统正在进行域名检测扫描，请耐心等待。。。</h3></br>" +
                "<img src='"+resRoot+"/images/loading-1.gif'/>"+
                "</td></tr>";
            $('#editable').find("tbody").append(htmlStr);
            $('._enter_submit').addClass('disabled').lock();
            $('#detection_show').html("<h4 style='color: #0b0b0b'>检测中</br>请耐心等待</h4>");
        }
    });

});