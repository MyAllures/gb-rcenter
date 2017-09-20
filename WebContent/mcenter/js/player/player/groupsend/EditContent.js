/**
 * Created by cj on 15-7-8.
 */
define(['common/BaseEditPage', 'UE.I18N.'+window.top.language], function (BaseEditPage) {

    return BaseEditPage.extend({
        /*TODO Jeff 等待接口*/
        ue:null,
        langObj:{},
        noticeTmplJson:{},
        sendType:null,
        isPreview:false,
        $currentLang:$(".lang.current"),
        init: function () {
            this._super();
            //this.noticeTmplJson = eval('('+$("#noticeLocaleTmplJson").text()+')');
            //this.resizeDialog(); /
        },
        bindEvent:function(){
            this._super();
            var that = this;
            that.sendType = $("#sendType").val();
            /*标题改变时 改为已编辑*/
            $("#title").on("keyup",function(){
                if($(this).val().trim()){
                  //改变为已编辑
                    that.changeEditStatus();
                }
           });
            /*如果是站内信 就不初始化编辑器*/
            if(that.sendType === 'mail'){
                //$("#editContent").on()
                this.initUEditor()
            }else{

            }
        },
        onPageLoad:function(){
            this._super();
            var that = this;
            /*复制语系*/
            $('#copy_lang li').on("click",function(){
                var currentCode = $(this).attr("lang-code");
                that.langObj[currentCode].content && that.setSendContent(that.langObj[currentCode].content);
                that.langObj[currentCode].title && $("#title").val(that.langObj[currentCode].title);
            });
        },
        /**
         * 初始化 ueditor
         */
        initUEditor:function(){
            var that = this;
            this.ue = UE.getEditor('editContent',{
                enableAutoSave:false,/*是否自动保存*/
                initialFrameWidth:($(window.document).width() *.9),/*初始化编辑器宽度*/
                initialFrameHeight:200,/*初始化编辑器宽度*/
                autoHeightEnabled:false,/*是否自动长高*/
                autoFloatEnabled:false/*toolbar是否固定. 为false toolbar不跟随*/
            });
            /*contentChange*/
            this.ue.addListener( 'contentChange', function( editor ) {
                if(that.ue.getContentTxt().trim()){
                    that.changeEditStatus();
                }
                if(that.ue.hasContents()){
                    that.changeEditStatus();
                }
            });
            this.ue.ready(function(){
                that.resizeDialog()
            })
        },
        /**s
         * 删除单个会员
         * @param e
         * @param p
         */
        deletePlayer:function(e,p){
            var $thisBtn = $(e.target);
            $thisBtn.remove();
        },
        /**
         * 删除单个发送列表会员
         * @param e
         * @param p
         */
        removeThisPlayer: function (e,p) {
            $(e.currentTarget).parent().remove();
            this.checkHasPlayer();
        },
        /**
         * 清除发送列表会员
         * @param e
         * @param p
         */
        eliminatePlayer:function(e,p){
            var $this_btn = $(e.currentTarget);
            var removeClass = $this_btn.parent().attr('data-delete');
            $("."+removeClass).remove();
            this.checkHasPlayer();
            $this_btn.parent().addClass("hide");
            this.resizeDialog();
            $this_btn.unlock();
        },
        /**
         * 更改语言选项
         * @param e
         * @param p
         */
        changeLang:function(e,p){
            /*按钮 jquery对象*/
            var $currentLang = $(".lang.current");
            var $this_btn = this.$currentLang = $(e.currentTarget);

            /*当前语言个数*/
            var langLen = Number($("#langLen").val());

            /*当前下标*/
            var currentIndex = $this_btn.index()+1;

            /*同胞移除 选中class*/
            $this_btn.siblings().removeClass('current');
            /*添加选中class*/
            $this_btn.addClass('current');
            $this_btn.unlock();
            if(this.isPreview){
                this.previewChangeLang(e,p);
            }else{
                this.changeCurrentLangHide(currentIndex,langLen);
            }
            this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$this_btn.attr('data-rel')+')').post);
        },
        /**
         * 根据语言index 判断上一步 下一步 是否需要隐藏
         * @param currentIndex
         * @param langLen
         */
        changeCurrentLangHide:function(currentIndex,langLen){
            if( currentIndex=== langLen){
                $(this.formSelector + ' .next_step').addClass("hide");
                if(!this.isPreview) {
                    $(this.formSelector + ' .preview').removeClass("hide");
                }
            }else if(currentIndex === 1){
                $(this.formSelector + ' .previous_lang').addClass("hide");
                if(!this.isPreview){
                    $(this.formSelector + ' .next_step').removeClass("hide");
                }
                $(this.formSelector + ' .preview').addClass("hide");
            }else{
                if(!this.isPreview) {
                    $(this.formSelector + ' .previous_lang').removeClass("hide");
                    $(this.formSelector + ' .next_step').removeClass("hide");
                }
                $(this.formSelector + ' .preview').addClass("hide");
            }
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
                    this.changeCurrentLangHide(next+1,langLen);

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
                    this.changeCurrentLangHide(previous+1,langLen);
                    var $previous = $(thisFormSelector +' .lang').eq(previous);

                    $previous.addClass("current");

                }
                this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$('.lang.current').attr('data-rel')+')').post);
                if(this.isPreview){
                    this.previewChangeLang(e,p);
                }
            }finally{
                $(e.currentTarget).unlock();
            }
        },
        /**
         * 构造ajaxData
         * @param e
         * @param p
         */
        createData:function(e,p){

        },
        /**
         * 改变语言后
         * @param obj 对应语言对象
         * @param title 标题
         * @param content 内容
         * @param currentCode 当前需要回显的语言code
         */
        afterChangeLang: function (obj,title,content,currentCode) {
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
            that.langObj[code] = {title:title,content:content};
            /*回显*/
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
                /*添加到复制语系中*/
                if(!$copeLang.find("li[lang-code='"+code+"']").attr('lang-code')){
                    var $li = $('<li class="temp"><a href="javascript:void(0)" class="co-gray"></a></li>');
                    $li.attr("lang-code",code).find('a').text(text);
                    $("#copy_lang").append($li).trigger("chosen:updated");
                    that.onPageLoad();
                }
            }
        },
        /**
         * 改变语言标签 编辑状态
         * @param obj
         */
        changeEditStatus:function(){

           var $editStatusDom =  this.$currentLang.find('span.unedited');
            $editStatusDom.hasClass('unedited')&&$editStatusDom.text($editStatusDom.attr("data-editting-title")).removeClass("unedited");

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
        /**
         * 如果删掉 没有玩家就显示【请选择玩家】
         */
        checkHasPlayer:function(){
            if(!$('.sendPlayer').length){
                $("#none_send_player").removeClass('hide');
            }
        },
        insertVarTag:function(event,option){
            if(this.ue){
                this.ue.execCommand('insertHtml', option.value)
            }else{
                var $editContent = $("#editContent");
                var editContent = $editContent[0];
                var value = $editContent.val();
                var startPos =  editContent.selectionStart;
                var endPos =  editContent.selectionEnd;
                var restoreTop = editContent.scrollTop;
                var newValue= $editContent.val().substring(0, startPos) + option.value + $editContent.val().substring(endPos, $editContent.val().length);
                $editContent.val(newValue);
            }
            $(event.currentTarget).unlock();

        },
        changeTmpl:function( event , option ){
            var code = option.code;
            var tmpl = this.noticeTmplJson[code][0];
            $("#title").val(tmpl.title);
            this.setSendContent(tmpl.content);
            $(event.currentTarget).unlock();
        },
        /**
         * 预览
         * @param event
         * @param option
         */
        toPreview:function( event , option){
            $("._edit").addClass("hide");
            $("._preview").removeClass("hide");
            $(".backEdit").removeClass("hide");
            /*todo jeff 更新 最后一个语言的json*/
            var $currentLang = this.$currentLang = $(".lang.current");
            this.afterChangeLang($currentLang,$("#title").val(),this.getSendContent(),eval('('+$('.lang.current').attr('data-rel')+')').post);
            this.isPreview = true;
            this.previewChangeLang();
            this.resizeDialog();
            $(event.currentTarget).unlock();
        },
        backEdit: function (e, opt) {
            $(".backEdit").addClass("hide");
            $("._edit").removeClass("hide");
            $("._preview").addClass("hide");
            $(".next_step").addClass("hide");
            this.isPreview = false;
            this.resizeDialog();
            $(e.currentTarget).unlock();
            //$($(".lang")[0]).click();
        },
        /**
         * 预览时切换语言
         * @param e
         * @param option
         */
        previewChangeLang:function(e,option){
            if(!option||!option.post){
                option = eval('('+$(".lang.current").data().rel+')');
            }
            //option =  option || eval('('+$(".lang.current").data().rel+')');
            var obj = this.langObj[option.post];
            if(obj){
                var $_preview_content = $("._preview_content");
                $("._previre_title",$_preview_content).html(obj.title);
                $("._previre_content",$_preview_content).html(obj.content);
            }

        },
        send:function( event , option ){
            var that = this;
            var playerIds = [];
            $('.sendPlayer[data-id]').each(function(index,current){
                playerIds.push($(current).data().id);
            });
            window.top.topPage.ajax({
                url:root+"/player/groupSend/sendByType.html",
                data:{
                    "sendContent":that.langObj,
                    "ids":playerIds.join(','),
                    "sendType":$("#sendType").val(),
                    "byTime":$("[name='byTime']").val(),
                    "time":$("[name='time']").val()
                },
                type:"POST",
                success:function(data){
                    window.top.topPage.showSuccessMessage(window.top.message.player_auto['发送成功'],function(){
                        that.closePage();
                    });
                }
            })
        },
        //设置邮件接口
        setEmailInterface:function(e){
            this.closePage();
            this.returnValue="setEmailInterface";
        }


    })
});