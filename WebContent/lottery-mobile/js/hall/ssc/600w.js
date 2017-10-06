//****
// 官方玩法事件绑定
function jixuanClick() {
    var randomFun = getPlayPlFun_random();
    if (typeof randomFun == "undefined") {
        return;
    }

    eval(randomFun + "()");
    $("#btn-reset-gfwf").show();
    $("#btn-jixuan-gfwf").hide();

    getGfwfZhushu();
}

function gfwfEvent(){
    $("#btn-submit-gfwf").unbind('click').click(function () {
        showBetTemplate(); //清除注单内容提示框
    });

    $("#btn-reset-gfwf").click(function () {
        clearSelected(); // 清除所有选择
    });

    // checkbox触发事件f
    if ($("#checkSelected").length > 0) {
        // // 兼容IE的checkbox选中
        // if ($.browser.msie) {
        //     $('input:checkbox').click(function () {
        //         this.blur();
        //         this.focus();
        //     });
        // }

        $("#checkSelected input[type='checkbox']").change(function() {
            var checkSelectedFun = $("#checkSelected").attr("data-fun_checkbox");
            if (typeof checkSelectedFun != 'undefined') {
                eval(checkSelectedFun + "()");
                getGfwfZhushu();  //获取注数方法
            }
        });
    }
}

/**
 * 获得checkbox选中值列表
 */
function getCheckboxValue() {
    var result = [];
    $("#checkSelected input[type='checkbox']").each(function() {
        if ($(this).is(":checked")) {
            result.push($(this).val());
        }
    });
    return result;
}

function checkCkRx2(){
    getGfwfZhushu();
}

/**
 *获取具体子页面
 */
function getSubGfwfSscPage(url, callback) {
    ajaxRequest({
        url: url,
        dataType: "html",
        type: "GET",
        beforeSend: function () {
            Tools.showLoading("加载中...");
        },
        success: function (html) {
            $("#betContainer_gfwf").html(html);
            if (typeof callback == 'function') {
                callback();
            }
        },
        error: function (a, b, c) {
            if (b == 'timeout') {
                Tools.toast("操作超时，请稍后重试");
                return;
            }

            Tools.toast("请求错误，请稍后重试");
        },
        complete: function () {
            Tools.hideLoading();
        }
    });
}

/**
 *数字单选算法
 */
var arrSum8mDt = []; //获取胆码点击个数-8码胆码-11选5
var arrSum7mDt = []; //获取胆码点击个数-7码胆码-11选5
var arrSum6mDt = []; //获取胆码点击个数-6码胆码-11选5
var arrSum5mDt = []; //获取胆码点击个数-5码胆码-11选5
var arrSum4mDt = []; //获取胆码点击个数-4码胆码-11选5
var arrSum3mDt = []; //获取胆码点击个数-3码胆码-11选5
var arrSum2mDt = []; //获取胆码点击个数-2码胆码-11选5

function danSelect(obj) {
    var flag = $(obj).parent().parent().attr("data-name");
    if(typeof flag != "undefined" && flag == "bd"){
        var tOrF = $(obj).hasClass("active_gfwf");
        if (tOrF) {
            $(obj).removeClass("active_gfwf");
        } else {
            $(obj).parent().parent().find("span.active_gfwf").removeClass("active_gfwf");
        }
    }

    var nameF = $(obj).parent().parent().parent().attr('data-lm');
    //双色球蓝码点击选择器
    if(nameF == 'lm'){
        if ($(obj).parent().find(".wan_bottom .cus-flex-item .xz").hasClass("active_gfwf_blue")) {
            $(obj).parent().parent().find(".cus-flex-item .xz.active_gfwf_blue").removeClass("active_gfwf_blue");
        } else {
            $(obj).parent().find(".cus-flex-item .xz").addClass("active_gfwf_blue");
        }
    } else {
        if ($(obj).parent().find(".wan_bottom .cus-flex-item .xz").hasClass("active_gfwf")) {
            $(obj).parent().find(".cus-flex-item .xz.active_gfwf").removeClass("active_gfwf");
            var sumSelectedTuodan = $(obj).parent().parent().parent().parent().find(".wanweiStr .cus-flex-item .xz.active_gfwf").length;
            if (sumSelectedTuodan <= 0) {
                initArrSum();
            }
            var flagName = getCheckedDanma(obj);
            minusDanmaNum(flagName, obj);
        } else {
            var flagDanmaName = getCheckedDanma(obj);
            //拖胆识别器
            danTuoShiBieQi(obj);
            if (flagDanmaName == 'danma3') {
                getDanMaCommon(obj, arrSum3mDt, 2);
            } else if (flagDanmaName == 'danma2') {
                getDanMaCommon(obj, arrSum2mDt, 1);
            } else if (flagDanmaName == 'danma4') {
                getDanMaCommon(obj, arrSum4mDt, 3);
            } else if (flagDanmaName == 'danma5') {
                getDanMaCommon(obj, arrSum5mDt, 4);
            } else if (flagDanmaName == 'danma6') {
                getDanMaCommon(obj, arrSum6mDt, 5);
            } else if (flagDanmaName == 'danma7') {
                getDanMaCommon(obj, arrSum7mDt, 6);
            } else if (flagDanmaName == 'danma8') {
                getDanMaCommon(obj, arrSum8mDt, 7);
            } else {
                $(obj).parent().find(".cus-flex-item .xz").addClass("active_gfwf");
            }


        }
    }


    $(obj).parent().parent().parent().find(".xz i").removeClass("active_gfwf");

    getGfwfZhushu();
    statusChange();

    $(obj).parent().parent().parent().find(".wan_top .xz i.activeBtn").each(function () {
        $(this).removeClass("activeBtn");

    });
}

//清除拖码计数相应胆码计数器
function danTuoShiBieQi(objBtn){
    //拖码判断-11选5
    var flagTuoDan = $(objBtn).parent().parent().hasClass("tuodan_selected");
    if (flagTuoDan) {
        $(objBtn).parent().parent().parent().parent().find(".danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".em_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".sm_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".sim_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".wm_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".lm_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".qm_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');
        $(objBtn).parent().parent().parent().parent().find(".bm_danma_selected .cus-flex-item span.n" + parseInt($(objBtn).html()) + ".active_gfwf").removeClass('active_gfwf');

        $(objBtn).parent().find(".cus-flex-item .xz").addClass("active_gfwf");
        var flagDanmaName = tuoDanShibieDm(objBtn);
        minusDanmaNum(flagDanmaName, objBtn);
        var sumSelectedTuodan = $(objBtn).parent().parent().parent().parent().find(".wanweiStr .cus-flex-item .xz.active_gfwf").length;

        if(sumSelectedTuodan <= 0){
            initArrSum();
        }
    }
}

//清除胆码计数器
function initArrSum(){
    arrSum8mDt.splice(0, arrSum8mDt.length);//清空数组
    arrSum7mDt.splice(0, arrSum7mDt.length);
    arrSum6mDt.splice(0, arrSum6mDt.length);
    arrSum5mDt.splice(0, arrSum5mDt.length);
    arrSum4mDt.splice(0, arrSum4mDt.length);
    arrSum3mDt.splice(0, arrSum3mDt.length);
    arrSum2mDt.splice(0, arrSum2mDt.length);
}

//11选胆码减除计数器
function minusDanmaNum(flagDanmaName, obj){
    if (flagDanmaName == 'danma3') {
        var indexVal = arrSum3mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum3mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma2') {
        var indexVal = arrSum2mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum2mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma4') {
        var indexVal = arrSum4mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum4mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma5') {
        var indexVal = arrSum5mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum5mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma6') {
        var indexVal = arrSum6mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum6mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma7') {
        var indexVal = arrSum7mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum7mDt.splice(indexVal, 1);
        }
    } else if (flagDanmaName == 'danma8') {
        var indexVal = arrSum8mDt.indexOf(parseInt($(obj).html()));
        if(indexVal > -1){
            arrSum8mDt.splice(indexVal, 1);
        }
    }

}

//胆码通用选择筛选器
function getDanMaCommon(obj, numArr, x){
    var sumSelected = $(obj).parent().parent().find(".cus-flex-item .xz.active_gfwf").length;
    if (sumSelected >= x) {
        $(obj).parent().parent().find(".cus-flex-item span.n" + numArr[0] + ".active_gfwf").removeClass('active_gfwf');
        numArr.splice(0, 1);
    }
    $(obj).parent().find(".cus-flex-item .xz").addClass("active_gfwf");
    $(obj).parent().parent().parent().parent().find(".tuodan_selected .cus-flex-item span.n" + parseInt($(obj).html()) + ".active_gfwf").removeClass('active_gfwf');
    numArr.push(parseInt($(obj).html()));
}

//识别是几位胆码标记
function getCheckedDanma(obj){
    var strReturn = '';
    //胆码判断-11选5
    var flagDanMaSm = $(obj).parent().parent().hasClass("danma_selected");
    //胆码判断-前二组选胆拖-11选5
    var flagDanMaEm = $(obj).parent().parent().hasClass("em_danma_selected");
    //胆码判断-任选四胆拖-11选5
    var flagDanMaSim = $(obj).parent().parent().hasClass("sim_danma_selected");
    //胆码判断-任选五胆拖-11选5
    var flagDanMaWm = $(obj).parent().parent().hasClass("wm_danma_selected");
    //胆码判断-任选六胆拖-11选5
    var flagDanMaLm = $(obj).parent().parent().hasClass("lm_danma_selected");
    //胆码判断-任选七胆拖-11选5
    var flagDanMaQm = $(obj).parent().parent().hasClass("qm_danma_selected");
    //胆码判断-任选八胆拖-11选5
    var flagDanMaBm = $(obj).parent().parent().hasClass("bm_danma_selected");

    if (flagDanMaSm) {
        strReturn = "danma3"
    } else if (flagDanMaEm) {
        strReturn =  "danma2"
    } else if (flagDanMaSim) {
        strReturn =  "danma4"
    } else if (flagDanMaWm) {
        strReturn =  "danma5"
    } else if (flagDanMaLm) {
        strReturn =  "danma6"
    } else if (flagDanMaQm) {
        strReturn =  "danma7"
    } else if (flagDanMaBm) {
        strReturn =  "danma8"
    }
    return strReturn;
}

//拖胆点击是识别当前胆码
function tuoDanShibieDm(obj) {
    var flagDanMaSm = $(obj).parent().parent().attr("data-name");
    return flagDanMaSm;
}

/**
 *  随机按钮状态
 */
function statusChange() {
    // 显示机选
    var randomFun = getPlayPlFun_random();
    var zhushu = $("#zhushu").html();
    if (typeof randomFun != "undefined" && zhushu <= 0) {
        $("#btn-jixuan-gfwf").show();
        $("#btn-reset-gfwf").hide();
    } else {
        $("#btn-reset-gfwf").show();
        $("#btn-jixuan-gfwf").hide();
    }
}

/**
 * 获取注数方法
 */
function getGfwfZhushu(){
    var zhushuFun = getPlayPlFun_zhushu();  // 注数算法
    //执行注数方法
    if (typeof zhushuFun != 'undefined') {
        var zhushu = eval(zhushuFun + "()");   // 注数
        if(zhushu == 0){
            $("#zhushu").html(zhushu);
            $("#nowMoney").html(0);
            return;
        }else if (typeof zhushu == 'undefined' || zhushu < 0) {
            $("#zhushu").html(0);
            $("#nowMoney").html(0);
            return;
        }
        $("#zhushu").html(zhushu);
    }

    // 默认2元 * 1倍 * 注数
    $("#nowMoney").html(parseFloat((zhushu * 2 * 1).toFixed(3)));
}




//======================================================内容算法=====================================

/*******************************************  双色球  ******z***********************************/
function content_hlzx(){
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf_blue"), function () {
        qianArr.push($.trim($(this).html()));
    });


    var wanStr = wanArr.length > 0 ? (wanArr.join(" ") + ",") : ' ';
    var qianStr = qianArr.length > 0 ? qianArr.join(" ") : ' ';

    return $.trim(
        (wanStr == ' ' ? ' ' : wanStr)+
        (qianStr == ' ' ? ' ' : qianStr)
    );
}

/*******************************************广东11选5******************************************/
/**
 * 任选8中5胆拖-11选5
 */
function  content_rx8z5dt(){
    return getContentCommonDanma();
}

/**
 * 任选7中5胆拖-11选5
 */
function  content_rx7z5dt(){
    return getContentCommonDanma();
}

/**
 * 任选6中5胆拖-11选5
 */
function  content_rx6z5dt(){
    return getContentCommonDanma();
}

/**
 * 任选5中5胆拖-11选5
 */
function  content_rx5z5dt(){
    return getContentCommonDanma();
}

/**
 * 任选4中4胆拖-11选5
 */
function  content_rx4z4dt(){
    return getContentCommonDanma();
}

/**
 * 任选3中3胆拖-11选5
 */
function  content_rx3z3dt(){
    return getContentCommonDanma();
}

/**
 * 任选2中2胆拖-11选5
 */
function  content_rx2z2dt(){
    return getContentCommonDanma();
}

/**
 * 任选8中5-11选5
 */
function content_rx8z5(){
    return getContentCommonZuxfs();
}

/**
 * 任选7中5-11选5
 */
function content_rx7z5(){
    return getContentCommonZuxfs();
}

/**
 * 任选6中5-11选5
 */
function content_rx6z5(){
    return getContentCommonZuxfs();
}

/**
 * 任选5中5-11选5
 */
function content_rx5z5(){
    return getContentCommonZuxfs();
}

/**
 * 任选4中4-11选5
 */
function content_rx4z4(){
    return getContentCommonZuxfs();
}

/**
 * 任选3中3-11选5
 */
function content_rx3z3(){
    return getContentCommonZuxfs();
}

/**
 * 任选2中2-11选5
 */
function content_rx2z2(){
    return getContentCommonZuxfs();
}

/**
 * 任选1中1-11选5
 */
function content_rx1z1(){
    return getContentCommonZuxfs();
}

/**
 * 后三位-11选5
 */
function content_h3w(){
    return getContentCommonZuxfs();
}

/**
 * 中三位-11选5
 */
function content_z3w(){
    return getContentCommonZuxfs();
}

/**
 * 前三位-11选5
 */
function content_q3w(){
    return getContentCommonZuxfs();
}

/**
 * 后二组选胆拖-11选5
 */
function content_h2zuxtd(){
    return getContentCommonDanma();
}

/**
 * 前二组选胆拖-11选5
 */
function content_q2zuxtd(){
    return getContentCommonDanma();
}

/**
 * 后二组选复式-11选5
 */
function content_h2zuxfs11x5(){
    return getContentCommonZuxfs();
}

/**
 * 前二组选复式-11选5
 */
function content_q2zuxfs11x5(){
    return getContentCommonZuxfs();
}

/**
 * 前二直选复式-11选5
 */
function content_h2zxfs11x5(){
    return getContentCommonDanma();
}

/**
 * 前二直选复式-11选5
 */
function content_q2zxfs11x5(){
    return getContentCommonDanma();
}

/**
 * 后三组选胆拖-11选5
 */
function content_h3zuxtd(){
    return getContentCommonDanma();
}

/**
 * 中三组选胆拖-11选5
 */
function content_z3zuxtd(){
    return getContentCommonDanma();
}

/**
 * 前三组选胆拖-11选5
 */
function content_q3zuxtd(){
    return getContentCommonDanma();
}

/**
 * 后三组选复式-11选5
 */
function content_h3zuxfs(){
    return getContentCommonZuxfs();
}

/**
 * 中三组选复式-11选5
 */
function content_z3zuxfs(){
    return getContentCommonZuxfs();
}

/**
 * 前三组选复式-11选5
 */
function  content_q3zuxfs(){
    return getContentCommonZuxfs();
}

/**
 * 后三直选复式-11选5
 */
function content_h3zxfs_11x5(){
    return getContentCommonZxfs();
}

/**
 * 中三直选复式-11选5
 */
function content_z3zxfs_11x5(){
    return getContentCommonZxfs();
}

/**
 * 前三直选复式-11选5
 */
function content_q3zxfs_11x5(){
    return getContentCommonZxfs();
}

function getContentCommonDanma(){
    var wanArr = [], qianArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        qianArr.push($.trim($(this).html()));
    });

    if(wanArr.length <= 0 || qianArr.length <= 0){
        return 0;
    }

    return wanArr.join(",") + "|" + qianArr.join(",");
}

function getContentCommonZuxfs(){
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });

    if(wanArr.length <= 0){
        return 0;
    }

    return wanArr.join(",");
}

function getContentCommonZxfs(){
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        baiArr.push($.trim($(this).html()));
    });

    var wanStr = wanArr.length > 0 ? (wanArr.join(",") + "|") : ' ';
    var qianStr = qianArr.length > 0 ? (qianArr.join(",") + "|") : ' ';
    var baiStr = baiArr.length > 0 ? baiArr.join(",") : ' ';

    return $.trim(
        (wanStr == ' ' ? ' ' : wanStr)+
        (qianStr == ' ' ? ' ' : qianStr) +
        (baiStr == ' ' ? ' ' : baiStr)
    );
}

