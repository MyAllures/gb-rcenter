<li>
    <a href="javascript:" onclick="balanceStatus()"><span class="eye pull-right gui gui-eye" title="残高表示隠し"></span>殘高 <span class="_vr_wallet_balance"></span></a>
    <input type="hidden" name="balanceStatus" value="0" />
</li>
<li class="divider _vr_f_refresh"></li>
<li name="apiPreNode">
<#if (data.isAutoPay?c) == 'true'>
    <a href="javascript:" onclick="recoveryApi()"><span class="icon-back-m"></span>ワンクリック回収</a>
</#if>
    <a href="javascript:" onclick="getApiBalance()"><span class="pull-right gui gui-refresh"></span>最新残高</a>
</li>
<li class="divider"></li>

