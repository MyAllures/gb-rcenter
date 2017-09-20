/**
 * Created by snekey on 15-7-3.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },
        bindEvent : function() {
            this._super();
        },
        changeDate:function(e){
            var _this = this;
            var date = window.top.topPage.formatDateTime(startDate.start, _this.dateTimeFromat)
            var month =date.substring(5,7);
            var day = date.substring(8,10);
            if(date==""){
                $('#constellation').val("");
            }else{
                var astro;
                astro = _this.getAstro(month,day);
            }
            $('#constellation_hide').val(astro);
            astro = $("#"+astro).val();
            $('#constellation').val(astro);
        },
        getAstro: function (month, day) {
            var s = window.top.message.player_auto['魔羯水瓶双鱼牧羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'];
            var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
            return s.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2);
        },
        //getValidateRule: function ($form){
        //    var rule = this._super($form);
        //    rule.rules['playerContactWays[0].contractValue'] = {"required":true};
        //    rule.messages['playerContactWays[0].contractValue'] = { "required":"请输入qq"};
        //    if (rule) {
        //        $form.validate(rule);
        //    }
        //
        //}
    });
})