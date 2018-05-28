define(['common/BaseEditPage','bootstrapswitch', 'UE.I18N.' + window.top.language], function(BaseEditPage) {
    var _this = this;
    return BaseEditPage.extend({
        _editor:null,
        maxRange: 30,
        ue:[],
        /**
         * 初始化及构造函数，在子类中采用
         * this._super();
         * 调用
         */
        init: function () {
            this.formSelector = " #mainFrame  #viewSiteBasicForm";
            this._super();
            $(".tab-content > .tab-pane").css("display","block");
        },

        /**
         * 页面加载事件函数
         */
        onPageLoad: function () {
            var _this = this;
            this._super();
            this.cdnSwitch();

            $(".contents_textarea", _this.formSelector).each(function (idx, item) {
                _this.initUEditor(idx);
            });
            setTimeout(function () {
                $("#oldContent").val(_this.getCurrentContent());
            },1000)
            $(":radio[name='result.contentType']").on('change', function (e) {
                _this._switchDisplay();
            });
        },

        /**
         * 当前对象事件初始化函数
         */
        bindEvent: function () {
            var _this = this;
            this._super();
            $("#cdnUrlSelected").change(function () {
                _this.selectValue();
            });

            //切换语言
            $(this.formSelector).on("click","a[name='tag']", function () {
                var oldIdx=Number($(".current").attr("tagIndex"));
                $("a[name='tag']").removeClass("current");
                $(this).addClass("current");
                var local=$(this).attr('local');
                $(".ann").hide();
                $(".content"+local).show();

                var tagIndex = $(this).attr("tagIndex");
                var langSize=Number($("[name='langSize']").val());
                if(oldIdx<tagIndex){
                    $(".previous_lang").removeClass("hide");
                    if(tagIndex == langSize){
                        $(".next_lang").addClass("hide");
                        //$(".preview").removeClass("hide");
                        _this.checkForNext();
                    }else{
                        $(".next_lang").removeClass("hide");
                    }
                }else if(oldIdx>tagIndex){
                    $(".preview").addClass("hide");
                    $(".next_lang").removeClass("hide");
                    if(tagIndex==1){
                        $(".previous_lang").addClass("hide");
                    }
                }
            });

            //复制语系
            $(this.formSelector).on("click",".copy", function () {
                var sourceLocal=$(this).attr("local");
                var sourceId = $(".siteMaintain"+sourceLocal).attr("id");
                var targetLocal=$(".current").attr("local");
                var targetId = $(".siteMaintain"+targetLocal).attr("id");
                UE.getEditor(targetId).setContent(UE.getEditor(sourceId).getContent());
            });
        },

        /**
         * 站点维护文案预览
         */
        previewSiteMaintainTipData: function (e, opt) {
            var tips = $("textarea", "#siteMaintainTipsDiv");
            var lan  = $("input[name='mainLanguage']", "#siteMaintainTipsDiv").val();
            if ($(".siteMaintain" + lan)) {
                var targetId = $(".siteMaintain" + lan).attr("id");
                return UE.getEditor(targetId).getContent();
            } else {
                var targetId = $(tips[0]).attr("id");
                return UE.getEditor(targetId).getContent();
            }
        },

        getCurrentContent: function () {
            var contents= "";
            $(":input").each(function(index,obj){
                if($(obj).attr("name")!="oldContent"){
                    var string = $(obj).attr("name")+":"+$(obj).val().trim()+",";
                    contents += string;
                }

            });
            $(":file").each(function(index,obj){
                var string = $(obj).attr("name")+":"+$(obj).val().trim()+",";
                contents += string;
            });
            return contents;
        },

        checkForNext: function () {
            var checkContent = true;
            $(".contentSource").each(function(){
                if($(this).val() == ""){
                    checkContent = false;
                    return;
                }
            });
            if (checkContent) {
                var oldIdx = Number($(".current").attr("tagIndex"));
                var langSize = Number($("[name='langSize']").val());
                if (oldIdx == langSize) {
                    $(".preview").removeClass("hide");
                }
            } else {
                $(".preview").addClass("hide");
            }
        },

        /**
         * cdn开关
         */
        cdnSwitch:function () {
            var _this = this;
            var $bootstrapSwitch = $('input[type=checkbox][name=my-checkbox]');
            this.unInitSwitch($bootstrapSwitch)
                .bootstrapSwitch({
                    onText: window.top.message.content['floatPic.dislpay.on'],
                    offText: window.top.message.content['floatPic.display.off'],
                    onSwitchChange: function (e, state) {
                        var $this = $(this);
                        var _target = e.currentTarget;
                        // $this.bootstrapSwitch('indeterminate', true);
                        if (!$(_target).attr("isChanged")) {
                            $("#cdnSwitchState").val(state);
                        }else {
                            $(_target).removeAttr("isChanged");
                            return false;
                        }
                    }
                });
        },

        selectValue:function () {
            var cdnUrlValue=$("#cdnUrlSelected").val();
            $("#cdnUrlValue").val(cdnUrlValue);
        },

        /**
         * 更新cdn url和开关
         */
        updateCdnParam:function (e) {
            var _this=this;
            //开关参数
            var id = $("#cdnSwitch").attr("sysParamId");
            var module = $("#cdnSwitch").attr("module");
            var paramType = $("#cdnSwitch").attr("paramType");
            var siteId = $("#siteId").val();
            var paramCode=$("#cdnSwitch").attr("paramCode");
            var state = $("#cdnSwitchState").val();
            var paramValue= state;

            //url参数
            var url_siteId = $("#siteId").val();
            var url_id = $("#cdnUrlValue").attr("sysParamId");
            var url_module = $("#cdnUrlValue").attr("module");
            var url_paramType = $("#cdnUrlValue").attr("paramType");
            var url_paramCode=$("#cdnUrlValue").attr("paramCode");
            var url_paramValue= $("#cdnUrlValue").val();
            var cdnSwitchState=$("#cdnSwitchState").val();
            if (cdnSwitchState=='true'){
                if (url_paramValue==null||url_paramValue==""){
                    page.showPopover(e,{},"warning","CDN URL不能为空",true);
                    $(e.currentTarget).unlock();
                    return;
                }
            }
            window.top.topPage.ajax({
                url: root + '/site/detail/updateCdnParam.html',
                dataType: "json",
                data: {
                    "search.siteId": siteId,
                    "search.id": id,
                    "search.paramCode": paramCode,
                    "search.module": module,
                    "search.paramType": paramType,
                    "search.paramValue": paramValue,
                    "result.siteId": url_siteId,
                    "result.id": url_id,
                    "result.paramCode": url_paramCode,
                    "result.module": url_module,
                    "result.paramType": url_paramType,
                    "result.paramValue": url_paramValue
                },
                success: function (data) {
                    if (data.state) {
                        page.showPopover(e,{},"success","保存成功",true);
                    } else {
                        page.showPopover(e,{},"warning","保存失败",true);
                    }
                    $(e.currentTarget).unlock();
                },error:function () {
                    $(e.currentTarget).unlock();
                }

            });
            $(e.currentTarget).unlock();
        },

        /**
         * 图片、文字模式切换
         * @private
         */
        _switchDisplay: function () {
            var _this = this;
            var contentType = $(":radio[name='result.contentType']:checked").val();
            //图片
            if(contentType == '1'){
                $(".content_picture_title").removeClass("hide");//圖片模式標題去掉hide
                $(".content_picture").removeClass("hide");//圖片模式图片去掉hide
                $("#content_picture_link").removeClass("hide");
                $(".content_word_title").addClass("hide");
                $(".content_word").addClass("hide");//显示效果添加hide
            }else {
                $("#content_picture_link").addClass("hide");//图片链接添加hide
                $(".content_picture_title").addClass("hide");//文字模式圖片名称添加hide
                $(".content_word_title").removeClass("hide");//文字模式內容去掉hide
                $(".content_picture").addClass("hide");
                $(".content_word").removeClass("hide");
            }
            _this.resizeDialog();
        },

        /**
         *
         * 初始化富文本框
         */
        initUEditor: function (idx) {
            var that = this;
            UE.delEditor('editContent' + idx);
            var width = $("#editContent" + idx).width;
            that.ue[idx] = UE.getEditor('editContent' + idx, {
                enableAutoSave: false, /*是否自动保存*/
                initialFrameWidth: width, /*初始化编辑器宽度($(window.document).width() *.8)*/
                initialFrameHeight: 200, /*初始化编辑器宽度*/
                autoHeightEnabled: false, /*是否自动长高*/
                maximumWords: 2000,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'link', 'unlink'

                ]]
            });
        }
    });
});