<div>
    <div class="col-md-12">
        <#if data.playerValidateRegisterMap.regProtocol??>
        ${data.playerValidateRegisterMap.regProtocol.value?replace('\n','')?replace('\r','')}
        </#if>
    </div>
</div>
