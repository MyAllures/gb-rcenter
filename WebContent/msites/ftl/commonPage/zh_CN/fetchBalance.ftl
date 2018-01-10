<#--旧版,待删除：如需引用，请引用<#include "../../commonPage/zh_CN/msiteCommonContent/fetchBalance.ftl">-->
<li>
    <a href="javascript:" onclick="balanceStatus()"><span class="eye pull-right gui gui-eye" title="隐藏余额"></span>余额 <span class="_vr_wallet_balance"></span></a>
    <input type="hidden" name="balanceStatus" value="0" />
</li>
<li class="divider _vr_f_refresh"></li>
<li name="apiPreNode">
<#if (data.isAutoPay?c) == 'true'>
    <a href="javascript:" onclick="recoveryApi()"><span class="icon-back-m"></span>一键回收</a>
</#if>
    <a href="javascript:" onclick="getApiBalance()"><span class="pull-right gui gui-refresh"></span>刷新余额</a>
</li>
<li class="divider"></li>

