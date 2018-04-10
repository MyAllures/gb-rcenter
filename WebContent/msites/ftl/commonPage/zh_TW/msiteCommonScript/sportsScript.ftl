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
                if (apiId=="4" || apiId=="19" || apiId=="12" || apiId=="21"|| apiId=="37") {
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

    function beforeSendPage(apiId){
        if (apiId == "4"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://im.ampinplayopt0matrix.com");
        }else if (apiId=="12"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://hyxu36.uv178.com/whb/view.php");
        }else if(apiId=="19"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://mkt.ampinplayopt0matrix.com?lang=cs");
        }else if(apiId=="21"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://pocdesignother0.com");
        }else if(apiId=="37"){
            document.getElementById('sportFrame').contentWindow.location.replace("https://bc.ampinplayopt0matrix.com/#/sport/?lang=zhh");
        }/*else if(apiId=="23"){
            document.getElementById('sportFrame').contentWindow.location.replace("http://opussport.ampinplayopt0matrix.com/sports.aspx");
        }*/
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
            var isAutoPay = getCookie("isAutoPay");
            if(isAutoPay == 'true') {
                getAutoApiUrl(apiId,gameCode,apiTypeId);
            } else {
                getNotAutoApiUrl(apiId, gameCode, apiTypeId);
            }
        }
    }

    function getAutoApiUrl(apiId,gameCode,apiTypeId) {
        $.ajax({
            type: "POST",
            url: "transfer/auto/loginAndAutoTransfer.html?t=" + new Date().getTime().toString(36),
            dataType: "JSON",
            data: {
                apiId: apiId,
                gameCode: gameCode,
                apiTypeId: apiTypeId,
                lobbyUrl: window.location.href
            },
            beforeSend:function(){
                beforeSendPage(apiId);
            },
            success: function(data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            //https协议支持体育嵌套
                            if (apiTypeId == "3" && apiId=="4" || apiId=="19" || apiId=="12" || apiId=="21"|| apiId=="37") {
                                if (window.localStorage) {
                                    localStorage.re_url = result.defaultLink;
                                }
                            }else{
                                if (apiId) {
                                    var newWindow = window.open();
                                    newWindow.location ="/commonPage/gamePage/loading.html?apiId="+apiId+"&apiTypeId="+apiTypeId+"&gameCode="+gameCode;
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
                    if (!data.loginSuccess &&( data.errMsg =='' || data.errMsg == null)){

                    }else {
                        alert(data.errMsg);
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    // loginObj.getLoginPopup();
                }else {

                }
            }
        })
    }

    function getNotAutoApiUrl(apiId,gameCode,apiTypeId) {
        $.ajax({
            type: "POST",
            url: "api/login.html?t=" + new Date().getTime().toString(36),
            dataType: "JSON",
            data: {
                apiId: apiId,
                gameCode: gameCode,
                apiTypeId: apiTypeId,
                gamesHall: window.location.href
            },
            beforeSend:function(){
                beforeSendPage(apiId);
            },
            success: function(data) {
                if (data.loginSuccess) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            //https协议支持体育嵌套
                            if (apiTypeId == "3" && apiId=="4" || apiId=="19" || apiId=="12" || apiId=="21"|| apiId=="37") {
                                if (window.localStorage) {
                                    localStorage.re_url = result.defaultLink;
                                }
                            }else{
                                if (apiId) {
                                    var newWindow = window.open();
                                    newWindow.location ="/commonPage/gamePage/loading.html?apiId="+apiId+"&apiTypeId="+apiTypeId+"&gameCode="+gameCode;
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
                    if (!data.loginSuccess &&( data.errMsg =='' || data.errMsg == null)){

                    }else {
                        alert(data.errMsg);
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    // loginObj.getLoginPopup();
                }else {

                }
            }
        })
    }
</script>