<script>
    $(document).ready(function () {
        $(".parentLi").on("click", function () {
            //左侧菜单点击显示隐藏相应内容
            var add = $(this).attr("href");
            var dId = add.split("id=")[1];
            if (dId != undefined) {
                showReferDoc(dId);
            }
        });

        //加载页面时切换对应的帮助信息
        var url = window.location.href;
        var id = url.split("id=")[1];
        if (id != null) {
            showReferDoc(id);
        }
    });

    function showReferDoc(id) {
        // add catban
        //显示／隐藏相关帮助信息
        $(".contentPart").css("display", "none");
        $(".p" + id).css("display", "block");
        //激活对应菜单栏选中样式
        $(".parentLi").removeClass("active");
        $(".parentLi_" + id).addClass("active");
    }
</script>