/************************************************PK10**********************************************/
/**
 * PK10-前一
 */
function content_qy(){
    var arr1 = [], newArr = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });

    if (arr1.length <= 0) {
        return 0;
    }

    if (arr1.length > 0) {
        newArr = newArr.concat(arr1);
    }

    return newArr.join(',');
}

/**
 * PK10-前二
 */
function content_qe(){
    var arr1 = [], arr2 = [], strContent = '';
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });

    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });

    if (arr1.length <= 0 && arr2.length <= 0) {
        return 0;
    }

    var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
    var strContent2 = arr2.length > 0 ? arr2.join(",") : "";

    return $.trim(
        strContent1 + "|" + strContent2
    );
}


/**
 * PK10-前三
 */
function content_qsan(){
    var arr1 = [], arr2 = [], arr3 = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });

    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });

    $.each($(".di3m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr3.push($.trim($(this).html()));
    });

    if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0) {
        return 0;
    }

    var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
    var strContent2 = arr2.length > 0 ? arr2.join(",") : "";
    var strContent3 = arr3.length > 0 ? arr3.join(",") : "";

    return $.trim(
        strContent1 + "|" + strContent2 + "|" + strContent3
    );
}


/**
 * PK10-定位胆
 */
function content_dwd_pk10(){
    var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });

    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });

    $.each($(".di3m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr3.push($.trim($(this).html()));
    });

    $.each($(".di4m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr4.push($.trim($(this).html()));
    });

    $.each($(".di5m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr5.push($.trim($(this).html()));
    });

    $.each($(".di6m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr6.push($.trim($(this).html()));
    });

    $.each($(".di7m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr7.push($.trim($(this).html()));
    });

    $.each($(".di8m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr8.push($.trim($(this).html()));
    });

    $.each($(".di9m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr9.push($.trim($(this).html()));
    });

    $.each($(".di10m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr10.push($.trim($(this).html()));
    });


    if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0 && arr4.length <= 0 && arr5.length <= 0 && arr6.length <= 0 && arr7.length <= 0 && arr8.length <= 0 && arr9.length <= 0 && arr10.length <= 0) {
        return 0;
    }

    var strContent1 = arr1.length > 0 ? arr1.join(",") : "";
    var strContent2 = arr2.length > 0 ? arr2.join(",") : "";
    var strContent3 = arr3.length > 0 ? arr3.join(",") : "";
    var strContent4 = arr4.length > 0 ? arr4.join(",") : "";
    var strContent5 = arr5.length > 0 ? arr5.join(",") : "";
    var strContent6 = arr6.length > 0 ? arr6.join(",") : "";
    var strContent7 = arr7.length > 0 ? arr7.join(",") : "";
    var strContent8 = arr8.length > 0 ? arr8.join(",") : "";
    var strContent9 = arr9.length > 0 ? arr9.join(",") : "";
    var strContent10 = arr10.length > 0 ? arr10.join(",") : "";

    return $.trim(
        strContent1 + "|" + strContent2 + "|" + strContent3 + "|" +
        strContent4 + "|" + strContent5 + "|" + strContent6 + "|" +
        strContent7 + "|" + strContent8 + "|" + strContent9 + "|" + strContent10
    );
}




/**
 * 定位胆
 */
function content_dwd(){
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var wanStr = wanArr.length > 0 ? wanArr.join(",") : "";
    var qianStr = qianArr.length > 0 ? qianArr.join(",") : "";
    var baiStr = baiArr.length > 0 ? baiArr.join(",") : "";
    var shiStr = shiArr.length > 0 ? shiArr.join(",") : "";
    var geStr = geArr.length > 0 ? geArr.join(",") : "";

    return $.trim(
        (wanStr == ' ' ? ' ' : wanStr ) + "|" +
        (qianStr == ' ' ? ' ' : qianStr) + "|" +
        (baiStr == ' ' ? ' ' : baiStr) + "|" +
        (shiStr == ' ' ? ' ' : shiStr) + "|" +
        (geStr == ' ' ? ' ' : geStr)
    );
}


/**
 * 五星直选复式
 */
function content_5xzxfs() {
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;

    if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
        return 0;
    }

    return "{0}|{1}|{2}|{3}|{4}".format(
        wanArr.join(","),
        qianArr.join(","),
        baiArr.join(","),
        shiArr.join(","),
        geArr.join(",")
    );
}


/**
 * 四星直选复式
 */
function content_4xzxfs() {
    var qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    if(qianArr.length <= 0|| baiArr.length <= 0|| shiArr.length <= 0|| geArr.length <= 0){
        return;
    }

    // 初始化变量
    var showPlayName = '';
    var showContent = '';
    var betContent = '';

    showPlayName = "四星直选-复式";
    showContent = "千位：({0})，百位：({1})，十位：({2})，个位：({3})".format(
        qianArr.join(","),
        baiArr.join(","),
        shiArr.join(","),
        geArr.join(",")
    );
    return betContent = gfwf_4xfs(
        qianArr,
        baiArr,
        shiArr,
        geArr
    );
}

/**
 * 后三直选复式
 */
function content_h3zxfs() {
    var baiArr = [], shiArr = [], geArr = [];
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    if(baiArr.length <= 0|| shiArr.length <= 0|| geArr.length <= 0){
        return;
    }

    return gfwf_3xfs(
        baiArr,
        shiArr,
        geArr
    );
}

/**
 * 后三直选-和值
 */
