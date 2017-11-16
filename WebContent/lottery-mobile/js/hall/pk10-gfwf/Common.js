define(['site/hall/GfwfCommon', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
        },

        checkNoSon:function(betCode,thisClassList){
            var _this = this;
            $("a.selected-btn.mui-active").removeClass("mui-active");
            thisClassList.toggle('mui-active');
            var dataCode=$("a.selected-btn.mui-active").attr("data-code");
            var dataPlayId=$("a.selected-btn.mui-active").attr("data-play_id");
            var jspName=$("a.selected-btn.main.mui-active").attr("data-jsp-name");
            if($("a.selected-btn.main.mui-active").size()>0){
                dataPlayId=$("a.selected-btn.main.mui-active").attr("data-play_id");
                dataCode=$("a.selected-btn.main.mui-active").attr("data-code");
            }
            $('div.gfwf-bg').slideUp();
            $('div.selected-wrap').slideUp();
            _this.getBetTable(dataCode,jspName);
            _this.resetBet();
        },

        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pk10_yixing_dwd","jspStr":"Pk10Dingweidan"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },

        showLastOpenCode: function (numArr) {
            var html = Template('template_lastOpenCode_gfwf', {numArr: numArr, len: numArr.length});
            html+='<span class="inline-list-2">';
            var sum=parseInt(numArr[0])+parseInt(numArr[1]);
            html+='<i class="lottery-block">'+sum+'</i>';
            if(sum%2==0){
                html+='<i class="lottery-block">双</i>';
            }else{
                html+='<i class="lottery-block">单</i>';
            }
            if(sum>=11){
                html+='<i class="lottery-block">大</i>';
            }else{
                html+='<i class="lottery-block">小</i>';
            }
            if(parseInt(numArr[0])>parseInt(numArr[9])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[1])>parseInt(numArr[8])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[2])>parseInt(numArr[7])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[3])>parseInt(numArr[6])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            if(parseInt(numArr[4])>parseInt(numArr[5])){
                html+='<i class="lottery-block">龙</i>';
            }else{
                html+='<i class="lottery-block">虎</i>';
            }
            html+='</span>';
            $("#lastOpenCode").html(html);
        },

        getRandomNumber: function (len) {
            var list = [];
            for (var i = 0; i < len; ++i) {
                var num = Math.floor(Math.random() * 10)+1;
                list[i] = num < 10?"0"+num:num;
            }
            return Template('template_lastOpenCode_gfwf', {numArr: list});
        },

    });
});