/**
 * Created by jeff on 15-6-29.
 * 玩家标签管理
 */
define(['common/BasePage','checkboxX'], function(BasePage,checkboxX) {

    return BasePage.extend({
        init:function(){
            this._super();
        },
        bindEvent:function(){

            var that = this;

            $("#player_tag .tag_stop_propagation").on("click",function(e){
                e.stopPropagation();
            });

            $('#player_tag').on('show.bs.dropdown', function (e) {
                var ids = window.top.page.getSelectIdsArray(e).join(",");
                /*如果选中的id为空 不请求*/

                if(that.tagHasLoad() && ids){
                    $("li.player_tags").remove();
                    window.top.topPage.ajax({
                        type: "GET",
                        url: root+"/payAccount/getRankByUserId.html?t="+Math.random(),
                        data:{'userId':ids},
                        error: function (request) {

                        },
                        success: function (data) {
                            $("#player_tag_div").html(data);
                            that.onPageLoad();
                        }
                    });
                }
            });
            /**
             * 查询关键字删除
             */
            $("#player_tag .cancel_search").on("click",function(){
                $(".player_tags").show();
                $("#player_tag .tag_search_input").val('');
                $(this).addClass("hide").next().removeClass("hide");
                $("#player_tag .tag_search_input").off("keyup");
            });
            $(this.formSelector + " .go_search").on("click",function(e){
                var $this =  $(this);
                var $thisValue = $(that.formSelector + " .tag_search_input").val().toLocaleLowerCase();
                if($thisValue){

                    $(that.formSelector + " .player_tags").each(function(){
                        var $this = $(this);
                        var $thisData = $this.attr("data-search").toLocaleLowerCase();
                        $thisData.indexOf($thisValue);
                        if($thisData.indexOf($thisValue)>=0){
                            $this.show();
                        }else{
                            $this.hide();
                        }
                    });
                    $this.addClass('hide').prev().removeClass('hide');
                    that.keupSearch();
                }
            });
        },
        onPageLoad:function(){
            var that = this;

            //加载后 绑定事件
            $('.player_tags .tag_checkbox').checkboxX({
                enclosedLabel: true//checkbox 在label中需要置为true
            });
            this.tagHasLoad(true);
            /**
             * 状态为半选的，点击后变为全选，点击取消选中
             */
            $(".player_tags .tag_checkbox[value=''][data-check-status='half']").on("change",function(){
                var $this = $(this);
                var thisVal = $this.val();
                if(thisVal === '0'){
                    $this.attr('data-check-status','other')
                    $this.off("change");
                    $this.val('1').checkboxX('refresh', {'threeState': false,'enclosedLabel': true});
                    /*取消绑定change事件*/
                }
            });
            $(this.formSelector).on("click","input[type=checkbox]",function(){
                // 玩家列表 复选框 有改变 需要重新加载
                that.tagHasLoad(true);
            });
        },
        /**
         *
         * @param bol 布尔值 是否需要加载 false 不需要加载，true 相反
         * @returns {*} 需要加载返回true
         */
        tagHasLoad:function(bol){
            if(typeof bol === 'undefined'){
                return !!$("#hasLoadTag").val();
            }else if(bol){
                $("#hasLoadTag").val(bol);
            }else{
                $("#hasLoadTag").val('');
            }
        },
        playerTagGetData:function(e,op){

            /*------------------------------------------------------------------------------------------------------------*/
            var deletePlayerTagId = {};//是player_tag 的id
            var insertTagId = {};//新增的tag_id
            var deletePlayerTagId_len = 0;
            var insertTagId_len = 0;
            var playerIds = $("#tag_userId").val().split(',');
            var playerIds_obj = {};
            //var
            /**
             *
             * 复选框的 value 0 未选中；1 选中； ‘’ 半选中；
             *
             */
            $(".player_tags .tag_checkbox").each(function(){
                var $this = $(this);
                var $this_status = $this.attr("data-status");
                var $this_value = $this.val();
                var $this_tagId = $this.attr("data-value");

                if($this_status === 'full_checked'){
                //全选中

                    if($this_value === '0'){
                        // 删除的。
                        deletePlayerTagId[deletePlayerTagId_len] = $this_tagId;
                        deletePlayerTagId_len++;
                    }else if($this_value === '1'){
                        //未做改变
                    }

                }else if($this_status === 'no_checked'){
                //没有选中的
                    if($this_value === '1'){
                        //新增的
                        insertTagId[insertTagId_len] = $this_tagId;
                        insertTagId_len++;

                    }

                }else if($this_status === 'half_checked'){
                //半选中

                    if($this_value === '0'){
                        //删除的
                        deletePlayerTagId[deletePlayerTagId_len] = $this_tagId;
                        deletePlayerTagId_len++;
                    }else if($this_value === '1'){
                        //全部选中的
                        insertTagId[insertTagId_len] = $this_tagId;
                        insertTagId_len++;
                    }
                }
            });
            var allRankLen = $(".player_tags .tag_checkbox").length;
            var checkLen = 0;
            $(".player_tags .tag_checkbox").each(function(){
                var $this = $(this);
                var $this_value = $this.val();
                if($this_value=="1"){
                    checkLen ++;
                }
            });
            var fullRank = false;
            if(allRankLen == checkLen){
                fullRank = true;
            }
            for(var i =0;playerIds[i];i++){
                playerIds_obj[i] =playerIds[i];
            }
            return {'search.deletePayRankId':deletePlayerTagId,'search.insertRankId':insertTagId,'search.payIds':playerIds_obj,'search.fullRank':fullRank};

        },

        playerTagSaveCallBack:function(e,option){
          this.tagHasLoad(true);
            this.query(e,option);
        },
        keupSearch:function(){
            $("#player_tag .tag_search_input").on('keyup',function(){
                var $thisValue = $(this).val().toLocaleLowerCase()
                $(".player_tags").each(function(){
                    var $this = $(this);
                    var $thisData = $this.attr("data-search").toLocaleLowerCase();
                    $thisData.indexOf($thisValue);
                    if($thisData.indexOf($thisValue)>=0){
                        $this.show();
                    }else{
                        $this.hide();
                    }
                });
            });
        }

    });

});