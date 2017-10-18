define(['site/hall/PlayWay', 'site/plugin/template'], function (PlayWay, Template) {
    return PlayWay.extend({
        init: function () {
            this._super();
            this.loadPage();
            this.bindEvent();
        },
        getOdds: function () {
        },
        loadPage: function () {
        },
        bindEvent:function(){
            var _this = this;
            _this.changeList();
            //头部选择
            mui("div.s-menu").on('tap','a',function(){
                _this.menuClick(this.classList);
            });


            mui("body").on('tap','.gfwf-playName',function(){
                //mui(".gfwf-wrap")[0].classList.toggle('Fixed');
                $('div.selected-wrap').toggle();
                $('div.gfwf-bg').toggle();
            });

            mui("body").on('tap','.gfwf-bg',function(){
                $('div.gfwf-bg').slideUp();
                $('div.selected-wrap').slideUp();
            });


        },
        menuClick:function(thisClassList){
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
        getBetTable: function(betCode,jspName){
            var _this = this;
           // var jspStr=_this.getJspName(betCode,jspName);
            mui.ajax(root + '/'+_this.type+'/'+_this.code+'/getBetTable.html', {
                data: {"betCode": betCode,"jspStr":jspName},
                type: 'POST',
                success: function (data) {
                    //betCode赋值
                    $("#gfwfBetCode").val(betCode);
                    $(".bet-table").html(data);
                }
            });
        },
        changeList : function(){
            mui.ajax(root + '/'+this.type+'/'+this.code+'/getBetTable.html', {
                data: {"betCode": "pk10_zhixuan_qyfs","jspStr":"Pk10QianyiZxfs"},
                type: 'POST',
                success: function (data) {
                    $(".bet-table").html(data);
                }
            });
        },


        /**
         * 重置下注选项
         */
        resetBet: function () {
            $("i.mui-control-item").removeClass("mui-active");
            $("a.n-btn").removeClass("mui-active");
            $("#dingdan").removeClass('mui-active');
            $("#quantity").text(0);
            $("#inputMoney").text(0);
            $("a.bottom-bar-btn.btn-jixuan-gfwf").addClass("mui-active");
            $("a.bottom-bar-btn.btn-reset-gfwf").removeClass("mui-active");
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