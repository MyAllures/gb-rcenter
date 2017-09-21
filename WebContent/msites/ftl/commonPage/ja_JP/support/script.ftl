<script>

    var local_url = window.location.origin;
    //android二维码
    var code = "";
    $.ajax({
        url:"/index/getAppsUrl.html",
        type:"get",
        data:{"device":"android"},
        async:false,
        success:function (data) {
            var data = eval('('+data+')');
            code = data.code;
        }
    })
    /**
     * 专属浏览器下载链接
     *
     */
    var down = local_url+"/Download.ashx?key="+code+"&name=Browser&zip=true";
    $(".downBrowser").attr("href",down);
    /**
     * 下载DNS修改工具
     *
     */
    var dns_clear = local_url+"/download/dnshelper.zip";
    $("#dns").attr("href",dns_clear);
</script>