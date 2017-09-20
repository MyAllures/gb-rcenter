curl = {
    baseUrl : resComRoot+'/js',
    pluginPath: "curl/curl/plugin",
    packages : {
        site:{
            location : resRoot+"/js"
        },
        'gb' : {
            location : 'gamebox',
            config : {}
        },
        'common' : {
            location : 'gamebox/common'
        },
        'themesCss' : {
            location : '../themes/'+curTheme
        },
        'commonCss' : {
            location : '../../common/themes/'+curTheme
        },
        'regionCss' : {
            location : resComRoot+'/themes/'
        }
    },
    paths : {
        jquery : 'jquery/jquery-2.1.1',
        bootstrap : 'bootstrap/bootstrap',
        "bootstrap-dialog" : "bootstrap-dialog/bootstrap-dialog",
        "jstree" : "jquery/plugins/jquery.jstree/jstree",
        cookie : 'jquery/plugins/jquery.cookie/jquery.cookie',
        jqValidate : 'jquery/plugins/jquery.validate/jquery.validate',
        validate : 'gamebox/common/jquery.validate.extend.js',
        validateExtend : 'gamebox/common/jquery.validate.extend.extend.js',
        zeroClipboard :'ueditor/third-party/zeroclipboard/ZeroClipboard',
        bootstrapswitch : {
            location: 'dist/bootstrap-switch',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.bootstrapSwitch',
                requires: [ 'jquery','css!commonCss/dist/bootstrapSwitch']
            }
        },
        jschosen : {
            location: 'jquery/plugins/jquery.chosen/jquery.chosen',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.chosen',
                requires: [ 'jquery' ]
            }
        },
        jsrender : {
            location: 'jsrender/jsrender.min',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.render',
                requires: [ 'jquery' ]
            }
        },
        jqmetisMenu : {
            location: 'jquery/plugins/jquery.metisMenu/jquery.metisMenu',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.metisMenu',
                requires: [ 'jquery' ]
            }
        },
        jqnouislider : {
            location: 'jquery/plugins/jquery.nouislider/jquery.nouislider.min',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.noUiSlider',
                requires: [ 'jquery' ]
            }
        },
        jqplaceholder : 'jquery/jquery.placeholder',
        eventlock : {
            location: 'jquery/plugins/jquery-eventlock/jquery-eventlock-1.0.0',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.eventlock',
                requires: [ 'jquery' ]
            }
        },
        uuid : {
            location: 'jquery/plugins/jquery.uuid/jquery.uuid-1.0.0',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: [ 'jquery' ]
            }
        },
        nestable : {
            location: 'jquery/plugins/jquery.nestable/jquery.nestable',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.nestable',
                requires: [ 'jquery','css!commonCss/jquery/plugins/jquery.nestable/jquery.nestable.css']
            }
        },
        elastislide : {
            location: 'jquery/plugins/jquery.elastislide/jquery.elastislide',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.elastislide',
                requires: [ 'jquery' ]
            }
        },
        custom : {
            location : 'modernizr.custom/modernizr.custom.17475',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.custom'
            }
        },
        knob : {
            location : 'jquery/plugins/jquery.knob/jquery.knob',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.knob',
                requires: ['jquery']
            }
        },
        jqcountdown : 'jquery/plugins/jquery.countdown/jquery.countdown',
        jqtogglePassword : {
            location : 'jquery/plugins/jquery.toggle-password/jquery.toggle-password',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.togglePassword',
                requires: ['jquery']
            }
        },
        moment : {
            location: 'bootstrap-daterangepicker/moment',
        },
        daterangepicker : {
            location : 'bootstrap-daterangepicker/daterangepicker',
            config: {
                requires: ['jquery','moment']
            }
        },
        checkboxX : {
            location : 'jquery/plugins/checkbox/checkbox-x',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.checkboxX',
                requires: ['jquery','css!commonCss/checkbox/checkbox-x.css']
            }
        },

        'UE.config' : {
            location : 'ueditor/ueditor.config',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE',
                requires: ['jquery']
            }
        },
        'UE.I18N.en-US' : {
            location : 'ueditor/lang/en-US/en-US',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE.I18N',
                requires: ['jquery','UE']
            }
        },
        'UE.I18N.zh-CN' : {
            location : 'ueditor/lang/zh-CN/zh-CN',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE.I18N',
                requires: ['jquery','UE']
            }
        },
        'UE.I18N.zh-TW' : {
            location : 'ueditor/lang/zh-TW/zh-TW',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE.I18N',
                requires: ['jquery','UE']
            }
        },
        'UE.I18N.ja-JP' : {
            location : 'ueditor/lang/ja-JP/ja-JP',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE.I18N',
                requires: ['jquery','UE']
            }
        },
        UE : {
            location : 'ueditor/ueditor.all',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.UE',
                requires: ['jquery','UE.config','zeroClipboard']
            }
        },
        poshytip : {
            location : 'jquery/plugins/jquery.poshytip/jquery.poshytip',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: ['$.fn.poshytip'],
                requires: ['jquery','css!commonCss/jquery/plugins/jquery.poshytip/poshytip']
            }
        },
        jqFileInput : {
            location : 'jquery/plugins/fileinput/fileinput',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.fileinputLocales',
                requires: ['jquery']
            }
        },
        chart :  "chartJs/Chart.min",
        highcharts : {
            location: 'ueditor/third-party/highcharts/highcharts',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.highcharts',
                requires: ['jquery']
            }
        },
        exporting : {
            location: 'ueditor/third-party/highcharts/modules/exporting',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.Chart',
                requires: ['jquery','highcharts']
            }
        },
        tooltips : {
            location: 'pcenterJS/tooltips.js',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.tooltip',
                requires: ['jquery']
            }
        },
        inspinia : {
            location: 'inspinia/inspinia',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: [ 'jquery','jqmetisMenu' ]
            }
        },
        blueimpGallery : {
            location: 'jquery/plugins/blueimp/jquery.blueimp-gallery.min',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.blueimp-gallery',
                requires: [ 'jquery','css!commonCss/themes/default/blueimp/css/blueimp-gallery.min.css']
            }
        },
        autocompleter : {
            location: 'jquery/plugins/autocompleter/jquery.autocompleter.min',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.autocompleter',
                requires: ['jquery', 'css!commonCss/jquery/plugins/autocompleter/jquery.autocompleter.css']
            }
        },
        lazyload : {
            location: 'jquery/plugins/jquery.lazyload/jquery.lazyload',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.lazyload',
                requires: ['jquery']
            }
        },
        mailAutoComplete:{
            location: 'jquery/plugins/jquery.mailAutoComplete-4.0/jquery.mailAutoComplete-4.0',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.mailAutoComplete',
                requires: ['jquery']
            }

        },
        icheck:{
            location: 'iCheck/icheck',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.iCheck',
                requires: ['jquery']
            }

        },/*,
         poster:{
         location: 'common/js/jquery/plugins/poster/poster',
         config: {
         loader: 'curl/curl/loader/legacy',
         exports: '$.fn.mailAutoComplete',
         requires: ['jquery']
         }
         }*/

        serializeJSON:'jquery/plugins/jquery.serializejson/jquery.serializejson',

        calendar:{
            location: 'jquery/plugins/jquery.calendar/jquery.calendar',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.DateSelector',
                requires: ['jquery']
            }
        },

        WanSpinner: {
            location: 'jquery/plugins/spinner/jquery.spinner',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.WanSpinner',
                requires: ['jquery']
            }
        }
    },
    preloads: ['bootstrap', 'common/ClassTool']
};