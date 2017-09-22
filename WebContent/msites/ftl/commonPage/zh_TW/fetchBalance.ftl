<li>
    <a href="javascript:" onclick="balanceStatus()"><span class="eye pull-right gui gui-eye" title="隱藏餘額"></span>餘額 <span class="_vr_wallet_balance"></span></a>
    <input type="hidden" name="balanceStatus" value="0" />
</li>
<li class="divider _vr_f_refresh"></li>
<li name="apiPreNode">
<#if (data.isAutoPay?c) == 'true'>
    <a href="javascript:" onclick="recoveryApi()"><span class="icon-back-m"></span>一鍵回收</a>
</#if>
    <a href="javascript:" onclick="getApiBalance()"><span class="pull-right gui gui-refresh"></span>重新整理餘額</a>
</li>
<li class="divider"></li>