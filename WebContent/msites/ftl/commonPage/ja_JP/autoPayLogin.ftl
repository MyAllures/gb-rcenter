<script>
        /**
     * 免转登录
     **/
    function autoPayLogin() {
        var url = "/transfer/auto/loginAndAutoTransfer.html?apiId=" + apiId + "&apiTypeId=" + apiTypeId;
        if(gameCode) {
            url = url + "&gameCode=" + gameCode;
        }
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                if (data.isSuccess == true) {
                    var result = data.gameApiResult;
                    if (result.defaultLink) {
                        /*https协议的请求*/
                        var protocol = window.location.protocol;
                        if(protocol.indexOf("https:")>-1){
                            if (apiTypeId == "1" && apiId=="1155") {
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if (apiTypeId == "2" && apiId=="15") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                if(gameId){
                                    window.location="/commonPage/gamePage/casino-game-new.html?apiId="+apiId+"&gameId="+gameId;
                                }else{
                                    window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                                }
                            }else if(apiTypeId == "4" && apiId=="22"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }else{
                                /*游戏调转链接不支持https，所以不能嵌套在对应的-game.ftl里面*/
                                window.location=result.defaultLink;
                                return;
                            }
                        }else{
                            /*http协议的请求*/
                            if(apiTypeId == "3" && apiId =="10"){//BBIN 跳转特殊处理 跳转会不对应游戏类型
                                window.location=result.defaultLink;
                                return;
                            }
                            if (apiTypeId == "2" || apiTypeId == "5") {
                                if (window.localStorage) {
                                    localStorage.re_url_casino = result.defaultLink;
                                }
                                if(gameId){
                                    window.location="/commonPage/gamePage/casino-game-new.html?apiId="+apiId+"&gameId="+gameId;
                                }else{
                                    window.location="/commonPage/gamePage/casino-game.html?apiId="+apiId;
                                }
                            }else if(apiTypeId == "3"){
                                if (window.localStorage) {
                                    localStorage.re_url_sport = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            }else if(apiTypeId == "1"){
                                if (window.localStorage) {
                                    localStorage.re_url_live = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/live-game.html?apiId="+apiId;
                            }else if(apiTypeId == "4"){
                                if (window.localStorage) {
                                    localStorage.re_url_lottery = result.defaultLink;
                                }
                                window.location="/commonPage/gamePage/lottery-game.html?apiId="+apiId;
                            }
                        }
                    } else {
                        var redirectUrl = result.links[apiTypeId];
                        if (apiTypeId != "3") {
                            redirectUrl = "/commonPage/gamePage/casino-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        } else {
                            redirectUrl = "/commonPage/gamePage/sport-game.html?apiId="+apiId;
                            if (window.localStorage) {
                                localStorage.re_url = result.links[apiTypeId];
                            }
                        }
                        window.location=redirectUrl;
                    }
                } else {
                    if(data.msg) {
                        /*BootstrapDialog.alert({
                            title: '提示',
                            message: data.msg,
                            type: BootstrapDialog.TYPE_WARNING,
                            buttonLabel: '确定',
                            callback: function(result) {
                                if (result){
                                    window.close();
                                }
                            }
                        });*/
                        layer.open({
                            content:data.msg,
                            title:'プロンプト',
                            skin:'layui-layer-brand',
                            btn:[" 落し着ける"],
                            success: function(layer){
                                // 重写关闭按钮
                                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                                // 提示框类型
                                $(layer).addClass("normal-dialog");
                            }
                        });
                    } else {
                        /*BootstrapDialog.alert({
                             title: '提示',
                             message: '游戏暂时无法登录，请稍候再试！',
                             type: BootstrapDialog.TYPE_WARNING,
                             buttonLabel: '确定',
                             callback: function(result) {
                                 if (result){
                                     window.close();
                                 }
                             }
                         });*/
                        layer.open({
                            content:'ゲームは一時的にはアクセスできないので,もう少し試してください。！',
                            title:'プロンプト',
                            skin:'layui-layer-brand',
                            btn:["落し着ける"],
                            success: function(layer){
                                // 重写关闭按钮
                                $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                                // 提示框类型
                                $(layer).addClass("normal-dialog");
                            }
                        });
                    }
                }
            },
            error: function(error) {
                if (error.status === 600) {
                    window.close();
                    loginObj.getLoginPopup();
                } else {
                    /*BootstrapDialog.alert({
                       title: '提示',
                       message: '游戏暂时无法登录，请稍候再试！',
                       type: BootstrapDialog.TYPE_WARNING,
                       buttonLabel: '确定',
                       callback: function(result) {
                           if (result){
                               window.close();
                           }
                       }
                   });*/
                    layer.open({
                        content:'ゲームは一時的にはアクセスできないので,もう少し試してください。！',
                        title:'プロンプト',
                        skin:'layui-layer-brand',
                        btn:["落し着ける"],
                        success: function(layer){
                            // 重写关闭按钮
                            $(layer).find('.layui-layer-setwin').html('<a class="layui-layer-close" href="javascript:;">	&times;</a>');
                            // 提示框类型
                            $(layer).addClass("normal-dialog");
                        }
                    });
                }
            }
        })
    }
</script>
