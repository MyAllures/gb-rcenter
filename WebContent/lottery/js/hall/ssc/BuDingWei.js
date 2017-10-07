/**
 * 跨度
 */
define(['site/hall/ssc/SscGfwf'], function (PlayWay) {
    return PlayWay.extend({
        playId : '5x',
        init: function () {
            this._super();
        },
        /**
         * 注数-五星三码
         */
        zhushu_wx3m:  function () {
            var budwArr = [];
            $.each($(".recl-1012-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    for (var x = 0; x < budwArr.length; x++) {
                        if (i != j && j != x && i != x) {
                            var arr = [];
                            arr.push(budwArr[i]);
                            arr.push(budwArr[j]);
                            arr.push(budwArr[x]);
                            arr.sort();
                            newArr.push(arr.join(","));
                        }
                    }
                }
            }

            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-五星二码
         */
        zhushu_wxem:function () {
            var budwArr = [];
            $.each($(".recl-1011-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }

            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-五星一码
         */
        zhushu_wxym:  function () {
            var budwArr = [];
            $.each($(".recl-1010-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },

        /**
         * 注数-后四二码
         */
        zhushu_h4em: function () {
            var budwArr = [];
            $.each($(".recl-1009-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }

            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-后四一码
         */
        zhushu_h4ym:  function () {
            var budwArr = [];
            $.each($(".recl-1008-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },

        /**
         * 注数-前四二码
         */
        zhushu_q4em:  function () {
            var budwArr = [];
            $.each($(".recl-1007-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }

            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-前四一码
         */
        zhushu_q4ym:   function () {
            var budwArr = [];
            $.each($(".recl-1006-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },

        /**
         * 注数-后三二码
         */
        zhushu_hsem:function () {
            var budwArr = [];
            $.each($(".recl-1005-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }
            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-后三一码
         */
        zhushu_hsym:function () {
            var budwArr = [];
            $.each($(".recl-1004-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },

        /**
         * 注数-前三二码
         */
        zhushu_qsem: function () {
            var budwArr = [];
            $.each($(".recl-1003-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });
            var newArr = [];
            for (var i = 0; i < budwArr.length; i++) {
                for (var j = 0; j < budwArr.length; j++) {
                    if (i != j) {
                        var arr = [];
                        arr.push(budwArr[i]);
                        arr.push(budwArr[j]);
                        arr.sort();
                        newArr.push(arr.join(","));
                    }
                }
            }
            newArr = newArr.uniqueArr();
            return newArr.length;
        },

        /**
         * 注数-前三一码
         */
        zhushu_qsym: function () {
            var budwArr = [];
            $.each($(".cl-1002 ul li[data-name = '不定位'] span.acti"), function (index, value) {
                budwArr.push($.trim($(this).find("i").html()));
            });

            return budwArr.length;
        },
        /**
         * 不定位-五星三码"
         */
        suiji_wx3m:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = [];
        while (arr.length < 3) {
            var zhiHao1 = parseInt(Math.random() * 10);
            var zhiHao2 = parseInt(Math.random() * 10);
            var zhiHao3 = parseInt(Math.random() * 10);
            if (zhiHao1 != zhiHao2 && zhiHao2 != zhiHao3 && zhiHao1 != zhiHao3) {
                arr.push(zhiHao1);
                arr.push(zhiHao2);
                arr.push(zhiHao3);
            }
        }

        showPlayName = "五星-五星三码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + "," + zhiHao3 + ")";
        betContent = zhiHao1 + "," + zhiHao2 + "," + zhiHao3;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-五星二码"
     */
    suiji_wxem: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = this.getRandom2num();
        var zhiHao1 = arr[0];
        var zhiHao2 = arr[1];

        showPlayName = "五星-五星二码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + ")";
        betContent = zhiHao1 + "," + zhiHao2;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    }
        ,
    /**
     * 不定位-五星一码"
     */
    suiji_wxym:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var zhiHao1 = parseInt(Math.random() * 10);

        showPlayName = "五星-五星一码";
        showContent = "不定位: (" + zhiHao1 + ")";
        betContent = zhiHao1;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-后四二码"
     */
    suiji_h4em:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = this.getRandom2num();
        var zhiHao1 = arr[0];
        var zhiHao2 = arr[1];

        showPlayName = "四星-后四二码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + ")";
        betContent = zhiHao1 + "," + zhiHao2;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    }
,
    /**
     * 不定位-后四一码"
     */
    suiji_h4ym: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var zhiHao1 = parseInt(Math.random() * 10);

        showPlayName = "四星-后四一码";
        showContent = "不定位: (" + zhiHao1 + ")";
        betContent = zhiHao1;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    }
,
    /**
     * 不定位-前四二码"
     */
    suiji_q4em:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = this.getRandom2num();
        var zhiHao1 = arr[0];
        var zhiHao2 = arr[1];

        showPlayName = "四星-前四二码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + ")";
        betContent = zhiHao1 + "," + zhiHao2;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-前四一码"
     */
    suiji_q4ym:   function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var zhiHao1 = parseInt(Math.random() * 10);

        showPlayName = "四星-前四一码";
        showContent = "不定位: (" + zhiHao1 + ")";
        betContent = zhiHao1;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-后三二码"
     */
    suiji_hsem:  function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = this.getRandom2num();
        var zhiHao1 = arr[0];
        var zhiHao2 = arr[1];

        showPlayName = "三星-后三二码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + ")";
        betContent = zhiHao1 + "," + zhiHao2;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-后三一码"
     */
    suiji_hsym:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arrTsh = [], newArr = [];
        while (newArr.length < 1) {
            var zhiTsh = parseInt(Math.random() * 10);
            newArr.push(zhiTsh);
        }

        showPlayName = "三星-后三一码";
        showContent = "不定位: (" + newArr[0] + ")";
        betContent = newArr.join("");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

    /**
     * 不定位-前三二码"
     */
    suiji_qsem: function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arr = this.getRandom2num();
        var zhiHao1 = arr[0];
        var zhiHao2 = arr[1];

        showPlayName = "三星-前三二码";
        showContent = "不定位: (" + zhiHao1 + "," + zhiHao2 + ")";
        betContent = zhiHao1 + "," + zhiHao2;

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },

//获取两位0到9之间的随机数
        getRandom2num:  function () {
        var arr = [];
        while (arr.length < 2) {
            var zhiHao1 = parseInt(Math.random() * 10);
            var zhiHao2 = parseInt(Math.random() * 10);
            if (zhiHao1 != zhiHao2) {
                arr.push(zhiHao1);
                arr.push(zhiHao2);
            }
        }
        return arr;
    },

    /**
     * 不定位-前三一码"
     */
    suiji_qsym:function () {
        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        var arrTsh = [], newArr = [];
        while (newArr.length < 1) {
            var zhiTsh = parseInt(Math.random() * 10);
            newArr.push(zhiTsh);
        }

        showPlayName = "三星-前三一码";
        showContent = "不定位: (" + newArr[0] + ")";
        betContent = newArr.join("");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent,
            playGroupId: this.playGroupId
        };
    },
        content_wx3m:  function () {
        var budwArr = [];
        $.each($(".recl-1012-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "五星-五星三码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-五星二码
     */
    content_wxem: function () {
        var budwArr = [];
        $.each($(".recl-1011-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "五星-五星二码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    }
,
    /**
     * 不定位-五星一码
     */
    content_wxym: function () {
        var budwArr = [];
        $.each($(".recl-1010-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "五星-五星一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    }
,

    /**
     * 不定位-后三二码
     */
    content_h4em: function () {
        var budwArr = [];
        $.each($(".recl-1009-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "四星-后四二码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-后四一码
     */
    content_h4ym: function () {
        var budwArr = [];
        $.each($(".recl-1008-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "四星-后四一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-前四二码
     */
    content_q4em: function () {
        var budwArr = [];
        $.each($(".recl-1007-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "四星-前四二码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-前四一码
     */
    content_q4ym: function () {
        var budwArr = [];
        $.each($(".recl-1006-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "四星-前四一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-后三二码
     */
    content_hsem:function () {
        var budwArr = [];
        $.each($(".recl-1005-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "三星-后三二码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-后三一码
     */
    content_hsym: function () {
        var budwArr = [];
        $.each($(".recl-1004-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "三星-后三一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",");

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-前三二码
     */
    content_qsem: function () {
        var budwArr = [];
        $.each($(".recl-1003-budw ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "三星-前三二码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",")

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },

    /**
     * 不定位-前三一码
     */
    content_qsym:function () {
        var budwArr = [];
        $.each($(".cl-1002 ul li[data-name = '不定位'] span.acti"), function (index, value) {
            budwArr.push($.trim($(this).find("i").html()));
        });

        // 初始化变量
        var showPlayName = '';
        var showContent = '';
        var betContent = '';

        showPlayName = "三星-前三一码";
        showContent = "不定位: (" + budwArr.join(",") + ")";
        // 转换投注格式
        betContent = budwArr.join(",")

        return {
            showPlayName: showPlayName,
            showContent: showContent,
            betContent: betContent
        };
    },
        //获取下注号码
        getBetNum:function(obj) {
            var betNum = obj.attr("data-bet_content");
            return betNum;
        }


})
});