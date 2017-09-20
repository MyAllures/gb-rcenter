<header class="game-header">
    <!--nav-part-->
    <div class="nav-part">
        <div class="container">
            <!--header-form-->
            <div class="header-form clearfix">
                <div class="container">
                    <!--logo-->
                    <div class="logo">
                        <a href="/"><img src="${data.configInfo.sitePath}/images/logo.png"/></a>
                    </div>
                    <!--form-->
                    <div class="form-wrap pull-right">
                        <!--panel-->
                        <div class="header-panel _vr_loginSuccess" style="display: none">
                            <a href="javascript:" class="_vr_nickname"></a>
                            <a href="${data.contextInfo.playerCenterContext}" target="_blank">玩家中心</a>
                            <a href="${data.contextInfo.playerCenterContext}#/operation/pAnnouncementMessage/messageList.html" target="_blank">消息 <span class="label label-info _vr_messageCount"></span></a>
                            <a href="${data.contextInfo.playerCenterContext}#/fund/playerTransfer/transfers.html" target="_blank">额度转换</a>
                            <a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank">存款专区</a>
                            <a href="${data.contextInfo.playerCenterContext}#/player/withdraw/withdrawList.html" target="_blank">取款专区</a>
                            <div class="btn-group dropdown show-on-hover _vr_balanceBox">
                                <a href="javascript:void(0);" class="static-btn" name="balance_show" data-toggle="dropdown">总资产 <span class="text-warning text-big _vr_player_balance"></span><span class="caret"></span></a>
                                <a class="static-btn" name="balance_hide" style="display: none" data-toggle="dropdown"> 总资产 <span class="caret"></span></a>
                                <ul class="dropdown-menu dropdown-menu-right members-dropdown" style="width: 166px;">
                                <#include "../../../commonPage/zh_CN/fetchBalance.ftl">
                                </ul>
                            </div>
                            <a class="btn btn-link" onclick="Logout()" style="margin-top: -7px;padding: 0;">退出</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>