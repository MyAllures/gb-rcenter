// 清除内容提示框
var layerId = null;
var T = null;
function showClearBetTemplate() {
    if (layerId != null) {
        return;
    }
    var clearBet_template = '\
    <div class="clearBet_template">\
        <div class="l">\
            <span>\
            <i></i>\
            </span>\
        </div>\
        <div class="r">\
            <p>当前期已结束，是否要清空已投注内容？</p>\
            <p>要清空已投注内容请单击"确定",不刷新页面请点击"取消"</p>\
        </div>\
        <div style="clear:both"></div>\
        <div class="btns" style="text-align:center">\
            <button type="button" onclick="closeClearBetTemplate(true)">确定</button>\
            <button type="button" onclick="closeClearBetTemplate(false)">取消<font class="time"></font></button>\
        </div>\
    </div>\
    ';



    layer.closeAll();
    //页面层
    layerId = layer.open({
        type: 1,
        time: 15000,
        title: '温馨提示',
        skin: 'layui-layer-popup layui-layer-rim', //加上边框
        area: ['480px', '240px'], //宽高
        content: clearBet_template
    });


    var time = 5;
    T = setInterval(function() {
        if (time == 0) {
            closeClearBetTemplate();
            return;
        }
        $(".clearBet_template .time").html('(' + time + ')');
        --time;
    }, 1000)
}

function closeClearBetTemplate(isReset) {
    if (T != null) {
        clearInterval(T);
        T = null;
    }
    if (layerId != null) {
        layer.close(layerId);
        layerId = null;
    }

    if (typeof isReset != 'undefined') {
        if (isReset && typeof reset == 'function') {
            reset();
        }
    }
}

// 显示封盘
function showFengPan() {
    $(".pl").html("封盘");    // 初始显示封盘
}

var getSscOpenTime_Running = false; // getSscOpenTime函数是否正在调用
// 获取时间、期号
function getSscOpenTime(playGroupId, callback) {
    if (getSscOpenTime_Running) {
        return;
    }

/*    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getSscOpenTime2.json",
        data: {
            playGroupId: playGroupId
        },
        beforeSend: function() {
            sscOpenTimeJson = null;
            getSscOpenTime_Running = true;
        },
        success: function(json) {
            if (json.result != 1) {
                return;
            }

            $("#number").data("number", json.number).html(json.number); // 期数

            if (json.opening) {
                $("#tip").html(json.number + '期已开盘，欢迎投注。距离下一期还有:');
                $("#leftTime").data("time", json.leftTime);
                $("#tip").data("opening", true);

                renderPlData();
            }

            if (typeof callback == 'function') {
                callback();
            }
        },
        complete: function() {
            getSscOpenTime_Running = false;
        }
    });*/
}

// 获取玩法赔率
var playPlJson = null;
function getSscPlayPl(playId) {
    /*ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getSscPlayPl.json",
        data: {
            playId: playId
        },
        success: function(json) {
            if (json.result != 1) {
                return;
            }

            playPlJson = json.sscPlayPlList;

            // 渲染数据
            renderPlData();
        },
        error: function() {
            // 重试
            setTimeout(function() {
                getSscPlayPl(playId);
            }, 3000);
        }
    });*/
   // 展示静态用，要删除
            renderPlData();
   // 展示静态用，要删除
}

// 渲染赔率
function renderPlData() {
    if (playPlJson != null) {
        $.each(playPlJson, function (index, value) {
            $("[data-plid='" + value.playPlId + "']").data("pl", value.playPl).html(value.playPl);
        });
    }
}

