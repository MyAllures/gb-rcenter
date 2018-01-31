/**
 * Created by bruce on 16-7-7.
 */
define(['common/BaseListPage', 'gb/share/ListFiltersPage','jsrender'], function (BaseListPage,jsrender) {

    return BaseListPage.extend({

        init: function () {
            this.formSelector = "form[name='onlineDepositForm']";
            this._super(this.formSelector);
            this.doFormData();
            this.queryCount();
            this.doStatistics();
        },

        /**
         * 请求数据
         */
        doFormData: function() {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                url: root + "/fund/deposit/online/doData.html",
                type:'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    _this.renderData(data);
                    _this.onPageLoad();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 渲染表单数据
         */
        renderData:function (data) {
            var _this=this;
            var $result = $("#editable tbody", _this.formSelector);
            try{
                var json = JSON.parse(data);
                var html = $("#VPlayerOnlineDepositListVo",_this.formSelector).render({data:json.result});
                $result.html(html);
            }catch (err){
                console.info(err);
            }
        },

        /**
         * 请求统计数据
         */
        doStatistics: function() {
            var _this = this;
            window.top.topPage.ajax({
                //loading: true,
                url: root+'/fund/deposit/online/doStatistics.html',
                type:'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With":"XMLHttpRequest"
                },
                success: function (data) {
                    var json = JSON.parse(data);
                    if(json.isTodaySales){
                        $("#todayTotal",_this.formSelector).text(json.todayTotal);
                        $("#totalSumTarget",_this.formSelector).parent().parent().hide();
                        $("#todayTotal",_this.formSelector).parent().parent().show();
                    }else{
                        $("#totalSumTarget",_this.formSelector).text(json.totalSum);
                        $("#todayTotal",_this.formSelector).parent().parent().hide();
                        $("#totalSumTarget",_this.formSelector).parent().parent().show();
                    }
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            var _this=this;
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    url: root + "/fund/deposit/online/doData.html",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        // var $result = $(".search-list-container", $form);
                        // $result.html(data);
                        _this.renderData(data);
                        event.page.onPageLoad();
                        $(event.currentTarget).unlock();
                        if(event.goType==undefined || event.goType==-2){
                            _this.queryCount();
                        }else{
                            _this.queryCount(true);
                        }
                        _this.doStatistics();
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                        _this.doStatistics();
                    }
                });

            } else {
                $(event.currentTarget).unlock();
            }
        },

        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function (isCounter) {
            var _this = this;
            var url = root + "/fund/deposit/online/count.html";
            if (isCounter) {
                url = url + "?isCounter=" + isCounter;
            }
            window.top.topPage.ajax({
                url: url,
                data: $(this.formSelector).serialize(),
                type: 'POST',
                success: function (data) {
                    $("#onlineDepositpageDiv").html(data);
                    _this.initSelect();
                    _this.pagination.bindSelectChange(page)
                },
                error: function (data) {

                }
            })
        },

        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            })
            //复制按钮
            var clip = new ZeroClipboard($('a[name="copy"]'));
            clip.on('aftercopy', function (e) {
                e.currentTarget = e.target;
                page.showPopover(e, {}, 'success', window.top.message.fund_auto['复制成功'], true);
            });
            /*if($("#todaySales").val()=='true'){
                $("#todayTotal").text($("#todayTotalSource").text());
                $("#totalSumTarget").parent().parent().hide();
                $("#todayTotal").parent().parent().show();
            }else{
                $("#totalSumTarget").text($("#totalSumSource").text());
                $("#todayTotal").parent().parent().hide();
                $("#totalSumTarget").parent().parent().show();
            }*/

        },
        /** 声音开关 */
        toneSwitch: function (e) {
            var tone = $('[name=switchVal]').val();
            if (e.key == tone) return;
            window.top.topPage.ajax({
                url: root + '/fund/deposit/online/toneSwitch.html?paramVal='+e.key,
                dataType: 'json',
                success: function (data) {
                    if (data.state) {
                        $('[name=switchVal]').val(e.key);

                        var obj = {currentTarget:$("div[selectdiv='toneSwitch']")};
                        if (e.key == 0) {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已开启'], true);
                        } else {
                            page.showPopover(obj, {}, 'success', window.top.message.fund_auto['声音已关闭'], true);
                        }
                    }
                }
            });
        },
        bindEvent: function () {
            this._super();
            var that = this;
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
            /**
             * 玩家层级选中
             */
            $("input[name='search.rankIds']", that.formSelector).change(function (e) {

                //显示勾选数量
                var rankNum = $("input[name='search.rankIds']:checked").length;
                if (rankNum == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['已选'] + rankNum + window.top.message.player_auto['项']);
                }
                var playerRanksMemory = [];
                //onPageLoad回填
                $("input[name='search.rankIds']:checked").each(function () {
                    playerRanksMemory.push($(this).val());
                })

                $("#playerRanksMemory").val(JSON.stringify(playerRanksMemory));

            });
            /**
             * 绑定下拉层级事件
             */
            $(".rank-btn", that.formSelector).on("click", function (e) {
                if ($(this).siblings(".dropdown-menu").css("display") == "none" || typeof $(this).siblings(".dropdown-menu").css("display") == "undefined") {
                    $(this).siblings(".dropdown-menu").css("display", "block");
                    $("div[selectdiv].open").removeClass("open");
                } else {
                    $(this).siblings(".dropdown-menu").css("display", "none");
                }
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });

            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='all']").on('click', function () {
                $("input[name='search.rankIds']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.rankIds']:checked").prop('checked', false).change();
            });
            $(that.formSelector).on('click', function (e) {
                $(".rank-btn").siblings(".dropdown-menu").css("display", "none");
            });
            $(".playerRank", that.formSelector).parent().on('click', function (e) {
                //阻止事件冒泡
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            });
        },

        selectListChange : function (e) {
            var target = $(e.currentTarget).parent().parent().parent().parent().next();
            $(target).attr("name", e.key);
            $(target).attr("placeholder", e.key == 'search.username'?"多个账号，用半角逗号隔开":e.value);
        }

    });
});