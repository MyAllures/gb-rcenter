
define(['site/hall/common/PlayWay'], function (PlayWay) {
    return PlayWay.extend({
        arrNum2 : [], //获取点击数的数组
        arrNum3 : [],
        arrNum4 : [],
        arrNum5 : [],
        arrNum6 : [],
        arrNum7 : [],
        arrNum8 : [],
        init: function () {
            _this=this;
            this._super();
        },
        onPageLoad: function () {
            this._super();
            page.refreshView();
        },

        getGfwfAllOdd: function () {
            var _this = this;
            ajaxRequest({
                url: root + '/ssc/getGfwfAllOdd.html',
                async:false,
                data: {code: _this.code},
                success: function (data) {
                    if (!$.isEmptyObject(data)) {
                        _this.gfwfPlJson = data;
                        _this.initSubPage();
                    } else {
                        console.log(name + ":odd is null");
                    }
                }
            })
        },

        //官方玩法。
        clickGfwf: function(){
            var _this=this;
            //官方玩法。
            $(".group ul li p span").click(function () {
                $(".group ul li p span.acti").removeClass("acti");
                $(this).addClass("acti");
                var currentId = $(this).attr('data-play_id');
                if(currentId != null){
                    playId = currentId;
                }
                // 初始化子页面
                _this.initSubPage();
            });
        },




        //初始化11选5胆码计数器全局变量
        initArrNum: function () {
            this.arrNum2.splice(0, this.arrNum2.length);
            this.arrNum3.splice(0, this.arrNum3.length);
            this.arrNum4.splice(0, this.arrNum4.length);
            this.arrNum5.splice(0, this.arrNum5.length);
            this.arrNum6.splice(0, this.arrNum6.length);
            this.arrNum7.splice(0, this.arrNum7.length);
            this.arrNum8.splice(0, this.arrNum8.length);
        },

        arrNumAll : function (obj) {
            var flagNameDanma = obj.parent().parent().hasClass('danma_selected');
            var flagDanMaEm = obj.parent().parent().hasClass('em_danma_selected');
            var flagDanMaSim = obj.parent().parent().hasClass('sim_danma_selected');
            var flagDanMaWm = obj.parent().parent().hasClass('wm_danma_selected');
            var flagDanMaLm = obj.parent().parent().hasClass('lm_danma_selected');
            var flagDanMaQm = obj.parent().parent().hasClass('qm_danma_selected');
            var flagDanMaBm = obj.parent().parent().hasClass('bm_danma_selected');

            var flagNameDantuo = obj.parent().parent().hasClass('dantuo_selected');

            var flagActi = obj.parent().hasClass('acti'); //判断是否再次点击选中的号数

            if (flagNameDanma) {
                _this.getDanmaCommon(this, arrNum3, 2, flagActi);
            } else if (flagDanMaEm) {
                _this.getDanmaCommon(obj, _this.arrNum2, 1, flagActi);
            } else if (flagDanMaSim) {
                _this.getDanmaCommon(this, arrNum4, 3, flagActi);
            } else if (flagDanMaWm) {
                _this.getDanmaCommon(this, arrNum5, 4, flagActi);
            } else if (flagDanMaLm) {
                _this.getDanmaCommon(this, arrNum6, 5, flagActi);
            } else if (flagDanMaQm) {
                _this.getDanmaCommon(this, arrNum7, 6, flagActi);
            } else if (flagDanMaBm) {
                _this.getDanmaCommon(obj, _this.arrNum8, 7, flagActi);
            } else if (flagNameDantuo) {
                var numTuo = parseInt(obj.html());
                obj.parent().parent().parent().parent().find(".danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".em_danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".sim_danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".wm_danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".lm_danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".qm_danma_selected span.n" + numTuo + ".acti").removeClass('acti');
                obj.parent().parent().parent().parent().find(".bm_danma_selected span.n" + numTuo + ".acti").removeClass('acti');

                obj.parent().toggleClass('acti');
                var nameStr = obj.parent().parent().attr('data-name');
                if (nameStr == 'danma2') {
                    _this.minusDanmaNumObj(_this.arrNum2, this);
                } else if (nameStr == 'danma3') {
                    _this.minusDanmaNumObj(_this.arrNum3, this);
                } else if (nameStr == 'danma4') {
                    _this.minusDanmaNumObj(arrNum4, this);
                } else if (nameStr == 'danma5') {
                    _this.minusDanmaNumObj(arrNum5, this);
                } else if (nameStr == 'danma6') {
                    _this.minusDanmaNumObj(arrNum6, this);
                } else if (nameStr == 'danma7') {
                    _this.minusDanmaNumObj(arrNum7, this);
                } else if (nameStr == 'danma8') {
                    _this.minusDanmaNumObj(arrNum8, this);
                }

            } else {
                obj.parent().toggleClass('acti'); // 变色
            }
        },

        zuChengFangan :function () {
            var _this=this;
            //位置选择(任选二，三，四)
            $(".selposition label input").click(function () {
                var flag = $(this).parent().parent().attr("data-flag");
                var obj = $(this).parent().parent();
                var fnId = $(obj).attr("data-name");//方案id
                if (typeof flag != "undefined" && flag == "wei-r2") {
                    _this.getZuChengFangAnR2(obj, fnId);
                } else if (typeof flag != "undefined" && flag == "wei-r3") {
                    _this.getZuChengFangAnR3(obj, fnId);
                } else if (typeof flag != "undefined" && flag == "wei-r4") {
                    _this.getZuChengFangAnR4(obj, fnId);
                }
                _this.renderZhushu();
            });
        },

        teShuHaoClick : function () {
            var _this=this;
            // 内容点击，触发统计注数函数（特殊号）
            $(".Pick ul li.tsh_li span").click(function () {
                $(this).toggleClass('acti_tsh');   // 变色
                // 渲染中部注数，赔率，返点等等
                _this.renderZhushu();
            });
        },

        //任选2 组成方案获取函数
        getZuChengFangAnR2: function(obj, fnId) {
            //选中位置自动获取组成方案-直选单式
            var arrTemp = [];
            $(obj).find("input[type='checkbox']:checked").each(function () {
                arrTemp.push($(this).val());
            });
            if (arrTemp.length == 3) {
                $("#positioninfo-" + fnId + "").html(3);
                $("#positioncount-" + fnId + "").html(3);
            } else if (arrTemp.length == 4) {
                $("#positioninfo-" + fnId + "").html(6);
                $("#positioncount-" + fnId + "").html(4);
            } else if (arrTemp.length == 5) {
                $("#positioninfo-" + fnId + "").html(10);
                $("#positioncount-" + fnId + "").html(5);
            } else if (arrTemp.length == 2) {
                $("#positioninfo-" + fnId + "").html(1);
                $("#positioncount-" + fnId + "").html(2);
            } else if (arrTemp.length == 1) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(1);
            } else {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(0);
            }
        },
        //任选3 组成方案获取函数
        getZuChengFangAnR3: function(obj, fnId) {
            //选中位置自动获取组成方案-直选单式
            var arrTemp = [];
            $(obj).find("input[type='checkbox']:checked").each(function () {
                arrTemp.push($(this).val());
            });
            if (arrTemp.length == 3) {
                $("#positioninfo-" + fnId + "").html(1);
                $("#positioncount-" + fnId + "").html(3);
            } else if (arrTemp.length == 4) {
                $("#positioninfo-" + fnId + "").html(4);
                $("#positioncount-" + fnId + "").html(4);
            } else if (arrTemp.length == 5) {
                $("#positioninfo-" + fnId + "").html(10);
                $("#positioncount-" + fnId + "").html(5);
            } else if (arrTemp.length == 2) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(2);
            } else if (arrTemp.length == 1) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(1);
            } else {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(0);
            }
        },

        //任选4 组成方案获取函数
        getZuChengFangAnR4: function(obj, fnId) {
            //选中位置自动获取组成方案-直选单式
            var arrTemp = [];
            $(obj).find("input[type='checkbox']:checked").each(function () {
                arrTemp.push($(this).val());
            });
            if (arrTemp.length == 3) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(3);
            } else if (arrTemp.length == 4) {
                $("#positioninfo-" + fnId + "").html(1);
                $("#positioncount-" + fnId + "").html(4);
            } else if (arrTemp.length == 5) {
                $("#positioninfo-" + fnId + "").html(5);
                $("#positioncount-" + fnId + "").html(5);
            } else if (arrTemp.length == 2) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(2);
            } else if (arrTemp.length == 1) {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(1);
            } else {
                $("#positioninfo-" + fnId + "").html(0);
                $("#positioncount-" + fnId + "").html(0);
            }
        },

        //胆码增加计数器
        getDanmaCommon: function (obj, numArr, x, flagActi){
            var numDan = parseInt($(obj).html());
            //所选胆码保证小于x个并且当点击时不是被选中的号码
            if (numArr.length >= x && !flagActi) {
                $(obj).parent().parent().find("span.n" + numArr[numArr.length - 1] + ".acti").removeClass('acti');
                numArr.splice(numArr.length - 1, 1);
            }

            //当点击选中号码时相应减去
            if(flagActi){
                minusDanmaNum(numArr, numDan);
            } else{
                numArr.push(parseInt($(obj).html()));
            }

            $(obj).parent().toggleClass('acti');
            //点击胆码时去掉相应的胆码选号
            $(obj).parent().parent().parent().parent().find(".dantuo_selected span.n" + numDan + ".acti").removeClass('acti');

            var sumSelectedTuodan = $(obj).parent().parent().find("span.acti").length;
            if(sumSelectedTuodan <= 0){
                numArr.splice(0, numArr.length);
            }

        },

        //胆码减少计数器
        minusDanmaNumObj: function(numArr, obj){
            var indexVal = numArr.indexOf(parseInt($(obj).html()));
            if(indexVal > -1){
                numArr.splice(indexVal, 1);
            }
        }   ,
        //胆码减少计数器
        minusDanmaNum: function(numArr, num){
            var indexVal = numArr.indexOf(num);
            if(indexVal > -1){
                numArr.splice(indexVal, 1);
            }
        },

        //删除重复号码
        delRrepet: function() {
            console.log(123456);
            var _this = this;
            var textStr = $("div.content_jiang").find(".content_tex").val();
            if (typeof (textStr)!= "undefined") {
                var newArr = [], repeatArr = [], tempArr = [];
                textStr = $.trim(textStr.replace(/[^0-9]/g, ','));
                var arr_new = textStr.split(",");
                for (var i = 0; i < arr_new.length; i++) {
                    if (arr_new[i].toString().length > 0) {
                        newArr.push(arr_new[i]);
                    }
                }
                var playcode = _this.getPlayCode();
                if (playcode == 'ssc_sanxing_zuxuan' || playcode == 'ssc_erxing_zuxuan') {//一些需要无序去重的玩法
                    repeatArr = newArr.duplicateNewa().uniqueArra();
                    tempArr = newArr.uniqueArra();
                } else {
                    repeatArr = newArr.duplicateNew().uniqueArr();
                    tempArr = newArr.uniqueArr();
                }
                if (repeatArr.length > 0) {
                    // _this.alertContext = "已删除掉重复号: " + repeatArr.join(" ");
                    _this.alertmsg("已删除掉重复号: " + repeatArr.join(" "));
                    $(".content_jiang .content_tex").val(tempArr.join(" "));
                }
            }
        },

        checkTeshu : function(plSelName,plSelIndex){
            var _this=this;
            var plSelVal=0;
            if ($.inArray(this.getPlayId(), ["ssc_sanxing_zuxuan_qsts","ssc_sanxing_zuxuan_hsts"]) >= 0) {
                var l = $('.cl-1015-tsh ul li span.acti_tsh').length;
                if (l == 1) {
                    $('.cl-1015-tsh ul li span.acti_tsh').each(function () {
                        plSelName = $(this).html();
                    });
                    if (plSelName == '豹子') {
                        plSelIndex = 0;
                    } else if (plSelName == '顺子') {
                        plSelIndex = 1;
                    } else if (plSelName == '对子') {
                        plSelIndex = 2;
                    }
                }else {
                    plSelName = $('.cl-1015-tsh ul li span.acti_tsh').html();
                    if (plSelName == '豹子') {
                        plSelIndex = 0;
                    } else if (plSelName == '顺子') {
                        plSelIndex = 1;
                    } else if (plSelName == '对子') {
                        plSelIndex = 2;
                    }
                }
                var tempNum = $("#jiangjin-change").data("plStr");
                plSelVal = (tempNum.split("|"))[plSelIndex];
            } else {
                plSelVal = $("#jiangjin-change").data("value");
            }
            return plSelVal;
        },

        suiJiTeshu : function(betContent){
            if ($.inArray(_this.getPlayId(), ["ssc_sanxing_zuxuan_qsts","ssc_sanxing_zuxuan_hsts"]) >= 0) {
                var plSelName = betContent;
                var plSelIndex = 0;
                var plSelVal = 0;
                if (plSelName == '豹子') {
                    plSelIndex = 0;
                } else if (plSelName == '顺子') {
                    plSelIndex = 1;
                } else if (plSelName == '对子') {
                    plSelIndex = 2;
                }
                var tempNum = $("#jiangjin-change").data("plStr");
                plSelVal = (tempNum.split("|"))[plSelIndex];
            } else {
                plSelVal = $("#jiangjin-change").data("value");
            }
            return plSelVal;
        },

        //后三直选--获取所选号码分散为三位所有组合的和值
        getHezNewArrs:function (hZArr) {
            var heZhiArr = [], shuArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = hZArr;

            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //所选号码分解至零，被分解出所有的号码三个为一组，所组成的所有组合的每一组值等于所选号的值的组合数
                for (var n = 0; n < temp.length; n++) {
                    for (var m = 0; m < temp.length; m++) {
                        for (var mn = 0; mn < temp.length; mn++) {
                            if (temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9) {
                                fjHaoZuhe.push(temp[n] + "" + temp[m] + "" + temp[mn]);
                            }
                        }
                    }
                }
                tempArr = fjHaoZuhe.uniqueArr();
            }
            return tempArr;
        },

