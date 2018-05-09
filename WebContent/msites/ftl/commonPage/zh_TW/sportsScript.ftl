<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_TW/msiteCommonScript/sportsScript.ftl">-->
<script>
    $(function(){
        var apiId = getlocationParam("apiId");
        var bool = sportsMaintain(apiId);
        if(apiId=="12"){
            $(".sports-box").addClass("hg");
            $(".bulk-frame").append('<span class="sports-hg-fix"></span>');
            $(".bulk-frame").append('<span class="sports-hg-fix2"></span>');
        }

        if(sessionStorage.is_login=="false"){
            var protocol = window.location.protocol;
            if(protocol.indexOf("https:")>-1){
                //https协议支持体育嵌套
                if (sportsNest(apiId)) {
                    if(bool){
                        $(".bulk-frame").find("span").val("维护中");
                    }else {
                        beforeSendPage(apiId);
                    }
                    getApiUrl(apiId,'',3,bool);
                }
            }else{
                if(bool){
                    $(".bulk-frame").find("span").val("维护中");
                }else {
                    beforeSendPage(apiId);
                }
                getApiUrl(apiId,'',3,bool);
            }
        }else {
            getApiUrl(apiId,'',3,bool);
        }
    });

    function sportsMaintain(apiId){
        var sportsNewTime = $("._user_time").attr("time");
        var startTime = $($(".lottery_btn_"+apiId)[0]).attr("starttime");
        var endTime = $($(".lottery_btn_"+apiId)[0]).attr("starttime");
        var sVal = parseInt(startTime);
        var eVal = parseInt(endTime);
        if(sVal<sportsNewTime && eVal > sportsNewTime){
            return true;
        }else{
            return false;
        }
    }

    function beforeSendPage(apiId) {
        var url = "";
        switch (apiId) {
            case '${data.apiProviders["IM"].code}':
                url = "https://im.ampinplayopt0matrix.com";
                break;
            case '${data.apiProviders["SS"].code}':
                url = "https://hyxu36.uv178.com/whb/view.php";
                break;
            case '${data.apiProviders["SB"].code}':
                url = "https://mkt.ampinplayopt0matrix.com?lang=cs";
                break;
            case '${data.apiProviders["DWT"].code}':
                url = "https://pocdesignother0.com";
                break;
            case '${data.apiProviders["BC"].code}':
                url = "https://bc.ampinplayopt0matrix.com/#/sport/?lang=zhh";
                break;
            case '${data.apiProviders["XJSPORTS"].code}':
                url = getBcPage(apiId);
                break;
        }
        if(url!=undefined && url!=""){
            document.getElementById('sportFrame').contentWindow.location.replace(url);
        }
    }

    function getBcPage(apiId) {
        $.ajax({
            type: "post",
            url: "/demo.html?apiId=" + apiId + "&apiTypeId=3&language=zh_CN",
            dataType: 'json',
            async:false,
            success: function (data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        return result.defaultLink;
                    }
                }else{}
            },
            error: function (e) {
                console.log('188体育error');
            }
        });
    }

    function getApiUrl(apiId,gameCode,apiTypeId,bool){
        var demoModel = sessionStorage.demoModel;
        if(demoModel){
            if(demoModel == "MODEL_4_PLATFORM"){
                alert("请使用正式账号登录");
                return;
            }else if(demoModel == "MODEL_4_MOCK_ACCOUNT"){
                if(apiId != 21 && apiId != 22){
                    alert("模拟账号不能登录该游戏");
                    return;
                }
            }
        }
        if(!bool){
            getGameApiUrl(apiId,gameCode,apiTypeId);
        }
    }

    function getGameApiUrl(apiId,gameCode,apiTypeId) {
        var url = "";
        var data ={};
        var isAutoPay = getCookie("isAutoPay");
        if(isAutoPay == 'true') {
            url = "transfer/auto/loginAndAutoTransfer.html?t=" + new Date().getTime().toString(36);
            data = {apiId: apiId,gameCode: gameCode,apiTypeId: apiTypeId,lobbyUrl:window.location.href}
        } else {
            url = "api/login.html?t=" + new Date().getTime().toString(36);
            data = {apiId: apiId,gameCode: gameCode,apiTypeId: apiTypeId,gamesHall:window.location.href}
        }

        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: data,
            success: function(data) {
                var success = null;
                if(isAutoPay=="true"){
                    success = data.isSuccess;
                }else{
                    success = data.loginSuccess;
                }

                if (success) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            //https协议支持体育嵌套
                            if (sportsNest(apiId)) {
                                if (window.localStorage) {
                                    localStorage.re_url = result.defaultLink;
                                }
                            }else{
                                if (apiId) {
                                    window.open().location ="/commonPage/gamePage/loading.html?apiId="+apiId+"&apiTypeId="+apiTypeId+"&gameCode="+gameCode;
                                }
                                return;
                            }
                        }else{
                            if (window.localStorage) {
                                localStorage.re_url = result.defaultLink;
                            }
                        }
                    } else {
                        if (window.localStorage) {
                            localStorage.re_url = result.links[apiTypeId];
                        }
                    }
                    document.getElementById('sportFrame').contentWindow.location.replace(localStorage.re_url);
                } else {
                    beforeSendPage(apiId);
                }
            },
            error: function(error) {
                if (error.status === 600) {

                }else {

                }
            }
        })
    }

    //是否支持体育嵌套显示
    function sportsNest(apiId) {
        if(apiId=="4" || apiId=="19" || apiId=="12" || apiId=="21" || apiId=="37" || apiId=="40"){
            return true;
        }else{
            return false;
        }
    }
</script>