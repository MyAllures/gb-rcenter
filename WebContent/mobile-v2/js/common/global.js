/**
 * Created by fei on 16-10-19.
 */
function whatOs() {
    var ua = navigator.userAgent;
    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
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