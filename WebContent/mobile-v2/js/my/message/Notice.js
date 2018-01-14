/**
 * Created by bill on 16-12-10.
 */
define(['common/MobileBasePage'], function (Mobile) {
    var pageNumberGame = 2;
    var pageNumberSys = 1;
    var pageNumberSite1 = 1;
    var pageNumberSite2 = 1;
    var t;
    var gameType="";
    var gameStartTime="";
    var gameEndTime="";
    var sysStartTime="";
    var sysEndTime="";
    var popoverType="noticeGame";
    var isload = false;
    return Mobile.extend({
        init: function (formSelector) {
            this._super();
            t = this;
        },
        onPageLoad: function () {
            this._super();
            t = this;
            mui.init({
                swipeBack: true //启用右滑关闭功能
            });
            mui('.popover-scroll').scroll();
            mui('body').on('shown', '.mui-popover', function(e) {
                if(e.detail.id=='advisoryType') {
                    $("input[name='result.advisoryTitle']").blur();
                    $("textarea[name='result.advisoryContent']").blur();
                    $("input[name='captcha']").blur();
                }
            });
            mui('body').on('hidden', '.mui-popover', function(e) {
            });
            //主体内容滚动条
            // mui('.mui-scroll-wrapper').scroll({
            //     deceleration: 0.0008 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            // });
            mui('#noticeGameScroll').pullRefresh({
                container: '#noticeGameScroll',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.my_auto['上拉加载'],
                    contentrefresh: window.top.message.my_auto["正在加载"],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.my_auto['已经到底了'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: t.gameNotice
                }
            });
            mui("#noticeSysScroll").pullRefresh({
                container: '#noticeSysScroll',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.my_auto['上拉加载'],
                    contentrefresh: window.top.message.my_auto["正在加载"],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.my_auto['已经到底了'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: t.sysNotice
                }
            });
            mui("#noticeSite1Scroll").pullRefresh({
                container: '#noticeSite1Scroll',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.my_auto['上拉加载'],
                    contentrefresh: window.top.message.my_auto["正在加载"],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.my_auto['已经到底了'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: t.site1Notice
                }
            });
            mui("#noticeSite2Scroll").pullRefresh({
                container: '#noticeSite2Scroll',
                up: {
                    height: 100,//可选.默认50.触发上拉加载拖动距离
                    contentdown: window.top.message.my_auto['上拉加载'],
                    contentrefresh: window.top.message.my_auto["正在加载"],//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: window.top.message.my_auto['已经到底了'],//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: t.site2Notice
                }
            });
            mui("#sendMessageScroll").scroll();
            $(window).bind("pageshow",function () {
                if(isload)
                    t.unReadCount();
                isload = true ;
            });

            if($("#hidden_input").val()!="")
                t.unReadCount();
            t.unReadMessage();
        },
        bindEvent: function () {
            this._super();
            t = this;
            var item1=false,item2=false, item3 = false;//用来判断是否已经加载
            var eitem1=false, eitem2=false, eitem3 = false;//用来判断是否已经加载
            var format = dateFormat.day;
            //设置开始时间选择器(游戏公告页)
            mui("body").on("tap", "#gameBeginTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#gameBeginTime").val(),
                    beginDate: new Date($("#gameBeginTime").attr("minDate")),
                    endDate: new Date($("#gameEndTime").attr("endTime")),
                    labels: [window.top.message.my_auto['年'], window.top.message.my_auto['月'], window.top.message.my_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = t.formatDateTime(new Date(e.value),format);
                    $("#gameBeginTime").val(day);
                    gameStartTime = day;
                    gameEndTime = $("#gameEndTime").val();
                    t.gameNotice(true);
                    t.showProcess();
                    //结束时间不能小于开始时间
                    if(new Date($("#gameEndTime").val()).getTime()<new Date(e.value).getTime())
                        $("#gameEndTime").val(day);
                    dtpicker.dispose();
                })
            });
            //设置结束时间选择器(游戏公告页)
            mui("body").on("tap", "#gameEndTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#gameEndTime").val(),
                    beginDate: new Date($("#gameBeginTime").val()),
                    endDate: new Date($("#gameEndTime").attr("endTime")),
                    labels: [window.top.message.my_auto['年'], window.top.message.my_auto['月'], window.top.message.my_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = t.formatDateTime(new Date(e.value),format);
                    $("#gameEndTime").val(day);
                    gameStartTime = $("#gameBeginTime").val();
                    gameEndTime = day;
                    t.gameNotice(true);
                    t.showProcess();
                    dtpicker.dispose();
                })
            });
            //设置开始时间选择器(系统公告页)
            mui("body").on("tap", "#sysBeginTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#sysBeginTime").val(),
                    beginDate: new Date($("#sysBeginTime").attr("minDate")),
                    endDate: new Date($("#sysEndTime").attr("endTime")),
                    labels: [window.top.message.my_auto['年'], window.top.message.my_auto['月'], window.top.message.my_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = t.formatDateTime(new Date(e.value),format);
                    $("#sysBeginTime").val(day);
                    sysStartTime = day;
                    sysEndTime = $("#sysEndTime").val();
                    t.sysNotice(true);
                    dtpicker.dispose();
                    t.showProcess();
                    //结束时间不能小于开始时间
                    if(new Date($("#sysEndTime").val()).getTime()<new Date(e.value).getTime())
                        $("#sysEndTime").val(day);
                })
            });
            //设置结束时间选择器(系统公告页)
            mui("body").on("tap", "#sysEndTime", function () {
                var dtpicker = new mui.DtPicker({
                    "type": "date",
                    "value": $("#sysEndTime").val(),
                    beginDate: new Date($("#sysBeginTime").val()),
                    endDate: new Date($("#sysEndTime").attr("endTime")),
                    labels: [window.top.message.my_auto['年'], window.top.message.my_auto['月'], window.top.message.my_auto['日']]//设置默认标签区域提示语
                });
                dtpicker.show(function (e) {
                    var day = t.formatDateTime(new Date(e.value),format);
                    $("#sysEndTime").val(day);
                    sysStartTime = $("#sysBeginTime").val();
                    sysEndTime = day;
                    t.sysNotice(true);
                    t.showProcess();
                    dtpicker.dispose();
                })
            });
            //点击一级选项卡时切换页面
            mui('#segmentedControl1').on('tap', 'a', function (e) {
                var href = this.getAttribute("data-href");
                var controlItems = document.getElementsByClassName("mui-control-content");
                t.changeBlur();
                for (var i = 0; i < controlItems.length; i++) {
                    if (controlItems[i].getAttribute("name") == "notice") {
                        if (controlItems[i].getAttribute("id") == href) {
                            controlItems[i].classList.add("mui-active");
                            if (href == "noticeSys" ) {
                                if(!item2)
                                    t.sysNotice(false);
                                popoverType = "noticeSys";
                                item2 = true;
                            } else if (href == "noticeSite" ) {
                                if(!item3)
                                    t.site1Notice();
                                item3 = true;
                            } else if (href == 'noticeGame') {
                                if(!item1)
                                    t.gameNotice(true);
                                popoverType = "noticeGame";

                                item3 = true;
                            }
                        } else {
                            controlItems[i].classList.remove("mui-active");
                        }
                    }
                }
            });
            //点击二级选项卡时切换页面
            mui('#segmentedControl2').on('tap', 'a', function (e) {
                var href = this.getAttribute("data-href");
                var controlItems = document.getElementsByClassName("mui-control-content");
                t.changeBlur();
                for (var i = 0; i < controlItems.length; i++) {
                    if (controlItems[i].getAttribute("name") == "noticeSite") {
                        if (controlItems[i].getAttribute("id") == href) {//判断是显示还是隐藏
                            controlItems[i].classList.add("mui-active");
                            if (href == "noticeSite2" ) {
                                if(!eitem2)
                                    t.site2Notice(!eitem2);
                                eitem2 = true;
                            }
                            if (href == "noticeSite3") {
                                if(!eitem3)
                                    t.sendMessage();
                                eitem3 = true;
                            }
                            if (href == "noticeSite1") {
                                if(!eitem1)
                                    t.site1Notice();
                                eitem1 = true;
                            }
                        } else {
                            controlItems[i].classList.remove("mui-active");
                        }
                    }
                }
            });
            /**
             * 发送消息提交
             */
            mui("body").on('tap', '#advisorySubmit', function (e) {
                var advisoryType = document.getElementsByName("result.advisoryType");
                var advisoryTitle = document.getElementsByName("result.advisoryTitle");
                var advisoryContent = document.getElementsByName("result.advisoryContent");
                var captcha = document.getElementsByName("captcha");
                if (advisoryType[0].value == "")
                    t.toast(window.top.message.my_auto["请选择类型"]);
                else if (advisoryTitle[0].value == "")
                    t.toast(window.top.message.my_auto["标题不能为空"]);
                else if (advisoryTitle[0].value.length < 4 || advisoryTitle[0].value.length > 100)
                    t.toast(window.top.message.my_auto["标题长度"]);
                else if (advisoryContent[0].value == "")
                    t.toast(window.top.message.my_auto["内容不能为空"]);
                else if (advisoryContent[0].value.length<10)
                    t.toast(window.top.message.my_auto["内容长度"]);
                else {
                    var data = $('#messageForm').serialize();
                    if($('#captcha_div').css("display") == "block" && (captcha[0].value == "" || captcha[0].value.length!=4)){
                        t.toast(window.top.message.my_auto["验证码格式错误"]);
                        return;
                    }
                    t.showProcess();
                    mui.ajax(root + "/message/sendMessage.html", {
                        type: 'post',//HTTP请求类型
                        timeout: 20000,//超时时间设置为10秒；
                        data: data,
                        dataType: "json",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Soul-Requested-With': 'XMLHttpRequest'
                        },
                        success: function (data) {
                            if (data.state) {
                                t.toast(window.top.message.my_auto['提交成功']);
                                t.formReset();
                                eitem2 = false;
                            }else{
                                if(data.msg == 'captchaError'){
                                    t.toast(window.top.message.my_auto['验证码有误']);
                                }else
                                    t.toast(window.top.message.my_auto["提交失败"]);
                            }
                            var captcha_img = $('._captcha_img');
                            var _src = captcha_img.data("src");
                            captcha_img.attr("src", _src);
                            if(data.isOpenCaptcha){
                                $('#captcha_div').css('display','block');
                            }
                            document.getElementsByName("gb.token")[0].setAttribute("value",data.token);
                            t.dismissProgress();
                        },
                        error: function (e) {
                            if(e.status == 608)
                                t.toast(window.top.message.my_auto["请勿重复提交"]);
                            else
                                t.toast(window.top.message.my_auto["提交失败"]);
                            //异常处理；
                            console.log(e);
                            t.dismissProgress();
                        }
                    });
                }
            });
            $('body').on('tap', '#advisoryReset', function (e) {
                t.formReset();
            });
            //点击游戏类型时
            mui('#popover').on('tap', 'a', function (e) {

                t.showProcess();
                mui('#popover').popover('toggle');//show hide toggle
                gameType = e.target.getAttribute('value');
                var displayGameType=document.getElementById("displayGameType");
                var typeHtml = this.innerHTML;
                displayGameType.innerText=typeHtml;
                var data = {
                    "paging.pageNumber": 1,
                    "search.startTime": $("#gameBeginTime").val(),
                    "search.endTime": $("#gameEndTime").val(),
                    "search.apiId": gameType
                };
                pageNumberGame = t.pullRefreshUp(root + "/message/gameNotice.html", "noticeGamePartial", 1, "gameLastPageNumber", mui("#noticeGameScroll"), data, true);
            });
            //系统消息的删除和标记已读
            $('#noticeSite1').on('tap', 'button', function (e) {
                $("[name='site1_allCheck'] >span").removeClass("on");
                if (this.getAttribute("name") == "delete") {
                    var ids = t.getSelectIdsArray("site1_check").join(",");
                    if (ids == '') {
                        t.toast(window.top.message.my_auto["请选择需要删除的记录"]);
                    } else {
                        mui.ajax({
                            type: "post",
                            url: root + "/message/deleteNoticeReceived.html",
                            data: {"ids": ids},
                            dataType: 'json',
                            success: function (data) {
                                if (data.state) {
                                    t.toast(window.top.message.my_auto['删除成功']);
                                    t.unReadCount();
                                    var data = {"paging.pageNumber": 1};
                                    pageNumberSite1 = t.pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial",
                                        1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, true);
                                }
                            }
                        });
                    }
                } else if (this.getAttribute("name") == "editStatus") {
                    var ids = t.getSelectIdsArray("site1_check").join(",");
                    if (ids == '') {
                        t.toast(window.top.message.my_auto["请选择消息记录"]);
                    } else {
                        mui.ajax({
                            type: "post",
                            url: root + "/message/systemMessageEditStatus.html",
                            data: {"ids": ids},
                            dataType: 'json',
                            success: function (data) {
                                if (data.state) {
                                    t.toast(window.top.message.my_auto['标记成功']);
                                    t.unReadCount();
                                    var data = {"paging.pageNumber": 1};
                                    pageNumberSite1 = t.pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial",
                                        1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, true);
                                }
                            }
                        });
                    }
                }
            });
            //我的消息的删除和标记已读
            $('#noticeSite2').on('tap', 'button', function (e) {
                $("[name='site2_allCheck'] >span").removeClass("on");
                if (this.getAttribute("name") == "delete") {
                    var ids = t.getSelectIdsArray("site2_check").join(",");
                    if (ids == '') {
                        t.toast(window.top.message.my_auto["请选择需要删除的记录"]);
                    } else {
                        mui.ajax({
                            type: "post",
                            url: root + "/message/deleteAdvisoryMessage.html",
                            data: {"ids": ids},
                            dataType: 'json',
                            success: function (data) {
                                if (data.state) {
                                    t.toast(window.top.message.my_auto['删除成功']);
                                    t.unReadCount();
                                    var data = {"paging.pageNumber": 1};
                                    pageNumberSite2 = t.pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial",
                                        1, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, true);
                                }
                            }
                        });
                    }
                } else if (this.getAttribute("name") == "editStatus") {
                    var ids = t.getSelectIdsArray("site2_check").join(",");
                    if (ids == '') {
                        t.toast(window.top.message.my_auto["请选择消息记录"]);
                    } else {
                        mui.ajax({
                            type: "post",
                            url: root + "/message/getSelectAdvisoryMessageIds.html",
                            data: {"ids": ids},
                            dataType: 'json',
                            success: function (data) {
                                if (data.state) {
                                    t.toast(window.top.message.my_auto['标记成功']);
                                    t.unReadCount();
                                    var data = {"paging.pageNumber": 1};
                                    pageNumberSite2 = t.pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial",
                                        1, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, true);
                                }
                            }
                        });
                    }
                }
            });
            //点击全选
            mui("form").on('tap', 'a', function (e) {
                var name = this.getAttribute("name");
                if (name == "site1_allCheck") {
                    if (this.firstChild.className == "gb-checkbox2 on") {
                        t.changeStatus("site1_check", false);
                        this.firstChild.classList.remove("on");
                    } else {
                        t.changeStatus("site1_check", true);
                        this.firstChild.classList.add("on");
                    }
                }
                if (name == "site2_allCheck") {
                    if (this.firstChild.className == "gb-checkbox2 on") {
                        t.changeStatus("site2_check", false);
                        this.firstChild.classList.remove("on");
                    } else {
                        t.changeStatus("site2_check", true);
                        this.firstChild.classList.add("on");
                    }
                }
                if (name == "site1_check" || name == "site2_check") {
                    if (this.className == "gb-radio on") {
                        this.classList.remove("on");
                    } else {
                        this.classList.add("on");
                    }
                }
            });
            //选择发送消息类型
            mui('#advisoryType').on('tap', 'a', function (e) {
                var displayType = document.getElementById("displayType");
                var inputType = document.getElementsByName("result.advisoryType");
                inputType[0].setAttribute('value', this.getAttribute('value'));
                displayType.innerText = this.innerHTML;
                mui('#advisoryType').popover('toggle');
            });
            //日期快选
            mui('#selectDate').on('tap','a',function(){
                mui('#selectDate').popover('toggle');
                var dateValue=this.getAttribute("value");
                t.showProcess();
                var dateTime=t.getDatePopover(dateValue).split("&");
                if(new Date(dateTime[0]).getTime()<new Date($("#gameBeginTime").attr("minDate")).getTime())
                    dateTime[0] = $("#gameBeginTime").attr("minDate");
                if(new Date(dateTime[1]).getTime()<new Date(dateTime[0]).getTime())
                    dateTime[1]=dateTime[0];
                //共用一个popover
                if(popoverType == 'noticeGame'){
                    $("#gameBeginTime").val(dateTime[0]);
                    $("#gameEndTime").val(dateTime[1]);
                    gameStartTime = dateTime[0];
                    gameEndTime = dateTime[1];
                    t.gameNotice(true);
                }else if( popoverType == 'noticeSys'){
                    $("#sysBeginTime").val(dateTime[0]);
                    $("#sysEndTime").val(dateTime[1]);
                    sysStartTime = dateTime[0];
                    sysEndTime = dateTime[1];
                    t.sysNotice(true);
                }
            });
            mui("body").on("tap","[data-url] ",function () {
                var _href=$(this).data("url");
                t.gotoUrl(_href);
                $("#hidden_input").val("isClick");
            });
            //获取验证码
            mui("body").on("tap", "._captcha_img", function (e) {
                var $this = $(this);
                var _src = $this.data("src");
                $this.attr("src", _src);
            });

        },

        unReadMessage: function() {
            var t = this;
            var unReadType = $('#unReadType').attr("value");
            if(unReadType == 'sysMessage'){
                t.site1Notice();
                eitem1 = true;
            }else if(unReadType == 'advisoryMessage'){
                t.site2Notice(true);
                eitem2 = true;
            }else if(unReadType == 'sendMessage'){
                t.sendMessage();
                eitem3 = true;
            }else if(unReadType == 'noticeSys') {
                t.sysNotice(true);
            }
        },

        /**
         * 获取游戏公告
         */
        gameNotice: function (isReload) {
            if(isReload)
                pageNumberGame = 1;
            var data = {"paging.pageNumber": pageNumberGame, "search.startTime": gameStartTime, "search.endTime": gameEndTime,"search.apiId": gameType};
            pageNumberGame = t.pullRefreshUp(root + "/message/gameNotice.html", "noticeGamePartial", pageNumberGame, "gameLastPageNumber", mui("#noticeGameScroll"), data, isReload);
        },
        /**
         * 获取系统公告
         */
        sysNotice: function (isReload) {
            if(isReload)
                pageNumberSys = 1;
            var data = {"paging.pageNumber": pageNumberSys,"search.startTime": sysStartTime, "search.endTime": sysEndTime};
            pageNumberSys = t.pullRefreshUp(root + "/message/systemNotice.html", "noticeSysPartial", pageNumberSys, "sysLastPageNumber", mui("#noticeSysScroll"), data, isReload);

        },
        /**
         * 获取站点消息1
         */
        site1Notice: function () {
            var data = {"paging.pageNumber": pageNumberSite1};
            pageNumberSite1 = t.pullRefreshUp(root + "/message/messageList.html", "noticeSite1Partial", pageNumberSite1, "site1LastPageNumber", mui("#noticeSite1Scroll"), data, false);
        },
        /**
         * 获取站点消息2
         */
        site2Notice: function (isReload) {
            if(isReload)
                pageNumberSite2=1;
            var data = {"paging.pageNumber": pageNumberSite2};
            pageNumberSite2 = t.pullRefreshUp(root + "/message/advisoryMessage.html", "noticeSite2Partial", pageNumberSite2, "site2LastPageNumber", mui("#noticeSite2Scroll"), data, isReload);
        },
        /**
         * 获取发送消息页
         */
        sendMessage: function () {
            mui.ajax(root + "/message/beforeSendMessage.html", {
                type: 'get',//HTTP请求类型
                timeout: 10000,//超时时间设置为10秒；
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                success: function (data) {
                    var info = document.getElementById("sendMessage");
                    info.innerHTML = data;
                    pageNumberSite2 = 1;
                    if($('#unReadType').attr("value")=="sendMessage"){
                        $('#displayType').text(window.top.message.my_auto['优惠申请']);
                        $("input[name='result.advisoryType']").val("offerApplication");
                    }
                },
                error: function (e) {
                    t.toast(window.top.message.my_auto['加载失败']);
                    //异常处理；
                    console.log(e);
                }
            });
        },
        getSelectIdsArray: function (name) {
            var checkedItems = [], counter = 0;
            var site_check = document.getElementsByName(name);
            for (var i = 0; i < site_check.length; i++) {
                if (site_check[i].className == "gb-radio on") {
                    checkedItems[counter] = site_check[i].getAttribute("value");
                    counter++;
                }
            }
            return checkedItems;
        },
        changeStatus: function (name, isChecked) {
            var site_check = document.getElementsByName(name);
            for (var i = 0; i < site_check.length; i++) {
                if (isChecked) {
                    if (site_check[i].className == "gb-radio")
                        site_check[i].classList.add("on");
                } else {
                    if (site_check[i].className == "gb-radio on")
                        site_check[i].classList.remove("on");
                }
            }
        },

        formReset : function () {
            $('#messageForm').get(0).reset();
            document.getElementsByName("result.advisoryType")[0].setAttribute("value","");
            document.getElementById("displayType").innerText = window.top.message.my_auto['请选择'];
        },
        /**
         * 显示未读消息数量
         */
        unReadCount : function () {
            mui.ajax(root + "/message/unReadCount.html", {
                type: 'get',//HTTP请求类型
                timeout: 20000,//超时时间设置为10秒；
                dataType: "json",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                success: function (data) {
                    var totalCount = data.sysMessageUnReadCount+data.advisoryUnReadCount;
                    if(totalCount>0)
                        $("[data-href='noticeSite']").html(window.top.message.my_auto['站点消息'] + "<span class='unread-count-icon'></span><i></i>");
                    else
                        $("[data-href='noticeSite']").html(window.top.message.my_auto['站点消息'] + "<i></i>");
                    if(data.sysMessageUnReadCount > 0)
                        $("[data-href='noticeSite1']").html(window.top.message.my_auto['系统消息'] + "<span class='unread2-count-icon'></span>");
                    else
                        $("[data-href='noticeSite1']").html(window.top.message.my_auto['系统消息']);
                    if(data.advisoryUnReadCount > 0)
                        $("[data-href='noticeSite2']").html(window.top.message.my_auto['我的消息'] + "<span class='unread2-count-icon'></span>");
                    else
                        $("[data-href='noticeSite2']").html(window.top.message.my_auto['我的消息']);
                },
                error: function (e) {
                    t.toast(window.top.message.my_auto['加载失败']);
                }
            });
        },
         changeBlur : function () {
             if(document.activeElement)
                 document.activeElement.blur();
         }
    });
});