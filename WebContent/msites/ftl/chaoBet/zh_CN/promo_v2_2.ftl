<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <title><#if data.siteInfo.title?default('')!=''>${data.siteInfo.title}<#else >${data.siteInfo.siteName}</#if></title>
    <#include "head.include.ftl">
    <style type="text/css">
        body {
            background: url("themes/promo/images/bg.png");
        }
    </style>
</head>

<body>
<#include "top.ftl">
<#assign status ={"apply":"立即加入","participation":"参与中","applyDeposit":"存款时申请","notStarted":"未开始"}>
<#assign statusKeys = status?keys>
<main class="main-promo">
    <div style="height: 410px;background: url(${data.configInfo.sitePath}/images/promo-banner.jpg) no-repeat center bottom;"></div>
    <!-- notice -->
    <#include "notice.ftl">
    <!-- Promo -->
    <section class="main-promo theme-white"> <!--主题切换 theme-black,theme-white-->
        <div class="promo-top-bar">
            <ul class="_vr_promo">
                <li class="active"><a href="javascript:void(0);" data-item="_all_">所有活动</a></li>
                <#if data.activityClassify??>
                    <#list data.activityClassify as classifies>
                        <li data-filter="${classifies.key}" value="${classifies.key}">
                            <a href="javascript:void(0);" data-item="${classifies.key}">${classifies.value}</a>
                        </li>
                    </#list>
                </#if>
                <li class="hisActivityButton hide"><a href="javascript:void(0)" data-item="historyActivitys">历史优惠</a></li>
            </ul>
        </div>
        <div class="list-type2"> <!--列表类型二-->
            <div class="row">
            <#if data.activityMessage??>
                <#list data.activityMessage as am>
                    <#if am.states!="finished">
                        <div class="col-3-1">
                            <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain _vr_all promo-item ${am.activityClassifyKey}"
                                 data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                                 data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,am.activityCover)}"/>
                                <div class="promo-status processing"><i class="icon-clock"></i>进行中</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                    <#if am.frontParticipateStates!='notStarted'>
                                        <#list statusKeys as key>
                                            <#if key == am.frontParticipateStates>
                                                <div class="btn-apply">
                                                    <a href="javascript:" onclick="joinPromo(this)"
                                                       class="btn-play btn-join _vr_promo_join">${status[key]}</a>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                    ${am.activityDescription}
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>

            <#if data.processActivityMessage??>
                <#list data.processActivityMessage as am>
                    <#if am.states!="finished" || (am.code=="back_water" && am.states!="finished")>
                        <div class="col-3-1">
                            <div id="cos_${am.id}" class="_vr_promo_check _vr_actContain _vr_process hide promo-item ${am.activityClassifyKey}"
                                 data-type="processing" data-code="${am.code}" data-searchid="${am.searchId}"
                                 data-rank-id="<#if am.allRank?? && am.allRank>all<#elseif am.code=="back_water">backwater<#else >${am.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,am.activityCover)}"/>
                                <div class="promo-status processing"><i class="icon-clock"></i>进行中</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${am.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${am.endTime?long?string.computer}">
                                    <#if am.frontParticipateStates!='notStarted'>
                                        <#list statusKeys as key>
                                            <#if key == am.frontParticipateStates>
                                                <div class="btn-apply">
                                                    <a href="javascript:" onclick="joinPromo(this)"
                                                       class="btn-play btn-join _vr_promo_join">${status[key]}</a>
                                                </div>
                                            </#if>
                                        </#list>
                                    </#if>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                ${am.activityDescription}
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>

            <#if data.historyActivityMessage??>
                <#list data.historyActivityMessage as his>
                    <#if his.states="finished">
                        <div class="col-3-1">
                            <div id="cos_${his.id}" class="_vr_promo_check _vr_actContain promo-item <#if his.isDisplay?string('true','false')=='true'>historyActivitys</#if> actContain"
                                 data-type="over" data-code="${his.code}" data-searchid="${his.searchId}"
                                 data-rank-id="<#if his.allRank?? && his.allRank>all<#elseif his.code=="back_water">backwater<#else >${his.rankid}</#if>">
                                <img src="${imgPath(data.configInfo.domain,his.activityCover)}"/>
                                <div class="promo-status over"><i class="icon-clock"></i>已结束</div>
                                <div class="shadow">
                                    <input class="_vr_promo_ostart" type="hidden" value="${his.startTime?long?string.computer}">
                                    <input class="_vr_promo_oend" type="hidden" value="${his.endTime?long?string.computer}">
                                    <div class="btn-txt">该活动无需申请</div>
                                    <a href="javascript:void(0);" class="btn-detail">
                                        <i class="icon-detail"></i>
                                        活动详细
                                    </a>
                                </div>
                                <div class="promo-detail">
                                ${his.activityDescription}
                                </div>
                            </div>
                        </div>
                    </#if>
                </#list>
            </#if>
            </div>
        </div>
    </section>

<#include "../../commonPage/zh_CN/msiteCommonContent/promoTip.ftl">
</main>
<#include "footer.ftl">
<#include "../../commonPage/commonFloat/gameAds.ftl">
<#include "script.ftl">
<#include "../../commonPage/zh_CN/msiteCommonScript/promoScriptHall.ftl">
<script>
    $(function(){
        $("._vr_promo li").each(function(){
            $(this).on("click","a",function(){
                if(!$(this).parent().hasClass("active")){
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val=="_all_"){
                        $("._vr_all").removeClass("hide");
                        $("._vr_process").addClass("hide");
                    }else {
                        $("._vr_all").addClass("hide");
                        $("._vr_process").removeClass("hide");
                        $("._vr_actContain").addClass("hide");
                        $("."+val).removeClass("hide");
                    }
                }
            })
        })
    })
