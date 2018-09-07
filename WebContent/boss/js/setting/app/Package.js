/**
 * Created by jeff on 15-10-20.
 */
define(['common/BaseEditPage'], function (BaseEditPage) {

    return BaseEditPage.extend({
        init: function () {
            this._super();
            $(".appConfigArea").hide();
        },
        bindEvent: function () {
            var the = this;
            this._super();
            $("#getSiteAppConfig").on("click", function () {
                the.showAppConfig();
            });
            $("#task_sav_btn").on("click",function () {
                the.saveTask();
            });
        },
        showAppConfig: function () {
            var siteId = $("#site_id").val();
            var boxType = $("#boxType").val();
            if (siteId === '' || boxType === '') {
                alert("请输入站点ID并选择包网类型！");
                return;
            }
            window.top.topPage.ajax({
                url: root + '/appPackage/showConfig.html',
                type: 'POST',
                data: {"siteId": siteId, "boxType": boxType},
                success: function (data) {
                    $(".appConfigArea").show();
                    $(".appConfig").empty();
                    //设置内容
                    var result = eval('(' + data + ')');
                    for (var k in result) {
                        if (k === 'appName') {
                            $("#" + k).val(result[k]);
                        }else if(k === 'perTaskHaveLogo'){
                            $("#perTaskHaveLogo").empty();
                            $("#perTaskHaveLogo").html('<select class="btn-group chosen-select-no-single" name="starImgLogo" id="starImgLogo">\n' +
                                '<option value="1">带LOGO</option>\n' +
                                '<option value="0">不带LOGO</option>\n' +
                                '</select>');
                            $("#starImgLogo").val(result[k]);

                        }else if (k === 'startUrl') {
                            $("#" + k).attr("src", result[k]);
                        }
                        else {
                            $('#' + k).append(result[k]);
                        }
                    }
                },
                error: function (data) {

                }
            });
        },
        saveTask: function () {
            var siteId = $("#site_id").val();
            var boxType = $("#boxType").val();
            var appName = $("#appName").val();
            var starImgLogo = $("#starImgLogo").val();
            if (siteId === '' || boxType === ''||starImgLogo===''||appName==='') {
                alert("请完善好打包信息！");
                return;
            }
            window.top.topPage.ajax({
                url: root + '/appPackage/saveTask.html',
                type: 'POST',
                data: {"siteId": siteId, "boxType": boxType,"appName":appName,"starImgLogo":starImgLogo},
                success: function (data) {
                    alert(data);
                },
                error: function (data) {
                    alert("服务异常，请稍后重试");
                }
            });
        }

    });
});