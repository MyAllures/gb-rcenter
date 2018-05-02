//模板页面
define(['common/BaseEditPage', 'jqFileInput', 'css!themesCss/fileinput/fileinput', 'bootstrapswitch', 'UE.I18N.' + window.top.language], function (BaseEditPage, fileinput, bootstrapswitch) {

    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        sw: true,
        ue: [],
        init: function (title) {
            this.formSelector = "form";
            this._super();
            var _this = this;
            $(".check-box").bootstrapSwitch();
            $(".form-textarea").each(function (idx, item) {
                _this.initUEditor(idx);
            });
        },
        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            this._super();
            var timing = $("#is_task").val();
            if (timing == "true") {
                $(".i-checks").click();
            }
            this.unInitFileInput($('.file'))
                .fileinput({
                    showUpload: false,
                    maxFileCount: 1,
                    maxFileSize: 1024,
                    mainClass: "input-group",
                    removeLabel: window.top.message.serve['apiManage.file.upload.remove'],
                    browseLabel: window.top.message.serve['apiManage.file.upload.browse'] + '&hellip;',
                    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                    msgInvalidFileExtension: window.top.message.serve['apiManage.file.upload.msgInvalidFileExtension'],
                    msgValidationError: window.top.message.serve['apiManage.file.upload.msgValidationError'],
                    msgSizeTooLarge: window.top.message.serve['apiManage.file.upload.msgSizeTooLarge']
                }).bind("filecleared", function (e) {
                e.fileInput.$container.prev().show();
            }).bind("fileloaded", function (e) {
                e.fileInput.$container.prev().hide();
                e.fileInput.$container.parent().removeClass("error");
                page.resizeDialog();
            });
        },
        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            this._super();
            var _this = this;
            //切换语言
            $(this.formSelector).on("click", "a[name='tag']", function () {
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local = $(this).attr('local');
                $(".ann").hide();
                $(".content" + local).show();
            });
            //复制语系
            $(this.formSelector).on("click", ".copy", function () {
                var sourceLocal = $(this).attr("local");
                var sourceContent = $(".gameNameVal" + sourceLocal).val();
                var targetLocal = $(".current").attr("local");
                $(".gameNameVal" + targetLocal).val(sourceContent);
                var sourceorderIndex = $(this).attr("orderIndex");
                var targetOrderIndex = $(".current").attr("tagIndex");
                /*var cover = $(".gameTypeCoverVal"+sourceLocal).val();
                 $(".gameTypeCoverVal"+targetLocal).val(cover);
                 var coverImg = $("#gameTypeCoverImg"+sourceLocal).attr("src");
                 $("#gameTypeCoverImg"+targetLocal).attr("src",coverImg);*/

                var introduceStatus = $(".gameIntroduceStatusVal" + sourceLocal).val();
                var targetVal = $(".gameIntroduceStatusVal" + targetLocal).val();
                if (introduceStatus != targetVal) {
                    $("[name=introduceStatus" + targetLocal + "]").click();
                    $(".gameIntroduceStatusVal" + targetLocal).val(introduceStatus);
                }

                var introduce = _this.getSendContent(sourceorderIndex - 1);
                _this.setSendContent(targetOrderIndex - 1, introduce);
            });

            /**
             * 重写验证
             */
            $(this.formSelector).on("validate", "input,textarea", function (e, message) {
                if (message && $(this).is(":hidden")) {
                    var attr = $(this).attr("tt");
                    if (attr) {
                        $(".a_" + attr).click();
                        $(".a_" + attr).formtip(message);
                        e.result = true;
                    }

                }
                else {
                    e.result = false;
                }
            });

            //修改编辑状态
            $(this.formSelector).on("click", "a[name='tag']", function () {
                var local = $(this).attr("local");
                $("#curLanguage").val($(this).attr("tagIndex"));
                $(".tab-pane").each(function (index, item) {
                    var lang = $(item).attr("lang");
                    var flag = false;
                    $(item).find(".field").each(function (idx, field) {
                        if ($(field).val() == "") {
                            flag = true;
                        }
                    });
                    if (flag) {
                        $("#span" + lang).text(window.top.message.common['switch.CloseReminder.unedited']);
                    } else {
                        $("#option" + lang).show();
                        $("#span" + lang).text(window.top.message.common['switch.CloseReminder.edited']);
                    }
                    if (local == lang) {
                        $("#option" + lang).hide();
                    }
                });
                $("#span" + local).text(window.top.message.common['switch.CloseReminder.editing']);

            });

        },
        changeCurrentLang: function (e, p) {
            try {
                var curIndex = $("#curLanguage").val();
                var allTags = $(".tabLanguage").length;
                for (var i = 0; i < allTags; i++) {
                    if (curIndex < allTags) {
                        curIndex++;
                        $("#tag" + curIndex).click();
                    } else {
                        curIndex = 1;
                        $("#tag" + curIndex).click();
                    }
                    break;
                }
            } finally {
                $(e.currentTarget).unlock();
            }

        },
        /**
         * 图片上传
         * @param e
         * @param opt
         * @returns {boolean}
         */
        uploadFile: function (e, opt) {
            e.objId = $("#gameId").val();
            e.catePath = 'game';
            var flag = this.uploadAllFiles(e, opt);
            if (!flag) {
                return false;
            }
            if (!this.validateForm(e)) {
                return false;
            }
            if ($('.file-error-message:visible').length > 0) {
                return false;
            }
            return true;
        },
        /**
         * 初始化 ueditor
         */
        initUEditor: function (idx) {
            var that = this;
            UE.delEditor('editContent' + idx);
            var width = $("#editContent" + idx).width;
            this.ue[idx] = UE.getEditor('editContent' + idx, {
                enableAutoSave: false, /*是否自动保存*/
                initialFrameWidth: width, /*初始化编辑器宽度($(window.document).width() *.9)*/
                initialFrameHeight: 200, /*初始化编辑器宽度*/
                autoHeightEnabled: false, /*是否自动长高*/
                maximumWords: 20000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment'

                ]]
            });
            /*contentChange*/
            this.ue[idx].addListener('contentChange', function (editor) {
            });
            this.ue[idx].ready(function () {
                that.resizeDialog()
            })
        },
        /**
         * 设置内容
         * @param val
         */
        setSendContent: function (idx, val) {
            if (this.ue[idx]) {
                this.ue[idx].setContent(val);
            }
        },
        /**
         * 获取内容
         */
        getSendContent: function (idx) {
            if (this.ue[idx]) {
                return this.ue[idx].getContent();
            }
        }

    });
});