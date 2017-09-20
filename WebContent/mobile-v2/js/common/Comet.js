var comet = (function (document, undefined) {
    /** 请求参数名：同步 */
    var SYNCHRONIZE_KEY = "_S_COMET";
    /** 同步值：创建连接 */
    var CONNECTION_VALUE = "C";
    /** 同步值：断开连接 */
    var DISCONNECT_VALUE = "D";
    /** 返回参数名：连接ID */
    var CONNECTIONID_KEY = "_C_COMET";
    /** 请求参数名：消息订阅类型 */
    var SUBSCRIBE_TYPE = "_S_TYPE";
    /** 同步值：消息订阅 */
    var SUBSCRIBE_VALUE = "R";
    var url = null;
    /**connection id*/
    var cid = null;

    /** 连接的语言类型参数名 */
    var LOCALE_TYPE = "_LOCALE_TYPE";
    /** 连接的sessionID 参数名**/
    var SESSION_KEY = "_SESSION_KEY";
    var async = true;
    /** 是否在连接状态 */
    var isConnect = false;
    /**订阅列表**/
    var subscribes = [];
    /** 连接所需要传递的参数 **/
    var userParam = {};
    /**实例化后是否立即执行连接操作**/
    var isImmediatelyConnect = false;
    /**连接成功后的回调函数**/
    var successCallBack = function () {
    };
    /**连接失败后的回调函数**/
    var failureCallBack = function () {
    };

    var accept = function (data) {
        var message;
        if (typeof(data) == "object") {
            message = data;
        } else {
            message = eval("(" + data + ")");
        }
        if (!(message._S_COMET && message._S_COMET == "S")) {//只处理非连接超时消息。
            console.info("收到消息,消息内容为：" + data);
            var subscribeType = message.subscribeType;
            Zepto.each(subscribes, function (i, val) {
                if (val.type == subscribeType) {
                    console.info("收到订阅类型为" + subscribeType + "的消息，调用回调函数" + val.callBack + ",入参为：" + data);
                    val.callBack.call(val, data);
                    return false;
                }
            })
        }
    };
    var $ = function (props) {
        return $.init(props);
    };

    /**
     * 构造器
     * @param props 参数对象
     */
    $.init = function (props) {
        url = props.url;
        if (props.async != undefined) {
            async = props.async;
        }
        if (props.accept != undefined) {
            accept = props.accept;
        }
        if (props.success != undefined) {
            successCallBack = props.success;
        }
        if (props.failure != undefined) {
            failureCallBack = props.failure;
        }
        if (props.failure != undefined) {
            isImmediatelyConnect = props.isImmediatelyConnect;
        }
        if (props.localeType != undefined) {
            userParam[LOCALE_TYPE] = props.localeType;
        }
        if (props.sessionKey != undefined) {
            userParam[SESSION_KEY] = props.sessionKey;
        }
        userParam[SYNCHRONIZE_KEY] = CONNECTION_VALUE;
        if (isImmediatelyConnect) {
            connection();
        }
    };

    /**
     * 判断订阅类型是否已存在于订阅列表中
     * @param subscribeType 订阅类型对象 type 订阅类型（此类型可自定义），callBack 回调函数{type:type,callBack:callBack}
     * @returns {boolean} 返回此订阅类型是否已订阅
     */
    function isSubscribed(subscribeObj) {
        var flag = false;
        Zepto.each(subscribes, function (i, val) {
            if (val.type == subscribeObj.subscribeType && val.callBack.name == subscribeObj.callBack.name) {
                flag = true;
                return false;
            }
        });
        return flag;
    }

    /**
     *  获取订阅列表中所有订阅类型的type值，用逗号隔开
     * @returns {string} 已订阅的所有类型的type值
     */
    function getSubscribeTypes() {
        var subscribeTypes = "";
        Zepto.each(subscribes, function (i, val) {
            subscribeTypes += val.type + ",";
        });
        if (subscribeTypes.length > 0) {
            subscribeTypes = subscribeTypes.substr(0, subscribeTypes.length - 1);
        }
        return subscribeTypes;
    }

    /**
     * 消息订阅
     * @param subscribeObj 订阅类型对象 type 订阅类型（此类型可自定义），callBack 回调函数{type:type,callBack:callBack}
     *
     */
    function _genSubscribes(subscribeObj) {
        var subscribed = isSubscribed(subscribeObj);
        if (!subscribed) {
            var subscribe = {};
            subscribe.type = subscribeObj.subscribeType;
            subscribe.callBack = subscribeObj.callBack;
            subscribes.push(subscribe);
        }
    }

    $.subscribeMsg = function (subscribeType, callBack) {
        var subscribeObj = {subscribeType: subscribeType, callBack: callBack};
        _genSubscribes(subscribeObj);
        _subscribeMsg();
    };

    $.subscribeMsgs = function subscribeMsgs(subscribeArr) {
        Zepto.each(subscribeArr, function (i, val) {
            _genSubscribes(val);
        });
        _subscribeMsg();
    };

    function _subscribeMsg() {
        var subscribeTypes = getSubscribeTypes();
        var userParam = {};
        userParam[SYNCHRONIZE_KEY] = SUBSCRIBE_VALUE;
        userParam[SUBSCRIBE_TYPE] = subscribeTypes;
        userParam[CONNECTIONID_KEY] = cid;
        mui.ajax(url, {
            data: userParam,
            type: 'GET',
            crossDomain: true,
            comet: true,
            success: function (result) {
                if (result == "success") {
                    console.info("订阅成功" + subscribeTypes);
                } else {
                    console.info(result);
                }
            }
        });
    }

    /**
     * 开始链接
     *
     * @param userParam 连接时传递给服务器端的参数
     * @param successCallBack 连接成功处理方法
     * @param failureCallBack 连接失败处理方法
     * @param caller 调用者
     */
    function connection(caller) {
        mui.ajax(url, {
            type: 'POST',
            data: userParam,
            crossDomain: true,
            success: function (result) {
                if (result) {
                    var data = eval("(" + result + ")");
                    cid = data[CONNECTIONID_KEY];
                    caller = caller ? caller : null;
                    if (null == cid) { // 拒接连接
                        if (failureCallBack) {
                            failureCallBack.call(caller);
                        }
                    } else { // 连接成功
                        if (successCallBack) {
                            successCallBack.call(caller);
                        }
                        isConnect = true;
                        polling(cid);
                    }
                }

            },
            error: function (param) {
                //连接失败后重试，10秒一次
                setTimeout(function () {
                    connection();
                }, 10000);
            }
        });
    }

    /** 轮询 */
    function polling(cid) {
        if (!isConnect) {
            return;
        }
        var param = {};
        param[CONNECTIONID_KEY] = cid;
        mui.ajax(url, {
            type: 'GET',
            data: param,
            crossDomain: true,
            success: function (result) {
                if (result && result != "") {
                    var datas = eval("(" + result + ")");
                    acceptDatas(datas);
                } else {
                    //返回值为空时重新建立连接
                    setTimeout(function () {
                        connection();
                    }, 10000);
                }
            },
            error: function (param) {
                //服务器连接不上，重新建立连接
                if (param.status == 0) {
                    userParam[CONNECTIONID_KEY] = cid;
                    connection();
                }
                //本地连接超时，继续轮询
                //TODO Mark 此处无法判断状态值是否是504,503连接超时，待处理
                if (param.status == 504 || param.status == 503) {
                    polling();
                }
            }
        });
    }

    function acceptDatas(datas) {
        // 接受的最后一个消息
        var lastData = datas[datas.length - 1];
        // 如果是断开连接
        var disconnect = isDisconnectObj(lastData);
        var len = datas.length;
        if (disconnect) {
            len--;
        }
        if (!disconnect) {// 如果不是断开连接，继续轮询
            if (async) {// 如果是异步处理
                polling(cid);
                acceptDatasByLength(datas, len);
            } else {
                acceptDatasByLength(datas, len);
                polling(cid);
            }
        } else {
            acceptDatasByLength(datas, len);
        }
    }

    function isDisconnectObj(o) {
        return o[SYNCHRONIZE_KEY] == DISCONNECT_VALUE;
    }

    /**
     * 处理数组中指定长度的数据
     */
    function acceptDatasByLength(datas, len, disconnect) {
        for (var i = 0; i < len; i++) {
            var data = datas[i];
            accept(data, subscribes);
        }
    }

    /** 断开连接 */
    function disconnect(userParam, callback, caller) {
        var param = userParam ? userParam : {};
        param[SYNCHRONIZE_KEY] = DISCONNECT_VALUE;
        param[CONNECTIONID_KEY] = cid;
        isConnect = false;
        var _this = this;
        mui.ajax(url, {
            type: 'GET',
            data: param,
            crossDomain: true,
            success: function (result) {
                caller = caller ? caller : null;
                if (callback) {
                    callback.call(caller);
                }
            }
        });
    }

    return $;
})(document);