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
        pullRefresh: {},
        count: 0,
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
            this.getActivityType();
            mui.init();
            //禁用侧滑手势
            if (document.querySelector('.mui-inner-wrap')) {
                document.querySelector('.mui-inner-wrap').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            /*内容区域滚动*/
            mui('.mui-scroll-wrapper').scroll();

            mui('#scroll1').pullRefresh({
                up: {
                    callback: t.processingPromo
                }
            });

            if (mui.os.plus) {
                mui.plusReady(function () {
                    setTimeout(function () {
                        mui('#scroll1').pullRefresh().pullupLoading();
                    }, 1000);

                });
            } else {
                mui.ready(function () {
                    mui('#scroll1').pullRefresh().pullupLoading();
                });
            }
        },
        bindEvent: function () {
            this._super();
            var _this = this;
            //页面切换
            var item2Show = false, item3Show = false;//子选项卡是否显示标志
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
            });
            //点击选项卡时切换页面
            mui('#segmentedControl-promo').on('tap', 'a', function (e) {
                var id = $(this).attr("href");
                if (id == '#promo1') {
                    slideNumber = 0;
                    t.toActivityType();
                } else {
                    //切换到第二个选项卡
                    slideNumber = 1;
                    //根据具体业务，动态获得第二个选项卡内容；
                    if (t.count == 0) {
                        mui('#scroll2').pullRefresh({
                            up: {
                                auto: true,
                                height: 50,//可选.默认50.触发上拉加载拖动距离
                                callback: t.finishedPromo
                            }
                        });
                    } else if (!item2Show) {//判断是否直接显示还是从后台获取数据
                        t.finishedPromo();
                        //改变标志位，下次直接显示
                        item2Show = true;
                    } else {
                        t.toActivityType();
                    }
                    t.count++;
                }
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
            var obj;
            if (slideNumber == 0) {
                obj = $("#promo1");
            } else {
                obj = $("#promo2");
            }
            items = obj.find('[name=promoLi]');
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
            t.isNoActivity(obj);
        },
        //显示正在进行中活动
        processingPromo: function (isReload) {
            if (isReload)
                pageNumber = 1;
            var data = {"paging.pageNumber": pageNumber};
            pageNumber = t.thisPullRefreshUp(root + "/promo/promo.html", "promo1Ul", pageNumber, "lastPageNumber1", mui('#scroll1'), data, isReload);
        },
        //显示已结束活动
        finishedPromo: function (isReload) {
            if (isReload)
                pageNumber2 = 1;
            var data = {"paging.pageNumber": pageNumber2};
            pageNumber2 = t.thisPullRefreshUp(root + "/promo/finishedPromo.html", "promo2Ul", pageNumber2, "lastPageNumber2", mui('#scroll2'), data, isReload);

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
                    var li = '<li class="mui-table-view-cell"><a href="#" value="all" class="">' + window.top.message.promo_auto["全部"] + '</a></li>';
                    for (var d in data) {
                        li = li + "<li class='mui-table-view-cell'><a href='#' value='" + data[d].key + "'>" + data[d].value + "</a></li>";
                    }
                    $("#activityTypeLi").html(li);
                }
            });
        },
        thisPullRefreshUp: function (url, contentId, pagenumber, lastPageNumberId, scrollView, data, isReload) {
            var t = this;
            setTimeout(function () {
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
                            //判断是否重新加载数据还是继续加载
                            if (isReload) {
                                $("#" + contentId).html(data);
                                scrollView.pullRefresh().endPullupToRefresh(false);
                            } else {
                                //已经无优惠了
                                if (data.indexOf("noActivity") >= 0) {
                                    if (pagenumber == 1) {
                                        $("#" + contentId).append(data);
                                    }
                                    scrollView.pullRefresh().endPullupToRefresh(true);
                                } else if (data.indexOf("promoLi") < 8) { //已经属于最后一页了 pagesize=8
                                    $("#" + contentId).append(data);
                                    scrollView.pullRefresh().endPullUpToRefresh(true);
                                } else {
                                    $("#" + contentId).append(data);
                                    scrollView.pullRefresh().endPullupToRefresh(false);
                                }
                            }
                            t.toActivityType();
                            t.dismissProgress();
                        },
                        error: function (e) {
                            t.toast(window.top.message.promo_auto['加载失败']);
                            scrollView.pullRefresh().endPullupToRefresh(true);
                            t.dismissProgress();
                        }
                    });
                    pagenumber = pagenumber + 1;
                } else {
                    scrollView.pullRefresh().endPullupToRefresh(true);
                    $(".mui-pull-bottom-pocket").remove();
                }
            }, 1000);
        },
        isNoActivity: function (obj) {
            setTimeout(function () {
                var $promLi = $(obj).find("[name='promoLi']:visible");
                //选择活动分类后,如果没有优惠则提示没有优惠
                if (!$promLi || $promLi.size() == 0) {
                    if (slideNumber == 0) {
                        if ($("#noActivity1").length != 0)
                            $("#noActivity1").css("display", "block");
                        else
                            $("#promo1Ul").html($("#promo1Ul").html() + '<li id="noActivity1"> <div class="mui-no-data">' + window.top.message.promo_auto["暂无优惠信息"] + '</div> </li>');
                    } else {
                        if ($("#noActivity2").length != 0)
                            $("#noActivity2").css("display", "block");
                        else
                            $("#promo2Ul").html($("#promo2Ul").html() + '<li id="noActivity2"> <div class="mui-no-data">' + window.top.message.promo_auto["暂无优惠信息"] + '</div> </li>');
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