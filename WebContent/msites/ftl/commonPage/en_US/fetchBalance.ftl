<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/en_US/msiteCommonContent/fetchBalance.ftl">-->
<li>
    <a href="javascript:" onclick="balanceStatus()"><span class="eye pull-right gui gui-eye" title="Hide the balance"></span>Balance <span class="_vr_wallet_balance"></span></a>
    <input type="hidden" name="balanceStatus" value="0" />
</li>
<li class="divider _vr_f_refresh"></li>
<li name="apiPreNode">
<#if (data.isAutoPay?c) == 'true'>
    <a href="javascript:" onclick="recoveryApi()"><span class="icon-back-m"></span>One key recovery</a>
</#if>
    <a href="javascript:" onclick="getApiBalance()"><span class="pull-right gui gui-refresh"></span>Refresh the balance</a>
</li>
<li class="divider"></li>