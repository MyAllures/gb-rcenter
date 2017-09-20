define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        maxRange:50,

        init: function () {
            this._super();
        },
        /**
         * 删除游戏标签
         *
         * @param e
         * @param option
         */
        deleteGameTag: function (e, option) {
            $.each($("form").validate().errorList,function(index,item){
                $(item.element).poshytip('disable');
                $(item.element).poshytip('destroy');
            });
            var key = option.data;
            if (key == null) {
                $(e.currentTarget).parent().parent().remove();
                this.resizeDialog();//重新定义弹窗窗口大小
                this.resetKey();//重新定义输入框角标
                $(e.currentTarget).unlock();
                return;
            }else{
                var buildIn = option.buildIn;
                if(buildIn=="true"){//
                    window.top.topPage.showWarningMessage(window.top.message.content['game.tag.doNotDeleteDefaultTag']);
                    $(e.currentTarget).unlock();
                    return;
                }
            }
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/siteGameTag/deleteSiteGameTag.html',
                data: {"key": key},
                dataType: "json",
                success: function (data) {
                    if (data.isDefault) {//默认标签
                        window.top.topPage.showWarningMessage(window.top.message.content['game.tag.doNotDeleteDefaultTag']);
                        $(e.currentTarget).unlock();
                        return;
                    } /*else if (data.isUser) {
                        window.top.topPage.showConfirmMessage("该标签已经被使用，确认是否删除？", function (val) {
                            if (val) {
                                _this.deleteHasActivity(key, e);
                            }
                        });
                        $(e.currentTarget).unlock();
                        return;
                    } */else {
                        if (data.state) {
                            window.top.topPage.showSuccessMessage(data.msg);
                            $(e.currentTarget).parent().parent().remove();
                            _this.resizeDialog();//重新定义弹窗窗口大小
                            _this.resetKey();//重新定义输入框角标
                            _this.returnValue = true;
                        } else {
                            window.top.topPage.showErrorMessage(data.msg);
                        }
                    }
                    $(e.currentTarget).unlock();
                },
                error: function () {
                    $(e.currentTarget).unlock();
                }
            });
        },
        /**
         * 新增标签
         * @param e
         * @param option
         */
        addGameTag: function (e, option) {
            var _div_len = $(".add-players").children("div").length;
            var canCreate = _div_len < this.maxRange;
            if(canCreate) {
                $(e.currentTarget).prev().after($('#addGameTag').children().clone());
                this.resizeDialog();//重新定义弹窗窗口大小
                this.resetKey();//重新定义输入框角标
            } else{
                var _message =window.top.message.content['game.tag.addMaxCount']; //
                //var _message = window.top.message.content_auto['最多新增']+this.maxRange+window.top.message.content_auto['项'];
                if(_message){
                    _message = _message.replace("{count}",this.maxRange);
                }
                window.top.topPage.showInfoMessage(_message);
            }
            $(e.currentTarget).unlock();
        },
        myValidateForm: function (e,opt) {
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            var param = this.saveGameTagData(e);
            window.top.topPage.ajax({
                url: root + '/siteGameTag/gameTagIsExists.html',
                dataType: "json",
                data:param,
                type:"POST",
                success: function (data) {
                    if(!data.state){
                        window.top.topPage.doAjax(e, opt);
                    }else{
                        $(e.currentTarget).unlock();
                        window.top.topPage.showWarningMessage(data.msg);
                    }
                }
            });
            return false;
        },
        /**
         * 保存游戏标签的ajax data
         * @param e
         */
        saveGameTagData: function (e) {
            var jsonData = [];
            $(this.formSelector + " .category-list-wrap").each(function () {
                var data = {};
                var array = [];
                var key = $(this).attr("data-key");
                data.key = key;
                $(this).children(".form-group").children().children("input").each(function () {
                    var children = {};
                    children.locale = $(this).attr("data-locale");
                    children.value = $(this).val();
                    children.key = key;
                    children.id = $(this).attr("data-id");
                    array.push(children);
                });
                data.list = array;
                jsonData.push(data);
            });
            return "data=" + JSON.stringify(jsonData) + "&" + this.getCurrentFormData(e);
        },
        /**
         * 重新定义角标
         */
        resetKey: function () {
            var count = 0;
            $(".category-list-wrap").each(function () {
                $(this).children(".form-group").children().children("input").each(function () {
                    $(this).attr("name", $(this).attr("data-name").replace('{n}', count));
                });
                count++;
            });
        },
        saveMyCallbak:function(e,opt){
            var _this = this;
            _this.returnValue = "successful";
            _this.closePage(e,opt);
        }
    });

});
