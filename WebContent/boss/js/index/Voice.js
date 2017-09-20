/**
 * Created by eagle on 15-12-4.
 */

define(['common/BasePage'], function (BasePage) {

    return BasePage.extend({
        tones: null,
        init:function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            this.getVoices();
        },
        // 获取音频文件
        getVoices: function () {
            var _this = this;
            window.top.topPage.ajax({
                url: root + '/index/queryTone.html',
                dataType: "json",
                success: function (data) {
                    if (data) {
                        window.top.tones = data;
                    }
                }
            })
        },
        // 播放音频文件
        playVoice: function (data, type) {
            var tones = window.top.tones;
            for (var index = 0; index < tones.length; index++) {
                var tone = tones[index];
                if (type === tone.paramCode) {
                    var ie678 = !$.support.leadingWhitespac;
                    if (!ie678) {
                        $('#newMessageDIV').html("<embed src='" + resRoot + '/' + tone.paramValue + "'/>");
                    } else {
                        $('#newMessageDIV').html("<audio autoplay='autoplay'><source src='" + resRoot + '/' + tone.paramValue + "' type='audio/wav'/></audio>");
                    }
                    setTimeout(function () {
                        $('#newMessageDIV').html("")
                    }, 5000);
                    break;
                }
            }
        }
    });

});
