/**
 * Created by cj on 15-9-29.
 */
define(['common/BaseListPage', 'bootstrap-dialog'], function(BaseListPage, BootstrapDialog) {

    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "#operatingReportForm";
            this._super();
        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      排序、
             *      分页、
             *      chosen Select
             * 控件的初始化(
             */
            this._super();
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            /**
             * super中已经集成了
             *      列头全选，全不选
             *      自定义列
             *      自定义查询下拉
             * 事件的初始化
             */
            this._super();
            var _this = this;
            //这里初始化所有的事件
            /**
             * 有标签页时调用
             */
            this.initShowTab();
            /**
             * 有详细展开时调用
             */
            this.initShowDetail();
        },
        _getSubUrl: function (id) {
            if (!id) {
                id = $('.StatisticsDataDiv', this.formSelector).attr('id');
            }
            switch(id) {
                case '0':
                    return;
                case '1':
                    return '/operatingReportSite/list.html';
                case '2':
                    return '/operatingReportTopAgent/list.html';
                case '3':
                    return '/operatingReportAgent/list.html';
                case '4':
                    return '/operatingReportPlayers/list.html';
            }
        },
        /**
         * 弹窗-弹出来
         * @param e
         * @param opt
         */
        showMoreGameType: function (e, opt) {
            $('#moreGameTypeDiv').show();
            var $div = $('<div></div>');
            $div.append($('#moreGameTypeDiv').html());
            var option={
                title: opt.text,
                type: BootstrapDialog.TYPE_PRIMARY,
                message: $div,
                buttons: [{
                    label: window.top.message.common['OK'],
                    cssClass: 'btn btn-filter',
                    action: function(dialogItself){
                        var gameTypes = [];
                        $("td[name='api_td']", '[role="dialog"]').each(function () {
                            $(this).next().children().children("input[type=checkbox]").each(function (index, ele){
                                if (ele.checked) {
                                    if ($.inArray($(ele).val(), gameTypes) == -1) {
                                        gameTypes.push($(ele).val());
                                    }
                                }
                            });
                        });
                        if (gameTypes.length > 0) {
                            if ($('input[name="search.gameTypeString"]').length > 0) {
                                $('input[name="search.gameTypeString"]').val(gameTypes);
                            } else {
                                $('#operatingReportForm').prepend('<input type="hidden" name="search.gameTypeString" value="'+ gameTypes +'"/>');
                            }
                            $('#gameTypeHasChoosedSpan').text(gameTypes);
                        } else {
                            if ($('input[name="search.gameTypeString"]').length > 0) {
                                $('#operatingReportForm').children('input[name="search.gameTypeString"]').remove();
                            }
                        }
                        dialogItself.close();
                    }
                }, {
                    label: window.top.message.common['cancel'],
                    cssClass: 'btn btn-outline btn-filter',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            };
            BootstrapDialog.show(option);
            $(e.currentTarget).unlock();
            e.page.onPageLoad();
        },
        /**
         * 快速筛选-全选
         */
        quickCheckAll: function (e) {
            $(e.currentTarget).removeClass('btn-outline');
            $(e.currentTarget).siblings('a').removeClass('btn-outline');
            $(e.currentTarget).next('a').addClass('btn-outline');
            $(e.currentTarget).unlock();
            $('#gameTypeHasChoosedSpan').text(window.top.message.report['OperatingReportSite.AllGames']);
            if ($('input[name="search.gameTypeString"]').length > 0) {
                $('#operatingReportForm').children('input[name="search.gameTypeString"]').remove();
            }
        },
        /**
         * 快速筛选-清除
         */
        quickClearAll: function (e) {
            $(e.currentTarget).siblings('a').addClass('btn-outline');
            $(e.currentTarget).unlock();
            $('#gameTypeHasChoosedSpan').text('');
            if ($('input[name="search.gameTypeString"]').length > 0) {
                $('#operatingReportForm').children('input[name="search.gameTypeString"]').remove();
            }
        },
        /**
         * 快速筛选-api选择
         */
        quickChoseApi: function (e, o) {
            $(e.currentTarget).removeClass('btn-outline');
            var id = o.data;
            window.top.topPage.ajax({
                url: root + "/operatingReportPlayers/getGameTypes.html",
                type: "post",
                dataType: "json",
                data: {"search.apiId": id},
                success: function (data) {
                    var text = $('#gameTypeHasChoosedSpan').text();
                    if (text && text.length > 0) {
                        text = text.split(',');
                    } else {
                        text = [];
                    }
                    $.each(data, function () {
                        var v = this.gameType;
                        if ($.inArray(v, text) == -1) {
                            text.push(v);
                        }
                    });
                    if ($('input[name="search.gameTypeString"]').length > 0) {
                        $('input[name="search.gameTypeString"]').val(text);
                    } else {
                        $('#operatingReportForm').prepend('<input type="hidden" name="search.gameTypeString" value="'+ text +'"/>');
                    }
                    $('#gameTypeHasChoosedSpan').text(text);
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 快速筛选-游戏类型选择
         */
        quickChoseGameType: function (e, o) {
            $(e.currentTarget).removeClass('btn-outline');
            var id = o.data;
            window.top.topPage.ajax({
                url: root + "/operatingReportPlayers/getGameTypes.html",
                type: "post",
                dataType: "json",
                data: {"search.gameType": id},
                success: function (data) {
                    var text = $('#gameTypeHasChoosedSpan').text();
                    if (text && text.length > 0) {
                        text = text.split(',');
                    } else {
                        text = [];
                    }
                    $.each(data, function () {
                        var v = this.gameType;
                        if ($.inArray(v, text) == -1) {
                            text.push(v);
                        }
                    });
                    if ($('input[name="search.gameTypeString"]').length > 0) {
                        $('input[name="search.gameTypeString"]').val(text);
                    } else {
                        $('#operatingReportForm').prepend('<input type="hidden" name="search.gameTypeString" value="'+ text +'"/>');
                    }
                    $('#gameTypeHasChoosedSpan').text(text);
                }
            });
            $(e.currentTarget).unlock();
        },
        /**
         * 弹窗-全选
         */
        checkAll: function (obj) {
            $('label').children('input[type=checkbox]').prop("checked", true);
        },
        /**
         * 弹窗-清除所有
         */
        clearAll: function (obj) {
            $('label').children('input[type=checkbox]').prop("checked", false);
            $(obj).siblings('button').addClass('btn-outline');
        },
        /**
         * 弹窗-api选择
         */
        choseApi: function (obj, apiId) {
            $('td').each(function () {
                if (apiId == $(this).attr("data-id")) {
                    $(this).children().children("input[type=checkbox]").prop("checked", true);
                }
            });
            $(obj).removeClass('btn-outline');
        },
        /**
         * 弹窗-游戏类型选择
         */
        choseGameType: function (obj, gameType) {
            $('label').children('input[type=checkbox]').each(function () {
                if (gameType == $(this).attr("data-parent")) {
                    $(this).prop("checked", true);
                }
            });
            $(obj).removeClass('btn-outline');
        },
        /**
         * 弹窗-点击左侧api
         * @param ele
         */
        clickLeftApi: function (ele) {
            if (ele.checked) {
                $(ele).parents('td').next().children().children("input[type=checkbox]").each(function (){
                    $(this).prop('checked', true);
                });
                $(ele).parents('table').parent().parent().find('[onclick="page.choseApi(this, ' + $(ele).parents('td').attr('data-id') + ')"]').removeClass('btn-outline');
            } else {
                $(ele).parents('td').next().children().children("input[type=checkbox]").each(function (){
                    $(this).prop('checked', false);
                });
                $(ele).parents('table').parent().parent().find('[onclick="page.choseApi(this, ' + $(ele).parents('td').attr('data-id') + ')"]').addClass('btn-outline');
            }
        },
        /**
         * 弹窗-点击右侧二级类型
         * @param ele
         */
        clickRightType: function (ele) {
            var $td = $(ele).parents('td');
            var allTypeLength = $td.find('[type=checkbox]').length;
            if (ele.checked) {
                var checkedLength = $td.find('[type=checkbox]:checked').length;
                if (allTypeLength == checkedLength) {
                    $($td).prev().find('[type=checkbox]').prop('checked', true);
                    $($td).parents('div').prev().find('[onclick="page.choseApi(this, ' + $($td).attr('data-id') + ')"]').removeClass('btn-outline');
                };
            } else {
                var checkedLength = $td.find('[type=checkbox]:checked').length;
                if (checkedLength == 0) {
                    $($td).prev().find('[type=checkbox]').prop('checked', false);
                    $($td).parents('div').prev().find('[onclick="page.choseApi(this, ' + $($td).attr('data-id') + ')"]').addClass('btn-outline');
                };
            }
        },
        collection: function (e, opt) {
            //$('input:not([name^="search."])', this.formSelector).each(function (index, ele) {
            //    $(ele).prop('disabled', true);
            //});
            //var data = $(this.formSelector).serialize();
            var id = $('.StatisticsDataDiv', this.formSelector).attr('id');
            var subUrl = {};
            switch (id) {
                case '0':
                case '1':
                    subUrl = '/operatingReportSite/export.html';
                    break;
                case '2':
                    subUrl = '/operatingReportTopAgent/export.html';
                    break;
                case '3':
                    subUrl = '/operatingReportAgent/export.html';
                    break;
                case '4':
                    subUrl = '/operatingReportPlayers/export.html';
                    break;
            }
            var p = new String();
            $('[name^="search."]', this.formSelector).each(function (index, ele) {
                if (this.value && this.value.length > 0) {
                    p += $(ele).prop("outerHTML");
                }
            });
            //$(this.formSelector).prepend('<input type="hidden" name="search.originConfition" value="'+ p +'"/>');
            opt.target = root + subUrl + '?p=' + p;
            return true;
        }
    });
});