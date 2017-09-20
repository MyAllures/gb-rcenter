/**
 * 公告定时上下滚动
 * Created by fei on 16-11-27.
 */
function startMarquee(lh, speed, delay) {
    var p = false;
    var t;
    var o = document.getElementById("marquee-box");
    o.innerHTML += o.innerHTML;
    o.style.marginTop = 0;
    o.onmouseover = function () {
        p = true;
    };
    o.onmouseout = function () {
        p = false;
    };

    function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
    }

    function scrolling() {
        if (parseInt(o.style.marginTop) % lh != 0) {
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) o.style.marginTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }

    setTimeout(start, delay);
}
startMarquee(22, 22, 2000);
