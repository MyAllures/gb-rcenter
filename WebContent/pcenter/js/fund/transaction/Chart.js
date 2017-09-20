/**
 * Created by jeff on 15-11-4.
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({

        /*可以显示全部的类别*/
        all: null,


        /*类别对应的状态*/
        status4Type: null,

        init: function () {
            this._super();
            this.all = $('#all').val && eval("(" + $('#all').val() + ")");
            this.status4Type = $('#status4Type').val && eval("(" + $('#status4Type').val() + ")");
        },

        bindEvent: function () {
            var _this = this;
            this._super();
            this.toggleSearch();

            //列表头下拉筛选
            $(this.formSelector).on("change", "select", function (event) {
                _this.changeSelect(event);
                _this.query(event);
            });
        },

        onPageLoad: function () {
            this._super();
        },

        /**
         * 显示隐藏查询条件
         */
        toggleSearch: function () {
            $(".ud-condition").click(function () {
                $(this).toggleClass("show");
                $(".sh-condition").slideToggle(100);
            })
        },

        /**
         * 查询区域状态按钮
         * @param event
         * @param option
         */
        changeType: function (event, option) {
            /*TODO 已发放 要带上 类别*/
            /*状态父节点*/
            var statusSelector = $(".transactionType_status");

            /*类型*/
            var type = option.post;

            /*如果类型不是空 (全部)*/
            if (type) {

                /*获取当前类别下的状态*/
                var statusArray = this.status4Type[type];
                /*全部状态隐藏*/
                $('a', statusSelector).hide();
                $('.active', statusSelector).removeClass('active');
                $("input[name='search.status']").val('');
                /*循环当前类别下的状态 并显示 */
                statusArray.forEach(function (item, index) {
                    $('._' + item, statusSelector).show();
                });
                /*如果当前类别在'全部'中*/
                this.all.indexOf(type) >= 0 && $('.status_all', statusSelector).show();

            } else {
                /*类型是全部 则状态全部显示*/
                $('a', statusSelector).show();

            }
            this.changeSearchValue(event, option);
        },

        changeSearchValue: function (event, option) {


            /*在soul button中post定义value*/
            var value = option.post;

            /*当前按钮*/
            var $currentBtn = $(event.currentTarget);

            /*当前父节点*/
            var $parent = $currentBtn.parent();

            /*父节点中定义的选择器*/
            var $searchSelector = $($parent.data().selector);

            /*将查询区域的值 赋值给列表下拉*/
            $searchSelector.val(value);

            /*当前按钮的同胞去掉选中class*/
            $currentBtn.siblings().removeClass('active');

            /*当前按钮添加选中class*/
            $currentBtn.addClass('active');

            /*解锁按钮*/
            $currentBtn.unlock();
        },
        addSecond: function (Start, End, Label) {
            var data = eval('(' + $(Start.currentTarget).data().rel + ")");
            var $start = $('[name="' + data.startName + '"]');
            var $end = $('[name="' + data.endName + '"]');
            $start.val() && $start.val($start.val() + " 00:00:00");
            $end.val() && $end.val($end.val() + " 59:59:59");
        },
        getCurrentFormData: function (event, option) {
            //如果选中状态，需更新status
            var transactionTypeStatus = $(".transactionType_status").find("a.active");
            if (transactionTypeStatus && transactionTypeStatus.length > 0) {
                var _e = {currentTarget: transactionTypeStatus, page: event.page || page};
                this.changeSearchValue(_e, eval("(" + $(transactionTypeStatus).attr("data-rel") + ")"));
            }
            /*返水 推荐*/
            var typeArray = ['backwater', 'recommend'];
            //backwater recommend
            var $searchType = $("input[name='search.status']");
            var $searchTransactionType = $("input[name='search.transactionType']");
            if ($searchType.val() === 'lssuing') {
                //earchType.val('success');
                if (!(typeArray.indexOf($searchTransactionType.val()) > 0)) {
                    /*选中未发放 未选中类别 则指定类别为 返水|优惠*/
                    $("#transactionTypes").val('backwater,recommend');
                }
            }
            return this._super(event, option);
        },
        changeSelect: function (event, option) {
            var $currentSelect = $(event.currentTarget);
            var name = $currentSelect.parent().data().name;
            $("input[name='" + name + "']").val($currentSelect.val());
        },
        query: function (e, p) {
            $("#transactionTypes").val('');
            this._super(e, p);
        }
    });
});
