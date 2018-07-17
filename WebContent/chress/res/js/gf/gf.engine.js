//gameBox front Engine
function GfEngine() {
}

GfEngine.prototype = {
    //解析url参数
    getUrlParam: function () {
        var url = window.location.href;
        var arr1 = url.split("?");
        var obj = {};//声明对象
        if(arr1[1]){
            var params = arr1[1].split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i].split("=");
                obj[param[0]] = param[1];//为对象赋值
            }
        }
        return obj;
    },
    //解析模板
    formatFtl: function (renderId, data) {
        var ftlArea = document.getElementById("ftl");
        if (ftlArea == null || ftlArea == undefined) {
            console.error("未找到id=ftl的引入模板");
        }
        var tmp = ftlArea["import"].getElementById(renderId);
        if (tmp == null || tmp == undefined) {
            console.error("模板中未找到" + renderId + "的内容");
        }
        var jsRenderTpl = $.templates(tmp);
        return jsRenderTpl.render(data);
    },
    //获取表单的信息
    pullValue: function (eleId) {
        var the = this;
        var data = {};
        $("#" + eleId).find("input").each(function (i, item) {
            var i_type = $(item).attr("type");
            var i_name = $(item).attr("name")
            var obj = data[i_name];
            if (i_type === 'text' || i_type === 'hidden') {
                obj = the.getInputValue(obj, item);
            }
            else if (i_type === 'radio' || i_type === 'checkbox') {
                obj = the.getRadioValue(obj, item);
            }
            data[i_name] = obj;
        });
        $("#" + eleId).find("select").each(function (i, item) {
            var i_type = $(item).attr("type");
            var i_name = $(item).attr("name")
            var obj = data[i_name];
            obj = the.getSelectValue(obj, item);
            data[i_name] = obj;
        });
        return data;
    },
    getRadioValue: function (val, obj) {
        var the = this;
        if ($(obj).is(':checked')) {
            return the.convertValue($(obj).val(), val);
        } else {
            return val;
        }
    },
    getInputValue: function (val, obj) {
        var the = this;
        var theValue = $(obj).val();
        return the.convertValue(theValue, val);
    },
    getSelectValue: function (val, obj) {
        var the = this;
        var theValue = $(obj).val();
        return the.convertValue(theValue, val);
    },
    convertValue: function (newValue, oldValue) {
        if (oldValue == null) {
            return newValue;
        }
        if (oldValue instanceof Array) {
            oldValue.push(newValue);
            return oldValue;
        } else {
            var arr = [];
            arr.push(oldValue);
            arr.push(newValue);
            return arr;
        }
    },
    doPostSync: function (url, data) {
        var the = this;
        var result = null;
        $.ajax({
            url: url,
            async: false,
            type: "POST",
            dataType: "json",
            data: data,
            success: function (rst) {
                result = rst;
            }, error: function (xhr, type, errorThrown) {
                //根据状态码统一处理
                the.ajaxError(xhr, type, errorThrown);
            }
        });
        return result;
    },
    doPostAsync: function (url, data, callback) {
        $.ajax({
            url: url,
            async: true,
            type: "POST",
            data: data,
            success: function (rst) {
                if (callback && typeof callback === "function") {
                    callback.apply(this, rst);
                }
            }, error: function (xhr, type, errorThrown) {
                //根据状态码统一处理
                the.ajaxError(xhr, type, errorThrown);
            }
        });
    },
    ajaxError: function (xhr, type, error) {
        var status = xhr.getResponseHeader("headerStatus") || xhr.status;
        if (status == 600) {//Session过期 跳转登录页面

        } else if (status == 606) {// 踢出

        } else if (status == 608) {

        } else if (status >= 0) { //606、403、404、605等状态码跳转页面

        } else if (status != 200 && status != 0) {
        } else {
            console.log(error.context);
        }
    }
}