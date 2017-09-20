define(['common/BaseEditPage'], function (BaseEditPage) {
    return BaseEditPage.extend({
        init: function () {
            this._super();
        },

        bindEvent: function () {
            this._super();
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
        toNext:function(e,btnOption){//
            var _this=this;
            _this.returnValue=$("#editForm").serialize();
            _this.closePage(e,btnOption)
        },
    })
});
