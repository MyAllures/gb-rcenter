/**
 * 公司入款金流顺序
 */
define(['common/BaseEditPage', 'nestable', 'css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseEditPage, nestable) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=companySortForm]";
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
            this.initNestable();
        },
        bindEvent: function () {
            this._super();
            //银行账户和第三方账户切换
            $(this.formSelector).on("click", ".limit_title[name=type]", function () {
                $(".limit_title[name=type]").removeClass("cur");
                $(this).addClass("cur");
                var data = $(this).attr("data");
                $(".table-responsive").hide();
                $("#" + data + ".table-responsive").show();
            });
        },
        /**
         * 拖动排序初始化
         * @see https://github.com/dbushell/Nestable
         */
        initNestable: function () {
            $(".dragdd").nestable({
                rootClass: 'dragdd',
                listNodeName: 'tbody',
                listClass: 'dd-list1',
                itemNodeName: 'tr',
                handleClass: 'td-handle1',
                itemClass: 'dd-item1',
                maxDepth: 1
            });
        },
        /**
         * 根据层级展示收款账号
         * @param e
         * @param option
         */
        rankAccount: function (e, option) {
            var url = option.url;
            var _this = this;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $(".select-level a.current").removeClass("current");
                    $(e.currentTarget).addClass("current");
                    $("#companySort").html(data);
                    _this.initNestable();
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 保存金流顺序
         * @param e
         * @param option
         */
        save: function (e, option) {
            var list = [];
            $(".dd-item1.tab-detail").each(function (index, obj) {
                var playerRankId = $(obj).children("[name='playerRankId']").val();
                var payAccountId = $(obj).children("[name='payAccountId']").val();
                if (playerRankId && payAccountId) {
                    list.push({
                        "sort": index + 1,
                        "playerRankId": playerRankId,
                        "payAccountId": payAccountId
                    });
                }
            });
            if (list.length <= 0) {
                e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
                return;
            }
            window.top.topPage.ajax({
                dataType: 'json',
                data: {'payRankJson': JSON.stringify(list)},
                type: "post",
                url: root + '/vPayAccount/saveCompanySort.html',
                success: function (data) {
                    if (data == true) {
                        e.page.showPopover(e, option, 'success', window.top.message.common['save.success'], true);
                        $(".select-level a.current").click();
                    } else {
                        e.page.showPopover(e, option, 'danger', window.top.message.common['save.failed'], true);
                    }
                    $(e.currentTarget).unlock();
                }
            });
        }
    })
});