// 获取万、千、百、十、个固定位数的个数所组成5位所有组合
        getNewArrs: function(wanA, qianA, baiA, shiA, geA) {
            var wArr = [], qArr = [], bArr = [], sArr = [], gArr = [];
            wArr = wanA;
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var w = 0; w < wArr.length; w++) {
                for (var q = 0; q < qArr.length; q++) {
                    for (var b = 0; b < bArr.length; b++) {
                        for (var s = 0; s < sArr.length; s++) {
                            for (var g = 0; g < gArr.length; g++) {
                                tempArr.push(wArr[w] + "" + qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                            }
                        }
                    }
                }
            }
            return tempArr;
        },
        // 获取千、百、十、个固定位数的个数所组成4位所有组合
        getFourNewArrs:function (qianA, baiA, shiA, geA) {
            var qArr = [], bArr = [], sArr = [], gArr = [];
            qArr = qianA;
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var q = 0; q < qArr.length; q++) {
                for (var b = 0; b < bArr.length; b++) {
                    for (var s = 0; s < sArr.length; s++) {
                        for (var g = 0; g < gArr.length; g++) {
                            tempArr.push(qArr[q] + "" + bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        }
                    }
                }
            }
            return tempArr;
        },
        // 获取百、十、个固定位数的个数所组成(后三直选--后三组合)
        getHszhNewArrs:  function (baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                        tempArr.push(sArr[s] + "" + gArr[g]);
                        tempArr.push(gArr[g]);
                    }
                }
            }
            return tempArr;
        },
