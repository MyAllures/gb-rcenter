<a href="javascript:" class="_vr_nickname"></a>
<#if data.playerPopup?string == 'true'>
    <a class="openNewWindow" data-url="${data.contextInfo.playerCenterContext}dialogIndex.html" href="javascript:">Player Center</a>
<#else>
    <a href="${data.contextInfo.playerCenterContext}" target="_blank">Player Center</a>
</#if>
<a href="${data.contextInfo.playerCenterContext}#/operation/pAnnouncementMessage/messageList.html" target="_blank">news <span class="label label-info _vr_messageCount"></span></a>
<a href="${data.contextInfo.playerCenterContext}#/fund/playerTransfer/transfers.html" target="_blank">Quota conversion</a>
<a href="${data.contextInfo.playerCenterContext}#/fund/playerRecharge/recharge.html" target="_blank">Deposit zone</a>
<a href="${data.contextInfo.playerCenterContext}#/player/withdraw/withdrawList.html" target="_blank">withdrawals zone</a>
<div class="btn-group dropdown show-on-hover _vr_balanceBox">
    <a href="javascript:void(0);" class="static-btn" name="balance_show" data-toggle="dropdown">Total Assets <span class="text-warning text-big _vr_player_balance"></span><span class="caret"></span></a>
    <a class="static-btn" name="balance_hide" style="display: none" data-toggle="dropdown"> Total Assets <span class="caret"></span></a>
    <ul class="dropdown-menu dropdown-menu-right members-dropdown" style="width: 166px;">
    <#include "../../../commonPage/en_US/fetchBalance.ftl">
    </ul>
</div>
<a class="btn btn-link" onclick="Logout()" style="margin-top: -7px;padding: 0;">SIGN OUT</a>