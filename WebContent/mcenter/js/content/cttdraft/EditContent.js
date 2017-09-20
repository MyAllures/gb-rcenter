define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {
    var that;
    return BaseEditPage.extend({
        ue:null,
        langObj:{},
        sendType:null,
        $currentLang:$(".lang.current"),
        languageJson :null,
        init: function () {
            this._super();
        },
        bindEvent:function(){
            that = this;
            this._super();
            $(this.formSelector).on("click",".lang", function () {
                that.changeCurrent($(this));
            });

            //恢复默认
            $(this.formSelector).on("click","#hfmr",function(){
                var $lang = $(".lang.current");
                var language = $lang.attr("lname");
                var defaultContent = that.langObj[language].defaultContent;
                that.langObj[language].content=defaultContent;
                that.setSendContent(defaultContent);
            });
        },
        onPageLoad:function(){
            this.initUEditor();
            var _this = this;
            _this.languageJson=$("#languageJson").html();
            if (_this.languageJson) {
                var _jsonAry = eval("("+_this.languageJson+")");
                _jsonAry&&$.each(_jsonAry,function (index,obj) {
                    _this.langObj[obj.language] = {'id':obj.id,'content':obj.content,'title':obj.title,'defaultContent':obj.defaultContent};
                });
            }
            /*复制语系*/
            /*$('#copy_lang li').on("click",function(){
                var currentCode = $(this).attr("lang-code");
                that.langObj[currentCode].content && that.setSendContent(that.langObj[currentCode].content);
                that.langObj[currentCode].title && $("#title").val(that.langObj[currentCode].title);
            });*/
        },

        changeCurrent:function(newOb){
            var $lang = $(".lang.current");
            var old_language = $lang.attr("lname");
            var new_language = newOb.attr("lname");
            var lnum = newOb.attr("lnum");
            var langNum = $("#langNum").val();
            $lang.removeClass('current');
            newOb.addClass("current");
            var old_content = that.getSendContent();
            var new_content = that.langObj[new_language].content;
            that.langObj[old_language].content=old_content;
            that.setSendContent(new_content);

            newOb.find("t").html(" 编辑中");
            if(old_content!=null && $.trim(old_content)!=''){
                $lang.find("t").html(" 已编辑");
            }else{
                $lang.find("t").html(" 未编辑");
            }

            //第一个
            if(lnum==1){
                $(that.formSelector + ' .previous_lang').addClass("hide");
                $(that.formSelector + ' .next_step').removeClass("hide");
                $(that.formSelector + ' .preview').addClass("hide");
            }else if(lnum==langNum){
                $(that.formSelector + ' .previous_lang').removeClass("hide");
                $(that.formSelector + ' .next_step').addClass("hide");
                $(that.formSelector + ' .preview').removeClass("hide");
            }else{
                $(that.formSelector + ' .previous_lang').removeClass("hide");
                $(that.formSelector + ' .next_step').removeClass("hide");
                $(that.formSelector + ' .preview').addClass("hide");
            }
        },
        /**
         * 初始化 ueditor
         */
        initUEditor:function(){
            var that = this;

            UE.delEditor('editContent');
            this.ue = UE.getEditor('editContent',{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:($(window.document).width() *.9),/*初始化编辑器宽度*/
                initialFrameHeight:200,/*初始化编辑器宽度*/
                autoHeightEnabled:false/*是否自动长高*/
            });
            /*contentChange*/
           /* this.ue.addListener( 'contentChange', function( editor ) {
                if(that.ue.getContentTxt().trim()){
                    that.changeEditStatus();
                }
                if(that.ue.hasContents()){
                    that.changeEditStatus();
                }
            });
            this.ue.ready(function(){

                that.resizeDialog()
            })*/
        },
        /**
         * 获取内容
         */
        getSendContent:function(){
            if(this.ue){
                return this.ue.getContent();
            }else{
                return $("#editContent").val();
            }
        },
        /**
         * 设置内容
         * @param val
         */
        setSendContent:function(val){
            if(this.ue){
                this.ue.setContent(val);
            }else{
                $("#editContent").val(val);
            }
        },
        changeCurrentLang:function(e,p){
            var $lang = $(".lang.current");
            var $this_btn = $(e.currentTarget);
            //下一个
            if($this_btn.hasClass('next_step')){
                var newob = $lang.parent().next().find("a");
                that.changeCurrent(newob);
            }else{//上一个
                var newob = $lang.parent().prev().find("a");
                that.changeCurrent(newob);
            }
            $(e.currentTarget).unlock();
        }

        /*
        /!**
         * 更改语言选项
         * @param e
         * @param p
         *!/
        changeLang:function(e,option){
            /!*按钮 jquery对象*!/
            var $currentLang = $(".lang.current");
            var $this_btn = this.$currentLang = $(e.currentTarget);
            var local = option.post;
            /!*当前语言个数*!/
            var langLen = Number($("#langLen").val());
            /!*同胞移除 选中class*!/
            $currentLang.removeClass('current');
            /!*添加选中class*!/
            $this_btn.addClass('current');
            $this_btn.unlock();
            // 事件对象、标题内容，信息内容，语言
            this.afterChangeLang($currentLang,this.getSendContent(),eval('('+$this_btn.attr('data-rel')+')').post);
        },
        /!**
         * 改变语言后
         * @param obj 对应语言对象
         * @param title 标题
         * @param content 内容
         * @param currentCode 当前需要回显的语言code
         *!/
        afterChangeLang: function (obj,content,currentCode) {
            /!*将当前输入 放入对象中*!/
            var that = this;
            var $obj = $(obj);
            var $obj_span = $obj.find("span");
            var $option = eval("("+$obj.attr('data-rel')+")");
            var code = $option.post;
            var text = $option.dataType;

            /!*复制语系ul*!/
            var $copeLang = $("#copy_lang");
            /!*将当前 编辑的放置到对象中*!/
            that.langObj[code] = {content:content};
            /!*回显*!/
            if(currentCode){
                if(that.langObj[currentCode]){
                    that.setSendContent(this.langObj[currentCode].content);
                }else{
                    that.setSendContent('');
                }
            }
            /!*!//改变编辑状态 将正在编辑改为 已编辑
            if($obj_span.attr('data-editting-title') === $obj_span.text().trim()){
                $obj_span.text($obj_span.attr('data-edited-title'));
                /!*添加到复制语系中*!/
                if(!$copeLang.find("li[lang-code='"+code+"']").attr('lang-code')){
                    var $li = $('<li class="temp"><a href="javascript:void(0)" class="co-gray"></a></li>');
                    $li.attr("lang-code",code).find('a').text(text);
                    // 解决下拉不断动态加载的问题 chosen:updated
                    $("#copy_lang").append($li).trigger("chosen:updated");
                    that.onPageLoad();
                }
            }*!/
        },
        changeEditStatus:function(){
            var $editStatusDom =  this.$currentLang.find('span.unedited');
            $editStatusDom.hasClass('unedited')&&$editStatusDom.text($editStatusDom.attr("data-editting-title")).removeClass("unedited");

        },
        /!**
         * 清除发送列表会员
         * @param e
         * @param p
         *!/
        eliminatePlayer:function(e,p){
            var $this_btn = $(e.currentTarget);
            var removeClass = $this_btn.parent().attr('data-delete');
            $("."+removeClass).remove();
            this.checkHasPlayer();
            $this_btn.parent().addClass("hide");
            this.resizeDialog();
            $this_btn.unlock();
        },
        /!**
         * 根据语言index 判断上一步 下一步 是否需要隐藏
         * @param currentIndex
         * @param langLen
         *!/
        changeCurrentLangHide:function(currentIndex,langLen){
            if( currentIndex=== langLen){
                $(this.formSelector + ' .next_step').addClass("hide");
                $(this.formSelector + ' .preview').removeClass("hide");
            }else if(currentIndex === 1){
                $(this.formSelector + ' .previous_lang').addClass("hide");
                $(this.formSelector + ' .next_step').removeClass("hide");
                $(this.formSelector + ' .preview').addClass("hide");
            }else{
                $(this.formSelector + ' .previous_lang').removeClass("hide");
                $(this.formSelector + ' .next_step').removeClass("hide");
                $(this.formSelector + ' .preview').addClass("hide");
            }
        },
        /!**
         * 切换下一个语言 假分页
         * @param e
         * @param p
         *!/
        changeCurrentLang:function(e,p){

            try{
                var $this_btn = $(e.currentTarget);
                /!*选择器范围*!/
                var thisFormSelector = this.formSelector;
                /!*当前选中的语言*!/
                var $currentLang = this.$currentLang = $(".lang.current");


                /!*当前语言个数*!/
                var langLen = Number($("#langLen").val());


                /!*一次最多显示语言数量*!/
                var maxLang = 1;//$('#maxLang').val();

                /!*移除当前选中的效果*!/
                $currentLang.removeClass('current');


                /!*下一步/下一个 *!/
                if($this_btn.hasClass('next_lang')){

                    /!*下一个选中语言的下标*!/
                    var next = $currentLang.next(thisFormSelector  + " .lang").index() < 0 ?0:$currentLang.next(thisFormSelector +" .lang").index();

                    /!*下一个选中的语言*!/
                    var $next = $(thisFormSelector +' .lang').eq(next);

                    /!*下一步*!/
                    if($this_btn.hasClass('next_step')){
                        /!*下一个是最后一个*!/

                    }else{
                        /!*下一个*!/
                        $next.addClass("cuttent");
                    }
                    this.changeCurrentLangHide(next+1,langLen);

                    /!*切换： 最后一个 或者 每页最后一个需要 切换*!/
                    if(next===0||next%maxLang ===0){
                        /!*隐藏所有语言*!/
                        //$(".lang").addClass('hide');

                        /!*显示下一个语言直到fenge*!/
                        $next.removeClass('hide').nextUntil('.fenge').removeClass('hide').next().removeClass('hide');
                    }


                    /!*添加 下一个 选中效果*!/
                    $next.addClass('current');

                }else{
                    /!*上一步*!/

                    /!*上一个选中语言的下标 (不会为第一个)*!/
                    var previous = $currentLang.prev(thisFormSelector + ' .lang').index();
                    this.changeCurrentLangHide(previous+1,langLen);
                    var $previous = $(thisFormSelector +' .lang').eq(previous);

                    $previous.addClass("current");

                }
                this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$('.lang.current').attr('data-rel')+')').post);
            }finally{
                $(e.currentTarget).unlock();
            }
        },
        /!**
         * 构造ajaxData
         * @param e
         * @param p
         *!/
        createData:function(e,p){

        },
        /!**
         * 改变语言后
         * @param obj 对应语言对象
         * @param title 标题
         * @param content 内容
         * @param currentCode 当前需要回显的语言code
         *!/
        afterChangeLang: function (obj,title,content,currentCode) {
            /!*将当前输入 放入对象中*!/
            var that = this;
            var $obj = $(obj);
            var $obj_span = $obj.find("span");
            var $option = eval("("+$obj.attr('data-rel')+")");
            var code = $option.post;
            var text = $option.dataType;

            /!*复制语系ul*!/
            var $copeLang = $("#copy_lang");


            /!*将当前 编辑的放置到对象中*!/
            that.langObj[code] = {title:title,content:content};
            /!*回显*!/
            if(currentCode){
                if(that.langObj[currentCode]){
                    that.setSendContent(this.langObj[currentCode].content);
                    $("#title").val(this.langObj[currentCode].title);
                }else{
                    $("#title").val('');
                    that.setSendContent('');
                }
            }
            //改变编辑状态 将正在编辑改为 已编辑
            if($obj_span.attr('data-editting-title') === $obj_span.text().trim()){
                $obj_span.text($obj_span.attr('data-edited-title'));
                /!*添加到复制语系中*!/
                if(!$copeLang.find("li[lang-code='"+code+"']").attr('lang-code')){
                    var $li = $('<li class="temp"><a href="javascript:void(0)" class="co-gray"></a></li>');
                    $li.attr("lang-code",code).find('a').text(text);
                    $("#copy_lang").append($li).trigger("chosen:updated");
                    that.onPageLoad();
                }
            }
        },
        /!**
         * 改变语言标签 编辑状态
         * @param obj
         *!/
        changeEditStatus:function(){

            var $editStatusDom =  this.$currentLang.find('span.unedited');
            $editStatusDom.hasClass('unedited')&&$editStatusDom.text($editStatusDom.attr("data-editting-title")).removeClass("unedited");

        },
        /!**
         * 获取内容
         *!/
        getSendContent:function(){
            if(this.ue){
                return this.ue.getContent();
            }else{
                return $("#editContent").val();
            }
        },
        /!**
         * 设置内容
         * @param val
         *!/
        setSendContent:function(val){
            if(this.ue){
                this.ue.setContent(val);
            }else{
                $("#editContent").val(val);
            }
        },
        /!**
         * 如果删掉 没有玩家就显示【请选择玩家】
         *!/
        checkHasPlayer:function(){
            if(!$('.sendPlayer').length){
                $("#none_send_player").removeClass('hide');
            }
        }*/
    })
});