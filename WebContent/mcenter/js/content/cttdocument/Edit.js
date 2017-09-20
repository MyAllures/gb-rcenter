define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
            this.initEableSave();
        },

        bindEvent: function () {
            this._super();
            var _this = this;
            $(".not-null-css").bind("input propertychange",function(){
                _this.initEableSave();
            });

        },
        initEableSave: function () {
            var edit = true;
            $(".not-null-css").each(function (idx,item) {
                if($(item).val()==""){
                    edit = false;
                }
            });
            if(edit){
                $(".ok-btn").removeClass("disabled")
                $(".cancel-btn").removeClass("disabled")
            }else{
                $(".ok-btn").addClass("disabled");
                $(".cancel-btn").addClass("disabled")
            }
        },
        /**
         * 获取标题
         * @param e
         * @param opt
         */
        getCttTitle:function(e,opt){
            var _title = [],counter = 0;
            $("._title").each(function(obj) {
                _title[counter] = obj.value;
                counter++;
            });
            var title = _title.join(",");
            opt.target = opt.target.replace('{title}',title);

        },
        showEdit:function(e, option){
            e.returnValue = true;
            var _this = $(this);
            _this.href('nav-target', 'mainFrame');
            _this.href = root + "/cttDraft/editContent.html";
            _this.trigger('click');
        },
        nextStep: function (e) {
            this.closePage();
            var url = root + '/cttDraft/editContent.html';
            $('.panel-default', window.parent.document).load(url, function () {

            });
        },
        saveNext:function(e,btnOption){
            var _this=this;
            _this.returnValue = "successful";
            _this.closePage(e,btnOption)
        },
        toNext:function(e,btnOption){//
            var _this=this;
            _this.returnValue=$("#editForm").serialize();
            _this.closePage(e,btnOption)
        }
    })
});
