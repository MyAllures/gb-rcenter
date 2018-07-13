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
            the.initFtl(item, the.initParam);
        });
    },
    initFtl: function (item, paramData) {
        var the = this;
        var ftlBind = $(item).attr("ftl-bind");
        if (ftlBind) {
            var cfg = eval("(" + ftlBind + ")");
            $(item).empty();
            var dataCfg = the.convertData(cfg, paramData);
            var url = the.convertUrl(cfg);
            if(url!=null){
                var data = the.doPostSync(url, dataCfg);
                var htmlStr = the.formatFtl(cfg.ftlId, data);
                $(item).html(htmlStr);
            }
        }
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
        var urlKey = cfg.urlKey;
        if (urlKey && urlKey.length > 0) {
            var keys = urlKey.split(".");
            var url = window;
            for (var k = 0; k < keys.length; k++) {
                url = url[keys[k]];
            }
            return url;
        }
        return null;
    },
    convertData: function (cfg, paramData) {
        var dataCfg = cfg.data;
        if (dataCfg) {
            for (var i in dataCfg) {
                if (paramData[dataCfg[i]]) {
                    if (paramData[dataCfg[i]]) {
                        dataCfg[i] = paramData[dataCfg[i]];
                    }
                }
            }
        }
        return dataCfg;
    }
});