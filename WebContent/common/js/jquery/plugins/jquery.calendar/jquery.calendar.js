/**
 * Created by bruce on 17-2-25.
 */
/*
 * jQuery Date Selector Plugin
 * 日期联动选择插件
 *
 * Demo:
     $("#calendar").DateSelector({
     ctlYearId: <年控件id>,
     ctlMonthId: <月控件id>,
     ctlYearText:'<下拉默认文字>',
     ctlYearSelected:<是否需要默认的option>,
     ctlDayId: <日控件id>,
     defYear: <默认年>,
     defMonth: <默认月>,
     defDay: <默认日>,
     minYear: <最小年|默认为1882年>,
     maxYear: <最大年|默认为本年>
     });

 HTML:<div id="calendar"><SELECT id=idYear></SELECT>年 <SELECT id=idMonth></SELECT>月 <SELECT id=idDay></SELECT>日</div>
 */
(function ($) {
    //SELECT控件设置函数
    function setSelectControl(oSelect, iStart, iLength, iIndex,text,selected) {
        oSelect.empty();
        if (selected) {
            oSelect.append("<option value=''>" + text + "</option>");
        }
        for (var i = 0; i < iLength; i++) {
            if ((parseInt(iStart) + i) == iIndex)
                oSelect.append("<option selected='selected' value='" + (parseInt(iStart) + i) + "'>" + (parseInt(iStart) + i) + "</option>");
            else
                oSelect.append("<option value='" + (parseInt(iStart) + i) + "'>" + (parseInt(iStart) + i) + "</option>");
        }
    }

    $.fn.DateSelector = function (options) {
        options = options || {};

        //初始化
        this._options = {
            ctlYearId: null,
            ctlYearText:'请选择',
            ctlYearSelected:false,
            ctlMonthId: null,
            ctlMonthText:'请选择',
            ctlMonthSelected:false,
            ctlDayId: null,
            ctlDayText:'请选择',
            ctlDaySelected:false,
            defYear: 0,
            defMonth: 0,
            defDay: 0,
            minYear: 1882,
            maxYear: new Date().getFullYear()
        };

        for (var property in options) {
            this._options[property] = options[property];
        }

        this.yearValueId = $("#" + this._options.ctlYearId);
        this.monthValueId = $("#" + this._options.ctlMonthId);
        this.dayValueId = $("#" + this._options.ctlDayId);

        var dt = new Date(),
            iMonth = parseInt(this.monthValueId.attr("data") || this._options.defMonth),
            iDay = parseInt(this.dayValueId.attr("data") || this._options.defDay),
            iMinYear = parseInt(this._options.minYear),
            iMaxYear = parseInt(this._options.maxYear);

        this.Year = parseInt(this.yearValueId.attr("data") || this._options.defYear) || dt.getFullYear();
        this.Month = 1 <= iMonth && iMonth <= 12 ? iMonth : dt.getMonth() + 1;
        this.Day = iDay > 0 ? iDay : dt.getDate();
        this.minYear = iMinYear && iMinYear < this.Year ? iMinYear : this.Year;
        this.maxYear = iMaxYear && iMaxYear > this.Year ? iMaxYear : this.Year;

        //初始化控件
        //设置年
        setSelectControl(this.yearValueId, this.minYear, this.maxYear - this.minYear + 1, this.Year,this._options.ctlYearText,this._options.ctlYearSelected);
        //设置月
        setSelectControl(this.monthValueId, 1, 12, this.Month,this._options.ctlMonthText,this._options.ctlMonthSelected);
        //设置日
        var daysInMonth = new Date(this.Year, this.Month, 0).getDate(); //获取指定年月的当月天数[new Date(year, month, 0).getDate()]
        if (this.Day > daysInMonth) { this.Day = daysInMonth; }
        setSelectControl(this.dayValueId, 1, daysInMonth, this.Day,this._options.ctlDayText,this._options.ctlDaySelected);

        var oThis = this;
        //绑定控件事件
        this.yearValueId.change(function () {
            oThis.Year = $(this).val();
            setSelectControl(oThis.monthValueId, 1, 12, oThis.Month,oThis._options.ctlMonthText,oThis._options.ctlMonthSelected);
            oThis.monthValueId.change();
        });
        this.monthValueId.change(function () {
            oThis.Month = $(this).val();
            var daysInMonth = new Date(oThis.Year, oThis.Month, 0).getDate();
            if (oThis.Day > daysInMonth) { oThis.Day = daysInMonth; }
            setSelectControl(oThis.dayValueId, 1, daysInMonth, oThis.Day,oThis._options.ctlDayText,oThis._options.ctlDaySelected);
        });
        this.dayValueId.change(function () {
            oThis.Day = $(this).val();
        });
    }
})(jQuery);