// 后三直选-跨度所选跨度值所有组合
        getKaduNewArrs: function(kDArr) {
            var kaDuArr = [], tempArr1 = [], tempArr2 = [], tempArr3 = [];
            var allArr = [];
            for (var t = 0; t < 10; t++) {
                tempArr1[t] = t;
                tempArr2[t] = t;
                tempArr3[t] = t;
            }
            var maxZhi = 0, minZhi = 0, tempZhi = 0;
            kaDuArr = kDArr;
            for (var i = 0; i < kaDuArr.length; i++) {
                tempZhi = parseInt(kaDuArr[i]);
                for (var n = 0; n < tempArr1.length; n++) {
                    for (var n1 = 0; n1 < tempArr2.length; n1++) {
                        for (var n2 = 0; n2 < tempArr3.length; n2++) {
                            maxZhi = tempArr1[n] > tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            maxZhi = maxZhi > tempArr3[n2] ? maxZhi : tempArr3[n2];
                            minZhi = tempArr1[n] < tempArr2[n1] ? tempArr1[n] : tempArr2[n1];
                            minZhi = minZhi < tempArr3[n2] ? minZhi : tempArr3[n2];
                            if ((maxZhi - minZhi) == tempZhi) {
                                allArr.push(n + "" + n1 + "" + n2);
                                maxZhi = 0;
                                minZhi = 0;
                            }
                        }
                    }
                }
            }
            return allArr;
        },
        /**
         * 后三组选-组三复式
         */
        getZuXuanNewArrs:function(zuXuanArr) {
            var tempArr = [], zxArr = [];
            zxArr = zuXuanArr;

            for (var i = 0; i < zxArr.length - 1; i++) {
                for (var i1 = 1; i1 < zxArr.length; i1++) {
                    if (zxArr[i1] != zxArr[i]) {
                        tempArr.push(zxArr[i] + "" + zxArr[i1] + "" + zxArr[i1]);
                        tempArr.push(zxArr[i1] + "" + zxArr[i] + "" + zxArr[i]);
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            return tempArr;
        },


        //后三组选-组选包胆
        getZxbdNewArrs:function(zuXuanArr) {
            var tempArr = [], bdArr = [];
            bdArr = zuXuanArr;
            for (var n = 0; n < bdArr.length; n++) {
                for (var n1 = 0; n1 < 10; n1++) {
                    for (var n2 = 0; n2 < 10; n2++) {
                        if (bdArr[n] != n1 && bdArr != n2 && n1 != n2 || n1 == n2 && bdArr[n] != n2 || n2 == bdArr[n] && bdArr[n] != n1 || n1 == bdArr[n] && bdArr[n] != n2) {
                            var sortArr = [];
                            sortArr.push(bdArr[n]);
                            sortArr.push(n1);
                            sortArr.push(n2);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }

            tempArr = tempArr.uniqueArr();
            return tempArr;
        },

        //后三组选-组六复式
        getZuLiuNewArrs:function(zuXuanArr) {
            var tempArr = [], zxArr = [];
            zxArr = zuXuanArr;
            for (var i = 0; i < zxArr.length; i++) {
                for (var i1 = 0; i1 < zxArr.length; i1++) {
                    for (var i2 = 0; i2 < zxArr.length; i2++) {
                        if (zxArr[i] != zxArr[i1] && zxArr[i1] != zxArr[i2] && zxArr[i] != zxArr[i2]) {
                            var sortArr = [];
                            sortArr.push(zxArr[i]);
                            sortArr.push(zxArr[i1]);
                            sortArr.push(zxArr[i2]);
                            sortArr.sort();
                            tempArr.push(sortArr.join(""));
                        }
                    }
                }
            }
            tempArr = tempArr.uniqueArr();
            return tempArr;
        },

        //后三组选-组选和值
        getZxhzNewArrs:function(zuXuanArr) {
            var heZhiArr = [], tempArr = [];
            var sumTemp = 0;
            var num = 0; //当前号码
            var fjHaoZuhe = []; //分解号组合

            heZhiArr = zuXuanArr;
            //号码分解---所选号分解成所有组合的值等于此号的所有组合
            for (var i = 0; i < heZhiArr.length; i++) {
                var temp = [];
                sumTemp = parseInt(heZhiArr[i]);
                num = parseInt(heZhiArr[i]);
                while (sumTemp >= 0) {
                    temp.push(sumTemp);
                    sumTemp--;
                }

                //获取所选号的组选三和组选六形态的所有组数（不包含豹子号、顺序不限）
                for (var n = 0; n < temp.length; n++) {
                    for (var m = 0; m < temp.length; m++) {
                        for (var mn = 0; mn < temp.length; mn++) {
                            if (temp[n] + temp[m] + temp[mn] == num && temp[mn] <= 9 && temp[m] <= 9 && temp[n] <= 9) {
                                if (temp[m] != temp[n] && temp[n] != temp[mn] && temp[mn] != temp[n]) {
                                    var sortArr = [];
                                    sortArr.push(temp[n]);
                                    sortArr.push(temp[m]);
                                    sortArr.push(temp[mn]);
                                    sortArr.sort();
                                    fjHaoZuhe.push(sortArr.join(""));

                                }
                            }
                        }
                    }
                }

            }
            tempArr = fjHaoZuhe.uniqueArr();
            return tempArr;
        },
        // 获取百、十、个固定位数的个数所组成3位所有组合
        getThreeNewArrs:function(baiA, shiA, geA) {
            var bArr = [], sArr = [], gArr = [];
            bArr = baiA;
            sArr = shiA;
            gArr = geA;
            var tempArr = [];
            for (var b = 0; b < bArr.length; b++) {
                for (var s = 0; s < sArr.length; s++) {
                    for (var g = 0; g < gArr.length; g++) {
                        tempArr.push(bArr[b] + "" + sArr[s] + "" + gArr[g]);
                    }
                }
            }
            return tempArr;
        },

    })
});