/**
 * Created by fei on 16-10-15.
 */
//主体内容滚动条
mui.init();

mui('.mui-scroll-wrapper').scroll();

mui("body").on("tap", "[data-href]", function() {
    var _href = $(this).data('href');
    openWindow(_href);
});

function openWindow(_href) {
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
            title: '正在加载...'
        }
    })
}

(function($, doc) {
    $.ready(function() {
        mui.ajax(root + '/bankCard/bankList.html',{
            dataType:'json',
            type:'post',
            async:true,
            success:function(data){
                var userPicker = new $.PopPicker();
                userPicker.setData(data);
                var selectBank = doc.getElementById('selectBank');
                if(selectBank!=null){
                    selectBank.addEventListener('tap', function(event) {
                        userPicker.show(function (items) {
                            doc.getElementById('bankLabel').innerHTML = items[0].text;
                            $("#bankName")[0].defaultValue = items[0].value;
                        });
                    })
                }

            },
            error:function(xhr,type,errorThrown){
                //异常处理；
                console.log(type);
            }
        });

    });
})(mui, document);

mui("body").on("tap","#submitBankCard", function () {
    var $submit=$("#submitBankCard");
    var $form = $('form');
    if (!$form.valid()) {
        return false;
    }
    $submit.attr("disabled",true);
    var data =$form.serialize();
    mui.ajax(root + '/bankCard/submitBankCard.html',{
        dataType:'json',
        data:data,
        type:'post',
        async:true,
        success:function(data){
            if (data.state){
               toast(data.msg);
                setTimeout(function () {
                    if(data.action == 'withdraw') {
                        var _href = root + '/wallet/withdraw/index.html';
                        if(os == 'android')
                            window.gamebox.finish();
                        else if(os == 'app_ios')
                            goBack();
                        else
                            openWindow(_href);
                    } else {
                        if(os == 'android')
                            window.history.go(-1);
                        else if(os == 'app_ios')
                            goBack();
                        else
                            mui.back();
                    }

                },1000);
            }else {
                $submit.attr("disabled",false);
                toast(data.msg);
                $(document).find("input[name=gb\\.token]").val(data.token);
            }
        },
        error:function(xhr,type,errorThrown){
            if (xhr.status == 608) {
                mui.alert(window.top.message.my_auto['请勿重复提交']);
            }else{
                $submit.attr("disabled",false);
            }
        }
    });
});
