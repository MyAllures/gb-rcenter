define(['site/common/BasePage', 'site/plugin/template', "site/lotteryResult/Zodiac"], function (BasePage, Template, Zodiac) {
    null;
    return BasePage.extend({
        noreCode: '<div class="mui-content"> <div class="no-data-img no-record"></div> </div>',
        freshTime: null,
        frequencyType: "allLotteryType",
        zodiac: null,
        pageNum:null,
        init: function (formSelector) {
            if(sessionStorage.returnFlag == undefined || sessionStorage.returnFlag == 'false'){
                if(!sessionStorage.currentLength){
                    sessionStorage.currentLength=0
                }
                sessionStorage.currentLength = parseInt(sessionStorage.currentLength)+1;
            }
            sessionStorage.returnFlag=false;
            this.zodiac = new Zodiac();
            t = this;
            this.onPageLoad();
            this.bindEvent();
        },
        onPageLoad: function () {
            mui.init({
                beforeback: function() {
                    sessionStorage.currentLength = parseInt(sessionStorage.currentLength)-1;
                    sessionStorage.returnFlag = true;
                    return true;
                }
            });
            var _this = this;
            this.iosGoBack();
            //禁用侧滑手势
            if (document.querySelector('.mui-inner-wrap')) {
                document.querySelector('.mui-inner-wrap').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            if (document.querySelector('#offCanvasSide')) {
                document.querySelector('#offCanvasSide').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            if (document.querySelector('#offCanvasSideRight')) {
                document.querySelector('#offCanvasSideRight').addEventListener('drag', function (e) {
                    e.stopPropagation()
                });
            }
            /*内容区域滚动*/
            mui('.mui-scroll-wrapper').scroll({
                scrollY: true, //是否竖向滚动
                scrollX: false, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: false //是否启用回弹
            });
            mui("#pullrefresh").pullRefresh({
                up: {
                    auto: true,
                    contentrefresh: '正在加载...',
                    callback: _this.loadData
                }
            })
        },
        bindEvent: function () {
            var _this = this;
            mui("body").on("tap", "a.mui-tab-item[data-type]", function () {
                _this.frequencyType = $(this).data("type");
                mui('#pullrefresh').pullRefresh().refresh(true);
                mui('#pullrefresh').scroll().scrollTo(0,0);
                _this.loadData(true);
            });
            mui('body').on('tap', '.mui-pull-right a[data-href]', function () {
                page.gotoUrl($(this).data('href'));
            });
        },

        loadData: function (isRefresh) {
            var _this = this;
            if(!_this.pageNum) {
                _this.pageNum = 0;
            }
            var pageNum = _this.pageNum + 1;
            if (isRefresh) {
                pageNum = 1;
                _this.pageNum = 1;
            }
            mui.ajax(root + "/lotteryResultHistory/getLotteryFrequencyType.html", {
                data: {'frequencyType': _this.frequencyType, 'pageNum': pageNum},
                type: "post",
                dataType: "json",
                success: function (data) {
                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var ball = [];
                            var sx = [];
                            if (data[i].openCode) {
                                var spball = data[i].openCode.split(",");
                                var openCodeSum = 0;
                                for (var j = 0; j < spball.length; j++) {
                                    ball.push(spball[j]);
                                    if (data[i].type == "lhc") {
                                        sx.push(t.zodiac.getSxName(spball[j]));
                                    }if(data[i].type == "xy28"){
                                        openCodeSum += parseInt(spball[j]);
                                    }
                                }
                                data[i].sx = sx;
                                data[i].ball = ball;
                                data[i].openCodeSum = openCodeSum;
                            }
                        }
                        var html = Template('template_myLotteryTemplate', {list: data});
                        if (isRefresh) {
                            $("#container").html(html);
                        } else {
                            $("#container").append(html);
                        }
                        if (data.length < 20) { //pagesize:20
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                            $(".mui-pull-bottom-pocket").remove();
                        } else {
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
                        }
                    } else {
                        if (pageNum == 1) {
                            $("#pullrefresh").html(_this.noreCode);
                        }
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        $(".mui-pull-bottom-pocket").remove();
                    }
                    _this.pageNum++;
                }
            })
        },
        getTen: function (k) {
            if (k < 10)
                k = "0" + k;
            return k;
        }
    })
});