function content_h3zxhz() {
    var heZhiArr = [];
    var zhushu = 0;
    $.each($(".h3zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    return heZhiArr.join(",");
}

/**
 * 后三直选-跨度
 */
function content_h3zxkd() {
    var kaDuArr = [];
    $.each($(".h3kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        kaDuArr.push($.trim($(this).html()));
    });

    return kaDuArr.join(",");
}

/**
 * 后三直选-后三组合
 */
function content_h3zh() {
    var baiArr = [], shiArr = [], geArr = [];
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    return gfwf_3xfs(
        baiArr,
        shiArr,
        geArr
    );
}

/**
 * 后三组选-组三复式
 */
function content_h3z3fs() {
    var zuSanArr = [];
    $.each($(".z3fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuSanArr.push($.trim($(this).html()));
    });

    return zuSanArr.join(",");
}

/**
 * 后三组选-组六复式
 */
function content_h3z6fs(){
    var zuLiuArr = [];

    $.each($(".z6fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuLiuArr.push($.trim($(this).html()));
    });
    return zuLiuArr.join(",");
}

/**
 * 后三组选-和值
 */
function content_h3zuxhz() {
    var heZhiArr = [];
    var zhushu = 0;
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    return heZhiArr.join(",");
}

/**
 * 后三组选-后三和值尾数
 */
function content_h3hzws(){
    var hzArr = [];
    $.each($(".hzwsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    return hzArr.join(",");
}

/**
 * 后三组选-组选包胆
 */
function content_h3zuxbd(){
    var bdArr = [];
    $.each($(".bdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        bdArr.push($.trim($(this).html()));
    });

    return bdArr.join(",");
}

/**
 * 后三组选-特殊号
 */
function content_h3tsh(){
    var thArr = [];
    $.each($(".tshStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        thArr.push($.trim($(this).html()));
    });

    if (thArr.length <= 0) {
        alert("至少选择1注号码才能投注");
        return false;
    }

    return thArr.join(",");

}

/***************前三****************/

/**
 * 前三直选复式
 */
function content_q3zxfs() {
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });

    if(wanArr.length <= 0|| qianArr.length <= 0|| baiArr.length <= 0){
        return;
    }

    return gfwf_3xfs(
        wanArr,
        qianArr,
        baiArr
    );
}

/**
 * 前三直选-和值
 */
function content_q3zxhz() {
    var heZhiArr = [];
    var zhushu = 0;
    $.each($(".q3zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    return heZhiArr.join(",");
}

/**
 * 前三直选-跨度
 */
function content_q3zxkd() {
    var kaDuArr = [];
    $.each($(".h3kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        kaDuArr.push($.trim($(this).html()));
    });

    return kaDuArr.join(",");
}

/**
 * 前三直选-前三组合
 */
function content_q3zh() {
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });

    return gfwf_3xfs(
        wanArr,
        qianArr,
        baiArr
    );
}

/**
 * 前三组选-组三复式
 */
function content_q3z3fs() {
    var zuSanArr = [];
    $.each($(".z3fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuSanArr.push($.trim($(this).html()));
    });

    return zuSanArr.join(",");
}

/**
 * 前三组选-组六复式
 */
function content_q3z6fs(){
    var zuLiuArr = [];

    $.each($(".z6fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuLiuArr.push($.trim($(this).html()));
    });
    return zuLiuArr.join(",");
}

/**
 * 前三组选-和值
 */
function content_q3zuxhz() {
    var heZhiArr = [];
    var zhushu = 0;
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    return heZhiArr.join(",");
}

/**
 * 前三组选-前三和值尾数
 */
function content_q3hzws(){
    var hzArr = [];
    $.each($(".hzwsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    return hzArr.join(",");
}

/**
 * 前三组选-组选包胆
 */
function content_q3zuxbd(){
    var bdArr = [];
    $.each($(".bdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        bdArr.push($.trim($(this).html()));
    });

    return bdArr.join(",");
}

/**
 * 前三组选-特殊号
 */
function content_q3tsh(){
    var thArr = [];
    $.each($(".tshStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        thArr.push($.trim($(this).html()));
    });

    if (thArr.length <= 0) {
        alert("至少选择1注号码才能投注");
        return false;
    }

    return thArr.join(",");

}

/***************前二****************/
/**
 * 前二直选-直选复式
 */
function content_q2zxfs(){
    var wanArr = [], qianArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });

    return gfwf_2xfs(
        wanArr,
        qianArr
    );
}

/**
 * 前二直选-直选和值
 */
function content_q2zxhz(){
    var hzArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    return hzArr.join(",");
}

/**
 * 前二直选-直选跨度
 */
function content_q2zxkd(){
    var kdArr = [];
    $.each($(".kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        kdArr.push($.trim($(this).html()));
    });

    return kdArr.join(",");
}

/**
 * 前二组选-组选复式
 */
function content_q2zuxfs(){
    var zuxArr = [];
    $.each($(".zuxStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuxArr.push($.trim($(this).html()));
    });

    return zuxArr.join(",");
}

/**
 * 前二组选-组选和值
 */
function content_q2zuxhz(){
    var hzArr = [];
    $.each($(".q2zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        hzArr.push($.trim($(this).html()));
    });

    return hzArr.join(",");
}

/**
 * 前二组选-组选包胆
 */
function content_q2zuxbd(){
    var dmArr = [];
    $.each($(".zuxbdStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dmArr.push($.trim($(this).html()));
    });

    return dmArr.join(",");
}

/***************不定位**************/
/**
 * 不定位-前三一码
 */
function content_q3ym(){
    var budwArr = [];
    $.each($(".q3ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-前三二码
 */
function content_q3em(){
    var budwArr = [];
    $.each($(".q3emStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-后三一码
 */
function content_h3ym(){
    var budwArr = [];
    $.each($(".h3ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-后三二码
 */
function content_h3em(){
    var budwArr = [];
    $.each($(".h3emStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-前四一码
 */
function content_q4ym(){
    var budwArr = [];
    $.each($(".q4ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-前四二码
 */
function content_q4em(){
    var budwArr = [];
    $.each($(".q4emStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-后四一码
 */
function content_h4ym(){
    var budwArr = [];
    $.each($(".h4ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-后四二码
 */
function content_h4em(){
    var budwArr = [];
    $.each($(".h4emStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-五星一码
 */
function content_wxym(){
    var budwArr = [];
    $.each($(".wxymStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-五星二码
 */
function content_wxem(){
    var budwArr = [];
    $.each($(".wxemStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**
 * 不定位-五星三码
 */
function content_wx3m(){
    var budwArr = [];
    $.each($(".wxsmStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        budwArr.push($.trim($(this).html()));
    });

    return budwArr.join(",");
}

/**************大小单双*************/
/**
 * 前2大小单双
 */
function content_q2dxds() {
    var zhushu = 0;
    var dxdsWArr = [], dxdsQArr = [], tempArr = [];

    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsWArr.push($.trim($(this).html()));
    });

    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsQArr.push($.trim($(this).html()));
    });

    for (var n = 0; n < dxdsWArr.length; n++) {
        for (var m = 0; m < dxdsQArr.length; m++) {
            tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
        }
    }

    if(dxdsWArr.length <= 0 || dxdsQArr.length <= 0){
        return;
    }

    var arr = [
        dxdsWArr.join(","),
        dxdsQArr.join(",")
    ];

    return "{0}|{1}".format(arr[0], arr[1]);
}

/**
 * 后2大小单双
 */
function content_h2dxds() {
    var zhushu = 0;
    var dxdsSArr = [], dxdsGArr = [], tempArr = [];
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsSArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsGArr.push($.trim($(this).html()));
    });

    for (var n = 0; n < dxdsSArr.length; n++) {
        for (var m = 0; m < dxdsGArr.length; m++) {
            tempArr.push(dxdsSArr[n] + "" + dxdsGArr[m]);
        }
    }
    if(dxdsSArr.length <= 0 || dxdsGArr.length <= 0){
        return;
    }
    var arr = [
        dxdsSArr.join(","),
        dxdsGArr.join(",")
    ];
    return "{0}|{1}".format(arr[0], arr[1]);
}

/**
 * 前三大小单双
 */
function content_q3dxds() {
    var zhushu = 0;
    var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [], tempArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsWArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsQArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsBArr.push($.trim($(this).html()));
    });


    for (var n = 0; n < dxdsWArr.length; n++) {
        for (var m = 0; m < dxdsQArr.length; m++) {
            for (var h = 0; h < dxdsQArr.length; h++) {
                tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m] + "" + dxdsBArr[h]);
            }
        }
    }
    if(dxdsWArr.length <= 0 || dxdsQArr.length <= 0|| dxdsBArr.length <= 0){
        return;
    }
    var arr = [
        dxdsWArr.join(","),
        dxdsQArr.join(","),
        dxdsBArr.join(",")
    ];
    return "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);
}

/**
 * 后三大小单双
 */
function content_h3dxds() {
    var zhushu = 0;
    var dxdsBArr = [],dxdsSArr = [], dxdsGArr = [], tempArr = [];
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsBArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsSArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        dxdsGArr.push($.trim($(this).html()));
    });

    for (var i = 0; i < dxdsBArr.length; i++) {
        for (var n = 0; n < dxdsSArr.length; n++) {
            for (var m = 0; m < dxdsGArr.length; m++) {
                tempArr.push(dxdsBArr[i] + "" + dxdsSArr[n] + "" + dxdsGArr[m]);
            }
        }
    }
    if(dxdsBArr.length <= 0 || dxdsSArr.length <= 0 || dxdsGArr.length <= 0){
        return;
    }
    var arr = [
        dxdsBArr.join(","),
        dxdsSArr.join(","),
        dxdsGArr.join(",")
    ];
    return "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);
}

/***************任选2*************/
/**
 * 任选二-直选复式
 */
function content_rx2zxfs(){
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });


    var wanStr = wanArr.length > 0 ? ("万位: " + wanArr.join("")) : '';
    var qianStr = qianArr.length > 0 ? (" 千位: " + qianArr.join("")) : '';
    var baiStr = baiArr.length > 0 ? (" 百位: " + baiArr.join("")) : '';
    var shiStr = shiArr.length > 0 ? (" 十位: " + shiArr.join("")) : '';
    var geStr = geArr.length > 0 ? (" 个位: " + geArr.join("")) : '';
    var strTemp = $.trim(
        (wanStr == ' ' ? ' ' : wanArr.join(",") + "|") +
        (qianStr == ' ' ? ' ' : qianArr.join(",") + "|") +
        (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
        (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
        (geStr == ' ' ? ' ' : geArr.join(","))
    );

    return strTemp;
}

/**
 * 任选二-直选和值
 */
function content_rx2zxhz() {
    var hzArr = [], checkStrArr = [];
    $.each($(".zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        hzArr.push($.trim($(this).html()));
    });

    checkStrArr = getCheckboxValue();

    if (checkStrArr.length < 2) {
        Tools.alert("[任选二]至少需要选择2个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + hzArr.join(",");
}


/**
 * 任选二-组选复式
 */
function content_rx2zuxfs() {
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    var zuArr = [], arrTemp = [];
    $.each($(".zuxfsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 2) {
        Tools.alert("[任选二]至少需要选择2个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + zuArr.join(",");
}

/**
 * 任选二-组选和值
 */
function content_rx2zuxhz() {
    var hzArr = [];
    var checkStrArr = [];

    //获取位数字符串
    checkStrArr = getCheckboxValue();
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        hzArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 2) {
        Tools.alert("[任选二]至少需要选择2个位置");
        return -1;
    }
    // 转换投注格式
    return checkStrArr.join(',') + "|" + hzArr.join(",");
}

/***************任选3*************/
/**
 * 任选3-直选复式
 */
function content_rx3zxfs() {
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var wanStr = wanArr.length > 0 ? ("万位: " + wanArr.join("")) : '';
    var qianStr = qianArr.length > 0 ? (" 千位: " + qianArr.join("")) : '';
    var baiStr = baiArr.length > 0 ? (" 百位: " + baiArr.join("")) : '';
    var shiStr = shiArr.length > 0 ? (" 十位: " + shiArr.join("")) : '';
    var geStr = geArr.length > 0 ? (" 个位: " + geArr.join("")) : '';
    var strTemp = $.trim(
        (wanStr == ' ' ? ' ' : wanArr.join(",") + "|") +
        (qianStr == ' ' ? ' ' : qianArr.join(",") + "|") +
        (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
        (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
        (geStr == ' ' ? ' ' : geArr.join(","))
    );

    return strTemp;
}

/**
 * 任选3-直选和值
 */
function content_rx3zxhz() {
    var hzArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 3) {
        Tools.alert("[任选三]至少需要选择3个位置");
        return -1;
    }
    return checkStrArr.join(',') + "|" + hzArr.join(",");
}

/**
 * 任选3-组三复式
 */
function content_rx3z3fs() {
    var zuArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zu3fStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 3) {
        Tools.alert("[任选三]至少需要选择3个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + zuArr.join(",");
}

/**
 * 任选3-组六复式
 */
function content_rx3z6fs() {
    var zuArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zu6fStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 3) {
        Tools.alert("[任选三]至少需要选择3个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + zuArr.join(",");
}

/**
 * 任选3-组选和值
 */
function content_rx3zuxhz() {
    var hzArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    if (checkStrArr.length < 3) {
        Tools.alert("[任选三]至少需要选择3个位置");
        return -1;
    }

    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    return checkStrArr.join(',') + "|" + hzArr.join(",");
}

/***************任选4*************/
/**
 * 任选4-直选复式
 */
function content_rx4zxfs() {
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var wanStr = wanArr.length > 0 ? ("万位: " + wanArr.join("")) : '';
    var qianStr = qianArr.length > 0 ? (" 千位: " + qianArr.join("")) : '';
    var baiStr = baiArr.length > 0 ? (" 百位: " + baiArr.join("")) : '';
    var shiStr = shiArr.length > 0 ?  (" 十位: " + shiArr.join("")) : '';
    var geStr = geArr.length > 0 ? (" 个位: " + geArr.join("")) : '';

    var strTemp = $.trim(
        (wanStr == ' ' ? ' ' : wanArr.join(",") + "|") +
        (qianStr == ' ' ? ' ' : qianArr.join(",") + "|") +
        (baiStr == ' ' ? ' ' : baiArr.join(",") + "|") +
        (shiStr == ' ' ? ' ' : shiArr.join(",") + "|") +
        (geStr == ' ' ? ' ' : geArr.join(","))
    );

    return strTemp;
}

/**
 * 任选4-组选24
 */
function content_rx4zu24() {
    var zu24Arr = [];
    var checkStrArr = [];
    $.each($(".zu24Str .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        zu24Arr.push($.trim($(this).html()));
    });

    //获取位数字符串
    checkStrArr = getCheckboxValue();

    if (checkStrArr.length < 4) {
        Tools.alert("[任选四]至少需要选择4个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + zu24Arr.join(",");
}

/**
 * 任选4-组选12
 */
function content_rx4zu12() {
    var erChongHaoArr = [], danHaoArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zu12chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        erChongHaoArr.push($.trim($(this).html()));
    });

    $.each($(".zu12dhStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        danHaoArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 4) {
        Tools.alert("[任选四]至少需要选择4个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + erChongHaoArr.join(",") + "|" + danHaoArr.join(",");

}

/**
 * 任选4-组选6
 */
function content_rx4zu6() {
    var erChongHaoArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zu6chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        erChongHaoArr.push($.trim($(this).html()));
    });

    if (checkStrArr.length < 4) {
        Tools.alert("[任选四]至少需要选择4个位置");
        return -1;
    }

    return checkStrArr.join(',') + "|" + erChongHaoArr.join(",");
}

/**
 * 任选4-组选4
 */
function content_rx4zu4() {
    var sanChongHaoArr = [], danHaoArr = [];
    var checkStrArr = [];
    //获取位数字符串
    checkStrArr = getCheckboxValue();

    $.each($(".zu4chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        sanChongHaoArr.push($.trim($(this).html()));
    });

    $.each($(".zu4dhStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        danHaoArr.push($.trim($(this).html()));
    });


    if (checkStrArr.length < 4) {
        Tools.alert("[任选四]至少需要选择4个位置");
        return -1;
    }
    return checkStrArr.join(',') + "|" + sanChongHaoArr.join(",") + "|" + danHaoArr.join(",");
}


//======================================================注数算法====================================

/********************************************双色球**********************************************/
function zhushu_hlzx(){
    var wanLength = 0, qianLength = 0, totalLength = 0;
    var wanArr = [], qianArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf_blue"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });

    if(wanArr.length <= 0 || qianArr.length <= 0){
        return 0;
    }

    wanLength = getFlagArrs(wanArr, 5);
    qianLength = getFlagArrs(qianArr, 1);

    totalLength = wanLength.length * qianLength.length;
    return totalLength;
}

/********************************************11选5**********************************************/

/**
 * 注数-任选八中五胆拖
 */
function zhushu_rx8z5dt(){
    return getRxDtCommonMethod(8);
}

/**
 * 注数-任选七中五胆拖
 */
function zhushu_rx7z5dt(){
    return getRxDtCommonMethod(7);
}

/**
 * 注数-任选六中五胆拖
 */
function zhushu_rx6z5dt(){
    return getRxDtCommonMethod(6);
}

/**
 * 注数-任选五中五胆拖
 */
function zhushu_rx5z5dt(){
    return getRxDtCommonMethod(5);
}

/**
 * 注数-任选四中四胆拖
 */
function zhushu_rx4z4dt(){
    return getRxDtCommonMethod(4);
}

//获取任选中胆码通用选取注数
function getRxDtCommonMethod(arrLength){
    var tempLength = 0;
    var wanArr = [], qianArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });

    if(wanArr.length <= 0 || qianArr.length <= 0){
        return 0;
    }

    for(var i = 0; i < arrLength; i++){
        if(wanArr.length == i) {
            tempLength = getFlagArrs(qianArr, arrLength - i);
        }
    }

    return tempLength.length;
}

/**
 * 注数-任选三中三胆拖
 */
function zhushu_rx3z3dt(){
    return getCommonTuodan11X5();
}

/**
 * 注数-任选二中二胆拖
 */
function zhushu_rx2z2dt(){
    return getCommonErMaZxfs11x5();
}

/**
 * 注数-任选八中五-11x5
 */
function zhushu_rx8z5() {
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    var tmpArr = getFlagArrs(wanArr, 8);
    return tmpArr.length;
}

/**
 * 注数-任选七中五-11x5
 */
function zhushu_rx7z5() {
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    var tmpArr = getFlagArrs(wanArr, 7);
    return tmpArr.length;
}

/**
 * 注数-任选六中五-11x5
 */
function zhushu_rx6z5() {
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    var tmpArr = getFlagArrs(wanArr, 6);
    return tmpArr.length;
}

/**
 * 注数-任选五中五-11x5
 */
function zhushu_rx5z5() {
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    var tmpArr = getFlagArrs(wanArr, 5);
    return tmpArr.length;
}


/**
 * 注数-任选四中四-11x5
 */
function zhushu_rx4z4() {
    var newArr = [];
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    for (var i = 0; i < wanArr.length; i++) {
        for (var n = i; n < wanArr.length; n++) {
            for (var j = n; j < wanArr.length; j++) {
                for (var m = j; m < wanArr.length; m++) {
                    if (parseInt(wanArr[i]) != parseInt(wanArr[n]) && parseInt(wanArr[i]) != parseInt(wanArr[j])
                        && parseInt(wanArr[i]) != parseInt(wanArr[m]) && parseInt(wanArr[n]) != parseInt(wanArr[j])
                        && parseInt(wanArr[n]) != parseInt(wanArr[m]) && parseInt(wanArr[j]) != parseInt(wanArr[m])) {
                        newArr.push(wanArr[i] + '' + wanArr[n] + '' + wanArr[j] + '' + wanArr[m]);
                    }
                }
            }
        }
    }

    return newArr.length;
}

/**
 * 注数-任选三中三-11x5
 */
function zhushu_rx3z3() {
    return getCommonRx3z311x5();
}

/**
 * 注数-任选二中二-11x5
 */
function zhushu_rx2z2() {
    return getCommonQ2zuxfs11x5();
}

/**
 * 注数-任选一中一-11x5
 */
function zhushu_rx1z1() {
    return getCommonBdw();
}

/**
 * 注数-不定位后3位-11x5
 */
function zhushu_h3w() {
    return getCommonBdw();
}

/**
 * 注数-不定位中3位-11x5
 */
function zhushu_z3w() {
    return getCommonBdw();
}

/**
 * 注数-不定位前3位-11x5
 */
function zhushu_q3w() {
    return getCommonBdw();
}

/**
 * 注数-后2组选复式-11x5
 */
function zhushu_h2zuxtd() {
    return getCommonQ2zuxtd();
}

/**
 * 注数-前2组选复式-11x5
 */
function zhushu_q2zuxtd() {
    return getCommonQ2zuxtd();
}

/**
 * 注数-前2组选复式-11x5
 */
function zhushu_q2zuxfs11x5() {
    return getCommonQ2zuxfs11x5();
}

/**
 * 注数-后2组选复式-11x5
 */
function zhushu_h2zuxfs11x5() {
    return getCommonQ2zuxfs11x5();
}

/**
 * 注数-前2直选复式-11选5
 */
function zhushu_q2zxfs11x5() {
    return getCommonErMaZxfs11x5();
}

/**
 * 注数-后2直选复式-11选5
 */
function zhushu_h2zxfs11x5() {
    return getCommonErMaZxfs11x5();
}

/**
 * 注数-前3组选胆拖-11选5
 */
function zhushu_q3zuxtd() {
    return getCommonTuodan11X5();
}

/**
 * 注数-中3组选胆拖-11选5
 */
function zhushu_z3zuxtd() {
    return getCommonTuodan11X5();
}

/**
 * 注数-后3组选胆拖-11选5
 */
function zhushu_h3zuxtd() {
    return getCommonTuodan11X5();
}

/**
 * 注数-前3直选复式-11选5
 */
function zhushu_q3zxfs_11x5() {
    return getCommonZhushu11x5();
}

/**
 * 注数-中3直选复式-11选5
 */
function zhushu_z3zxfs_11x5() {
    return getCommonZhushu11x5();
}

/**
 * 注数-后3直选复式-11选5
 */
function zhushu_h3zxfs_11x5() {
    return getCommonZhushu11x5();
}

/**
 * 注数-前3组选复式-11选5
 */
function zhushu_q3zuxfs() {
    return get3MFs115();
}

/**
 * 注数-中3组选复式-11选5
 */
function zhushu_z3zuxfs() {
    return get3MFs115();
}

/**
 * 注数-后3组选复式-11选5
 */
function zhushu_h3zuxfs() {
    return get3MFs115();
}

function getCommonRx3z311x5(){
    var newArr = [];
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    for (var i = 0; i < wanArr.length; i++) {
        for (var n = i; n < wanArr.length; n++) {
            for (var j = n; j < wanArr.length; j++) {
                if (parseInt(wanArr[i]) != parseInt(wanArr[n]) && parseInt(wanArr[i]) != parseInt(wanArr[j]) && parseInt(wanArr[n]) != parseInt(wanArr[j])) {
                    newArr.push(wanArr[i] + '' + wanArr[n] + '' + wanArr[j]);
                }
            }
        }
    }

    return newArr.length;
}


function getCommonBdw(){
    var newArr = [];
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    if (wanArr.length <= 0) {
        return 0;
    }

    for (var i = 0; i < wanArr.length; i++) {
        newArr.push(wanArr[i]);
    }

    return newArr.length;
}

function getCommonQ2zuxtd(){
    var newArr = [];
    var wanArr = [], qianArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    if (wanArr.length <= 0) {
        return 0;
    }

    for (var i = 0; i < qianArr.length; i++) {
        newArr.push(wanArr[0] + '' + qianArr[i]);
    }

    return newArr.length;
}

function getCommonQ2zuxfs11x5(){
    var newArr = [];
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });

    for (var i = 0; i < wanArr.length; i++) {
        for (var n = i; n < wanArr.length; n++) {
            if (parseInt(wanArr[i]) != parseInt(wanArr[n])) {
                newArr.push(wanArr[i] + '' + wanArr[n]);
            }
        }
    }

    return newArr.length;
}

function getCommonErMaZxfs11x5() {
    var newArr = [];
    var tempStr = '';
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    for (var i = 0; i < wanArr.length; i++) {
        for (var n = 0; n < qianArr.length; n++) {
            if (parseInt(wanArr[i]) != parseInt(qianArr[n])) {
                newArr.push(wanArr[i] + '' + qianArr[n]);
            }
        }
    }

    return newArr.length;
}


function getCommonTuodan11X5() {
    var newArr = [];
    var tempStr = '';
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });

    if (wanArr.length <= 0 || qianArr.length <= 0) {
        return 0;
    }

    if (wanArr.length == 2) {
        for (var m = 0; m < qianArr.length; m++) {
            newArr.push(wanArr[0] + '' + wanArr[1] + '' + qianArr[m]);
        }
    } else {
        for (var x = 0; x < qianArr.length; x++) {
            for (var y = x; y < qianArr.length; y++) {
                if (qianArr[x] != qianArr[y]) {
                    if (parseInt(qianArr[x]) > parseInt(qianArr[y])) {
                        tempStr = qianArr[x];
                        qianArr[x] = qianArr[y];
                        qianArr[y] = tempStr;
                    }
                    newArr.push(wanArr[0] + '' + qianArr[x] + '' + qianArr[y]);
                }
            }
        }
    }

    return newArr.length;
}

function getCommonZhushu11x5(){
    var newArr = [];
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
        return 0;
    }
    newArr = getThreeNewArrs11x5(wanArr, qianArr, baiArr);
    return newArr.length;
}


// 11选5-三码复式
function get3MFs115() {
    var newArr = [];
    var wanArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push(parseInt($.trim($(this).html())));
    });

    var tempArr = [], zxArr = [];
    zxArr = wanArr;
    for (var i = 0; i < zxArr.length; i++) {
        for (var i1 = 0; i1 < zxArr.length; i1++) {
            for (var i2 = 0; i2 < zxArr.length; i2++) {
                if (zxArr[i] != zxArr[i1] && zxArr[i1] != zxArr[i2] && zxArr[i] != zxArr[i2]) {
                    var sortArr = [];
                    sortArr.push(zxArr[i]);
                    sortArr.push(zxArr[i1]);
                    sortArr.push(zxArr[i2]);
                    sortArr.sort();
                    tempArr.push(sortArr.join(""));
                }
            }
        }
    }
    tempArr = tempArr.uniqueArr();
    return tempArr.length;
}

/********************************************PK10**********************************************/

/**
 * 注数-PK10前一
 */

function zhushu_qy(){
    var arr1 = [], newArr = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });


    if (arr1.length <= 0) {
        return 0;
    }

    if (arr1.length > 0) {
        newArr = newArr.concat(arr1);
    }

    return newArr.length;
}


/**
 * 注数-PK10定位胆
 */
function zhushu_dwd_pk10(){
    var arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = [];
    var newArr = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });
    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });
    $.each($(".di3m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr3.push($.trim($(this).html()));
    });
    $.each($(".di4m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr4.push($.trim($(this).html()));
    });
    $.each($(".di5m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr5.push($.trim($(this).html()));
    });
    $.each($(".di6m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr6.push($.trim($(this).html()));
    });
    $.each($(".di7m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr7.push($.trim($(this).html()));
    });
    $.each($(".di8m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr8.push($.trim($(this).html()));
    });
    $.each($(".di9m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr9.push($.trim($(this).html()));
    });
    $.each($(".di10m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr10.push($.trim($(this).html()));
    });


    if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0 && arr4.length <= 0 && arr5.length <= 0 &&
        arr6.length <= 0 && arr7.length <= 0 && arr8.length <= 0 && arr9.length <= 0 && arr10.length <= 0) {
        return 0;
    }

    if (arr1.length > 0) {
        newArr = newArr.concat(arr1);
    }
    if (arr2.length > 0) {
        newArr = newArr.concat(arr2);
    }
    if (arr3.length > 0) {
        newArr = newArr.concat(arr3);
    }
    if (arr4.length > 0) {
        newArr = newArr.concat(arr4);
    }
    if (arr5.length > 0) {
        newArr = newArr.concat(arr5);
    }
    if (arr6.length > 0) {
        newArr = newArr.concat(arr6);
    }
    if (arr7.length > 0) {
        newArr = newArr.concat(arr7);
    }
    if (arr8.length > 0) {
        newArr = newArr.concat(arr8);
    }
    if (arr9.length > 0) {
        newArr = newArr.concat(arr9);
    }
    if (arr10.length > 0) {
        newArr = newArr.concat(arr10);
    }
    return newArr.length;
}

/**
 * 注数-PK10前二
 */
function zhushu_qe(){
    var arr1 = [], arr2 = [], newArr = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });
    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });

    if (arr1.length <= 0 || arr2.length <= 0) {
        return 0;
    }

    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){
            if(arr1[i] != arr2[j]){
                newArr.push(arr1[i] + ',' + arr2[j]);
            }
        }
    }

    return newArr.length;
}

/**
 * 注数-PK10前三
 */
function zhushu_qsan(){
    var arr1 = [], arr2 = [], arr3 = [], newArr = [];
    $.each($(".di1m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr1.push($.trim($(this).html()));
    });
    $.each($(".di2m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr2.push($.trim($(this).html()));
    });
    $.each($(".di3m .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        arr3.push($.trim($(this).html()));
    });

    if (arr1.length <= 0 && arr2.length <= 0 && arr3.length <= 0) {
        return 0;
    }

    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){
            for(var m = 0; m < arr3.length; m++) {
                if (arr1[i] != arr2[j] && arr1[i] != arr3[m] && arr2[j] != arr3[m]) {
                    newArr.push(arr1[i] + ',' + arr2[j] + ',' + arr3[m]);
                }
            }
        }
    }

    return newArr.length;
}


/**************定位胆***************/
/**
 * 注数-定位胆 / 时时彩与11选5共用注数方法
 */
function zhushu_dwd(){
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        geArr.push($.trim($(this).html()));
    });
    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;

    if (wanLength <= 0 && qianLength <= 0 && baiLength <= 0 && shiLength <= 0 && geLength <= 0) {
        return 0;
    }

    if (wanLength > 0) {
        newArr = newArr.concat(wanArr);
    }
    if (qianLength > 0) {
        newArr = newArr.concat(qianArr);
    }
    if (baiLength > 0) {
        newArr = newArr.concat(baiArr);
    }
    if (shiLength > 0) {
        newArr = newArr.concat(shiArr);
    }
    if (geLength > 0) {
        newArr = newArr.concat(geArr);
    }
    return newArr.length;
}

/***********五星直选复式*************/
/**
 * 注数-5星直选复式
 */
function zhushu_5xzxfs() {
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;

    if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
        return 0;
    }

    var newArr = getNewArrs(wanArr, qianArr, baiArr, shiArr, geArr);
    return newArr.length;
}

/***********四星直选复式*************/
/**
 * 注数-4星直选复式
 */
function zhushu_4xzxfs() {
    var qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;

    if (qianLength <= 0 || baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
        return 0;
    }

    var newArr = getFourNewArrs(qianArr, baiArr, shiArr, geArr);
    if (typeof newArr == "undefined" || newArr.length <= 0) {
        if (typeof clearStateTouZhu == 'function') {
            clearStateTouZhu();
        }
        return;
    }
    return newArr.length;
}

/***************后三****************/
/**
 * 注数-特殊号
 */
function zhushu_h3tsh() {
    var tsArr = [];
    $.each($(".tshStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        tsArr.push($.trim($(this).html()));
    });
    var zlLength = tsArr.length;
    if (zlLength <= 0) {
        return 0;
    }
    return tsArr.length;
}

/**
 * 注数-和值尾数
 */
function zhushu_h3hzws() {
    var wsArr = [], newArr = [];
    $.each($(".hzwsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wsArr.push($.trim($(this).html()));
    });
    var zlLength = wsArr.length;
    if (zlLength < 0) {
        return 0;
    }
    return zlLength;
}

/**
 * 注数-组选包胆
 */
function zhushu_h3zuxbd(){
    var baoDanArr = [], newArr = [];
    $.each($(".bdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baoDanArr.push($.trim($(this).html()));
    });
    var zlLength = baoDanArr.length;
    if (zlLength < 0) {
        return 0;
    }
    newArr = getZxbdNewArrs(baoDanArr);
    return newArr.length;
}

/**
 * 注数-组选和值
 */
function zhushu_h3zuxhz(){
    var fuShiArr = [], newArr = [];
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });

    var zlLength = fuShiArr.length;
    if (zlLength <= 0) {
        return 0;
    }
    newArr = getZxhzNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-组六复式
 */
