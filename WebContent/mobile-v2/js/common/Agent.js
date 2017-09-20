$(".agent-text table").wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control mui-segmented-control-inverted'><div class='mui-scroll'></div></div>");

mui.init();
mui(".scroll2").scroll();

var agent_text = $("[href*='#agent']");
for (var i = 0; i < agent_text.size(); i++) {
    agent_text.get(i).addEventListener("tap", function () {
        setTimeout(setHeight, 100);
    }, false);
}

window.onresize = function () {
    setHeight();
};

function setHeight () {
    var tables = $(".scroll2 table");
    for (var i = 0; i < tables.size(); i++) {
        var scrollHeight = $(tables.get(i)).height();
        $(tables.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
    }
    $('.agent-text').css({'height':'auto'});
}