define([], function () {
    return Class.extend({
        init: function () {
            this.bindButtonEvents();
        },
        bindButtonEvents: function () {
            this.paging();
        },
        /**
         * 涉及分页查询绑定事件
         */
        paging: function () {
            var _this = this;
            //直接跳转页面
            $(".paging-btn-list").on("click", "a[data-pageNum]", function () {
                var pageNum = $(this).attr("data-pageNum");
                _this.gotoPage(pageNum, $(this));
            });
            //指定页面跳转
            $(".paging").on("click", "button.paging-btn", function () {
                var pageNum = $("#input-number").val();
                _this.gotoPage(pageNum, $(this));
            });
            //每页大小
            $(".paging").on("change", "[name='paging.pageSize']", function () {
                _this.gotoPage(1, $(this));
            })
        },
        /**
         * 分页查询
         * @param pageNum
         * @param obj
         */
        gotoPage: function (pageNum, obj) {
            if (!pageNum) {
                var num = $("#input-number").val();
                var curnum = $("[name='paging.pageNumber']").val();
                if (num && num != curnum) {
                    pageNum = num;
                }
            }
            if (pageNum) {
                $("[name='paging.pageNumber']").val(pageNum);
                this.query(obj);
            }
        },
        /**
         * 列表查询后需要的操作
         * @param obj
         */
        afterQuery:function(){
            this.paging();
        },
        /**
         * 查询
         * @param obj
         */
        query: function (obj) {
            var e = {currentTarget: obj};
            var myform = this.getFirstParentByTag(e, "form");
            var data = $(myform).serialize();
            var url = $(myform).attr("action");
            var _this = this;
            $.ajax({
                type: "post",
                headers: {
                    "Soul-Requested-With": "XMLHttpRequest"
                },
                url: url,
                data: data,
                success: function (data) {
                    $("#search-list-container").html(data);
                    _this.afterQuery();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                beforeSend: function () {
                    if ($('div.loader', parent.document).length == 0) {
                        var src = resRoot + '/images/tail-spin.svg';
                        var content = '<div class="loader"><img src="' + src + '" width="30"><span>载入中...</span></div>';
                        $('body').append(content);
                    }
                },
                complete: function () {
                    $("div.loader").remove();
                }
            });
        },
        getFirstParentByTag: function (e, tag) {
            tag = tag.toLowerCase();
            var $form = e.currentTarget;
            while ($form && $form.tagName && $form.tagName.toLowerCase() != tag) {
                if ($form.parentElement) {
                    $form = $form.parentElement;
                } else {
                    break;
                }
            }
            if ($form && $form.tagName && $form.tagName.toLowerCase() == tag) {
                return $form;
            }
            else {
                return window.document.forms[0];
            }
        }
    })
});