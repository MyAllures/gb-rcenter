/**
 * Created by legend on 18-2-11.
 */
$(function(){
    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-content.mui-scroll-wrapper.invite-content',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);
    muiScrollY('.mui-control-content .mui-scroll-wrapper');
});



function searchBydate() {
    beginTime = $("#beginTime").val();
    endTime = $("#endTime").val();


    var options = {
        url:"/recommend.html?search.startTime="+beginTime + "&" +"search.endTime="+endTime,
        type: 'post',//HTTP请求类型
        timeout:5000,//超时时间为5秒
       /* data:beginTime,
        data:endTime,*/
        dataType:"html",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Soul-Requested-With': 'XMLHttpRequest'
        },
        success: function (data) {
            $("tbody").html("");
            $("tbody").append(data);
            /*if(data){

            }*/
        },
        error: function (e) {
            toast(window.top.message.fund_auto['加载失败']);
            // scrollView.pullRefresh().endPullupToRefresh(true);
            //异常处理；
            console.log(e);
            // t.dismissProgress();
        }
    };
    muiAjax(options);

}


function clickMinDate() {
    var dtpicker = new mui.DtPicker({
        "type": "date",
        "value": $("#beginTime").val(),
        beginDate: new Date($("#beginTime").attr("minDate")),
        endDate: new Date($("#endTime").attr("endTime")),
        labels: [window.top.message.fund_auto['年'], window.top.message.fund_auto['月'], window.top.message.fund_auto['日']]//设置默认标签区域提示语
    });
    var dateVal = $("#beginTime").val();
    dtpicker.show(function(obj,options) {
        // var day = formatDateTime(new Date(obj.value, dateFormat.day));
        $("#beginTime").val(obj.value);
        //结束时间不能小于开始时间
        if (new Date($("#endTime").val()).getTime() < new Date(obj.value).getTime()) {
            $("#endTime").val(day)
        }
        dtpicker.dispose();
    })

};

function clickMaxDate() {
    var dtpicker = new mui.DtPicker({
        type: "date",
        value: $("#endTime").val(),
        beginDate: new Date($("#beginTime").val()),
        endDate: new Date($("#endTime").attr("endTime"))
    });

    dtpicker.show(function(obj) {
        $("#endTime").val(obj.value);
        dtpicker.dispose()
    })
}


$(function () {
    var info = document.getElementById("question");
    document.getElementById("question").addEventListener('tap', function() {
        mui.alert('<div class="activity-content"><div class="mui-scroll-wrapper"><div class="mui-scroll"><div class="ext-cont"></div></div></div></div>', '活动介绍');
        // 弹窗内容
        // $('.activity-content .ext-cont').html('<p>1. 有效玩家指的是玩家当天的有效投注额需达到10001.有效玩家指的是玩家当天的有效投注额需达到1000元或以上，才算为有效玩家。</p><p>2. 所有优惠以人民币(CNY)为结算金额，以美东时间为计时区间，计时周期 为1天。</p><p>3. 每位玩家﹑每一住址 、每一电子邮箱地址﹑每一电话号码﹑相同支付方式(相同借记卡/信用卡/微信/支付宝等) 及同一IP地址只能当做一个推荐好友；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利。</p><p>4. 澳门新葡京的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利。</p><p>5.若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，澳门新葡京有权要求会员向我们提供充足有效的文件，用以确认是否享有该优惠的资格。 </p><p>6.当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或任何团队或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保从该存款红利或其他推广活动提供的优惠获利，澳门新葡京保留权利向此团队或个人停止、取消优惠或索回已支付的全部优惠红利。此外，公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。</p><p>7.澳门新葡京保留对活动的最终解释权；以及在无通知玩家的情况下修改、终止活动的权利；适用于所有优惠。元或以上，才算为有效玩家。 </p>')
        $('.activity-content .ext-cont').html($("#activityRules").val());
        $('.activity-content').parents('.mui-popup').addClass('act-popup');
        $('.act-popup .mui-popup-buttons').append($('<div class="btn-close"></div>'));
        $('.act-popup .btn-close').on('click', function () {
            mui.closePopup();
        });
        mui('.activity-content .mui-scroll-wrapper').scroll({
            indicators: false
        });
    });
});

function copyCode() {
    var clipboard = new Clipboard("a.copy");
    clipboard.onClick({delegateTarget:$("a.copy")[0]});
    toast(window.top.message.deposit_auto['复制成功']);
    /*clipboard.on('success', function (e) {
        toast(window.top.message.deposit_auto['复制成功']);
    });
    clipboard.on('error', function (e) {
        toast(window.top.message.deposit_auto['复制失败']);
    });*/
}