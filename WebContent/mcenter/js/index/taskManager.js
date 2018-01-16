/**
 * Created by ke on 15-6-26.
 */
define(['common/BasePage','site/index/PopUp'], function (BasePage,PopUp) {
    return BasePage.extend({
        tones:null,
        timeInterval:null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        dateTimeFromat:"",
        init: function () {
            var _this=this;
            _this._super();
            popUp = new PopUp();
            _this.unTaskList();
            $(".btn-success").click();
            //是不是使用临时域名
            if($("#indexDomainTemp").val()=='true'&&$("#managerDomainTemp").val()=='true'){
                //主域名和管理中心域名都是首次添加
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/content/sysDomain/toIndexAndManager.html",callback:"toSettingCallbak"});
            }else if($("#managerDomainTemp").val()=='false'&&$("#indexDomainTemp").val()=='true'){
                 //主站域名还未添加
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/content/sysDomain/toIndex.html",callback:"toSettingCallbak"});
            }
            _this.showTask();
            //_this.syncUserTime();
            _this.showMenu();
            setTimeout(function () {
                _this.queryPendingDealRecord();
            },2000);
            _this.playerNumTimer();
        },
        showMenu: function () {
            {$(".navbar-nav .dropdown").hover(
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').show();
                    $(this).toggleClass('open');
                },
                function() {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').hide();
                    $(this).toggleClass('open');
                }
            );}
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $(".sites").on("click", function () {
                $(this).attr("key");
                    window.top.topPage.ajax({
                        url:root + '/index/switchSite.html?siteId='+$(this).attr("siteId"),
                        dataType:"json",
                        success:function(data){
                            window.location.href=window.top.root;
                        }
                    });
            });
            $(".top-online-people").mouseover(function(){
                $(this).addClass("open");
            });
            $(".top-online-people").mouseout(function(){
                $(this).removeClass("open");
            });
        },
        /**
         * 判断是否有未读任务(提示消息声音的条件：1、是否提醒消息标识为true;2、未读消息数量>0)
         * @returns {boolean}
         */
        hasTask: function () {
            var span = $('.tasks').children().children('span')[0];
            var taskCount = parseInt($(span).text());
            var isReminderTask = $('#isReminderTask').val();
            if (taskCount > 0 && isReminderTask == 'true') {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 显示/关闭消息下拉框
         */
        //FixMe Add By Tony 使用bindEvent
        showTask: function () {
            $('.tasks').children('a').click(function () {
                var href = $(this).attr("data-href");
                $(this).parent().find('dl').load(href);
            });
        },
        /**
         * 根据用户的时区时间变化页面时间
         */
        userTime: function () {
            var _this=this;
            if(_this.dateTimeFromat!=undefined) {
                var date = new Date();
                //date.setTime(parseInt($(".clock-show").attr("time"))+1000);
                //$(".clock-show").attr("time",date.getTime());
                //var date$go = new Date('2015-08-31')
                $(".clock-show").text(window.top.topPage.formatToMyDateTime(date, _this.dateTimeFromat));
            }
        },
        /**
         * 与服务器同步用用户时间，修正误差
         */
        syncUserTime:function(){
            var _this=this;
            window.top.topPage.ajax({
                url:root + '/index/getUserTimeZoneDate.html',
                dataType:"json",
                success:function(data){
                    _this.dateTimeFromat=data.dateTimeFromat;
                    $(".clock-show").text(data.dateTime);
                    $(".clock-show").attr("time",data.time);
                    $(".clock-show").css("display","inline");
                    //$(".nav-shadow .clock-show label").text(data.dateTime);
                    window.setTimeout(function() {
                        _this.syncUserTime();
                    }, 360000);
                    if(_this.timeInterval!=null) {
                        window.clearInterval(_this.timeInterval);
                    }
                    _this.timeInterval=window.setInterval(function () {
                        _this.userTime();
                    },1000);
                }
            });
        },
        unTaskList: function () {
            var _this=this;
            _this.queryTones();
            var tones=window.top.tones;
            if($("#unTaskList").text().length>0){
                var unTaskList=$.parseJSON($("#unTaskList").text());
                _this.playAudio(tones,unTaskList,0);
            }
        },
        playAudio:function(tones,unTaskList,pindex){
            var _this=this;
            var found=false;
            for(var i=pindex;i<unTaskList.length;i++) {
                var task = unTaskList[i];
                for (var index = 0; index < tones.length; index++) {
                    var tone = tones[index];
                    if (task.toneType == tone.paramCode) {
                        if (task.paramValue) {
                            var param =task.paramValue;
                            //层级不足
                          /*  if (task.dictCode == "rankInadequate") {
                                if(param.onlinenames.length>1){
                                    _this.rankInadequate("onlinenames",2,param.onlineNamesCount);
                                }
                                if(param.companynames.length>1){
                                    _this.rankInadequate("companynames",1,param.companyNamesCount);
                                }
                            }*/
                        }
                        popUp.audioplayer("task_"+tone.paramCode,tone.paramValue, false,function () {
                            _this.playAudio(tones,unTaskList,i+1);
                        });
                        found = true;
                        break;
                    }

                }
                if(found){
                    break;
                }
            }

        },

        rankInadequate : function (type ,payAccountType,count) {
            var btnOption = {};
            btnOption.target = root + "/userTaskReminder/rankInadequateDialog.html?rankName="+type+"&accountNum="+count;
            btnOption.text = window.top.message.index_auto['消息'];
            btnOption.callback = function (e, opt) {
                if(e.returnValue){
                    var url = "/vPayAccount/list.html?search.type=" + payAccountType +"&search.status=3";
                    $("#rankInadequate").attr("href", url);
                    $("#rankInadequate").click();
                }
            };
            window.top.topPage.doDialog({page: this}, btnOption);
        },


        //去设置主域名或管理域名
        toSettingCallbak: function (e) {

            //主域名和管理中心域名都是首次添加
            if("indexAndManager"== e.returnValue){
                $("#toSetting").click();
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/content/sysDomain/toSetting.html",callback:"returnOperator"});
            }else if("index"== e.returnValue){
                window.top.topPage.doDialog({page:this},{text:window.top.message.common['msg'],target: root + "/content/sysDomain/toMainDomainSetting.html",callback:"returnOperator"});
            }
        },
        returnOperator: function () {
            $("#toSetting").click();
            //$("#mainFrame").load(root + window.location.hash.slice(1));
        },
        queryTones: function () {
            var _this=this;
            if (!window.top.tones) {
                window.top.topPage.ajax({
                    url: root + '/index/queryTones.html',
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        window.top.tones = data;
                    }
                })
            }else {
                return window.top.tones;
            }
        },

        /**
         * 更新任务提醒数
         */
        refreshTaskNum:function () {
            window.top.topPage.ajax({
                type: "post",
                url: root + "/index/taskNum.html",
                dataType: "json",
                success: function (data) {
                    $("#unReadTaskCount").text(data);
                }
            });
        },

        queryPendingDealRecord: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/index/countPendingRecord.html',
                dataType: "json",
                async:false,
                success: function (data) {
                    if(data){
                        if(data.companyDepositCount&&parseInt(data.companyDepositCount)>0){
                            var voice = data.depositVoice;
                            // console.log("play company deposit："+voice);
                            popUp.audioplayer('companyDeposit',voice)
                        }
                        if(data.playerWithdrawCount&&parseInt(data.playerWithdrawCount)>0){
                            var voice = data.withdrawVoice;
                            // console.log("play player withdraw："+voice)
                            popUp.audioplayer('playerWithdraw',voice)
                        }
                        setTimeout(function () {
                            _this.queryPendingDealRecord();
                        },60*1000)
                    }
                }
            });
        },
        playerNumTimer: function () {
            var _this=this;
            $.ajax({
                url: root+"/home/playerNum.html",
                type: "POST",
                dataType:"json",
                success: function (data) {
                    $("#onlinePlayerNum").text(data.onlineplayernum);
                    //$("#activePlayerNum").attr("data-content",_this.formatStr(window.top.message.home_auto['今日活跃'],typeof (data.activePlayerNum)=='undefined'?'0':data.activePlayerNum));
                    $("#activePlayerNum").text(data.activeplayernum);
                    setTimeout(function () {
                        _this.playerNumTimer();
                    },60*1000)
                }
            });

        }

    });
});