define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({

        langObj:{},
        $currentLang:$(".lang.current"),
        cttListJson : $("#cttListJson").html(),
        init : function() {
            this._super();
            var _this = this;
            $("#editContent").attr("maxlength", 200);
            /*if (!!_this.cttListJson) {
                var _jsonAry = eval("("+_this.cttListJson+")");
                !!_jsonAry&&$.each(_jsonAry,function (index,obj) {
                    _this.langObj[obj.language] = {'content':obj.content};
                });
            }*/
        },

        /**多新增100组图片；
         * 页面加载和异步加载时需要重新初始化的工作
         */
        onPageLoad: function () {
            this._super();
            var _this = this;

            if (!!_this.cttListJson) {
                var _jsonAry = eval("("+_this.cttListJson+")");
                !!_jsonAry&&$.each(_jsonAry,function (index,obj) {
                    _this.langObj[obj.language] = {'content':obj.content};
                });
            }

            for (var i=0;i<languageCounts;i++) {
                var locale = eval('('+$('.locale'+i).attr('data-rel')+')').post;
                if (_this.isEmptyObject(_this.langObj) || (_this.langObj[locale]&&!_this.langObj[locale].hasOwnProperty("content"))) {
                    $("li[lang-code="+locale+"]").addClass("hide");
                } else {
                    if (_this.langObj[locale]&&_this.langObj[locale].content && $('.locale'+i)&&$('.locale'+i).hasClass("current")) {
                        $("li[lang-code="+locale+"]").addClass("hide");
                    }

                }
            }

            /*复制语系*/
            $('#copy_lang li').on("click",function(){
                // 语言代码
                var currentCode = $(this).attr("lang-code");
                // 标题内容只有有值的时候赋值
                _this.langObj[currentCode].content && _this.setSendContent(_this.langObj[currentCode].content);
                _this.changeEditStatus(_this.langObj[currentCode].content,false);
            });
        },

        bindEvent : function() {
            var _this = this;
            this._super();
            /*标题改变时 改为已编辑*/
            $("#editContent").on("keyup",function(){
                _this.changeEditStatus($("#editContent").val(),true);
                var locale = eval('('+$('.lang.current').attr('data-rel')+')').post;
                $("var.word").text(_this.langObj[locale].content.length);
            });
        },

        /**
         * 改变语言标签 编辑状态
         * @param obj
         */
        changeEditStatus:function(content,isRefresh){
            var $editStatusDom =  this.$currentLang.find('span');
            if (content.trim()==''){
                if (this.$currentLang) {
                    $editStatusDom.text(this.$currentLang.find("span:first").attr("data-editting-title"));
                } else {
                    $editStatusDom.addClass("unedited");
                    $editStatusDom.text(this.$currentLang.find("span:first").attr("data-unedit-title"));
                }
            } else if (content.trim()!='' && this.$currentLang.find("span:first")){
                $editStatusDom.text(this.$currentLang.find("span:first").attr("data-editting-title"));
            } else {
                $editStatusDom.text($editStatusDom.attr("data-edited-title")).removeClass("unedited");
            }

            if (isRefresh) {
                this.refreshLangObj(content,eval('('+$(".lang.current").attr('data-rel')+')').post);
            }
        },

        /**
         * 更改语言选项
         * @param e
         * @param p
         */
        changeLang:function(e,p){
            var _this = this;
            /*按钮 jquery对象*/
            var $currentLang = $(".lang.current");
            var $this_btn = this.$currentLang = $(e.currentTarget);

            /*当前语言个数*/
            var langLen = Number($("#langLen").val());
            /*同胞移除 选中class*/
            $this_btn.siblings().removeClass('current');
            /*添加选中class*/
            $this_btn.addClass('current');

            $this_btn.find("span:first").text($this_btn.find("span:first").attr('data-editting-title'));

            $this_btn.unlock();
            // 事件对象、标题内容，信息内容，语言
            this.afterChangeLang($currentLang,this.getSendContent(),eval('('+$this_btn.attr('data-rel')+')').post);
        },

        /**
         * 切换下一个语言 假分页
         * @param e
         * @param p
         */
        changeCurrentLang:function(e,p){

            try{
                var $this_btn = $(e.currentTarget);
                /*选择器范围*/
                var thisFormSelector = this.formSelector;
                /*当前选中的语言*/
                var $currentLang = this.$currentLang = $(".lang.current");
                /*当前语言个数*/
                var langLen = Number($("#langLen").val());
                /*一次最多显示语言数量*/
                var maxLang = $('#maxLang').val();
                /*移除当前选中的效果*/
                $currentLang.removeClass('current');
                this.changeEditStatus(this.getSendContent(),false);
                /*下一步/下一个 */
                if($this_btn.hasClass('next_lang')){

                    /*下一个选中语言的下标*/
                    var next = $currentLang.next(thisFormSelector  + " .lang").index() < 0 ?0:$currentLang.next(thisFormSelector +" .lang").index();
                    /*下一个选中的语言*/
                    var $next = $(thisFormSelector +' .lang').eq(next);
                    /*下一步*/
                    if($this_btn.hasClass('next_step')){
                        /*下一个是最后一个*/
                    }else{
                        /*下一个*/
                        $next.addClass("cuttent");
                    }
                    /*切换： 最后一个 或者 每页最后一个需要 切换*/
                    if(next===0||next%maxLang ===0){
                        /*隐藏所有语言*/
                        $(".lang").addClass('hide');
                        /*显示下一个语言直到fenge*/
                        $next.removeClass('hide').nextUntil('.fenge').removeClass('hide').next().removeClass('hide');
                    }
                    /*添加 下一个 选中效果*/
                    $next.addClass('current');

                }else{
                    /*上一步*/
                    /*上一个选中语言的下标 (不会为第一个)*/
                    var previous = $currentLang.prev(thisFormSelector + ' .lang').index();
                    var $previous = $(thisFormSelector +' .lang').eq(previous);

                    $previous.addClass("current");

                }
                this.afterChangeLang($currentLang,this.getSendContent(),eval('('+$('.lang.current').attr('data-rel')+')').post);
            }finally{
                $(e.currentTarget).unlock();
            }
        },

        /**
         * 改变语言后
         * @param obj 对应语言对象
         * @param content 内容
         * @param currentCode 当前需要回显的语言code
         */
        afterChangeLang: function (obj,content,currentCode) {
            /*将当前输入 放入对象中*/
            var that = this;
            var $obj = $(obj);
            var $obj_span = $obj.find("span");
            var $option = eval("("+$obj.attr('data-rel')+")");
            var code = $option.post;
            var text = $option.dataType;

            /*复制语系ul*/
            var $copeLang = $("#copy_lang");
            /*将当前 编辑的放置到对象中*/
            that.langObj[code] = {content:content};
            /*回显*/
            if(currentCode){
                if(that.langObj[currentCode]){
                    that.setSendContent(this.langObj[currentCode].content);
                    $("var.word").text(this.langObj[currentCode].content.length);
                }else{
                    that.setSendContent('');
                    $("var.word").text(0);
                }
            }
            //改变编辑状态 将正在编辑改为 已编辑
            if(content){
                $obj_span.text($obj_span.attr('data-edited-title'));
                /*添加到复制语系中*/
                /*if(!$copeLang.find("li[lang-code='"+code+"']").attr('lang-code')){
                    var $li = $('<li class="temp"><a href="javascript:void(0)" class="co-gray"></a></li>');
                    $li.attr("lang-code",code).find('a').text(text);
                    // 解决下拉不断动态加载的问题 chosen:updated
                    $("#copy_lang").append($li).trigger("chosen:updated");
                    that.onPageLoad();
                }*/
            } else {
                $obj_span.text($obj_span.attr('data-unedit-title'));
            }

            $(".lang").each(function(item,obj) {
                var locale = eval("("+$(".locale"+item).attr('data-rel')+")").post;
                if ($(".locale"+item).find("span").text().trim() == $obj_span.attr('data-edited-title')) {
                    if (currentCode == locale) {
                        $("li[lang-code="+locale+"]").addClass("hide");
                    } else {
                        $("li[lang-code="+locale+"]").removeClass("hide");
                    }
                } else {
                    $("li[lang-code="+locale+"]").addClass("hide");
                }
            });
        },
        /**
         * 获取内容
         */
        getSendContent:function(){
            return $("#editContent").val().trim();
        },
        /**
         * 设置内容
         * @param val
         */
        setSendContent:function(val){
            $("#editContent").val(val);
        },

        saveCttText:function(e,option) {
            var _this = this;
            var _langAry = [];
            for(var p in _this.langObj) {
                var innerObj = {};
                innerObj['lang'] = p;
                innerObj['content']= _this.langObj[p]['content'];
                _langAry.push(innerObj);
            }
            var token = $("[name=gb\\.token]").val();
            window.top.topPage.ajax({
                type:"POST",
                url:root+'/cttMaterialText/saveCttText.html',
                data:{'search.langAry':JSON.stringify(_langAry),'search.groupCode':$("[name='groupCode']").val(),'gb.token':token},
                dataType:"JSON",
                error:function(data){
                    window.top.topPage.showErrorMessage(data.msg);
                    $(e.currentTarget).unlock();
                },
                success:function(data){
                    if(data.state){
                        window.top.topPage.showSuccessMessage(data.msg,function(result){
                            _this.returnValue = true;
                            _this.closePage();
                        });
                    }else{
                        window.top.topPage.showWarningMessage(data.msg,function(result){
                            _this.closePage();
                        });
                    }
                }
            });
        },

        /**
         * 保存或更新前验证
         * @param e   事件对象
         * @return 验证是否通过
         */
        _validateForm: function(e) {
            var _this = this;
            var len = 0;
            for(var p in _this.langObj) {
                if (_this.langObj[p].content)
                    len++;
            }
            if (len<$('.lang').length) {
                window.top.topPage.showWarningMessage(window.top.message.content['all.lang.edit']);
                return false;
            }

            var $form = $(window.top.topPage.getCurrentForm(e));
            return !$form.valid || $form.valid();
        },

        /**
         * 刷新内容,即使不切换语言情况下
         * @param content
         * @param currentCode
         */
        refreshLangObj:function(content,currentCode) {
            this.langObj[currentCode] = {'content':content.trim()};
        },

        isEmptyObject: function (obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        }

    });
});