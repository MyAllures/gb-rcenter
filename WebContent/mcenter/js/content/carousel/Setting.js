/**
 * Created by jeff on 15-8-5.
 */
define(['common/BaseEditPage','curl/curl/plugin/json','nestable','css!themesCss/jquery/plugins/jquery.nestable/jquery.nestable.css'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();

            //new InitNestable();
            /*$('.dd2').nestable({
                    rootClass       : 'dd2',//容器的class 不能和listClass相同

                    listClass       : 'dd-list2',//class
                    listNodeName    : 'div',//拖动列表的元素名

                    itemClass       : 'dd-item2',//class
                    itemNodeName    : 'li',//拖动的元素名
                    handleClass     : 'dd-handle2',//列表中拖动元素的类


                    collapseBtnHTML : '',//失败时显示的html 默认 ''

                    group           : 0, //各个组之间允许相互拖动
                    maxDepth        : 1 //最多嵌套多少 默认0
                     })
                .on('change', function() {
                    /!*拖动改变时 改变序号*!/
                    $('.carousel-number').each(function( index ,obj ) {
                        $(obj).html(index+1);
                    })
                });*/
        },
        /**
         * 拖动排序初始化
         * @see https://github.com/dbushell/Nestable
         */
        initNestable:function(){
            $(".dragdd").nestable({
                rootClass:'dragdd',
                listNodeName:'tbody',
                listClass:'dd-list1',
                itemNodeName:'tr',
                handleClass:'td-handle1',
                itemClass:'dd-item1',
                maxDepth:1
            });
        },
        bindEvent: function () {
            this._super();
            this.initNestable();
        },
        onPageLoad: function () {
            this._super();
        },
        getDate:function(){
            var result = [];
            var params = [];
            $('.dragdd').each(function(tbIdx,tb){
                $(tb).find("tr").each(function(trIdx,tr){
                    var tr = $(tr);
                    var dis = tr.is(":visible");
                    if(dis){
                        result.push({'orderNum':(trIdx+1),'id':tr.data("id"),'type':tr.data("type")});
                    }

                });
            });
            $('.times').each(function(index,obj){
                var param = {};
                $(obj).find("[type='hidden']").each(function(_index,_obj){
                    var $_this = $(_obj);
                    var _key = $_this.attr("name");
                    param[_key] = $_this.val();
                });
                params.push(param)

            });
            return JSON.stringify({'cttCarousels':result,"intervalTimes":params});
        },
        updateCarouselSort:function(e,p){
            var that = this;
            $(e.currentTarget).unlock();
            window.top.topPage.ajax({
                type:"POST",
                contentType: "application/json",
                url:root+"/content/cttCarousel/resetSort.html",
                data:that.getDate(),
                success:function(data){
                    data = eval("("+data+")");
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg,that.closePage());
                    }else{
                        window.top.topPage.showErrorMessage(data.msg);
                        $(e.currentTarget).unlock();
                    }
                },
                error:function(e){

                }
            });
        },
        /**
         * 类别改变时
         * @param e
         * @param p
         */
        typesChange:function(e){
            //改变时间下拉
            var key = e.key;
            /*var $timeSelect = $('[name="result.intervalTime"]')
            $timeSelect.val($("."+ key).val());
            $timeSelect.trigger("chosen:updated");*/
            //演示隐藏可拖动
            /*$(".dragdd").addClass("hide");
            $(".noData").addClass("hide");
            $(".tuo_"+key).removeClass("hide")*/

            $(".times").addClass("hide");
            $(".it_"+key).removeClass("hide");
            var idx = 0;
            $('.carousel-number').each(function( index ,obj ) {
                var dis = $(obj).is(":visible");
                if(dis){
                    $(obj).html(idx+1);
                    idx++;
                }

            });
            this.queryCarouselByType(key);
            this.resizeDialog();
        },

        queryCarouselByType: function (type) {
            var _this = this;
            var url = root + "/content/vCttCarousel/queryCarouselByType.html?search.type="+type;
            window.top.topPage.ajax({
                url: url,
                success: function (data) {
                    $("#typeListTable").find("tbody").remove();
                    $("#typeListTable").append(data);
                    _this.initNestable();
                    _this.resizeDialog();
                }
            });
        }

    });
});