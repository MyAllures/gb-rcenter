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

            // getSscOpenTime(playGroupId, function() {
            //     getSscOpenTime_Timestamp = (new Date()).getTime();  // 设置调用getSscOpenTime成功的时间
            //     getOpenCodeHistory();   // 获取开奖记录
            // });

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
                placeOrder();
            });
            // 重置按钮
            $("#subContent .btns .btn-2").click(function() {
                reset();
            });
            // 只能输入整数
            $('#subContent input').keyup(function(){
                this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
            })
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
    // getSscOpenTime(playGroupId);
});