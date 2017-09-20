/**
 * 玩家信息-资金js
 */
define(['common/BasePage', 'common/Pagination', 'knob'], function (BasePage, Pagination) {

    return BasePage.extend({
        select: null,
        pagination: null,
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name='fundsForm']";
            this.pagination = new Pagination(this.formSelector);
            this._super(this.formSelector);
            $(this.formSelector).validate({
                ignore: ".ignore"
            });
            this.loadAssets();
        },
        /**
         * 所需样式初始化
         */
        styleInit: function () {
            $(".dial").knob(
                {
                    'format': function (v) {
                        return v + '%';
                    }
                }
            );
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            //assets-wrap
            $(this.formSelector).on('mouseover', '.assets-wrap', function () {
                $(this).children(".tbsj").show();
            });
            $(this.formSelector).on('mouseout', ".assets-wrap", function () {
                $(this).children(".tbsj").hide();
            });

            //dl.funds-wrap dd a.refresh
            $(this.formSelector).on('mouseover', "dl.funds-wrap dd", function () {
                $(this).children("a.refresh").show();
            });
            $(this.formSelector).on('mouseout', "dl.funds-wrap dd", function () {
                $(this).children("a.refresh").hide();
            })
        },
        onPageLoad: function () {
            this._super();
            this.pagination.processOrderColumnTag(this, $(this.formSelector));
        },
        /**
         * 查询交易列表
         *
         * @param e
         */
        query: function (e) {
            var url = root + "/playerFunds/transactionList.html";
            var form = this.getCurrentForm(e);
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                data: this.getCurrentFormData(e),
                success: function (data) {
                    $(_this.formSelector + " div.transaction").html(data);
                    _this.onPageLoad();
                    //_this._processOrderColumnTag(form);
                },
                error: function (data) {

                }
            });
        },
        isRefresh: function () {
            /*var _this = this;
            var timeInterval = $(this.formSelector + " input[name=timeInterval]").val();
            var time = new Date(eval("(" + $("a.totalRefresh").attr("data-rel") + ")").nowTime);
            var timeNext = new Date(eval("(" + $("a.totalRefresh").attr("data-rel") + ")").synTime);
            time.setSeconds(time.getSeconds() - timeInterval);
            if (time <= timeNext) {
                $(this.formSelector + " a.totalRefresh").addClass("countdown");
                $("a.refreshApi").each(function () {
                    $(this).addClass("countdown");
                });
                window.setTimeout(function () {
                    $(_this.formSelector + " a.totalRefresh").removeClass("countdown");
                    $("a.refreshApi").each(function () {
                        $(this).removeClass("countdown");
                    })
                }, timeInterval * 1000);
            }*/
        },
        /**
         * 刷新
         * @param e
         * @param option
         */
        refresh: function (e, option) {
            var playerId = option.playerId;
            var apiId = option.apiId;
            var type = 'all';
            var url = root + "/playerFunds/refresh.html?search.playerId=" + playerId + "&t=" + new Date().getTime();
            if (apiId) {
                type = 'api';
                url = url + "&search.apiId=" + apiId;
            }
            url = url + "&type=" + type;
            var refresh = $(this.formSelector + " div.apiScare");
            $(refresh).html('<p style="text-align:center;"><img src="' + resRoot + '/images/022b.gif"></p>');
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $(refresh).html(data);
                    _this.styleInit();
                    _this.isRefresh();
                    $(e.currentTarget).unlock();
                },
                error: function (data) {
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 更多游戏
         * @param e
         * @param option
         */
        moreApi: function (e, option) {
            $(e.currentTarget).parent().parent().children("div[name=moreApi]").show();
            $(e.currentTarget).parent().remove();
            $(e.currentTarget).unlock();
            return false;
        },
        /**
         * 可以刷新同步api余额时间限制
         *
         * @param e
         * @param opt
         * @returns {boolean}
         */
        refreshApi: function (e, opt) {
          /*  var $target = $(e.currentTarget);
            if ($target.hasClass("countdown")) {
                return false;
            }*/
            return true;
        },
        /**
         * 首次加载资金概况
         */
        loadAssets: function () {
            var _this = this;
            var playerId = $(this.formSelector + " input[name='search.playerId']").val();
            window.top.topPage.ajax({
                url: root + "/playerFunds/refresh.html?type=all&search.playerId=" + playerId + "&t=" + new Date().getTime(),
                success: function (data) {
                    $(_this.formSelector + " div.apiScare").html(data);
                    _this.styleInit();
                    _this.isRefresh();
                },
                error: function (data) {

                }
            });
        }
    });

});