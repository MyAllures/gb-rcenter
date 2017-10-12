var extractFunc = null;
$(function () {
    "use strict";

    // 底部信息调用
    function ajaxGetDbxx() {
        ajaxRequest({
            url: config.basePath + "ajaxGetWebInfo.json",
            success: function (json) {
                if (json.result != 1) {
                    return;
                }
                $(".webDbxx").html(json.webDbxx);
            }
        });
    }

    if ($(".webDbxx").length > 0) {
        ajaxGetDbxx();
    }

    // 使用template.helper(name, callback)注册公用辅助方法
    template.helper('dateFormat', function (date, format) {
        return dateFormat(date, format);
    });

    // 返回按钮
    $(".bar-nav .fanhui").click(function () {

        if ($.config.router == true) {
            $.router.back();
        } else {
            back();
        }
    });

    // 购彩返回按钮
    $(".bar-nav .gcfanhui").click(function () {
        window.location.href = config.basePath + "main.html";
    });

    // 首页
    $(".bar-nav .shouye").click(function () {
        // $.router.back()
        window.location.href = config.basePath + "main.html";
    });

    function back() {
        // history.back();
        window.history.back = function () {
            return;
        }
        history.go(-1);
    }

    // 修复表单不focus问题
    $(".item-input").click(function () {
        if ($(this).find("input").length == 1) {
            $(this).find("input").focus()
        }
    });

    // 去除input空格
    $("input").keyup(function () {
        $(this).val($(this).val().replace(/^\s+|\s+$/g, ""));
    });


    // 优惠页面
    $(document).on("pageInit", "#page-yhhd", function (e, id, page) {
        $(".detail-cont").click(function () {
            var htmlStr = "";
            var id_yhhd = $(this).attr("data-id");
            htmlStr += "<div class='app-list-box'>" + $(".yhhd_" + id_yhhd + " div:first-child").html();
            htmlStr += "<div class='list-content'>";
            htmlStr += "<div class='pic-yhhd'>";
            htmlStr += $(".yhhd_" + id_yhhd + " .list-pic").html();
            htmlStr += "</div>";
            htmlStr += "<div>";
            htmlStr += $(".yhhd_" + id_yhhd + " .list-content").html();
            htmlStr += "</div>";
            htmlStr += "</div></div>";
            $(".content").html(htmlStr);
        });
    });

    // 注册页面
    $(document).on("pageInit", "#page-register", function (e, id, page) {
        $("#btn-register").click(function () {
            var account = $("input[name='account']").val(); // 账号
            var password = $("input[name='password']").val();   // 密码
            var confirmPassword = $("input[name='confirmPassword']").val(); // 确认密码
            var name = $("input[name='name']").val();   // 姓名

            if (!account) {
                Tools.alert("请输入用户名");
                return;
            }

            if (!account.match(/^[a-zA-Z][0-9a-zA-Z]{5,11}$/)) {
                Tools.alert("请输入以字母开头的6-12位字母、数字组成的用户名");
                return;
            }

            if (!password) {
                Tools.alert("请输入密码");
                return;
            }

            if (!password.match(/^[0-9a-zA-Z]{6,12}$/)) {
                Tools.alert("请输入6-12位字母、数字的密码");
                return;
            }

            if (!confirmPassword) {
                Tools.alert("请输入确认密码");
                return;
            }

            if (confirmPassword != password) {
                Tools.alert("确认密码不正确");
                return;
            }

            if (!name) {
                Tools.alert("请输入姓名");
                return;
            }

            if (!name.match(/^[\u4e00-\u9fa5]+$/)) {
                Tools.alert("姓名只能是汉字");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxRegister.json",
                data: {
                    account: account,
                    password: $.md5(password),
                    name: name,
                    agentId: Tools.getCookie("agentId")
                },
                beforeSend: function () {
                    Tools.showLoading("注册中...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        setUserToken(json.userId, json.token);
                        // Tools.toastRedirect("注册成功，正在跳转到首页", 3000, config.basePath);

                        // 保存登录名
                        Tools.setCookie("loginFormAccount", account, {path: "/"});
                        Tools.alertCallback("注册成功", function () {
                            window.location.href = config.basePath;
                        });
                        return;
                    }

                    if (json.result == -6) {
                        Tools.alertCallback("注册成功，请前往登录", function () {
                            window.location.href = config.basePath + "login.html";
                        });

                        // 保存登录名
                        Tools.setCookie("loginFormAccount", account, {path: "/"});
                        return;
                    }

                    Tools.toast("注册失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    // 登录页面
    $(document).on("pageInit", "#page-login", function (e, id, page) {
        // 读取cookie中的用户名
        var account = Tools.getCookie("loginFormAccount");
        if (account) {
            $("input[name='account']").val(account);
        }

        $("#btn-login").click(function () {
            var account = $("input[name='account']").val(); // 账号
            var password = $("input[name='password']").val();   // 密码

            if (!account) {
                Tools.alert("请输入用户名");
                return;
            }

            // if (!account.match(/^[a-zA-Z][0-9a-zA-Z]{5,11}$/)) {
            //     Tools.alert("用户不存在");
            //     return;
            // }

            // if (!password) {
            //     Tools.alert("请输入密码");
            //     return;
            // }

            // if (!password.match(/^[0-9a-zA-Z]{6,12}$/)) {
            //     Tools.alert("密码错误");
            //     return;
            // }

            ajaxRequest({
                url: config.basePath + "member/ajaxLogin.json",
                data: {
                    account: account,
                    password: $.md5(password)
                },
                beforeSend: function () {
                    Tools.showLoading("登录中...");
                    clearUserToken();
                },
                success: function (json) {
                    if (json.result == 1) {
                        setUserToken(json.userId, json.token);
                        // Tools.toastRedirect("登录成功，正在跳转到首页", 3000, config.basePath);

                        // Tools.alertCallback("登录成功", function() {
                        //     window.location.href = config.basePath;
                        // });
                        var refer = getQueryString("refer");
                        if (refer) {
                            window.location.href = refer;
                        } else {
                            window.location.href = config.basePath + "main.html";
                        }

                        // 保存登录名
                        Tools.setCookie("loginFormAccount", account, {path: "/"});
                        return;
                    }

                    Tools.toast("登录失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });

        $("#btn-shiwan").click(function () {
            shiwan();
        });
    });

    function shiwan() {
        ajaxRequest({
            url: config.basePath + "shiwan.json",
            beforeSend: function () {
                Tools.showLoading("登录中...");
                clearUserToken();
            },
            success: function (json) {
                if (json.result == 1) {
                    setUserToken(json.userId, json.token);
                    Tools.alertCallback("游客盘口只供试玩，与正式会员盘口无关", function () {
                        window.location.href = config.basePath;
                    });
                    return;
                }

                Tools.toast("登录失败：" + json.description);
            },
            error: function (a, b, c) {
                if (b == 'timeout') {
                    Tools.toast("操作超时，请稍后重试");
                    return;
                }

                Tools.toast("请求错误，请稍后重试");
            },
            complete: function () {
                Tools.hideLoading();
            }
        });
    }

    // 首页
    $(document).on("pageInit", "#page-index", function (e, id, page) {

        // 首页图片轮播
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });

        // // 公告滚动
        // var mySwiper = new Swiper('.swiper-container', {
        //     pagination: '.swiper-pagination',
        //     autoplay: 2000,
        //     speed:1000,
        //     direction: 'vertical'
        // });

        // $(".cl-4 .swiper-container .swiper-wrapper .swiper-slide").click(function () {
        //     layer.open({
        //         title: [
        //             $(this).attr("data-title") + '<a href="javascript:void(0)" onclick="layer.closeAll()" style="float:right;color: #fff;">X</a>',
        //             ''
        //         ]
        //         , content: "<span style='display: inline-block;float: left;padding-left:1.1rem;padding-bottom: 0.5rem'>" + $(this).attr("data-content") + "</span>"
        //     });
        //
        //     $(".layui-m-layercont").css({"padding":"0.2rem!important",});
        //     $(".layui-m-anim-scale .layui-m-layercont p").css({"float":"left"});
        //
        // });

        function renderAllData(data) {
            var str = '';
            str += '<ul>';

            var htmlArr = [];
            $.each(data, function (index, value) { //函数用于遍历指定的对象和数组
                if (!value.lastOpenData) {
                    return;
                }

                var playGroupId = Tools.parseInt(value.playGroupId);
                if ($.inArray(playGroupId, [1, 2, 3]) >= 0) {
                    var obj = {};

                    obj.lastOpenTime = value.lastOpenTime;
                    obj.playGroupId = playGroupId;
                    obj.number = value.lastOpenNumber;

                    var numArr = value.lastOpenData.split(",");
                    var num1 = Tools.parseInt(numArr[0]);
                    var num2 = Tools.parseInt(numArr[1]);
                    var num3 = Tools.parseInt(numArr[2]);
                    var num4 = Tools.parseInt(numArr[3]);
                    var num5 = Tools.parseInt(numArr[4]);

                    obj.num1 = num1;
                    obj.num2 = num2;
                    obj.num3 = num3;
                    obj.num4 = num4;
                    obj.num5 = num5;

                    var sum = num1 + num2 + num3 + num4 + num5;
                    obj.sum = sum;

                    obj.ds = sum % 2 == 0 ? '双' : '单';
                    obj.dx = 0 <= sum && sum <= 22 ? '小' : '大';
                    var cha = num1 - num5;
                    obj.lh = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                    var html = template("template_" + playGroupId, obj);
                    htmlArr.push(html);
                } else if ($.inArray(playGroupId, [6]) >= 0) {
                    var obj = {};

                    obj.lastOpenTime = value.lastOpenTime;
                    obj.playGroupId = playGroupId;
                    obj.number = value.lastOpenNumber;


                    var numArr = value.lastOpenData.split(",");
                    var num1 = Tools.parseInt(numArr[0]);
                    var num2 = Tools.parseInt(numArr[1]);
                    var num3 = Tools.parseInt(numArr[2]);
                    var num4 = Tools.parseInt(numArr[3]);
                    var num5 = Tools.parseInt(numArr[4]);
                    var num6 = Tools.parseInt(numArr[5]);
                    var num7 = Tools.parseInt(numArr[6]);

                    obj.num1 = num1;
                    obj.num2 = num2;
                    obj.num3 = num3;
                    obj.num4 = num4;
                    obj.num5 = num5;
                    obj.num6 = num6;
                    obj.num7 = num7;

                    obj.sx1 = getSxName(num1);
                    obj.sx2 = getSxName(num2);
                    obj.sx3 = getSxName(num3);
                    obj.sx4 = getSxName(num4);
                    obj.sx5 = getSxName(num5);
                    obj.sx6 = getSxName(num6);
                    obj.sx7 = getSxName(num7);

                    obj.bose1 = getBose(num1);
                    obj.bose2 = getBose(num2);
                    obj.bose3 = getBose(num3);
                    obj.bose4 = getBose(num4);
                    obj.bose5 = getBose(num5);
                    obj.bose6 = getBose(num6);
                    obj.bose7 = getBose(num7);

                    var html = template("template_" + playGroupId, obj);
                    htmlArr.push(html);
                } else if ($.inArray(playGroupId, [9]) >= 0) {
                    var obj = {};

                    obj.lastOpenTime = value.lastOpenTime;
                    obj.playGroupId = playGroupId;
                    obj.number = value.lastOpenNumber;


                    var numArr = value.lastOpenData.split(",");
                    var num1 = Tools.parseInt(numArr[0]);
                    var num2 = Tools.parseInt(numArr[1]);
                    var num3 = Tools.parseInt(numArr[2]);
                    var num4 = Tools.parseInt(numArr[3]);
                    var num5 = Tools.parseInt(numArr[4]);
                    var num6 = Tools.parseInt(numArr[5]);
                    var num7 = Tools.parseInt(numArr[6]);
                    var num8 = Tools.parseInt(numArr[7]);
                    var num9 = Tools.parseInt(numArr[8]);
                    var num10 = Tools.parseInt(numArr[9]);

                    obj.num1 = num1;
                    obj.num2 = num2;
                    obj.num3 = num3;
                    obj.num4 = num4;
                    obj.num5 = num5;
                    obj.num6 = num6;
                    obj.num7 = num7;
                    obj.num8 = num8;
                    obj.num9 = num9;
                    obj.num10 = num10;

                    var html = template("template_" + playGroupId, obj);
                    htmlArr.push(html);
                }
            });

            $.each(htmlArr, function (index, value) {
                if (!value) {
                    return;
                }
                str += value;
            });
            str += '</ul>';
            // $('.Color_type').hide();
            $(".cl-8 .list-block .kjjg_div").html(str).show();
        }

        renderAllData(kjjgJsonData.sscTimeList);

        $("#btn-shiwan").click(function () {
            shiwan();
        });

        var hour = (new Date()).getHours();
        if (hour <= 6) {
            hour = '凌晨好！';
        } else if (hour <= 12) {
            hour = '上午好！';
        } else if (hour <= 14) {
            hour = '中午好！';
        } else if (hour <= 18) {
            hour = '下午好！';
        } else if (hour <= 24) {
            hour = '晚上好！';
        }
        $(".timeInfo").html(hour);
    });

    // 会员首页
    $(document).on("pageInit", "#page-member-index", function (e, id, page) {
        if(typeof initBottomNavMbmber == 'function'){
            initBottomNavMbmber();
        }

        var hour = (new Date()).getHours();
        if (hour <= 6) {
            hour = '凌晨好！';
        } else if (hour <= 12) {
            hour = '上午好！';
        } else if (hour <= 14) {
            hour = '中午好！';
        } else if (hour <= 18) {
            hour = '下午好！';
        } else if (hour <= 24) {
            hour = '晚上好！';
        }
        $(".timeInfo").html(hour);
    });

    // 银行卡列表
    $(document).on("pageInit", "#page-member-yhkgl-index", function (e, id, page) {
        // 默认银行卡设置
        // $("input[name='userBankId']").change(function() {
        //     var userBankId = $(this).val();
        //     ajaxSetDefault(userBankId);
        // });

        var tmpHtml = '';

        // 银行名称选择
        tmpHtml = '\
        <header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">请选择银行</h1>\
        </header>';
        $("#yhmc").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['中国工商银行', '中国农业银行', '中国建设银行', '中国银行', '交通银行', '招商银行', '兴业银行', '浦发银行', '华夏银行', '中信银行', '中国光大银行', '广发银行', '中国邮政储蓄银行', '平安银行', '上海银行','深圳发展','深圳发展银行','北京银行','民生银行','宁波银行','其他银行']
                }
            ]
        });

        // 地点选择
        tmpHtml = '\
        <header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">选择开户地</h1>\
        </header>';
        $("#city-picker").cityPicker({
            toolbarTemplate: tmpHtml
        });

        // 添加银行卡
        $("#btn-add-bankcard").click(function () {
            var bankName = $("input[name='bankName']").val();
            var subBankName = $("input[name='subBankName']").val();
            var bankAccount = $("input[name='bankAccount']").val();
            var location = $("input[name='location']").val();
            var confirmBankAccount = $("input[name='confirmBankAccount']").val();

            if (!bankName) {
                Tools.alert("请选择银行");
                $("input[name='bankName']").focus();
                return;
            }

            if (!subBankName) {
                Tools.alert("请输入开户支行");
                $("input[name='subBankName']").focus();
                return;
            }

            if (!bankAccount) {
                Tools.alert("请输入银行账号");
                $("input[name='bankAccount']").focus();
                return;
            }

            if (!location) {
                Tools.alert("请选择开户地");
                $("input[name='location']").focus();
                return;
            }

            if (!confirmBankAccount) {
                Tools.alert("请输入确认卡号");
                $("input[name='confirmBankAccount']").focus();
                return;
            }

            if (confirmBankAccount != bankAccount) {
                Tools.alert("确认卡号不正确");
                $("input[name='confirmBankAccount']").focus();
                return;
            }

            if (bankAccount.length < 15 || bankAccount.length > 20) {
                Tools.alert("请填写15~20位的银行账号");
                $("input[name='bankAccount']").focus();
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxAddUserBank.json",
                data: {
                    bankName: bankName,
                    subBankName: subBankName,
                    location: location,
                    bankAccount: bankAccount
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        $("input").val("");
                        Tools.alertCallback("添加成功", function () {
                            window.location.reload();
                        });
                    } else {
                        Tools.alert("添加失败：" + json.description);
                    }
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });

        // function ajaxSetDefault(id) {
        //     ajaxRequest({
        //         url: config.basePath + "member/ajaxSetDefault.json",
        //         data: {
        //             id: id
        //         }
        //     });
        // }

        // 设为默认
        $("#btn-setDefault").click(function () {
            var id = $("input[name='userBankId']:checked").val();
            if (!id) {
                Tools.toast("请选择银行卡");
                return;
            }
            ajaxRequest({
                url: config.basePath + "member/ajaxSetDefault.json",
                data: {
                    id: id
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("设置成功", function () {
                            window.location.reload();
                        });
                    } else {
                        Tools.alert("设置失败：" + json.description);
                    }
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });

        $('.list-block ul li .label-checkbox a i.accountSubStr').each(function () {
            var dataVal = $(this).attr('data-bank');
            var tempStr = '';
            var strVal = dataVal.toString();
            var startStr = strVal.substr(0, 4);
            var endStr = strVal.substr(strVal.length - 4, strVal.length);
            var middleStr = strVal.substr(4, strVal.length - 4);

            tempStr += startStr + " ";
            for(var i = 0; i < middleStr.length; i++){
                if(i == 3 && i != 0 || i == 7 && i != 0|| i == 11 && i != 0){
                    tempStr += '* ';
                }else {
                    tempStr += '*';
                }
            }
            tempStr += " " + endStr;

            $(this).html(tempStr);
        });

        goBackCommon();
    });

    // 银行卡详情
    $(document).on("pageInit", "#page-member-yhkgl-detail", function (e, id, page) {
        // 设为默认
        $("#btn-setDefault").click(function () {
            var id = $(this).attr("data-id");
            ajaxRequest({
                url: config.basePath + "member/ajaxSetDefault.json",
                data: {
                    id: id
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("设置成功", function () {
                            window.location.reload();
                        });
                    } else {
                        Tools.alert("设置失败：" + json.description);
                    }
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });

        // 删除银行卡
        $("#btn-delete").click(function () {
            var id = $(this).attr("data-id");
            $.confirm('确认删除？',
                function () {
                    ajaxRequest({
                        url: config.basePath + "member/ajaxDelUserBank.json",
                        data: {
                            id: id
                        },
                        beforeSend: function () {
                            Tools.showLoading("请稍等...");
                        },
                        success: function (json) {
                            if (json.result == 1) {
                                Tools.alertCallback("删除成功", function () {
                                    window.location.href = config.basePath + "member/yhkgl/index.html";
                                });
                            } else {
                                Tools.alert("删除失败：" + json.description);
                            }
                        },
                        error: function (a, b, c) {
                            if (b == 'timeout') {
                                Tools.toast("操作超时，请稍后重试");
                                return;
                            }

                            Tools.toast("请求错误，请稍后重试");
                        },
                        complete: function () {
                            Tools.hideLoading();
                        }
                    });
                },
                function () {
                }
            );
        });
    });

    // 修改或设置密码
    $(document).on("pageInit", "#page-xgmm", function (e, id, page) {
        // 设置取款密码
        $("#changePassword").click(function () {
            var id = $(this).attr("data-id");
            var oldPassword = $("input[name='oldPassword']").val();   // 旧密码
            var newPassword = $("input[name='newPassword']").val();   // 新密码
            var confirmPassword = $("input[name='confirmPassword']").val();   // 确认密码

            if (!oldPassword) {
                Tools.alert("请输入原密码");
                return;
            }

            if (!newPassword) {
                Tools.alert("请输入新密码");
                return;
            }

            if (!confirmPassword) {
                Tools.alert("请输入确认密码");
                return;
            }

            if (confirmPassword != newPassword) {
                Tools.alert("确认密码不正确");
                return;
            }

            if (!newPassword.match(/^[0-9a-zA-Z]{6,12}$/)) {
                Tools.alert("请输入6-12位字母、数字的新密码");
                return;
            }

            $.confirm('设置密码？',
                function () {
                    ajaxRequest({
                        url: config.basePath + "member/qkmm/ajaxResetPassword.json",
                        data: {
                            oldPassword: $.md5(oldPassword),
                            newPassword: $.md5(newPassword)
                        },
                        beforeSend: function () {
                            Tools.showLoading("请稍等...");
                        },
                        success: function (json) {
                            if (json.result == 1) {

                                Tools.alertCallback("设置成功", function () {
                                    window.location.href = config.basePath + "member/index.html";
                                });
                            } else {
                                Tools.alert("设置失败：" + json.description);
                            }
                        },
                        error: function (a, b, c) {
                            if (b == 'timeout') {
                                Tools.toast("操作超时，请稍后重试");
                                return;
                            }

                            Tools.toast("请求错误，请稍后重试");
                        },
                        complete: function () {
                            Tools.hideLoading();
                        }
                    });
                },
                function () {
                }
            );
        });

        // 修改取款密码
        $("#btn-changePassword-qk").click(function () {
            var id = $(this).attr("data-id");
            var oldPassword = $("input[name='oldPassword']").val();   // 旧密码
            var newPassword = $("input[name='newPassword']").val();   // 新密码
            var confirmPassword = $("input[name='confirmPassword']").val();   // 确认密码

            if (!oldPassword) {
                Tools.alert("请输入原密码");
                return;
            }

            if (!newPassword) {
                Tools.alert("请输入新密码");
                return;
            }

            if (!confirmPassword) {
                Tools.alert("请输入确认密码");
                return;
            }

            if (confirmPassword != newPassword) {
                Tools.alert("确认密码不正确");
                return;
            }

            if (!newPassword.match(/^[0-9a-zA-Z]{6,12}$/)) {
                Tools.alert("请输入6-12位字母、数字的新密码");
                return;
            }

            $.confirm('修改密码？',
                function () {
                    ajaxRequest({
                        url: config.basePath + "member/qkmm/ajaxResetPassword.json",
                        data: {
                            oldPassword: $.md5(oldPassword),
                            newPassword: $.md5(newPassword)
                        },
                        beforeSend: function () {
                            Tools.showLoading("请稍等...");
                        },
                        success: function (json) {
                            if (json.result == 1) {
                                Tools.alertCallback("修改成功", function () {
                                    window.location.href = config.basePath + "member/index.html";
                                });
                            } else {
                                Tools.alert("修改失败：" + json.description);
                            }
                        },
                        error: function (a, b, c) {
                            if (b == 'timeout') {
                                Tools.toast("操作超时，请稍后重试");
                                return;
                            }

                            Tools.toast("请求错误，请稍后重试");
                        },
                        complete: function () {
                            Tools.hideLoading();
                        }
                    });
                },
                function () {
                }
            );
        });

        // 修改登录密码
        $("#btn-changePassword").click(function () {
            var id = $(this).attr("data-id");
            var oldPassword = $("input[name='oldPassword']").val();   // 旧密码
            var newPassword = $("input[name='newPassword']").val();   // 新密码
            var confirmPassword = $("input[name='confirmPassword']").val();   // 确认密码

            if (!oldPassword) {
                Tools.alert("请输入原密码");
                return;
            }

            if (!newPassword) {
                Tools.alert("请输入新密码");
                return;
            }

            if (!confirmPassword) {
                Tools.alert("请输入确认密码");
                return;
            }

            if (confirmPassword != newPassword) {
                Tools.alert("确认密码不正确");
                return;
            }

            if (!newPassword.match(/^[0-9a-zA-Z]{6,12}$/)) {
                Tools.alert("请输入6-12位字母、数字的新密码");
                return;
            }

            $.confirm('确认修改？',
                function () {
                    ajaxRequest({
                        url: config.basePath + "member/xgmm/ajaxResetPassword.json",
                        data: {
                            oldPassword: $.md5(oldPassword),
                            newPassword: $.md5(newPassword)
                        },
                        beforeSend: function () {
                            Tools.showLoading("请稍等...");
                        },
                        success: function (json) {
                            if (json.result == 1) {
                                clearUserToken();
                                Tools.alertCallback("修改成功，请重新登录", function () {
                                    window.location.href = config.basePath + "login.html";
                                });
                            } else {
                                Tools.alert("修改失败：" + json.description);
                            }
                        },
                        error: function (a, b, c) {
                            if (b == 'timeout') {
                                Tools.toast("操作超时，请稍后重试");
                                return;
                            }

                            Tools.toast("请求错误，请稍后重试");
                        },
                        complete: function () {
                            Tools.hideLoading();
                        }
                    });
                },
                function () {
                }
            );
        });



    });

    // 充值记录
    // $("#page-czjl").on("pageInit", function(e, id, page) {
    $(document).on("pageInit", "#page-czjl", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 类型选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择类型</h1>\
            </header>';
        $("#inputType").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '银行转账', '支付宝转账', '徽信转账', 'QQ转账', '财付通转账', '在线支付']
                }
            ]
        });
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputStatus").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '正在入款', '充值成功', '充值失败']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var type = '';
        var status = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "member/ajaxGetCkjl.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    type: type,
                    status: status
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }


                    $.each(json.userDepositList, function (index, value) {
                        var obj = {
                            time: dateFormat(value.time, "yyyy-mm-dd HH:MM"),
                            type: value.type,
                            money: value.money,
                            status: value.status,
                            orderNo: value.orderNo,
                            pk: value.pk
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 充值类型
            var inputType = $("#inputType").val();
            if (inputType == '银行转账') {
                type = 1;
            } else if (inputType == '支付宝转账') {
                type = 2;
            } else if (inputType == '徽信转账') {
                type = 3;
            } else if (inputType == '财付通转账') {
                type = 4;
            } else if (inputType == '在线支付') {
                type = 5;
            } else {
                type = "";
            }

            // 状态
            var inputStatus = $("#inputStatus").val();
            if (inputStatus == '正在入款') {
                status = 0;
            } else if (inputStatus == '充值成功') {
                status = 1;
            } else if (inputStatus == '充值失败') {
                status = 2;
            } else {
                status = "";
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(2).trigger("click");
    });

    // 提款记录
    $(document).on("pageInit", "#page-tkjl", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputStatus").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '正在出款', '出款成功', '出款拒绝']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var type = '';
        var status = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "member/ajaxGetTkjl.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    status: status
                },
                beforeSend: function () {
                    loading = true;

                    if (isInit) {
                        $("#pageMoney").html(0);
                        $("#totalMoney").html(0);
                        $("#pageWinOrLoseMoney").html(0);
                        $("#totalWinOrLoseMoney").html(0);
                    }
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }


                    $.each(json.userWithdrawList, function (index, value) {
                        var obj = {
                            time: dateFormat(value.time, "yyyy-mm-dd HH:MM"),
                            type: value.type,
                            money: value.money,
                            orderNo: value.orderNo,
                            status: value.status,
                            remarks: value.remarks,
                            pk: value.pk
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 状态
            var inputStatus = $("#inputStatus").val();
            if (inputStatus == '正在出款') {
                status = 0;
            } else if (inputStatus == '出款成功') {
                status = 1;
            } else if (inputStatus == '出款拒绝') {
                status = 2;
            } else {
                status = "";
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(2).trigger("click");
    });

    // 投注记录
    $(document).on("pageInit", "#page-tzjl", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputStatus").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '未结算', '已中奖', '未中奖']
                }
            ]
        });
        // 彩种选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputCaizhong").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '重庆时时彩', '天津时时彩', '新疆时时彩', '体彩排列3', '福彩3D', '六合彩', '北京28', '北京快乐8', '北京PK10', '重庆幸运农场', '广东快乐十分', '三分时时彩', '幸运飞艇', '两分时时彩', '分分时时彩', '五分时时彩', '江苏快3', '湖北快3', '安徽快3', '吉林快3', '极速PK10', '广东11选5', '双色球']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var playGroupId = '';
        var status = '';
        var isZhongjiang = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "member/ajaxGetTzjl.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    playGroupId: playGroupId,
                    isZhongjiang: isZhongjiang,
                    status: status
                },
                beforeSend: function () {
                    loading = true;
                    if (isInit) {
                        $("#pageMoney").html(0);
                        $("#totalMoney").html(0);
                        $("#pageWinOrLoseMoney").html(0);
                        $("#totalWinOrLoseMoney").html(0);
                    }

                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.sscBetsList, function (index, value) {
                        var obj = {
                            createTime: value.createTime,
                            effectiveMoney: value.effectiveMoney,
                            playName: value.playName,
                            playGroupName: value.playGroupName,
                            zjMoney: value.zjMoney,
                            orderNumber: value.orderNumber,
                            pk: value.pk,
                            playGroupId: value.playGroupId,
                            number: value.number,
                            content: value.content,
                            winOrLose: value.winOrLose,
                            perMoney: value.perMoney,
                            zhushu: value.zhushu,
                            status: value.status,
                            totalMoney: value.totalMoney,
                            playPl: value.playPl,
                            playId: value.playId,
                            canWin: mul(value.totalMoney, value.playPl)
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    $("#pageMoney").html(add(parseFloat($("#pageMoney").html()), json.pageMoney));
                    $("#totalMoney").html(json.totalMoney);
                    $("#pageWinOrLoseMoney").html(add(parseFloat($("#pageWinOrLoseMoney").html()), json.pageWinOrLoseMoney));
                    $("#totalWinOrLoseMoney").html(json.totalWinOrLoseMoney);

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 状态
            var inputStatus = $("#inputStatus").val();
            if (inputStatus == '未结算') {
                status = 0;
                isZhongjiang = '';
            } else if (inputStatus == '已中奖') {
                status = 1;
                isZhongjiang = true;
            } else if (inputStatus == '未中奖') {
                status = 1;
                isZhongjiang = false;
            } else {
                status = "";
                isZhongjiang = '';
            }

            var inputCaizhong = $("#inputCaizhong").val();
            if (inputCaizhong == '重庆时时彩') {
                playGroupId = 1;
            } else if (inputCaizhong == '天津时时彩') {
                playGroupId = 2;
            } else if (inputCaizhong == '新疆时时彩') {
                playGroupId = 3;
            } else if (inputCaizhong == '体彩排列3') {
                playGroupId = 4;
            } else if (inputCaizhong == '福彩3D') {
                playGroupId = 5;
            } else if (inputCaizhong == '六合彩') {
                playGroupId = 6;
            } else if (inputCaizhong == '北京28') {
                playGroupId = 7;
            } else if (inputCaizhong == '北京快乐8') {
                playGroupId = 8;
            } else if (inputCaizhong == '北京PK10') {
                playGroupId = 9;
            } else if (inputCaizhong == '重庆幸运农场') {
                playGroupId = 10;
            } else if (inputCaizhong == '广东快乐十分') {
                playGroupId = 11;
            } else if (inputCaizhong == '三分时时彩') {
                playGroupId = 13;
            } else if (inputCaizhong == '幸运飞艇') {
                playGroupId = 14;
            } else if (inputCaizhong == '分分时时彩') {
                playGroupId = 15;
            } else if (inputCaizhong == '两分时时彩') {
                playGroupId = 16;
            } else if (inputCaizhong == '五分时时彩') {
                playGroupId = 17;
            } else if (inputCaizhong == '江苏快3') {
                playGroupId = 18;
            } else if (inputCaizhong == '湖北快3') {
                playGroupId = 19;
            } else if (inputCaizhong == '安徽快3') {
                playGroupId = 20;
            } else if (inputCaizhong == '吉林快3') {
                playGroupId = 21;
            } else if (inputCaizhong == '10分六合彩') {
                playGroupId = 22;
            } else if (inputCaizhong == '极速PK10') {
                playGroupId = 23;
            } else if (inputCaizhong == '广东11选5') {
                playGroupId = 24;
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 站内信
    // $("#page-znx").on("pageInit", function() {
    $(document).on("pageInit", "#page-znx", function (e, id, page) {

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "member/ajaxGetLetterList.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime
                },
                beforeSend: function () {
                    loading = true;

                    if (isInit) {
                        $("#pageMoney").html(0);
                        $("#totalMoney").html(0);
                        $("#pageWinOrLoseMoney").html(0);
                        $("#totalWinOrLoseMoney").html(0);
                    }
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                        $("#pageList").html('');
                    }

                    $.each(json.userInboxList, function (index, value) {
                        var obj = {
                            content: value.content,
                            createTime: value.createTime,
                            hasRead: value.hasRead,
                            id: value.id
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });


                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });
        // 预加载
        getData(true);
    });

    // 公告
    $(document).on("pageInit", "#page-gonggao", function (e, id, page) {
        // // 无限滚动
        // var loading = false;    // 加载flag
        // function getData(isInit) {
        //     if (loading) return;
        //     ajaxRequest({
        //         url: config.basePath + "member/ajaxGetWebPopUpNoticeList.json",
        //         data: {},
        //         beforeSend: function () {
        //             loading = true;
        //         },
        //         success: function (json) {
        //             if (json.result != 1) {
        //                 return;
        //             }
        //
        //             if (typeof isInit != 'undefined' && isInit) {
        //                 $("#dataList .list-container").html('');
        //             }
        //
        //             $.each(json.webNoticeList, function (index, value) {
        //                 var obj = {
        //                     content: value.content,
        //                     title: value.title,
        //                     createTime: value.createTime,
        //                     hasRead: value.hasRead,
        //                     pk: value.pk
        //                 };
        //                 var html = template("template_item", obj);
        //                 $("#dataList .list-container").append(html);
        //             });
        //         },
        //         error: function (a, b, c) {
        //             if (b == 'timeout') {
        //                 Tools.toast("操作超时，请稍后重试");
        //                 return;
        //             }
        //
        //             Tools.toast("请求错误，请稍后重试");
        //         },
        //         complete: function () {
        //             loading = false;
        //             // 无限滚动重置
        //             $.refreshScroller();
        //             // 下拉刷新重置
        //             $.pullToRefreshDone('.pull-to-refresh-content');
        //         }
        //     });
        // }
        //
        // // 下拉刷新
        // // 添加'refresh'监听器
        // $(document).on('refresh', '.pull-to-refresh-content', function (e) {
        //     getData(true);
        // });
        // // 预加载
        // getData(true);
    });

    function resetSelect() {   //重新设置选择
        $(".cl-604 table tbody tr td.active").removeClass("active");
        $("#inputMoney").val("");
        $("#zhushu").html(0);
    }


    function sscFengPan() {
        $(".pl").each(function () {
            if (typeof $(this).attr("data-plid") != 'undefined' || 'pl' == $(this).attr("id")) {
                $(this).html("封盘");
            }
        });
        $("#fengpanBet").show();
    }

    function sscKaiPan() {
        $("#fengpanBet").hide();
    }

    function sureXd(betForm) {
        // var betForm = getZhudan();
        if (typeof betForm != 'object') {
            return;
        }

        if (!checkUserLogined()) {
            Tools.alertCallback("请先登录", function () {
                window.location.href = config.basePath + 'login.html?refer=' + window.location.href;
            });
            return;
        }

        var data = {
            totalZhushu: betForm.totalZhushu,
            totalMoney: betForm.totalMoney,
            sscBetList: []
        };

        var tempSsq = '';
        var valStr = '';
        $.each(betForm.sscBetList, function (index, value) {
            if(playGroupId  == 12){
                var valStr = '';
                var temp = (value.content).toString();
                if( temp.indexOf('/') >= 0){
                    var strWei = (temp.split('/'))[0];
                    valStr = getTrueStrQiu(strWei, temp);
                    tempSsq = valStr;
                }
            }
            data.sscBetList.push({
                playGroupId: value.playGroupId,
                number: value.number,
                playId: value.playId,
                zhushu: value.zhushu,
                perMoney: value.perMoney,
                content: (tempSsq == '' ? value.content : tempSsq),
                playPlId: value.playPlId,
                playPl: value.playPl
            });
        });

        ajaxRequest({
            url: config.basePath + "ssc/ajaxBet.json",
            data: {
                betForm: JSON.stringify(data)
            },
            beforeSend: function () {
                Tools.showLoading("请稍等...");
            },
            success: function (json) {
                if (json.result == 1) {
                    Tools.toast("下注成功");
                    resetSelect();
                    refreshMoney();
                } else {
                    Tools.alert("下注失败：" + json.description);
                }
            },
            error: function (a, b, c) {
                if (b == 'timeout') {
                    Tools.toast("操作超时，请稍后重试");
                    return;
                }

                Tools.toast("请求错误，请稍后重试");
            },
            complete: function () {
                Tools.hideLoading();
            }
        });
    }

    // SSC页面
    var globalLeftTime = 0; // 剩余封盘时间
    var globalLeftOpenTime = 0; // 剩余开奖时间
    var globalLastQueryTime = 0; // 上次查询时间
    var globalOpening = false;  // 是否开盘中
    var numStr = '';
    var navStr = '';
    var playGrounpId = 0;
    // $(document).on("pageInit", "#page-cqssc", function(e, id, page) {initSscPage();});
    function initSscPage(playGroupId) {
        // 右上角弹出框
        $('.menubtn').click(function () {
            if ($("#jieSuan").length > 0) {
                ajaxRequest({
                    url: config.basePath + "ssc/ajaxGetShuYing.json",
                    beforeSend: function () {
                        $("#jieSuan").html('<img src="' + $("#jieSuan").attr("data-img") + '">');
                        $("#menu-jszd").html('<img src="' + $("#menu-jszd").attr("data-img") + '">');
                    },
                    success: function (obj) {
                        if (obj.result == 1) {
                            setTimeout(function() {
                                var money = obj.todayWinOrLose.toFixed(3);
                                if (money > 0) {
                                    $("#jieSuan").html("+" + money);
                                    if (!($("#jieSuan").hasClass('greenColor'))) {
                                        $("#jieSuan").addClass('greenColor');
                                    }
                                } else {
                                    if ($("#jieSuan").hasClass('greenColor')) {
                                        $("#jieSuan").removeClass('greenColor');
                                    }
                                    $("#jieSuan").html(money);
                                }
                                $("#menu-jszd").html(obj.jszdMoney.toFixed(3));
                            }, 1500);
                        }
                    }
                });
            }
            $(".bg").show();
            $(".menu_alert").show();
        });
        $('.bg').click(function(){
            $(".bg").hide();
            $(".menu_alert").hide();
        });

        querySscLeftTime(playGroupId);

        var flag = null;
        $("#inputMoney").focus(function () {
            if (null != flag) {
                clearInterval(flag);
            }
            flag = setInterval(function () {
                document.body.scrollTop = document.body.scrollHeight;
            }, 500);
            setTimeout(function () {
                if (null != flag) {
                    clearInterval(flag);
                    flag = null;
                }
            }, 1000);
        });
        $("#inputMoney").blur(function () {
            if (null != flag) {
                clearInterval(flag);
                flag = null;
            }
        });
        // 默认封盘
        // $("span.pl").html("封盘");
        // sscFengPan();

        // 开奖历史
        querySscHistory(playGroupId);  // 初始化执行

        // 清除按钮
        $("#btn-reset").click(function () {
            resetSelect();
        });

        // 提交按钮
        $("#btn-submit").click(function () {
            var inputMoney = $("#inputMoney").val();
            if (isNaN(inputMoney) || inputMoney != parseInt(inputMoney) || inputMoney <= 0) {
                Tools.toast("请输入正确的金额");
                return;
            }

            var zhushu = getZhushu();

            var number = $("#number").attr("data-number");
            var betForm = getZhudan(inputMoney, number);

            if (zhushu <= 0) {
                Tools.toast("请正确选择投注内容");
                return;
            }

            if (!betForm) {
                return;
            }
            Tools.showLoading("请稍等...");
            var str = '<p style="font-weight: bold;padding-bottom: 5px;border-bottom: 1px dashed #bebebe;margin-bottom: 5px;">共计：￥<font class="red">' + betForm.totalMoney + '</font>/<font class="red">' + betForm.totalZhushu + '</font>&nbsp;注，您确定要下注吗？</p>';
            $.each(betForm.sscBetList, function (index, value) {
                str += '<p style="margin:0.2rem 0"><span>[&nbsp;' + value.content + '&nbsp;]</span><span>&nbsp;@' + value.playPl + '&nbsp;X&nbsp;' + value.perMoney + '</span></p>';
            });
            Tools.hideLoading();
            //询问框
            Tools.confirm2(str, '确认', '取消', '下注清单', function () {
                sureXd(betForm);
            }, function () {
            });
        });

        $("#ssc-parent-menu .cl-602 a").click(
            function () {
                var type = $(this).attr("data-type");
                if (type == "page") {
                    var url = $(this).attr("data-url");
                    $("#sub-menu-list .cl-610").hide();

                    var o = $(this);
                    // sscFengPan();
                    getSubSscPage(url, function () {
                        $(o).parent().find(".active").removeClass("active");
                        $(o).addClass("active");
                        // 重置
                        resetSelect();
                        // 获取赔率
                        querySscPlData();
                    });
                } else if (type == "sub-menu") {
                    var subMenuId = $(this).attr("data-sub_menu_id");
                    $("#sub-menu-list .cl-610").hide();
                    $("#" + subMenuId).show();
                    var url = $("#sub-menu-list #" + subMenuId + " .cl-602 a:first-child").attr("data-url");

                    if(subMenuId  == 'sub-menu-tm' || subMenuId == 'sub-menu-zm'){
                        url = $("#sub-menu-list #" + subMenuId + " .cl-602 a:last-child").attr("data-url");
                    }

                    // sscFengPan();
                    getSubSscPage(url, function () {
                        $("#sub-menu-list" + " #" + subMenuId + " .cl-602").find(".active").removeClass("active");
                        if(subMenuId  == 'sub-menu-tm' || subMenuId == 'sub-menu-zm'){
                            $("#sub-menu-list" + " #" + subMenuId + " .cl-602 a:last-child").addClass("active");
                        } else {
                            $("#sub-menu-list" + " #" + subMenuId + " .cl-602 a:first-child").addClass("active");
                        }

                        // 重置
                        resetSelect();
                        // 获取赔率
                        querySscPlData();
                    });

                    var o = $(this);
                    $(o).parent().find(".active").removeClass("active");
                    $(o).addClass("active");
                } else {
                    return;
                }
            });
        $("#sub-menu-list .cl-602 a").click(function () {
            var type = $(this).attr("data-type");
            var url = $(this).attr("data-url");

            var o = $(this);
            // sscFengPan();
            getSubSscPage(url, function () {
                // $(o).parent().find(".active").removeClass("active");
                $("#sub-menu-list .cl-602 .active").removeClass("active");
                $(o).addClass("active");
                // 重置
                resetSelect();
                // 获取赔率
                querySscPlData();
            });
        });
        $(".cl-901").click(function () {
            $(this).toggleClass("show");
        });

        // 倒计时
        setInterval(function () {


            if (typeof playGroupId == 'undefined' || typeof globalLeftTime == 'undefined') {
                return;
            }

            if (globalLeftTime <= 0) {
                var time = $("#leftTime").attr("data-time");
                time = parseInt(time);

                querySscLeftTime(playGroupId);
                if (globalOpening) {
                    if(!isNaN(time) && time < 0){
                        if(time == -1){
                            showClearBetTemplate();
                            //定义弹框宽度大小
                            $("#layui-m-layer" + layerId + " .layui-m-layerchild").css("width", "85%");
                            $("#layui-m-layer" + layerId + " .layui-m-layerchild h3").css({
                                "font-size": "0.68rem",
                                "height": "1.6rem!important",
                                "line-height": "1.6rem!important"
                            });
                            $("#layui-m-layer" + layerId + " .btn_close").click(function () {
                                if (layerId != null) {
                                    layer.close(layerId);
                                    layerId = null;
                                }
                            });
                        }
                    }

                    $("#leftTime").attr("data-time", --time);
                }

                return;
            }
            var tmpTime = globalLeftTime;
            var hour = Math.floor(tmpTime / 60 / 60);
            tmpTime -= hour * 60 * 60;
            var minute = Math.floor(tmpTime / 60);
            tmpTime -= minute * 60;
            var second = tmpTime;

            var tmpStr = "";
            tmpStr += hour < 10 ? '0' + hour : hour;
            tmpStr += ':';
            tmpStr += minute < 10 ? '0' + minute : minute;
            tmpStr += ':';
            tmpStr += second < 10 ? '0' + second : second;
            $("#leftTime").html(tmpStr);

            $("#leftTime").attr("data-time", --globalLeftTime);
            // --globalLeftTime;
        }, 1000);

        // 选择
        $(document).on("click", ".cl-604 table tbody tr td", function () {

            if ($(this).hasClass("not-selected")) {
                return;
            }
            $(this).toggleClass("active");
            if (typeof extractFunc == 'function') {
                extractFunc($(this));
            }

            var zhushu = getZhushu();
            $("#zhushu").html(zhushu);
        });
        //首页热门开奖--幸运选号
        numStr = getQueryString("nums");
        navStr = getQueryString("navIndex");

        if (playGroupId == 9 && navStr != "undefined" && navStr != '') {
            $("#ssc-parent-menu .cl-602 .szp").trigger("click");
        }
    }

    // 清除内容提示框
    var layerId = null;
    var T = null;

    function showClearBetTemplate() {
        if (layerId != null) {
            return;
        }
        var clearBet_template = '\
    <div class="clearBet_template" >\
        <div class="l">\
            <span>\
            <i></i>\
            </span>\
        </div>\
        <div class="r">\
            <p>当前期已结束</p>\
            <p>是否要清空已投注内容？</p>\
            <p>要清空已投注内容请单击"确定"</p>\
            <p>不刷新页面请点击"取消"</p>\
        </div>\
        <div style="clear:both"></div>\
        <div class="btns" style="text-align:center">\
            <a href="javascript:void(0)" data-btn="ok" class="btn1">确定</a>\
            <a href="javascript:void(0)" data-btn="cancel" class="btn2">取消<font class="time"></font></a>\
        </div>\
    </div>\
    ';

        layer.closeAll();
        //页面层
        layerId = layer.open({
            type: 0, //默认为 0 信息框
            time: 15000,
            title: '温馨提示' + '<a href="javascript:void(0)" class="close-img btn_close"><span></span></a>',
            shadeClose: false,
            content: clearBet_template
        });


        var time = 5;
        T = setInterval(function () {
            if (time == 0) {
                closeClearBetTemplate("cancel");
                return;
            }
            $(".clearBet_template .time").html('(' + time + ')');
            --time;
        }, 1000)
    }

    $(document).on("click", ".clearBet_template .btns a", function (e) {
        var btnName = $(this).attr("data-btn");
        closeClearBetTemplate(btnName);
    });

    function closeClearBetTemplate(btnName) {
        if (T != null) {
            clearInterval(T);
            T = null;
        }
        if (layerId != null) {
            layer.close(layerId);
            layerId = null;
        }

        if (typeof btnName != 'undefined' && btnName == "ok") {
            if (typeof reset == 'function') {
                reset();
            }
        }
    }

    //清除正在下注的内容及金额
    function reset() {
        $("body tbody tr td.active").removeClass('active');
        $("#inputMoney").val("");

        // 官方玩法下注内容清除
        clearSelected();
    }

    var querySscLeftTime_Running = false; // querySscLeftTime函数是否正在调用
    function querySscLeftTime(playGroupId) {
        if (querySscLeftTime_Running) {
            return;
        }

        ajaxRequest({
            url: config.basePath + 'ssc/getSscOpenTime2.json',
            data: {
                playGroupId: playGroupId
            },
            beforeSend: function () {
                querySscLeftTime_Running = true;
            },
            success: function (json) {
                if (json.result != 1) {
                    return;
                }

                globalLeftTime = json.leftTime;
                // globalLeftOpenTime = json.leftOpenTime;
                globalOpening = json.opening;

                $("#number").attr("data-number", json.number);
                $("#number font").html(json.number);
                // querySscPlData();
                querySscHistory(playGroupId);
            },
            error: function (a, b, c) {
                // 重试
                setTimeout(function () {
                    querySscLeftTime(playGroupId);
                }, 5000);
            },
            complete: function () {
                querySscLeftTime_Running = false;
            }
        });
    }

    //随机号码选中
    function xuanZhongSjh(playGrounpId, numStr) {
        if (playGrounpId == 9 && numStr != "undfined") {
            var numberX = [];
            var nameF = '';
            var numArr = numStr.split(",");
            for (var i = 0; i < numArr.length; i++) {
                var strTmp = numArr[i].toString();
                var xIndex = strTmp.indexOf("-") + 1;
                numberX.push(strTmp.substr(xIndex));
            }
            for (var y = 0; y < numberX.length; y++) {
                if (y == 0) {
                    nameF = '冠军-' + numberX[y];
                } else if (y == 1) {
                    nameF = '季军-' + numberX[y];
                } else if (y == 2) {
                    nameF = '亚军-' + numberX[y];
                } else if (y == 3) {
                    nameF = '第四名-' + numberX[y];
                } else if (y == 4) {
                    nameF = '第五名-' + numberX[y];
                } else if (y == 5) {
                    nameF = '第六名-' + numberX[y];
                } else if (y == 6) {
                    nameF = '第七名-' + numberX[y];
                } else if (y == 7) {
                    nameF = '第八名-' + numberX[y];
                } else if (y == 8) {
                    nameF = '第九名-' + numberX[y];
                } else if (y == 9) {
                    nameF = '第十名-' + numberX[y];
                }
                $("#betContainer .cl-604 table tbody tr td[data-name='" + nameF + "']").addClass('active');
            }
        }

    }

    function querySscPlData() {
        ajaxRequest({
            url: config.basePath + 'ssc/ajaxGetSscPlayPl.json',
            data: {
                playId: playId
            },
            beforeSend: function () {
            },
            success: function (json) {
                if (json.result != 1) {
                    return;
                }
                $.each(json.sscPlayPlList, function (index, value) {
                    var obj = $("[data-plid='" + value.playPlId + "']");
                    if (typeof obj == 'undefined' || !obj || obj.length <= 0) {
                        return;
                    }
                    $(obj).attr("data-pl", value.playPl);
                    obj = $("span[data-plid='" + value.playPlId + "']");
                    $(obj).html(value.playPl);
                    obj = $("font[data-plid='" + value.playPlId + "']");
                    $(obj).html(value.playPl);
                });

                sscKaiPan();
                // $("#fengpanBet").hide();
            },
            error: function (a, b, c) {
                // 重试
                setTimeout(function () {
                    querySscPlData();
                }, 5000);
            },
            complete: function () {
            }
        });
    }

    var lastNumberOpening_intervalFlag = null;

    function querySscHistory(playGroupId) {
        ajaxRequest({
            url: config.basePath + 'ssc/getPlanOpenDataHistory.json',
            data: {
                playGroupId: playGroupId
            },
            beforeSend: function () {
            },
            success: function (json) {
                if (json.result != 1) {
                    return;
                }

                if (json.sscHistoryList.length > 0) {
                    var value = json.sscHistoryList[0];
                    var openCodeArr = value.openCode ? value.openCode.split(",") : [];
                    var lastNumberOpening = openCodeArr.length == 0 ? true : false;  // 是否开奖中

                    if (lastNumberOpening) {
                        // 循环读取开奖时间，5秒
                        setTimeout(function () {
                            querySscHistory(playGroupId);
                        }, 5000);
                    } else {
                        if (null != lastNumberOpening_intervalFlag) {
                            clearInterval(lastNumberOpening_intervalFlag);
                            lastNumberOpening_intervalFlag = null;
                        }
                    }
                }

                var lastOpenData = null;
                var html = "";
                var colorBg = "";
                $.each(json.sscHistoryList, function (index, value) {
                    var obj = {
                        number: value.number,
                        openCodeArr: value.openCode ? value.openCode.split(",") : null
                    };

                    if($.inArray(playGroupId, [7]) >= 0){
                        var arr = obj.openCodeArr;
                        var num1 = parseInt(arr[0]);
                        var num2 = parseInt(arr[1]);
                        var num3 = parseInt(arr[2]);
                        var sum = num1 + num2 + num3;

                        if($.inArray(sum,[0,13,14,27]) >= 0){
                            colorBg = "graybj28";
                        } else if($.inArray(sum,[1,4,7,10,16,19,22,25]) >= 0){
                            colorBg = "greenbj28";
                        } else if($.inArray(sum,[2,5,8,11,17,20,23,26]) >= 0){
                            colorBg = "bluebj28";
                        } else{
                            colorBg = 'redbj28';
                        }

                        obj.sum = sum;
                        obj.colorBg = colorBg;

                    }


                    html += template("template_openNumber_item", obj);


                    if (lastOpenData == null) {
                        if (value.openCode) {
                            lastOpenData = obj;
                        }
                    }
                });
                $("#openHistoryList").html(html);

                if (lastOpenData != null) {
                    var infoArr = [];
                    var colorBg = '';
                    if ($.inArray(playGroupId, [1, 2, 3, 13, 15, 16, 17]) >= 0) {
                        var arr = lastOpenData.openCodeArr;
                        var sum = 0;
                        $.each(arr, function (index, value) {
                            sum = add(sum, parseInt(value));
                        });

                        infoArr.push(sum);
                        infoArr.push(sum % 2 == 0 ? '双' : '单');
                        infoArr.push(0 <= sum && sum <= 22 ? '小' : '大');
                        var cha = parseInt(arr[0]) - parseInt(arr[4]);
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                    } else if ($.inArray(playGroupId, [18, 19, 20, 21]) >= 0) {
                        var temparr = lastOpenData.openCodeArr;
                        var sum = 0;
                        $.each(temparr, function (index, value) {
                            sum = add(sum, parseInt(value));
                        });

                        infoArr.push(sum);
                        infoArr.push(sum % 2 == 0 ? '双' : '单');
                        infoArr.push(sum <= 10 ? '小' : '大');
                    } else if ($.inArray(playGroupId, [9]) >= 0) {
                        var arr = lastOpenData.openCodeArr;
                        var num1 = parseInt(arr[0]);
                        var num2 = parseInt(arr[1]);
                        var num3 = parseInt(arr[2]);
                        var num4 = parseInt(arr[3]);
                        var num5 = parseInt(arr[4]);
                        var num6 = parseInt(arr[5]);
                        var num7 = parseInt(arr[6]);
                        var num8 = parseInt(arr[7]);
                        var num9 = parseInt(arr[8]);
                        var num10 = parseInt(arr[9]);

                        var sum12 = num1 + num2;
                        infoArr.push(sum12);
                        infoArr.push(sum12 % 2 == 0 ? '双' : '单');
                        infoArr.push(0 <= sum12 && sum12 <= 10 ? '小' : '大');
                        var cha = num1 - num10;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num2 - num9;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num3 - num8;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num4 - num7;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num5 - num6;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                    } else if ($.inArray(playGroupId, [14, 23]) >= 0) {
                        var arr = lastOpenData.openCodeArr;
                        var num1 = parseInt(arr[0]);
                        var num2 = parseInt(arr[1]);
                        var num3 = parseInt(arr[2]);
                        var num4 = parseInt(arr[3]);
                        var num5 = parseInt(arr[4]);
                        var num6 = parseInt(arr[5]);
                        var num7 = parseInt(arr[6]);
                        var num8 = parseInt(arr[7]);
                        var num9 = parseInt(arr[8]);
                        var num10 = parseInt(arr[9]);

                        var sum12 = num1 + num2;
                        infoArr.push(sum12);
                        infoArr.push(sum12 % 2 == 0 ? '双' : '单');
                        infoArr.push(0 <= sum12 && sum12 <= 11 ? '小' : '大');
                        var cha = num1 - num10;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num2 - num9;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num3 - num8;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num4 - num7;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                        cha = num5 - num6;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                    } else if ($.inArray(playGroupId, [10, 11]) >= 0) {
                        var arr = lastOpenData.openCodeArr;
                        var num1 = parseInt(arr[0]);
                        var num2 = parseInt(arr[1]);
                        var num3 = parseInt(arr[2]);
                        var num4 = parseInt(arr[3]);
                        var num5 = parseInt(arr[4]);
                        var num6 = parseInt(arr[5]);
                        var num7 = parseInt(arr[6]);
                        var num8 = parseInt(arr[7]);

                        var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;

                        infoArr.push(sum);
                        infoArr.push(sum % 2 == 0 ? '双' : '单');
                        infoArr.push(sum == 84 ? '和' : (sum < 84 ? '小' : '大'));
                        infoArr.push(sum % 10 >= 5 ? '尾大' : '尾小');
                        var cha = num1 - num8;
                        infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                    } else if($.inArray(playGroupId, [7]) >= 0){
                        var arr = lastOpenData.openCodeArr;
                        var num1 = parseInt(arr[0]);
                        var num2 = parseInt(arr[1]);
                        var num3 = parseInt(arr[2]);
                        var sum = num1 + num2 + num3;

                        if($.inArray(sum,[0,13,14,27]) >= 0){
                            colorBg = "graybj28";
                        } else if($.inArray(sum,[1,4,7,10,16,19,22,25]) >= 0){
                            colorBg = "greenbj28";
                        } else if($.inArray(sum,[2,5,8,11,17,20,23,26]) >= 0){
                            colorBg = "bluebj28";
                        } else{
                            colorBg = 'redbj28';
                        }

                        lastOpenData.sum = sum;
                        lastOpenData.colorBg = colorBg;

                    }
                    // else if ($.inArray(playGroupId, [10]) >= 0) {
                    //     var arr = lastOpenData.openCodeArr;
                    //     var num1 = parseInt(arr[0]);
                    //     var num2 = parseInt(arr[1]);
                    //     var num3 = parseInt(arr[2]);
                    //     var num4 = parseInt(arr[3]);
                    //     var num5 = parseInt(arr[4]);
                    //     var num6 = parseInt(arr[5]);
                    //     var num7 = parseInt(arr[6]);
                    //     var num8 = parseInt(arr[7]);
                    //
                    //     var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
                    //     infoArr.push(sum);
                    //     infoArr.push(sum % 2 == 0 ? '双' : '单');
                    //     infoArr.push(sum == 84 ? '和' : (sum < 84 ? '小' : '大'));
                    //     infoArr.push(sum % 10 >= 5 ? '尾大' : '尾小');
                    //     var cha = num1 - num8;
                    //     infoArr.push(cha == 0 ? '和' : (cha > 0 ? '龙' : '虎'));
                    // }
                    lastOpenData.infoArr = infoArr;

                    if (playGroupId == 6 || playGroupId == 22) {
                        var arr = lastOpenData.openCodeArr;
                        var sxArr = [];
                        $.each(arr, function (index, value) {
                            sxArr.push(getSxName(parseInt(value)));
                        });
                        lastOpenData.sxArr = sxArr;
                    }

                    // 期数处理
                    if (lastOpenData.number.length > 8) {
                        lastOpenData.number = lastOpenData.number.replace(dateFormat(new Date(), "yyyymmdd"), "").replace(dateFormat(new Date(), "yyyy"), "");
                    }
                    var html = template('template_lastOpenInfo', lastOpenData);

                    $("#lastOpenInfo").html(html);
                }
            },
            error: function (a, b, c) {
                // 失败重试
                setTimeout(function () {
                    querySscHistory(playGroupId);
                }, 5000);
            },
            complete: function () {
            }
        });
    }

    function getSubSscPage(url, callback) {
        ajaxRequest({
            url: url,
            dataType: "html",
            type: "GET",
            beforeSend: function () {
                Tools.showLoading("加载中...");
                $(".cl-901").removeClass("show");
                extractFunc = null;
            },
            success: function (html) {
                $("#betContainer").html(html);
                if (typeof callback == 'function') {
                    callback();
                }
            },
            error: function (a, b, c) {
                if (b == 'timeout') {
                    Tools.toast("操作超时，请稍后重试");
                    return;
                }

                Tools.toast("请求错误，请稍后重试");
            },
            complete: function () {
                Tools.hideLoading();
                xuanZhongSjh(playGrounpId, numStr);
            }
        });
    }

    // 存款页面
    $(document).on("pageInit", "#page-ck", function (e, id, page) {
        var type_ck_init = $('.buttons-tab-type a:first-child').attr("data-type");
        $("#" + type_ck_init).show();
        $('.buttons-tab-type a:first-child').trigger("click");
        $(".buttons-tab-type a").click(function () {
            $('.buttons-tab-type a').removeClass('active');
            $(this).addClass('active');
            var type_ck = $(this).attr("data-type");
            $(".list-block").hide();
            $("#" + type_ck).show();
        });

        $(".ckList .zxzf").click(function () {

            var minMoney = $(this).attr("data-minmoney");
            var maxMoney = $(this).attr("data-maxmoney");
            var payUrl = $(this).attr("data-payurl");
            var payOnlineId = $(this).attr("data-payonlineid");

            var obj = {
                minMoney: minMoney,
                maxMoney: maxMoney
            };

            var html = template("template_popup", obj);

            $.modal({
                title: '充值',
                extraClass: 'cl-704',
                text: html,
                buttons: [
                    {
                        text: '<button type="button" class="cl-705">确定</button>',
                        close: false,
                        onClick: function () {
                            var money = parseFloat($("#inputMoney").val());
                            if (isNaN(money)) {
                                Tools.toast("请输入正确金额");
                                return;
                            }

                            if (money < minMoney) {
                                Tools.toast("最小充值金额为：" + minMoney + "元");
                                return;
                            }

                            if (money > maxMoney) {
                                Tools.toast("最大充值金额为：" + maxMoney + "元");
                                return;
                            }

                            var url = "http://" + payUrl + "/pay/payOnlineRequest.html?uid=" + Tools.getCookie("uid") + "&refer=" + location.protocol + "//" + location.host + "&payOnlineId=" + payOnlineId + "&money=" + money;
                            window.open(url);
                            $.closeModal();
                        }
                    },
                    {
                        text: '<button type="button" class="cl-706">取消</button>'
                    }
                ]
            });
        });
    });

    // 取款页面
    $(document).on("pageInit", "#page-qk", function (e, id, page) {
        var userBankId;

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择银行卡</h1>\
            </header>';
        var values = [];
        if (userBankList.length == 0) {
            values.push("尚未绑定银行卡，请前往绑定");
            $("#inputQk").val("尚未绑定银行卡，请前往绑定");
        } else {
            $.each(userBankList, function (index, value) {
                if (value.default) {
                    $("#inputQk").attr("data-account", value.bankAccount);
                    $("#inputQk").val(value.bankName + " **** " + value.bankAccount.substr(value.bankAccount.length - 4));
                    userBankId = value.id;
                }// else {
                //     values.push(value.bankAccount);
                // }
                values.push("<font data-id='" + value.id + "'>" + value.bankName + " **** " + value.bankAccount.substr(value.bankAccount.length - 4) + "</font>");
            });
        }
        $("#inputQk").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: values
                }
            ],
            onChange: function (picker, values, displayValues) {
                userBankId = parseInt($(values[0]).attr("data-id"));
            },
            formatValue: function (p, values, displayValues) {
                return displayValues[0].replace(/<[^>]+>/g, "");
            }
        });

        $("#btn-submit").click(function () {
            var minMoney = $(this).attr("data-minmoney");
            var maxMoney = $(this).attr("data-maxmoney");
            var bankAccount = $("#inputQk").val();

            var money = parseFloat($("#inputMoney").val());
            if (isNaN(money)) {
                Tools.toast("请输入正确金额");
                return;
            }

            if (!bankAccount) {
                Tools.toast("请选择银行卡");
                return;
            }

            if (!userBankId) {
                Tools.toast("请选择银行卡");
                return;
            }

            if (money < minMoney) {
                Tools.toast("最小提款金额为：" + minMoney + "元");
                return;
            }

            if (money > maxMoney) {
                Tools.toast("最大提款金额为：" + maxMoney + "元");
                return;
            }

            var drawPassword = '';
            if ($("#drawPassword").length > 0) {
                drawPassword = $.trim($("#drawPassword").val());
                if (drawPassword == "") {
                    Tools.toast("请输入取款密码");
                    return;
                }

                drawPassword = $.md5(drawPassword);
            }

            ajaxRequest({
                url: config.basePath + "member/submitWithdraw.json",
                data: {
                    money: money,
                    id: userBankId,
                    drawPassword: drawPassword
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/tkjl/list.html';
                        });
                    } else {
                        Tools.alert("提交失败：" + json.description);
                    }
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });


    // 购彩大厅首页
    $(document).on("pageInit", "#page-gcdt", function (e, id, page) {
        // // 公告滚动
        // var mySwiper = new Swiper('.swiper-container', {
        //     pagination: '.swiper-pagination',
        //     autoplay: 2000,
        //     direction: 'vertical'
        // });
        //
        // $(".cl-4 .swiper-container .swiper-wrapper .swiper-slide").click(function () {
        //     layer.open({
        //         title: [
        //             $(this).attr("data-title") + '<a href="javascript:void(0)" onclick="layer.closeAll()" style="float:right;color: #fff;">X</a>',
        //             ''
        //         ]
        //         , content: $(this).attr("data-content")
        //     });
        // });

        var flagArr = [];
        var flagEnableArr = [];
        setInterval(function () {
            $(".gcdtList a").each(function () {
                var obj = $(this);
                var time = $(this).attr("data-time");
                var playGroupId = $(obj).attr("data-play_group_id");
                if (typeof playGroupId == 'undefined') {
                    return;
                }

                var isEnable = $(obj).attr("data-is_enable");
                if (typeof isEnable != 'undefined' && isEnable == 0) {
                    return;
                }

                // 更新数据
                if (typeof time == "undefined" || !time || isNaN(time) || time == 0) {

                    var updateTime = $(this).attr("data-update_time");
                    $(obj).attr("data-update_time", (new Date()).getTime());

                    if (typeof flag == 'undefined' || flag == false || typeof updateTime == 'undefined') {
                        if ((new Date()).getTime() - updateTime < 5 * 1000) {
                            return;
                        }
                        ajaxRequest({
                            url: config.basePath + "ssc/getSscOpenTimePer.json",
                            data: {
                                playGroupId: playGroupId
                            },
                            beforeSend: function () {
                                flagArr[playGroupId] = true;
                            },
                            success: function (json) {
                                if (json.result != 1) {
                                    return;
                                }

                                if (json.opening == false) {
                                    flagArr[playGroupId] = false;

                                    $(obj).find(".info").remove();
                                    $(obj).find(".time").addClass('tingshou');
                                    $(obj).find(".time").html("已停售");
                                    $(obj).attr("data-is_enable", 0);
                                    return;
                                }

                                $(obj).attr("data-time", json.leftTime);
                                $(obj).find(".info").html(json.opening ? "<font class='glxq'>距离下期</font>" : "<font style='color:#ec1818'>距离开奖</font>");
                            },
                            error: function (a, b, c) {
                            },
                            complete: function () {
                                flagArr[playGroupId] = false;
                            }
                        });
                    }
                }

                if (typeof time != "undefined" && !isNaN(time) && time > 0) {
                    --time;
                    $(obj).attr("data-time", time);

                    var tmpTime = time;
                    var hour = Math.floor(tmpTime / 60 / 60);
                    tmpTime -= hour * 60 * 60;
                    var minute = Math.floor(tmpTime / 60);
                    tmpTime -= minute * 60;
                    var second = tmpTime;

                    var tmpStr = "";
                    if (hour > 0) {
                        tmpStr += '<i>' + (hour < 10 ? '0' + hour : hour) + '</i><font>:</font>';
                    }
                    tmpStr += '<i>' + (minute < 10 ? '0' + minute : minute) + '</i><font>:</font>';
                    tmpStr += '<i>' + (second < 10 ? '0' + second : second) + '</i>';
                    $(obj).find(".time").html(tmpStr);
                }
                var updateTime = $(obj).attr("data-update_time");
            });
        }, 1000);

        // function getPidEnable(pidParam, callback){
        //     ajaxRequest({
        //          url: config.basePath + "ssc/getSscOpenTime2.json",
        //          data: {
        //             playGroupId:pidParam
        //          },
        //          success: function (json) {
        //              if(json.result != -888){ //彩种未关闭
        //                  return;
        //              }
        //
        //              if(typeof callback == 'function'){
        //                 callback();
        //              }
        //          }
        //      });
        //
        //
        //
        //     // ajaxRequest({
        //     //     url: CONFIG.BASEURL + "ssc/getSscOpenTime2.json",
        //     //     data: {
        //     //         playGroupId: playGroupId
        //     //     },
        //     //     success: function(json) {
        //     //         if (json.result == -888) {  // 彩种已关闭
        //     //             $("#rightContent").attr("src", '<%=basePath%>ssc/tingcaipage.html');
        //     //             return;
        //     //         }
        //     //
        //     //         if (typeof callback == 'function') {
        //     //             callback();
        //     //         }
        //     //     }
        //     // });
        // }
    });

    $(document).on("pageInit", "#page-grzl-index", function (e, id, page) {
        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            window.location.reload();
        });
    });

    $(document).on("pageInit", "#page-grzl-edit", function (e, id, page) {
        $("#inputBirtyday").calendar({});

        var tmpHtml = '';
        // 性别选择
        tmpHtml = '\
        <header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">请选择性别</h1>\
        </header>';
        $("#inputSex").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['男', '女']
                }
            ]
        });

        $("#btn-submit").click(function () {
            var nickname = $('input[name="nickname"]').val();
            var sexStr = $('input[name="sex"]').val();
            var sex = sexStr == '男' ? 1 : 2;
            var birthday = $('input[name="birthday"]').val();
            var telephone = $('input[name="telephone"]').val();
            var email = $('input[name="email"]').val();
            var qq = $('input[name="qq"]').val();

            if (qq) {
                if (!PatternUtils.checkQq(qq)) {
                    Tools.toast("请输入正确格式的QQ号");
                    return;
                }
            }

            if (telephone) {
                if (!PatternUtils.checkPhone(telephone)) {
                    Tools.toast("请输入正确格式的手机号码");
                    return;
                }
            }

            if (email) {
                if (!PatternUtils.checkEmail(email)) {
                    Tools.toast("请输入正确格式的电子邮件");
                    return;
                }
            }

            ajaxRequest({
                url: config.basePath + "member/grzl/ajaxEditUserInfo.json",
                data: {
                    nickname: nickname,
                    birthday: birthday,
                    qq: qq,
                    telephone: telephone,
                    email: email,
                    sex: sex
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("修改成功", function () {
                            back();
                        });
                        return;
                    }

                    Tools.toast("修改失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    $(document).on("pageInit", "#page-tgzq-index", function (e, id, page) {
        $("#btn-copy").click(function () {
            if (!copy($("#tglj").html())) {
                Tools.toast("当前浏览器不支持该功能");
            } else {
                Tools.toast("复制成功");
            }
        });
        // $("#tglj").click(function() {
        //     if (!copy($("#tglj").html())) {
        //         Tools.toast("当前浏览器不支持该功能");
        //     } else {
        //         Tools.toast("复制成功");
        //     }
        // });
    });

    // 会员列表
    $(document).on("pageInit", "#page-agent-hylb", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var account = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetUserList.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: isInit ? "" : startTime,
                    endTime: isInit ? "" : endTime,
                    account: account
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.agentUserList, function (index, value) {
                        var obj = {
                            registerTime: value.registerTime,
                            account: value.account,
                            id: value.id,
                            balance: value.balance,
                            winOrLose: value.winOrLose,
                            enable: value.enable,
                            totalEffectiveBetMoney: value.totalEffectiveBetMoney,
                            totalFandianMoney: value.totalFandianMoney,
                            xuhao: (json.pageNum - 1) * json.pageSize + index + 1
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        // $("#dataList").hide();
                        // $(".no-right-record").show();
                        $("#dataList .list-container").append("<tr><td colspan='5'>暂无记录</td></tr>");
                    } else {
                        // $("#dataList").show();
                        // $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            getData(true);
        });
        // 预加载
        getData(true);

        // 筛选
        $("#btn-shaixuan").click(function () {
            account = $("input[name='account']").val();
            pageIndex = 1;
            $.closePanel();
            getData(true);
        });

        $("#search").keydown(function (e) {
            if (e.keyCode == 13) {
                account = $("#search").val();
                getData(true);
            }
        });

        $("#block-search").click(function () {
            $("#block-search").hide();
            $("#search").show().focus();
        });

        $("#search").focus(function () {
            $("#block-search").hide();
        });
        $("#search").blur(function () {
            if ($("#search").val()) {

            } else {
                $("#block-search").show();
                $(this).hide();
            }
        });
    });

    $(document).on("pageInit", "#page-agent-tjhy", function (e, id, page) {
        $("#btn-submit").click(function () {
            var account = $('input[name="account"]').val();
            var password = $('input[name="password"]').val();
            var qq = $('input[name="qq"]').val();
            var name = $('input[name="name"]').val();

            if (!PatternUtils.checkAccount(account)) {
                Tools.toast("请输入正确格式的账号名");
                return;
            }

            if (!PatternUtils.checkPassword(password)) {
                Tools.toast("请输入正确格式的密码");
                return;
            }

            if (!PatternUtils.checkQq(qq)) {
                Tools.toast("请输入正确格式的QQ号");
                return;
            }

            if (!PatternUtils.checkName(name)) {
                Tools.toast("请输入正确格式的姓名");
                return;
            }

            ajaxRequest({
                url: config.basePath + "agent/ajaxAddUser.json",
                data: {
                    account: account,
                    password: $.md5(password),
                    name: name,
                    qq: qq
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("添加成功", function () {
                            back();
                        });
                        return;
                    }

                    Tools.toast("添加失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    $(document).on("pageInit", "#page-agent-cwbb", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        // 无限滚动
        var loading = false;    // 加载flag
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetAgentReport.json",
                data: {
                    startTime: startTime,
                    endTime: endTime
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    var obj = {
                        userCount: json.userCount,
                        depositCount: json.depositCount,
                        withdrawCount: json.withdrawCount,
                        sscYjTotalMoney: json.sscYjTotalMoney,
                        depositMoney: json.depositMoney,
                        withdrawMoney: json.withdrawMoney,
                        effectiveMoney: json.effectiveMoney,
                        startTime: startTime,
                        endTime: endTime
                    };

                    var html = template("template_item", obj);
                    $("#dataList").html(html);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            getData(true);
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        getData(true);
    });

    // 投注记录
    $(document).on("pageInit", "#page-agent-tdtz-list", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputStatus").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '未结算', '已中奖', '未中奖']
                }
            ]
        });
        // 彩种选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputCaizhong").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '重庆时时彩', '天津时时彩', '新疆时时彩', '体彩排列3', '福彩3D', '六合彩', '北京28', '北京快乐', '北京PK10', '重庆幸运农场', '广东快乐十分', '分分时时彩', '两分时时彩', '三分时时彩', '五分时时彩']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var playGroupId = '';
        var status = '';
        var isZhongjiang = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetTouzhu.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    playGroupId: playGroupId,
                    isZhongjiang: isZhongjiang,
                    status: status
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.betList, function (index, value) {
                        var obj = {
                            account: value.account,
                            createTime: value.createTime,
                            effectiveMoney: value.effectiveMoney,
                            playName: value.playName,
                            playGroupName: value.playGroupName,
                            zjMoney: value.zjMoney,
                            orderNumber: value.orderNumber,
                            pk: value.pk,
                            playGroupId: value.playGroupId,
                            number: value.number,
                            content: value.content,
                            winOrLose: value.winOrLose,
                            perMoney: value.perMoney,
                            zhushu: value.zhushu,
                            status: value.status,
                            totalMoney: value.totalMoney,
                            playPl: value.playPl,
                            playId: value.playId,
                            canWin: mul(value.totalMoney, value.playPl)
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 状态
            var inputStatus = $("#inputStatus").val();
            if (inputStatus == '未结算') {
                status = 0;
                isZhongjiang = '';
            } else if (inputStatus == '已中奖') {
                status = 1;
                isZhongjiang = true;
            } else if (inputStatus == '未中奖') {
                status = 1;
                isZhongjiang = false;
            } else {
                status = "";
                isZhongjiang = '';
            }

            var inputCaizhong = $("#inputCaizhong").val();
            if (inputCaizhong == '重庆时时彩') {
                playGroupId = 1;
            } else if (inputCaizhong == '天津时时彩') {
                playGroupId = 2;
            } else if (inputCaizhong == '新疆时时彩') {
                playGroupId = 3;
            } else if (inputCaizhong == '体彩排列3') {
                playGroupId = 4;
            } else if (inputCaizhong == '福彩3D') {
                playGroupId = 5;
            } else if (inputCaizhong == '六合彩') {
                playGroupId = 6;
            } else if (inputCaizhong == '北京28') {
                playGroupId = 7;
            } else if (inputCaizhong == '北京快乐8') {
                playGroupId = 8;
            } else if (inputCaizhong == '北京PK10') {
                playGroupId = 9;
            } else if (inputCaizhong == '重庆幸运农场') {
                playGroupId = 10;
            } else if (inputCaizhong == '广东快乐十分') {
                playGroupId = 11;
            } else if (inputCaizhong == '三分时时彩') {
                playGroupId = 13;
            } else if (inputCaizhong == '幸运飞艇') {
                playGroupId = 14;
            } else if (inputCaizhong == '分分时时彩') {
                playGroupId = 15;
            } else if (inputCaizhong == '两分时时彩') {
                playGroupId = 16;
            } else if (inputCaizhong == '五分时时彩') {
                playGroupId = 17;
            } else if (inputCaizhong == '江苏快3') {
                playGroupId = 18;
            } else if (inputCaizhong == '湖北快3') {
                playGroupId = 19;
            } else if (inputCaizhong == '安徽快3') {
                playGroupId = 20;
            } else if (inputCaizhong == '吉林快3') {
                playGroupId = 21;
            } else if (inputCaizhong == '10分六合彩') {
                playGroupId = 22;
            } else if (inputCaizhong == '极速PK10') {
                playGroupId = 23;
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 团队流水
    $(document).on("pageInit", "#page-agent-tdls-list", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择类型</h1>\
            </header>';
        $("#inputType").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '彩金/入款优惠', '充值/用户入款', '提现/用户出款', '投注/投注扣款', '派奖/投注派奖', '撤单/投注撤单', '手动扣款', '手动存款', '提现/用户出款（拒绝）', '彩票返水', '彩票返点', '代理佣金']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var type = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetLiushui.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    type: type
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.agentTdlsList, function (index, value) {
                        var obj = {
                            pk: value.pk,
                            userId: value.userId,
                            coinOperType: value.coinOperType,
                            createTime: value.createTime,
                            money: value.money,
                            leftCoin: value.leftCoin,
                            remarks: value.remarks,
                            orderNo: value.orderNo,
                            account: value.account
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 状态
            var typeStr = $("#inputType").val();
            if (typeStr == "彩金/入款优惠") {
                type = 9;
            } else if (typeStr == "充值/用户入款") {
                type = 3;
            } else if (typeStr == "提现/用户出款") {
                type = 2;
            } else if (typeStr == "投注/投注扣款") {
                type = 11;
            } else if (typeStr == "派奖/投注派奖") {
                type = 12;
            } else if (typeStr == "撤单/投注撤单") {
                type = 13;
            } else if (typeStr == "手动扣款") {
                type = 14;
            } else if (typeStr == "手动存款") {
                type = 15;
            } else if (typeStr == "提现/用户出款（拒绝）") {
                type = 16;
            } else if (typeStr == "彩票返水") {
                type = 17;
            } else if (typeStr == "彩票返点") {
                type = 18;
            } else if (typeStr == "代理佣金") {
                type = 19;
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 团队流水
    $(document).on("pageInit", "#page-zjjl-list", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        var tmpHtml = '';
        // 状态选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择类型</h1>\
            </header>';
        $("#inputType").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '彩金/入款优惠', '充值/用户入款', '提现/用户出款', '投注/投注扣款', '派奖/投注派奖', '撤单/投注撤单', '手动扣款', '手动存款', '提现/用户出款（拒绝）', '彩票返水', '彩票返点', '代理佣金']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var type = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "member/ajaxGetLogUserCoinList.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime,
                    type: type
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.logUserCoinList, function (index, value) {
                        var obj = {
                            pk: value.pk,
                            coinOperType: value.coinOperType,
                            createTime: value.createTime,
                            money: value.money,
                            leftCoin: value.leftCoin,
                            remarks: value.remarks,
                            orderNo: value.orderNo
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            // 状态
            var typeStr = $("#inputType").val();
            if (typeStr == "彩金/入款优惠") {
                type = 9;
            } else if (typeStr == "充值/用户入款") {
                type = 3;
            } else if (typeStr == "提现/用户出款") {
                type = 2;
            } else if (typeStr == "投注/投注扣款") {
                type = 11;
            } else if (typeStr == "派奖/投注派奖") {
                type = 12;
            } else if (typeStr == "撤单/投注撤单") {
                type = 13;
            } else if (typeStr == "手动扣款") {
                type = 14;
            } else if (typeStr == "手动存款") {
                type = 15;
            } else if (typeStr == "提现/用户出款（拒绝）") {
                type = 16;
            } else if (typeStr == "彩票返水") {
                type = 17;
            } else if (typeStr == "彩票返点") {
                type = 18;
            } else if (typeStr == "代理佣金") {
                type = 19;
            }

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 佣金纪录
    $(document).on("pageInit", "#page-agent-yjjl-list", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetUserYjList.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: startTime,
                    endTime: endTime
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.agentUserYjList, function (index, value) {
                        var obj = {
                            fandian: value.fandian,
                            betMoney: value.betMoney,
                            userId: value.userId,
                            createTime: value.createTime,
                            userAccount: value.userAccount,
                            type: value.type,
                            yjMoney: value.yjMoney,
                            orderNo: value.orderNo
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getYesterdayStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getYesterdayEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-month") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd HH:MM");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd HH:MM");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 会员列表
    $(document).on("pageInit", "#page-agent-tdbb-list", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var startTime = '';
        var endTime = '';
        var account = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "agent/ajaxGetUserReport.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    startTime: isInit ? "" : startTime,
                    endTime: isInit ? "" : endTime,
                    account: account
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    $.each(json.agentUserReportList, function (index, value) {
                        var obj = {
                            account: value.account,
                            totalDepositMoney: value.totalDepositMoney.toFixed(3),
                            totalWithdrawMoney: value.totalWithdrawMoney.toFixed(3),
                            totalGameProfitMoney: value.totalGameProfitMoney.toFixed(3),
                            totalActivityMoney: value.totalActivityMoney.toFixed(3),
                            totalSscFanshuiMoney: value.totalSscFanshuiMoney.toFixed(3),
                            totalYjMoney: value.totalYjMoney.toFixed(3),
                            yingli: (value.totalGameProfitMoney + value.totalActivityMoney + value.totalSscFanshuiMoney).toFixed(3)
                        };
                        var html = template("template_item", obj);
                        $("#dataList .list-container").append(html);
                    });

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            getData(true);
        });
        // 预加载
        getData(true);

        // 筛选
        $("#btn-shaixuan").click(function () {
            account = $("input[name='account']").val();
            pageIndex = 1;
            startTime = $("#startTime").val();
            endTime = $("#endTime").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });

        // $(document).on("click", ".sfqy", function() {
        //     var flag = $("[data-checkbox_id='" + $(this).attr("data-id") + "']").is(":checked");
        //     return;
        //     enableOrDisable($(this).attr("data-id"), flag);
        // });

        $(document).on("click", ".qiyong", function () {
            enableOrDisable($(this).attr("data-id"), true);
        });

        $(document).on("click", ".jinyong", function () {
            enableOrDisable($(this).attr("data-id"), false);
        });

        function enableOrDisable(userId, isEnable) {
            var info = isEnable ? '确认启用该会员吗？' : '确认禁用该会员吗？';
            Tools.confirm(info, '确定', '取消', function () {
                ajaxRequest({
                    url: config.basePath + "agent/agentEnableUser.json",
                    data: {
                        userId: userId,
                        isEnable: isEnable
                    },
                    beforeSend: function () {
                        Tools.showLoading("请稍等...");
                    },
                    success: function (json) {
                        if (json.result == 1) {
                            Tools.toast("操作成功");
                            getData(true);
                            return;
                        }

                        Tools.toast("操作失败：" + json.description);
                    },
                    error: function (a, b, c) {
                        if (b == 'timeout') {
                            Tools.toast("操作超时，请稍后重试");
                            return;
                        }

                        Tools.toast("请求错误，请稍后重试");
                    },
                    complete: function () {
                        Tools.hideLoading();
                    }
                });
            });
        }
    });

    // 银行转账
    $(document).on("pageInit", "#page-cqk-zz-yhzz", function (e, id, page) {
        $("#startTime").datetimePicker({});
        $("#endTime").datetimePicker({});
        $("#startTime").val(dateFormat(getTodayStart(), "yyyy-mm-dd HH:MM"));
        $("#endTime").val(dateFormat(getTodayEnd(), "yyyy-mm-dd HH:MM"));
        var tmpBankCardId = '';

        var tmpHtml = '';

        tmpBankCardId = yhzzList[0].id;
        $("#inputSystemBank").val(yhzzList[0].bankName);
        $("#khyh").html(yhzzList[0].bankName);
        $("#khwd").html(yhzzList[0].subBankName);
        $("#khxm").html(yhzzList[0].userName);
        $("#kh").html(yhzzList[0].bankAccount);

        // 系统银行卡选择
        $("#inputSystemBank").click(function () {
            var buttons1 = [
                {
                    text: '请选择',
                    label: true
                }
            ];

            $.each(yhzzList, function (index, value) {
                buttons1.push({
                    text: value.bankName,
                    onClick: function () {
                        tmpBankCardId = value.id;
                        $("#inputSystemBank").val(value.bankName);
                        $("#khyh").html(value.bankName);
                        $("#khwd").html(value.subBankName);
                        $("#khxm").html(value.userName);
                        $("#kh").html(value.bankAccount);
                    }
                });
            });
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        // 渠道选择
        var depositChannelId = '';
        var qudaoList = [
            {id: 1, name: '在线银行'},
            {id: 1, name: '手机银行'},
            {id: 1, name: '柜台转账'},
            {id: 1, name: 'ATM现金转账'}];

        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];
        $.each(qudaoList, function (index, value) {
            buttons1.push({
                text: value.name,
                onClick: function () {
                    depositChannelId = value.id;
                    $("#inputType").val(value.name);
                }
            });
        });
        $("#inputType").click(function () {
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        // 转出银行选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择转出银行</h1>\
            </header>';
        var bankList = ['中国工商银行', '中国农业银行', '中国建设银行', '中国银行', '交通银行', '招商银行', '兴业银行', '浦发银行', '华夏银行', '中信银行', '中国光大银行', '广发银行', '中国邮政储蓄银行', '平安银行', '上海银行'];
        $("#inputBankName").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: bankList
                }
            ]
        });

        $("#btn-submit").click(function () {
            var bankCardId = tmpBankCardId;
            var userBankName = $("input[name='userBankName']").val();
            var bankAccount = $("input[name='bankAccount']").val();
            var money = $("input[name='money']").val();

            if (!bankCardId) {
                Tools.alert("请选择银行");
                return;
            }

            if (!userBankName) {
                Tools.alert("请选择转出银行");
                return;
            }

            if (!depositChannelId) {
                Tools.alert("请选择存款渠道");
                return;
            }

            if (!money) {
                Tools.alert("请输入金额");
                return;
            }

            if (!bankAccount) {
                Tools.alert("请输入正确格式的卡号");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/submitYhzz.json",
                data: {
                    bankCardId: bankCardId,
                    userBankName: userBankName,
                    depositChannelId: depositChannelId,
                    money: money,
                    bankAccount: bankAccount
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/czjl/list.html';
                        });
                        return;
                    }

                    Tools.toast("申请失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    // 徽信转账
    $(document).on("pageInit", "#page-cqk-zz-wxzz", function (e, id, page) {
        $("#time").datetimePicker({});

        var id = '';
        var minMoney = '';
        var maxMoney = '';

        var value = skInfoList[0];
        $("#inputSkInfo").val(value.username);
        $("#skzh").html(value.account);
        $("#skr").html(value.username);
        $("#description").html(value.description).show();
        id = value.id;
        minMoney = value.minMoney;
        maxMoney = value.maxMoney;

        if (value.imageId) {
            $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
            $(".cl-810").show();
        }
        $("#wxts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
        $("#wxts").show();

        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];
        $.each(skInfoList, function (index, value) {
            buttons1.push({
                text: value.username,
                onClick: function () {
                    $("#inputSkInfo").val(value.username);
                    $("#skzh").html(value.account);
                    $("#skr").html(value.username);
                    $("#description").html(value.description).show();
                    id = value.id;
                    minMoney = value.minMoney;
                    maxMoney = value.maxMoney;

                    if (value.imageId) {
                        $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
                        $(".cl-810").show();
                    } else {
                        $(".cl-810").hide();
                    }
                    $("#wxts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
                    $("#wxts").show();
                }
            });
        });
        // 收款账号选择
        $("#inputSkInfo").click(function () {
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        var buttons2 = [
            {
                text: '取消',
                bg: 'danger'
            }
        ];
        var groups = [buttons1, buttons2];
        $.actions(groups);

        $("#btn-submit").click(function () {
            var time = $("input[name='time']").val();
            var name = $("input[name='name']").val();
            var money = $("input[name='money']").val();

            if (!money) {
                Tools.alert("请输入金额");
                return;
            }

            if (!name) {
                Tools.alert("请输入昵称");
                return;
            }

            if (!time) {
                Tools.alert("请输入时间");
                return;
            }

            if (!id) {
                Tools.alert("请选择收款账号");
                return;
            }

            if (money < minMoney) {
                Tools.toast("最小充值金额为：" + minMoney + "元");
                return;
            }

            if (money > maxMoney) {
                Tools.toast("最大充值金额为：" + maxMoney + "元");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxSubmitWxzz.json",
                data: {
                    money: money,
                    userWeixinName: name,
                    weixinId: id,
                    time: time
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/czjl/list.html';
                        });
                        return;
                    }

                    Tools.toast("申请失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    // QQ转账
    $(document).on("pageInit", "#page-cqk-zz-qqzz", function (e, id, page) {
        $("#time").datetimePicker({});

        var id = '';
        var minMoney = '';
        var maxMoney = '';

        var value = skInfoList[0];
        $("#inputSkInfo").val(value.username);
        $("#skzh").html(value.account);
        $("#skr").html(value.username);
        $("#description").html(value.description).show();
        id = value.id;
        minMoney = value.minMoney;
        maxMoney = value.maxMoney;

        if (value.imageId) {
            $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
            $(".cl-810").show();
        }
        $("#wxts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
        $("#wxts").show();

        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];
        $.each(skInfoList, function (index, value) {
            buttons1.push({
                text: value.username,
                onClick: function () {
                    $("#inputSkInfo").val(value.username);
                    $("#skzh").html(value.account);
                    $("#skr").html(value.username);
                    $("#description").html(value.description).show();
                    id = value.id;
                    minMoney = value.minMoney;
                    maxMoney = value.maxMoney;

                    if (value.imageId) {
                        $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
                        $(".cl-810").show();
                    } else {
                        $(".cl-810").hide();
                    }
                    $("#wxts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
                    $("#wxts").show();
                }
            });
        });
        // 收款账号选择
        $("#inputSkInfo").click(function () {
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        $("#btn-submit").click(function () {
            var time = $("input[name='time']").val();
            var name = $("input[name='name']").val();
            var money = $("input[name='money']").val();

            if (!money) {
                Tools.alert("请输入金额");
                return;
            }

            if (!name) {
                Tools.alert("请输入昵称");
                return;
            }

            if (!time) {
                Tools.alert("请输入时间");
                return;
            }

            if (!id) {
                Tools.alert("请选择收款账号");
                return;
            }

            if (money < minMoney) {
                Tools.toast("最小充值金额为：" + minMoney + "元");
                return;
            }

            if (money > maxMoney) {
                Tools.toast("最大充值金额为：" + maxMoney + "元");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxSubmitQqzz.json",
                data: {
                    money: money,
                    userQqName: name,
                    qqId: id,
                    time: time
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/czjl/list.html';
                        });
                        return;
                    }

                    Tools.toast("申请失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    // 支付宝转账
    $(document).on("pageInit", "#page-cqk-zz-zfbzz", function (e, id, page) {
        $("#time").datetimePicker({});

        var id = '';
        var minMoney = '';
        var maxMoney = '';

        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];

        var value = skInfoList[0];
        $("#inputSkInfo").val(value.username);
        $("#skzh").html(value.account);
        $("#skr").html(value.username);
        $("#description").html(value.description).show();
        id = value.id;
        minMoney = value.minMoney;
        maxMoney = value.maxMoney;

        if (value.imageId) {
            $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
            $(".cl-810").show();
        }
        $.each(skInfoList, function (index, value) {
            buttons1.push({
                text: value.username,
                onClick: function () {
                    $("#inputSkInfo").val(value.username);
                    $("#skzh").html(value.account);
                    $("#skr").html(value.username);
                    id = value.id;
                    minMoney = value.minMoney;
                    maxMoney = value.maxMoney;

                    if (value.imageId) {
                        $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
                        $(".cl-810").show();
                    } else {
                        $(".cl-810").hide();
                    }
                    $("#wxts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
                    $("#wxts").show();
                }
            });
        });
        // 收款账号选择
        $("#inputSkInfo").click(function () {
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });
        var buttons2 = [
            {
                text: '取消',
                bg: 'danger'
            }
        ];
        var groups = [buttons1, buttons2];
        $.actions(groups);

        $("#btn-submit").click(function () {
            var time = $("input[name='time']").val();
            var name = $("input[name='name']").val();
            var money = $("input[name='money']").val();

            if (!money) {
                Tools.alert("请输入金额");
                return;
            }

            if (!name) {
                Tools.alert("请输入昵称");
                return;
            }

            if (!time) {
                Tools.alert("请输入时间");
                return;
            }

            if (!id) {
                Tools.alert("请选择收款账号");
                return;
            }

            if (money < minMoney) {
                Tools.toast("最小充值金额为：" + minMoney + "元");
                return;
            }

            if (money > maxMoney) {
                Tools.toast("最大充值金额为：" + maxMoney + "元");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxSubmitZfbzz.json",
                data: {
                    money: money,
                    userAlipayName: name,
                    alipayId: id,
                    time: time
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/czjl/list.html';
                        });
                        return;
                    }

                    Tools.toast("申请失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });

    // 财付通转账
    $(document).on("pageInit", "#page-cqk-zz-cftzz", function (e, id, page) {
        $("#time").datetimePicker({});

        var id = '';
        var minMoney = '';
        var maxMoney = '';

        var buttons1 = [
            {
                text: '请选择',
                label: true
            }
        ];

        var value = skInfoList[0];
        $("#inputSkInfo").val(value.username);
        $("#skzh").html(value.account);
        $("#skr").html(value.username);
        $("#description").html(value.description).show();
        id = value.id;
        minMoney = value.minMoney;
        maxMoney = value.maxMoney;

        if (value.imageId) {
            $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
            $(".cl-810").show();
        }

        $("#cftts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
        $("#cftts").show();

        $.each(skInfoList, function (index, value) {
            buttons1.push({
                text: value.username,
                onClick: function () {
                    $("#inputSkInfo").val(value.username);
                    $("#skzh").html(value.account);
                    $("#skr").html(value.username);
                    id = value.id;
                    minMoney = value.minMoney;
                    maxMoney = value.maxMoney;

                    if (value.imageId) {
                        $(".cl-810 img").attr("src", config.basePath + 'images/' + value.imageId + ".png");
                        $(".cl-810").show();
                    } else {
                        $(".cl-810").hide();
                    }
                    $("#cftts").html('最低限额：<i>' + minMoney + '</i>元，最高限额：<i>' + maxMoney + '</i>元');
                    $("#cftts").show();
                }
            });
        });
        // 收款账号选择
        $("#inputSkInfo").click(function () {
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);
        });

        $("#btn-submit").click(function () {
            var time = $("input[name='time']").val();
            var name = $("input[name='name']").val();
            var money = $("input[name='money']").val();

            if (!money) {
                Tools.alert("请输入金额");
                return;
            }

            if (!name) {
                Tools.alert("请输入昵称");
                return;
            }

            if (!time) {
                Tools.alert("请输入时间");
                return;
            }

            if (!id) {
                Tools.alert("请选择收款账号");
                return;
            }

            if (money < minMoney) {
                Tools.toast("最小充值金额为：" + minMoney + "元");
                return;
            }

            if (money > maxMoney) {
                Tools.toast("最大充值金额为：" + maxMoney + "元");
                return;
            }

            ajaxRequest({
                url: config.basePath + "member/ajaxSubmitCftzz.json",
                data: {
                    money: money,
                    userTenpayName: name,
                    tenpayId: id,
                    time: time
                },
                beforeSend: function () {
                    Tools.showLoading("请稍等...");
                },
                success: function (json) {
                    if (json.result == 1) {
                        Tools.alertCallback("您已成功提交申请,请耐心等待审核!", function () {
                            window.location.href = config.basePath + 'member/czjl/list.html';
                        });
                        return;
                    }

                    Tools.toast("申请失败：" + json.description);
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        });
    });
    $(document).on("pageInit", "#page-gcdt-cqssc", function (e, id, page) {
        initSscPage(1);

        $('.bg').click(function(){
            $(".bg").hide();
            $(".menu_alert").hide();
        });

        $('.cha').click(function(){
            $(".bg").hide();
            $(".menu_alert").hide();
        });
        $(".cl-602 a").eq(0).trigger("click");
    });

    $(document).on("pageInit", "#page-gcdt-ssq", function (e, id, page) {
        initSscPage(12);

        $('.bg').click(function(){
            $(".bg").hide();
            $(".menu_alert").hide();
        });

        $('.cha').click(function(){
            $(".bg").hide();
            $(".menu_alert").hide();
        });
        $(".cl-602 a").eq(0).trigger("click");
    });


    // 官方玩法说明
    $(document).on("pageInit","#page-wfsm-wfsm-gfwf",function(){
        $("#ssc-parent-menu .wfsm-602 a").click(function () {
            $(this).parent().find('.wfsm_color_select').removeClass('wfsm_color_select');
            $(this).addClass('wfsm_color_select');
        });
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-ffssc-gfwf", function (e, id, page) {
        initSscPage(15);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-efssc-gfwf", function (e, id, page) {
        initSscPage(16);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-sfssc-gfwf", function (e, id, page) {
        initSscPage(13);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-cqssc-gfwf", function (e, id, page) {
        initSscPage(1);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-tjssc-gfwf", function (e, id, page) {
        initSscPage(2);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-xjssc-gfwf", function (e, id, page) {
        initSscPage(3);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-pk10-gfwf", function (e, id, page) {
        initSscPage(9);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-jspk10-gfwf", function (e, id, page) {
        initSscPage(23);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-gd11x5-gfwf", function (e, id, page) {
        initSscPage(24);

        gfwfCommonClickEvent();
    });

    //官放初始化界面
    $(document).on("pageInit", "#page-gcdt-ssq-gfwf", function (e, id, page) {
        initSscPage(12);

        gfwfCommonClickEvent();
    });

    function gfwfCommonClickEvent() {
        //官方玩法，彩种玩法选择点击事件
        $(".wx-select a").unbind("click");  //移除被选元素的事件处理程序
        $(".wx-select a").click(function () {
            var nowPageToN = $(this).hasClass("selected");
            // 判断当前按钮是否已被触发
            if(!nowPageToN){
                var url = $(this).attr("data-url");
                getSubGfwfSscPage(url, function(){
                    //执行官方玩法事件
                    gfwfEvent();
                    renderPlayName();
                    $(".page").find(".gfwf_xz").addClass("gfwf_wh");
                    $(".page").find(".gfwf_mask2").addClass("Hide_Show2");
                    $(".page").find(".x_wrap").removeClass("Fixed");
                    $(".page").find(".gfwf_xz").removeClass("Fixed");
                    $(".page").find(".gfwf_mask2").removeClass("Fixed");

                    statusChange();
                    initArrSum();
                });
            }

            $(".wx-select a").removeClass("selected");
            $(".wx-select a").find("span").removeClass("zxfs");
            $(".wx-select a").find("span").addClass("staer1");
            $(this).addClass("selected");
            $(this).find("span").removeClass("staer1");
            $(this).find("span").addClass("zxfs");

            // 添加选中状态，方便获取相关数据
            $(".wx-select a.selected").removeClass("selected");
            $(this).addClass("selected");
            //清除当前注数与金额状态
            $("#zhushu").html("0");
            $("#nowMoney").html("0");
        });

        // $(".gfwf_xz .wx-select a").trigger("click");
        $(".wx-select2 a").click(function() {
            clearSelected();
            $(".wx-select2 a").removeClass("selected");
            $(".wx-select2 a").find("span").removeClass("zxfs");
            $(".wx-select2 a").find("span").addClass("staer1");
            $(this).addClass("selected");
            $(this).find("span").removeClass("staer1");
            $(this).find("span").addClass("zxfs");

            var id = $(this).attr("data-name");    //获取被选元素的数据
            $(".wx-select .show").removeClass("show").addClass("hide");
            $("#playGroup_" + id).removeClass("hide").addClass("show");

            $(".wx-select .show a").removeClass("selected");
            $(".wx-select .show a").find("span.zxfs").addClass("staer1");
            $(".wx-select .show a").find("span.zxfs").removeClass("zxfs");
            $(".wx-select .show a").find("span").eq(0).removeClass("staer1");
            $(".wx-select .show a").find("span").eq(0).addClass("zxfs");
            var url = $(".wx-select .show a").eq(0).attr("data-url");
            getSubGfwfSscPage(url, function(){
                //执行官方玩法事件
                gfwfEvent();
                renderPlayName();
                initArrSum();
            });

            // 添加选中状态，方便获取相关数据
            $(".wx-select a.selected").removeClass("selected");
            $(".wx-select .show a").eq(0).addClass("selected");
            //清除当前注数与金额状态
            $("#zhushu").html("0");
            $("#nowMoney").html("0");

            if ($(".wx-select .show a").length <= 1) {

                $(".page").find(".gfwf_xz").addClass("gfwf_wh");    //隐藏
                $(".page").find(".gfwf_mask2").addClass("Hide_Show2");
                $(".page").find(".x_wrap").removeClass("Fixed");
                $(".page").find(".gfwf_xz").removeClass("Fixed");
                $(".page").find(".gfwf_mask2").removeClass("Fixed");
            }

            renderPlayName();
        });

        function renderPlayName() {
            var groupName = $(".wx-select2 a.selected span.zxfs").html();
            var playName = $(".wx-select .show a span.zxfs").parent().attr("data-name");

            $("#gfwf_playGroupName").html(groupName);
            $("#gfwf_playName").html(playName);

            $(".gfwf-title span").html(groupName);
            $(".gfwf-playName span font").html(playName);
        }

        $(".wx-select2 a").eq(0).trigger("click");
    }

    $(document).on("pageInit", "#page-gcdt-tjssc", function (e, id, page) {
        initSscPage(2);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-xjssc", function (e, id, page) {
        initSscPage(3);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-pl3", function (e, id, page) {
        initSscPage(4);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-fc3d", function (e, id, page) {
        initSscPage(5);
        $(".cl-602 a").eq(0).trigger("click");
        $(".cl-610 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-lhc", function (e, id, page) {
        initSscPage(6);

        $(".cl-602 a").eq(0).trigger("click");
        $(".cl-610 a").eq(1).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-bj28", function (e, id, page) {
        initSscPage(7);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-kl8", function (e, id, page) {
        initSscPage(8);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-pk10", function (e, id, page) {
        initSscPage(9);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-xync", function (e, id, page) {
        initSscPage(10);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-klsf", function (e, id, page) {
        initSscPage(11);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-sfssc", function (e, id, page) {
        initSscPage(13);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-xyft", function (e, id, page) {
        initSscPage(14);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-ffssc", function (e, id, page) {
        initSscPage(15);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-efssc", function (e, id, page) {
        initSscPage(16);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-wfssc", function (e, id, page) {
        initSscPage(17);
        $(".cl-602 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-jsk3", function (e, id, page) {
        initSscPage(18);
        $(".cl-602 a").eq(0).trigger("click");

    });
    $(document).on("pageInit", "#page-gcdt-hbk3", function (e, id, page) {
        initSscPage(19);
        $(".cl-602 a").eq(0).trigger("click");

    });
    $(document).on("pageInit", "#page-gcdt-ahk3", function (e, id, page) {
        initSscPage(20);
        $(".cl-602 a").eq(0).trigger("click");

    });
    $(document).on("pageInit", "#page-gcdt-jlk3", function (e, id, page) {
        initSscPage(21);
        $(".cl-602 a").eq(0).trigger("click");

    });
    $(document).on("pageInit", "#page-gcdt-sflhc", function (e, id, page) {
        initSscPage(22);
        $(".cl-602 a").eq(0).trigger("click");
        $(".cl-610 a").eq(0).trigger("click");
    });
    $(document).on("pageInit", "#page-gcdt-jspk10", function (e, id, page) {
        initSscPage(23);
        $(".cl-602 a").eq(0).trigger("click");
        $(".cl-610 a").eq(0).trigger("click");
    });

    // 开奖记录
    $(document).on("pageInit", "#page-kjjl-list", function (e, id, page) {
        $("#inputOpenDate").datetimePicker2({});

        var tmpHtml = '';
        // 彩种选择
        tmpHtml = '\
            <header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">请选择状态</h1>\
            </header>';
        $("#inputCaizhong").picker({
            toolbarTemplate: tmpHtml,
            cssClass: 'cl-1000',
            cols: [
                {
                    textAlign: 'center',
                    values: ['任意', '重庆时时彩', '天津时时彩', '新疆时时彩', '体彩排列3', '福彩3D', '六合彩', '北京28', '北京快乐8', '北京PK10', '重庆幸运农场', '广东快乐十分', '幸运飞艇', '三分时时彩', '两分时时彩', '分分时时彩', '五分时时彩', '江苏快3', '湖北快3', '安徽快3', '吉林快3', '极速PK10']
                }
            ]
        });

        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var openDate = '';
        var playGroupId = '';
        var number = '';
        var startTime = '';
        var endTime = '';

        if (typeof globalPlayGroupId != 'undefined' && globalPlayGroupId != '' && !isNaN(globalPlayGroupId)) {
            playGroupId = parseInt(globalPlayGroupId);
            if (playGroupId == 1) {
                $("#inputCaizhong").val("重庆时时彩");
            } else if (playGroupId == 2) {
                $("#inputCaizhong").val("天津时时彩");
            } else if (playGroupId == 3) {
                $("#inputCaizhong").val("新疆时时彩");
            } else if (playGroupId == 4) {
                $("#inputCaizhong").val("体彩排列3");
            } else if (playGroupId == 5) {
                $("#inputCaizhong").val("福彩3D");
            } else if (playGroupId == 6) {
                $("#inputCaizhong").val("六合彩");
            } else if (playGroupId == 7) {
                $("#inputCaizhong").val("北京28");
            } else if (playGroupId == 8) {
                $("#inputCaizhong").val("北京快乐8");
            } else if (playGroupId == 9) {
                $("#inputCaizhong").val("北京PK10");
            } else if (playGroupId == 10) {
                $("#inputCaizhong").val("重庆幸运农场");
            } else if (playGroupId == 11) {
                $("#inputCaizhong").val("广东快乐十分");
            } else if (playGroupId == 13) {
                $("#inputCaizhong").val("三分时时彩");
            } else if (playGroupId == 14) {
                $("#inputCaizhong").val("幸运飞艇");
            } else if (playGroupId == 15) {
                $("#inputCaizhong").val("分分时时彩");
            } else if (playGroupId == 16) {
                $("#inputCaizhong").val("两分时时彩");
            } else if (playGroupId == 17) {
                $("#inputCaizhong").val("五分时时彩");
            } else if (playGroupId == 18) {
                $("#inputCaizhong").val("江苏快3");
            } else if (playGroupId == 19) {
                $("#inputCaizhong").val("湖北快3");
            } else if (playGroupId == 20) {
                $("#inputCaizhong").val("安徽快3")
            } else if (playGroupId == 21) {
                $("#inputCaizhong").val("吉林快3")
            } else if (playGroupId == 22) {
                $("#inputCaizhong").val("10分六合彩")
            } else if (playGroupId == 23) {
                $("#inputCaizhong").val("极速PK10")
            }
        }

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "ssc/ajaxGetDataHistory.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    openDate: openDate,
                    number: number,
                    playGroupId: playGroupId,
                    startTime: startTime,
                    endTime: endTime
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    var str = "";
                    $.each(json.sscHistoryList, function (index, value) {
                        var tmpPlayGroupId = Tools.parseInt(value.playGroupId);

                        if ($.inArray(tmpPlayGroupId, [1, 2, 3, 13, 15, 16, 17]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;

                            var sum = num1 + num2 + num3 + num4 + num5;
                            obj.sum = sum;

                            obj.ds = sum % 2 == 0 ? '双' : '单';
                            obj.dx = 0 <= sum && sum <= 22 ? '小' : '大';
                            var cha = num1 - num5;
                            obj.lh = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [4, 5, 18, 19, 20, 21]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            var hezhi = num1 + num2 + num3;
                            var danS = hezhi % 2 == 0 ? '双' : '单';
                            var daX = hezhi <= 10 ? '小' : '大';

                            obj.hezhi = hezhi;
                            obj.danS = danS;
                            obj.daX = daX;
                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [6, 22]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;

                            obj.sx1 = getSxName(num1);
                            obj.sx2 = getSxName(num2);
                            obj.sx3 = getSxName(num3);
                            obj.sx4 = getSxName(num4);
                            obj.sx5 = getSxName(num5);
                            obj.sx6 = getSxName(num6);
                            obj.sx7 = getSxName(num7);

                            obj.bose1 = getBose(num1);
                            obj.bose2 = getBose(num2);
                            obj.bose3 = getBose(num3);
                            obj.bose4 = getBose(num4);
                            obj.bose5 = getBose(num5);
                            obj.bose6 = getBose(num6);
                            obj.bose7 = getBose(num7);

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [7]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [8]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);
                            var num11 = Tools.parseInt(numArr[10]);
                            var num12 = Tools.parseInt(numArr[11]);
                            var num13 = Tools.parseInt(numArr[12]);
                            var num14 = Tools.parseInt(numArr[13]);
                            var num15 = Tools.parseInt(numArr[14]);
                            var num16 = Tools.parseInt(numArr[15]);
                            var num17 = Tools.parseInt(numArr[16]);
                            var num18 = Tools.parseInt(numArr[17]);
                            var num19 = Tools.parseInt(numArr[18]);
                            var num20 = Tools.parseInt(numArr[19]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;
                            obj.num11 = num11;
                            obj.num12 = num12;
                            obj.num13 = num13;
                            obj.num14 = num14;
                            obj.num15 = num15;
                            obj.num16 = num16;
                            obj.num17 = num17;
                            obj.num18 = num18;
                            obj.num19 = num19;
                            obj.num20 = num20;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [9, 14, 23]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [10, 11]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");

                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
                            obj.sum = sum;

                            obj.str1 = sum;
                            obj.str2 = sum % 2 == 0 ? '双' : '单';
                            obj.str3 = sum == 84 ? '和' : (sum < 84 ? '小' : '大');
                            obj.str4 = sum >= 5 ? '尾大' : '尾小';
                            var cha = num1 - num8;
                            obj.str5 = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        }
                    });

                    $("#dataList .list-container").append(str);

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-today") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                openDate = dateFormat(getTodayStart(), "yyyy-mm-dd");
                startTime = '';
                endTime = '';
                getData(true);
            } else if (id == "btn-yesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                openDate = dateFormat(getYesterdayStart(), "yyyy-mm-dd");
                startTime = '';
                endTime = '';
                getData(true);
            } else if (id == "btn-preYesterday") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                openDate = dateFormat(getPreYesterdayStart(), "yyyy-mm-dd");
                startTime = '';
                endTime = '';
                getData(true);
            } else if (id == "btn-thisWeek") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                openDate = '';
                startTime = dateFormat(getThisWeekStart(), "yyyy-mm-dd");
                endTime = dateFormat(getThisWeekEnd(), "yyyy-mm-dd");
                getData(true);
            } else if (id == "btn-lastWeek") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                pageIndex = 1;
                openDate = '';
                startTime = dateFormat(getLastWeekStart(), "yyyy-mm-dd");
                endTime = dateFormat(getLastWeekEnd(), "yyyy-mm-dd");
                getData(true);
            } else if (id == "btn-thisMonth") {
                $("#buttonsTabList .button.active").removeClass("active");
                startTime = '';
                endTime = '';
                $(this).addClass("active");

                pageIndex = 1;
                openDate = '';
                startTime = dateFormat(getThisMonthStart(), "yyyy-mm-dd");
                endTime = dateFormat(getThisMonthEnd(), "yyyy-mm-dd");
                getData(true);
            } else if (id == "btn-zdy") {
                $.openPanel("#panel-right");
            }
        });

        // 筛选
        $("#btn-shaixuan").click(function () {
            $("#buttonsTabList .button.active").removeClass("active");
            $("[data-id='btn-zdy']").addClass("active");

            var inputCaizhong = $("#inputCaizhong").val();
            if (inputCaizhong == '重庆时时彩') {
                playGroupId = 1;
            } else if (inputCaizhong == '天津时时彩') {
                playGroupId = 2;
            } else if (inputCaizhong == '新疆时时彩') {
                playGroupId = 3;
            } else if (inputCaizhong == '体彩排列3') {
                playGroupId = 4;
            } else if (inputCaizhong == '福彩3D') {
                playGroupId = 5;
            } else if (inputCaizhong == '六合彩') {
                playGroupId = 6;
            } else if (inputCaizhong == '北京28') {
                playGroupId = 7;
            } else if (inputCaizhong == '北京快乐8') {
                playGroupId = 8;
            } else if (inputCaizhong == '北京PK10') {
                playGroupId = 9;
            } else if (inputCaizhong == '重庆幸运农场') {
                playGroupId = 10;
            } else if (inputCaizhong == '广东快乐十分') {
                playGroupId = 11;
            } else if (inputCaizhong == '三分时时彩') {
                playGroupId = 13;
            } else if (inputCaizhong == '幸运飞艇') {
                playGroupId = 14;
            } else if (inputCaizhong == '分分时时彩') {
                playGroupId = 15;
            } else if (inputCaizhong == '两分时时彩') {
                playGroupId = 16;
            } else if (inputCaizhong == '五分时时彩') {
                playGroupId = 17;
            } else if (inputCaizhong == '江苏快3') {
                playGroupId = 18;
            } else if (inputCaizhong == '湖北快3') {
                playGroupId = 19;
            } else if (inputCaizhong == '安徽快3') {
                playGroupId = 20;
            } else if (inputCaizhong == '吉林快3') {
                playGroupId = 21;
            } else if (inputCaizhong == '10分六合彩') {
                playGroupId = 22;
            } else if (inputCaizhong == '极速PK10') {
                playGroupId = 23;
            }

            pageIndex = 1;
            openDate = $("#inputOpenDate").val();
            number = $("input[name='number']").val();
            // status, Integer type
            $.closePanel();
            getData(true);
        });
        // 预加载
        if (playGroupId == 1) {
            $("#inputCaizhong").val("重庆时时彩");
        } else if (playGroupId == 2) {
            $("#inputCaizhong").val("天津时时彩");
        } else if (playGroupId == 3) {
            $("#inputCaizhong").val("新疆时时彩");
        } else if (playGroupId == 4) {
            $("#inputCaizhong").val("体彩排列3");
        } else if (playGroupId == 5) {
            $("#inputCaizhong").val("福彩3D");
        } else if (playGroupId == 6) {
            $("#inputCaizhong").val("六合彩");
        } else if (playGroupId == 7) {
            $("#inputCaizhong").val("北京28");
        } else if (playGroupId == 8) {
            $("#inputCaizhong").val("北京快乐8");
        } else if (playGroupId == 9) {
            $("#inputCaizhong").val("北京PK10");
        } else if (playGroupId == 10) {
            $("#inputCaizhong").val("重庆幸运农场");
        } else if (playGroupId == 11) {
            $("#inputCaizhong").val("广东快乐十分");
        } else if (playGroupId == 13) {
            $("#inputCaizhong").val("三分时时彩");
        } else if (playGroupId == 14) {
            $("#inputCaizhong").val("幸运飞艇");
        } else if (playGroupId == 15) {
            $("#inputCaizhong").val("分分时时彩");
        } else if (playGroupId == 16) {
            $("#inputCaizhong").val("两分时时彩");
        } else if (playGroupId == 17) {
            $("#inputCaizhong").val("五分时时彩");
        } else if (playGroupId == 18) {
            $("#inputCaizhong").val("江苏快3");
        } else if (playGroupId == 19) {
            $("#inputCaizhong").val("湖北快3");
        } else if (playGroupId == 20) {
            $("#inputCaizhong").val("安徽快3");
        } else if (playGroupId == 21) {
            $("#inputCaizhong").val("吉林快3");
        } else if (playGroupId == 22) {
            $("#inputCaizhong").val("10分六合彩");
        } else if (playGroupId == 23) {
            $("#inputCaizhong").val("极速PK10");
        }


        // 低频彩显示最近记录
        // if ($.inArray(playGroupId, [4, 5, 6]) >= 0) {
        //     getData(true);
        // } else {
        $("#buttonsTabList .button").eq(0).trigger("click");
        // }
    });


    // 开奖记录
    $(document).on("pageInit", "#page-wfsm-lskj", function (e, id, page) {
        // 无限滚动
        var loading = false;    // 加载flag
        var pageIndex = 1;  // 页码
        var pageSize = 10;  // 每页数量
        var openDate = '';
        var playGroupId = globalPlayGroupId;
        var number = '';

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "ssc/ajaxGetDataHistory.json",
                data: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    playGroupId: playGroupId
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    var str = "";
                    $.each(json.sscHistoryList, function (index, value) {
                        var tmpPlayGroupId = Tools.parseInt(value.playGroupId);

                        if ($.inArray(tmpPlayGroupId, [1, 2, 3, 13, 15, 16, 17]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;

                            var sum = num1 + num2 + num3 + num4 + num5;
                            obj.sum = sum;

                            obj.ds = sum % 2 == 0 ? '双' : '单';
                            obj.dx = 0 <= sum && sum <= 22 ? '小' : '大';
                            var cha = num1 - num5;
                            obj.lh = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [4, 5, 18, 19, 20, 21]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            var hezhi = num1 + num2 + num3;
                            var danS = hezhi % 2 == 0 ? '双' : '单';
                            var daX = hezhi <= 10 ? '小' : '大';

                            obj.hezhi = hezhi;
                            obj.danS = danS;
                            obj.daX = daX;
                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [6, 22]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;

                            obj.sx1 = getSxName(num1);
                            obj.sx2 = getSxName(num2);
                            obj.sx3 = getSxName(num3);
                            obj.sx4 = getSxName(num4);
                            obj.sx5 = getSxName(num5);
                            obj.sx6 = getSxName(num6);
                            obj.sx7 = getSxName(num7);

                            obj.bose1 = getBose(num1);
                            obj.bose2 = getBose(num2);
                            obj.bose3 = getBose(num3);
                            obj.bose4 = getBose(num4);
                            obj.bose5 = getBose(num5);
                            obj.bose6 = getBose(num6);
                            obj.bose7 = getBose(num7);

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [7]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [8]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);
                            var num11 = Tools.parseInt(numArr[10]);
                            var num12 = Tools.parseInt(numArr[11]);
                            var num13 = Tools.parseInt(numArr[12]);
                            var num14 = Tools.parseInt(numArr[13]);
                            var num15 = Tools.parseInt(numArr[14]);
                            var num16 = Tools.parseInt(numArr[15]);
                            var num17 = Tools.parseInt(numArr[16]);
                            var num18 = Tools.parseInt(numArr[17]);
                            var num19 = Tools.parseInt(numArr[18]);
                            var num20 = Tools.parseInt(numArr[19]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;
                            obj.num11 = num11;
                            obj.num12 = num12;
                            obj.num13 = num13;
                            obj.num14 = num14;
                            obj.num15 = num15;
                            obj.num16 = num16;
                            obj.num17 = num17;
                            obj.num18 = num18;
                            obj.num19 = num19;
                            obj.num20 = num20;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [9, 14, 23]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [10, 11]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");

                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
                            obj.sum = sum;

                            obj.str1 = sum;
                            obj.str2 = sum % 2 == 0 ? '双' : '单';
                            obj.str3 = sum == 84 ? '和' : (sum < 84 ? '小' : '大');
                            obj.str4 = sum >= 5 ? '尾大' : '尾小';
                            var cha = num1 - num8;
                            obj.str5 = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        }
                    });

                    $("#dataList .list-container").append(str);

                    if (json.total == 0) {
                        $("#dataList").hide();
                        $(".no-right-record").show();
                    } else {
                        $("#dataList").show();
                        $(".no-right-record").hide();
                    }

                    // 没有更多数据了
                    if (!json.hasNextPage) {
                        // 加载完毕，则注销无限加载事件，以防不必要的加载
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        // 删除加载提示符
                        $('.infinite-scroll-preloader').hide();
                    } else {
                        // 重新绑定无限滚动
                        $.attachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').show();
                    }

                    pageIndex = json.nextPage;
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 无限滚动重置
                    $.refreshScroller();
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom', function () {
            getData();
        });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            pageIndex = 1;
            getData(true);
        });
        // 预加载
        getData();
    });
    // 开奖记录
    $(document).on("pageInit", "#page-kjjl-all", function (e, id, page) {
        // 无限滚动
        var loading = false;    // 加载flag
        var type = 0;

        function getData(isInit) {
            if (loading) return;
            ajaxRequest({
                url: config.basePath + "ssc/ajaxGetAllDataHistory.json",
                data: {
                    type: type
                },
                beforeSend: function () {
                    loading = true;
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }

                    if (typeof isInit != 'undefined' && isInit) {
                        $("#dataList .list-container").html('');
                    }

                    var str = "";
                    $.each(json.sscHistoryList, function (index, value) {
                        var tmpPlayGroupId = Tools.parseInt(value.playGroupId);
                        if ($.inArray(tmpPlayGroupId, [1, 2, 3, 13, 15, 16, 17]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;

                            var sum = num1 + num2 + num3 + num4 + num5;
                            obj.sum = sum;

                            obj.ds = sum % 2 == 0 ? '双' : '单';
                            obj.dx = 0 <= sum && sum <= 22 ? '小' : '大';
                            var cha = num1 - num5;
                            obj.lh = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [4, 5, 18, 19, 20, 21]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            var hezhi = num1 + num2 + num3;
                            var danS = hezhi % 2 == 0 ? '双' : '单';
                            var daX = hezhi <= 10 ? '小' : '大';

                            obj.hezhi = hezhi;
                            obj.danS = danS;
                            obj.daX = daX;
                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [6]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;

                            obj.sx1 = getSxName(num1);
                            obj.sx2 = getSxName(num2);
                            obj.sx3 = getSxName(num3);
                            obj.sx4 = getSxName(num4);
                            obj.sx5 = getSxName(num5);
                            obj.sx6 = getSxName(num6);
                            obj.sx7 = getSxName(num7);

                            obj.bose1 = getBose(num1);
                            obj.bose2 = getBose(num2);
                            obj.bose3 = getBose(num3);
                            obj.bose4 = getBose(num4);
                            obj.bose5 = getBose(num5);
                            obj.bose6 = getBose(num6);
                            obj.bose7 = getBose(num7);

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [7]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [8]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;


                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);
                            var num11 = Tools.parseInt(numArr[10]);
                            var num12 = Tools.parseInt(numArr[11]);
                            var num13 = Tools.parseInt(numArr[12]);
                            var num14 = Tools.parseInt(numArr[13]);
                            var num15 = Tools.parseInt(numArr[14]);
                            var num16 = Tools.parseInt(numArr[15]);
                            var num17 = Tools.parseInt(numArr[16]);
                            var num18 = Tools.parseInt(numArr[17]);
                            var num19 = Tools.parseInt(numArr[18]);
                            var num20 = Tools.parseInt(numArr[19]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;
                            obj.num11 = num11;
                            obj.num12 = num12;
                            obj.num13 = num13;
                            obj.num14 = num14;
                            obj.num15 = num15;
                            obj.num16 = num16;
                            obj.num17 = num17;
                            obj.num18 = num18;
                            obj.num19 = num19;
                            obj.num20 = num20;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [9, 14, 23]) >= 0) {

                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");
                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);
                            var num9 = Tools.parseInt(numArr[8]);
                            var num10 = Tools.parseInt(numArr[9]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            obj.num9 = num9;
                            obj.num10 = num10;

                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        } else if ($.inArray(tmpPlayGroupId, [10, 11]) >= 0) {
                            var obj = {};

                            obj.openTime = value.openTime;
                            obj.playGroupId = tmpPlayGroupId;
                            obj.number = value.number;

                            var numArr = value.openCode.split(",");

                            var num1 = Tools.parseInt(numArr[0]);
                            var num2 = Tools.parseInt(numArr[1]);
                            var num3 = Tools.parseInt(numArr[2]);
                            var num4 = Tools.parseInt(numArr[3]);
                            var num5 = Tools.parseInt(numArr[4]);
                            var num6 = Tools.parseInt(numArr[5]);
                            var num7 = Tools.parseInt(numArr[6]);
                            var num8 = Tools.parseInt(numArr[7]);

                            obj.num1 = num1;
                            obj.num2 = num2;
                            obj.num3 = num3;
                            obj.num4 = num4;
                            obj.num5 = num5;
                            obj.num6 = num6;
                            obj.num7 = num7;
                            obj.num8 = num8;
                            var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
                            obj.sum = sum;

                            obj.str1 = sum;
                            obj.str2 = sum % 2 == 0 ? '双' : '单';
                            obj.str3 = sum == 84 ? '和' : (sum < 84 ? '小' : '大');
                            obj.str4 = sum >= 5 ? '尾大' : '尾小';
                            var cha = num1 - num8;
                            obj.str5 = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
                            var html = template("template_" + tmpPlayGroupId, obj);
                            str += html;
                        }
                    });

                    $("#dataList .list-container").append(str);
                    $("#dataList").show();
                },
                error: function (a, b, c) {
                    if (b == 'timeout') {
                        Tools.toast("操作超时，请稍后重试");
                        return;
                    }

                    Tools.toast("请求错误，请稍后重试");
                },
                complete: function () {
                    loading = false;
                    // 下拉刷新重置
                    $.pullToRefreshDone('.pull-to-refresh-content');
                }
            });
        }

        // 无限滚动
        // // 注册'infinite'事件处理函数
        // $(document).on('infinite', '.infinite-scroll-bottom',function() {
        //     getData();
        // });

        // 下拉刷新
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content', function (e) {
            getData(true);
        });

        $("#buttonsTabList .button").click(function () {
            var id = $(this).attr("data-id");
            if (id == "btn-all") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                type = 0;
                getData(true);
            } else if (id == "btn-gpc") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                type = 1;
                getData(true);
            } else if (id == "btn-dpc") {
                $("#buttonsTabList .button.active").removeClass("active");
                $(this).addClass("active");

                type = 2;
                getData(true);
            }
        });

        // 预加载
        $("#buttonsTabList .button").eq(0).trigger("click");
    });

    // 开奖记录
    $(document).on("pageInit", "#page-kjjl-bqxq", function (e, id, page) {
        // function renderData() {
        //     var str = '';
        //     var json = openData;
        //     $.each(json.sscHistoryList, function (index, value) {
        //         var tmpPlayGroupId = Tools.parseInt(value.playGroupId);
        //
        //         if ($.inArray(tmpPlayGroupId, [1, 2, 3]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //             var num4 = Tools.parseInt(numArr[3]);
        //             var num5 = Tools.parseInt(numArr[4]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //             obj.num4 = num4;
        //             obj.num5 = num5;
        //
        //             var sum = num1 + num2 + num3 + num4 + num5;
        //             obj.sum = sum;
        //
        //             obj.ds = sum % 2 == 0 ? '双' : '单';
        //             obj.dx = 0 <= sum && sum <= 22 ? '小' : '大';
        //             var cha = num1 - num2;
        //             obj.lh = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [4, 5]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //
        //
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [6]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //
        //
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //             var num4 = Tools.parseInt(numArr[3]);
        //             var num5 = Tools.parseInt(numArr[4]);
        //             var num6 = Tools.parseInt(numArr[5]);
        //             var num7 = Tools.parseInt(numArr[6]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //             obj.num4 = num4;
        //             obj.num5 = num5;
        //             obj.num6 = num6;
        //             obj.num7 = num7;
        //
        //             obj.sx1 = getSxName(num1);
        //             obj.sx2 = getSxName(num2);
        //             obj.sx3 = getSxName(num3);
        //             obj.sx4 = getSxName(num4);
        //             obj.sx5 = getSxName(num5);
        //             obj.sx6 = getSxName(num6);
        //             obj.sx7 = getSxName(num7);
        //
        //             obj.bose1 = getBose(num1);
        //             obj.bose2 = getBose(num2);
        //             obj.bose3 = getBose(num3);
        //             obj.bose4 = getBose(num4);
        //             obj.bose5 = getBose(num5);
        //             obj.bose6 = getBose(num6);
        //             obj.bose7 = getBose(num7);
        //
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [7]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //
        //
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [8]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //
        //
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //             var num4 = Tools.parseInt(numArr[3]);
        //             var num5 = Tools.parseInt(numArr[4]);
        //             var num6 = Tools.parseInt(numArr[5]);
        //             var num7 = Tools.parseInt(numArr[6]);
        //             var num8 = Tools.parseInt(numArr[7]);
        //             var num9 = Tools.parseInt(numArr[8]);
        //             var num10 = Tools.parseInt(numArr[9]);
        //             var num11 = Tools.parseInt(numArr[10]);
        //             var num12 = Tools.parseInt(numArr[11]);
        //             var num13 = Tools.parseInt(numArr[12]);
        //             var num14 = Tools.parseInt(numArr[13]);
        //             var num15 = Tools.parseInt(numArr[14]);
        //             var num16 = Tools.parseInt(numArr[15]);
        //             var num17 = Tools.parseInt(numArr[16]);
        //             var num18 = Tools.parseInt(numArr[17]);
        //             var num19 = Tools.parseInt(numArr[18]);
        //             var num20 = Tools.parseInt(numArr[19]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //             obj.num4 = num4;
        //             obj.num5 = num5;
        //             obj.num6 = num6;
        //             obj.num7 = num7;
        //             obj.num8 = num8;
        //             obj.num9 = num9;
        //             obj.num10 = num10;
        //             obj.num11 = num11;
        //             obj.num12 = num12;
        //             obj.num13 = num13;
        //             obj.num14 = num14;
        //             obj.num15 = num15;
        //             obj.num16 = num16;
        //             obj.num17 = num17;
        //             obj.num18 = num18;
        //             obj.num19 = num19;
        //             obj.num20 = num20;
        //
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [9]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //
        //
        //
        //             var numArr = value.openCode.split(",");
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //             var num4 = Tools.parseInt(numArr[3]);
        //             var num5 = Tools.parseInt(numArr[4]);
        //             var num6 = Tools.parseInt(numArr[5]);
        //             var num7 = Tools.parseInt(numArr[6]);
        //             var num8 = Tools.parseInt(numArr[7]);
        //             var num9 = Tools.parseInt(numArr[8]);
        //             var num10 = Tools.parseInt(numArr[9]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //             obj.num4 = num4;
        //             obj.num5 = num5;
        //             obj.num6 = num6;
        //             obj.num7 = num7;
        //             obj.num8 = num8;
        //             obj.num9 = num9;
        //             obj.num10 = num10;
        //
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         } else if ($.inArray(tmpPlayGroupId, [10, 11]) >= 0) {
        //             var obj = {};
        //
        //             obj.openTime = value.openTime;
        //             obj.playGroupId = tmpPlayGroupId;
        //             obj.number = value.number;
        //
        //             var numArr = value.openCode.split(",");
        //
        //             var num1 = Tools.parseInt(numArr[0]);
        //             var num2 = Tools.parseInt(numArr[1]);
        //             var num3 = Tools.parseInt(numArr[2]);
        //             var num4 = Tools.parseInt(numArr[3]);
        //             var num5 = Tools.parseInt(numArr[4]);
        //             var num6 = Tools.parseInt(numArr[5]);
        //             var num7 = Tools.parseInt(numArr[6]);
        //             var num8 = Tools.parseInt(numArr[7]);
        //
        //             obj.num1 = num1;
        //             obj.num2 = num2;
        //             obj.num3 = num3;
        //             obj.num4 = num4;
        //             obj.num5 = num5;
        //             obj.num6 = num6;
        //             obj.num7 = num7;
        //             obj.num8 = num8;
        //             var sum = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8;
        //             obj.sum = sum;
        //
        //             obj.str1 = sum;
        //             obj.str2 = sum % 2 == 0 ? '双' : '单';
        //             obj.str3 = sum == 84 ? '和' : (sum < 84 ? '小' : '大');
        //             obj.str4 = sum >= 5 ? '尾大' : '尾小';
        //             var cha = num1 - num8;
        //             obj.str5 = cha == 0 ? '和' : (cha > 0 ? '龙' : '虎');
        //             var html = template("template_" + tmpPlayGroupId, obj);
        //             str += html;
        //         }
        //     });
        //
        //     $("#dataList .list-container").append(str);
        //     $("#dataList").show();
        // }
        //
        // // $("#buttonsTabList .button").click(function() {
        // //     var id = $(this).attr("data-id");
        // //     if (id == "btn-bqxq") {
        // //         $("#buttonsTabList .button.active").removeClass("active");
        // //         $(this).addClass("active");
        // //
        // //         renderData();
        // //     } else if (id == "btn-gdqc") {
        // //         $("#buttonsTabList .button.active").removeClass("active");
        // //         $(this).addClass("active");
        // //     }
        // // });
        // //
        // // // 预加载
        // // $("#buttonsTabList .button").eq(0).trigger("click");
        // renderData();
        //
        // var flag;
        // setInterval(function() {
        //     var time = $(".time").attr("data-time");
        //     if (typeof playGroupId == 'undefined') {
        //         return;
        //     }
        //
        //     // 更新数据
        //     if (typeof time == "undefined" || isNaN(time) || time == 0) {
        //         var updateTime = $(".time").attr("data-update_time");
        //
        //         if (typeof flag == 'undefined' || flag == false || typeof updateTime == 'undefined') {
        //             if ((new Date()).getTime() - updateTime < 5 * 1000) {
        //                 return;
        //             }
        //             ajaxRequest({
        //                 url: config.basePath + "ssc/getSscOpenTimePer.json",
        //                 data: {
        //                     playGroupId: playGroupId
        //                 },
        //                 beforeSend: function() {
        //                     flag = true;
        //
        //                 },
        //                 success: function(json) {
        //                     if (json.result != 1) {
        //                         return;
        //                     }
        //                     $(".time").attr("data-time", json.leftTime).attr("data-update_time", (new Date()).getTime());
        //                     $(".info").html(json.opening ? "距下期封盘：" : "距离开奖");
        //                 },
        //                 error: function(a, b, c) {
        //                 },
        //                 complete: function() {
        //                     flag = false;
        //                 }
        //             });
        //         }
        //     }
        //
        //     if (typeof time != "undefined" && !isNaN(time) && time > 0) {
        //         --time;
        //         $(".time").attr("data-time", time);
        //
        //         var tmpTime = time;
        //         var hour = Math.floor(tmpTime / 60 / 60);
        //         tmpTime -= hour * 60 * 60;
        //         var minute = Math.floor(tmpTime  / 60);
        //         tmpTime -= minute * 60;
        //         var second = tmpTime;
        //
        //         var tmpStr = "";
        //         if (hour > 0) {
        //             tmpStr += '<i>' + (hour < 10 ? '0' + hour : hour) + '</i><font>:</font>';
        //         }
        //         tmpStr += '<i>' + (minute < 10 ? '0' + minute : minute) + '</i><font>:</font>';
        //         tmpStr += '<i>' + (second < 10 ? '0' + second : second) + '</i>';
        //         $(".time").html(tmpStr);
        //     }
        // }, 1000);
    });

    $(document).on("pageInit", "#page-zst-jbzst", function (e, id, page) {
        var tmpData = null;
        ajaxGetData(playGroupId, 30); //默认加载数据

        $("#ssc-parent-menu .re-cl-602 .gengduo").click(
            function () {
                $(".click-qishu-btns").toggle();
            }
        );
        //走势图里，实现点击选中的结果 “就收回下拉菜单”
        $(".click-qishu-btns a").click(
            function () {
                $(".click-qishu-btns").toggle();
                $("#ssc-parent-menu .re-cl-602 .gengduo").css("color", "gray");
            }
        );

        //点击实现循环切换走势图 “更多期数” 的文字颜色
        $("#ssc-parent-menu .re-cl-602 .gengduo").click(
            function () {
                var changes = "red";
                var getColor = $(this).css('color');
                if (getColor != changes) {
                    $(this).css('color', 'red');
                } else {
                    $(this).css('color', 'gray');
                }
            }
        );

        $(".click-qishu-btns a").click(function () {
            $(".click-qishu-btns a").removeClass('a_bg');
            $(this).addClass('a_bg');
            tmpData = null;
            var qishu = $(this).attr("data-qishu");
            ajaxGetData(playGroupId, qishu);
        });

        $(".qishu-btns a").click(function () {
            tmpData = null;
            var qishu = $(this).attr("data-qishu");
            $(this).parent().find(".active").removeClass("active");
            $(this).addClass("active");
            ajaxGetData(playGroupId, qishu);
        });

        $(".index-btns a").click(function () {
            $(this).parent().find(".active").removeClass("active");
            $(this).addClass("active");
            ajaxGetData(playGroupId, null);
        });

        $(".index-sm-btns a").click(function () {
            $(this).parent().find(".active").removeClass("active");
            $(this).addClass("active");
            var index = $(this).data('index');
            if (index == 5) {//显示龙虎、总单、双
                $('.zst-cl-1-dx').hide();
                $('.zst-cl-1-lh').show();
            } else {
                $('.zst-cl-1-lh').hide();
                $('.zst-cl-1-dx').show();
            }
            ajaxGetData(playGroupId, null);
        });

        //双面走势
        $("#ssc-parent-menu .re-cl-602 a").click(function () {
            var name_F = $(this).data('name');
            $(this).parent().find('a').removeClass('choose');
            $(this).addClass('choose');

            if (name_F == 'sm') {
                $('#sub-menu_sm-list').show();
                $('#sub-menu-list').hide();
                $(".index-sm-btns a").parent().find(".active").removeClass("active");
                $(".index-sm-btns a:first-child").addClass("active");
            } else {
                $('#sub-menu_sm-list').hide();
                $('#sub-menu-list').show();
                $(".index-btns a").parent().find(".active").removeClass("active");
                $(".index-btns a:first-child").addClass("active");
            }
            ajaxGetData(playGroupId, null);
        });

        function ajaxGetData(playGroupId, pageSize) {
            if (tmpData) {
                renderData(tmpData);
                return;
            }
            var data = {};
            data.pageIndex = 1;
            if (null != playGroupId) {
                data.playGroupId = playGroupId;
            }
            if (null != pageSize) {
                data.pageSize = pageSize;
            }
            ajaxRequest({
                url: config.basePath + "ssc/ajaxGetHistory.json",
                data: data,
                beforeSend: function () {
                    Tools.showLoading("加载中...");
                },
                success: function (json) {
                    if (json.result != 1) {
                        return;
                    }
                    var data = json.sscHistoryList;

                    // data.reverse();
                    // 渲染数据
                    renderData(data);
                    tmpData = data;
                },
                complete: function () {
                    Tools.hideLoading();
                }
            });
        }
        // $(".qishu-btns a").eq(0).trigger("click");
        goBackCommon();
    });
    // 初始化
    $.init();
});

//安卓与苹果兼容 返回
function goBackCommon(){
    var u = navigator.userAgent;
    var goBack=document.getElementById("goBack");
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        //针对ios原生浏览器处理
        if(goBack != null && !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && /(Safari)/i.test(u)){
            goBack.setAttribute("onclick","javascript:window.location=document.referrer;");
        }
    }

    if(isAndroid){
        // 返回按钮
        $(".bar-nav .fanhui").click(function () {
            if ($.config.router == true) {
                $.router.back();
            } else {
                back();
            }
        });
    }
}

//双色球字符解析
function getTrueStrQiu(strWei, temp){
    var tempNew = '';
    if(strWei == '第一球'){
        tempNew = temp.replace('第一球','1');
    } else if(strWei == '第二球'){
        tempNew = temp.replace('第二球','2');
    } else if(strWei == '第三球'){
        tempNew = temp.replace('第三球','3');
    } else if(strWei == '第四球'){
        tempNew = temp.replace('第四球','4');
    } else if(strWei == '第五球'){
        tempNew = temp.replace('第五球','5');
    } else if(strWei == '第六球'){
        tempNew = temp.replace('第六球','6');
    }
    return tempNew;
}

function copy(str) {
    var result = false;
    try {
        var save = function (e) {
            e.clipboardData.setData('text/plain', str);
            e.preventDefault();
        }
        document.addEventListener('copy', save);
        result = document.execCommand('copy');
        document.removeEventListener('copy', save);
    } catch (e) {
    }
    return result;
}

function clearUserToken() {
    Tools.setCookie("uid", '', {path: "/", expires: -1});
    Tools.setCookie("token", '', {path: "/", expires: -1});
}

function setUserToken(userId, token) {
    clearUserToken();
    Tools.setCookie("uid", userId, {path: "/"});
    Tools.setCookie("token", token, {path: "/"});
}

function checkUserLogined() {
    var uid = Tools.getCookie("uid");
    var token = Tools.getCookie("token");

    if (typeof uid == 'undefined' || typeof token == 'undefined' || !uid || !token) {
        return false;
    }
    return true;
}

function refreshMoney() {
    ajaxRequest({
        url: config.basePath + "member/updateUserInfo.json",
        beforeSend: function () {
            $(".userMoney").html("刷新中");
        },
        success: function (json) {
            if (json.result != 1) {
                return;
            }
            $(".userMoney").html(json.balance);
        }
    });
}

function sigout() {
    ajaxRequest({
        url: config.basePath + "member/ajaxSigout.json",
        beforeSend: function () {
        },
        success: function (json) {
            Tools.setCookie("uid", '', {path: "/", expires: -1});
            Tools.setCookie("token", '', {path: "/", expires: -1});
            window.location.href = config.basePath;
        }
    });
}

function getTodayStart() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function getTodayEnd() {
    var date = new Date(getTodayStart().getTime() + 24 * 60 * 60 * 1000);
    return date;
}

function getYesterdayStart() {
    var date = new Date(getTodayStart().getTime() - 24 * 60 * 60 * 1000);
    return date;
}

function getYesterdayEnd() {
    return getTodayStart();
}

function getPreYesterdayStart() {
    var date = new Date(getTodayStart().getTime() - 2 * 24 * 60 * 60 * 1000);
    return date;
}

function getThisWeekStart() {
    var date = new Date();
    var day = date.getDay();
    if (day == 0) {
        day = 7;
    }
    var timestamp = date.getTime() - (day - 1) * 24 * 60 * 60 * 1000;
    timestamp = timestamp - date.getHours() * 60 * 60 * 1000;
    timestamp = timestamp - date.getMinutes() * 60 * 1000;
    timestamp = timestamp - date.getSeconds() * 1000;
    timestamp = timestamp - date.getMilliseconds();
    return new Date(timestamp);
}

function getThisWeekEnd() {
    var date = new Date(getThisWeekStart().getTime() + 7 * 24 * 60 * 60 * 1000);
    return date;
}

function getLastWeekStart() {
    var date = new Date(getThisWeekStart().getTime() - 7 * 24 * 60 * 60 * 1000);
    return date;
}

function getLastWeekEnd() {
    var date = new Date(getThisWeekEnd().getTime() - 7 * 24 * 60 * 60 * 1000);
    return date;
}

function getPreYesterdayEnd() {
    return getYesterdayStart();
}

function getThisMonthStart() {
    var date = new Date();
    var timestamp = date.getTime();
    timestamp = timestamp - (date.getDate() - 1) * 24 * 60 * 60 * 1000;
    timestamp = timestamp - date.getHours() * 60 * 60 * 1000;
    timestamp = timestamp - date.getMinutes() * 60 * 1000;
    timestamp = timestamp - date.getSeconds() * 1000;
    timestamp = timestamp - date.getMilliseconds();
    return new Date(timestamp);
}

function getThisMonthEnd() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    return new Date(year, month, 1);
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

function showSubMenu(obj) {
    if ($(obj).find(".cl-1002").hasClass("show")) {
        $(".cl-1002").removeClass("show").animate({"bottom": "-20rem"});
    } else {
        $(".cl-1002").removeClass("show").animate({"bottom": "-20rem"});
        $(obj).find(".cl-1002").addClass("show").animate({"bottom": "3rem"});

    }

    // $(".panel-overlay").css({margin-})
}
function kfz() {
    Tools.toast("开发中，敬请期待！");
}

function noaccessToast(layerName) {
    Tools.toast(layerName + "无权访问");
}

var lhcLastDataFlag = null;
function showLhcLastDataSx() {
    $("#sxInfo").show();
    $("#numInfo").hide();

    if (null != lhcLastDataFlag) {
        clearTimout(lhcLastDataFlag);
        lhcLastDataFlag = null;
    }
    lhcLastDataFlag = setTimeout(function () {
        showLhcLastDataNum();
    }, 3000);
}
function showLhcLastDataNum() {
    if (null != lhcLastDataFlag) {
        clearTimeout(lhcLastDataFlag);
        lhcLastDataFlag = null;
    }
    $("#numInfo").show();
    $("#sxInfo").hide();
}

function kefuToast() {
    Tools.toast("请联系在线客服");
}

$(function () {     // 官方玩法点击事件
    $(".title_cq").click(
        function () {
            if ($(".BeginFind").is(".Hide_Show")) {   //判断是否存在  Hide_Show ,否则就执行 else
                $(".page").find(".Hide_Show").removeClass("Hide_Show");
            } else {
                $(".page").find(".BeginFind").addClass("Hide_Show");
            }
        }
    );

    // 蒙版点击
    $(".gfwf_mask").click(function() {
        $(".page").find(".BeginFind").addClass("Hide_Show");
    });

    $(".gfwf_mask2").click(function() {
        $(".page").find(".gfwf_xz").addClass("gfwf_wh");    //隐藏
        $(".page").find(".gfwf_mask2").addClass("Hide_Show2");
        $(".page").find(".x_wrap").removeClass("Fixed");
        $(".page").find(".gfwf_xz").removeClass("Fixed");
        $(".page").find(".gfwf_mask2").removeClass("Fixed");
    });
});

//打开玩法说明弹框
function openMenu(){
    $('.menu_wfsm').removeClass('hide_wfsm');
    // $('.bg_menu').removeClass('hide_wfsm');
    $('.bg_menu').show();

    $('.menu_alert').hide();
    $('.bg').hide();
}
function openMenuGfwf(){
    $('.menu_wfsm_gfwf').removeClass('hide_wfsm_gfwf');
    // $('.bg_menu').removeClass('hide_wfsm');
    $('.bg_menu_gfwf').show();

    $('.menu_alert').hide();
    $('.bg').hide();
}


//wfsm关闭弹框
function menu_close() {
    $('.menu_wfsm').addClass('hide_wfsm');
    // $('.bg_menu').addClass('hide_wfsm');
    $('.bg_menu').hide();
}
//wfsm关闭弹框
function menu_close_gfwf() {
    $('.menu_wfsm_gfwf').addClass('hide_wfsm_gfwf');
    // $('.bg_menu').addClass('hide_wfsm');
    $('.bg_menu_gfwf').hide();
}


//实现 直选方式 的点击事件。
$(function () {
        $(".x_3 span").click(
            function () {
                if ($(".gfwf_xz").is(".gfwf_wh")) {
                    $(".page").find(".gfwf_xz").removeClass("gfwf_wh");    // 显示
                    $(".page").find(".gfwf_mask2").removeClass("Hide_Show2");
                } else {
                    $(".page").find(".gfwf_xz").addClass("gfwf_wh");    //隐藏
                    $(".page").find(".gfwf_mask2").addClass("Hide_Show2");
                }

                if ($(".x_wrap").is(".Fixed")) {   //判断  Fixed 是否存在，否则else
                    $(".page").find(".x_wrap").removeClass("Fixed");
                    $(".page").find(".gfwf_xz").removeClass("Fixed");
                    $(".page").find(".gfwf_mask2").removeClass("Fixed");
                } else {
                    $(".page").find(".x_wrap").addClass("Fixed");
                    $(".page").find(".gfwf_xz").addClass("Fixed");
                    $(".page").find(".gfwf_mask2").addClass("Fixed");
                }
            }
        );
    }
);