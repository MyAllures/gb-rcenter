<div id="containerOut" style="display: none">
    <!--容器-->
    <div id="container" class="divBg">
        <!--抽奖页面-->
        <div id="lotteryPage" class="divBg divClass" >
            <input class="inputClass btnFont" onclick="closePage('containerOut','')" id="lotteryPageBtn_0" value="关闭" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_1" value="拆红包" onclick="lottery()" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_2" value="游戏规则" onclick="showExplain()" type="button"/>
        </div>
        <!--中奖页面-->
        <div id="haveAwardPage" class="divBg divClass">
            <input class="inputClass btnFont" onclick="closePage('haveAwardPage','lotteryPage')" id="haveAwardPageBtn_0" value="关闭" type="button"/>
            <p class="ab" id="awardname">
                获得了0元
            </p>
            <input class="inputClass btnFont" onclick="rewardFn()" id="haveAwardPageBtn_2" value="领取红包" type="button"/>
        </div>
        <!--规则页面-->
        <div class="divBg divClass" id="explainPage">
            <div id="explainContent" class="ab">

            </div>
            <input class="inputClass btnFont" onclick="closePage('explainPage','lotteryPage')" id="explainPageBtn_0" value="返回" type="button"/>
        </div>
        <!--未中奖页面-->
        <div class="divBg divClass" id="noAwardPage">
            <input class="inputClass btnFont" onclick="closePage('noAwardPage','lotteryPage')" id="noAwardPageBtn_0" value="关闭" type="button"/>
            <input class="inputClass btnFont" onclick="closePage('noAwardPage','lotteryPage')" id="noAwardPageBtn_1" value="再来一次" type="button"/>
        </div>
        <!--领取页面-->
        <div class="divBg divClass" id="rewardPage">
            <input class="inputClass btnFont" onclick="closePage('rewardPage','lotteryPage')" id="rewardPageBtn_0" value="确定" type="button"/>
        </div>
        <!--提示-->
        <div class="divBg divClass" id="hitPage" onclick="closePage('hitPage','')">

        </div>
    </div>
</div>