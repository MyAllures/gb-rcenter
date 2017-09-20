define(['common/BaseEditPage','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseEditPage,nestable) {
    return BaseEditPage.extend({
        init : function() {
            this._super();
            setTimeout(function () {
                page.resizeDialog();
            },100);
            this.initMutiNestable();
            /*$('.dd-handle a').on('mousedown', function(e){
                e.stopPropagation();
            });*/
            /*$('[data-rel="tooltip"]').tooltip();*/
           /* $('#nestable').nestable().on('change', function(){
                var r = $('.dd').nestable('serialize');
                $("#xx").html(JSON.stringify(r));    //改变排序之后的数据
            });*/

        },
        initMutiNestable: function () {
            $('.dd').each(function (idx, item) {
                $(item).nestable({
                    listNodeName    : 'ol'+idx,//创建树结构的的HTML标签（默认'ol'）
                    itemNodeName    : 'li'+idx,//创建树结构节点的HTML标签（默认'li'）
                    rootClass       : 'tb'+idx,//根节点的class属性名称（默认'dd'）
                    listClass       : 'dd-list'+idx,//所有节点的class属性名称（默认'dd-list'）
                    itemClass       : 'dd-item'+idx,//树结构叶子节点class名称（默认'dd-item'）
                    handleClass     : 'dd-handle'+idx,
                    group           : idx,//允许在列表之间 拖动 的 组ID（默认0）
                    maxDepth        : 1,//树节点层次（默认5）
                    threshold       : 20
                });
            });
        },
        onPageLoad: function () {
            this._super();
        },
        bindEvent : function() {
            this._super();
            var _this = this;
            $(".dd-item").click(function () {
                page.resizeDialog();
            });

            $(".parent-li").mousedown(function () {
                var id = $(this).attr("subTypeId");
                var obj = $("#nestable"+id);
                if(obj){
                    if(obj.is(':hidden')){
                        $("#nestable"+id).removeClass("hide");
                    }else{
                        $("#nestable"+id).addClass("hide");
                    }
                    _this.resizeDialog();
                }
            });
        },
        saveHelpTypeOrder: function (e, opt) {
            var this_ = this;
            var orderObj = [];
            $(".dd").each(function (idx, item) {
                $(item).find("li"+idx).each(function (ix, type) {
                    var id = $(type).attr("data-id");
                    if(id){
                        orderObj.push({"orderNum":ix+1,"id":parseInt(id)});
                    }

                });
            });
            window.top.topPage.ajax({
                contentType: 'application/json',
                dataType:'json',
                data:JSON.stringify(orderObj),
                async:false,
                type:"post",
                url:root+'/helpType/saveHelpTypeOrder.html',
                success:function(data){
                    window.top.topPage.showSuccessMessage(window.top.message.common['save.success'], function (state) {
                        this_.closePage();
                    });
                },
                error:function(data) {
                    $(e.currentTarget).unlock();
                    window.top.topPage.showErrorMessage(window.top.message.common['save.failed']);
                }
            });
        }
    });
});
