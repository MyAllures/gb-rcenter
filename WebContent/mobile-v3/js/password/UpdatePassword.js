/**
 * Created by legend on 18-3-12.
 */



$(function () {

    var options = {
        /*主页面滚动指定容器，可自行指定范围*/
        containerScroll: '.mui-scroll-wrapper',
        /*右侧菜单上下滚动，可自行指定范围*/
        rightMenuScroll: '.mui-scroll-wrapper.mui-assets',
        /*禁用侧滑手势指定样式*/
        disabledHandSlip: ['mui-off-canvas-left']
    };
    muiInit(options);

});

/**
 * 键盘监听事件，实时监测密码强度
 * @param value
 * @returns {number}
 */
 function checkIntensity(value) {
     if (value == null || value.length < 1) {
         $("#PStrength>i").removeClass("active")
     }else if (value.length != 0 && value.length < 6) {//如果不满6位并且不为空
         $("#firstELement").addClass("active");
     }else if (value.len != 0 && value.length > 6) {
         var modes = 0;
             if (value.length < 1) return modes;
             if (/\d/.test(value)) modes++; //数字
             if (/[a-z]/.test(value)) modes++; //小写
             if (/[A-Z]/.test(value)) modes++; //大写
             if (/\W/.test(value)) modes++; //特殊字符

     //逻辑处理
         switch (modes) {
             case 1:
                 chooseLevel(1);
                 return 1;
             case 2:
                 chooseLevel(2);
                 return 2;
             case 3:
                 chooseLevel(3);
                 return 3;
             case 4:
                 chooseLevel(3);
                 return 3;
            }
     }
 }

function chooseLevel(count) {
    var eles = $("#PStrength>i");
    eles.removeClass("active");
    for (var i = 0; i <=count-1; i++) {
        var element = eles[i];
        element.className = 'active';
        // eles[i].attr("class","active");
    }

}



/**
 * 修改密码
 * @param obj
 * @param options
 * @returns {boolean}
 */
function updatePassword(obj, options) {
    var $form = $("#updatePwdForm");
    bindFormValidation($form);
    if (!$form || !$form.valid()) {
        return false;
    }
    $("#updatePwd").attr("disabled","disabled");

    var options = {
        url:"/my/password/updatePassword.html",
        type:"POST",
        data: {
            "password":$("#password").val(),
            "newPassword":$("#newPassword").val(),
            "newRePassword":$("#confirmPassword").val(),
            "code":$("#code").val()
        },
        success:function (data) {
            // var datas = eval("("+data+")");
            if (data.state) {
                toast(data.msg);
                //mui.back(); //如果修改登录密码成功则返回到我的页面
                logout();
            } else {
                toast(data.msg);
                saveCallbak(data);
            }
        },
        error:function (data) {
            toast(window.top.message.passport_auto['服务忙']);
        }
    }
    muiAjax(options);
}

function saveCallbak(result) {
    var _this=this;
    var PrivilegeStatusEnum = {ALLOW_ACCESS:100,LOCKED:99};
    if (result.stateCode == PrivilegeStatusEnum.ALLOW_ACCESS || result.stateCode == PrivilegeStatusEnum.LOCKED) {
        mui.back;
    } else {
        // $(_this.formSelector)[0].reset();
        $("#updatePwdForm")[0].reset();
        if (result.remainTimes < 4) {
            refreshCode();
            showCode(result.remainTimes);
        }
    }
    return false;
}

function showCode(times) {
    var _this=this;
    $('[name=flag]').val(true);
    $('#privilegeMsg span:last').text(times);
    $('#privilegeMsg').show();
    $('#privilegeTipDiv').show();
}




/**
 * 刷新
 */
function refreshCode() {
    var url = null;
    var img = $('#privilegeTipDiv img');
    if (!url) {
        url = $(img).attr('src');
    }
    $(img).attr('src', url);
    $("form"+" input[name='code']").val("");
}