function zhushu_h3z6fs(){
    var fuShiArr = [], newArr = [];
    $.each($(".z6fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });
    var zlLength = fuShiArr.length;
    if (zlLength < 3) {
        return 0;
    }
    newArr = getZuLiuNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-组三复式
 */
function zhushu_h3z3fs(){
    var fuShiArr = [], newArr = [];
    $.each($(".z3fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });

    var heZhiLength = fuShiArr.length;
    if (heZhiLength <= 1) {
        return 0;
    }
    newArr = getZuXuanNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-后3组合
 */
function zhushu_h3zh() {
    var baiArr = [], shiArr = [], geArr = [];
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;

    if (baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
        return;
    }

    var newArr = getHszhNewArrs(baiArr, shiArr, geArr);
    return newArr.length;
}

/**
 * 注数-直选跨度
 */
function zhushu_h3zxkd() {
    var newArr = [];
    var kaDuArr = [];
    $.each($(".h3kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        kaDuArr.push($.trim($(this).html()));
    });
    if (kaDuArr.length <= 0) {
        return 0;
    }
    newArr = getKaduNewArrs(kaDuArr);
    return newArr.length;
}

/**
 * 注数-直选和值
 */
function zhushu_h3zxhz() {
    var heZhiArr = [], newArr = [];
    $.each($(".h3zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    var heZhiLength = heZhiArr.length;
    if (heZhiLength <= 0) {
        return 0;
    }

    newArr = getHezNewArrs(heZhiArr);
    return newArr.length;
}

/**
 * 注数-后3直选复式
 */
function zhushu_h3zxfs() {
    var newArr = [];
    var baiArr = [], shiArr = [], geArr = [];
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var baiLength = baiArr.length;
    var shiLength = shiArr.length;
    var geLength = geArr.length;
    if (baiLength <= 0 || shiLength <= 0 || geLength <= 0) {
        return 0;
    }
    newArr = getThreeNewArrs(baiArr, shiArr, geArr);
    return newArr.length;
}

//******************前三****************
/**
 * 注数-特殊号
 */
function zhushu_q3tsh() {
    var tsArr = [];
    $.each($(".tshStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        tsArr.push($.trim($(this).html()));
    });
    var zlLength = tsArr.length;
    if (zlLength <= 0) {
        return 0;
    }
    return tsArr.length;
}

/**
 * 注数-和值尾数
 */
function zhushu_q3hzws() {
    var wsArr = [], newArr = [];
    $.each($(".hzwsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wsArr.push($.trim($(this).html()));
    });
    var zlLength = wsArr.length;
    if (zlLength < 0) {
        return 0;
    }
    return zlLength;
}

/**
 * 注数-组选包胆
 */
function zhushu_q3zuxbd(){
    var baoDanArr = [], newArr = [];
    $.each($(".bdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baoDanArr.push($.trim($(this).html()));
    });
    var zlLength = baoDanArr.length;
    if (zlLength < 0) {
        return 0;
    }
    newArr = getZxbdNewArrs(baoDanArr);
    return newArr.length;
}

/**
 * 注数-组选和值
 */
function zhushu_q3zuxhz(){
    var fuShiArr = [], newArr = [];
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });

    var zlLength = fuShiArr.length;
    if (zlLength <= 0) {
        return 0;
    }
    newArr = getZxhzNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-组六复式
 */
function zhushu_q3z6fs(){
    var fuShiArr = [], newArr = [];
    $.each($(".z6fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });
    var zlLength = fuShiArr.length;
    if (zlLength < 3) {
        return 0;
    }
    newArr = getZuLiuNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-组三复式
 */
function zhushu_q3z3fs(){
    var fuShiArr = [], newArr = [];
    $.each($(".z3fsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });

    var heZhiLength = fuShiArr.length;
    if (heZhiLength <= 1) {
        return 0;
    }
    newArr = getZuXuanNewArrs(fuShiArr);
    return newArr.length;
}

/**
 * 注数-前3组合
 */
function zhushu_q3zh() {
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        baiArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;

    if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
        return;
    }

    var newArr = getHszhNewArrs(wanArr, qianArr, baiArr);
    return newArr.length;
}

/**
 * 注数-直选跨度
 */
function zhushu_q3zxkd() {
    var newArr = [];
    var kaDuArr = [];
    $.each($(".h3kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        kaDuArr.push($.trim($(this).html()));
    });
    if (kaDuArr.length <= 0) {
        return 0;
    }
    newArr = getKaduNewArrs(kaDuArr);
    return newArr.length;
}

/**
 * 注数-直选和值
 */
function zhushu_q3zxhz() {
    var heZhiArr = [], newArr = [];
    $.each($(".q3zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        heZhiArr.push($.trim($(this).html()));
    });

    var heZhiLength = heZhiArr.length;
    if (heZhiLength <= 0) {
        return 0;
    }

    newArr = getHezNewArrs(heZhiArr);
    return newArr.length;
}

/**
 * 注数-前3直选复式
 */
function zhushu_q3zxfs() {
    var newArr = [];
    var wanArr = [], qianArr = [], baiArr = [];
    $.each($(".wanweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiweiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;
    var baiLength = baiArr.length;
    if (wanLength <= 0 || qianLength <= 0 || baiLength <= 0) {
        return 0;
    }
    newArr = getThreeNewArrs(wanArr, qianArr, baiArr);
    return newArr.length;
}



//***************** 注数 - 前二 *********************

/**
 * 注数-直选复式
 */
function zhushu_q2zxfs() {
    var tempArr = [];
    var wanArr = [], qianArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });

    var wanLength = wanArr.length;
    var qianLength = qianArr.length;

    if (wanLength <= 0 || qianLength <= 0) {
        return 0;
    }

    for(var i = 0; i < wanArr.length; i++){
        for(var i1 = 0; i1 < qianArr.length; i1++){
            tempArr.push(wanArr[i] + "" + qianArr[i1]);
        }
    }
    return tempArr.length;
}

//注数-直选和值
function zhushu_q2zxhz() {
    var tempArr = [];
    var hzArr = [], temp = [], nowTemp = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        nowTemp.push($.trim($(this).html()));
    });

    if (typeof valArr != "undefined") {
        hzArr = valArr;
    } else {
        hzArr = nowTemp;
    }

    var hzLength = hzArr.length;
    if (hzLength <= 0) {
        return 0;
    }

    for (var n = 0; n < hzArr.length; n++) {
        sumTemp = parseInt(hzArr[n]);
        num = parseInt(hzArr[n]);
        while (sumTemp >= 0) {
            temp.push(sumTemp);
            sumTemp--;
        }

        for (var i = 0; i < temp.length; i++) {
            for (var i1 = 0; i1 < temp.length; i1++) {
                if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                    tempArr.push(temp[i] + "" + temp[i1]);
                }
            }
        }
    }

    tempArr = tempArr.uniqueArr();
    return tempArr.length;
}

//注数-直选跨度
function zhushu_q2zxkd() {
    var tempArr = [];
    var kdArr = [], numTemp = [];
    var num = 0;

    $.each($(".kdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        numTemp.push($.trim($(this).html()));
    });

    if (typeof valArr != "undefined") {
        kdArr = valArr;
    } else {
        kdArr = numTemp;
    }

    var hzLength = kdArr.length;
    if (hzLength <= 0) {
        return 0;
    }

    for (var n = 0; n < kdArr.length; n++) {
        num = kdArr[n];
        for (var i = 0; i < 10; i++) {
            for (var i1 = 0; i1 < 10; i1++) {
                var numTemp = [];
                numTemp.push(i);
                numTemp.push(i1);
                numTemp.sort();
                if (numTemp[1] - numTemp[0] == num) {
                    tempArr.push(i + "" + i1);
                }
            }
        }
    }

    tempArr = tempArr.uniqueArr();
    return tempArr.length;
}

//注数-组选复式
function zhushu_q2zuxfs() {
    var tempArr = [], zuxArr = [];
    $.each($(".zuxStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuxArr.push($.trim($(this).html()));
    });

    var xLength = zuxArr.length;
    if (xLength < 2) {
        return 0;
    }

    for(var i = 0; i < zuxArr.length; i++){
        for(var i1 = 0; i1 < zuxArr.length; i1++){
            if(zuxArr[i] != zuxArr[i1]){
                var xArr =[];
                xArr.push(zuxArr[i]);
                xArr.push(zuxArr[i1]);
                xArr.sort();
                tempArr.push(xArr.join(""));
            }
        }
    }
    tempArr = tempArr.uniqueArr();
    return tempArr.length;
}

//注数-组选包胆
function zhushu_q2zuxbd() {
    var tempArr = [];
    var bdArr = [], nowTemp = [];
    $.each($(".zuxbdStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        nowTemp.push($.trim($(this).html()));
    });

    if (typeof valArr != "undefined") {
        bdArr = valArr;
    } else {
        bdArr = nowTemp;
    }
    var bdLength = bdArr.length;
    if (bdLength <= 0) {
        return 0;
    }
    for (var n = 0; n < bdArr.length; n++) {
        for (var i = 0; i < 10; i++) {
            if (i != bdArr[n]) {
                tempArr.push(i + "" + bdArr[n]);
            }
        }
    }
    return tempArr.length;
}

/**
 * 注数-组选和值
 */
function zhushu_q2zuxhz(){
    var tempArr = [];
    var hzArr = [], temp = [];
    var sumTemp = 0, num = 0;
    $.each($(".q2zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        hzArr.push($.trim($(this).html()));
    });

    var hzLength = hzArr.length;
    if (hzLength <= 0) {
        return 0;
    }

    for (var n = 0; n < hzArr.length; n++) {
        sumTemp = parseInt(hzArr[n]);
        num = parseInt(hzArr[n]);
        while (sumTemp >= 0) {
            temp.push(sumTemp);
            sumTemp--;
        }

        for (var i = 0; i < temp.length; i++) {
            for (var i1 = 0; i1 < temp.length; i1++) {
                if (temp[i] + temp[i1] == num && temp[i] <= 9 && temp[i1] <= 9) {
                    if (temp[i] != temp[i1]) {
                        var arr1 = [];
                        arr1.push(temp[i]);
                        arr1.push(temp[i1]);
                        arr1.sort();
                        tempArr.push(arr1.join(""));
                    }
                }
            }
        }
    }
    if (tempArr.length <= 0) {
        return 0;
    }
    tempArr = tempArr.uniqueArr();
    return tempArr.length;
}

//********************* 不定位 ************************

//注数-前三一码
function zhushu_q3ym() {
    var budwArr = [];
    $.each($(".q3ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    return budwArr.length;
}

//注数-前三二码
function zhushu_q3em() {
    var budwArr = [];
    $.each($(".q3emStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });

    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            if (i != j) {
                var arr = [];
                arr.push(budwArr[i]);
                arr.push(budwArr[j]);
                arr.sort();
                newArr.push(arr.join(","));
            }
        }
    }
    newArr = newArr.uniqueArr();
    return newArr.length;
}

//注数-后三一码
function zhushu_h3ym() {
    var budwArr = [];
    $.each($(".h3ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    return budwArr.length;
}

//注数-后三二码
function zhushu_h3em() {
    var budwArr = [];
    $.each($(".h3emStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            if (i != j) {
                var arr = [];
                arr.push(budwArr[i]);
                arr.push(budwArr[j]);
                arr.sort();
                newArr.push(arr.join(","));
            }
        }
    }
    newArr = newArr.uniqueArr();
    return newArr.length;
}

//注数-前四一码
function zhushu_q4ym() {
    var budwArr = [];
    $.each($(".q4ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    return budwArr.length;
}

//注数-前四二码
function zhushu_q4em() {
    var budwArr = [];
    $.each($(".q4emStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });

    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            if (i != j) {
                var arr = [];
                arr.push(budwArr[i]);
                arr.push(budwArr[j]);
                arr.sort();
                newArr.push(arr.join(","));
            }
        }
    }

    newArr = newArr.uniqueArr();
    return newArr.length;
}

//注数-后四一码
function zhushu_h4ym() {
    var budwArr = [];
    $.each($(".h4ymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    return budwArr.length;
}

//注数-后四二码
function zhushu_h4em() {
    var budwArr = [];
    $.each($(".h4emStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            if (i != j) {
                var arr = [];
                arr.push(budwArr[i]);
                arr.push(budwArr[j]);
                arr.sort();
                newArr.push(arr.join(","));
            }
        }
    }

    newArr = newArr.uniqueArr();
    return newArr.length;
}

//注数-五星一码
function zhushu_wxym() {
    var budwArr = [];
    $.each($(".wxymStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });
    return budwArr.length;
}

//注数-五星二码
function zhushu_wxem() {
    var budwArr = [];
    $.each($(".wxemStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });

    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            if (i != j) {
                var arr = [];
                arr.push(budwArr[i]);
                arr.push(budwArr[j]);
                arr.sort();
                newArr.push(arr.join(","));
            }
        }
    }

    newArr = newArr.uniqueArr();
    return newArr.length;
}

//注数-五星三码
function zhushu_wx3m() {
    var budwArr = [];
    $.each($(".wxsmStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        budwArr.push($.trim($(this).html()));
    });

    var newArr = [];
    for (var i = 0; i < budwArr.length; i++) {
        for (var j = 0; j < budwArr.length; j++) {
            for (var x = 0; x < budwArr.length; x++) {
                if (i != j && j != x && i != x) {
                    var arr = [];
                    arr.push(budwArr[i]);
                    arr.push(budwArr[j]);
                    arr.push(budwArr[x]);
                    arr.sort();
                    newArr.push(arr.join(","));
                }
            }
        }
    }

    newArr = newArr.uniqueArr();
    return newArr.length;
}

//**************** 注数-大小单双 *****************

//注数-前二大小单双
function zhushu_q2dxds() {
    var dxdsWArr = [], dxdsQArr = [], tempArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsWArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsQArr.push($.trim($(this).html()));
    });

    for (var n = 0; n < dxdsWArr.length; n++) {
        for (var m = 0; m < dxdsQArr.length; m++) {
            tempArr.push(dxdsWArr[n] + "" + dxdsQArr[m]);
        }
    }
    return tempArr.length;
}

//注数-后二大小单双
function zhushu_h2dxds(){
    var dxdsSArr = [], dxdsGArr = [];
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsSArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsGArr.push($.trim($(this).html()));
    });

    return dxdsSArr.length * dxdsGArr.length;
}

//注数-前三大小单双
function zhushu_q3dxds(){
    var dxdsWArr = [], dxdsQArr = [], dxdsBArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsWArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsQArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsBArr.push($.trim($(this).html()));
    });
    return dxdsWArr.length * dxdsQArr.length * dxdsBArr.length;
}

//注数-后三大小单双
function zhushu_h3dxds(){
    var dxdsBArr = [],dxdsSArr = [], dxdsGArr = [];
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsBArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsSArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        dxdsGArr.push($.trim($(this).html()));
    });
    return dxdsBArr.length * dxdsSArr.length * dxdsGArr.length;
}


//********* 注数-任选二 ****************

//注数-直选复式
function zhushu_rx2zxfs() {
    var arrNew = [], tempArr = [];
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    if (wanArr.length > 0) {
        arrNew.push(wanArr);
    }
    if (qianArr.length > 0) {
        arrNew.push(qianArr);
    }
    if (baiArr.length > 0) {
        arrNew.push(baiArr);
    }
    if (shiArr.length > 0) {
        arrNew.push(shiArr);
    }
    if (geArr.length > 0) {
        arrNew.push(geArr);
    }

    if (arrNew.length < 2) {
        return 0;
    }

    for (var i = 0; i < arrNew.length; i++) {
        for (var i1 = 0; i1 < arrNew[i].length; i1++) {
            for (var x = i + 1; x < arrNew.length; x++) {
                for (var n = 0; n < arrNew[x].length; n++) {
                    tempArr.push(arrNew[i][i1] + "" + arrNew[x][n]);
                }
            }
        }
    }
    return tempArr.length;
}

//注数-直选和值
function zhushu_rx2zxhz(){
    var hzArr = [];
    var newArr = [];

    $.each($(".zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    if (hzArr.length <= 0) {
        return 0;
    }
    for (var i = 0; i < hzArr.length; i++) {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                if (x + y == hzArr[i]) {
                    newArr.push(x + "" + y);
                }
            }
        }
    }
    var zhushu = newArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();

    var shu = getFlagArrs(checkArr, 2).length;
    return zhushu * shu;
}

//注数-组选复式
function zhushu_rx2zuxfs(){
    var zuArr = [];
    var tempArr = [];
    $.each($(".zuxfsStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuArr.push($.trim($(this).html()));
    });
    var zuLength = zuArr.length;

    if (zuLength < 2) {
        return;
    }

    for (var i = 0; i < zuArr.length; i++) {
        for (var i1 = 0; i1 < zuArr.length; i1++) {
            if (zuArr[i] != zuArr[i1]) {
                var arr = [];
                arr.push(zuArr[i]);
                arr.push(zuArr[i1]);
                arr.sort();
                tempArr.push(arr.join(""));
            }
        }
    }

    tempArr = tempArr.uniqueArr();
    var zhushu = tempArr.length;

    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 2).length;
    return zhushu * shu;
}

//注数-组选和值
function zhushu_rx2zuxhz(){
    var hzArr = [];
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });
    if (hzArr.length <= 0) {
        return 0;
    }
    var newArr = [];
    for (var i = 0; i < hzArr.length; i++) {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                if ((x + y) == hzArr[i] && x != y) {
                    var arr = [];
                    arr.push(x);
                    arr.push(y);
                    arr.sort();
                    newArr.push(arr.join(""));
                }
            }
        }
    }
    newArr = newArr.uniqueArr();
    var zhushu = newArr.length;

    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 2).length;
    return zhushu * shu;
}


//*************** 注数-任选三****************

//注数-直选复式
function zhushu_rx3zxfs() {
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        geArr.push($.trim($(this).html()));
    });

    var numArr = [];
    var indexArr = [wanArr, qianArr, baiArr, shiArr, geArr];

    if (wanArr.length > 0) {
        numArr.push(0);
    }
    if (qianArr.length > 0) {
        numArr.push(1);
    }
    if (baiArr.length > 0) {
        numArr.push(2);
    }
    if (shiArr.length > 0) {
        numArr.push(3);
    }
    if (geArr.length > 0) {
        numArr.push(4);
    }

    if (numArr.length < 3) {
        return 0;
    }

    var tmpArr = getFlagArrs(numArr, 3);
    var result = 0;
    $.each(tmpArr, function (index, value) {
        var tmpResult = 0;
        var tmpIndexArr = value.split(" ");
        $.each(tmpIndexArr, function (index2, value2) {
            tmpResult = tmpResult == 0 ? 1 : tmpResult;
            tmpResult *= indexArr[parseInt(value2)].length;

        });
        result += tmpResult;
    });
    return result;
}

