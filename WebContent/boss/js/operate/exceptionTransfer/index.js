/**
 * Created by fei on 16-6-24.
 */
/**
 * 资金管理-提现管理列表
 */
define(['common/BaseListPage'], function (BaseListPage) {

    return BaseListPage.extend({
        init: function () {
            this.formSelector = "#mainFrame form";
            this._super();
            if (!$('[name="search.siteId"]').val()) {
                $('a._search').addClass('disabled').lock();
            }

        },
        bindEvent : function() {
            var _this=this;
            this._super();

            $('[data-toggle="popover"]').popover().on('show.bs.popover', function () { //展示时,关闭非当前所有弹窗
                $(this).parent().siblings().find('[data-toggle="popover"]').popover('hide');
            });
            //给Body加一个Click监听事件
            $('body').on('click', function(event) {
                var target = $(event.target);
                if (!target.hasClass('popover') //弹窗内部点击不关闭
                    && target.parent('.popover-content').length === 0
                    && target.parent('.popover-title').length === 0
                    && target.parent('.popover').length === 0
                    && target.data("toggle") !== "popover") {
                    //弹窗触发列不关闭，否则显示后隐藏
                    $('[data-toggle="popover"]').popover('hide');
                }
            });


            $(this.formSelector).on("keyup", "[name='search.orderNo']", function (e,message) {
                //_this.validSearch();
            });
            //隐藏记录
            $(".col-lg-12").on("click", ".hideTr", function (e,message) {
                $(this).parent().parent().hide();
            });

        },

        onPageLoad: function () {
            this._super();
            var _this = this;
            $("[data-toggle='popover']").popover();
            $("#divLeft").on("dblclick", ".transactionNo", function (e,message) {
                $("tbody td").css("color","").css("font-weight","");
                $("#divRight tr").show();
                if($(this).parent().attr("class") == "danger"){
                    $("tr").removeClass("danger");
                }else{
                    $(this).css("color","red").css("font-weight","bold");
                    $("tr").removeClass("danger");
                    $(this).parent().addClass("danger");
                    //选中的订单号
                    var $transactionNo = $(this);
                    $(".apiTransactionNo").each(function () {
                        var apiTransactionNo = $(this).text();
                        var transactionNo = $transactionNo.text();
                        if(apiTransactionNo.indexOf(transactionNo)>-1){
                            $("#divRight tbody tr").hide();
                            $(this).parent().addClass("danger");
                            $(this).parent().show("danger");
                            $(this).css("color","red").css("font-weight","bold");
                        }
                    });
                }
            });


            $("#divLeft").on("dblclick", ".amount", function (e,message) {
                $("tbody td").css("color","").css("font-weight","");
                $("#divRight tr").show();
                if($(this).parent().attr("class") == "danger"){
                    $("tr").removeClass("danger");
                }else{
                    $("#divRight tbody tr").hide();
                    //选中的金额
                    var amount = $(this).text();
                    $(".amount").each(function () {
                        if(Math.abs(parseFloat(amount)) == Math.abs(parseFloat($(this).text()))){
                            $(this).css("color","red").css("font-weight","bold");
                            $(this).parent().show();
                            $(this).parent().addClass("danger");
                        }
                    });
                }
            });


















            $(".col-lg-12").on("click", "#open", function (e,message) {
                $("tr").show();
            });


            this.loadGather();
        },

        changeSite: function (e) {
            if (e.key) {
                $('div.role').removeClass('hide');
                $('a._search').removeClass('disabled').unlock();
            } else {
                $('div.role').addClass('hide');
                $('a._search').addClass('disabled').lock();
                $('input.roleName').val('');
            }
        },

        changeRole: function(e) {
            $('input.roleName').attr('name', e.key);
        },

        loadGather : function () {
            if($("#resultSize").val()>0){
                $.ajax({
                    url:root+"/apiTransferCheck/loadGather.html",
                    data:$("#gatherForm").serialize(),
                    type:"POST",
                    async:true,
                    dataType:"html",
                    success:function(data){
                        $("#divRight").html(data);
                        //如果有找到订单号相同的订单,显示提示语
                        var transactionNo = $(".danger .transactionNo").text();
                        var apiTransId = $(".danger .apiTransId").text();
                        $(".apiTransactionNo").each(function () {
                            var apiTransactionNo = $(this).text();
                            if((apiTransactionNo!= '' && apiTransactionNo.indexOf(transactionNo)>-1) || (apiTransId!= '' && apiTransactionNo.indexOf(apiTransId)>-1)){
                                $("#isFind").text(transactionNo+"已匹配到API记录!");
                                return;
                            }

                        });
                    }
                });
            }
            else{
                $("#default").text("暂无内容!");
            }
        }
    });
});