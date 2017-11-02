
define(['site/hall/pk10/GfwfPlayWay'], function (PlayWay) {
    return PlayWay.extend({
        playId : 'qszxfs',
        init: function () {
            this._super();
        },


        content_qszxfs:function () {
            var zhushu=0;
            var dxdsWrr=[], dxdsQArr=[], dxdsBArr=[], tempArr=[];
            $.each($(".recl-1002 ul li[data-name = '冠军'] span.acti"), function (index,value) {
                dxdsWrr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '亚军'] span.acti"), function (index, value) {
                dxdsQArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name = '季军'] span.acti"), function (index, value) {
                dxdsBArr.push($.trim($(this).find("i").html()));
            });
            for (var n = 0;n<dxdsWrr.length;n++){
                for(var m=0;m<dxdsQArr.length;m++){
                    for(var j=0;j<dxdsBArr.length;j++){
                        tempArr.push(dxdsWrr[n]+""+dxdsQArr[m]+""+dxdsBArr[j]);
                    }
                }
            }
            if(dxdsWrr.length<=0 || dxdsQArr.length<=0 || dxdsBArr.length<=0){
                return;
            }

            //初始化变量
            var showPlayName='';
            var showContent='';
            var betContent='';

            var arr =[
                dxdsWrr.join(","),
                dxdsQArr.join(","),
                dxdsBArr.join(","),

            ];
            showPlayName ="前三直选-直选复式";
            showContent="冠军:({0}),亚军:({1}),季军:({2})".format(arr[0],arr[1],arr[2]);
            betContent = "{0}|{1}|{2}".format(arr[0], arr[1], arr[2]);

            return {
                showPlayName:showPlayName,
                showContent:showContent,
                betContent:betContent
            };
        },
        /**
         * 前三-直选复式
         */
        zhushu_qszxfs:function () {
            var tempArr=[];
            var wanArr=[], qianArr=[],baiArr=[];
            $.each($(".recl-1002 ul li[data-name='冠军'] span.acti"),function () {
                wanArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name='亚军'] span.acti"),function () {
                qianArr.push($.trim($(this).find("i").html()));
            });
            $.each($(".recl-1002 ul li[data-name='季军'] span.acti"),function () {
                baiArr.push($.trim($(this).find("i").html()));
            });

            var wanLength = wanArr.length;
            var qianLength=qianArr.length;
            var baiLength=  baiArr.length;

            if(wanLength<=0 || qianLength<=0 || baiLength<=0){
                return 0;
            }

            for(var i=0;i<wanArr.length;i++){
                for(var m=0;m<qianArr.length;m++){
                    for (var n=0;n<baiArr.length;n++){
                        if(wanArr[i]!=qianArr[m] && wanArr[i]!=baiArr[n] && qianArr[m]!=baiArr[n]){
                            tempArr.push(wanArr[i]+""+qianArr[m]+""+baiArr[n]);
                        }
                    }
                }
            }
            return tempArr.length
        },
        /**
         * 前三直选-复式
         */
         suiji_qszxfs:function(){
             //初始变量
            var showPlayName='';
            var showContent='';
            var betContent='';

            var arrTsh =[], newArr=[];
            arrTsh = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
            while(newArr.length<1){
                var zhiTsh1=arrTsh[parseInt(Math.random()*10)];
                var zhiTsh2=arrTsh[parseInt(Math.random()*10)];
                var zhiTsh3=arrTsh[parseInt(Math.random()*10)];

                if (zhiTsh1 != zhiTsh2 && zhiTsh1 != zhiTsh3 && zhiTsh3 != zhiTsh2) {
                    newArr.push(zhiTsh1);
                    newArr.push(zhiTsh2);
                    newArr.push(zhiTsh3);
                }
            }
            showPlayName="前三直选-直选复式";
            showContent = "冠军: (" + newArr[0] + ") 亚军: (" + newArr[1] + ") 季军 : (" + newArr[2] + ")";
            betContent = newArr[0] + "|" + newArr[1] + "|" + newArr[2];

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };

        },
        /**
         * 前三直选-直选单式
         */
        content_qszxds:function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var newArr = [];
            var errorArr = [];
            var tempArr = [];
            var errorStr = '';
            var zhushu = 0;

            textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
            textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
            textStr = $.trim(textStr.replace(/\s/g,""));
            var arr_new = textStr.split(',');
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 6) {
                    newArr.push(arr_new[i]);
                } else {
                    if (arr_new[i] != '') {
                        errorArr.push(arr_new[i]);
                    }
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 2);
                var twoStr = temp.substr(2, 2);
                var threeStr = temp.substr(4, 2);

                if(oneStr != twoStr && oneStr != threeStr && threeStr != twoStr){

                    if((parseInt(oneStr)>0 && parseInt(oneStr)<11 && parseInt(twoStr)>0 && parseInt(twoStr)<11)&& parseInt(threeStr)>0 && parseInt(threeStr)<11){
                        tempArr.push(oneStr +" "+ twoStr+" " + threeStr);
                    }else {
                        return;
                    }
                }
            }

            if (tempArr.length <= 0) {
                return 0;
            }

            if (errorArr.length > 0) {
                for (var e = 0; e < errorArr.length; e++) {
                    errorStr += errorArr[e] + "";
                }
                alert("被过滤掉的错误号码" + errorStr);
            }

            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            showPlayName = "前三直选-直选单式";
            showContent = "号码: (" + tempArr.join(',') + ")";
            // 转换投注格式
            betContent = tempArr.join(',');

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent
            };
        },
        /**
         * 注数 前三-直选单式
         */
        zhushu_qszxds:function () {
            var textStr = $(".recl-1003 .content_jiang .content_tex").val();
            var tempArr = [];
            var newArr = [];
            textStr = textStr.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
            textStr = $.trim(textStr.replace(/[^01,02,03,04,05,06,07,08,09,10,11,' ']/g, ','));
            textStr = $.trim(textStr.replace(/\s/g,""));
            var arr_new = textStr.split(',');
            for (var i = 0; i < arr_new.length; i++) {
                if (arr_new[i].toString().length > 0 && arr_new[i].toString().length == 6) {
                    newArr.push(arr_new[i]);
                }
            }
            for (var n = 0; n < newArr.length; n++) {
                var temp = newArr[n].toString();
                var oneStr = temp.substr(0, 2);
                var twoStr = temp.substr(2, 2);
                var threeStr = temp.substr(4, 2);
                if (oneStr != twoStr && twoStr != threeStr && oneStr != threeStr) {
                    if (parseInt(oneStr) > 0 && parseInt(oneStr) < 11 && parseInt(twoStr)>0 && parseInt(twoStr) < 11&& parseInt(threeStr)>0 && parseInt(threeStr) < 11) {
                        tempArr.push(newArr[n]);
                    }else{
                        return ;
                    }
                }
            }
            if (tempArr.length <= 0) {
                return 0;
            }

            return tempArr.length;
        },
        /**
         * 前3直选-直选单式
         */
        suiji_qszxds:function () {
            // 初始化变量
            var showPlayName = '';
            var showContent = '';
            var betContent = '';

            var arrTsh = [], newArr = [];
            arrTsh = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

            while (newArr.length < 3) {
                var zhiTsh1 = arrTsh[parseInt(Math.random() * 10)];
                var zhiTsh2 = arrTsh[parseInt(Math.random() * 10)];
                var zhiTsh3 = arrTsh[parseInt(Math.random() * 10)];
                if (zhiTsh1 != zhiTsh2 && zhiTsh1 != zhiTsh3 && zhiTsh3 != zhiTsh2) {
                    newArr.push(zhiTsh1+" ");
                    newArr.push(zhiTsh2+" ");
                    newArr.push(zhiTsh3);
                }
            }


            showPlayName = "前三直选-直选单式";
            showContent = "号码: (" + newArr.join('') + ")";
            betContent = newArr.join('');

            return {
                showPlayName: showPlayName,
                showContent: showContent,
                betContent: betContent,
                playGroupId: this.playGroupId
            };
        },
        //删除重复号码
        delRrepet: function() {

        }


})
});
