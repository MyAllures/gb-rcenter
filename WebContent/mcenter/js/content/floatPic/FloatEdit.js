/**
 * Created by cj on 15-7-29.
 */
define(['common/BaseEditPage', 'bootstrapswitch', 'jqFileInput', 'css!themesCss/fileinput/fileinput'], function (BaseEditPage, bootstrapSwitch, fileinput) {
    return BaseEditPage.extend({
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function (title) {
            this.formSelector = "form";
            this._super();//

            this.initSelectEvent();
        },

        initSelectEvent: function () {
            var length = $('#float_template_list_div li:visible', this.formSelector).length;
            $('#float_template_list_div li:visible', this.formSelector).each(function (imgIndex, ele) {
                if (imgIndex + 1 < length) {
                    var $divcontent = $(ele).find(".select_float_pic_link_type");
                    $divcontent.change(function (e) {
                        var key = $(this).find(".float_pic_list_item_link_type").attr("value");
                        var v = '';
                        if (key == 'link') {
                            $(this).find(".float_pic_list_item_service_value").addClass("hide");
                            $(this).find(".float_pic_list_item_http").removeClass("hide");
                            $(this).find(".float_pic_list_item_link_value").removeClass("hide");
                            $(this).find("[name=float_pic_list_item_placeholder]").removeClass("hide");
                            $(this).find(".setting").addClass("hide");
                            v = $(this).find(".float_pic_list_item_link_value").val();
                            $(this).find(".float_pic_list_item_link_type_value").val(v);
                        } else if (key == 'customer_service') {
                            $(this).find(".float_pic_list_item_service_value").removeClass("hide");
                            $(this).find(".float_pic_list_item_http").addClass("hide");
                            $(this).find(".float_pic_list_item_link_value").addClass("hide");
                            $(this).find("[name=float_pic_list_item_placeholder]").addClass("hide");
                            v = $(this).find(".float_pic_list_item_service_value").attr("value");
                            $(this).find(".float_pic_list_item_link_type_value").val(v);
                            $(this).find(".setting").removeClass("hide");
                        } else {
                            $(this).find(".float_pic_list_item_service_value").addClass("hide");
                            $(this).find(".float_pic_list_item_http").addClass("hide");
                            $(this).find(".float_pic_list_item_link_type_value").val("");
                            $(this).find(".float_pic_list_item_link_value ").addClass("hide");
                            $(this).find("[name=float_pic_list_item_placeholder]").addClass("hide");
                            $(this).find(".setting").addClass("hide");
                        }
                    });

                }
            });
        },

        /**
         * 单图或列表模式切换
         * @param e
         */
        singleModeChange: function (e) {
            var _this = this;
            var useTemplate = $(':radio[name=chooseTemplate]:checked').val();
        },

        /**
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            var _this = this;
            /**
             * super中已经集成了
             *      验证、
             *      chosen Select
             * 控件的初始化
             */
            _this._super();
            _this._initFile($('.file'));
            //鼠标划入效果与隐藏关闭按钮
            var $bootstrapSwitch = $('input[type=checkbox][switch=boostrapSwitch]');
            //前进后退时，事件需要重新初始化
            _this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.display.on'],
                    offText: window.top.message.content['floatPic.display.off']
                })
                .on('switchChange.bootstrapSwitch', function (event, state) {
                    var typeName = $(this).attr('name');
                    $('input[name="result.' + typeName + '"]').val(state);
                    if (state == false && typeName == 'mouseInEffect') {
                        $(".mouseInEffectDiv").addClass("hide");
                        $(".mouseInEffectDiv").hide();
                    } else if (state == true && typeName == 'mouseInEffect') {
                        $(".mouseInEffectDiv").removeClass("hide");
                        $(".mouseInEffectDiv").show();
                    }
                });

            $(":radio[name='result.singleMode']").on('change', function (e) {
                _this._switchDisplay();
            });

            $(":radio[name='result.picType']").on('change', function (e) {
                _this._switchDisplay();
            });

            this.initEditTagsEvent();
        },

        /**
         * 当前页面所有事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            $('[data-toggle="popover"]',_this.formSelector).popover({
                trigger: 'hover',
                placement: 'top'
            });

            $(this.formSelector).on('change', '.content_float_pic_image_service_value', function () {
                var v = $("[name='imgServiceValue']").val();
                $("[name='floatPicItem.imgLinkValue']").val(v);
            });

            $(this.formSelector).on('change', '[name=imgLinkTypeValue]', function () {
                var v = $("[name='imgLinkTypeValue']").val();
                $("[name='floatPicItem.imgLinkValue']").val(v);
            });

            $(this.formSelector).on('mouseover', '.singleModeTemplateImageType', function () {
                var src = $(this).attr("src");
                if (src != "") {
                    var dotIdx = src.lastIndexOf(".");
                    var subfix = src.substring(dotIdx + 1);
                    var overImg = src.substring(0, dotIdx) + "-hover." + subfix;
                    $(this).attr("src", overImg);
                }
            });

            $(this.formSelector).on('mouseout', '.singleModeTemplateImageType', function () {
                var src = $(this).attr("src");
                if (src != "") {
                    var outImg = src.replace("-hover", "");
                    $(this).attr("src", outImg);
                }
            });
        },

        /**
         * 切换单图或列表；自定义或模板
         * @param singleMode
         * @param userTemp
         * @private
         */
        _switchDisplay: function () {
            var singleMode = $(":radio[name='result.singleMode']:checked").val();
            var floatType = $(":radio[name='result.picType']:checked").val();
            //单图
            if (singleMode == 'true') {
                if(floatType == '1'){
                    $("#content_float_pic_single_link_div").removeClass("hide");//单图模式链接去掉hide
                    $("#singleMode_templateType_div").removeClass("hide");//单图模式图片去掉hide
                    $("#singleMode_service_pic").removeClass("hide");
                    $("#singleMode_promo_pic").addClass("hide");
                    $("#pic_showEffect").addClass("hide");//显示效果添加hide
                    $("#float_template_list_div").addClass("hide");//多图模式添加hide
                    $(".show_page_1").siblings().removeClass('hide');
                    $(".show_page_1").siblings('input').attr("checked", false);
                    $("[name='templateType'][value='1']").prop("checked", true);
                }else {
                    $("#content_float_pic_single_link_div").addClass("hide");//单图模式链接添加hide
                    $("#singleMode_templateType_div").removeClass("hide");//单图模式图片去掉hide
                    $("#singleMode_service_pic").addClass("hide");
                    $("#singleMode_promo_pic").removeClass("hide");
                    $("#pic_showEffect").removeClass("hide");//显示效果移除hide
                    $("#float_template_list_div").addClass("hide");//多图模式添加hide

                    $(".show_page_1").siblings().addClass('hide');
                    $(".show_page_span_1").removeClass('hide');
                    $(".show_page_1").siblings('input').attr("checked", false);
                    $(".show_page_1").attr("checked", true);
                    $("[name='templateType'][value='7']").prop("checked", true);
                }

            } else {
                //列表
                if(floatType == '1'){
                    $("#float_template_list_div").removeClass("hide");//列表模式移除hide
                    $("#content_float_pic_single_link_div").addClass("hide");//单图链接添加hide
                    $("#singleMode_templateType_div").addClass("hide");//单图模式图片添加hide
                    $(".select_float_pic_link_type").removeClass("hide");//列表模式链接移除hide
                    $("#pic_showEffect").addClass("hide");//显示效果添加hide

                    $(".show_page_1").siblings().removeClass('hide');
                    $(".show_page_1").siblings('input').attr("checked", false);
                    $("[name='templateType'][value='1']").prop("checked", true);
                }else {
                    $("#float_template_list_div").removeClass("hide");//列表模式移除hide
                    $("#content_float_pic_single_link_div").addClass("hide");//单图链接添加hide
                    $("#singleMode_templateType_div").addClass("hide");//单图模式图片添加hide
                    $(".select_float_pic_link_type").removeClass("hide");//列表模式链接添加hide
                    $("#pic_showEffect").removeClass("hide");//显示效果移除hide
                    $(".show_page_1").siblings().addClass('hide');
                    $(".show_page_span_1").removeClass('hide');
                    $(".show_page_1").siblings('input').attr("checked", false);
                    $(".show_page_1").attr("checked", true);
                    $("[name='templateType'][value='7']").prop("checked", true);
                }
                this.initSelectEvent();
                //鼠标移入效果
                if ($("input[name=mouseInEffect]:checked").val()) {
                    $(".mouseInEffectDiv").removeClass("hide");
                    $(".mouseInEffectDiv").show();
                } else {
                    $(".mouseInEffectDiv").addClass("hide");
                    $(".mouseInEffectDiv").hide();
                }
            }
        },

        showConfirm: function (e,option,msg) {

        },
        /**
         * 预览并提交
         * @param e
         * @param opt
         * @returns {boolean}
         */
        valiDateFormAndUploadFile: function (e, opt) {

            e.objId = $("#floatId").val();
            e.catePath = 'floatImage';
            var flag = this.uploadAllFiles(e, opt);
            if (!flag) {
                return false;
            }
            if (!this.validateForm(e)) {
                $(e.currentTarget).unlock();
                return false;
            }
            var editType = $("[name='editType']").val();
            var picType =$("[name='result.picType']:checked").val();
            if(editType == '1' && picType == '2'){
                window.top.topPage.ajax({
                    url: root + '/cttFloatPic/isExitPromo.html',
                    data: {"search.picType":picType},
                    type: "POST",
                    success: function (data) {
                        var json = eval("(" + data + ")");
                        var isExitPromo = json.isExitPromo;
                        if (isExitPromo){
                            window.top.topPage.showConfirmMessage( window.top.message.content['add.new.promoFloatPic'] , function( bol ){
                                if(bol){
                                    window.top.topPage.doPageFunction(e,previewFloatPic,opt);
                                }else{
                                    $(e.currentTarget).unlock();
                                }
                            });
                        }
                    }
                });
            }
            $("#ctt_float_pic_item_div").remove();
            //select.disable('.middle-img-list [name="cttFloatPicTempVo.result.middle1ImgLinkType"]:first');
            //$('.middle-img-list input[name="cttFloatPicTempVo.result.middle1ImgLinkValue"]:first').prop('disabled', true);
            return true;
        },

        /**
         * 添加自定义模板
         * @param e
         */
        addMiddleImage: function (e) {
            try {
                var maxCount = 10;
                var $addLi = $(e.currentTarget).parent();
                var imgCount = $($addLi).siblings('li:visible').length;
                if (imgCount >= maxCount) {
                    var msg = window.top.message.content['float.addPictureCount'];
                    if (msg) {
                        msg = msg.replace("{count}", maxCount);
                    }
                    window.top.topPage.showWarningMessage(msg);
                    $(e.currentTarget).unlock();
                    return;
                }
                var imgIndex = imgCount;
                var newContent = $("#ctt_float_pic_item").clone();
                //var newContent = $($addLi).siblings('li:first').clone();
                $(newContent).removeAttr('id');
                $(newContent).find('span:first').text(imgIndex + 1);

                var $image = $(newContent).find("div.normalEffectDiv");
                var $fileInput = $image.find('input:first');
                var targetText = $fileInput.attr('target');
                targetText = targetText.replace('1', imgIndex);
                $fileInput.attr('target', targetText);
                var $imageInput = $image.find('input:eq(1)');
                $imageInput.removeAttr('disabled');
                $imageInput.attr('name', targetText);

                var dotIdx = targetText.indexOf(".") + 1;
                var $imageWidth = $image.find('input:eq(2)');
                var imageWidthName = targetText.substring(0, dotIdx) + "imgWidth";
                $imageWidth.attr('name', imageWidthName);

                var $imageHeight = $image.find('input:eq(3)');
                var imageHeightName = targetText.substring(0, dotIdx) + "imgHeight";
                $imageHeight.attr('name', imageHeightName);

                var $image1 = $(newContent).find("div.mouseInEffectDiv");
                var $fileInput1 = $image1.find('input:first');
                var targetText1 = $fileInput1.attr('target');
                targetText1 = targetText1.replace('1', imgIndex);
                $fileInput1.attr('target', targetText1);
                var $imageInput1 = $image1.find('input:eq(1)');
                $imageInput1.removeAttr('disabled');
                $imageInput1.attr('name', targetText1);

                var $linkTypeSelect = $(newContent).find('[selectdiv]:first');
                var nameText = $linkTypeSelect.attr('selectdiv');
                nameText = nameText.replace('1', imgIndex);
                $linkTypeSelect.attr('selectdiv', nameText);
                $linkTypeSelect.find('input[type=hidden]:first').attr('name', nameText);

                var $linkTypeValue = $(newContent).find('input:last');
                var linkTypeValueText = $linkTypeValue.attr('name');
                linkTypeValueText = linkTypeValueText.replace('1', imgIndex);
                $linkTypeValue.attr('name', linkTypeValueText);
                //

                $($addLi).before(newContent);

                this._initFile($('[type=file]', newContent));
                this.initSelectEvent();
                this.initEditTagsEvent();
            } catch (e) {

            }

            $(e.currentTarget).unlock();

        },

        /**
         * 移除新增的中部图片
         * @param e
         */
        removeAddOne: function (e) {
            var length = $('#float_template_list_div li:visible', this.formSelector).length;
            if (length == 2) {
                var msg = window.top.message.content['float.canNotDeleteLastOne'];
                window.top.topPage.showWarningMessage(msg);
                $(e.currentTarget).unlock();
                return;
            }

            $(e.currentTarget).parents('li').remove();
            length = $('#float_template_list_div li:visible', this.formSelector).length;
            //reindex name
            $('#float_template_list_div li:visible', this.formSelector).each(function (imgIndex, ele) {
                //imgIndex++;
                if (imgIndex + 1 < length) {
                    $(ele).find('span:first').text(imgIndex + 1);
                    var $image = $(ele).find("div.normalEffectDiv");
                    var $fileInput = $image.find('[type=file]');
                    var targetText = $fileInput.attr('target');
                    targetText = targetText.replace(/\d/, imgIndex);
                    $fileInput.attr('target', targetText);
                    $image.find('input:eq(1)').attr('name', targetText);

                    var dotIdx = targetText.indexOf(".") + 1;
                    var imageWidthName = targetText.substring(0, dotIdx) + "imgWidth";
                    var imageHeightName = targetText.substring(0, dotIdx) + "imgHeight";
                    $image.find('input:eq(2)').attr('name', imageWidthName);
                    $image.find('input:eq(3)').attr('name', imageHeightName);


                    var $image1 = $(ele).find("div.mouseInEffectDiv");
                    var $fileInput1 = $image1.find('[type=file]');
                    var targetText1 = $fileInput1.attr('target');
                    targetText1 = targetText1.replace(/\d/, imgIndex);
                    $fileInput1.attr('target', targetText1);
                    $image1.find('input:eq(1)').attr('name', targetText1);

                    var $linkTypeSelect = $(ele).find('[selectdiv]:first');
                    var nameText = $linkTypeSelect.attr('selectdiv');
                    nameText = nameText.replace(/\d/, imgIndex);
                    $linkTypeSelect.attr('selectdiv', nameText);
                    $linkTypeSelect.find('input[type=hidden]:first').attr('name', nameText);

                    var $linkTypeValue = $(ele).find('input:last');
                    var linkTypeValueText = $linkTypeValue.attr('name');
                    linkTypeValueText = linkTypeValueText.replace(/\d/, imgIndex);
                    $linkTypeValue.attr('name', linkTypeValueText);
                }

            });
            $(e.currentTarget).unlock();
        },

        _initFile: function ($ele) {
            var _this = this;
            var oldWidth;
            var oldHeight;
            //file upload plugin
            this.unInitFileInput($ele)
                .fileinput({
                    showUpload: false,
                    maxFileCount: 1,
                    maxFileSize: 1024,
                    mainClass: "input-group",
                    removeLabel: window.top.message.content['floatPic.file.upload.remove'],
                    browseLabel: window.top.message.content['floatPic.file.upload.browse'] + '&hellip;',
                    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
                    msgInvalidFileExtension: window.top.message.content['floatPic.file.upload.msgInvalidFileExtension'],
                    msgValidationError: window.top.message.content['floatPic.file.upload.msgValidationError'],
                    msgSizeTooLarge: window.top.message.content['floatPic.file.upload.msgSizeTooLarge']
                });

            $ele.bind("filecleared", function (e) {
                _this.setImageSize(e, _this.oldWidth, _this.oldHeight);
                e.fileInput.$container.prev().show();

            }).bind("fileloaded", function (e) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#imgSize").attr('src', e.target.result);
                }
                reader.readAsDataURL(e.fileInput.$element[0].files[0]);
                $("#imgSize").unbind("load");
                $("#imgSize").load(function () {
                    _this.setImageSize(e, this.width, this.height);
                });

                e.fileInput.$container.prev().hide();
            });
        },

        previewFloatPic: function (e, opt) {
            $(e.currentTarget).unlock();
            var _this = this;
            var data = _this.getCurrentFormData(e);
            window.top.topPage.ajax({
                url: root + '/cttFloatPic/previewFloatPic.html',
                data: data,
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#editContent").addClass("hide");
                    $("#editForm").append(data);
                    $("#returnBtn").addClass("hide");
                    $("#preReturn").removeClass("hide");
                    $("#areamap").click();
                }
            });
            $(e.currentTarget).unlock();
        },

        initPreviewFLoatPic: function () {
            $(this.formSelector).on('mouseover', '.listModeTemplateImageType', function () {
                var overImg = $(this).attr("mouseoverimage");
                $(this).attr("src", overImg);
            });
            $(this.formSelector).on('mouseout', '.listModeTemplateImageType', function () {
                var normalImg = $(this).attr("normalEffect");
                $(this).attr("src", normalImg);
            });
        },

        returnEdit: function (e, opt) {
            $("#editContent").removeClass("hide");
            $("#returnBtn").removeClass("hide");
            $("#previewImgDiv").remove();
            $("#preReturn").addClass("hide");
            $(e.currentTarget).unlock();
        },

        setImageSize: function (e, width, height) {
            var $fileInput = $(e.target);
            var targetText = $fileInput.attr("target");
            if (targetText.indexOf("normalEffect") > -1) {
                var dotIdx = targetText.indexOf(".") + 1;
                var imageWidthName = targetText.substring(0, dotIdx) + "imgWidth";
                var imageHeightName = targetText.substring(0, dotIdx) + "imgHeight";
                if (width != null && width != "" && height != null && height != "") {
                    this.oldWidth = $("[name='" + imageWidthName + "']").val();
                    this.oldHeight = $("[name='" + imageHeightName + "']").val();
                }
                $("[name='" + imageWidthName + "']").val(width);
                $("[name='" + imageHeightName + "']").val(height);
            }
        },

        /**
         * 链接地址添加占位符
         *
         * @param e
         */
        initEditTagsEvent:function(e){
            $("._editTags a").off("click");
            $("._editTags a").on("click",function(e){
                var $tag = '$'+$(this).children().text();
                var obj = $(e.currentTarget).parent().prev();
                var startPos =  obj[0].selectionStart;
                var endPos =  obj[0].selectionEnd;
                var restoreTop = obj[0].scrollTop;
                var newValue= obj.val().substring(0, startPos) + $tag + obj.val().substring(endPos, obj.val().length);
                $(obj).val(newValue);
            })
        },

        /**
         * 切换下拉选项,显示相应表单
         *
         * @param e
         */
        changeSelect:function (e) {
            var key = e.key;
            var v = '';
            if (key == 'link') {
                $(".content_float_pic_image_service_value").addClass("hide");
                $("#content_float_pic_type_custom_service_setting_link").addClass("hide");
                $("#content_float_pic_type_http").removeClass("hide");
                $("[name=imgLinkTypeValue]").removeClass("hide");
                $("[name=placeholder]").removeClass("hide");
                v = $("[name='imgLinkTypeValue']").val();
                $("[name='floatPicItem.imgLinkValue']").val(v);
            } else {
                $("#content_float_pic_type_custom_service_setting_link").removeClass("hide");
                $(".content_float_pic_image_service_value").removeClass("hide");
                $("#content_float_pic_type_http").addClass("hide");
                $("[name=imgLinkTypeValue]").addClass("hide");
                $("[name=placeholder]").addClass("hide");
                v = $("[name='imgServiceValue']").val();
                $("[name='floatPicItem.imgLinkValue']").val(v);
            }
        }

    });
});