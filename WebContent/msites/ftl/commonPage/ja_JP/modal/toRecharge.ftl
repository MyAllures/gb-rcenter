<style>
    .modal-body{background: #fff; color: #333;}
    .recharge-item{ height: 40px; line-height: 40px; font-size: 16px; margin-top: 20px; }
    .recharge-item .btn{border: none; border-radius: 0; vertical-align: inherit;}
    .recharge-item > .text{ text-align: right; color:#466488; }
    .recharge-item > .title{background: #466488; color: #fff; height: 40px; text-align: center; line-height: 40px; }
    .recharge-item > .value{height: 40px; line-height: 40px;box-shadow: inset 0 1px 1px rgba(0,0,0,0.2);}
    .recharge-item > .value, .recharge-item .form-control{background: #ddd; color: #00b7a4; font-size: 20px; text-align: center; font-weight: bold; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;}
    .recharge-item > .value .gui{height: 40px; line-height: 40px;}
    .recharge-item > .sum-btn{padding:0;}
    .recharge-item > .sum-btn .btn{padding: 10px 12px; font-size: 16px;}
    .recharge-item > .sum-btn .gui{}
    .recharge-last{margin-top: 15px; margin-bottom: 20px;}
</style>
<div class="row">
    <div class="col-12-12">
        <form class="form-horizontal" id="loginForm" method="post" action="#">
            <div class="row recharge-item">
                <div class="col-12-2 text"></div>
                <div class="col-12-3 title">殘高</div>
                <div class="col-12-5 value"><span id="walletBalance-value"></span> <a href="javascript:void()"><span class="pull-right gui gui-refresh" id="wallet-refresh-span"></span></a></div>
            </div>
            <div class="row recharge-item">
                <div class="col-12-8 col-offset-12-2 sum-btn submit-btn-confirm">
                    <a class="btn btn-primary btn-block" type="button" id="confirm-btn" target="_blank" href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html">
                        <span class="gui gui-check-square-o"></span> 入金
                    </a>
                </div>
            </div>
            <div class="row recharge-item recharge-last ">
                <div class="col-12-8 col-offset-12-2 sum-btn enter-btn">
                    <button class="btn btn-success btn-block" type="button" onclick="autoPayLogin()"><span class="gui gui-share"></span> ゲーム開始</button>
                </div>
            </div>
        </form>
    </div>
</div>