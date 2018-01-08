<script>
    $(function(){
        $(".promo-sorts li").each(function(){
            $(this).on("click","a",function(){
                if(!$(this).parent().hasClass("active")){
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val=="_all_"){
                        $(".actContain").show();
                    }else {
                        $(".actContain").hide();
                        $("."+val).show();
                    }
                }
            })
        })
    })
</script>