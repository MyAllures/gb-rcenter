(function() {

    // 每次keydown都更新的which，用来对比响应的keyup中的which，如果up和down的which不统一，则进行特殊处理
    var lastKeyDownWhich = -1;

    // 每次keydown的光标位置
    var lastPosition = -1;

    // 兼容IE8的indexOf
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (el) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === el) {
                    return i;
                }
            }
            return -1;
        };
    }

    var _setSelectionRange = function(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.setSelectionRange(selectionStart, selectionEnd);
        }
        else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    };

    var _setCaretToPos = function(input, pos) {
        _setSelectionRange(input, pos, pos);
    };

    // 阻止事件发生
    var preventDefault = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }

        // 支持IE
        else {
            e.returnValue = false;
        }
    };

    // 标注浏览器下获取光标位置
    // 1.勾选内容时返回[start,end]
    // 2.没有勾选内容时返回光标位置
    var getNormalCaret = function(el) {
        var start = el.selectionStart;
        var end = el.selectionEnd;

        // 没有勾选内容
        if (start === end) {
            return start;
        }

        // 勾选了内容
        return [start, end];
    };

    // 在IE下获取光标位置(不区分是否勾选)
    var getIECaret = function(el) {
        var start = 0;
        var range = el.createTextRange();
        var range2 = document.selection.createRange().duplicate();

        // get the opaque string
        var range2Bookmark = range2.getBookmark();

        // move the current range to the duplicate range
        range.moveToBookmark(range2Bookmark);

        var end = 0;

        // counts how many units moved (range calculated as before char and after char, loop count is the position)
        while (range.moveStart('character' , -1) !== 0) {
            start++;
        }

        while (range.moveStart('character' , 1) !== 0) {
            end++;
        }

        return start;
    };

    // 处理keydown
    var keyDownEventListener = function(e, curConfig, curEnableKeys) {
        var which = e.charCode ? e.charCode : e.keyCode;
        var target = e.target ? e.target : e.srcElement;

        // 更新最新的which
        lastKeyDownWhich = which;

        // 计算光标位置
        var position = target.selectionStart !== undefined ? getNormalCaret(target) : getIECaret(target);

        // 更新最新光标位置
        lastPosition = position;

        // 屏蔽shift、ctrl键
        if (e.shiftKey) {
            preventDefault(e);
            return;
        }
        if (e.ctrlKey) {

            // 开放ctrl+c、ctrl+v、ctrl+x
            if (which !== 67 && which !== 86 && which !== 88) {
                preventDefault(e);
                return;
            }
        }

        // FIXME 暂时放开限制，先让用户可以输入，以后再做优化
        // 从根本上禁止输入中文标点，但是会漏掉第一个，所以需要keyup事件配合使用
        // if (which === 229) {
        //     target.value = target.value.replace(/[^\x00-\xff]/g, "");
        //     preventDefault(e);
        //     return;
        // }

        if (curEnableKeys.indexOf(which) === -1 && which !== 13 && !e.ctrlKey) {
            preventDefault(e);
            return;
        }

        // 小数点不超过2个
        if ((which === 190 || which === 110) && target.value.indexOf(".") !== -1) {
            preventDefault(e);
            return;
        }

        // -不超过2位
        var selectedText = window.getSelection().toString();
        if ((which === 109 || which === 189 || which === 173) && (target.value.indexOf("-") !== -1) && !selectedText) {
            preventDefault(e);
            return;
        }

        // 小数位不超过指定长度
        var digits = target.value.split(".");

        // 有小数位&&小数位>=设置的长度&&只处理数字(功能键依然可用，比如删除)
        if (digits.length === 2 && digits[1].length >= curConfig.decimalSize && ((which >=48 && which <= 57) || (which >=96 && which <= 105))) {

            // 非勾选内容且光标位于小数点之后时，禁止输入
            if (typeof position === "number" && position > digits[0].length) {
                preventDefault(e);
                return;
            }
        }

        // 整数位不超过指定长度
        if (digits.length > 0 && digits[0].length >= curConfig.intSize && ((which >=48 && which <= 57) || (which >=96 && which <= 105))) {

            // 非勾选内容且光标位于小数点之后时，禁止输入
            if (typeof position === "number" && position <= curConfig.intSize) {
                preventDefault(e);

            }
        }
    };

    // 处理keyup
    var keyUpEventListener = function(e, curConfig, hasEqual) {
        var which = e.charCode ? e.charCode : e.keyCode;
        var target = e.target ? e.target : e.srcElement;
        var digits = target.value.split(".");
        
        // 删除输入的双字节字符
        if (/[^\x00-\xff]/g.test(target.value)) {
            target.value = target.value.replace(/[^\x00-\xff]/g, "");
        }

        // 删除中文输入法下按住shift+另一个键出现的特殊字符：~@#%&*+{}|
        else if (target.value.match(/~|@|#|%|&|\*|\+|\{|\}|\|/g)) {
            var matchChar = target.value.match(/~|@|#|%|&|\*|\+|\{|\}|\|/g);
            target.value = target.value.replace(new RegExp("\\" + matchChar[0], "g"), "");
        }

        // 处理中文输入法下的等号
        else if (!hasEqual && target.value.match(/=/g)) {
            target.value = target.value.replace(new RegExp("\\" + target.value.match(/=/g)[0], "g"), "");
        }

        // 如果输入不允许为-，则同时要删掉-号(在中文输入法下，依然能输入的-号)
        else if (target.value.match(/-/g) && !curConfig.negative) {
            target.value = target.value.replace(/-/g, "");
        }

        // 删除与-同一键位的_
        else if (/[_]/g.test(target.value)) {
            target.value = target.value.replace(/[_]/g, "");
        }

        // -只能出现在第一位
        else if (/^.+-.*$/.test(target.value)) {
            var tmp = target.value.substring(1);
            target.value = target.value.charAt(0) + tmp.replace(/[-]/g, "");
        }

        // 整数位不超过指定长度：当勾选了小数点，并将其替换为整数时的保险措施
        else if (digits.length > 0 && digits[0].length > curConfig.intSize) {
            target.value = target.value.substring(digits[0].length - curConfig.intSize);
        }

        // 处理特殊输入法下的keyup事件
        else if (lastKeyDownWhich === 229 && ((which >= 96 && which <= 105) || (which >= 48 && which <= 57) || which === 190 || which === 189 || which === 109 || which === 110)) {

            // 1.数字0-9
            if (which >= 48 && which <= 57) {
                target.value = target.value.substring(0, lastPosition) + "" + (which - 48) + "" + target.value.substring(lastPosition);

                // 移动光标
                _setCaretToPos(target, lastPosition + 1);
            }
            else if (which >= 96 && which <= 105) {
                target.value = target.value.substring(0, lastPosition) + "" + (which - 96) + "" + target.value.substring(lastPosition);

                // 移动光标
                _setCaretToPos(target, lastPosition + 1);
            }

            // 2.小数点
            else if (which === 190 || which === 110) {
                target.value = target.value.substring(0, lastPosition) + "." + target.value.substring(lastPosition);

                // 移动光标
                _setCaretToPos(target, lastPosition + 1);
            }

            // 2.负号
            else if (which === 189 || which === 109) {
              //  target.value = target.value.substring(0, lastPosition) + "-" + target.value.substring(lastPosition);

                // 移动光标
              //  _setCaretToPos(target, lastPosition + 1);
            }
        }

        // 针对粘贴最后的防线，将非数值的内容清空
        if (e.ctrlKey) {

            // 删除掉英文逗号
            target.value = target.value.replace(/,/g, "");

            if (isNaN(target.value)) {
                target.value = "";
            }
            else {
                var newIntStr = "";
                var newDecimalStr = "";

                // 处理过长的整数
                var oldIntStr = target.value.split(".")[0];
                newIntStr = oldIntStr;
                if (oldIntStr.length > curConfig.intSize) {
                    newIntStr = oldIntStr.substring(0, curConfig.intSize);
                }

                // 处理过长的小数
                if (target.value.split(".").length === 2) {
                    var oldDecimalStr = target.value.split(".")[1];
                    newDecimalStr = oldDecimalStr;

                    // 1.配置中无小数
                    if (!curConfig.decimal) {
                        newDecimalStr = ""
                    }

                    // 2.配置中有小数
                    else if (curConfig.decimal && oldDecimalStr.length > curConfig.decimalSize) {
                        newDecimalStr = oldDecimalStr.substring(0, curConfig.decimalSize);
                    }
                }

                // 新值
                target.value = newIntStr + (newDecimalStr ? "." : "") + newDecimalStr;
            }
        }
    };

    // 不可拖入内容
    var dropEventListener = function(e) {
        preventDefault(e);
    };

    // dom与事件监听的映射关系
    var eventMap = [];

    // 处理单个dom
    var handlePerDom = function(dom, curConfig, curEnableKeys, hasEqual) {

        // 处理keyDown事件
        var keyDownEvent = (function(curConfig, curEnableKeys){
            return function(e) {
                keyDownEventListener(e, curConfig, curEnableKeys);
            };
        })(curConfig, curEnableKeys);

        // 处理keyUp事件
        var keyUpEvent = (function(curConfig, curEnableKeys, hasEqual){
            return function(e) {
                keyUpEventListener(e, curConfig, hasEqual);
            };
        })(curConfig, curEnableKeys, hasEqual);

        if (dom.addEventListener) {
            dom.addEventListener("drop", dropEventListener, false);
            dom.addEventListener("keydown", keyDownEvent, false);
            dom.addEventListener("keyup", keyUpEvent, false);
        }

        // 支持IE
        else {
            dom.attachEvent("ondrop", dropEventListener);
            dom.attachEvent("onkeydown", keyDownEvent);
            dom.attachEvent("onkeyup", keyUpEvent);
        }

        // 保存dom与事件监听映射关系
        var domEvent = {dom: dom, keyDownEvent: keyDownEvent, keyUpEvent: keyUpEvent};
        eventMap.push(domEvent);
    };

    // 初始化配置信息
    var initConfig = function(config) {

        // 默认配置
        var defaultConfig = {

            // 是否可为负
            negative: true,

            // 是否可为小数
            decimal: true,

            // 整数位数
            intSize: 12,

            // 小数位数
            decimalSize: 4
        };

        // 组装自定义配置与当前默认配置
        if (config) {
            for (var attr in config) {
                if (config.hasOwnProperty(attr)) {
                    defaultConfig[attr] = config[attr];
                }
            }
        }

        return defaultConfig;
    };

    // 初始化可用键位
    var initEnableKeys = function(config) {

        // 可以输入的键：数字、退格、删除、左右、home、end
        var enableKeys = [48,49,50,51,52,53,54,55,56,57,8,46,37,39,35,36,96,97,98,99,100,101,102,103,104,105];

        // 可为负数(189,firefox:173)
        if (config.negative) {

            // 大键盘的负号
            enableKeys.push(189);

            // 小键盘的负号
            enableKeys.push(109);

            enableKeys.push(173);
        }

        // 可为小数(190、110)
        if (config.decimal) {
            enableKeys.push(190);
            enableKeys.push(110);
        }

        return enableKeys;
    };

    // 解绑响应事件
    var clearPerDom = function(dom) {
        for (var i = 0; i < eventMap.length; i++) {
            if (dom === eventMap[i].dom) {
                if (dom.removeEventListener) {
                    dom.removeEventListener("drop", dropEventListener, false);
                    dom.removeEventListener("keydown", eventMap[i].keyDownEvent, false);
                    dom.removeEventListener("keyup", eventMap[i].keyUpEvent, false);
                }

                // 支持IE
                else {
                    dom.detachEvent("ondrop", dropEventListener);
                    dom.detachEvent("onkeydown", eventMap[i].keyDownEvent);
                    dom.detachEvent("onkeyup", eventMap[i].keyUpEvent);
                }
            }
        }

        // TODO 从集合中删除映射关系

    };

    var inputNumber = {

        // 初始化
        init: function(domObj, config, hasEqual) {

            // 初始化配置信息
            var curConfig = initConfig(config);

            // 初始化可用键位
            var curEnableKeys = initEnableKeys(curConfig);

            // 判断是否为jquery对象
            // jquery对象
            if (jQuery && domObj instanceof jQuery) {
                for (var i = 0; i < domObj.length; i++) {

                    // 禁用右键菜单
                    domObj.eq(i).bind("contextmenu", function(e) {
                        e.preventDefault();
                    });

                    handlePerDom(domObj.eq(i)[0], curConfig, curEnableKeys, hasEqual);
                }
            }

            // 原生dom
            else {
                // 判断dom是单个还是多个
                // 多个
                if (domObj.tagName === undefined) {
                    for (var i = 0; i < domObj.length; i++) {
                        handlePerDom(domObj[i], curConfig, curEnableKeys, hasEqual);
                    }
                }
                else {
                    handlePerDom(domObj, curConfig, curEnableKeys, hasEqual);
                }
            }
        },

        // 清理事件监听
        clear: function(domObj) {

            // jquery对象
            if (jQuery && domObj instanceof jQuery) {
                for (var i = 0; i < domObj.length; i++) {
                    clearPerDom(domObj.eq(i)[0]);
                }
            }

            // 原生
            else {
                // 判断dom是单个还是多个
                // 多个
                if (domObj.tagName === undefined) {
                    for (var i = 0; i < domObj.length; i++) {
                        clearPerDom(domObj[i]);
                    }
                }
                else {
                    clearPerDom(domObj);
                }
            }
        }
    };

    // 支持AMD
    if ( typeof define === "function" && define.amd ) {
        define(function() {
            return inputNumber;
        });
    }
    else {
        window.inputNumber = inputNumber;
    }
})();