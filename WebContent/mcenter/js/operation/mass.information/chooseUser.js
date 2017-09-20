/**
 * Created by snekey on 15-9-7.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        onPageLoad:function(){
            this._super();
            var _this = this;
        },
        bindEvent: function () {
            this._super();
            this.initSendObjectEvent();
            this.initSendObjectTypeEvent();
            this.initAppointPlayerEvent();
            this.initPlayRankEvent();
            this.initPlayTagEvent();
            this.initAgentSearchEvent();
            this.initMasterSearchEvent();
            this.initTimingEvent();
            this.deleteAgentSearchWord();
            this.initPushModeChangeTip();
            this.switchAgentSearchTab();

        },
        initPushModeChangeTip:function(){
            $("input[name='pushMode']").on("click",function(e){
                if(e.target.value == 'window'){
                    $('.pushTip').attr("style","display:inline")
                }else{
                    $('.pushTip').attr("style","display:none")
                }
            })
        },

        deleteAgentSearchWord:function(){
            $(".input-group-delete").on("click", function () {
                //清除内容
                $("._agentName").val("");
                //恢复列表
                var $select = $("[aria-expanded='true'][data-toggle='tab']").attr("href");
                $($select).find("option").each(function(){
                    var $this = $(this);
                    $this.show();
                });
            })
        },

        /**
         * 切换代理搜索tab时 清空搜索框
         */
        switchAgentSearchTab:function(){
            $("a[data-toggle='tab']").on("show.bs.tab",function(e){
                $(".input-group-delete").trigger("click");

            })
        },

        /**
         * 初始化发送对象的选择事件
         */
        initSendObjectEvent:function(){
            var _this = this;
            $("[name='targetUser']").on("click",function(){
                if($("#playerTag").is(":checked")){//发送对象为玩家
                    var player = $("#choosePlayer");
                    $("#playerSelect").removeClass("hide");
                    $("#agentSelect").addClass("hide");
                    $("#player").removeClass("hide");
                    $("#agent").addClass("hide");
                    $("#choosePlayer").attr("disabled",false);
                    $("#chooseAgent").attr("disabled",true);
                    if(player.val() == 'allPlayer'){
                        _this.checkIsChooseUser("all");
                    }else if (player.val() == 'appoint'){
                        _this.checkIsChooseUser("appointPlayer");
                    }else if (player.val() == 'condition'){
                        _this.checkIsChooseUser("conditionPlayer");
                    }

                }else{//发送对象为代理
                    var agent =$("#chooseAgent");
                    $("#playerSelect").addClass("hide");
                    $("#agentSelect").removeClass("hide");
                    $("#player").addClass("hide");
                    $("#agent").removeClass("hide");
                    $("#chooseAgent").attr("disabled",false);
                    $("#choosePlayer").attr("disabled",true);
                    if(agent.val() == 'all'){
                        _this.checkIsChooseUser("all")
                    }else if (agent.val() == 'appointAgent'){
                        _this.checkIsChooseUser("appointAgent");
                    }else if (agent.val() == 'master'){
                        _this.checkIsChooseUser("masterAndAgent");
                    }
                }
            });
        },
        /**
         * 初始化选择对象类型的更换事件
         */
        initSendObjectTypeEvent:function(){
            var _this = this;
            $("#choosePlayer").on("change",function(){//玩家选择发送对象类型
                var playerType = $(this).val();
                //按条件搜索玩家选项
                if(playerType == "condition"){
                    _this.checkIsChooseUser("conditionPlayer");
                    $("#condition").removeClass("hide");
                    $("#appoint").addClass("hide");
                    $("._playerTips").text(window.top.message.operation_auto['已选择']);
                    $("._rank,._tags").removeClass("hide");
                } else if(playerType == "appoint"){//指定玩家选项
                    _this.checkIsChooseUser("appointPlayer");
                    $("#appoint").removeClass("hide");
                    $("#condition").addClass("hide");
                    $("._playerTips").text(window.top.message.operation_auto['多位玩家请以半角']);
                    $("._rank,._tags").addClass("hide")
                } else{//全部玩家
                    $("#condition").addClass("hide");
                    $("#appoint").addClass("hide");
                    $("._playerTips").text(window.top.message.operation_auto['向本站点所有玩家发送信息']);
                    $("._rank,._tags").addClass("hide")
                    _this.checkIsChooseUser("all");
                }
            });
            $("#chooseAgent").on("change",function(){//代理选择发送对象类型
                var agentType = $(this).val();
                //指定代理或总代
                if(agentType == "appointAgent"){
                    //$(".input-group").css("display","block");
                    _this.checkIsChooseUser("appointAgent");
                    $("#appointAgent").removeClass("hide");
                    $("#master").addClass("hide");
                    $("._agentTips").text(window.top.message.operation_auto['已选择']);
                    $("._master_count,._agent_count").removeClass("hide");
                    $(".all_count").addClass("hide");
                }
                //总代及其代理选项
                else if(agentType == "master"){
                    _this.checkIsChooseUser("masterAndAgent");
                    $("#appointAgent").addClass("hide");
                    $("#master").removeClass("hide");
                    $("._agentTips").text(window.top.message.operation_auto['已选择']);
                    $("._master_count,._agent_count").addClass("hide");
                    $(".all_count").removeClass("hide");
                }
                //全部代理和总代
                else{
                    _this.checkIsChooseUser("all");
                    $("#appointAgent").addClass("hide");
                    $("#master").addClass("hide");
                    $("._agentTips").text(window.top.message.operation_auto['向本站点所有总代及代理商发送信息']);
                    $("._master_count,._agent_count").addClass("hide");
                    $(".all_count").addClass("hide");
                }
            });
        },

        checkIsChooseUser : function(type){
            var btnNext = $(".nextStep");
            if (type == "appointAgent"){
                //appoint Agent/master check
                if($("._master_added").find("option").length>0 || $("._agent_added").find("option").length>0){
                    btnNext.attr("disabled",false);
                }else{
                    btnNext.attr("disabled",true);
                }
            }else if(type == "masterAndAgent"){
                // all agent check
                if($("._master_and_agent").find("option").length > 0){
                    btnNext.attr("disabled",false);
                }else{
                    btnNext.attr("disabled",true);
                }
            }else if(type == "conditionPlayer"){
                if($("._rk.current").length>0||$("._tg.current").length>0){
                    btnNext.attr("disabled",false);
                }else{
                    btnNext.attr("disabled",true)
                }
            }else if (type == "appointPlayer"){
                if($("[name='appointPlayer']").val() == ""){
                    btnNext.attr("disabled",true);
                }else{
                    btnNext.attr("disabled",false);
                }
            }else if (type == "all"){
                btnNext.attr("disabled",false);
            }else if( type == "none"){
                btnNext.attr("disabled",true);
            }

        },
        /**
         * 初始化指向玩家文本框的事件
         */
        initAppointPlayerEvent:function(){
            $(this.formSelector).on("blur", "textarea[name='appointPlayer']", function () {
            //$("[name='appointPlayer']").on("blur",function(){
                var appointPlayer = $(this).val();
                var tip = $("._appointTip");
                var checkFlag = false;
                $(".nextStep").attr("disabled",true);

                if(tip.val() == ""){
                     /*文本框为空时，隐藏提示*/
                    tip.addClass("hide");
                }
                if (appointPlayer.trim() != "") {
                    var last = appointPlayer.charAt(appointPlayer.length - 1);
                    if (last == '\n') {
                        appointPlayer = appointPlayer.substring(0, appointPlayer.length - 1);
                    }
                    var newString = "";
                    var playerArray = appointPlayer.split(",");
                    for (var i in playerArray) {
                        //if (playerArray[i].trim() != "") {
                        var newStr =playerArray[i].replace(/^\s+|\s+$/g,'');
                        newString += newStr+",";
                        //}
                    }
                    if (newString !="") {
                        checkFlag = true;
                        newString = newString.substring(0, newString.length - 1);
                        appointPlayer = newString;
                    }
                    $("[name='appointPlayer']").val(newString);
                }
                if(checkFlag){
                    var url = root + '/operation/massInformation/checkUser.html';
                    var inputPlayers = $("#appointPlayer");
                    window.top.topPage.ajax({
                        type: "POST",
                        data: {"appointPlayer":appointPlayer},
                        url: url,
                        headers: {
                            "Soul-Requested-With": "XMLHttpRequest"
                        },
                        success: function (data) {
                            var object = eval('(' + data + ')');
                            var effectPlayer = object.effectPlayer;
                            var unEffectivePlayer = object.unEffectivePlayer;
                            $("#effectPlayer").val(effectPlayer);
                            var invalidNum = object.invalidNum;
                            var totalNum = object.totalNum;
                            if(invalidNum != 0){
                                //TODO highlight uneffective accounts
                          /*      var unEffectArray = unEffectivePlayer.split(",");
                                for(var i in unEffectArray){
                                    if(unEffectArray[i] != ""){
                                        var temp = inputPlayers.val().replace(/dsd/i,"<span class='co-yellow'>kkk</span>");
                                        inputPlayers.val(temp);
                                        //"<span class='co-yellow'>"+unEffectArray[i]+"kkk</span>"
                                    }
                                }
                                console.log(inputPlayers.val());*/

                                /*display the tip of uneffective players*/
                                var tip = $("._appointTip");
                                var span = $(tip).find("span");
                                tip.removeClass("hide");
                                span.text(window.top.message.operation_auto['以上有位玩家账号无效'].replace("[0]",invalidNum));
                                //当前指定玩家全部为无效玩家时，后面流程中断
                                if(invalidNum == totalNum){
                                    $(".nextStep").attr("disabled",true);
                                }else{
                                    $(".nextStep").attr("disabled",false);
                                }
                            }else{
                                var tip = $("._appointTip");
                                tip.addClass("hide");
                                $(".nextStep").attr("disabled",false);
                            }
                        },
                        error: function (data) {
                        }
                    });
                }
            })
        },
        /**
         * 初始化玩家层级的点击事件
         */
        initPlayRankEvent:function(){
            var rankArray = [];
            var oldRanks =$("#rank").val();
            if(oldRanks != ''){
                var oldRankArray = oldRanks.split(",");
                for(var oldRank in oldRankArray){
                    if(oldRankArray[oldRank] != ''){
                        rankArray.push(oldRankArray[oldRank]);
                    }
                }
            }
            $(".li-rank li").on("click", function () {
                var _this = this;
                var classVal = $(_this).attr("class");
                var rankId = $(this).val();
                if (classVal.indexOf("current") > 0) {
                    $(_this).removeClass("current");
                    for(var rankIndex in rankArray){
                        if(rankArray[rankIndex] == rankId){
                            rankArray.splice(rankIndex,1);
                        }
                    }
                }else{
                    $(_this).addClass("current");
                    rankArray.push(rankId);
                }
                $("#rank").val(","+rankArray.join(",")+",");
                //拿到选中的个数放到提示语中
                var rankCount = $("._rk.current").length;
                $("._rank").text(rankCount+window.top.message.operation_auto['个层级']);
                //如果没有任何点击的标签或层级，下一步按钮禁用
                if($("._rk.current").length>0||$("._tg.current").length>0){
                    $(".nextStep").attr("disabled",false)
                }else{
                    $(".nextStep").attr("disabled",true)
                }
            });
        },
        /**
         * 初始化玩家标签的点击事件
         */
        initPlayTagEvent:function(){
            var tagArray = [];
            var oldTags =$("#tags").val();
            if(oldTags != ''){
                var oldTagArray = oldTags.split(",");
                for(var oldTag in oldTagArray){
                    if(oldTagArray[oldTag] != ''){
                        tagArray.push(oldTagArray[oldTag]);
                    }
                }
            }
            $(".li-tag li").on("click", function () {
                var _this = this;
                var classVal = $(_this).attr("class");
                var tagId = $(this).val();
                if(classVal.indexOf("current") > 0){
                    $(_this).removeClass("current");
                    for(var tagIndex in tagArray){
                        if(tagArray[tagIndex] == tagId){
                            tagArray.splice(tagIndex,1);
                        }
                    }
                }else{
                    $(_this).addClass("current");
                    tagArray.push(tagId);
                }
                $("#tags").val(","+tagArray.join(",")+",");
                var tagCount = $("._tg.current").length;
                $("._tags").text(tagCount+window.top.message.operation_auto['个标签']);
                //如果没有任何点击的标签或层级，下一步按钮禁用
                if($("._rk.current").length>0||$("._tg.current").length>0){
                    $(".nextStep").attr("disabled",false)
                }else{
                    $(".nextStep").attr("disabled",true)
                }
            });
        },
        /**
         * 初始化代理搜索事件
         */
        initAgentSearchEvent:function(){
            $(".btnSearch").on("click",function(e){
                var $thisValue = $("._agentName").val().toLocaleLowerCase();
                if($thisValue){
                    var $select = $("[aria-expanded='true'][data-toggle='tab']").attr("href");
                    $($select).find("option").each(function(){
                        var $this = $(this);
                        var $thisData = $this.attr("data-search").toLocaleLowerCase();
                        $thisData.indexOf($thisValue);
                        if($thisData.indexOf($thisValue)>=0){
                            $this.show();
                        }else{
                            $this.hide();
                        }
                    });
                }else{
                    var $select = $("[aria-expanded='true'][data-toggle='tab']").attr("href");
                    $($select).find("option").each(function(){
                        $(this).show();
                    })
                }
            });
        },
        /**
         * 初始化总代搜索事件
         */
        initMasterSearchEvent:function(){
            $("._agentNameAll").on("keyup",function(e){
                var $this =  $(this);
                var $thisValue = $("._agentNameAll").val().toLocaleLowerCase();
                if($thisValue){
                    $("._masterAndAgent").find("option").each(function(){
                        var $this = $(this);
                        var $thisData = $this.attr("data-search").toLocaleLowerCase();
                        $thisData.indexOf($thisValue);
                        if($thisData.indexOf($thisValue)>=0){
                            $this.show();
                        }else{
                            $this.hide();
                        }
                    });
                }else{
                    $("._masterAndAgent").find("option").each(function(){
                        $(this).show();
                    })
                }
            });
        },
        /**
         * 初始化定时事件
         */
        initTimingEvent:function(){
            $("#timingFlag").on("click",function(){
                if($(this).is(":checked")){
                    $("#timingDate").removeClass("hide");
                }else{
                    $("#timingDate").addClass("hide");
                }
            })
        },
        onPageLoad:function(){
            this._super();
            var rankCount = $("._rk.current").length;
            $("._rank").text(rankCount+window.top.message.operation_auto['个层级']);
            var tagCount = $("._tg.current").length;
            $("._tags").text(tagCount+window.top.message.operation_auto['个标签']);
            this.countMasterLength();
            this.masterList();
            this.countAgentLength();
            this.agentList();
            this.countAll();
            this.masterAndAgentList();
        },
        clearInvalidPlayer:function(e){
            //clear uneffective accounts
            var effectPlayer = $("#effectPlayer").val();
            var playerArray = [];
            var effectArray = effectPlayer.split(",");
            for(var i in effectArray){
                if(effectArray[i] != ""){
                    playerArray.push(effectPlayer.split(",")[i]);
                }
            }
            $("#appointPlayer").val(playerArray.join(","));
            var tip = $("._appointTip");
            tip.addClass("hide");
            if(playerArray.length <= 0){//清除无效玩家后为空,则隐藏
                $(".nextStep").attr("disabled",true);
            }
            $(e.currentTarget).unlock();
        },
        editContent: function (e) {
            var url = root + '/operation/massInformation/editContent.html';
            window.top.topPage.ajax({
                type: "POST",
                data: this.getCurrentFormData(e),
                url: url,
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    $("#mainFrame").html(data);
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 指定代理中将选中的总代添加到右边的下拉框里
         * @param e
         * @param opt
         */
        addMaster: function(e,opt){
            $("#tab1 ._master").find("option:selected").attr("");
            var a = $("#tab1 ._master").find("option:selected").remove();
            $("._master_added").append(a);
            $("._master_added").val('');
            this.countMasterLength();
            this.masterList();
            this.checkIsChooseUser("appointAgent");
            $(e.currentTarget).unlock();
        },
        /**
         * 指定代理中将右边输入框里的总代移除,并添加回左侧的选择框中
         * @param e
         * @param opt
         */
        removeMaster: function(e,opt){
            var a = $("._master_added").find("option:selected").remove();
            $("#tab1 ._master").append(a);
            $("#tab1 ._master").val('');
            this.countMasterLength();
            this.masterList();
            this.checkIsChooseUser("appointAgent");
            $(e.currentTarget).unlock();
        },
        /**
         * 指定代理中的代理选项卡的操作,功能同总代
         * @param e
         * @param opt
         */
        addAgent: function(e,opt){
            var a = $("#tab2 ._agent").find("option:selected").remove();
            $("._agent_added").append(a);
            $("._agent_added").val('');
            this.countAgentLength();
            this.agentList();
            this.checkIsChooseUser("appointAgent");
            $(e.currentTarget).unlock();
        },
        /**
         * 指定代理中的代理选项卡的操作,功能同总代
         * @param e
         * @param opt
         */
        removeAgent: function(e,opt){
            var a = $("._agent_added").find("option:selected").remove();
            $("#tab2 ._agent").append(a);
            $("#tab2 ._agent").val('');
            this.countAgentLength();
            this.agentList();
            this.checkIsChooseUser("appointAgent");
            $(e.currentTarget).unlock();
        },
        addMasterAndAgent: function(e,opt){
            $("._masterAndAgent").find("option:selected").attr("");
            var a = $("._masterAndAgent").find("option:selected").remove();
            $("._master_and_agent").append(a);
            $("._master_and_agent").val('');
            this.countAll();
            this.masterAndAgentList();
            this.checkIsChooseUser("masterAndAgent");
            $(e.currentTarget).unlock();
        },
        removeMasterAndAgent: function(e,opt){
            $("._master_and_agent").find("option:selected").attr("");
            var a = $("._master_and_agent").find("option:selected").remove();
            $("._masterAndAgent").append(a);
            $("._masterAndAgent").val('');
            this.countAll();
            this.masterAndAgentList();
            this.checkIsChooseUser("masterAndAgent");
            $(e.currentTarget).unlock();
        },
        /**
         * 计算已添加的总代个数
         */
        countMasterLength: function(){
            var c =$("._master_added").children().length;
            $("._master_count").text(c+window.top.message.operation_auto['个总代']);
        },
        /**
         * 计算已添加的代理个数
         */
        countAgentLength: function(){
            var c =$("._agent_added").children().length;
            $("._agent_count").text(c+window.top.message.operation_auto['个代理']);
        },
        /**
         * 计算已添加的总代个数
         */
        countAll: function(){
            var c =$("._master_and_agent").children().length;
            $(".all_count").text(c+window.top.message.operation_auto['个总代及其代理']);
        },
        masterList: function(){
            var masterStr = "";
            $("._master_added").children().each(function(){
                if(masterStr != ""){
                    masterStr += ",";
                }
                masterStr += $(this).val();
            });
            var masterLi = masterStr.split(",");
            $("#_master").val(masterLi);
        },
        agentList: function(){
            var agentStr = "";
            $("._agent_added").children().each(function(){
                if(agentStr != ""){
                    agentStr += ",";
                }
                agentStr += $(this).val();
            });
            var agentLi = agentStr.split(",");
            $("#_agent").val(agentLi);
        },
        masterAndAgentList: function(){
            var masterAndAgentStr = "";
            $("._master_and_agent").children().each(function(){
                if(masterAndAgentStr != ""){
                    masterAndAgentStr += ",";
                }
                masterAndAgentStr += $(this).val();
            });
            var masterAndAgentLi = masterAndAgentStr.split(",");
            $("#masterAndAgent").val(masterAndAgentLi);
        }
    })
})
