define(['common/BaseListPage'], function(BaseListPage) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init : function() {
            this._super();
            this.formSelector = "form[name='playerOnlineForm']";
        },
        onPageLoad: function () {
            this._super();
            var _this=this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                html: true
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent : function() {
            this._super();
            var _this=this;
            $("#searchtext").keydown(function (event) {
                if(event.keyCode==13){
                    $(".btn-query-css").click();
                }
            });
            /**
             * 玩家层级选中
             */
            $("input[name='search.playerRanks']", _this.formSelector).change(function (e) {

                //显示勾选数量
                var rankNum = $("input[name='search.playerRanks']:checked").length;
                if (rankNum == 0) {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['请选择']);
                } else {
                    $(this).parents(".dropdown-menu").siblings("button").children(".rankText").text(window.top.message.player_auto['已选'] + rankNum + window.top.message.player_auto['项']);
                }
            });
            /**
             * 绑定下拉层级事件
             */
            $(".rank-btn", _this.formSelector).on("click", function (e) {
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
                $("input[name='search.playerRanks']").not("input:checked").prop('checked', true).change();
            });
            /**
             * 选中所有层级
             */
            $(".playerRank button[data-type='clear']").on('click', function () {
                $("input[name='search.playerRanks']:checked").prop('checked', false).change();
            });
            $(_this.formSelector).on('click', function (e) {
                $(".rank-btn").siblings(".dropdown-menu").css("display", "none");
            });
        },
        callbackquery: function (e,option) {
            if (e.returnValue==true) {
                this.query(e,option);
            } else if (e.returnValue=='tmpIndex') {
                $("#mainFrame").load(root+"/noticeTmpl/tmpIndex.html");
            }
        }
    });

});
