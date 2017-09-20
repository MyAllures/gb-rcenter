define(['common/MobileBasePage'], function (Mobile) {
    //进行中活动的页码
    var pageNumber;
    //已结束活动的页码
    var pageNumber2;
    //当前所在的slide页面
    var slideNumber;
    var t;
    return Mobile.extend({
        //活动类型
        activityType: null,
        init: function (formSelector) {
            this._super();
        },
        onPageLoad: function () {
            this._super();
            t = this;
            pageNumber = 2;
            pageNumber2 = 1;
            slideNumber = 0;
            this.activityType = 'all';
            // t.tableScroll();
            mui(".popover-scroll").scroll();
            
        },
        bindEvent: function () {
            this._super();
            this.getActivityType();
            //页面切换
            var item2Show = false, item3Show = false;//子选项卡是否显示标志
            if (!window.top.game.promo) {
                //点击活动类型时
                mui('#activityType').on('tap', 'a', function (e) {
                    mui('#activityType').popover('toggle');//show hide toggle
                    t.activityType = e.target.getAttribute('value');
                    var displayType1 = document.getElementById("displayType1");
                    displayType1.innerText = e.target.innerHTML;
                    t.toActivityType();
                });
                //显示活动详情
                $("body").on("tap", ".activity-a", function (e) {
                    t.gotoUrl("/promo/promoDetail.html?search.id=" + $(this).data("id"));
                    /*var activityDetail = $(this).next();
                    var ad = $(e.target).parent().next("[name='activityDetail']");
                    var ad_length = ad.find("a").length;
                    if (activityDetail.is(':hidden')) {
                        $("[name='activityDetail']").slideUp();
                        activityDetail.slideDown();

                        if (ad_length > 0) {
                            mui(ad).on("tap", "a", function (e) {
                                if(t.os=="app_android")
                                    t.gotoUrl($(this).attr("href"));
                                else
                                    window.open($(this).attr("href"), "_blank");
                            })
                        }
                        t.tableScroll(this);
                    } else {
                        if (ad_length > 0) {
                            mui(ad).off("tap", "a");
                        }
                        activityDetail.slideUp();
                    }
                    setTimeout(function () {
                        mui("#mui-refresh").pullRefresh().refresh();
                    }, 400);*/
                });
            }
            //点击选项卡时切换页面
            mui('#segmentedControl-promo').on('tap', 'a', function (e) {
                var slide = this.getAttribute("slideNumber");
                if (slide == 0) {
                    //切换到第一个选项卡
                    slideNumber = 0;
                    $("#promo2").addClass("mui-hide");
                    $("#promo1").removeClass("mui-hide");
                    t.isNoActivity();
                } else if (slide == 1) {
                    //切换到第二个选项卡
                    //根据具体业务，动态获得第二个选项卡内容；
                    slideNumber = 1;
                    if (!item2Show) {//判断是否直接显示还是从后台获取数据
                        // finishedPromo();
                        t.finishedPromo();
                        //改变标志位，下次直接显示
                        item2Show = true;
                    } else {
                        t.isNoActivity();
                    }
                    $("#promo1").addClass("mui-hide");
                    $("#promo2").removeClass("mui-hide");
                }
                window.top.game.initTab(5);
            });

            document.querySelector("[href='#activityType']").addEventListener("tap", function (e) {
                setTimeout(function () {
                    var activityTypePopover = $("#activityType");
                    var activityTypeLi = activityTypePopover.find("#activityTypeLi");
                    if (activityTypeLi.height() < activityTypePopover.height())
                        activityTypePopover.height(activityTypeLi.height() + 14);
                }, 200);
            });
        },
        //活动类型分类
        toActivityType: function () {
            var items;
            var type;
            items = document.getElementsByName('promoLi');
            type = t.activityType;
            for (var i = 0; i < items.length; i++) {
                if (type == 'all') {
                    items[i].classList.remove('mui-hide');
                } else {
                    if (items[i].getAttribute("code") != type)
                        items[i].classList.add("mui-hide");
                    else
                        items[i].classList.remove("mui-hide");
                }
            }
            t.isNoActivity();
        },
        loadMoreActivity: function (isReload) {
            if (slideNumber == 0) {
                t.processingPromo(isReload);
            } else if (slideNumber == 1) {
                t.finishedPromo(isReload);
            }
        },
        //显示正在进行中活动
        processingPromo: function (isReload) {
            if (isReload)
                pageNumber = 1;
            var data = {"paging.pageNumber": pageNumber};
            pageNumber = t.thisPullRefreshUp(root + "/promo/promo.html", "content1", pageNumber, "lastPageNumber1", mui("#mui-refresh"), data, isReload);
        },
        //显示已结束活动
        finishedPromo: function (isReload) {
            if (isReload)
                pageNumber2 = 1;
            var data = {"paging.pageNumber": pageNumber2};
            pageNumber2 = t.thisPullRefreshUp(root + "/promo/finishedPromo.html", "content2", pageNumber2, "lastPageNumber2", mui("#mui-refresh"), data, isReload);

        },
        getActivityType: function () {
            mui.ajax("/promo/activityType.html", {
                type: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Soul-Requested-With': 'XMLHttpRequest'
                },
                dataType: 'json',
                success: function (data) {
                    var li = '<li class="mui-table-view-cell"> <a href="#" value="all">' + window.top.message.promo_auto["全部"] + '</a> </li>';
                    for (var d in data) {
                        li = li + "<li class='mui-table-view-cell'><a href='#' value='" + data[d].key + "'>" + data[d].value + "</a></li>";
                    }
                    $("#activityTypeLi").html(li);
                }
            });
        },
        thisPullRefreshUp: function (url, contentId, pagenumber, lastPageNumberId, scrollView, data, isReload) {
            var t = this;
            var lastPageNumber = document.getElementById(lastPageNumberId);
            if (lastPageNumber == null || pagenumber <= parseInt(lastPageNumber.value)) {
                mui.ajax(url, {
                    type: 'POST',//HTTP请求类型
                    timeout: 10000,//超时时间设置为10秒；
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Soul-Requested-With': 'XMLHttpRequest'
                    },
                    success: function (data) {
                        var info = document.getElementById(contentId);
                        //判断是否重新加载数据还是继续加载,已结束活动页不能重新加载
                        if (isReload) {
                            info.innerHTML = data;
                            scrollView.pullRefresh().endPullupToRefresh(false);
                        } else {
                            info.innerHTML = info.innerHTML + data;
                            if (document.getElementById(lastPageNumberId).value == pagenumber) {
                                scrollView.pullRefresh().endPullupToRefresh(true);
                                // return pagenumber;
                            } else {
                                scrollView.pullRefresh().endPullupToRefresh(false);
                                // return pagenumber+1;
                            }
                        }
                        scrollView.pullRefresh(t.pullRefresh).endPulldownToRefresh();
                        t.toActivityType();
                        t.dismissProgress();
                        t.isNoActivity();
                        // t.tableScroll();
                    },
                    error: function (e) {
                        t.toast(window.top.message.promo_auto['加载失败']);
                        scrollView.pullRefresh().endPullupToRefresh(true);
                        //异常处理；
                        console.log(e);
                        t.dismissProgress();
                    }
                });
                return pagenumber + 1;
            } else {
                scrollView.pullRefresh().endPullupToRefresh(true);
                return pagenumber;
            }
        },
        tableScroll: function (value) {
            var $table = $(value).parent().find("table");
            for (var i = 0; i <= $table.size(); i++) {
                if (!($($table.get(i)).parent().attr("class") == 'mui-scroll')) {
                    //给表格添加横向滚动
                    $($table.get(i)).wrap("<div class=' mui-scroll-wrapper scroll2 mui-slider-indicator mui-segmented-control " +
                        "mui-segmented-control-inverted'> " +
                        "<div class='mui-scroll'></div></div>");
                    mui(".scroll2").scroll();

                    var scrollHeight = $($table.get(i)).height();
                    $($table.get(i)).parent().parent().css("height", scrollHeight + 2 + "px");
                }
            }
        },
        isNoActivity: function () {
            setTimeout(function () {
                //选择活动分类后,如果没有优惠则提示没有优惠
                if ($("[name='promoLi']:visible").size() == 0) {
                    if (slideNumber == 0) {
                        if ($("#noActivity1").length != 0)
                            $("#noActivity1").css("display", "block");
                        else
                            $("#content1").html($("#content1").html() + '<li id="noActivity1"> <div class="mui-no-data">' + window.top.message.promo_auto["暂无优惠信息"] + '</div> </li>');
                    } else {
                        if ($("#noActivity2").length != 0)
                            $("#noActivity2").css("display", "block");
                        else
                            $("#content2").html($("#content2").html() + '<li id="noActivity2"> <div class="mui-no-data">' + window.top.message.promo_auto["暂无优惠信息"] + '</div> </li>');
                    }
                } else {
                    if (slideNumber == 0) {
                        if ($("#noActivity1") != null)
                            $("#noActivity1").css("display", "none");
                    } else {
                        if ($("#noActivity2") != null)
                            $("#noActivity2").css("display", "none");
                    }
                }
            }, 200);
        }
    });
});