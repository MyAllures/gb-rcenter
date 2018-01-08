<script>
    $(function () {
        $(".lottery-click").on("click", function (e) {
            var _this = e.currentTarget;
            $(".lottery-click").removeClass("active");
            $(this).addClass("active");
            var tabPaneSelector = ".lottery_list[data-api="+$(_this).data("api")+"]";
            $(".lottery_list").addClass("hide");
            $(tabPaneSelector).removeClass("hide");
        })
    });
</script>