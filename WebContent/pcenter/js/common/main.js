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
            location : resRoot+'/themes/'+curTheme
        },
        'commonCss' : {
            location : resComRoot+'/themes/'+curTheme
        },
        'regionCss' : {
            location : resComRoot+'/themes/'
        }
    },
    paths : {
        jquery : 'jquery/jquery-1.11.1',
        bootstrap : 'bootstrap/bootstrap',
        "bootstrap-dialog" : "bootstrap-dialog/bootstrap-dialog",
        "jstree" : "jquery/plugins/jquery.jstree/jstree",
        cookie : 'jquery/plugins/jquery.cookie/jquery.cookie',
        jqValidate : 'jquery/plugins/jquery.validate/jquery.validate',
        validate : 'gamebox/common/jquery.validate.extend.js',
        validateExtend : 'gamebox/common/jquery.validate.extend.player.js',
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
                requires: ['jquery','css!themesCss/checkbox/checkbox-x.css']
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
        exporting : {
            location: 'ueditor/third-party/highcharts/modules/exporting',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: 'window.Chart',
                requires: ['jquery','highcharts']
            }
        },
        tooltips : {
            location : 'jquery/plugins/jquery.tooltips/jquery.tooltips',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$.fn.tooltip',
                requires: ['jquery']
            }
        },
        Util : {
            location : 'pcenterJS/global-1.1.0.min',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
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

        }
    },

    preloads: ['bootstrap','common/ClassTool']

};