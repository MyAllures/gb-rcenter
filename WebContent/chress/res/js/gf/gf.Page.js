var BasePage = Base.extend({
    engine: null,
    initParam: null,
    constructor: function () {
        this.engine = new GfEngine();
        this.initParam = this.engine.getUrlParam();
    },
    init: function () {

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
    }
});