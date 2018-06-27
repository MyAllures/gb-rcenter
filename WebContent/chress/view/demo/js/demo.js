var Demo = BasePage.extend({
    init: function () {
        this.base();
    },
    showUser1: function () {
        var the = this;
        var data = the.doPostSync(DemoApiUrl.getUserMsg1, null);
        $("#user_show").empty();
        var htmlStr = the.formatFtl("user_table", data);
        $("#user_show").html(htmlStr);
    },
    submit:function () {
        var the = this;
        var data = the.pullValue("user_show");
        console.log(data);
    }
});