</script>

<ul class="list-inline" style="width: 1200px;margin: 0 auto;padding: 55px 0;color: #fff;">
    <li><a style="color: #000;" href="javascript:void(0);" id="toggleThemes">切换主题</a></li>
    <li><a style="color: #000;" href="javascript:void(0);" id="apply_success">优惠申请成功</a></li>
    <li><a style="color: #000;" href="javascript:void(0);" id="apply_fail1">优惠申请失败（网络等其它问题）</a></li>
    <li><a style="color: #000;" href="javascript:void(0);" id="apply_fail2">优惠申请失败（带进度条错误提示）</a></li>
    <li><a style="color: #000;" href="javascript:void(0);" id="apply_fail3">优惠申请失败（纯文字错误提示）</a></li>
    <li><a style="color: #000;" href="javascript:void(0);" id="may_apply">有可申请的优惠</a></li>
</ul>

<script>

    $(function () {
        $(".list-type2 .btn-detail").on('click', function () {
            $(this).toggleClass('open');
            $(this).parents(".promo-item").find(".promo-detail").stop().slideToggle();
        });
        $("#toggleThemes").on('click', function () {
            if ($('.main-promo').hasClass("theme-white")) {
                $('.main-promo').removeClass("theme-white").addClass('theme-black');
            } else {
                $('.main-promo').removeClass("theme-black").addClass('theme-white');
            }
        });
        // 默认配置
        layer.config({
            type: 0,
            move: ".layui-layer-title",
            title: true,
            offset: "auto",
            btnAlign: "r",
            closeBtn: "2",
            shade: [0.7, "#000"],
            shadeClose: true,
            time: 0,
            resize: false
        });
        // 各种演示弹窗调用方法
        $("#apply_success").on("click", function () { // 成功弹窗
            var tit = "正宗莞式服务，买一送一";
            var content = '<i class="icon-success"></i> <div class="tit">《' + tit + '》申请成功！</div>' +
                    '<div class="subs-txt">您所提交的申请已经进入审批阶段，请及时跟进申请状况。如有问题，请与客服人员联系。</div>' +
                    '<div class="ext-inf">满足活动要求，申请金额为 99.00 元</div>';
            applySuccess(content, '申请成功', 'layui-layer-success', ['640px', '397px'], false, true);
        });
        $("#apply_fail1").on("click", function () { // 失败弹窗1
            var tit = "无响应！（错误码： 404）";
            var subsTxt = "很抱歉！当前网络不稳定，无法连接到服务器，请检查本地网络设备是否已断开链接！"
            var content = '<i class="icon-success"></i> <div class="tit">' + tit + '</div>' +
                    '<div class="subs-txt">' + subsTxt + '</div>';
            applyFailure(content, '申请失败', 'layui-layer-danger', ['640px', '397px'], false, true);
        });
        $("#apply_fail2").on("click", function () { // 失败弹窗2
            var tit = "《正宗莞式服务，买一送一》";
            var subsTxt = "您所提交的申请还未达到活动的要求，请多多努力！如有问题，请与客服人员联系。"
            var content = '<i class="icon-success"></i> <div class="tit">' + tit + '</div>' +
                    '<div class="subs-txt">' + subsTxt + '</div>' +
                    '<div class="failure-reason">' +
                    '<div class="item-success-with-bar">' +
                    '<i class="icon-pass"></i>' +
                    '<div class="txt"><span>有效投注额</span><div class="pull-right"><span class="color-green">6000</span>/6000</div></div>' +
                    '<div class="bar"><div class="bar-inner"></div></div>' +
                    '</div>' +
                    '<div class="item-failure-with-bar">' +
                    '<i class="icon-fail"></i>' +
                    '<div class="txt"><span>存款金额</span><div class="pull-right"><span class="color-red">1000</span>/6000</div></div>' +
                    '<div class="bar"><div class="bar-inner" style="width:30%;"></div></div>' +
                    '</div>' +
                    '</div>';
            applyFailure(content, '申请失败', 'layui-layer-danger', ['640px', '397px'], false, true);
        });
        $("#apply_fail3").on("click", function () { // 失败弹窗3
            var tit = "《正宗莞式服务，买一送一》";
            var subsTxt = "您所提交的申请还未达到活动的要求，请多多努力！如有问题，请与客服人员联系。"
            var content = '<i class="icon-success"></i> <div class="tit">' + tit + '</div>' +
                    '<div class="subs-txt">' + subsTxt + '</div>' +
                    '<div class="failure-reason">' +
                    '<div class="item-success-without-bar">' +
                    '<i class="icon-pass"></i>' +
                    '<div class="txt"><span>绑定银行卡</span></div>' +
                    '</div>' +
                    '<div class="item-failure-without-bar">' +
                    '<i class="icon-fail"></i>' +
                    '<div class="txt"><span>IP地址唯一性</span></div>' +
                    '</div>' +
                    '<div class="item-failure-without-bar">' +
                    '<i class="icon-fail"></i>' +
                    '<div class="txt"><span>真实姓名填写完整</span></div>' +
                    '</div>' +
                    '</div>';
            applyFailure(content, '申请失败', 'layui-layer-danger', ['640px', '397px'], false, true);
        });
        $("#may_apply").on("click", function () { // 有可申请的优惠
            var tit = "《正宗莞式服务，买一送一》您有可申请的奖励！";
            var subsTxt = "您可以选择申请已满足要求的闯关阶梯，建议您查看活动细则后，再决定是否立即申请。"
            var content = '<i class="icon-danger"></i> <div class="tit">' + tit + '</div>' +
                    '<div class="subs-txt">' + subsTxt + '</div>' +
                    '<div class="failure-reason">' +
                    '<div class="item-success-without-bar">' +
                    '<i class="icon-pass"></i>' +
                    '<div class="txt"><span>绑定银行卡</span></div>' +
                    '</div>' +
                    '<div class="item-success-with-bar">' +
                    '<i class="icon-pass"></i>' +
                    '<div class="wrap1">' +
                    '<div class="txt"><span>闯关条件1</span><div class="pull-right"><span class="color-green">6000</span>/6000</div></div>' +
                    '<div class="bar"><div class="bar-inner"></div></div>' +
                    '</div>' +
                    '<div class="wrap2"><button>申请奖励</button></div>' +
                    '</div>' +
                    '<div class="item-failure-with-bar">' +
                    '<i class="icon-fail"></i>' +
                    '<div class="wrap1">' +
                    '<div class="txt"><span>闯关条件2</span><div class="pull-right"><span class="color-red">1000</span>/6000</div></div>' +
                    '<div class="bar"><div class="bar-inner" style="width:30%;"></div></div>' +
                    '</div>' +
                    '<div class="wrap2"><button>申请奖励</button></div>' +
                    '</div>' +
                    '</div>';
            mayApply(content, '提示', 'layui-layer-warning', ['640px', '397px'], false, true);
        });
        $(".list-type1 .btn-detail").on("click", function () {
            var $detail = $(this).parents('.promo-item').find('.promo-detail');
            var img = $(this).parents('.promo-item').find('.promo-img').attr('src');
            var cont = $detail.html();
            var content = '<img class="promo-img" src=' + img + '/>' + '<div class="promo-content" id="promo-content">' + cont + '<i class="icon-goUp"></i></div>';
            dialogPromoDetail(content, '活动详细', 'layui-layer-info', ['640px', '530px'], false, true)
        });
    });

    function layerDialogNormal(content, title, skin, area, btnRound, btnBorder) {
        /*
         * content:弹窗的提示内容
         * skin:主题颜色
         * area:宽高
         */
        layer.open({
            content: content,
            title: title,
            skin: skin,
            area: area,
            btn: ["确定"],
            success: function (layer) {
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                // 提示框按钮类型
                if (!!btnRound) {
                    $(layer).addClass("dialog-btn-round");
                }
                if (!!btnBorder) {
                    $(layer).addClass("dialog-btn-border");
                }
            }
        });
    }
    function applySuccess(content, title, skin, area, btnRound, btnBorder) { // 申请成功弹窗
        /*
         * content:弹窗的提示内容
         * skin:主题颜色
         * area:宽高
         */
        layer.open({
            content: content,
            title: title,
            skin: skin,
            area: area,
            btn: ["联系客服"],
            success: function (layer) {
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass("promo_success");

            },
            yes: function (index) {
                layer.close(index);
            }
        });
    }
    function applyFailure(content, title, skin, area, btnRound, btnBorder) { // 申请失败弹窗
        /*
         * content:弹窗的提示内容
         * skin:主题颜色
         * area:宽高
         */
        layer.open({
            content: content,
            title: title,
            skin: skin,
            area: area,
            btn: ["联系客服"],
            success: function (layer) {
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass("promo_failure");
                // 内容启用滚动条
                $(layer).find(".layui-layer-content").niceScroll({
                    cursorcolor: "#999",
                    cursorwidth: "8px"
                });

            },
            yes: function (index) {
                layer.close(index);
            }
        });
    }
    function mayApply(content, title, skin, area, btnRound, btnBorder) { // 有可申请的弹窗
        /*
         * content:弹窗的提示内容
         * skin:主题颜色
         * area:宽高
         */
        layer.open({
            content: content,
            title: title,
            skin: skin,
            area: area,
            btn: ["联系客服"],
            success: function (layer) {
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass("promo_may_apply");
                // 内容启用滚动条
                $(layer).find(".layui-layer-content").niceScroll({
                    cursorcolor: "#999",
                    cursorwidth: "8px"
                });

            },
            yes: function (index) {
                layer.close(index);
            }
        });
    }
    function dialogPromoDetail(content, title, skin, area, btnRound, btnBorder) { // 优惠详细弹窗
        /*
         * content:弹窗的提示内容
         * skin:主题颜色
         * area:宽高
         */
        layer.open({
            content: content,
            title: title,
            skin: skin,
            area: area,
            btn: ["申请活动"],
            success: function (layer) {
                // 重写关闭按钮
                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                // 提示框类型
                $(layer).addClass("normal-dialog");
                $(layer).addClass("promo_detail");
                // 内容启用滚动条
                var nice1 = $(layer).find(".layui-layer-content .promo-content").niceScroll({
                    cursorcolor: "#999",
                    cursorwidth: "8px"
                });
                $("#promo-content").on('scroll', function () {
                    if (nice1.newscrolly > 10) {
                        $('.icon-goUp').fadeIn('slow');
                    } else {
                        $('.icon-goUp').fadeOut('slow');
                    }
                });
                $('.icon-goUp').on('click', function () {
                    nice1.doScrollTop(0, '300')
                });
            },
            yes: function (index) {
                layer.close(index);
            }
        });
    }
</script>
</body>

</html>

