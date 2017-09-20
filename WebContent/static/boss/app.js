$(document).ready(function () {
    bindNavigation();
    var hashEvent,titleRoot="",
        titleFirstLevel="",
        titleSecondLevel="",
        lastHash,pages=new Object();
    
    function bindNavigation()
    {
        $(document).on("click","a[nav-top]", function (e) {
            e.preventDefault();
            _doNavigate(e);
        });
        $(document).on("click","a[nav-target]", function (e) {
            e.preventDefault();
            _doNavigate(e);
        });
        window.onhashchange = function (e) {
            var hashPage= pages[location.hash];
            if(hashPage)
            {
                $(document.body).hide()
                    .html(hashPage.content)
                    .show(function(){
                        if(hashPage.refresh && window.page.query) {
                            var btnOption = eval("(" + $(hashPage.hashEvent.currentTarget).data('rel') + ")");
                            window.page.query(hashPage.hashEvent,btnOption);
                        }
                        hashEvent=pages[location.hash].hashEvent;
                        lastHash=pages[location.hash].lastHash;
                    })
                return;
            }
            if(location.hash.length>0) {
                showPage();
            }
            else
            {
                if(hashEvent=={}) {
                    location.reload(true);
                }
            }
        };
        document.onkeydown = function(){

            if(window.event && window.event.keyCode == 116 || window.event.keyCode == 505)
            {
                showPage();
                return false;
            }
        };
    }
    function _doNavigate(e)
    {
        lastHash=window.location.hash;
        if(pages[lastHash]==null)
        {
            pages[lastHash]={lastHash:lastHash,hashEvent:hashEvent};
        }
        hashEvent={currentTarget:e.currentTarget};
        var url= $(hashEvent.currentTarget).attr("href");

        pages["#"+url]=null;
        if(window.location.hash==("#"+url))
        {
            showPage();
        }
        else{

            window.location.hash=url;
        }
    }
    function showPage(){
        var $obj= $(hashEvent.currentTarget);
        var level=3;
        var url= $obj.attr("href");


        var target=$obj.attr("nav-top")||$obj.attr("nav-target");
        if($obj.attr("nav-top"))
        {

            $obj.parent().parent().removeClass("active");
            $obj.parent().addClass("active");
            level=1;
        }
        if($obj.attr("nav-target"))
        {
            level=2;
        }
        //lock
        $('.preloader').show();

        $.ajax({
            mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
            url: url,
            type: 'GET',
            dataType: "html",
            success: function(data) {
                if(level==1)
                {
                    titleSecondLevel="";
                    $("#"+ target).html(data);
                    var text= $("span",$obj).text();
                    titleFirstLevel=text;
                }
                else if(level==2)
                {
                    $("#"+ target).html(data);
                }
                var config = {
                    '.chosen-select'           : {},
                    '.chosen-select-deselect'  : {allow_single_deselect:true},
                    '.chosen-select-no-single' : {disable_search_threshold:10},
                    '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
                    '.chosen-select-width'     : {width:"95%"}
                };
                for (var selector in config) {
                    $(selector).each(function(index,el){
                        if($(el).data('chosen')){
                            $(el).chosen("destroy");
                        }
                        if($(el).next().hasClass("chosen-container")) {
                            $(el).next().remove();
                        }
                        $(el).chosen(config[selector]);
                    });
                }
                $('.preloader').hide();
                pages[location.hash]={content:document.body.innerHTML,lastHash:lastHash,hashEvent:hashEvent};
                document.activeElement=document.body;
                document.activeElement.focus();

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    function getFirstParentByTag(e,tag)
    {
        tag=tag.toLowerCase();
        var $form= e.currentTarget;
        while($form && $form.tagName.toLowerCase()!=tag)
        {
            if($form.parentElement) {
                $form=$form.parentElement;
            } else {
                break;
            }
        }
        if($form.tagName.toLowerCase()==tag) {
            return $form;
        }
        else
        {
            return window.document.forms[0];
        }
    }
});