/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
var config = {
    DEBUG: false,
    ToastTimeLength: 1500
};
var Tools = {
    error: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    success: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    toast: function (str) {
        if (typeof(str) == "string") {
            alert(str);
        }
    },
    log: function (str) {
        if (config.DEBUG) {
            console.log(str);
        }
    },
    sleep: function (numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    },
    formatDate: function (str) {
        str = parseInt(str);
        var now = new Date(str);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();

        money = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    formatDateChinese: function (str) {
        str = parseInt(str);
        var now = new Date(str);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        return year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
    },
    diffDateChinese: function (time1, time2) {
        var total = (time2 - time1) / 1000;
        var hour = Math.floor(total / (60 * 60));
        var minute = Math.floor((total - hour * 60 * 60) / 60);
        var second = Math.floor(total % 60);
        return hour + "时" + minute + "分" + second + "秒";
    },
    null2Str: function (str) {
        return str || '';
    },
    parseInt: function(str) {
        return parseInt(str, 10);
    }
};

var ajaxRequest = function (obj) {
    var data = [];
    if (typeof obj.data != "undefined") {    //typeof 可以用来检测给定变量的数据类型，可能的返回值：1. 'undefined' --- 这个值未定义
        data = obj.data;
    }

    var requestStr = obj.url;
    if (requestStr.indexOf("?") > 0) {   //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
        requestStr += "&";
    } else {
        requestStr += "?";
    }
    
    var type = 'POST';
    if (typeof obj.type != 'undefined') {
        type = obj.type;
    }

    var dataType = 'json';
    if (typeof obj.dataType != 'undefined') {
        dataType = obj.dataType;
    }

    var async = true;
    if (typeof obj.async != 'undefined') {
        async = obj.async;
    }

    requestStr += "t=" + new Date().getTime();
    $.ajax({
        type: type,
        url: requestStr,
        dataType: dataType,
        async:async,
        data: data,
        timeout: 60000,
        success: function (json) {
            Tools.log(requestStr + "-success:");
            Tools.log(json);

            if (typeof(obj.success) == "function") {
                obj.success(json);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (typeof (obj.error) == "function") {
                obj.error(XMLHttpRequest, textStatus, errorThrown);
                return;
            }
            Tools.log(requestStr + "-error");
            Tools.log({
                "XMLHttpRequest": XMLHttpRequest,
                "textStatus": textStatus,
                "errorThrown": errorThrown
            });
            var state = XMLHttpRequest.getResponseHeader("headerStatus") || XMLHttpRequest.status;
            if (state == 600) {//Session过期
                window.top.location.replace("/");
            }
            if (textStatus == 'timeout') {
                // Tools.toast("操作超时，请联系管理员");
            } else {
                // Tools.toast("服务器异常，请联系管理员");
            }
        },
        beforeSend: function () {
            Tools.log(requestStr + "-beforeSend");
            if (typeof(obj.beforeSend) == "function") {
                obj.beforeSend();
            }
        },
        complete: function (XMLHttpRequest,textStatus) {
            Tools.log(requestStr + "-complete");
            if (typeof(obj.complete) == "function") {
                obj.complete(XMLHttpRequest,textStatus);
            }
        }
    });
};

function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
    var c = 0, d = a.toString(), e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
function getRequest(url) {
    var theRequest = [];
    if (url.indexOf("?") != -1) {   //如果要检索的字符串值没有出现，则该方法返回 -1
        var str = url.substr(url.indexOf("?") + 1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest.push({
                key: strs[i].split("=")[0],
                value: unescape(strs[i].split("=")[1])
            });
        }
    }
    return theRequest;
}


//获取重复元素
Array.prototype.duplicateNewPk10 = function () {
    var tempArr = new Array();
    var lastArr =[];
    for(i = 0; i < this.length; i++) {
        if(containtArrPk10(lastArr,this[i])){
            tempArr.push(this[i]);
        }else{
            lastArr.push(this[i]);
        }
    }
    return tempArr;
};


function containtArrPk10(newArr,item){
    for(var j=0;j<newArr.length;j++){
        var a=[];
        var b=[];
        a.push(newArr[j].charAt(0));
        a.push(newArr[j].charAt(1));
        a.push(newArr[j].charAt(2));
        a.push(newArr[j].charAt(3));


        b.push(item.charAt(0));
        b.push(item.charAt(1));
        b.push(item.charAt(2));
        b.push(item.charAt(3));

        if (item.length==3){
            a.push(newArr[j].charAt(2));
            b.push(item.charAt(2));
        }

        if(newArr[j].length ==item.length &&  a.join("")==b.join("")){
            return true;
        }
    }
    return false;
}

//获取重复元素
Array.prototype.duplicateNew = function () {
    var tempArr = new Array();
    var lastArr =[];
    for(i = 0; i < this.length; i++) {
        if(containtArr(lastArr,this[i])){
            tempArr.push(this[i]);
        }else{
            lastArr.push(this[i]);
        }
    }
    return tempArr;
};
//去掉数组重复
Array.prototype.uniqueArr = function () {
    var temp = new Array();
    this.sort();
    for(i = 0; i < this.length; i++) {
        if( this[i] == this[i+1]) {
            continue;
        }
        temp[temp.length]=this[i];
    }
    return temp;
};
//去掉数组重复保留数组顺序
Array.prototype.uniqueArrByzx = function () {
    var tempArr = new Array();
    var lastArr =[];
    for(i = 0; i < this.length; i++) {
        if(containtArr(lastArr,this[i])){
            tempArr.push(this[i]);
        }else{
            lastArr.push(this[i]);
        }
    }
    return lastArr;
};
//获取重复元素,无序
Array.prototype.duplicateNewa = function () {
    var tempArr = new Array();
    var lastArr =[];
    for(i = 0; i < this.length; i++) {
        if(containtArra(lastArr,this[i])){
            tempArr.push(this[i]);
        }else{
            lastArr.push(this[i]);
        }
    }
    return tempArr;
};
//删除无序数组的重复值，并返回删除的重复数组和新数组
Array.prototype.sortArrayUnique = function () {
    var res = [];
    var json = {};
    var tempAr = [];
    for(var i = 0; i < this.length; i++){
        this[i].split('').sort()
        this[i] = this[i].split('').sort().join('')
    }
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            tempAr.push(this[i]);
            json[this[i]] = 1;
        } else {
            res.push(this[i]);
        }
    }
    return [tempAr, res];
}
// 删除有序数组的重复值，并返回删除的重复数组和新数组
Array.prototype.arrayUnique = function () {
    var res = [];
    var json = {};
    var tempAr = [];
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            tempAr.push(this[i]);
            json[this[i]] = 1;
        } else {
            res.push(this[i]);
        }
    }
    return [tempAr, res];
}
/*function containtArr(newArr,item){
    for(var j=0;j<newArr.length;j++){
        var a=[];
        var b=[];
        a.push(newArr[j].charAt(0));
        a.push(newArr[j].charAt(1));
        a.push(newArr[j].charAt(2));
        a.push(newArr[j].charAt(3));
        a.push(newArr[j].charAt(4));


        b.push(item.charAt(0));
        b.push(item.charAt(1));
        b.push(item.charAt(2));
        b.push(item.charAt(3));
        b.push(item.charAt(4));

        if (item.length==3){
            a.push(newArr[j].charAt(2));
            b.push(item.charAt(2));
        }

        if(newArr[j].length ==item.length &&  a.join("")==b.join("")){
            return true;
        }
    }
    return false;
}*/


