define([], function () {

    return Class.extend({
        init: function () {
            //有多个js引用popUP，导致该方法被初始化多次，所以在初始化不需要加该代码，等需要的时候再引用
            //this.bindEvent();
        },
        _getWin : function(content,date,winType){
            var message = "<div class=\"inform-"+winType+" clearfix shadow\"><div class=\"btn-close\"><a href=\"javascript:void(0)\" class=\"\">×</a></div>"+
                "<div class=\"in-details\"><span class=\"hint-text\">"+content+"</span>";
            if(date){
                message += "<span class=\"hint-time al-right\">"+date+"</span></div></div>";
            }
            return message;
        },
        bindEvent : function(){
            $(".unfold").on("click",function (){
                // $(".max-ccc").children().first().nextAll().slideToggle(300);
                //$(".max-ccc").children().slideToggle(300);
                $(this).toggleClass("open");
                var isOpen = $(this).hasClass("open");
                if(isOpen){
                    $(".max-ccc").removeClass("hide");
                    $("a[name=tellerReminder]").click(function (e) {
                        $(e.currentTarget).parent().parent().parent().remove();
                    });
                }else{
                    $(".max-ccc").addClass("hide");
                }
                try{
                    window.top.topPage.ajax({
                        url: root + "/index/savePersonShowpop.html?isShow="+isOpen,
                        type: "post",
                        dataType: "JSON",
                        success: function (data) {
                            console.log("操作开启关闭提醒："+data.state);
                        },
                        error: function () {
                            console.log("==================");
                        }
                    });
                }catch(e){
                    console.log(e);
                }
            });
        },
        pop : function(content,date,winType){
            var win = this._getWin(content,date,winType);
            try{
                var isFirst = !$(".real-time-inform").hasClass("open");
                var isShow = $(".unfold").hasClass("open");
                this.showTipsDialog(isFirst,isShow,win,content,date);
            }catch(e){
                this.oldPop(win);
            }
        },
        oldPop : function(win){
            var isFirst = !$(".real-time-inform").hasClass("open");
            var isShow = $(".unfold").hasClass("open");
            if (!isShow) {
                $(".unfold").click();
            }
            if($(".max-ccc").children().length==0) {
                $(".max-ccc").append(win);
            }else {
                $(win).insertBefore($(".max-ccc").children().first());
            }

            if(isFirst){
                $(".real-time-inform").toggleClass("open");
                $(".real-time-inform").slideToggle();
            }
            $(".btn-close>a").on("click",function (){
                $(this).parents(".clearfix").next().show();
                $(this).parents(".clearfix").remove();
            });
        },
        showTipsDialog:function (isFirst,hasShow,win) {
            var _this = this;
            try {
                window.top.topPage.ajax({
                    url: root + "/index/showPop.html",
                    type: "post",
                    dataType: "JSON",
                    success: function (data) {
                        if ($(".max-ccc").children().length == 0) {
                            $(".max-ccc").append(win);
                        } else {
                            $(win).insertBefore($(".max-ccc").children().first());
                        }
                        var isShow = data.isShow;
                        if (isShow == 'true') {
                            if (!hasShow) {
                                $(".unfold").click();
                            }
                            if (isFirst) {
                                $(".real-time-inform").toggleClass("open");
                                $(".real-time-inform").slideToggle();
                            }

                        } else {
                            if (isFirst) {
                                $(".real-time-inform").toggleClass("open");
                                $(".real-time-inform").slideToggle();
                            }
                        }


                        $(".btn-close>a").on("click", function () {
                            $(this).parents(".clearfix").next().show();
                            $(this).parents(".clearfix").remove();
                        });
                        $("a[name=tellerReminder]").click(function (e) {
                            $(e.currentTarget).parent().parent().parent().remove();
                        });
                    },
                    error: function (data, state, msg) {
                        _this.oldPop(win);
                    }
                });
            }catch (e){
                console.log(e);
            }
        },


        showDialog :function(opt){
            window.top.topPage.openDialog(opt);
        },
        exportDownload: function (data) {
            console.info("订阅类型为EXPORT_DOWNLOAD_REMINDER的订阅点收到消息，成功调用回调函数，参数值为" + data);
            var msgBody = $.parseJSON($.parseJSON(data).msgBody);
            var id = msgBody.id;
            var fileName = msgBody.fileName;
            var status = msgBody.status;
            var date = "";
            var content = "";
            if(status == "completed"){
                var url = root+"/exports/download.html?id="+id;
                if(window.top.ExportTimestamp == msgBody.exportTimestamp){
                    var iframe = document.getElementById("download-export-frame");
                    if(!iframe){
                        iframe = document.createElement("iframe");
                        iframe.id="download-export-frame";
                        document.body.appendChild(iframe);
                    }
                    iframe.src = url;
                    iframe.style.display = "none";
                }else{
                    console.log("不是从本页面点击的导出，不自动下载");
                }
                if($(".btn-export-btn").length>0){
                    $(".btn-export-btn").unlock();
                }
                return;
            }else if(status == "maxCount"){
                content = "导出数据量超过10万条数据！请控制在10万条以内";
            }else if(status == "fail"){
                content = "导出失败，请重新导出！";
            }
            else if(status == "uploadFail"){
                content = "操作完成，但上传文件失败，无法下载！";
            }else if(status == "resultZero"){
                content = "操作完成，导出条数为0，无法下载！";
            }
            popUp.pop(content, date, "success");

            if($(".btn-export-btn").length>0){
                $(".btn-export-btn").unlock();
            }

            if($(".btn-export-list-search").length>0){
                $(".btn-export-list-search").click();
            }
            $("a[name=export-download-link]").click(function (e) {
                $(e.currentTarget).parent().parent().parent().remove();
            });
        },
        /**
         *
         * @param id 播放器ID
         * @param file 音频文件
         * @param loop 是否循环
         * @param callback 播放结束回调
         */
        audioplayer: function (id, file, loop,callback){
            var audioplayer = document.getElementById(id);
            if(audioplayer!=null){
                if (!!window.ActiveXObject || "ActiveXObject" in window) {// IE
                    var embed = document.embedPlay;
                }else{
                    audioplayer.play();
                    if(callback!=null&&callback != undefined){
                        //如何判断声音播放结束
                        //update by jerry
                        setTimeout(function () {
                            callback();
                        },3000);
                    }
                }

                return;
                //document.body.removeChild(audioplayer);
            }

            if(typeof(file)!='undefined'){
                if (!!window.ActiveXObject || "ActiveXObject" in window){// IE

                    var player = document.createElement('embed');
                    $(player).addClass("hide");
                    player.id = id;
                    player.src = resRoot + '/' +file;
                    //player.setAttribute('autostart', 'true');
                    if(loop){
                        player.setAttribute('loop', 'infinite');
                    }
                    $("#auto_alert").append(player);
                    var embed = document.embedPlay;
                    if(callback!=null&&callback != undefined){
                        //如何判断声音播放结束
                        setTimeout(function () {
                            callback();
                        },3000);

                    }
                }else{
                    // Other FF Chome Safari Opera
                    var player = document.createElement('audio');
                    $(player).addClass("hide");
                    player.id = id;
                    //player.setAttribute('autoplay','autoplay');
                    if(loop){
                        player.setAttribute('loop','loop');
                    }
                    $("#auto_alert").append(player);

                    var mp3 = document.createElement('source');
                    mp3.src = resRoot + '/' +file;
                    mp3.type= 'audio/mpeg';
                    player.appendChild(mp3);
                    player.play();
                    if(callback!=null&&callback != undefined){
                        var is_playFinish = setInterval(function(){
                            if(player.ended){
                                callback();
                                window.clearInterval(is_playFinish);
                            }
                        }, 10);
                    }
                }
            }
        }

    });
});