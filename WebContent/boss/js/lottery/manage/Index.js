
define(['common/BaseListPage'], function (BaseListPage) {
    return BaseListPage.extend({
        init: function () {
            this._super();
            this.initSelectHigh();
        },
        initSelectHigh:function () {
            select.setSelectHeight=function($this){
                var maxHeight= 300;
                if(!$this.parent().hasClass("dropup")){
                    var maxHeight1=document.body.clientHeight-$this.parent()[0].offsetTop-$this[0].clientHeight-20;
                    var maxHeight2=$(window).height()-$this.parent()[0].offsetTop-$this[0].clientHeight-20;
                    if(maxHeight1>maxHeight2 && maxHeight2>0){
                        maxHeight=maxHeight2
                    }
                    else{
                        maxHeight=maxHeight1;
                    }
                    if(maxHeight>300){
                        maxHeight=300;
                    }
                }
                if ($this.parents("tbody").length==1){
                    maxHeight=300;
                }
                var ul=$('ul[class="dropdown-menu"]',$this.parent());
                ul.css("maxHeight",maxHeight)
                    .css("minWidth",93).css("minHeight",25).css('overflow-y','auto').css('overflow-x','visible');
            }
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            $("#common-order").click(function(){
                var siteId = $("#singleVal").val();
                var href = '/lottery/manage/orderLottery.html';
                if(siteId){
                    href = "/siteLottery/orderLottery.html?siteId="+siteId;
                }
                $(this).attr("href",href);
            })

        },
        onPageLoad: function () {
            this._super();
        },
        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        validateForm: function (e) {
            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },
        sync:function (e,option) {
            var siteId=$("#singleVal").val();
            var btnOption = {};
            btnOption.target = "siteLottery/sync.html?search.siteId="+siteId;
            btnOption.callback ="query";
            if(siteId) {
                btnOption.text = "同步站点:" + siteId;
            }else{
                btnOption.text = "同步全部站点";
            }
            window.top.topPage.doDialog(e, btnOption);
        },
        takeOff:function (e,option) {
            var siteId=$("#singleVal").val();
            var btnOption = {};
            btnOption.target = "siteLottery/takeOff.html?search.siteId="+siteId;
            btnOption.callback ="query";
            if(siteId){
                btnOption.text = "下架站点:"+siteId;
            }else {
                btnOption.text = "下架全部站点";
            }
            window.top.topPage.doDialog(e, btnOption);
        },
        updateLotteryGenre:function (e,option) {
            var genre = e.key;
            var code = $(e.currentTarget).parent().parent().parent().parent().find("input[name='code']").val();
            var id = $(e.currentTarget).parent().parent().parent().parent().find("input[name='id']").val();
            var _e = {
                currentTarget:$(e.currentTarget).parent().parent().parent(),
                page:page
            };
            window.top.topPage.ajax({
                type:"post",
                url:root+'/lottery/manage/changeLotteryGenre.html',
                data:{'result.code':code,'result.genre':genre,'result.id':id},
                error:function(data){
                    _e.page.showPopover(_e, option, 'danger', '保存失败', true);
                },
                success:function (data) {
                    _e.page.showPopover(_e, option, 'success', '保存成功', true);
                }
            })
        },
        updateSiteLotteryGenre: function (e) {
            var genre = e.key;
            var code = $(e.currentTarget).parent().parent().parent().parent().find("input[name='code']").val();
            var id = $(e.currentTarget).parent().parent().parent().parent().find("input[name='id']").val();
            var siteId = $("#singleVal").val();
            var _e = {
                currentTarget:$(e.currentTarget).parent().parent().parent(),
                page:page
            };
            var option = {};
            window.top.topPage.ajax({
                type:"post",
                url:root+'/siteLottery/changeLotteryGenre.html',
                data:{'result.genre':genre,'result.id':id,'result.siteId':siteId},
                error:function(data){
                    _e.page.showPopover(_e, option, 'danger', '保存失败', true);
                },
                success:function (data) {
                    _e.page.showPopover(_e, option, 'success', '保存成功', true);
                }
            })
        }
    })
});
