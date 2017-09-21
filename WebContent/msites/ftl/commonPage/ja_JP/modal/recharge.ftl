<style>
    .modal-body{background: #fff; color: #333;}
    .recharge-item{ height: 40px; line-height: 40px; font-size: 16px; margin-top: 20px; }
    .recharge-item .btn{border: none; border-radius: 0; vertical-align: inherit;}
    .recharge-item > .text{ text-align: right; color:#466488; }
    .recharge-item > .title{background: #466488; color: #fff; height: 40px; text-align: center; line-height: 40px; }
    .recharge-item > .value{height: 40px; line-height: 40px;box-shadow: inset 0 1px 1px rgba(0,0,0,0.2);}
    .recharge-item > .value, .recharge-item .form-control{background: #ddd; color: #00b7a4; font-size: 20px; text-align: center; font-weight: bold; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;}
    .recharge-item > .value .gui{height: 40px; line-height: 40px;}
    .recharge-item .form-control{border: none;background: none; box-shadow:none;}
    .recharge-item .form-control::-webkit-input-placeholder {color:#aaa;}
    .recharge-item .form-control::-moz-placeholder {color:#aaa;}
    .recharge-item .form-control:focus::-webkit-input-placeholder {color:#ccc;}
    .recharge-item .form-control:focus::-moz-placeholder {color:#ccc;}
    .recharge-item > .sum-btn{padding:0;}
    .recharge-item > .sum-btn .btn{padding: 10px 12px; font-size: 16px;}
    .recharge-item > .sum-btn .gui{}
    .recharge-last{margin-top: 15px; margin-bottom: 20px;}
</style>
<div class="row">
    <div class="col-12-12">
        <form class="form-horizontal" id="loginForm" method="post" action="#">
            <div class="row recharge-item">
                <div class="col-12-5 text">トランスファーアウト</div>
                <div class="col-12-2 title">マイウォレット</div>
                <div class="col-12-3 value"><span id="walletBalance-value"></span> <a href="javascript:refreshWalletBalance()"><span class="pull-right gui gui-refresh" id="wallet-refresh-span"></span></a></div>
                <div class="col-12-2">
                    <a class="btn btn-primary" data-win-size="2" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html">入金</a>
                    <#--<a class="btn btn-primary" href="">去充值</a>-->
                </div>
            </div>
            <div class="row recharge-item">
                <div class="col-12-5 text">トランスファーイン</div>
                <div class="col-12-2 title" id="api-name-div"></div>
                <div class="col-12-3 value"><span id="apiBalance-value"></span> <a href="javascript:refreshApiBalance()"><span class="pull-right gui gui-refresh" id="api-refresh-span"></span></a></div>
                <div class="col-12-2"></div>
            </div>
            <div class="row recharge-item">
                <div class="col-12-3 col-offset-12-2 title">￥</div>
                <div class="col-12-5 value">
                    <input type="text" class="form-control" id="transferAmount" name="transferAmount" placeholder="整数を入れてください。">
                    <span></span>
                    <input type="hidden" name="gb.token" id="token">
                </div>
                <div class="col-12-2"></div>
            </div>
            <div class="row recharge-item">
                <div class="col-12-8 col-offset-12-2 sum-btn submit-btn-confirm">
                    <button class="btn btn-primary btn-block" type="button" id="confirm-btn" onclick="confirmTransction()">
                        <span class="gui gui-check-square-o"></span> トランスファー確認
                    </button>
                </div>
            </div>
            <div class="row recharge-item recharge-last ">
                <div class="col-12-8 col-offset-12-2 sum-btn enter-btn">
                    <button class="btn btn-success btn-block" type="button" onclick="enterToGame()"><span class="gui gui-share"></span> ゲーム開始</button>
                </div>
            </div>
        </form>
    </div>
</div>