function containtArr(newArr, item) {
    for (var j = 0; j < newArr.length; j++) {
        var a = [];
        var b = [];
        a.push(newArr[j].charAt(0));
        a.push(newArr[j].charAt(1));
        a.push(newArr[j].charAt(2));
        a.push(newArr[j].charAt(3));
        a.push(newArr[j].charAt(4));
        b.push(item.charAt(0));
        b.push(item.charAt(1));
        b.push(item.charAt(2));
        b.push(item.charAt(3));
        b.push(item.charAt(4));
        if (item.length == 3) {
            a.push(newArr[j].charAt(2));
            b.push(item.charAt(2))
        }
        if (newArr[j].length == item.length && a.join("") == b.join("")) {
            return true
        }
    }
    return false
}



function containtArra(newArr,item){

    for(var j=0;j<newArr.length;j++){
        var a=[];
        var b=[];
        a.push(newArr[j].charAt(0));
        a.push(newArr[j].charAt(1));

        b.push(item.charAt(0));
        b.push(item.charAt(1));
        if (item.length==3){
        a.push(newArr[j].charAt(2));
        b.push(item.charAt(2));
        }

        if(newArr[j].length ==item.length &&  a.sort().join("")==b.sort().join("")){
            return true;
        }
    }
    return false;
}
//去掉数组重复,无序
Array.prototype.uniqueArra = function() {
    var tempArr = new Array();
    var lastArr =[];
    for(i = 0; i < this.length; i++) {
        if(containtArra(lastArr,this[i])){
            tempArr.push(this[i]);
        }else{
            lastArr.push(this[i]);
        }
    }
    return lastArr;
}
//对数字字符串排序
function  numSort(num) {
    var newnum = "";
    if (typeof(num) != "undefined") {
        var tempArr = [];
        for (j = 0; j < num.length; j++) {
            tempArr.push(num[j]);
        }
        tempArr.sort();

        for (k = 0; k < tempArr.length; k++) {
            newnum = newnum + tempArr[k]
        }
    }else {
        newnum = "undefined";
    }
    return newnum;
}
//数组的无序排序
function  arrSort(num) {
    var tempArr = [];
    if (typeof(num) != "undefined") {
        for (q = 0; q < num.length; q++) {
            tempArr.push(numSort(num[q]));
        }
        tempArr.sort();
    }else {
        tempArr = "undefined";
    }
    return tempArr;
}
//查找数据中重复元素
Array.prototype.duplicate=function() {
    var tmp = [];
    this.concat().sort().sort(function(a,b){
        if(a==b && tmp.indexOf(a) === -1) tmp.push(a);
    });
    return tmp;
}
/**
 * 获得从m中取n的所有组合
 */