//注数-直选和值
function zhushu_rx3zxhz(){
    var hzArr = [];
    $.each($(".zxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });
    if (hzArr.length <= 0) {
        return 0;
    }
    var newArr = [];
    for (var i = 0; i < hzArr.length; i++) {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                for (var y1 = 0; y1 < 10; y1++) {
                    if (x + y + y1 == hzArr[i]) {
                        newArr.push(x + "" + y + "" + y1);
                    }
                }
            }
        }
    }
    var zhushu = newArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 3).length;
    return zhushu * shu;
}

//注数-组三复式
function zhushu_rx3z3fs(){
    var zuArr = [];
    $.each($(".zu3fStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        zuArr.push($.trim($(this).html()));
    });
    var tempArr = [];
    for (var i = 0; i < zuArr.length; i++) {
        for (var i1 = 0; i1 < zuArr.length; i1++) {
            if (zuArr[i] != zuArr[i1]) {
                tempArr.push(zuArr[i] + "" + zuArr[i1]);
            }
        }

    }

    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 3).length;
    return tempArr.length * shu;
}

//注数-组六复式
function zhushu_rx3z6fs(){
    var fuShiArr = [], newArr = [];
    $.each($(".zu6fStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });
    var zlLength = fuShiArr.length;
    if (zlLength < 3) {
        return 0;
    }

    newArr = getZuLiuNewArrs(fuShiArr);
    var zhushu = newArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 3).length;
    return zhushu * shu;
}

//注数-组选和值
function zhushu_rx3zuxhz(){
    var hzArr = [];
    $.each($(".zuxhzStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        hzArr.push($.trim($(this).html()));
    });

    if (hzArr.length <= 0) {
        return 0;
    }

    var newArr = [];
    for (var i = 0; i < hzArr.length; i++) {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                for (var y1 = 0; y1 < 10; y1++) {
                    if (x + y + y1 == hzArr[i] && !(x == y && x == y1 && y == y1)) {
                        var arr = [];
                        arr.push(x);
                        arr.push(y);
                        arr.push(y1);
                        arr.sort();
                        newArr.push(arr.join(""));
                    }
                }
            }
        }
    }

    newArr = newArr.uniqueArr();
    var zhushu = newArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 3).length;
    return zhushu * shu;
}



//*************** 任选四 **************

//注数-直选复式
function zhushu_rx4zxfs(){
    var wanArr = [], qianArr = [], baiArr = [], shiArr = [], geArr = [], newArr = [];
    $.each($(".wanStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        wanArr.push($.trim($(this).html()));
    });
    $.each($(".qianStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        qianArr.push($.trim($(this).html()));
    });
    $.each($(".baiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        baiArr.push($.trim($(this).html()));
    });
    $.each($(".shiStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        shiArr.push($.trim($(this).html()));
    });
    $.each($(".geStr .wan_bottom .cus-flex-item span.active_gfwf"), function () {
        geArr.push($.trim($(this).html()));
    });
    var numArr = [];
    var indexArr = [wanArr, qianArr, baiArr, shiArr, geArr];

    if (wanArr.length > 0) {
        numArr.push(0);
    }
    if (qianArr.length > 0) {
        numArr.push(1);
    }
    if (baiArr.length > 0) {
        numArr.push(2);
    }
    if (shiArr.length > 0) {
        numArr.push(3);
    }
    if (geArr.length > 0) {
        numArr.push(4);
    }

    if (numArr.length < 4) {
        return 0;
    }

    var tmpArr = getFlagArrs(numArr, 4);
    var result = 0;
    $.each(tmpArr, function (index, value) {
        var tmpResult = 0;
        var tmpIndexArr = value.split(" ");
        $.each(tmpIndexArr, function (index2, value2) {
            tmpResult = tmpResult == 0 ? 1 : tmpResult;
            tmpResult *= indexArr[parseInt(value2)].length;

        });
        result += tmpResult;
    });
    return result;
}

//注数-组选24
function zhushu_rx4zu24(){
    var fuShiArr = [], newArr = [];
    $.each($(".zu24Str .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        fuShiArr.push($.trim($(this).html()));
    });
    var zlLength = fuShiArr.length;
    if (zlLength < 4) {
        return 0;
    }

    for (var n1 = 0; n1 < fuShiArr.length; n1++) {
        for (var n2 = 0; n2 < fuShiArr.length; n2++) {
            for (var n3 = 0; n3 < fuShiArr.length; n3++) {
                for (var n4 = 0; n4 < fuShiArr.length; n4++) {
                    if (fuShiArr[n1] != fuShiArr[n2] && fuShiArr[n1] != fuShiArr[n3] && fuShiArr[n1] != fuShiArr[n4] && fuShiArr[n2] != fuShiArr[n3] && fuShiArr[n2] != fuShiArr[n4] && fuShiArr[n3] != fuShiArr[n4]) {
                        var arr = [];
                        arr.push(fuShiArr[n1]);
                        arr.push(fuShiArr[n2]);
                        arr.push(fuShiArr[n3]);
                        arr.push(fuShiArr[n4]);
                        arr.sort();
                        newArr.push(arr.join(""));
                    }
                }
            }
        }
    }
    newArr = newArr.uniqueArr();
    var zhushu = newArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 4).length;
    return zhushu * shu;
}

//注数-组选12
function zhushu_rx4zu12(){
    var erChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
    $.each($(".zu12chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        erChongHaoArr.push($.trim($(this).html()));
    });
    $.each($(".zu12dhStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        danHaoArr.push($.trim($(this).html()));
    });

    if (danHaoArr.length < 2 && erChongHaoArr.length < 1) {
        return;
    }
    //单号两两组合一共有若干对
    for (var d = 0; d < danHaoArr.length; d++) {
        for (var n = 0; n < danHaoArr.length; n++) {
            if (danHaoArr[d] != danHaoArr[n]) {
                var arr = [];
                arr.push(danHaoArr[d]);
                arr.push(danHaoArr[n]);
                arr.sort();
                tempArr.push(arr.join(""));
            }
        }
    }
    tempArr = tempArr.uniqueArr();

    for (var i = 0; i < erChongHaoArr.length; i++) {
        for (var m = 0; m < tempArr.length; m++) {
            var onestr = (tempArr[m].toString()).substr(0, 1);
            var twostr = (tempArr[m].toString()).substr(1, 1);
            if (parseInt(onestr) != erChongHaoArr[i] && parseInt(twostr) != erChongHaoArr[i]) {
                var arr = [];
                arr.push(onestr);
                arr.push(twostr);
                arr.sort();
                nowArr.push(erChongHaoArr[i] + "" + arr.join(""));
            }
        }
    }
    nowArr = nowArr.uniqueArr();
    var zhushu = nowArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 4).length;
    return zhushu * shu;
}

//注数-组选6
function zhushu_rx4zu6(){
    var erChongHaoArr = [], tempArr = [], nowArr = [];
    $.each($(".zu6chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        erChongHaoArr.push($.trim($(this).html()));
    });
    if (erChongHaoArr.length < 2) {
        return;
    }
    for (var d = 0; d < erChongHaoArr.length; d++) {
        for (var n = 0; n < erChongHaoArr.length; n++) {
            if (erChongHaoArr[d] != erChongHaoArr[n]) {
                var arr = [];
                arr.push(erChongHaoArr[d]);
                arr.push(erChongHaoArr[n]);
                arr.sort();
                tempArr.push(arr.join(""));
            }
        }
    }
    tempArr = tempArr.uniqueArr();
    var zhushu = tempArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 4).length;
    return zhushu * shu;
}

//注数-组选4
function zhushu_rx4zu4(){
    var sanChongHaoArr = [], danHaoArr = [], tempArr = [], nowArr = [];
    $.each($(".zu4chStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        sanChongHaoArr.push($.trim($(this).html()));
    });
    $.each($(".zu4dhStr .wan_bottom .cus-flex-item span.active_gfwf"), function (index, value) {
        danHaoArr.push($.trim($(this).html()));
    });
    for (var d = 0; d < sanChongHaoArr.length; d++) {
        for (var n = 0; n < danHaoArr.length; n++) {
            if (sanChongHaoArr[d] != danHaoArr[n]) {
                tempArr.push(sanChongHaoArr[d] + "" + danHaoArr[n]);
            }
        }
    }
    if (tempArr.length < 1) {
        return 0;
    }
    var zhushu = tempArr.length;
    // 选取选中checkbox
    var checkArr = getCheckboxValue();
    var shu = getFlagArrs(checkArr, 4).length;
    return zhushu * shu;
}


// 数字批量选择算法
function selectFun_1(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");  //初始化选择的特效，清零
    $(obj).parent().find(".xz i").removeClass("activeBtn");                                     //始化选择的特效，清零
    $(obj).addClass("activeBtn");
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").addClass("active_gfwf");
    getGfwfZhushu(); //获取注数方法
    statusChange();
}

