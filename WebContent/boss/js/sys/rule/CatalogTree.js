define(['jstree','css!themesCss/jquery/plugins/jquery.jstree/jquery.jstree.min.css'], function(jstree) {

    return {

        $tree : null,

        toggleTree : function(){
            var $menu = $(".dropdown-menu", this.formSelector);
            var display =$menu .css("display");
            if (display == "none") {
                $menu.css("top","32px");
                $menu.css("display","block");
            } else {
                $menu.css("display","none");
            }
        },

        initTree : function(type){
            var _this = this;
            $("#menu").dropdown('toggle');
            $tree = $("#catalogTree", this.formSelector).jstree({
                'core': {
                    'data': {
                        "url": root + "/sysRuleFileCatalog/listTree.html",
                        "dataType": "json"
                    }
                },
                plugins: ["changed"]
            })
                .on("changed.jstree", function (e, data) {
                    if (data.action == 'select_node') {
                        $("form [name='"+type+".catalogId']").val(data.selected[0]);
                        $("form [name='"+type+".catalogCode']").val(data.node.text);
                        _this.toggleTree();
                    } else {
                        //编辑页面的回显
                        var resultId = $("form [name='result.catalogId']").val();
                        if (resultId) {
                            $("form [name='result.catalogCode']").val(data.instance.get_text(resultId));
                        }
                    }
                })
                .bind("loaded.jstree", function (e, data) {
                    data.instance.open_all();
                })


            $("form [name='"+type+".catalogCode']").on('click',function(e){
                _this.toggleTree();

            });
        },

        /**
         * 刷新树
         */
        refreshTree : function(e){
            $tree.jstree().refresh();
        }
    }
});