function getFlagArrs(arr, num) {
    if (arr.length < num) {
        return [];
    }
    var list = [];
    var sb = "";
    var b = [];
    for (var i = 0; i < arr.length; i++) {
        if (i < num) {
            b[i] = "1";
        } else
            b[i] = "0";
    }

    var point = 0;
    var nextPoint = 0;
    var count = 0;
    var sum = 0;
    var temp = "1";
    while (true) {
        // 判断是否全部移位完毕
        for (var i = b.length - 1; i >= b.length - num; i--) {
            if (b[i] == "1")
                sum += 1;
        }
        // 根据移位生成数据
        for (var i = 0; i < b.length; i++) {
            if (b[i] == "1") {
                point = i;
                sb += arr[point];
                sb += " ";
                count++;
                if (count == num)
                    break;
            }
        }
        // 往返回值列表添加数据
        list.push(sb);

        // 当数组的最后num位全部为1 退出
        if (sum == num) {
            break;
        }
        sum = 0;

        // 修改从左往右第一个10变成01
        for (var i = 0; i < b.length - 1; i++) {
            if (b[i] == "1" && b[i + 1] == "0") {
                point = i;
                nextPoint = i + 1;
                b[point] = "0";
                b[nextPoint] = "1";
                break;
            }
        }
        // 将 i-point个元素的1往前移动 0往后移动
        for (var i = 0; i < point - 1; i++)
            for (var j = i; j < point - 1; j++) {
                if (b[i] == "0") {
                    temp = b[i];
                    b[i] = b[j + 1];
                    b[j + 1] = temp;
                }
            }
        // 清空 StringBuffer
        sb = "";
        count = 0;
    }
    for (var i = 0; i < list.length; ++i) {
        list[i] = $.trim(list[i]);
    }
    return list;
}

function windowOpenBlank(url) {
    window.open(url,'_blank');
}

function windowOpen(url, title, width, height) {
    var top = (window.screen.height-30-height)/2; //获得窗口的垂直位置;
    var left = (window.screen.width-10-width)/2; //获得窗口的水平位置;
    var win = window.open(url, title,'height='+height+',innerHeight='+height+',width='+width+',innerWidth='+width+',top='+top+',left='+left+',fullscreen=1,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    win.focus();
}

// 生肖号码计算
// var sx = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
// var sxArr = [];
// // var startIndex = (new Date('<fmt:formatDate value="${serverTime}" pattern="yyyy-MM-dd HH:mm:ss"/>')).getFullYear() % 12;
// var date = new Date();
// var year = date.getFullYear();  //表示年份的四位数字
// if (date.getTime() < (new Date('2017-1-28 00:00:00')).getTime()) {
//     year = 2016;
// }
// var startIndex = year % 12;
// for (var i = startIndex, count = 0; count < 12; i = (i + 1) % 12, ++count) {
//     sxArr[count] = {
//         name: sx[i],
//         number: null
//     };
// }
// sxArr[0].number = [1, 13, 25, 37, 49];
// sxArr[1].number = [12, 24, 36, 48];
// sxArr[2].number = [11, 23, 35, 47];
// sxArr[3].number = [10, 22, 34, 46];
// sxArr[4].number = [9, 21, 33, 45];
// sxArr[5].number = [8, 20, 32, 44];
// sxArr[6].number = [7, 19, 31, 43];
// sxArr[7].number = [6, 18, 30, 42];
// sxArr[8].number = [5, 17, 29, 41];
// sxArr[9].number = [4, 16, 28, 40];
// sxArr[10].number = [3, 15, 27, 39];
// sxArr[11].number = [2, 14, 26, 38];
// function getSxName(value) {
//     for (var i = 0; i < sxArr.length; ++i) {
//         var name = sxArr[i].name;
//         for (var j = 0; j < sxArr[i].number.length; ++j) {
//             if (sxArr[i].number[j] == parseInt(value)) {
//                 return name;
//             }
//         }
//     }
//     return "";
// }
// function getSxValue(name) {
//     for (var i = 0; i < sxArr.length; ++i) {
//         var sxName = sxArr[i].name;
//         if (name == sxName) {
//             return sxArr[i].number;
//         }
//     }
//     return [];
// }

// 红绿蓝
var hongboArr = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
var lanboArr = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
var lvboArr = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];
var getBose = function (value) {
    for (var i = 0; i < hongboArr.length; ++i) {
        if (hongboArr[i] == parseInt(value)) {
            return 0;
        }
    }
    for (var j = 0; j < lanboArr.length; ++j) {
        if (lanboArr[j] == parseInt(value)) {
            return 1;
        }
    }
    for (var i = 0; i < lvboArr.length; ++i) {
        if (lvboArr[i] == parseInt(value)) {
            return 2;
        }
    }
};
function toFixed(value, scale, isUp) {
    if (isUp) {
        return value.toFixed(scale);
    } else {
        for (var i = 0; i < scale; ++i) {
            value *= 10;
        }
        value = parseInt(value);
        for (var i = 0; i < scale; ++i) {
            value /= 10;
        }
        return value.toFixed(scale);
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}