function selectFun_2(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");

    var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var Barr = [, , , , , 5, 6, 7, 8, 9];
    for (var i = 0; i <= Aarr.length; ++i) {
        if (Aarr[i] == Barr[i]) {
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + i).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

function selectFun_3(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");

    var Aarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var Barr = [0, 1, 2, 3, 4, , , , ,];
    for (var i = 0; i <= Aarr.length; ++i) {
        if (Aarr[i] == Barr[i]) {
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + i).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

function selectFun_4(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");
    for (var i = 0; i < 12; i++) {
        if (i%2 != 0) {   //奇数
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + i).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

function selectFun_5(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");
    for (var i = 0; i <= 10; ++i) {
        if (i%2 == 0) {   //偶数
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + i).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

function selectFun_6(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");
    getGfwfZhushu();
    statusChange();
}


function selectFun_str2(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");

    var Aarr = [, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var Barr = [, , , , , , 6, 7, 8, 9, 10, 11];
    for (var i = 0; i < Aarr.length; ++i) {
        if (Aarr[i] == Barr[i]) {
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + i).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

function selectFun_str3(obj) {
    $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item .xz").removeClass("active_gfwf");
    $(obj).parent().find(".xz i").removeClass("activeBtn");
    $(obj).addClass("activeBtn");

    var Aarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var Barr = [1, 2, 3, 4, 5, , , , ,];
    for (var i = 0; i < Aarr.length; ++i) {

        if (Aarr[i] == Barr[i]) {
            $(obj).parent().parent().parent().find(".cus_common .wan_bottom .cus-flex-item").find(".n" + (i + 1)).addClass("active_gfwf");
        }
    }
    getGfwfZhushu();
    statusChange();
}

/**
 * 获取当前赔率随机算法
 */
function getPlayPlFun_suiji() {
    return $(".gfwf_xz .wx-select a.selected").attr("data-fun_suiji");
}

/**
 * 获取当前赔率注数算法
 */
function getPlayPlFun_zhushu() {
    return $(".gfwf_xz .wx-select a.selected").attr("data-fun_zhushu");
}

/**
 * 获取当前赔率内容算法
 */
function getPlayPlFun_content() {
    return $(".gfwf_xz .wx-select a.selected").attr("data-fun_content");
}

/**
 * 获取当前赔率随机算法
 */
function getPlayPlFun_random() {
    return $(".gfwf_xz .wx-select a.selected").attr("data-fun_random");
}

/**
 * 获取当前赔率ID
 */
function getPlayPlId() {
    var arrTemp = null;
    var plSelName = '',  //赔率名称
        plSelIndex = 0;  //获取赔率索引

    if ($.inArray(parseInt(getPlayId()), [515, 534, 936, 914, 639, 625, 1013, 991, 730, 708, 859, 837]) >= 0) {
        var l = $('.tshStr .wan_bottom .cus-flex-item span.active_gfwf').length;
        if (l == 1) {
            $('.tshStr .wan_bottom .cus-flex-item').each(function () {
                plSelName = $(this).parent().find(' span.active_gfwf').html();
            });
            if (plSelName == '豹子') {
                plSelIndex = 0;
            } else if (plSelName == '顺子') {
                plSelIndex = 1;
            } else if (plSelName == '对子') {
                plSelIndex = 2;
            }
        }
    }

    var indexStr = ($(".gfwf_xz .wx-select a.selected").attr("data-play_pl_id")).toString();
    if(indexStr.indexOf("|") > 0){
        arrTemp = (indexStr.split("|"))[plSelIndex];
        // arrTemp = indexStr;
    }else {
        arrTemp = $(".gfwf_xz .wx-select a.selected").attr("data-play_pl_id");
    }
    return arrTemp;
}

/**
 * 获取当前赔率ID2
 */
function getPlayPlId2() {
    var arrTemp = null;
    var indexStr = ($(".gfwf_xz .wx-select a.selected").attr("data-play_pl_id")).toString();
    if(indexStr.indexOf("|") > 0){
        arrTemp = indexStr;
    }else {
        arrTemp = $(".gfwf_xz .wx-select a.selected").attr("data-play_pl_id");
    }
    return arrTemp;
}

/**
 * 获取当前玩法ID
 */
function getPlayId() {
    return $(".gfwf_xz .wx-select a.selected").attr("data-play_id");
}

/**
 * 获取当前期数
 */
function getNumber() {
    return $("#number").attr("data-number");
}

/**
 * 获取赔率和最高返点
 */
function getPlAndMaxFd() {
    // 全局赔率变量
    var playPlId = getPlayPlId2();   // 当前赔率ID

    if (playPlId.toString().indexOf('|') > 0) {    // 多赔率
        var result = [];
        var tmpArr = playPlId.split('|');
        $.each(tmpArr, function(index, value) {
            for (var i = 0; i < gfwfPlJson.sscPlayPlList.length; ++i) {
                var o = gfwfPlJson.sscPlayPlList[i];
                if (o.playPlId == value) {
                    result.push(o);
                }
            }
        });
        return result;
    } else {    // 单一赔率
        for (var i = 0; i < gfwfPlJson.sscPlayPlList.length; ++i) {
            var o = gfwfPlJson.sscPlayPlList[i];
            if (o.playPlId == playPlId) {
                return o;
            }
        }
    }
    return;
}

//清除注单内容提示框
// var layerBet = null;
var tmpBetContent = null;
function showBetTemplate() {


    var contentFun = getPlayPlFun_content();    // 内容算法
    var zhushuFun = getPlayPlFun_zhushu();  // 注数算法
    if (typeof contentFun == 'undefined' || typeof zhushuFun == 'undefined') {
        return;
    }

    var data = eval(contentFun + "()");
    var zhushu = eval(zhushuFun + "()");

    if(data == -1){
        return;
    }


    if (typeof data == 'undefined' || typeof zhushu == 'undefined' || zhushu <= 0) {
        Tools.toast("号码选择不完整，请重新选择");
        return;
    }

    var plAndMaxFd = getPlAndMaxFd();   // 获取当前选中的玩法赔率和返点
    var maxPlayPl;  // 最高赔率
    var maxFandian;  // 最大返点
    var minPl;  // 最低赔率
    var convertBlMoney;  // 每1%转换赔率

    var plSelName = '',  //赔率名称
        plSelIndex = 0;  //获取赔率索引

    if ($.inArray(parseInt(getPlayId()), [515, 534, 936, 914, 639, 625, 1013, 991, 730, 708, 859, 837]) >= 0) {
        var l = $('.tshStr .wan_bottom .cus-flex-item span.active_gfwf').length;
        if (l == 1) {
            $('.tshStr .wan_bottom .cus-flex-item').each(function () {
                plSelName = $(this).parent().find(' span.active_gfwf').html();
            });
            if (plSelName == '豹子') {
                plSelIndex = 0;
            } else if (plSelName == '顺子') {
                plSelIndex = 1;
            } else if (plSelName == '对子') {
                plSelIndex = 2;
            }
        }
    }

    if (plAndMaxFd instanceof Array) {  // 多赔率
        maxPlayPl = plAndMaxFd[plSelIndex].playPl;  // 最高赔率
        maxFandian = plAndMaxFd[plSelIndex].maxFdBl;    // 最大返点
        minPl = plAndMaxFd[plSelIndex].minPl;   // 最低赔率
    } else {
        maxPlayPl = plAndMaxFd.playPl;  // 最高赔率
        maxFandian = plAndMaxFd.maxFdBl;    // 最大返点
        minPl = plAndMaxFd.minPl;   // 最低赔率
    }
    convertBlMoney = (maxPlayPl - minPl) / maxFandian;  // 每1%转换赔率

    // 投注内容
    tmpBetContent = data;

    var firstShowPl = maxPlayPl.toFixed(3);
    // 渲染界面中赔率部分
    if (plAndMaxFd instanceof Array) {  // 多赔率
        var strArr = [];
        $.each(plAndMaxFd, function(index, value) {
            strArr.push(value.playPl.toFixed(3));
        });
        firstShowPl = strArr.join('|');
    }

    var bet_template = template('template_betTemplate', {
        defaultPlayPl: maxPlayPl.toFixed(3),
        playPlShow: firstShowPl,
        playGroupId: playGroupId,
        number: getNumber(),
        playId: getPlayId(),
        playPlId: getPlayPlId(),
        zhushu: zhushu,
        betContent: data,
        // betMode: 1,
        totalMoney: parseFloat((2 * zhushu * 1).toFixed(3)), // 默认2元 * 1倍 * 注数
        canWin: parseFloat((2 * maxPlayPl * 1).toFixed(3))  // 默认2元 * 1倍 * 赔率
    });
    layer.closeAll();
    //页面层
    layerBet = layer.open({
        type: 1,
        skin: 'gfwf',
        title: false,
        closeBtn: 0,
        content: bet_template
    });

    // 滑块事件绑定
    $("#playPlRange").RangeSlider({
        min: 0,
        max: maxFandian,
        step: 0.1,
        leftColor: '#fa6200',
        onChange: function(obj) {
            // 返点比例
            var fandianBili = parseFloat($(obj).val()).toFixed(1); // 当前滚动条移动的比例
            $("#betContent_fanli").attr("data-value", fandianBili);
            $("#betContent_fanli").html(fandianBili + "%");    // 渲染界面中百分比部分

            // 赔率 = 最大配率 - 返点比例 * 转换比例
            var pl = (maxPlayPl - fandianBili * convertBlMoney).toFixed(3);
            $("#betContent_playPl").attr("data-value", pl);

            // 渲染界面中赔率部分
            if (plAndMaxFd instanceof Array) {  // 多赔率
                var strArr = [];
                $.each(plAndMaxFd, function(index, value) {
                    var tmpConvertBlMoney = (value.playPl - value.minPl) / value.maxFdBl;
                    strArr.push((value.playPl - fandianBili * tmpConvertBlMoney).toFixed(3));
                });
                $("#betContent_playPl").html(strArr.join('|'));
            } else {
                $("#betContent_playPl").html(pl);
            }

            // 渲染下注总额，奖金等等
            renderZhushu();
        }
    });

    // 取消事件绑定
    $("#no-btn").click(function() {
        layer.closeAll();
    });

    // 确认事件绑定
    $("#yes-btn").click(function() {
        // 注单
        var betForm = {
            totalMoney: 0,
            totalZhushu: 0,
            sscBetList: []
        };
        // 手机版只有选择一单
        betForm.sscBetList.push({
            playGroupId: $(this).attr("data-bet_play_group_id"),
            number: $(this).attr("data-bet_number"),
            playId: $(this).attr("data-bet_play_id"),
            playPlId: $(this).attr("data-bet_play_pl_id"),
            zhushu: $(this).attr("data-zhushu"),
            // content: $(this).attr("data-bet_content"),
            content: tmpBetContent,
            perMoney: $("#betContent_inputMoney").val(),
            playPl: $("#betContent_playPl").attr("data-value"),
            beishu: $("#betContent_inputBeishu").val(),
            totalMoney: parseFloat($("#betContent_totalMoney").html()),
            type: 2,
            // mode: $(this).attr("data-bet_mode"),
            mode: $(".mode_select.selected").attr("data-value"),
            fandian: $("#betContent_fanli").attr("data-value")
        });
        betForm.totalMoney += betForm.sscBetList[0].totalMoney;
        betForm.totalZhushu += parseInt(betForm.sscBetList[0].zhushu);

        betForm = JSON.stringify(betForm);
        ajaxRequest({
            url: CONFIG.BASEURL + "ssc/ajaxBet.json",
            data: {
                betForm: betForm
            },
            beforeSend: function() {
                layer.closeAll();
                Tools.showLoading("加载中...");
            },
            success: function(json) {
                Tools.hideLoading();
                if (json.result == 1) {
                    // 清空临时变量
                    tmpBetContent = null;
                    Tools.toast("下注成功");
                    clearSelected();
                } else {
                    Tools.toast("下注失败：" + json.description);
                }
            },
            complete: function() {
            }
        });
    });

    // 单注金额变化
    $("#betContent_inputMoney").keyup(function() {
        // 渲染下注总额，奖金等等
        renderZhushu();
    });

    // 倍数变化
    $("#betContent_inputBeishu").keyup(function() {
        // 渲染下注总额，奖金等等
        renderZhushu();
    });

    // 渲染下注总额，奖金等等
    function renderZhushu() {
        var money = $("#betContent_inputMoney").val();
        var beishu = $("#betContent_inputBeishu").val();
        var zhushu = parseInt($("#betContent_zhushu").html());
        var playPl = parseFloat($("#betContent_playPl").attr("data-value"));
        var mode = parseInt($(".mode_select.selected").attr("data-value"));
        var tmpMode = 1;
        if (mode == 1) {
            tmpMode = 1;
        } else if (mode == 2) {
            tmpMode = 0.1;
        } else if (mode == 3) {
            tmpMode = 0.01;
        } else {
            return;
        }

        var totalMoney = parseFloat((money * zhushu * beishu * tmpMode).toFixed(3));  // 总金额
        var canWin = parseFloat(money * beishu * playPl * tmpMode);  // 可获奖金

        $("#betContent_totalMoney").html(totalMoney.toFixed(3));
        $("#betContent_canWin").html(canWin.toFixed(3));
    }

    $("#ischange").change(function() {
        alert("checked");
    });

    // 模式选择
    $(".mode_select").click(function() {
        $(".mode_select.selected").removeClass("selected");
        $(this).addClass("selected");

        // 渲染下注总额，奖金等等
        renderZhushu();
    });

    // 加号
    $(".dzje_add").click(function() {
        $("#betContent_inputMoney").val(parseInt($("#betContent_inputMoney").val()) + 1);

        // 渲染下注总额，奖金等等
        renderZhushu();
    });
    $(".beishu_add").click(function() {
        $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) + 1);
        // 渲染下注总额，奖金等等
        renderZhushu();
    });
    $(".beishu_remove").click(function() {
        var num = parseInt($("#betContent_inputBeishu").val()) - 1;
        if(num <= 0){
            return;
        }
        $("#betContent_inputBeishu").val(parseInt($("#betContent_inputBeishu").val()) - 1);
        // 渲染下注总额，奖金等等
        renderZhushu();
    });
}

// 清除所有选择
function clearSelected() {
    $(".active_gfwf").removeClass("active_gfwf");
    $(".active_gfwf_blue").removeClass("active_gfwf_blue");
    $("#zhushu").html(0);
    $("#nowMoney").html(0);
    // 选择按钮
    $(".xz i.activeBtn").removeClass('activeBtn');

    // 机选
    $("#btn-jixuan-gfwf").show();
    $("#btn-reset-gfwf").hide();

    initArrSum();
}

// //*****************mobile注数算法******************
// //获取任二位置方案
// function getRx2WeiFn(checkLen) {
//     var shu = 0;
//     if(checkLen == 2){
//         shu = 1
//     } else if(checkLen == 3){
//         shu = 3
//     } else if(checkLen == 4){
//         shu = 6
//     } else if(checkLen == 5){
//         shu = 10
//     }
//
//     return shu;
// }

// 获取万、千、百、十、个，固定位数的个数所组成5位所有组合
function getNewArrs(wanA, qianA, baiA, shiA, geA) {
    var wArr = [], qArr = [], bArr = [], sArr = [], gArr = [];
    wArr = wanA;
    qArr = qianA;
    bArr = baiA;
    sArr = shiA;
    gArr = geA;
    var tempArr = [];
    for (var w = 0; w < wArr.length; w++) {
        for (var q = 0; q < qArr.length; q++) {
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(wArr[w] + "" + qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                    }
                }
            }
        }
    }
    return tempArr;
}

// 获取千、百、十、个固定位数的个数所组成4位所有组合
function getFourNewArrs(qianA, baiA, shiA, geA) {
    var qArr = [], bArr = [], sArr = [], gArr = [];
    qArr = qianA;
    bArr = baiA;
    sArr = shiA;
    gArr = geA;
    var tempArr = [];
    for (var q = 0; q < qArr.length; q++) {
        for (var b = 0; b < bArr.length; b++) {
            for (var s = 0; s < sArr.length; s++) {
                for (var g = 0; g < gArr.length; g++) {
                    tempArr.push(qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                }
            }
        }
    }
    return tempArr;
}

// 获取百、十、个固定位数的个数所组成(后三直选--后三组合)
function getHszhNewArrs(baiA, shiA, geA) {
    var bArr = [], sArr = [], gArr = [];
    bArr = baiA;
    sArr = shiA;
    gArr = geA;
    var tempArr = [];
    for (var b = 0; b < bArr.length; b++) {
        for (var s = 0; s < sArr.length; s++) {
            for (var g = 0; g < gArr.length; g++) {
                tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                tempArr.push(sArr[s] + "" + gArr[g]);
                tempArr.push(gArr[g]);
            }
        }
    }
    return tempArr;
}

// 获取百、十、个固定位数的个数所组成3位所有组合
function getThreeNewArrs(baiA, shiA, geA) {
    var bArr = [], sArr = [], gArr = [];
    bArr = baiA;
    sArr = shiA;
    gArr = geA;
    var tempArr = [];
    for (var b = 0; b < bArr.length; b++) {
        for (var s = 0; s < sArr.length; s++) {
            for (var g = 0; g < gArr.length; g++) {
                tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
            }
        }
    }
    return tempArr;
}

// 获取百、十、个固定位数的个数所组成3位所有组合-11选5
function getThreeNewArrs11x5(arr1, arr2, arr3) {
    var index1arr = [], index2arr = [], index3arr = [];
    index1arr = arr1;
    index2arr = arr2;
    index3arr = arr3;
    var tempArr = [];
    for (var b = 0; b < index1arr.length; b++) {
        for (var s = 0; s < index2arr.length; s++) {
            for (var g = 0; g < index3arr.length; g++) {
                if(index1arr[b] != index2arr[s] && index1arr[b] != index3arr[g] && index2arr[s] != index3arr[g]){
                    tempArr.push(index1arr[b] + "" + index2arr[s] + "" + index3arr[g]);
                }
            }
        }
    }
    return tempArr;
}


// 后三直选--获取所选号码分散为三位所有组合的和值
function getHezNewArrs(hZArr) {
    var heZhiArr = [], shuArr = [], tempArr = [];
    var sumTemp = 0;
    var num = 0; //当前号码
    var fjHaoZuhe = []; //分解号组合

    heZhiArr = hZArr;

    //号码分解---所选号分解成所有组合的值等于此号的所有组合
    for (var i = 0; i < heZhiArr.length; i++) {
        var temp = [];
        sumTemp = parseInt(heZhiArr[i]);
        num = parseInt(heZhiArr[i]);
        while (sumTemp >= 0) {
            temp.push(sumTemp);
            sumTemp--;
        }

        //所选号码分解至零，被分解出所有的号码三个为一组，所组成的所有组合的每一组值等于所选号的值的组合数
        for (var n = 0; n < temp.length; n++) {
            for(var m = 0; m < temp.length; m++){
                for(var mn = 0; mn < temp.length; mn++){
                    if(temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9){
                        fjHaoZuhe.push(temp[n] + "" + temp[m] + "" + temp[mn]);
                    }
                }
            }
        }
        tempArr = fjHaoZuhe.uniqueArr();
    }
    return tempArr;
}


// 前三和后三直选-跨度所选跨度值所有组合
function getKaduNewArrs(kDArr) {
    var kaDuArr = [], tempArr1 = [], tempArr2 = [], tempArr3 = [];
    var allArr = [];
    for (var t = 0; t < 10; t++) {
        tempArr1[t] = t;
        tempArr2[t] = t;
        tempArr3[t] = t;
    }
    var maxZhi = 0, minZhi = 0, tempZhi = 0;
    kaDuArr = kDArr;
    for (var i = 0; i < kaDuArr.length; i++) {
        tempZhi = parseInt(kaDuArr[i]);
        for (var n = 0; n < tempArr1.length; n++) {
            for (var n1 = 0; n1 < tempArr2.length; n1++) {
                for (var n2 = 0; n2 < tempArr3.length; n2++) {
                    maxZhi = tempArr1[n] > tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                    maxZhi= maxZhi > tempArr3[n2] ? maxZhi :tempArr3[n2];
                    minZhi = tempArr1[n] < tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                    minZhi= minZhi < tempArr3[n2] ? minZhi :tempArr3[n2];
                    if ((maxZhi - minZhi) == tempZhi) {
                        allArr.push(n + "" + n1 + "" + n2);
                        maxZhi = 0;
                        minZhi = 0;
                    }
                }
            }
        }
    }
    return allArr;
}

// 后三组选-组三复式
function getZuXuanNewArrs(zuXuanArr) {
    var tempArr = [],zxArr = [];
    zxArr = zuXuanArr;

    for(var i = 0; i < zxArr.length - 1; i++){
        for(var i1 = 1; i1 < zxArr.length; i1++){
            if(zxArr[i1] != zxArr[i]){
                tempArr.push(zxArr[i] + "" + zxArr[i1] + "" + zxArr[i1]);
                tempArr.push(zxArr[i1] + "" + zxArr[i] + "" + zxArr[i]);
            }
        }
    }
    tempArr = tempArr.uniqueArr();
    return tempArr;
}

// 后三组选-组六复式
function getZuLiuNewArrs(zuXuanArr) {
    var tempArr = [], zxArr = [];
    zxArr = zuXuanArr;
    for (var i = 0; i < zxArr.length; i++) {
        for (var i1 = 0; i1 < zxArr.length; i1++) {
            for (var i2 = 0; i2 < zxArr.length; i2++) {
                if (zxArr[i] != zxArr[i1] && zxArr[i1] != zxArr[i2] && zxArr[i] != zxArr[i2]) {
                    var sortArr = [];
                    sortArr.push(zxArr[i]);
                    sortArr.push(zxArr[i1]);
                    sortArr.push(zxArr[i2]);
                    sortArr.sort();
                    tempArr.push(sortArr.join(""));
                }
            }
        }
    }
    tempArr = tempArr.uniqueArr();
    return tempArr;
}

// 后三组选-组选和值
function getZxhzNewArrs(zuXuanArr) {
    var heZhiArr = [], tempArr = [];
    var sumTemp = 0;
    var num = 0; //当前号码
    var fjHaoZuhe = []; //分解号组合

    heZhiArr = zuXuanArr;
    //号码分解---所选号分解成所有组合的值等于此号的所有组合
    for (var i = 0; i < heZhiArr.length; i++) {
        var temp = [];
        sumTemp = parseInt(heZhiArr[i]);
        num = parseInt(heZhiArr[i]);
        while (sumTemp >= 0) {
            temp.push(sumTemp);
            sumTemp--;
        }

        //获取所选号的组选三和组选六形态的所有组数（不包含豹子号、顺序不限）
        for (var n = 0; n < temp.length; n++) {
            for(var m = 0; m < temp.length; m++){
                for(var mn = 0; mn < temp.length; mn++){
                    if(temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9){
                        if(temp[m] != temp[n] && temp[n] != temp[mn] && temp[mn] != temp[n]){
                            var sortArr = [];
                            sortArr.push(temp[n]);
                            sortArr.push(temp[m]);
                            sortArr.push(temp[mn]);
                            sortArr.sort();
                            fjHaoZuhe.push(sortArr.join(""));

                        }
                    }
                }
            }
        }

    }
    tempArr = fjHaoZuhe.uniqueArr();
    return tempArr;
}

// 后三组选-组选包胆
function getZxbdNewArrs(zuXuanArr) {
    var tempArr = [], bdArr = [];
    bdArr = zuXuanArr;
    for(var n = 0; n < bdArr.length; n++) {
        for(var n1 = 0; n1 < 10; n1++){
            for(var n2 = 0; n2 < 10; n2++){
                if(bdArr[n] != n1 && bdArr != n2 && n1 != n2 || n1 == n2 && bdArr[n] != n2 || n2 == bdArr[n] && bdArr[n] != n1 || n1 == bdArr[n] && bdArr[n] != n2){
                    var sortArr = [];
                    sortArr.push(bdArr[n]);
                    sortArr.push(n1);
                    sortArr.push(n2);
                    sortArr.sort();
                    tempArr.push(sortArr.join(""));
                }
            }
        }
    }

    tempArr =tempArr.uniqueArr();
    return tempArr;
}

//**************** 前三 ****************



function gfwf_4xfs(
    qianArr,
    baiArr,
    shiArr,
    geArr
) {
    var tmpStr_1 = qianArr.join(",");
    var tmpStr_2 = baiArr.join(",");
    var tmpStr_3 = shiArr.join(",");
    var tmpStr_4 = geArr.join(",");

    return "{0}|{1}|{2}|{3}".format(
        tmpStr_1,
        tmpStr_2,
        tmpStr_3,
        tmpStr_4
    );
}

function gfwf_3xfs(
    baiArr,
    shiArr,
    geArr
) {
    var tmpStr_1 = baiArr.join(",");
    var tmpStr_2 = shiArr.join(",");
    var tmpStr_3 = geArr.join(",");

    return "{0}|{1}|{2}".format(
        tmpStr_1,
        tmpStr_2,
        tmpStr_3
    );
}

function gfwf_2xfs(
    shiArr,
    geArr
) {
    var tmpStr_1 = shiArr.join(",");
    var tmpStr_2 = geArr.join(",");
    return "{0}|{1}".format(
        tmpStr_1,
        tmpStr_2
    );
}

/**
 * 初始化滚动条
 * @param cfg
 */
$.fn.RangeSlider = function(cfg) {
    var min = cfg.min;    // 最小值
    var max = cfg.max;    // 最大值
    var step = cfg.step;    // 每步
    var width = cfg.width ? cfg.width : '100%';  // 容器长度
    // var orientation = cfg.orientation ? cfg.orientation : 'vertical';
    var leftColor = cfg.leftColor ? cfg.leftColor : "#fa6200";
    // var rightColor = cfg.rightColor ? cfg.rightColor : "#fa6200";

    $(this).attr("min", min).attr("max", max).attr("step", step).attr("step", step).attr("value", 0);
    $(this).css({
        width: width
    });

    var callback = cfg.onChange;

    $(this).bind("input", function(e){
        $(this).attr('value', this.value);
        var bfb = (this.value - min) / max * 100;
        $(this).css( 'background', 'linear-gradient(to right, ' + leftColor + ' 0%, ' + leftColor + ' ' + bfb + '%,#fff ' + bfb + '%, #fff)' );

        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};


// 字符串格式化函数
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

//去掉数组重复
Array.prototype.uniqueArr = function () {
    var temp = new Array();
    this.sort();
    for(i = 0; i < this.length; i++) {
        if( this[i] == this[i+1]) {
            continue;
        }
        temp[temp.length]=this[i];
    }
    return temp;
}

//======================================================随机算法====================================

/********************************************双色球***********************************************/
function random_hlzx(){
    var weiArr = [];

    while(weiArr.length < 5){
        var random_x = parseInt(Math.random() * 33);
        weiArr.push(random_x);
        weiArr = weiArr.uniqueArr(); //去除重复
    }

    $.each(weiArr, function (index, value) {
        $(".wanweiStr .wan_bottom .xz").eq(value).removeClass("active_gfwf").addClass("active_gfwf");
    });

    var x = parseInt(Math.random() * 16);  //蓝码
    $(".qianweiStr .wan_bottom .xz").eq(x).removeClass("active_gfwf_blue").addClass("active_gfwf_blue");

}

/********************************************11选5***********************************************/
/**
 * 随机算法-任选8中8胆拖
 */
function random_rx8z5dt() {
    getRandomErWeiNums(8);
}

/**
 * 随机算法-任选7中7胆拖
 */
function random_rx7z5dt() {
    getRandomErWeiNums(7);
}

/**
 * 随机算法-任选6中6胆拖
 */
function random_rx6z5dt() {
    getRandomErWeiNums(6);
}

/**
 * 随机算法-任选5中5胆拖
 */
function random_rx5z5dt() {
    getRandomErWeiNums(5);
}

/**
 * 随机算法-任选4中4胆拖
 */
function random_rx4z4dt() {
    getRandomErWeiNums(4);
}

/**
 * 随机算法-任选3中3胆拖
 */
function random_rx3z3dt() {
    getRandomErWeiNums(3);
}

/**
 * 随机算法-任选2中2胆拖
 */
function random_rx2z2dt() {
    getRandomErWeiNums(2);
}

/**
 * 随机算法-任选七中五
 */
function random_rx8z5() {
    getRandomTongWeiNums(8);
}

/**
 * 随机算法-任选七中五
 */
function random_rx7z5() {
    getRandomTongWeiNums(7);
}

/**
 * 随机算法-任选六中五
 */
function random_rx6z5() {
    getRandomTongWeiNums(6);
}

/**
 * 随机算法-任选五中五
 */
function random_rx5z5() {
    getRandomTongWeiNums(5);
}

/**
 * 随机算法-任选四中四
 */
function random_rx4z4() {
    getRandomTongWeiNums(4);
}

/**
 * 随机算法-任选三中三
 */
function random_rx3z3() {
    getRandomSwZxCommon();
}

/**
 * 随机算法-任选二中二
 */
function random_rx2z2() {
    getRandomQ2ZuxCommon();
}

/**
 * 随机算法-任选一中一
 */
function random_rx1z1() {
    var random_1 = parseInt(Math.random() * 11);
    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf")
}

/**
 * 随机算法-定位胆
 */
function random_dwd_11x5() {
    var random_1 = parseInt(Math.random() * 11);
    var wei = parseInt(Math.random() * 5);

    if(wei == 0){
        $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 1){
        $(".qianweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 2){
        $(".baiweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 3){
        $(".shiweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 4){
        $(".geweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    }
}

/**
 * 随机算法-11选5-后三位
 */
function random_h3w () {
    getRandom3weiCommon();
}

/**
 * 随机算法-11选5-中三位
 */
function random_z3w () {
    getRandom3weiCommon();
}

/**
 * 随机算法-11选5-前三位
 */
function random_q3w () {
    getRandom3weiCommon();
}

/**
 * 随机算法-11选5-前二组选复式
 */
function random_q2zuxtd () {
    getRandomQ2ZuxTdCommon();
}

/**
 * 随机算法-11选5-后二组选复式
 */
function random_h2zuxtd () {
    getRandomQ2ZuxTdCommon();
}

/**
 * 随机算法-11选5-后二组选复式
 */
function random_h2zuxfs11x5() {
    getRandomQ2ZuxCommon();
}

/**
 * 随机算法-11选5-前二组选复式
 */
function random_q2zuxfs11x5() {
    getRandomQ2ZuxCommon();
}

/**
 * 随机算法-11选5-后二直选复式
 */
function random_h2zxfs11x5() {
    getRandomQ2ZxCommon();
}

/**
 * 随机算法-11选5-前二直选复式
 */
function random_q2zxfs11x5() {
    getRandomQ2ZxCommon();
}

/**
 * 随机算法-11选5-后三组选胆拖
 */
function random_h3zuxtd() {
    getRandomSwZxTdCommon();
}

/**
 * 随机算法-11选5-中三组选胆拖
 */
function random_z3zuxtd() {
    getRandomSwZxTdCommon();
}

/**
 * 随机算法-11选5-前三组选胆拖
 */
function random_q3zuxtd() {
    getRandomSwZxTdCommon();
}

/**
 * 随机算法-11选5-后三组选随机
 */
function random_h3zuxfs() {
    getRandomSwZxCommon();
}

/**
 * 随机算法-11选5-中三组选随机
 */
function random_z3zuxfs() {
    getRandomSwZxCommon();
}

/**
 * 随机算法-11选5-前三组选随机
 */
function random_q3zuxfs() {
    getRandomSwZxCommon();
}

/**
 * 随机算法-11选5-后三直选复式
 */
function random_h3zxfs_11x5() {
    getRandomSwCommon();
}

/**
 * 随机算法-11选5-中三直选复式
 */
function random_z3zxfs_11x5() {
    getRandomSwCommon();
}

/**
 * 随机算法-11选5-前三直选复式
 */
function random_q3zxfs_11x5() {
    getRandomSwCommon();
}

function getRandom3weiCommon(){
    var random_1 = parseInt(Math.random() * 11);
    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
}

function getRandomQ2ZuxTdCommon(){
    var arrTemp = [];
    while (arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);

        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
}

function getRandomQ2ZuxCommon(){
    var arrTemp = [];
    while (arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);

        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".wanweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
}

function getRandomQ2ZxCommon(){
    var arrTemp = [];
    while (arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);

        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
}

function getRandomSwZxTdCommon(){
    var arrTemp = [];
    while (arrTemp.length < 3){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);
        var random_3 = parseInt(Math.random() * 11);

        if(random_1 != random_2 && random_1 != random_3 && random_2 != random_3 ){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
            arrTemp.push(random_3);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").eq(random_3).removeClass("active_gfwf").addClass("active_gfwf");
}

function getRandomSwZxCommon(){
    var arrTemp = [];
    while (arrTemp.length < 3){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);
        var random_3 = parseInt(Math.random() * 11);

        if(random_1 != random_2 && random_1 != random_3 && random_2 != random_3 ){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
            arrTemp.push(random_3);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".wanweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
    $(".wanweiStr .wan_bottom .xz").eq(random_3).removeClass("active_gfwf").addClass("active_gfwf");
}

//获取同位N个随机数
function getRandomTongWeiNums(num){
    var weiArr = [];
    while(weiArr.length != num){
        var random_x = parseInt(Math.random() * 11);
        weiArr.push(random_x);
        weiArr = weiArr.uniqueArr(); //去除重复
    }

    $.each(weiArr, function (index, value) {
        $(".wanweiStr .wan_bottom .xz").eq(value).removeClass("active_gfwf").addClass("active_gfwf");
    });
}

//获取胆码位和胆拖位N个随机数
function getRandomErWeiNums(num){
    var weiArr = [];
    var noHasArr = [];

    while(weiArr.length != num - 1){
        var random_x = parseInt(Math.random() * 11);
        weiArr.push(random_x);
        weiArr = weiArr.uniqueArr(); //去除重复
    }

    for(var i = 0; i < 11; i++){
        if($.inArray(i, weiArr) < 0){
            noHasArr.push(i);
        }
    }


    var x = parseInt(Math.random() * (11 - num - 1)); //随机获取剩余的几个数中的某个数值
    $(".wanweiStr .wan_bottom .xz").eq(noHasArr[x]).removeClass("active_gfwf").addClass("active_gfwf");

    $.each(weiArr, function (index, value) {
        $(".qianweiStr .wan_bottom .xz").eq(value).removeClass("active_gfwf").addClass("active_gfwf");
    });
}


function getRandomSwCommon(){
    var arrTemp = [];
    while (arrTemp.length < 3){
        var random_1 = parseInt(Math.random() * 11);
        var random_2 = parseInt(Math.random() * 11);
        var random_3 = parseInt(Math.random() * 11);

        if(random_1 != random_2 && random_1 != random_3 && random_2 != random_3 ){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
            arrTemp.push(random_3);
        }
    }

    $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
    $(".baiweiStr .wan_bottom .xz").eq(random_3).removeClass("active_gfwf").addClass("active_gfwf");
}

/********************************************PK10***********************************************/
/**
 * 随机算法-pk10前一
 */
function random_qy() {
    var random_1 = parseInt(Math.random() * 11);

    $(".di1m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
}

/**
 * 随机算法-定位胆
 */
function random_dwd_pk10() {
    var random_1 = parseInt(Math.random() * 11);
    var wei = parseInt(Math.random() * 5);

    if(wei == 0){
        $(".di1m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 1){
        $(".di2m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 2){
        $(".di3m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 3){
        $(".di4m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 4){
        $(".di5m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    }
}

/**
 * 随机算法-pk10前二
 */
function random_qe() {
    var arrTemp = [];
    var random_1 = 0;
    var random_2 = 0;

    while (arrTemp.length <= 1) {
        random_1 = parseInt(Math.random() * 11);
        random_2 = parseInt(Math.random() * 11);
        if(random_1 != random_2){
            arrTemp.push(random_1 + ',' + random_2);
        }
    }

    $(".di1m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".di2m .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
}

/**
 * 随机算法-pk10前三
 */
function random_qsan() {
    var arrTemp = [];
    var random_1 = 0;
    var random_2 = 0;
    var random_3 = 0;

    while (arrTemp.length <= 1) {
        random_1 = parseInt(Math.random() * 11);
        random_2 = parseInt(Math.random() * 11);
        random_3 = parseInt(Math.random() * 11);

        if(random_1 != random_2 && random_1 != random_3 && random_3 != random_2){
            arrTemp.push(random_1 + ',' + random_2 + ',' + random_3);
        }
    }

    $(".di1m .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    $(".di2m .wan_bottom .xz").eq(random_2).removeClass("active_gfwf").addClass("active_gfwf");
    $(".di3m .wan_bottom .xz").eq(random_3).removeClass("active_gfwf").addClass("active_gfwf");
}


/*************************时时彩随机**********************/
/**
 * 随机算法-定位胆
 */
function random_dwd() {
    var random_1 = parseInt(Math.random() * 10);
    var wei = parseInt(Math.random() * 5);

    if(wei == 0){
        $(".wanweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 1){
        $(".qianweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 2){
        $(".baiweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 3){
        $(".shiweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    } else if(wei == 4){
        $(".geweiStr .wan_bottom .xz").eq(random_1).removeClass("active_gfwf").addClass("active_gfwf");
    }
}

/**
 * 随机算法-五星直选复式
 */
function random_5xzxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);
    var random_4 = parseInt(Math.random() * 10);
    var random_5 = parseInt(Math.random() * 10);

    $(".wanweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    $(".shiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_4).addClass("active_gfwf");
    $(".geweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_5).addClass("active_gfwf");
}

/**
 * 随机算法-4星直选复式
 */
function random_4xzxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);
    var random_4 = parseInt(Math.random() * 10);

    $(".qianweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".shiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    $(".geweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_4).addClass("active_gfwf");
}

/**
 * 随机算法-后三直选复式
 */
function random_h3zxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);

    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".shiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".geweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-后三直选和值
 */
function random_h3zxhz() {
    var random_1 = parseInt(Math.random() * 28);
    $(".h3zxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三直选跨度
 */
function random_h3zxkd() {
    var random_1 = parseInt(Math.random() * 10);
    $(".h3kdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三组合
 */
function random_h3zh() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);

    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".shiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".geweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-后三组三复式
 */
function random_h3z3fs() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var x1 = parseInt(Math.random() * 10);
        var x2 = parseInt(Math.random() * 10);
        if(x1 != x2){
            arrTemp.push(x1);
            arrTemp.push(x2);
        }
    }
    $(".z3fsStr .wan_bottom .xz").removeClass("active_gfwf").eq(arrTemp[0]).addClass("active_gfwf");
    $(".z3fsStr .wan_bottom .xz").eq(arrTemp[1]).addClass("active_gfwf");
}

/**
 * 随机算法-后三组6复式
 */
function random_h3z6fs() {
    var arrTemp = [];
    while(arrTemp.length < 3){
        var x1 = parseInt(Math.random() * 10);
        var x2 = parseInt(Math.random() * 10);
        var x3 = parseInt(Math.random() * 10);
        if(x1 != x2 && x2 != x3 && x1 != x3){
            arrTemp.push(x1);
            arrTemp.push(x2);
            arrTemp.push(x3);
        }
    }
    $(".z6fsStr .wan_bottom .xz").removeClass("active_gfwf").eq(arrTemp[0]).addClass("active_gfwf");
    $(".z6fsStr .wan_bottom .xz").eq(arrTemp[1]).addClass("active_gfwf");
    $(".z6fsStr .wan_bottom .xz").eq(arrTemp[2]).addClass("active_gfwf");
}

/**
 * 随机算法-后三组选和值
 */
function random_h3zuxhz() {
    var random_1 = (parseInt(Math.random() * 26) + 1);
    $(".zuxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三组选包胆
 */
function random_h3zuxbd() {
    var random_1 = parseInt(Math.random() * 10);
    $(".bdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三和值尾数
 */
function random_h3hzws() {
    var random_1 = parseInt(Math.random() * 10);
    $(".hzwsStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三特殊号
 */
function random_h3tsh() {
    var random_1 = parseInt(Math.random() * 3);
    $(".tshStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

// 前三

/**
 * 随机算法-前三直选复式
 */
function random_q3zxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);

    $(".wanweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-前三直选和值
 */
function random_q3zxhz() {
    var random_1 = parseInt(Math.random() * 28);
    $(".q3zxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三直选跨度
 */
function random_q3zxkd() {
    var random_1 = parseInt(Math.random() * 10);
    $(".h3kdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三组合
 */
function random_q3zh() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);

    $(".wanweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".baiweiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-前三组三复式
 */
function random_q3z3fs() {
    var arrTemp = [];
    while(arrTemp.length < 3){
        var x1 = parseInt(Math.random() * 10);
        var x2 = parseInt(Math.random() * 10);
        if(x1 != x2){
            arrTemp.push(x1);
            arrTemp.push(x2);
        }
    }
    $(".z3fsStr .wan_bottom .xz").removeClass("active_gfwf").eq(arrTemp[0]).addClass("active_gfwf");
    $(".z3fsStr .wan_bottom .xz").eq(arrTemp[1]).addClass("active_gfwf");
}

/**
 * 随机算法-前三组6复式
 */
function random_q3z6fs() {
    var arrTemp = [];
    while(arrTemp.length < 3){
        var x1 = parseInt(Math.random() * 10);
        var x2 = parseInt(Math.random() * 10);
        var x3 = parseInt(Math.random() * 10);
        if(x1 != x2 && x2 != x3 && x1 != x3){
            arrTemp.push(x1);
            arrTemp.push(x2);
            arrTemp.push(x3);
        }
    }
    $(".z6fsStr .wan_bottom .xz").removeClass("active_gfwf").eq(arrTemp[0]).addClass("active_gfwf");
    $(".z6fsStr .wan_bottom .xz").eq(arrTemp[1]).addClass("active_gfwf");
    $(".z6fsStr .wan_bottom .xz").eq(arrTemp[2]).addClass("active_gfwf");
}

/**
 * 随机算法-前三组选和值
 */
function random_q3zuxhz() {
    var random_1 = (parseInt(Math.random() * 26) + 1);
    $(".zuxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三组选包胆
 */
function random_q3zuxbd() {
    var random_1 = parseInt(Math.random() * 10);
    $(".bdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三和值尾数
 */
function random_q3hzws() {
    var random_1 = parseInt(Math.random() * 10);
    $(".hzwsStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三特殊号
 */
function random_q3tsh() {
    var random_1 = parseInt(Math.random() * 3);
    $(".tshStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

// 前二
/**
 * 随机算法-前二直选复式
 */
function random_q2zxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-前二直选和值
 */
function random_q2zxhz() {
    var random_1 = parseInt(Math.random() * 19);

    $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**

 * 随机算法-前二直选跨度
 */
function random_q2zxkd() {
    var random_1 = parseInt(Math.random() * 10);

    $(".kdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前二组选复式
 */

function random_q2zuxfs() {
    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);

    $(".zuxStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zuxStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-前二组选和值
 */

function random_q2zuxhz() {
    var random_1 = (parseInt(Math.random() * 17) + 1);

    $(".q2zuxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前二组选包胆
 */

function random_q2zuxbd() {
    var random_1 = parseInt(Math.random() * 10);

    $(".zuxbdStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}


//不定位
/**
 * 随机算法-前三一码
 */

function random_q3ym() {
    var random_1 = parseInt(Math.random() * 10);

    $(".q3ymStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前三二码
 */

function random_q3em() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".q3emStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".q3emStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-后三一码
 */

function random_h3ym() {
    var random_1 = parseInt(Math.random() * 10);

    $(".h3ymStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后三二码
 */

function random_h3em() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".h3emStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".h3emStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-前四一码
 */

function random_q4ym() {
    var random_1 = parseInt(Math.random() * 10);

    $(".q4ymStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-前四二码
 */

function random_q4em() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".q4emStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".q4emStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-后四一码
 */

function random_h4ym() {
    var random_1 = parseInt(Math.random() * 10);

    $(".h4ymStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-后四二码
 */

function random_h4em() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".h4emStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".h4emStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-五星一码
 */

function random_wxym() {
    var random_1 = parseInt(Math.random() * 10);

    $(".wxymStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-五星二码
 */

function random_wxem() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".wxemStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".wxemStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-五星三码
 */

function random_wx3m() {
    var arrTemp = [];
    while(arrTemp.length < 3){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        var random_3 = parseInt(Math.random() * 10);
        if(random_1 != random_2 && random_2 != random_3 && random_3 != random_1){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
            arrTemp.push(random_3);
        }
    }

    $(".wxsmStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".wxsmStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
    $(".wxsmStr .wan_bottom .xz").eq(random_3).addClass("active_gfwf");
}

//大小单双
/**
 * 随机算法-前二大小单双
 */

function random_q2dxds() {
    var random_1 = parseInt(Math.random() * 4);
    var random_2 = parseInt(Math.random() * 4);

    $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-后二大小单双
 */

function random_h2dxds() {
    var random_1 = parseInt(Math.random() * 4);
    var random_2 = parseInt(Math.random() * 4);

    $(".shiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".geStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-前三大小单双
 */

function random_q3dxds() {
    var random_1 = parseInt(Math.random() * 4);
    var random_2 = parseInt(Math.random() * 4);
    var random_3 = parseInt(Math.random() * 4);

    $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".baiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-后三大小单双
 */

function random_h3dxds() {
    var random_1 = parseInt(Math.random() * 4);
    var random_2 = parseInt(Math.random() * 4);
    var random_3 = parseInt(Math.random() * 4);

    $(".baiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".shiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".geStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
}

//任二
/**
 * 随机算法-任二直选复式
 */

function random_rx2zxfs() {
    var arrTemp = [];
    var wei_1 = 0;
    var wei_2 = 1;
    while(arrTemp.length < 2){
        wei_1 = parseInt(Math.random() * 5);
        wei_2 = parseInt(Math.random() * 5);
        if(wei_1 != wei_2){
            arrTemp.push(wei_1);
            arrTemp.push(wei_2);
        }
    }

    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);
    var random_4 = parseInt(Math.random() * 10);
    var random_5 = parseInt(Math.random() * 10);

    if(wei_1 == 0 || wei_2 == 0){
        $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    }

    if(wei_1 == 1 || wei_2 == 1){
        $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    }

    if(wei_1 == 2 || wei_2 == 2){
        $(".baiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    }

    if(wei_1 == 3 || wei_2 == 3){
        $(".shiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_4).addClass("active_gfwf");
    }

    if(wei_1 == 4 || wei_2 == 4){
        $(".geStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_5).addClass("active_gfwf");
    }

}

/**
 * 随机算法-任二直选和值
 */

function random_rx2zxhz() {
    var random_1 = parseInt(Math.random() * 19);

    $(".zxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-任二直选复式
 */

function random_rx2zuxfs() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".zuxfsStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zuxfsStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-任二组选和值
 */

function random_rx2zuxhz() {
    var random_1 = (parseInt(Math.random() * 17) + 1);

    $(".zuxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

//任选三
/**
 * 随机算法-任三直选复式
 */

function random_rx3zxfs() {
    var arrTemp = [];
    var wei_1 = 0;
    var wei_2 = 1;
    var wei_3 = 2;
    while(arrTemp.length < 3){
        wei_1 = parseInt(Math.random() * 5);
        wei_2 = parseInt(Math.random() * 5);
        wei_3 = parseInt(Math.random() * 5);
        if(wei_1 != wei_2 && wei_3 != wei_1 && wei_2 != wei_3){
            arrTemp.push(wei_1);
            arrTemp.push(wei_2);
            arrTemp.push(wei_3);
        }
    }

    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);
    var random_4 = parseInt(Math.random() * 10);
    var random_5 = parseInt(Math.random() * 10);

    if(wei_1 == 0 || wei_2 == 0|| wei_3 == 0){
        $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    }

    if(wei_1 == 1 || wei_2 == 1 || wei_3 == 1){
        $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    }

    if(wei_1 == 2 || wei_2 == 2 || wei_3 == 2){
        $(".baiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    }

    if(wei_1 == 3 || wei_2 == 3 || wei_3 == 3){
        $(".shiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_4).addClass("active_gfwf");
    }

    if(wei_1 == 4 || wei_2 == 4 || wei_3 == 4){
        $(".geStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_5).addClass("active_gfwf");
    }

}

/**
 * 随机算法-任三直选和值
 */

function random_rx3zxhz() {
    var random_1 = parseInt(Math.random() * 28);

    $(".zxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

/**
 * 随机算法-任三组三复式
 */

function random_rx3z3fs() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".zu3fStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zu3fStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-任三组六复式
 */

function random_rx3z6fs() {
    var arrTemp = [];
    while(arrTemp.length < 3){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        var random_3 = parseInt(Math.random() * 10);
        if(random_1 != random_2 && random_2 != random_3 && random_1 != random_3){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
            arrTemp.push(random_3);
        }
    }

    $(".zu6fStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zu6fStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
    $(".zu6fStr .wan_bottom .xz").eq(random_3).addClass("active_gfwf");
}

/**
 * 随机算法-任三组选和值
 */

function random_rx3zuxhz() {
    var random_1 = (parseInt(Math.random() * 27) + 1);

    $(".zuxhzStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

//任选四
/**
 * 随机算法-任四直选复式
 */

function random_rx4zxfs() {
    var arrTemp = [];
    arrTemp = getFourNum();
    var wei_1 = arrTemp[0];
    var wei_2 = arrTemp[1];
    var wei_3 = arrTemp[2];
    var wei_4 = arrTemp[3];

    var random_1 = parseInt(Math.random() * 10);
    var random_2 = parseInt(Math.random() * 10);
    var random_3 = parseInt(Math.random() * 10);
    var random_4 = parseInt(Math.random() * 10);
    var random_5 = parseInt(Math.random() * 10);

    if(wei_1 == 0 || wei_2 == 0|| wei_3 == 0 || wei_4 == 0){
        $(".wanStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    }

    if(wei_1 == 1 || wei_2 == 1 || wei_3 == 1){
        $(".qianStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    }

    if(wei_1 == 2 || wei_2 == 2 || wei_3 == 2 || wei_4 == 2){
        $(".baiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    }

    if(wei_1 == 3 || wei_2 == 3 || wei_3 == 3 || wei_4 == 3){
        $(".shiStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_4).addClass("active_gfwf");
    }

    if(wei_1 == 4 || wei_2 == 4 || wei_3 == 4 || wei_4 == 4){
        $(".geStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_5).addClass("active_gfwf");
    }

}

/**
 * 随机算法-任四组24
 */

function random_rx4zu24() {
    var arrTemp = [];
    arrTemp = getFourNum();
    var random_1 = arrTemp[0];
    var random_2 = arrTemp[1];
    var random_3 = arrTemp[2];
    var random_4 = arrTemp[3];

    $(".zu24Str .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zu24Str .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
    $(".zu24Str .wan_bottom .xz").eq(random_3).addClass("active_gfwf");
    $(".zu24Str .wan_bottom .xz").eq(random_4).addClass("active_gfwf");
}

/**
 * 随机算法-任四组12
 */

function random_rx4zu12() {
    var arrTemp = [];
    var arrOneNum = [];
    var random_1 = 0;
    var random_2 = 1;
    while(arrTemp.length < 2){
        random_1 = parseInt(Math.random() * 10);
        random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    while(arrOneNum.length < 1){
        var random_3 = parseInt(Math.random() * 10);
        if(random_1 != random_2 && random_1 != random_3 && random_2 != random_3){
            arrOneNum.push(random_3);
        }
    }

    $(".zu12chStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_3).addClass("active_gfwf");
    $(".zu12dhStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zu12dhStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}

/**
 * 随机算法-任四组6
 */

function random_rx4zu6() {
    var arrTemp = [];
    while(arrTemp.length < 2){
        var random_1 = parseInt(Math.random() * 10);
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrTemp.push(random_1);
            arrTemp.push(random_2);
        }
    }

    $(".zu6chStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
    $(".zu6chStr .wan_bottom .xz").eq(random_2).addClass("active_gfwf");
}


/**
 * 随机算法-任四组4
 */
function random_rx4zu4() {
    var arrOneNum = [];
    var random_1 = parseInt(Math.random() * 10);

    while(arrOneNum.length < 1){
        var random_2 = parseInt(Math.random() * 10);
        if(random_1 != random_2){
            arrOneNum.push(2);
        }
    }

    $(".zu4chStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_2).addClass("active_gfwf");
    $(".zu4dhStr .wan_bottom .xz").removeClass("active_gfwf").eq(random_1).addClass("active_gfwf");
}

//获取 0 到 9 位上4个不同号码
function getFourNum(){
    var arrTemp = [];
    var wei_1 = 0;
    var wei_2 = 1;
    var wei_3 = 2;
    var wei_4 = 3;
    while(arrTemp.length < 4){
        wei_1 = parseInt(Math.random() * 5);
        wei_2 = parseInt(Math.random() * 5);
        wei_3 = parseInt(Math.random() * 5);
        wei_4 = parseInt(Math.random() * 5);
        if(wei_1 != wei_2 && wei_3 != wei_1 && wei_1 != wei_4 && wei_2 != wei_3 && wei_2 != wei_4 && wei_3 != wei_4){
            arrTemp.push(wei_1);
            arrTemp.push(wei_2);
            arrTemp.push(wei_3);
            arrTemp.push(wei_4);
        }
    }

    return arrTemp;
}