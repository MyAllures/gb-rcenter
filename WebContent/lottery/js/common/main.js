curl = {
    baseUrl: resComRoot + '/js',
    pluginPath: "curl/curl/plugin",
    packages: {
        site: {
            location: resRoot + "/js"
        },
        'gb': {
            location: 'gamebox'
        },
        'common': {
            location: 'gamebox/common'
        },
        'themesCss': {
            location: resRoot + '/themes/' + curTheme + '/css/'
        },
        'themesJs': {
            location: resRoot + '/themes/' + curTheme + '/js/'
        },
        'commonCss': {
            location: resComRoot + '/themes/' + curTheme
        },
        'regionCss': {
            location: resComRoot + '/themes/'
        }

    },
    paths: {
        FancyZoom: resRoot + '/themes/' + curTheme + '/js/FancyZoom',
        FancyZoomHTML: resRoot + '/themes/' + curTheme + '/js/FancyZoom',
        jquery: resRoot + '/js/plugin/jquery.min',
        scrollanim: resRoot + '/js/plugin/scrollanim.min',
        moment : {
            location: 'bootstrap-daterangepicker/moment'
        },
        type: {
            location: resRoot + '/js/plugin/type',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: ['jquery']
            }
        },
        nicescroll: {
            location: resRoot + '/js/plugin/jquery.nicescroll',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: ['jquery']
            }
        },

        dateFormat: resRoot + '/themes/' + curTheme + '/js/dateFormat',
        swfobject: resRoot + '/themes/' + curTheme + '/js/swfobject/swfobject',
        liMarquee: {
            location: resRoot + '/themes/' + curTheme + '/js/jquery.liMarquee',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: ['jquery']
            }
        },
        range: {
            location: resRoot + '/js/plugin/jquery.range.js',
            config: {
                loader: 'curl/curl/loader/legacy',
                exports: '$',
                requires: ['jquery']
            }
        }
    },

    preloads: ['jquery', 'common/ClassTool']

};