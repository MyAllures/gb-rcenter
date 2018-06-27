var Demo = BasePage.extend({
    init: function () {
        this.base();
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            }
        });
    },
    showUser1: function () {
        $("#ftl2div").attr("ftl-bind","{'ftlId':'user_table','url':'DemoApiUrl.getUserMsg1'}");
        this.initFtl($("#ftl2div"));

        $("#ftl1div").attr("ftl-bind","{'ftlId':'user_msg','url':'DemoApiUrl.getUserMsg'}");
        this.initFtl($("#ftl1div"));
    },
    submit:function () {
        var the = this;
        var data = the.pullValue("ftl1div");
        console.log(data);
    }
});