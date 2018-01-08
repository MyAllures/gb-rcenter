<a href="javascript:" class="_vr_nickname"></a>
<#if data.playerPopup?string == 'true'>
    <a class="openNewWindow" data-url="${data.contextInfo.playerCenterContext}dialogIndex.html" href="javascript:">玩家中心</a>
<#else>
    <a href="${data.contextInfo.playerCenterContext}" target="_blank">玩家中心</a>
</#if>
<a href="${data.contextInfo.playerCenterContext}#/operation/pAnnouncementMessage/messageList.html" target="_blank">消息 <span class="label label-info _vr_messageCount"></span></a>
<a href="${data.contextInfo.playerCenterContext}#/fund/playerTransfer/transfers.html" target="_blank">额度转换</a>
<a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank">存款专区</a>
<a href="${data.contextInfo.playerCenterContext}#/player/withdraw/withdrawList.html" target="_blank">取款专区</a>
<div class="btn-group dropdown show-on-hover _vr_balanceBox">
    <a href="javascript:void(0);" class="static-btn" name="balance_show" data-toggle="dropdown">总资产 <span class="text-warning text-big _vr_player_balance"></span><span class="caret"></span></a>
    <a class="static-btn" name="balance_hide" style="display: none" data-toggle="dropdown"> 总资产 <span class="caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-right members-dropdown" style="width: 166px;">
    <#include "fetchBalance.ftl">
    </ul>
</div>
<a href="javascript:" class="btn btn-link" onclick="Logout()" style="margin-top: -7px;padding: 0;">退出</a>