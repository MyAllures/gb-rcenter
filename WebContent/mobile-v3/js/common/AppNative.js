/**
 * 涉及调用app原生方法js
 */


/**
 * 原生自动登录方法
 */
function nativeAutoLogin() {

}

/**
 * 原生跳转登录页面方法
 */
function nativeLogin() {
    window.gamebox.gotoLoginPage();
}

/**
 * 原生资金信息变动
 */
function nativeAccountChange() {
    window.gamebox.notifyAccountChange();
}

/**
 * 原生刷新当前页面
 */
function nativeRefreshPage() {
    window.gamebox.refreshPage();
}

/**
 * 原生返回上一页
 * 如果有上一级页面，就返回上一级
 * 如果没有上一级页面，就不返回，而是提示用户
 */
function nativeGoBackPage() {
    window.gamebox.goBackPage();
}

/**
 * 原生新打开页面
 * @param url
 */
function nativeOpenWindow(url) {
    window.gamebox.startNewWebView(url);
}

/**
 * 原生跳转到资金记录
 */
function nativeGotoTransactionRecordPage() {
    window.gamebox.gotoCapitalRecordPage();
}

/**
 * 原生跳入存款页面
 */
function nativeGotoDepositPage() {
    window.gamebox.gotoDepositPage();
}

/**
 * 原生跳转至优惠记录页面
 */
function nativeGotoPromoRecordPage() {
    window.gamebox.gotoPromoRecordPage();
}