// 时间倒计时
$(function() {
    var getSscOpenTime_Timestamp = null;   // 调用getSscOpenTime成功的时间

    var isInitSwfObject = false;
    function play(file) {
        if (!isInitSwfObject) {
            // 初始化音乐
            var flashvars = {};
            var params = {
                wmode: "transparent"
            };
            var attributes = {};
            swfobject.embedSWF(CONFIG.RESURL + "js/swfobject/sound.swf", "soundContainer", "1", "1", "9.0.0", CONFIG.RESURL + "js/swfobject/expressInstall.swf", flashvars, params, attributes);
            isInitSwfObject = true;
        }

        var sound = swfobject.getObjectById("soundContainer");
        if (sound) {
            sound.SetVariable("f", file);
            sound.GotoFrame(1);
        }
    }

    function autoLeftTime() {
        var time = $("#leftTime").data("time");
        if (isNaN(time) || time < 0) {
            if (getSscOpenTime_Timestamp != null && (new Date()).getTime() - getSscOpenTime_Timestamp < 5 * 1000) {   // 5秒内防止重复请求，避免接口获取数据延迟增加不必要的访问量
                return;
            }

            getSscOpenTime(playGroupId, function() {
                getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
                getOpenCodeHistory();   // 获取开奖记录
            });

            if (time == -1) {
                // 显示清除投注内容提示框
                if (typeof showClearBetTemplate == 'function') {
                    showClearBetTemplate();
                }
            }
            $("#leftTime").data("time", --time);
            return;
        }
        var tmpTime = time;
        var hour = Math.floor(tmpTime / 60 / 60);
        tmpTime = tmpTime - hour * 60 * 60;
        var minute = Math.floor(tmpTime / 60);
        tmpTime = tmpTime - minute * 60;
        var second = tmpTime;

        var str = '';
        str += '<ol class="s">';
        str += '<span class="sp1">' + (Math.floor(hour / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(hour % 10)) + '</span>';
        str += '</ol>';
        str += '<ol class="f">';
        str += '<span class="sp1">' + (Math.floor(minute / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(minute % 10)) + '</span>';
        str += '</ol>';
        str += '<ol class="m">';
        str += '<span class="sp1">' + (Math.floor(second / 10)) + '</span>';
        str += '<span class="sp2">' + (Math.floor(second % 10)) + '</span>';
        str += '</ol>';

        $("#leftTime").data("time", --time).html(str);

        // 播放铃声
        if (hour == 0 && minute == 0 && second < 10 && second > 0) {
            var file = $("#selectCount").find("option:selected").data("file");
            play(file);
        }
    }

    setInterval(function() {
        autoLeftTime();
    }, 1000);
});

function getSscSubPage(url) {
    ajaxRequest({
        url: CONFIG.BASEURL + url.split("-").join("/") + ".html",
        type: 'GET',
        dataType: 'html',
        beforeSend: function(){
            $("#subContent").html('<img src="' + CONFIG.RESURL + 'img/base_loading.gif" style="display: block;margin: auto;margin: 50px auto;">');
        },
        success: function(html) {
            // 读取HTML页内容
            $("#subContent").html(html);

            // 读取赔率
            getSscPlayPl(playId);

            // 下单按钮
            $("#subContent .btns button[type='submit']").click(function() {
                xd();
            });

            // 重置按钮
            $("#subContent .btns .btn-2").click(function() {
                reset();
            });

            // 只能输入整数
            $('#subContent input').keyup(function(){
                this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
            });
            $("#toptouzhu .kjanniu a").click(function () {
                var num =parseInt($(this).data('num'));
                $('#toptouzhu input').val(num);
            });
        },
        complete: function() {
        }
    });
}

// 切换玩法
$(function() {

    // 绑定
    $(".Playmethod ul li p span a").click(function() {
        $(".Playmethod ul li p span.acti").removeClass("acti");
        $(this).parent().addClass("acti");
        getSscSubPage($(this).data("url"));
    });

//        $(".cqssc").click(function(){
//            getSscSubPage($(this).data("url"));
//        });
//

    var navIndex = getQueryString("navIndex");    // 自定义导航子页面
    // 默认第一个玩法
    if (isNaN(navIndex)) {
        navIndex = 0;
    }

    $(".Playmethod ul li p span a").eq(navIndex).trigger("click");
});

$(function() {
    // 关闭父页Loding
    try {
        parent.hideLoading();
    } catch (e) {}
});

$(function() {
    // 页面加载读取开奖时间
    getSscOpenTime(playGroupId);
});

var lastNumberOpening_intervalFlag = null;
function getOpenCodeHistory() {
    // 获取开奖历史
/*    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/getPlanOpenDataHistory.json",
        data: {
            playGroupId: playGroupId
        },
        success: function (json) {
            if (json.result != 1) {
                return;
            }

            var tmpHtml = '';

            if (json.sscHistoryList.length > 0) {
                var value = json.sscHistoryList[0];
                var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中

                if (lastNumberOpening) {
                    if (lastNumberOpening_intervalFlag == null) {
                        $("#lastNumber").html('第' + value.number + '期<var>开奖中</var>');

                        // 随机号码
                        if (typeof randomNumber == 'function') {
                            lastNumberOpening_intervalFlag = setInterval(function () {
                                randomNumber();
                            }, 100);
                        }
                    }

                    // 循环读取开奖时间，5秒
                    setTimeout(function () {
                        getOpenCodeHistory();
                    }, 5000);
                } else {
                    if (null != lastNumberOpening_intervalFlag) {
                        clearInterval(lastNumberOpening_intervalFlag);
                        lastNumberOpening_intervalFlag = null;
                    }

                    $("#lastNumber").html($(".box1_name h2").html() + '第<var>' + value.number + '</var>期');
                    if (typeof renderLastOpenCode == 'function') {
                        renderLastOpenCode(openCodeArr);
                    }

                    // 两面长龙
                    if (typeof refreshViewRight == 'function') {
                        refreshViewRight();
                    }

                    // 我的中奖
                    if (typeof getBetZjDetails == 'function') {
                        getBetZjDetails();
                    }
                }
            }
            template.helper('getBose',function(xvalue){
                var value = parseInt(xvalue);
                var num = getBose(value);
                var numStr = '';
                if (num == 0) {
                    numStr = 'ball-red';
                } else if (num == 1) {
                    numStr = 'ball-blue';
                } else {
                    numStr = 'ball-green';
                }
                return numStr;
            });
            $.each(json.sscHistoryList, function (index, value) {
                var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                tmpHtml += template('template_openDataHistory', {number: value.number, list: openCodeArr});
            });
            $("#lastOpenCodeList ul").html(tmpHtml);
        },
        error: function() {
            // 失败重试
            setTimeout(function() {
                getOpenCodeHistory()
            }, 5000);
        },
        complete: function () {
        }
    });*/
}
$(function() {
    // 开奖切换
    tabs_cg(".game_name .box2_stage p span i", ".game_name .box2_stage .number", "click", "acti", "", "", 0);
    getOpenCodeHistory();
});

// 下注
function xd() {
    parent.showLoading();
    var betForm = getZhudan();
    if (typeof betForm != 'object') {
        parent.hideLoading();
        return;
    }
    if (betForm.sscBetList.length == 0) {
        parent.hideLoading();
        Tools.toast("请选择");
        return;
    }

    var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;">共计：￥<font class="red">' + betForm.totalMoney + '</font>/<font class="red">' + betForm.totalZhushu + '</font>&nbsp;注，您确定要下注吗？</p>';
    $.each(betForm.sscBetList, function(index, value) {
        str += '<p><span>[&nbsp;' + value.content + '&nbsp;]</span><span>&nbsp;@' + value.playPl + '&nbsp;X&nbsp;' + value.perMoney + '</span></p>';
    });
    parent.hideLoading();
    //询问框
    layer.confirm(str, {
        btn: ['确认','取消'], //按钮
        title: '下注清单'
    }, function(){
        sureXd();
    }, function(){
    });
    $(".layui-layer-title").css({'font-size': '16px', 'font-weight': 'bold', 'color': '#fff', 'text-align': 'center', 'background-color': '#fa6200'});
    $(".layui-layer-close").css({'background': 'url(' + CONFIG.RESURL + 'img/ico_close.png) no-repeat'});
}

function sureXd() {
    var betForm = getZhudan();
    if (typeof betForm != 'object') {
        return;
    }

    var data = {
        totalZhushu: betForm.totalZhushu,
        totalMoney: betForm.totalMoney,
        sscBetList: []
    };
    $.each(betForm.sscBetList, function(index, value) {
        data.sscBetList.push({
            playGroupId: value.playGroupId,
            number: value.number,
            playId: value.playId,
            zhushu: value.zhushu,
            perMoney: value.perMoney,
            content: value.content,
            playPlId: value.playPlId,
            playPl: value.playPl,
        });
    });

/*    ajaxRequest({
        url: CONFIG.BASEURL + "ssc/ajaxBet.json",
        data: {
            betForm: JSON.stringify(data)
        },
        beforeSend: function() {
            layer.closeAll();
            parent.showLoading();
        },
        success: function(json) {
            parent.hideLoading();
            if (json.result == 1) {
                layer.msg("下注成功", {icon: 1});
                // 刷新我的投注
                getBetDetails();
                // 刷新余额
                parent.getUserSession();
                // 重置表格
                reset();
            } else {
                layer.msg("下注失败：" + json.description, {icon: 2});
            }
        },
        complete: function() {
        }
    });*/
}

function reset() {
    $(".main-left .table-common input").each(function(index, value) {
        if ($(this).attr("type") == "checkbox") {
            $(this).prop("checked", false);
        } else if ($(this).attr("type") == "text") {
            $(this).val('');
        }
    });
    $(".bg-yellow").removeClass("bg-yellow");
    $(".main-left .fl input").each(function() {
        if ($(this).attr("type") != 'submit') {
            $(this).val('');
        }
    });
}
$(function() {
    $("#subContent .btns button[type='submit']").click(function() {
        xd();
    });

    $("#subContent .btns .btn-2").click(function() {
        reset();
    });
});

// 底部
function getBetZjDetails(){
    var container = $(".wdzj");
  /*  ajaxRequest({
        url: CONFIG.BASEURL + "member/ajaxGetTzjl.json",
        data: {
//                playGroupId: playGroupId,
            pageSize:5,
            status: 1,
            isZhongjiang: true
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<span class="spanlogin">登录</span>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href="' + CONFIG.BASEURL + '?u=' + CONFIG.BASEURL + 'register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession();
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscBetsList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscBetsList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    playName: value.playName,
                    content: value.content,
                    totalMoney: value.totalMoney,
                    jiangjin: mul(value.totalMoney, value.playPl),
                    status: value.status,
                    zjMoney: value.zjMoney
                });
            });

            var html = template('wdzjTemplate', obj);
            $(container).html(html);
        }
    });*/
}

function getJjsm() {
    var container = $(".jjsm");
//  ajaxRequest({
//      url: CONFIG.BASEURL + "ssc/ajaxGetSscPlayJjDescription.json",
//      data: {
//          playId: playId
//      },
//      beforeSend: function() {
//          $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
//      },
//      success: function(json) {
//          if(json.result != 1) {
//              return;
//          }
//
//          $(container).html(json.jjDescription);
//      }
//  });
}
function getKjhm(){
    var container = $(".kjhm");
    /*ajaxRequest({
        url: CONFIG.BASEURL + "ssc/ajaxGetHistory.json",
        data: {
            playGroupId: playGroupId,
            pageIndex: 1,
            pageSize: 5
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">请先登录</li>');
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscHistoryList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无记录</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscHistoryList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    openCode: value.openCode,
                    openTime: dateFormat(value.openTime, "yyyy-mm-dd HH:MM:ss"),
                    playGroupId: value.playGroupId
                });
            });
            obj.playGroupId = playGroupId;

            var html = template('kjhmTemplate', obj);
            $(container).html(html);
        }
    });*/
}

function getBetDetails(){
    var container = $(".wdtz");
    /*ajaxRequest({
        url: CONFIG.BASEURL + "member/ajaxGetTzjl.json",
        data: {
//                playGroupId: playGroupId,
            pageSize:5,
            status: 0
        },
        beforeSend: function() {
            $(container).html('<li style="width:100%;padding:15px;text-align:center;"><img src="' + CONFIG.RESURL + 'img/base_loading.gif"/>');
        },
        success: function(json) {
            if (json.result == -101) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;" id="BetLogin"> 请先&nbsp;&nbsp;<span class="spanlogin">登录</span>&nbsp;&nbsp;还没有帐号？&nbsp;&nbsp;<span class="spanreg"><a href=' + CONFIG.BASEURL + '"?u=' + CONFIG.BASEURL + 'register.html" target="_blank">注册</a></span>一个</li>');

                $("#bottomInfo #BetLogin .spanlogin").click(function () {
                    $(".alert_log").fadeIn();
                });
                $(".alert_log .alert_log_col h5 i").click(function () {
                    $(".alert_log").fadeOut();
                });
                parent.getUserSession();
                return;
            }
            if(json.result != 1) {
                return;
            }

            if (json.sscBetsList.length == 0) {
                $(container).html('<li style="width:100%;padding:15px;text-align:center;">暂无投注</li>');
                return;
            }

            var obj = {list: []};
            $.each(json.sscBetsList,function (index,value) {
                obj.list.push({
                    playGroupName: value.playGroupName,
                    number: value.number,
                    playName: value.playName,
                    content: value.content,
                    totalMoney: value.totalMoney,
                    jiangjin: mul(value.totalMoney, value.playPl),
                    status: value.status,
                    zjMoney: value.zjMoney
                });
            });

            var html = template('wdtzTemplate', obj);
            $(container).html(html);
        }
    });*/
}

$(function() {
    $("#bottomInfo .tabs ul li").click(function() {
        $("#bottomInfo .tabs ul li.acti").removeClass("acti");
        $(this).addClass("acti");
        $("#bottomInfo .list_wrap").hide();

        var obj = $("#bottomInfo .list_wrap").eq($(this).index());
        $(obj).show();

        var operType = $(this).data("opertype");
        if (operType == 'wdtz') {
            getBetDetails();
        } else if (operType == 'kjhm') {
            getKjhm(obj);
        } else if (operType == 'jjsm') {
            getJjsm(obj);
        } else if (operType == 'wdzj') {
            getBetZjDetails(obj);
        }
    });

    $("#bottomInfo .tabs ul li").eq(0).trigger("click");
});