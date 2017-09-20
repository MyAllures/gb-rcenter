define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this.formSelector = "form[name=editUrl]";
            this._super(this.formSelector);
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $(this.formSelector).on("click", "input[name=allRank]", function (e) {
                var val = $(this).val();
                if (val == 'true') {
                    $(_this.formSelector).find("input[name=rank]").prop("checked", true);
                } else {
                    $(_this.formSelector).find("input[name=rank]").prop("checked", true);
                }
            });

            $(this.formSelector).on("click", "input[name=rank]", function (e) {
                var isChecked = $(this).is(':checked');
                if (isChecked == false) {
                    $(_this.formSelector).find("input[name=allRank]").prop("checked", false);
                }
            })
        }
    })
});