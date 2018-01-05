/**
 * Created by fei on 16-10-19.
 */
function whatOs() {
    var ua = navigator.userAgent;
    if (/(app_ios)/i.test(ua)) {
        return 'app_ios';
    } else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
        return 'ios';
    } else if (/(app_android)/i.test(ua)) {
        return 'app_android';
    } else if (/(android)/i.test(ua)) {
        return 'android';
    } else {
        return 'pc';
    }
}

function toast(msg) {
    var os = whatOs();
    if (os == 'ios') {
        mui.toast(msg);
    } else if (os == 'app_android') {
        window.gamebox.toast(msg);
    } else {
        mui.toast(msg);
    }
}

function orient() {
    var orient = window.orientation;
    if (typeof orient === 'undefined') {
        return (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
    } else {
        if (orient == 90 || orient == -90) {
            return 'landscape';
        } else if (orient == 0 || orient == 180) {
            return 'portrait';
        }
    }
}

function resetScreen() {
    var sm = this.orient();
    if (sm == 'landscape') {
        if ($('.ori-mask').length == 0) {
            var tip = '<div class="ori-mask"></div>';
            $('body').append(tip);
        }
    } else {
        if ($('.ori-mask').length > 0) {
            $('.ori-mask').remove();
        }
    }
}


var Tools = {
    error: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    success: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    toast: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    log: function (str) {
        if (config.DEBUG) {
            console.log(str);
        }
    },
    sleep: function (numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    },
    formatDate: function (str) {
        str = parseInt(str);
        var now = new Date(str);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        money = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    formatDateChinese: function (str) {
        str = parseInt(str);
        var now = new Date(str);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
    },
    diffDateChinese: function (time1, time2) {
        var total = (time2 - time1) / 1000;
        var hour = Math.floor(total / (60 * 60));
        var minute = Math.floor((total - hour * 60 * 60) / 60);
        var second = Math.floor(total % 60);
        return hour + "时" + minute + "分" + second + "秒";
    },
    null2Str: function (str) {
        return str || '';
    },
    parseInt: function (str) {
        return parseInt(str, 10);
    }
}