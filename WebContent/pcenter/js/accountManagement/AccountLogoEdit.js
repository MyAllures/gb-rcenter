/**
 * Created by eagle on 15-10-30.
 */

define(['common/BaseEditPage','jqFileInput', 'css!commonCss/fileinput/fileinput'], function(BaseEditPage,fileinput) {

    return BaseEditPage.extend({

        init: function (title) {
            this.formSelector = "form";
            this._super();
        },

        onPageLoad: function () {

            this._super();

            window.top.topPage.initFileWithPreview($('.file'),$(".picturePreview2"),{
                    maxImageWidth:145,
                    maxImageHeight:145,
                    minImageWidth:145,
                    minImageHeight:145,
                    maxFileSize:1024,
                    allowedFileExtensions:['.jpg', '.jpeg','.png', '.gif']
            });

            window.top.topPage.initFileWithPreview($('.file'),$(".picturePreview"),{
            });
        },

        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //这里初始化所有的事件

            <!--显示隐藏上传图片-->
            $(".file-po").mouseenter(function() {
                $(".file-po-b").show();
            })
            $(".file-po").mouseleave(function() {
                $(".file-po-b").hide();
            })
        },

        /**
         * 上传头像
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            if (!$('.file').val()) {
                window.top.topPage.showWarningMessage(window.top.message.accountManagement_auto['图片错误请重新上传']);
                return false;
            }
            e.objId = 1;
            e.catePath = 'headImage';
            $(e.currentTarget).unlock();
            return this.uploadAllFiles(e, opt);
        },

    });
});
