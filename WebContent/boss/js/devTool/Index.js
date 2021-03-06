define(['common/BaseListPage','bootstrapswitch'], function (BaseListPage,Bootstrapswitch) {
    var _this ;
    return BaseListPage.extend({
        init : function() {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            _this = this;
            //Global cache
            $("._cacheBtn").on("click",function () {
                _this.doCacheBtn($(this));

            });

            $("._cacheSyBtn").on("click",function () {
                _this.doCacheSyBtn($(this));

            });

            $("._cacheKeyBtn").on("click",function () {
                _this.doCacheKeyBtn($(this));
            });

            $("#refreshAllPageCacheBtn").on('click',function () {
                _this.refreshAllPageCacheBtn();
            });

            $("._cacheKey").on("click",function () {
                var cacheKey = $(this).html();
                var prefix=$(this).attr("prefix");
                $("input[name=dataKey]").val(prefix+":"+cacheKey);
            });
        },

        doCacheBtn : function ($this) {
            $this.attr('disabled', true);
            var text = $this.text();
            $this.text(text + '...');
            $.ajax({
                url: root + "/devTool/"+$this.attr("target")+".html",
                success: function (data) {
                    alert(data == 'true' ? $this.text()+'成功！' : $this.text()+'失败，详情请查看服务器日志！');
                    $this.attr('disabled', false);
                    $this.text(text);
                }
            });
        },

        doCacheKeyBtn : function($obj)  {
            var $this=$obj;
            $this.attr('disabled', true);
            var text = $this.text();
            $this.text(text + '...');
            var dataKey = $("input[name=dataKey]").val();
            $.ajax({
                url: root + "/devTool/"+$this.attr("target")+".html",
                type: "POST",
                data: {"dataKey": dataKey},
                success: function (data) {
                    $("#cacheResult").val(data ? data : "No Data")
                    $this.attr('disabled', false);
                    $this.text(text);
                }
            });
        },

        doCacheSyBtn : function ($this) {
            var siteId = $("input[name='sites']").val();
            if (siteId == "") {
                alert("请选择一个站点.")
                return;
            }
            $.ajax({
                url: root + "/devTool/"+$this.attr("target")+".html",
                type:"POST",
                data:{"siteId":siteId},
                success: function (data) {
                    alert(data ? $this.text()+'成功！' : $this.text()+'失败，详情请查看服务器日志！');
                    $this.attr('disabled', false);
                    $("#cacheResult").val(data ? data : "No Data")
                }
            });
        },


        refreshAllPageCacheBtn : function() {
            var id = $("input[name='sites']").val();
            if (id == "") {
                alert("请选择一个站点.")
                return;
            }
            $.ajax({
                url: root + "/devTool/refreshAllPageCache.html?id=" + id,
                dataType: "json",
                success: function (data) {
                    if (data) {
                        alert("刷新页面缓存成功！")
                    } else {
                        alert("刷新页面缓存失败,请向运维寻求协助。")
                    }
                }
            });
        }

    });
});
