/**
 * Created by ke on 15-7-1.
 */
define(['common/BaseEditPage','mailAutoComplete'], function (BaseEditPage) {
    return BaseEditPage.extend({

        init: function () {
            this._super("form");
            $(".inputMailList").mailAutoComplete();
        },
        onPageLoad: function () {
            this._super();
        },

        bindEvent: function () {
            var _this=this;
            this._super();
            $(this.formSelector).on("click", ".compile-add", function (e) {
                e.preventDefault();
                var $tags = $(".compile-li-tag");
                if(!$tags.hasClass('open')){
                    /*打开*/
                    $(document).on('click', function (){
                        $tags.removeClass("open");
                    });
                }
                $tags.toggleClass("open");
            });

            /**
             * 玩家详情页-删除单个标签
             * @param e
             */
            $(".deleteTag").on("click", function (e) {
                var id = $(this).attr("data-id");
                window.top.topPage.ajax({
                    type: "post",
                    url: root + "/player/deleteTag.html",
                    data: {"search.id": id},
                    dataType: "json",
                    success: function (data) {
                        if (data.state) {
                            $("[name=returnView]").click();
                        }
                    },
                    error: function (data) {
                        $("[name=returnView]").click();
                    }
                })
            });

            $(this.formSelector).on("click", ".li-tag a", function () {
                _this.resizeDialog();
                var $this = $(this);
                var classVal = $this.attr('class');
                var tagId = $this.attr('tagId');
                var playerCount=$this.attr('playercount');
                var builtIn=$this.attr('builtin');
                var quantity=$this.attr('quantity');
                var tagName = $this.text();
                if (classVal == 'selected') {
                    //删除标签
                    $("#tag_" + tagId).remove();
                    $this.removeClass('selected');
                    if($('.li-tag .selected').length ==0){
                        $("#playerTag").val("");
                    }

                    if (builtIn == "true") {
                        $("#vip").val(false);
                    }

                } else {
                    if($('.li-tag .selected').length > 29 ){
                        window.top.topPage.showErrorMessage(window.top.message.player['edit.form.tagMax'])
                    }else{
                        //增加标签
                        var tagLabel = "<span playerCount=" + playerCount + " builtIn=" + builtIn + " quantity=" + quantity + " tagId=" + tagId + " id='tag_" + tagId + "'>" + tagName + "&nbsp</span>";
                        $('#playerSelectTag').append(tagLabel);
                        $this.addClass('selected');
                        var tagids = $("#playerTag").val();
                        if(tagids&&tagids!=""){
                            tagids =tagids +"," + tagId;
                        }else{
                            tagids = tagId;
                        }
                        $("#playerTag").val(tagids);

                        if (builtIn == "true" && !$this.attr("tagSelected")) {
                            $("#vip").val(true);
                        }

                    }
                }
            });
            //国家地区
            $(this.formSelector).on("change", "#nation", function () {
                var nation = $("#nation").val();
                window.top.topPage.ajax({
                    url: root + '/regions/states/' + nation + '.html',
                    dataType: "json",
                    success: function (data) {
                        var option = "";
                        $.each(data, function (key, val) {
                            option += "<option value=" + key + ">" + val + "</option>"
                        });
                        $("#province").html(option);
                    }
                });
            });
            //先选择区号之后才可以输入手机号
            $(this.formSelector).on("change", "#phoneCode", function () {
                var phoneCode = $(this).val();
                var mobilePhone = $("#mobilePhone");
                if (phoneCode == null || phoneCode == "") {
                    mobilePhone.val("");
                    mobilePhone.attr("disabled", true);
                } else {
                    mobilePhone.attr("disabled", false);
                }
            });
            //点击显示标签自适应高度
            $(this.formSelector).on("click", "#addLebal", function () {
                _this.resizeDialog();
            });

            $(this.formSelector).on("click", "#applyTop", function () {
                var rakebackId=$("#parentRakebackId").val();
                if(rakebackId){
                    $("[name='result.rakebackId']").val(rakebackId).trigger("chosen:updated");
                    select.setValue('[name="result.rakebackId"]',rakebackId);
                }else{
                    window.top.topPage.showInfoMessage(window.top.message.player_auto['上层账号没有设置反水方案'])
                }
            });
        },
        showSelectTag: function (e, btnOption) {
            if (e.returnValue) {
                var labels = e.returnValue
                $(labels).each(function (index) {
                    var Selected = $("a[name='label']");
                    $(Selected).each(function () {
                        if ($(this).attr('key') == labels[index].key) {
                            $(this).remove();
                        }
                    });
                    var label = "<a href='javascript:void(0)' class='current' name='label' code=" + labels[index].code + ">" + labels[index].name + "</a>";
                    $("[name='labels']").html(label);
                });
            }
        },
        /**
         * 拼装标签CODE并保存
         */
        savePlayer: function (e) {
            var that = this;
            var i = 0;//记录是否有超过限制
            var pcount = 0;
            var num = 0;
            if (!this.validateForm(e)) {
                return;
            }
            var Selected = $("#playerSelectTag").children();
            var selectVal = "";
            if(Selected.length>30){
                window.top.topPage.showInfoMessage(window.top.message.player['edit.form.tagMax']);
                return;
            }
            $(Selected).each(function (index,item) {

                //判断vip通道上限是否达到
                if ($("#vip").val() == "true") {
                    var $item = $(item);
                    var playerCounter = $item.attr("playercount");
                    var builtIn = $item.attr("builtin");
                    var quantity = $item.attr("quantity");
                    if (builtIn == "true") {
                        if (parseInt(playerCounter) + 1 > parseInt(quantity)) {
                            i++;
                            pcount = parseInt(playerCounter);
                            num = parseInt(quantity);
                        }
                    }
                }

                var tagId = $(this).attr('tagId');
                if (index == 0) {
                    selectVal = tagId;
                }
                else if (index > 0) {
                    selectVal = selectVal + ',' + tagId;
                }
            });
            $('#playerTag').attr('value', selectVal);
            if(i > 0) {
                window.top.topPage.showAlertMessage(window.top.message.player_auto['消息'],
                    window.top.message.player_auto['VIP通道标签仅限'].replace("[0]",num).replace("[1]",pcount),window.top.message.player_auto['重新选择']);
                return false;
            }
            return true;
        },
        changeSpecialFocus: function (e) {
            var userId=$("#userId").val();
            var specialFocus=$("#specialFocus").val();
            window.top.topPage.ajax({
                url:root+"/player/setSpecialFocus.html",
                data:{"result.id":userId,"result.specialFocus":specialFocus},
                success: function () {
                    $(e.currentTarget).unlock();
                    if(specialFocus=="true"){
                        $(e.currentTarget).addClass("btn-outline");
                        $("#specialFocus").val("false");
                    }else{
                        $(e.currentTarget).removeClass("btn-outline");
                        $("#specialFocus").val("true");
                    }
                }
            });
        },
        editPlayerDetail: function (e) {
            $("[name=returnView]").click();
        },
        queryRank: function (e, opt) {
            var id= e.key;
            if(id){
                window.top.topPage.ajax({
                    url: root+"/playerRank/copyParameter.html.html?search.id="+id,
                    dataType: "json",
                    success: function (data) {
                        if(data&&data.result&&data.result.riskMarker){
                            var obj = {};
                            obj.currentTarget = $("[selectdiv='result.rankId']");
                            page.showPopover(obj,{"placement":"right"},"warning",window.top.message.player_auto['危险层级'],true);
                        }
                    }
                });
            }
        },
        myCallback: function (e, opt) {
            var comeFrom = $("[name='comeFrom']").val();
            if(comeFrom=="detail"){
                var playerId = $("[name='result.id']").val();
                if(playerId){
                    this.toPlayerDetail();
                }else {
                    this.saveReturnCallbak();
                }

            }else{
                this.saveReturnCallbak();
            }
        },
        toPlayerDetail: function () {
            var playerId = $("[name='result.id']").val();
            var url = root + "/player/playerDetail.html?search.id="+playerId;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $("#mainFrame").html(data);
                }
            });
        },

        saveLabel:function (e,option) {
            
            window.top.topPage.ajax({
                url: root+"/player/saveLabel.html",
                dataType: 'json',
                data: this.getCurrentFormData(e),
                success: function (data) {
                    
                    if (data.isFull) {
                        window.top.topPage.showAlertMessage(window.top.message.player_auto['消息'],
                            window.top.message.player_auto['VIP通道标签仅限'].replace("[0]",data.quantity).replace("[1]",data.playerCount),window.top.message.player_auto['重新选择']);
                        $(e.currentTarget).unlock();
                        return false;
                    }
                    var msgType = data.state == true ? 'success' : 'danger';
                    if (data.state) {
                        option.callback = 'saveCallbak';
                    }
                    e.page.showPopover(e, option, msgType, data.msg, true);
                },
                error: function (data) {
                    e.page.showPopover(e, option, 'danger', window.top.message.common['save.failed'], true);
                }
            })
        }
    });
});