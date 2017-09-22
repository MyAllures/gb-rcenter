<div id="containerOut" style="display: none">
    <!--容器-->
    <div id="container" class="divBg">
        <!--抽獎頁面-->
        <div id="lotteryPage" class="divBg divClass" >
            <input class="inputClass btnFont" onclick="closePage('containerOut','')" id="lotteryPageBtn_0" value="關閉" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_1" value="拆紅包" onclick="lottery()" type="button"/>
            <input class="inputClass btnFont" id="lotteryPageBtn_2" value="遊戲規則" onclick="showExplain()" type="button"/>
        </div>
        <!--中獎頁面-->
        <div id="haveAwardPage" class="divBg divClass">
            <input class="inputClass btnFont" onclick="closePage('haveAwardPage','lotteryPage')" id="haveAwardPageBtn_0" value="關閉" type="button"/>
            <p class="ab" id="awardname">
                獲得了0元
            </p>
            <input class="inputClass btnFont" onclick="rewardFn()" id="haveAwardPageBtn_2" value="領取紅包" type="button"/>
        </div>
        <!--規則頁面-->
        <div class="divBg divClass" id="explainPage">
            <div id="explainContent" class="ab">

            </div>
            <input class="inputClass btnFont" onclick="closePage('explainPage','lotteryPage')" id="explainPageBtn_0" value="返回" type="button"/>
        </div>
        <!--未中獎頁面-->
        <div class="divBg divClass" id="noAwardPage">
            <input class="inputClass btnFont" onclick="closePage('noAwardPage','lotteryPage')" id="noAwardPageBtn_0" value="關閉" type="button"/>
            <input class="inputClass btnFont" onclick="closePage('noAwardPage','lotteryPage')" id="noAwardPageBtn_1" value="再來一次" type="button"/>
        </div>
        <!--領取頁面-->
        <div class="divBg divClass" id="rewardPage">
            <input class="inputClass btnFont" onclick="closePage('rewardPage','lotteryPage')" id="rewardPageBtn_0" value="確定" type="button"/>
        </div>
        <!--提示-->
        <div class="divBg divClass" id="hitPage" onclick="closePage('hitPage','')">

        </div>
    </div>
</div>