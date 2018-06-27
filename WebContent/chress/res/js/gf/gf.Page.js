var BasePage = Base.extend({
    engine: null,
    initParam: null,
    apiMap: null,
    constructor: function (apiMap) {
        this.engine = new GfEngine();
        this.initParam = this.engine.getUrlParam();
        this.apiMap = apiMap;
    },
    init: function () {
        var the = this;
        $("[ftl-bind]").each(function (i, item) {
            var ftlBind = $(item).attr("ftl-bind");
            if (ftlBind) {
                var cfg = eval("(" + ftlBind + ")");
                $(item).empty();
                var dataCfg = the.convertData(cfg);
                var url = the.convertUrl(cfg);
                var data = the.doPostSync(url, dataCfg);
                var htmlStr = the.formatFtl(cfg.ftlId, data);
                $(item).html(htmlStr);
            }
        });
        //增加绑定事件。。。todo
    },
    pullValue: function (formId) {
        //从区域中获取json
        return this.engine.pullValue(formId);
    },
    formatFtl: function (ftlid, data) {
        //加载解析laytpl模板
        return this.engine.formatFtl(ftlid, data);
    },
    doPostSync: function (apiKey, data) {
        //post同步调用api
        return this.engine.doPostSync(apiKey, data);
    },
    doPostAsync: function (apiKey, data, callBack) {
        //post异步调用api
        this.engine.doPostAsync(apiKey, data, callBack);
    },
    convertUrl: function (cfg) {
        var urlKey = cfg.url;
        var keys = urlKey.split(".");
        var url = window;
        for (var k = 0; k < keys.length; k++) {
            url = url[keys[k]];
        }
        return url;
    },
    convertData: function (cfg) {
        var the = this;
        var dataCfg = cfg.data;
        if (dataCfg) {
            for (var i in dataCfg) {
                if (the.initParam[dataCfg[i]]) {
                    if(the.initParam[dataCfg[i]]){
                        dataCfg[i] = the.initParam[dataCfg[i]];
                    }
                }
            }
        }
        return dataCfg;
    }
});