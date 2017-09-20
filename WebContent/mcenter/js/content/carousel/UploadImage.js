/**
 * Created by jeff on 15-8-11.
 */
define(['common/BasePage','UE.I18N.'+window.top.language], function (BasePage) {

    return BasePage.extend({
        _ue:null,
        top:window.top,
        config:{

            maxPic:1,//最多上次几张图片
            objId:null,//当前数据的id
            catePath:null,//模块名(图片文件夹名)
            callBack:null,//上传后的回调函数

            _urlParam:function(){
                //TODO jeff 删除判断
                if(!this.objId||!this.catePath) {
                    throw window.top.message.content_auto['不能为空'];
                };
                return 'objId='+this.objId+'&catePath='+this.catePath;
            }

        },
        init: function (opt) {
            this._super();

            var that = this;

            /*上传图片数量超过限制提示信息*/
            var moreThanMaxMessage = window.top.message.common['maxUploadImageNum'].replace('{X}',that.config.maxPic);

            /*创建*/
            this.config = $.extend(this.config,opt);

            /* 创建script */
            $('<script id="_ue_script"></script>').appendTo('body');

            /*初始化ue*/
            var _ue = this._ue =  UE.getEditor('_ue_script');
            _ue.options.imageUrlPrefix=window.top.imgRoot+"/files/";
            _ue.options.urlParam = that.config._urlParam();
            _ue.commands['addfile']= {
                execCommand:function (cmd, opt) {
                    if(opt.length>that.config.maxPic+1){
                        window.top.topPage.showWarningMessage(moreThanMaxMessage);
                        /*opt[opt.length-1].hide();*/
                        opt[opt.length-that.config.maxPic+1].remove();
                    }
                }
            };
            _ue.ready(function () {
                /*添加事件监听*/
                _ue.addListener('beforeInsertImage', function (t, arg) {

                    /*执行callback*/
                    that.config.callBack&&that.config.callBack(arg);

                });
                /*隐藏编辑器*/
                _ue.hide();
            });
        },
        /**
         * 上传图片 弹出窗
         * @param e
         * @param p
         */
        getUpImage:function(e,p){
            //console.log(window.top.message);
            var myImage = this._ue.getDialog("insertimage");
            myImage.editor=this._ue;
            myImage.open();
            $(e.currentTarget).unlock();
        }
    });
});