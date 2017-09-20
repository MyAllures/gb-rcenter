/**
 * Created by jessie on 16-7-20.
 */
function serialize(form) {
    var parts = [],
        field = null,
        option,
        optValue;

    for (var i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];

        switch (field.type) {
            case "select-one":
            case "select-multiple":

                if (field.name.length) {
                    for (var j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttributes) {
                                optValue = ((option.hasAttributes("value")) ? option.value : option.text);
                            } else {
                                optValue = (option.attributes("value").specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;

            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}

/**
 * 异常信息处理
 */
$(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.loading) {
        $('div.preloader').hide();
    }
    if (xhr.status == 600) {//Session过期
        window.top.location.href = root;
    }
    else if (xhr.status == 601) {//需要权限密码验证
        _this.checkPrivilege({
            owner: window,
            type: 0,
            eventTarget: settings.eventTarget,
            eventCall: settings.eventCall
        });
    }
    else if (xhr.status == 606) {//踢出
        window.top.location.href = root + "/errors/" + xhr.status + ".html";
    } else if (xhr.status == 608) {
        toast(message.common['repeat.request.error']);
    }
    else if (_this.errorPages.indexOf(xhr.status) >= 0 && settings.comet != true) {//服务器忙
        if (!settings.error) {
            window.top.location.href = root + "/errors/" + xhr.status + ".html";
        }
    }
    else if (!settings.error && xhr.status != 200 && xhr.status != 0) {
        if (settings.comet == true) {
            toast(message.common['online.message.error']);
        } else {
            toast(message.common['server.error']);
        }
        if (settings.eventTarget) {
            $(settings.eventTarget).unlock();
        }
    }
});

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 设置cookie
function setCookie(name,value,time) {
    if (time == 0) {
        document.cookie = name + "=" + escape(value) + ";expires=0";
    } else {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
}

function getsec(str) {
    if (str == 0) return 0;
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s")
        return str1*1000;
    else if (str2=="h")
        return str1*60*60*1000;
    else if (str2=="d")
        return str1*24*60*60*1000;
}

// 获取cookie
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}