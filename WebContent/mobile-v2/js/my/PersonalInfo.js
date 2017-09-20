/**
 * Created by fei on 16-10-15.
 */
//主体内容滚动条
mui('.mui-scroll-wrapper').scroll();

mui("body").on("tap", "[data-href]", function() {
    var _href = $(this).data('href');
    mui.openWindow({
        url: _href,
        id: _href,
        extras: {},
        createNew: false,
        show: {
            autoShow: true
        },
        waiting: {
            autoShow: true,
            title: window.top.message.my_auto['正在加载']
        }
    });
});
(function($, doc) {
    $.init();
    $.ready(function() {
        //普通示例
        var userPicker = new $.PopPicker();
        userPicker.setData([{
            value: 'male',
            text: '男'
        }, {
            value: 'female',
            text: '女'
        }, {
            value: 'secret',
            text: '不限'
        }]);
        var showUserPickerButton = doc.getElementById('sexSelect');
        if(showUserPickerButton!=null){
            showUserPickerButton.addEventListener('tap', function(event) {
                userPicker.show(function(items) {
                    showUserPickerButton.innerText = items[0].text;
                    showUserPickerButton.value = items[0].value;

                    doc.getElementById('sex').value = items[0].value;

                    //返回 false 可以阻止选择框的关闭
                    //return false;
                });
            }, false);
        }

        //日期选择
        var result=doc.getElementById('birthday');
        var btn=doc.getElementById('birthdaySelect');
        if(btn!=null){
            btn.addEventListener('tap', function() {
                var optionsJson = this.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = this.getAttribute('id');
                /*
                 * 首次显示时实例化组件
                 * 示例为了简洁，将 options 放在了按钮的 dom 上
                 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                 */
                var picker = new $.DtPicker(options);
                picker.show(function(rs) {
                    /*
                     * rs.value 拼合后的 value
                     * rs.text 拼合后的 text
                     * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                     * rs.m 月，用法同年
                     * rs.d 日，用法同年
                     * rs.h 时，用法同年
                     * rs.i 分（minutes 的第二个字母），用法同年
                     */
                    result.value = rs.text;
                    btn.text = rs.text;
                    /*
                     * 返回 false 可以阻止选择框的关闭
                     * return false;
                     */
                    /*
                     * 释放组件资源，释放后将将不能再操作组件
                     * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                     * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                     * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                     */
//                    picker.dispose();
                });
            }, false);
        }

        var questionButton = doc.getElementById('questionButton');
        if(questionButton) {
            mui.ajax(root + '/signUp/optionText.html?option=securityIssues', {
                dataType: 'json',
                type: 'post',
                async: true,
                success: function (data) {
                    if(data) {
                        var questionPick = new $.PopPicker();
                        questionPick.setData(data);
                        questionButton.addEventListener('tap', function (event) {
                            questionPick.show(function (items) {
                                doc.getElementById("sysUserProtection.question1").value = items[0].value;
                                questionButton.innerText = items[0].text;
                            });
                        }, false);
                    }
                },
                error: function (xhr, type, errorThrown) {
                }
            });
        }

    });
})(mui, document);

mui("body").on("tap","#updatePerson",function(){
    var $form = $("form");
    if (!$form.valid()) {
        return false;
    }
    var $this = $(this);
    $this.attr("disabled","disabled");
    var data =$form.serialize();
    mui.ajax(root + '/personalInfo/updatePersonInfo.html',{
        data:data,
        dataType:'json',
        type:'post',
        async:true,
        success:function(data){
            if (!data.status){
                toast(data.msg);
                $this.removeAttr("disabled");
            }else {
                toast(window.top.message.my_auto["更新成功"]);
                setTimeout(function () {
                    location.reload();
                },1000);

            }
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            console.log(type);
            $this.removeAttr("disabled");
        }
    });
});
