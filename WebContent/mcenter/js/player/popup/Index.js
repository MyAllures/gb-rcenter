define(['common/BaseListPage', 'moment', 'jqplaceholder', 'jsrender'], function (BaseListPage, Moment, jsrender) {

    return BaseListPage.extend({

        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = "form[name='playerForm']";
            this.noRecordMessage = window.top.message.common["find.norecord"];
            this._super(this.formSelector);
            this.doFormData();
        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            this.resizeDialog();
            $('[data-toggle="popover"]', _this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();
            $("#searchtext").keydown(function (event) {
                if (event.keyCode == 13) {
                    $(".btn-query-css").click();
                }
            });

            $("[name='search.username']").blur(function (e) {
                var $username = $(e.currentTarget);
                if ($username && $username.val()) {
                    $username.val($username.val().replace(/\s+/g, ""));
                }
            });
        },

        /**
         * 异步加载后需调用方法
         */
        synQueryPageLoad: function () {
            //注：这里不能调用onPageLoad方法，会重复定义排序等方法
            $('[data-toggle="popover"]', this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });
            this.pagination.changeOrderColumnClass();
        },

        /**
         * 请求数据
         */
        doFormData: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + "/player/popup/doData.html",
                type: 'POST',
                data: $(_this.formSelector).serialize(),
                dataType: "html",
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                success: function (data) {
                    var json = JSON.parse(data);
                    _this.renderData(json);
                    _this.queryCount(json);
                    _this.synQueryPageLoad();
                },
                error: function (data, state, msg) {
                    window.top.topPage.showErrorMessage(data.responseText);
                }
            });
        },

        /**
         * 渲染表单数据
         */
        renderData: function (json) {
            var _this = this;
            var $result = $("#editable tbody", _this.formSelector);
            var html = $("#VUserPlayerListVo").render({data: json.result});
            $result.html(html);
            this.resizeDialog();
        },

        /**
         * 重新计算分页
         * @param e
         */
        queryCount: function (data) {
            var _this = this;
            var url = root + "/player/popup/count.html";
            window.top.topPage.ajax({
                url: url,
                data: {'page':JSON.stringify(data.paging)},
                type: 'POST',
                success: function (data) {
                    $("#playerPage").html(data);
                    _this.initSelect();
                    _this.pagination.bindSelectChange(window.top.page);
                },
                error: function (data) {

                }
            })
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e,opt) {
            var $username = $("input[name='search.username']");
            if ($username && $username.val()) {
                $username.val($username.val().replace(/\s+/g, ""));
            }
            return true;
        },
        /**
         * 替换内容
         * @param e
         */
        replace: function (e) {
            var target = e.target;
            var href = $(target).attr("data-href");
            window.location.href = href;
            $(target).unlock();
        },
        /**
         * 重写query方法
         * @param event
         * @param option
         */
        query: function (event, option) {
            var $form = $(window.top.topPage.getCurrentForm(event));
            var _this = this;
            if (!$form.valid || $form.valid()) {
                window.top.topPage.ajax({
                    loading: true,
                    // url: window.top.topPage.getCurrentFormAction(event),
                    url: root + "/player/popup/doData.html",
                    headers: {
                        "Soul-Requested-With": "XMLHttpRequest"
                    },
                    type: "post",
                    data: this.getCurrentFormData(event),
                    success: function (data) {
                        var json = JSON.parse(data);
                        _this.renderData(json);
                        _this.queryCount(json);
                        $(event.currentTarget).unlock();
                        //注：这里不能调用onPageLoad方法，会重复定义排序等方法
                        _this.synQueryPageLoad();
                    },
                    error: function (data, state, msg) {
                        window.top.topPage.showErrorMessage(data.responseText);
                        $(event.currentTarget).unlock();
                    }
                });

            } else {
                $(event.currentTarget).unlock();
            }
        }

    });

});