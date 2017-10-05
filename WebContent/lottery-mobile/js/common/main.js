curl = {
    baseUrl: resComRoot + '/js',
    pluginPath: 'curl/curl/plugin',
    packages: {
        'site': {
            location: resRoot + '/js'
        },
        'gb': {
            location: 'gamebox',
            config: {}
        },
        'common': {
            location: 'gamebox/common'
        },
        'themesCss': {
            location: resRoot + '/themes/' + curTheme
        },
        'commonCss': {
            location: resComRoot + '/themes/' + curTheme
        },
        'regionCss': {
            location: resComRoot + '/themes/'
        }
    },
    paths: {
        jquery: 'jquery/jquery-2.1.1.min',
        jqValidate: 'jquery/plugins/jquery.validate/jquery.validate.min',
        cookie: 'jquery/plugins/jquery.cookie/jquery.cookie',
        RangeSlider: {
            location: resRoot + '/js/common/RangeSlider',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: ['jquery']
            }
        }
    },
    preloads: ['common/ClassTool']
};

/**
 * 动态加载JS文件
 * @param jsPath 要加载的js文件
 */
function loadJsFile(jsPath) {
    var _script = document.getElementsByTagName("script");
    var added = false;
    for (var i = 0; i < _script.length; i++) {
        if ($(_script[i]).attr("src") == jsPath) {
            added = true;
            break;
        }
    }
    if (!added) {
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = jsPath;
        document.body.appendChild(js);
    }
}