/**
 * 资金管理-手工存取
 */
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this._super(this.formSelector);
        },
        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            this._super();

        },
        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            this._super();
            //自定义下拉选择事件
            this.sorTable();
        },
        /**
         * 排序
         */
        sorTable: function () {
            var _this=this;
            $(_this.formSelector + '.monitordetail th').click(function(){debugger;
                var table = $(this).parents('table').eq(0)
                var rows = table.find('tr:gt(0)').toArray().sort(_this.comparer($(this).index()))
                this.asc = !this.asc
                if (!this.asc){rows = rows.reverse()}
                for (var i = 0; i < rows.length; i++){table.append(rows[i])}
            })
        },
        /**
         * 比较
         * @param index
         * @returns {Function}
         */
        comparer : function (index) {
            var _this=this;
            return function(a, b) {
                var valA = _this.getCellValue(a, index), valB = _this.getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
            }
        },
        /**
         * 取值
         * @param row
         * @param index
         * @returns {*|jQuery}
         */
        getCellValue: function (row, index) {
            return $(row).children('td').eq(index).text()
        },
        /**
         * 刷新监控数据
         * @param e
         * @param opt
         */
        refreshData:function (e, opt) {
            var _this =this
            window.top.topPage.ajax({
                dataType:'json',
                type:"post",
                url:root+'/Monitor/refresh.html',
                success:function(data){
                    if(data==true){
                        window.setTimeout(function () {
                            _this.query(e, opt);
                        },1000);
                    }
                }
            });
        },
        /**
         *
         * @param e
         * @param opt
         */
        clearMonitorData:function (e, opt) {
            var _this =this
            window.top.topPage.ajax({
                dataType:'json',
                type:"post",
                url:root+'/Monitor/clearMonitorData.html',
                success:function(data){
                    if(data==true) {
                        window.top.topPage.showSuccessMessage("操作成功!");
                    }else{
                        window.top.topPage.showErrorMessage("操作失败!");
                    }
                }
            });
        },
    });
});