define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,Bootstrapswitch) {
    var _this ;
    return BaseListPage.extend({
        bootstrapswitch: Bootstrapswitch,
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.unInitSwitch($("[name='my-checkbox']"))
                .bootstrapSwitch();

            $(".over").mousedown(function(){
                $(this).parent("td").parent("tr").parent("tbody").next("tbody.ng-hide").toggle();
                $(this).toggleClass("open");
            });
        },
        bindEvent : function() {
            this._super();
            $(this.formSelector).on("switchChange.bootstrapSwitch", 'input[name="my-checkbox"]',function(e) {
                var id=$(this).attr("tt");
                window.top.topPage.ajax({
                    url: root+"/cttDraft/updateStatus.html",
                    dataType: 'json',
                    cache: false,
                    type: "get",
                    data: {"childId": id},
                    success: function (data) {
                        if(data.state){
                            //_this.query(event,option);
                            window.top.page.query({currentTarget:e.currentTarget,page:_this});
                        }else{
                            window.top.page.query({currentTarget:e.currentTarget,page:_this});
                            window.top.topPage.showErrorMessage(data.msg);
                        }
                    }
                });
            });
        },
        nextStep: function (e) {
            this.closePage();
            var url = root + '/cttDraft/editContent.html';
            $('.panel-default', window.parent.document).load(url, function () {

            });
        },
        goNext:function(e,btnOption){
            if(e.returnValue!=null && e.returnValue.length>5){
                $("#tot").attr('href','/cttDraft/editContent.html?'+ e.returnValue);
                $("#tot").click();
            }else{
                window.top.page.query({currentTarget:e.currentTarget,page:_this});
            }
        },
    });
});
