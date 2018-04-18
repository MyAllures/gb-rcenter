<script>
    $(function(){
        $("._vr_promo li").each(function(){
            $(this).on("click","a",function(){
                if(!$(this).parent().hasClass("active")){
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var val = $(this).data("item");
                    if (val=="_all_"){
                        $("._vr_actContain").show();
                    }else {
                        $("._vr_actContain").hide();
                        $("."+val).show();
                    }
                }
            })
        })
    })
</script>