iapiConf = {
    "loginServer": "login.grandmandarin88.com",
    "casinoname": "longsnake88",
    "clientSkin": "longsnake88",
    "clientType": "casino",
    "clientPlatform": "mobile",
    "clientVersion": null,
    "systemId": "424",
    "serviceType": "GamePlay",
    "loginDomainRetryCount": "2",
    "loginDomainRequestTimeout": "30",
    "loginDomainRetryInterval": "1"
};

var iapiERR_OK = 0;
var iapiERR_NOK = -1;
var iapiERR_BLOCKED = -2;

var iapiCALLOUT_LOGIN = 'Login';
var iapiCALLOUT_TEMPORARYTOKEN = 'GetTemporaryAuthenticationToken';
var iapiCALLOUT_LOGINANDGETTEMPTOKEN = 'LoginAndGetTempToken';
var iapiCALLOUT_SESSIONVALIDATION = 'ValidateLoginSession';
var iapiCALLOUT_MESSAGES = 'GetWaitingMessages';
var iapiCALLOUT_SUBMITDIALOG = 'SubmitDialog';
var iapiCALLOUT_FORGOTPASSWORD = 'ForgotPassword';
var iapiCALLOUT_ONLINEFORGOTPASSWORD = 'OnlineForgotPassword';
var iapiCALLOUT_GETLOGGEDINPLAYER = 'GetLoggedInPlayer';
var iapiCALLOUT_KEEPALIVE = 'KeepAlive';
var iapiCALLOUT_LOGOUT = 'Logout';

var iapiEVENT_TIMER = 10;

var iapiUsername = null; // remember username
var iapiPassword = null; // remember password, at least temporary
var iapiAdminUsername = null;
var iapiRealMode = 1; // real mode for login
var iapiAuthenticationType = null; // remember authentication type
var iapiDivname = 'iapidiv'; // div name
var iapiIframename = 'iapiiframe'; // iframe name
var iapiRealCookieIframe = 'iapirealcookieiframe'; // client cookie realmode iframe name
var iapiFunCookieIframe = 'iapifuncookieiframe'; // client cookie funmode iframe name
var iapiGetLoggedInPlayerRequestIdReal = 1234567890; // get logged in player request id is fixed, real
var iapiGetLoggedInPlayerRequestIdFun = 9876543210; // get logged in player request id is fixed, fun
var iapiClientParams = []; // defined by integration page
var iapiWaitingMessagesId = 0; // to remember waiting messages requestId
var iapiRememberMeLogin = null;

var iapiCalloutFunctions = []; // defined by integration page
var iapiRequestIds = []; // id's and callout types for requests

var iapiLoginSuccess = false; // login success
var iapiSessionValid = 0; // session valid (from login)

var iapiNextLogin = null; // if login is in progress, then remember next login

var iapiLoginModeDownload = false; // when download login is in progress
var iapiLoginModeFlash = false; // when flash login is in progress
var iapiFlashLoginClientType = null; // remember flash login client type
var iapiFlashLoginGameType = null; // remember flash login game type

var iapiMessagesSupported = false; // support receiving messages
var iapiMessagesAnswered = false; // support sending messages to php scripts

// enum, list of available authentication types
var iapiLoginTypes = {
    SESSION_TOKEN: 'sessionToken',
    EXTERNAL_TOKEN: 'externalToken',
    ADMIN_USERNAME: 'adminUsername',
    NICKNAME: 'nickname'
};

// public, login with username and password, and realMode (1/0) and language code in lowercase
function iapiLogin(user, pass, realMode, language, rememberMeLogin) {
    iapiLoginModeDownload = false;
    iapiLoginModeFlash = false;
    iapiAuthenticationType = iapiConf['authenticationType'];
    iapiBaseLogin(user, pass, realMode, language, rememberMeLogin);
    return iapiERR_OK;
}
// public, login with external token, and realMode (1/0) and language code in lowercase
function iapiLoginExternalToken(token, realMode, language) {
    iapiLoginModeDownload = false;
    iapiLoginModeFlash = false;
    iapiAuthenticationType = iapiLoginTypes.EXTERNAL_TOKEN;
    iapiBaseLogin(null, token, realMode, language);
    return iapiERR_OK;
}

// public, login with admin username, token, realMode (1/0), language code in lowercase and player username
function iapiLoginAdminUsername(adminUser, token, realMode, language, user) {
    iapiLoginModeDownload = false;
    iapiLoginModeFlash = false;
    iapiAuthenticationType = iapiLoginTypes.ADMIN_USERNAME;
    iapiAdminUsername = adminUser;
    iapiBaseLogin(user, token, realMode, language);
    return iapiERR_OK;
}

// public, login with session token, and realMode (1/0) and language code in lowercase
function iapiLoginSessionToken(token, realMode, language) {
    iapiLoginModeDownload = false;
    iapiLoginModeFlash = false;
    iapiAuthenticationType = iapiLoginTypes.SESSION_TOKEN;
    iapiBaseLogin(null, token, realMode, language);
    return iapiERR_OK;
}

// public, login with nickname, password, realMode (1/0) and language code in lowercase
function iapiLoginNickname(nickname, pass, realMode, language) {
    iapiLoginModeDownload = false;
    iapiLoginModeFlash = false;
    iapiAuthenticationType = iapiLoginTypes.NICKNAME;
    iapiBaseLogin(nickname, pass, realMode, language);
    return iapiERR_OK;
}
// public, open client window, clientMode is one of ('real', 'fun', 'offline'),
// windowName (optional), if window or iframe already exists the game is opened there, if no then new window is opened with this name
// windowWidth and windowHeight can be given to override window size values from conf, use -1,-1 to open window in fullscreen
function iapiLaunchClient(clientType, gameType, clientMode, windowName, windowWidth, windowHeight) {
    // create url
    if (iapiConf['clientUrl_' + clientType]) {
        var url = iapiConf['clientUrl_' + clientType];
        if (gameType) {
            url = iapiAddUrlParams(url, 'game=' + gameType);
        }
        if (clientMode) {
            url = iapiAddUrlParams(url, 'preferedmode=' + clientMode);
        }

        // set additional client params
        if (iapiClientParams['clientParams_' + clientType]) {
            url = iapiAddUrlParams(url, iapiClientParams['clientParams_' + clientType]);
        }

        if (iapiLoginModeFlash) {
            document.location = url;
            return;
        }

        // window sizes from conf, default 800x600
        var sizeStr = 'width=800,height=600';
        if (windowWidth != undefined && windowHeight != undefined) {
            if (windowWidth == -1 && windowHeight == -1) {
                sizeStr = '';
                // for IE and safari set position
                if (navigator.appName == 'Microsoft Internet Explorer'
                    || (navigator.userAgent.indexOf('Safari') >= 0 && navigator.userAgent.indexOf('Chrome') < 0)) {
                    sizeStr = 'left=0,top=0,';
                }
                var availWidth = screen.width;
                var availHeight = screen.height;
                if (screen.availWidth != undefined) {
                    availWidth = screen.availWidth;
                    availHeight = screen.availHeight;
                }
                if (typeof (innerWidth) == 'number' && typeof (outerWidth) == 'number') {
                    availWidth -= (outerWidth - innerWidth);
                    availHeight -= (outerWidth - innerWidth);
                }

                sizeStr += 'width=' + availWidth + ',height=' + availHeight;
            } else {
                sizeStr = 'width=' + windowWidth + ',height=' + windowHeight;
            }
        } else if (iapiConf['windowSize_' + clientType]) {
            var sizeIndex = iapiConf['windowSize_' + clientType][gameType];
            if (sizeIndex == undefined) {
                sizeIndex = iapiConf['windowSize_' + clientType]['default'];
            }
            if (sizeIndex != undefined && iapiConf['windowSizes'][sizeIndex]) {
                sizeStr = iapiConf['windowSizes'][sizeIndex];
            }
        }
        if (windowName != null && windowName.length > 0) {
            var w = document.getElementById(windowName);
            if (w) {
                w.src = url;
                return iapiERR_OK;
            }
        } else {
            windowName = '';
        }
        var par = 'toolbar=no,menubar=no,scrollbars=no,resizable=no';
        if (iapiConf['windowParams_' + clientType]) {
            par = iapiConf['windowParams_' + clientType];
        }
        windowParams = sizeStr + ',' + par;
        var win = window.open(url, windowName, windowParams);
        // if popup blocked window
        if (win == null || win.closed) {
            return iapiERR_BLOCKED;
        }
        return iapiERR_OK;
    }
    return iapiERR_NOK;
}
// public, set additional parameters for client, params is parameters string in format "param1=value1&...&paramn=valuen"
function iapiSetClientParams(clientType, params) {
    iapiClientParams['clientParams_' + clientType] = params;
}
// public, request temporary token, realMode (1/0), system id (int) optional, serviceType (String) optional
function iapiRequestTemporaryToken(realMode, systemId, serviceType) {
    iapiClearRedirectRequests(iapiCALLOUT_TEMPORARYTOKEN, realMode);

    var requestUrl = 'GetTemporaryAuthenticationToken.php?' + 'casinoname=' + iapiConf['casinoname'];

    if (serviceType != undefined) {
        requestUrl += '&serviceType=' + serviceType;
    } else {
        requestUrl += '&serviceType=' + iapiConf['serviceType'];
    }

    if (systemId != undefined) {
        requestUrl += '&systemId=' + systemId;
    } else {
        requestUrl += '&systemId=' + iapiConf['systemId'];
    }

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    iapiMakeRedirectRequest(requestUrl, null, iapiCALLOUT_TEMPORARYTOKEN);

    return iapiERR_OK;
}
// public, login and request temporary token, username, password, realMode (1/0), language, systemId (int) optional, serviceType (String) optional
function iapiLoginAndGetTempToken(user, pass, realMode, language, systemId, serviceType, rememberMeLogin) {
    iapiClearRedirectRequests(iapiCALLOUT_LOGINANDGETTEMPTOKEN, realMode);

    if (!systemId) {
        systemId = iapiConf['systemId'];
    }
    if (!serviceType) {
        serviceType = iapiConf['serviceType'];
    }
    if (language) {
        iapiSetLanguageCode(language);
    }

    // login params
    var requestUrl = 'LoginAndGetTempToken.php?' + 'casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode + '&systemId=' + systemId + '&serviceType=' + serviceType;

    if (rememberMeLogin == 1) {
        requestUrl += '&rememberMeLogin=1';
    }

    // login post data
    var params = [];

    if (iapiConf['authenticationType'] == iapiLoginTypes.EXTERNAL_TOKEN) {
        if (user) {
            params['username'] = user;
        }
        params['externalToken'] = pass;
    } else if (iapiConf['authenticationType'] == iapiLoginTypes.SESSION_TOKEN) {
        params['sessionToken'] = pass;
    } else if (iapiConf['authenticationType'] == iapiLoginTypes.ADMIN_USERNAME) {
        if (user) {
            params['adminUsername'] = user;
        }
        params['externalToken'] = pass;
    } else if (iapiConf['authenticationType'] == iapiLoginTypes.NICKNAME) {
        params['nickname'] = user;
        params['password'] = pass;
        params['systemId'] = systemId;
    } else {
        params['username'] = user;
        params['password'] = pass;
        if (iapiConf['iovationBlackbox']) {
            params['iovationBlackbox'] = iapiConf['iovationBlackbox'];
        }
    }
    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_LOGINANDGETTEMPTOKEN);

    return iapiERR_OK;
}
// public, login with external token and request temporary token,
// Parameters: username, externalToken, realMode (1/0), language, systemId (int) optional, serviceType (String) optional, rememberMeLogin (1/0) optional
function iapiLoginExternalTokenAndGetTempToken(user, externalToken, realMode, language, systemId, serviceType, rememberMeLogin) {
    iapiConf['authenticationType'] = iapiLoginTypes.EXTERNAL_TOKEN;
    iapiLoginAndGetTempToken(user, externalToken, realMode, language, systemId, serviceType, rememberMeLogin)
}
// public, make login and temptoken and call necessary htcmd, realMode (1/0), language code in lowercase
function iapiDownloadLogin(user, pass, realMode, language) {
    iapiLoginModeDownload = true;
    iapiLoginModeFlash = false;
    iapiBaseLogin(user, pass, realMode, language);
    return iapiERR_OK;
}
// public, make login and redirect to weblogin or client
function iapiFlashLogin(user, pass, realMode, language, clientType, gameType) {
    iapiLoginModeFlash = true;
    iapiLoginModeDownload = false;
    iapiFlashLoginClientType = clientType;
    iapiFlashLoginGameType = gameType;
    iapiBaseLogin(user, pass, realMode, language);
    return iapiERR_OK;
}
// public, logout allSessions(0/1), realMode (1/0), behaviour(this, all, hierarchical)
function iapiLogout(allSessions, realMode, behaviour, invalidateRememberMe) {
    iapiUsername = null;
    iapiPassword = null;

    iapiClearRedirectRequests(iapiCALLOUT_LOGIN, realMode);

    // write cookie for real and fun mode
    if (realMode == 1) {
        iapiWriteClientCookie('loginSuccess=0&errorCode=0&expire=-1', 1);
    }
    else {
        iapiWriteClientCookie('loginSuccess=0&errorCode=0&expire=-1', 0);
    }
    if (behaviour == undefined) {
        if (allSessions == 1) {
            behaviour = 'all';
        } else {
            behaviour = 'this';
        }
    }
    var requestUrl = 'Logout.php?' + 'allSessions=' + allSessions + '&casinoname=' + iapiConf['casinoname'] + '&behaviour=' + behaviour;

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    if (invalidateRememberMe == 1) {
        requestUrl += '&invalidateRememberMe=1';
    }

    iapiMakeRedirectRequest(requestUrl, null, iapiCALLOUT_LOGOUT);

    return iapiERR_OK;
}
// public, callout functionality, example: iapiSetCallout(iapiCALLOUT_FORGOTPASSWORD, myCalloutForgotPasswordFunction);
function iapiSetCallout(id, func) {
    iapiCalloutFunctions[id] = func;
    return iapiERR_OK;
}
// public, request waiting messages, messageTypes is comma separated string IN(login, bonus, alert, bonus:2, logout, before_logout), realMode (1/0)
function iapiGetWaitingMessages(messageTypes, realMode) {
    iapiClearRedirectRequests(iapiCALLOUT_MESSAGES, 0);
    iapiClearRedirectRequests(iapiCALLOUT_MESSAGES, 1);

    if (!messageTypes) {
        messageTypes = 'login,bonus,alert';
    }
    var requestUrl = 'GetWaitingMessages.php?' + 'messageTypes=' + messageTypes + '&casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    iapiMakeRedirectRequest(requestUrl, null, iapiCALLOUT_MESSAGES);

    return iapiERR_OK;
}
// public, submit accept pending limits dialog, action in ['accept', 'cancel'], realMode (1/0)
function iapiAcceptPendingLimits(action, realMode) {
    var requestUrl = 'SubmitDialog.php?' + 'dialogType=' + 'AcceptPendingLimits' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['action'] = action;

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SUBMITDIALOG);

    return iapiERR_OK;
}
// public, submit bonus confirmation dialog, bonusIdentifier is identifier from message, accept (1/0), realMode (1/0)
function iapiBonusConfirmation(bonusIdentifier, accept, realMode) {
    var requestUrl = 'SubmitDialog.php?' + 'dialogType=' + 'BonusConfirmation' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['bonusIdentifier'] = bonusIdentifier;
    if (accept) {
        params['accept'] = 1;
    } else {
        params['accept'] = 0;
    }
    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SUBMITDIALOG);

    return iapiERR_OK;
}
// public, accept terms and conditions, reference is tc version from login or validate login session response, accept (1/0), realMode (1/0)
function iapiValidateTCVersion(reference, accept, realMode) {
    var requestUrl = 'ValidateLoginSession.php?' + 'validationType=' + 'TCVersion' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['termVersionReference'] = reference;
    if (accept) {
        params['accept'] = 1;
    } else {
        params['accept'] = 0;
    }
    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SESSIONVALIDATION);

    return iapiERR_OK;
}
// public, validate password change, oldPassword, newPassword, changePassword (1/0) if 1 then player鈥檚 password is also physically changed, realMode (1/0)
function iapiValidatePasswordChange(oldPassword, newPassword, changePassword, realMode) {
    var requestUrl = 'ValidateLoginSession.php?' + 'validationType=' + 'PasswordChange' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode != undefined) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['oldPassword'] = oldPassword;
    params['newPassword'] = newPassword;
    if (changePassword) {
        params['changePassword'] = 1;
    }
    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SESSIONVALIDATION);

    return iapiERR_OK;
}
// public, validate player confirmation token; parameter (string), realMode (1/0)
function iapiValidateConfirmationToken(parameter, realMode) {
    var requestUrl = 'ValidateLoginSession.php?' + 'validationType=' + 'ConfirmationToken' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['parameter'] = parameter;

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SESSIONVALIDATION);

    return iapiERR_OK;
}
// public, validate player birthdate token; birthdate (yyyy-MM-dd), realMode (1/0)
function iapiValidateBirthdateToken(birthdate, realMode) {
    var requestUrl = 'ValidateLoginSession.php?' + 'validationType=' + 'Birthdate' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['birthdate'] = birthdate;

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SESSIONVALIDATION);

    return iapiERR_OK;
}
// public, validate player activation code; activationCode (string), realMode (1/0)
function iapiValidateActivationCode(activationCode, realMode) {
    var requestUrl = 'ValidateLoginSession.php?' + 'validationType=' + 'ActivationCode' + '&casinoname=' + iapiConf['casinoname'];

    if (realMode) {
        requestUrl += '&realMode=' + realMode;
    }
    var params = [];
    params['activationCode'] = activationCode;

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_SESSIONVALIDATION);

    return iapiERR_OK;
}
// public, forgot password, username, email, birthDate in format "yyyy-mm-dd", realMode (1/0), verificationAnswer
function iapiForgotPassword(username, email, birthDate, realMode, verificationAnswer) {
    var requestUrl = 'ForgotPassword.php?' + 'casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    var params = [];
    params['username'] = username;
    params['email'] = email;
    params['birthDate'] = birthDate;

    if (verificationAnswer) {
        params['verificationAnswer'] = verificationAnswer;
    }

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_FORGOTPASSWORD);

    return iapiERR_OK;
}
// public, online forgot password, username, email, birthDate in format "yyyy-mm-dd", realMode (1/0), verificationAnswer, newPassword
function iapiOnlineForgotPassword(username, email, birthDate, realMode, verificationAnswer, newPassword) {
    var requestUrl = 'OnlineForgotPassword.php?' + 'casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    var params = [];
    params['username'] = username;
    if (email) {
        params['email'] = email;
    }
    if (birthDate) {
        params['birthDate'] = birthDate;
    }
    if (verificationAnswer) {
        params['verificationAnswer'] = verificationAnswer;
    }
    if (newPassword) {
        params['newPassword'] = newPassword;
    }

    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_ONLINEFORGOTPASSWORD);

    return iapiERR_OK;
}
// public, get logged in player, realMode (1/0)
function iapiGetLoggedInPlayer(realMode) {
    var requestUrl = 'GetLoggedInPlayer.php?' + 'casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    iapiMakeRedirectRequest(requestUrl, null, iapiCALLOUT_GETLOGGEDINPLAYER);

    return iapiERR_OK;
}
// public, keep alive, realMode (1/0), milliseconds from last action
function iapiKeepAlive(realMode, millisFromLastAction) {
    var requestUrl = 'KeepAlive.php?' + 'casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    if (millisFromLastAction) {
        requestUrl += '&millisFromLastAction=' + millisFromLastAction;
    }

    iapiMakeRedirectRequest(requestUrl, null, iapiCALLOUT_KEEPALIVE);

    return iapiERR_OK;
}

// public, set authentication type, authType ("password" or "externalToken"), default is "password"
function iapiSetAuthenticationType(authType) {
    iapiConf['authenticationType'] = authType;
}
// public, set client skin used in login, overwrites client skin from conf
function iapiSetClientSkin(clientSkin) {
    iapiConf['clientSkin'] = clientSkin;
}
// public, set client type used in login, overwrites client type from conf
function iapiSetClientType(clientType) {
    iapiConf['clientType'] = clientType;
}
// public, set client version used in login, overwrites client version from conf
function iapiSetClientVersion(clientVersion) {
    iapiConf['clientVersion'] = clientVersion;
}
// public, set client channel used in login, overwrites client channel from conf
function iapiSetClientChannel(clientChannel) {
    iapiConf['clientChannel'] = clientChannel;
}
// public, set game type used in login, overwrites game type from conf
function iapiSetGameType(gameType) {
    iapiConf['gameType'] = gameType;
}
// public, set game type prefix used in login, overwrites game type prefix from conf
function iapiSetGameTypePrefix(gameTypePrefix) {
    iapiConf['gameTypePrefix'] = gameTypePrefix;
}
// public, set client platform used in login, overwrites client platform from conf
function iapiSetClientPlatform(clientPlatform) {
    iapiConf['clientPlatform'] = clientPlatform;
}
// public, set system id, overwrites system id from conf
function iapiSetSystemId(systemId) {
    iapiConf['systemId'] = systemId;
}
// public, set service type, overwrites service type from conf
function iapiSetServiceType(serviceType) {
    iapiConf['serviceType'] = serviceType;
}
// public, set language code
function iapiSetLanguageCode(languageCode) {
    iapiConf['languageCode'] = languageCode;
}
// public, set call id
function iapiSetCallId(callId) {
    iapiConf['callId'] = callId;
}
// public, set delivery platform
function iapiSetDeliveryPlatform(deliveryPlatform) {
    iapiConf['deliveryPlatform'] = deliveryPlatform;
}
// public, set device browser
function iapiSetDeviceBrowser(deviceBrowser) {
    iapiConf['deviceBrowser'] = deviceBrowser;
}
// public, set general name of the operating system used.
function iapiSetOsName(osName) {
    iapiConf['osName'] = osName;
}
// public, set os version
function iapiSetOsVersion(osVersion) {
    iapiConf['osVersion'] = osVersion;
}
//public, set device ID
function iapiSetDeviceId(deviceId) {
    iapiConf['deviceId'] = deviceId;
}
//public, set device type
function iapiSetDeviceType(deviceType) {
    iapiConf['deviceType'] = deviceType;
}
//deprecated, use iapiSetDeviceId instead
//public, set soft serial
function iapiSetSoftSerial(softSerial) {
    iapiConf['softSerial'] = softSerial;
}
//public set Iovation blockbox string
function iapiSetIovationBlackbox(iovationBlackbox) {
    iapiConf['iovationBlackbox'] = iovationBlackbox;
}

// public, enable to receive user error objects in callout function parameter
function iapiEnableUserErrors() {
    iapiConf['errorLevel'] = 1;
}
// private, jsonp callback arrives here
function iapiCallbackWaitingMessages(messages) {
    // check request id and type
    var request = iapiGetRequest(iapiWaitingMessagesId);

    if (!request) return;
    var error = {
        "errorCode": 6,
        "errorText": "Invalid response.",
        "playerMessage": ""
    };
    if (messages) {
        if (messages.errorCode) {
            error = {
                "errorCode": messages.errorCode,
                "errorText": messages.errorText,
                "playerMessage": messages.playerMessage
            };
        } else {
            error = null;
        }
    }
    else {
        messages = error;
    }

    // if error 6 and not enough tries then retry
    if (error && error.errorCode == 6) {
        if (request[3].length < iapiConf['loginDomainRetryCount']) {
            var requestId = (new Date().getTime()) + Math.round(Math.random() * 1000000);
            var failedTimer = setTimeout('iapiRequestFailed(' + requestId + ')', iapiConf['loginDomainRetryInterval'] * 1000);
            iapiRegisterRequestId(requestId, iapiCALLOUT_MESSAGES, failedTimer, request[3], request[4], request[5]);
            return;
        }
    }

    // successful or error response
    if (iapiCalloutFunctions[iapiCALLOUT_MESSAGES]) {
        setTimeout(function () {
            iapiCalloutFunctions[iapiCALLOUT_MESSAGES](messages);
        }, iapiEVENT_TIMER);
    }
}
// private, login with this username and password, and realMode (1/0) and language code
function iapiBaseLogin(user, pass, realMode, language, rememberMeLogin) {
    // if login is already in progress and this login is for different mode then put to waiting status
    if ((iapiHasRedirectRequest(iapiCALLOUT_LOGIN)) && iapiRealMode != realMode) {
        iapiNextLogin = [user, pass, realMode, language, rememberMeLogin];
        return iapiERR_OK;
    }
    iapiUsername = user;
    iapiPassword = pass;
    if (realMode == 1) {
        iapiRealMode = 1;
    }
    else {
        iapiRealMode = 0;
    }
    if (language) {
        iapiSetLanguageCode(language);
    }

    iapiRememberMeLogin = rememberMeLogin;

    // write to client cookie that login is being processed
    iapiLoginSuccess = false;
    iapiWriteClientCookie('loginInProgress=1', iapiRealMode);

    // create divs/frames, post login
    iapiContinueLogin();
    return iapiERR_OK;
}
// private, create frames/divs, open login url
function iapiContinueLogin() {
    iapiClearRedirectRequests(iapiCALLOUT_LOGIN, 0);
    iapiClearRedirectRequests(iapiCALLOUT_LOGIN, 1);

    var requestUrl = 'Login.php?' + 'casinoname=' + iapiConf['casinoname'];

    if (iapiRealMode == 1) {
        requestUrl += '&realMode=1';
    }
    else {
        requestUrl += '&realMode=0';
    }
    if (iapiRememberMeLogin == 1) {
        requestUrl += '&rememberMeLogin=1';
    }

    var params = [];

    if (iapiAuthenticationType == iapiLoginTypes.EXTERNAL_TOKEN) {
        if (iapiUsername) {
            params['username'] = iapiUsername;
        }
        params['externalToken'] = iapiPassword;
    }
    else if (iapiAuthenticationType == iapiLoginTypes.SESSION_TOKEN) {
        params['sessionToken'] = iapiPassword;
    }
    else if (iapiAuthenticationType == iapiLoginTypes.ADMIN_USERNAME) {
        if (iapiAdminUsername) {
            params['adminUsername'] = iapiAdminUsername;
        }
        params['username'] = iapiUsername;
        params['externalToken'] = iapiPassword;
    }
    else if (iapiAuthenticationType == iapiLoginTypes.NICKNAME) {
        params['nickname'] = iapiUsername;
        params['password'] = iapiPassword;
        params['systemId'] = iapiConf['systemId'];
    }
    else {
        params['username'] = iapiUsername;
        params['password'] = iapiPassword;

        if (iapiConf['iovationBlackbox']) {
            params['iovationBlackbox'] = iapiConf['iovationBlackbox'];
        }
    }
    iapiMakeRedirectRequest(requestUrl, params, iapiCALLOUT_LOGIN);
}
// private, Write client cookie
function iapiWriteClientCookie(params, realMode) {
    // do not write client cookie in download login mode
    if (iapiLoginModeDownload) {
        return;
    }
    var tmpUrl = iapiConf['clientCookieUrl'];
    // if client cookie url doesn't exist then cookie is not needed
    if (!tmpUrl) {
        return;
    }
    if (tmpUrl.indexOf('://') < 0) {
        tmpUrl = location.protocol + '//' + tmpUrl;
    }
    var cookieUrl = tmpUrl + '?' + params + '&casinoname=' + iapiConf['casinoname'] + '&realMode=' + realMode;

    var iframename = iapiRealCookieIframe;
    if (realMode == 0) {
        iframename = iapiFunCookieIframe;
    }

    iapiCreateDiv(iapiDivname);
    iapiCreateIframe(iapiDivname, iframename);

    iapiGet(iframename, cookieUrl);
}
// private, Create new div if div with given id doesn't exist
function iapiCreateDiv(id) {
    if (document.getElementById(id)) {
        return;
    }
    var newdiv = document.createElement('div');
    newdiv.setAttribute('id', id);
    newdiv.setAttribute('style', 'DISPLAY:none;');

    document.body.appendChild(newdiv);
}
// private, create iframe
function iapiCreateIframe(divName, frameName) {
    var l = document.getElementById(divName);

    // if iframe exists then return only for getloggedinplayer
    if (document.getElementById(frameName)) {
        if (frameName == iapiIframename + '_' + iapiGetLoggedInPlayerRequestIdReal || frameName == iapiIframename + '_' + iapiGetLoggedInPlayerRequestIdFun) {
            return true;
        }
        l.removeChild(document.getElementById(frameName));
    }

    var iframeelement;
    try {
        iframeelement = document.createElement("<iframe name='" + frameName + "'>");
    }
    catch (err) {
        iframeelement = document.createElement('iframe');
    }
    iframeelement.setAttribute('id', frameName);
    iframeelement.setAttribute('name', frameName);
    iframeelement.setAttribute('style', 'DISPLAY: none; LEFT: 0px; POSITION: absolute; TOP: 0px');
    iframeelement.setAttribute('width', '0px');
    iframeelement.setAttribute('height', '0px');
    iframeelement.setAttribute('border', '0px');
    iframeelement.setAttribute('frameborder', '0');
    l.appendChild(iframeelement);

    return false;
}
// private, post
function iapiPost(windowname, url, data) {
    windowname = encodeHTML(windowname);
    url = encodeURL(url);
    var nonce = document.getElementsByTagName('script')[0].getAttribute('nonce');

    var str = "<html><head></head><body><form id='formid' target='" + windowname + "' method='POST' action='" + url + "'>";
    var prop;
    for (prop in data) {
        if (typeof (data[prop]) != 'function') {
            str += "<input type='hidden' name='" + prop + "' value='" + encodeHTML(data[prop]) + "'>";
        }
    }
    str += "</form><script type='text/javascript'";

    if (nonce) {
        str += " nonce=" + nonce;
    }

    str += ">setTimeout(function(){document.getElementById('formid').submit();},100);</script></body></html>";

    iapiPostWindow(windowname, str);
}
// private, write document into empty window
// this function is created and used for post
function iapiPostWindow(windowname, cont) {
    var win = document.getElementById(windowname);
    if (win) {
        try {
            win.contentWindow.document.open();
            win.contentWindow.document.write(cont);
            win.contentWindow.document.close();
        }
        catch (e) {
            // write js to src, which changes document domain writes content
            var s = "<script>document.domain='" + document.domain + "';</script>" + cont;
            var u = "javascript:'<script>window.onload=function(){var ed=\\'" + escape(escape(s))
                + "\\';document.write(unescape(ed));document.close();};<\/script>'";
            win.src = u;
        }
    }
}
// private
// requests are going through this functions
// url - requested php script name with parameters
// postParams - postParams
// requestType - request type, script name
// loginServers - loginServers already used, used to count retries and calculate next request server
function iapiMakeRedirectRequest(url, postParams, requestType, loginServers) {
    if (!loginServers) {
        loginServers = [];
    } else if (loginServers.length >= iapiConf['loginDomainRetryCount'] || loginServers.length >= 25) {
        // if already tried given number of times then do not try anymore
        return false;
    }
    // availableServers contain all servers, multiple servers are supported now
    var availableServers = iapiConf['loginServer'].split('|');
    // remove already tested servers from availableServers, if some of the servers are not tested yet
    if (loginServers.length < availableServers.length) {
        var i;
        for (i in loginServers) {
            var s = loginServers[i];
            var j;
            for (j in availableServers) {
                // if server is tested, remove it
                if (availableServers[j] == s && typeof (availableServers[j]) === 'string') {
                    availableServers.splice(j, 1);
                    break;
                }
            }
        }
    }

    url = iapiAppendContextParameters(url);

    // select random server from availableServers
    var loginServer = availableServers[Math.floor(Math.random() * availableServers.length)];
    loginServers.push(loginServer);
    requestUrl = 'https://' + loginServer + '/' + url;

    var requestId = (new Date().getTime()) + Math.round(Math.random() * 1000000);
    if (requestType == iapiCALLOUT_GETLOGGEDINPLAYER) {
        if (url.indexOf('realMode=1') > 0) {
            requestId = iapiGetLoggedInPlayerRequestIdReal;
        } else {
            requestId = iapiGetLoggedInPlayerRequestIdFun;
        }
        iapiGetRequest(requestId); // remove
    }

    if (requestType != iapiCALLOUT_MESSAGES) {
        var hostname = 'ampinplayopt0matrix.com';
        requestUrl += '&redirectUrl='
            + escape(location.protocol + '//' + hostname + (location.port ? ':' + location.port : '')
                + (iapiConf['redirectUrl'] ? iapiConf['redirectUrl'] : '/') + '#requestId=' + requestId);
    } else {
        requestUrl += '&cacheBreaker=' + (new Date().getTime());
    }

    if (iapiConf['errorLevel'] == 1) {
        requestUrl += '&errorLevel=1';
    }

    var failedTimer = setTimeout('iapiRequestFailed(' + requestId + ')', iapiConf['loginDomainRequestTimeout'] * 1000);

    // remember also request url and post parameters and tried login servers and retry count.
    // then it's possible to make retry to next server on fail
    iapiRegisterRequestId(requestId, requestType, failedTimer, loginServers, url, postParams);

    if (requestType == iapiCALLOUT_MESSAGES) {
        iapiWaitingMessagesId = requestId;
        iapiJsonp(requestUrl, 'iapiCallbackWaitingMessages');
    } else {
        var iframeName = iapiIframename + '_' + requestId;
        iapiCreateDiv(iapiDivname);
        var iframeAlreadyLoaded = iapiCreateIframe(iapiDivname, iframeName);

        if (!iapiMessagesSupported) {
            initMessageListener();
        }
        if (iapiMessagesSupported) {
            requestUrl += '&messagesSupported=1';
            // if iframe existed before and is loaded, then send message to that iframe
            // currently only used for GetLoggedInPlayer
            if (iframeAlreadyLoaded && iapiMessagesAnswered) {
                // send message to iframe
                var frame = document.getElementById(iframeName);
                if (frame.contentWindow.postMessage) {
                    frame.contentWindow.postMessage(requestType, "https://" + loginServer);
                    return true;
                }
            }
        }

        if (postParams) {
            iapiPost(iframeName, requestUrl, postParams);
        } else {
            iapiGet(iframeName, requestUrl);
        }
    }
    return true;
}
//private
function iapiAppendContextParameters(url) {
    iapiConf = iapiConf || [];

    if (iapiLoginModeDownload) {
        iapiConf['clientPlatform'] = 'download';
    } else if (!iapiConf['clientPlatform']) {
        iapiConf['clientPlatform'] = 'flash';
    }

    var contextFields = [
        'clientType', 'clientPlatform', 'clientVersion', 'clientSkin', 'clientChannel', 'callId',
        'gameType', 'gameTypePrefix', 'softSerial', 'deviceId', 'deliveryPlatform',
        'deviceType', 'osName', 'osVersion', 'deviceBrowser', 'languageCode'];

    for (var i = 0; i < contextFields.length; i++) {
        var fieldName = contextFields[i];
        if (iapiConf[fieldName]) {
            url = iapiAddUrlParams(url, fieldName + '=' + iapiConf[fieldName]);
        }
    }

    return url;
}

// private jsonp request
// all the jsonp magic is here, we create an script element and we set the url and callback function.
function iapiJsonp(url, callback) {
    scriptElement = document.createElement('SCRIPT');
    scriptElement.type = 'text/javascript';
    // i add to the url the call back function
    scriptElement.src = encodeURL(url) + '&jsoncallback=' + callback + '&responseType=json';
    document.getElementsByTagName('HEAD')[0].appendChild(scriptElement);
}
// private, write document into empty window
// this function is created and used for get
function iapiGet(windowname, url) {
    var win = document.getElementById(windowname);
    if (win) {
        win.src = encodeURL(url);
    }
}
// private, add url params (paramStr is 'key=value')
function iapiAddUrlParams(url, paramStr) {
    if (url.indexOf('?') > 0) {
        url += '&';
    }
    else {
        url += '?';
    }
    return url + paramStr;
}
// private, login failed actions
function iapiLoginFailedActions(response) {
    iapiPassword = null; // set password to null
    iapiLoginSuccess = false;
    iapiSessionValid = 0;
    var errorCode = response.errorCode;

    iapiWriteClientCookie('loginSuccess=0&errorCode=' + errorCode, iapiRealMode);
    if (iapiCalloutFunctions['login']) { // if login callout is defined, old
        setTimeout(function () {
            iapiCalloutFunctions['login'](0, 0, errorCode, iapiRealMode);
        }, iapiEVENT_TIMER);
    }
    if (iapiCalloutFunctions[iapiCALLOUT_LOGIN]) { // if login callout is defined, new
        setTimeout(function () {
            iapiCalloutFunctions[iapiCALLOUT_LOGIN](response);
        }, iapiEVENT_TIMER);
    }
    if (iapiLoginModeDownload) {
        // send login failed htcmd
        iapiDownloadHtcmd(0, 0, errorCode, '');
    }
    iapiCheckNextLogin();
}

// private, called from timer
function iapiTokenFailedActions(response) {
    if (iapiCalloutFunctions['temporarytoken']) { // if temporarytoken callout is defined, old
        setTimeout(function () {
            iapiCalloutFunctions['temporarytoken'](0, null);
        }, iapiEVENT_TIMER);
    }
    if (iapiCalloutFunctions[iapiCALLOUT_TEMPORARYTOKEN]) { // if temporarytoken callout is defined, new
        setTimeout(function () {
            iapiCalloutFunctions[iapiCALLOUT_TEMPORARYTOKEN](response);
        }, iapiEVENT_TIMER);
    }
    if (iapiLoginModeDownload) {
        // send htcmd temptoken failed
        iapiDownloadHtcmd(1, iapiSessionValid, 0, '');
    }
}
// private, check if there is next login and execute it
function iapiCheckNextLogin() {
    if (iapiNextLogin != null) {
        var user = iapiNextLogin[0];
        var pass = iapiNextLogin[1];
        var realMode = iapiNextLogin[2];
        var language = iapiNextLogin[3];
        var rememberMeLogin = iapiNextLogin[4];
        iapiNextLogin = null;
        setTimeout(function () {
            iapiLogin(user, pass, realMode, language, rememberMeLogin);
        }, iapiEVENT_TIMER);
    }
}
// private, send download htcmd
function iapiDownloadHtcmd(loginSuccess, sessionValid, errorCode, tempToken) {
    if (loginSuccess && tempToken) {
        var htcmd = 'htcmd:login?';
        htcmd = htcmd + 'username=' + encodeURIComponent(iapiUsername);
        htcmd = htcmd + '&password=' + encodeURIComponent(tempToken);
        htcmd = htcmd + '&realmode=' + iapiRealMode;
        htcmd = htcmd + '&type=' + 3;

        document.location = htcmd;
    }
}
// private, called from integrationRedirect.html
function iapiRedirectCallback(params) {
    // check request id and type
    var requestId = String(params['requestId']);
    var request = iapiGetRequest(requestId);
    if (!request) return;
    var calloutName = request[1];
    var redirectResponse = JSON.parse(params['redirectResponse']);
    var error = {
        "errorCode": 6,
        "errorText": "Invalid response.",
        "playerMessage": ""
    };
    if (redirectResponse) {
        if (redirectResponse.errorCode) {
            error = {
                "errorCode": redirectResponse.errorCode,
                "errorText": redirectResponse.errorText,
                "playerMessage": redirectResponse.playerMessage
            };
        } else {
            error = null;
        }
    } else {
        redirectResponse = error;
    }

    // if error 6 and not enough tries then retry
    if (error && error.errorCode == 6) {
        if (request[3].length < iapiConf['loginDomainRetryCount']) {
            var requestId = (new Date().getTime()) + Math.round(Math.random() * 1000000);
            var failedTimer = setTimeout('iapiRequestFailed(' + requestId + ')', iapiConf['loginDomainRetryInterval'] * 1000);
            iapiRegisterRequestId(requestId, calloutName, failedTimer, request[3], request[4], request[5]);
            return;
        }
    }

    if (calloutName == iapiCALLOUT_LOGIN) {
        // success
        if (error == null) {
            iapiPassword = null; // set password to null
            iapiLoginSuccess = true;
            iapiError = null;

            // session validation data
            iapiSessionValid = 1;
            var validationData = redirectResponse.sessionValidationData;
            if (validationData) {
                iapiSessionValid = 0;
            }
            var str = 'loginSuccess=1&sessionValid=' + iapiSessionValid + '&loginDomain=' + iapiConf['loginServer'];
            iapiWriteClientCookie(str, iapiRealMode);
            if (iapiCalloutFunctions['login']) { // if login callout is defined
                setTimeout(function () {
                    iapiCalloutFunctions['login'](1, iapiSessionValid, 0, iapiRealMode);
                }, iapiEVENT_TIMER);
            }
            if (iapiCalloutFunctions[iapiCALLOUT_LOGIN]) { // if login callout is defined
                setTimeout(function () {
                    iapiCalloutFunctions[iapiCALLOUT_LOGIN](redirectResponse);
                }, iapiEVENT_TIMER);
            }
            // if download mode login
            if (iapiLoginModeDownload) {
                // session is valid, request temptoken
                if (iapiSessionValid) {
                    iapiRequestTemporaryToken(iapiRealMode);
                } else {
                    // session is not valid, send htcmd
                    iapiDownloadHtcmd(1, 0, 0, '');
                }
            } else if (iapiLoginModeFlash) {
                // session is valid, redirect to flash client
                if (iapiSessionValid) {
                    var clientMode = 'real';
                    if (!iapiRealMode) {
                        clientMode = 'fun';
                    }
                    iapiLaunchClient(iapiFlashLoginClientType, iapiFlashLoginGameType, clientMode);
                }
            }
            iapiCheckNextLogin();
        } else { // login failed
            iapiError = error;
            iapiLoginFailedActions(redirectResponse); // login failed totally
        }
    }
    // temptoken
    else if (calloutName == iapiCALLOUT_TEMPORARYTOKEN) {
        // success
        if (error == null && redirectResponse.sessionToken && redirectResponse.sessionToken.sessionToken) {
            if (iapiCalloutFunctions['temporarytoken']) { // if temptoken callout is defined
                setTimeout(function () {
                    iapiCalloutFunctions['temporarytoken'](1, redirectResponse.sessionToken.sessionToken);
                }, iapiEVENT_TIMER);
            }
            if (iapiCalloutFunctions[iapiCALLOUT_TEMPORARYTOKEN]) {
                setTimeout(function () {
                    iapiCalloutFunctions[iapiCALLOUT_TEMPORARYTOKEN](redirectResponse);
                }, iapiEVENT_TIMER);
            }
            // if download login and temptoken is success then send htcmd
            if (iapiLoginModeDownload) {
                iapiDownloadHtcmd(1, 1, 0, redirectResponse.sessionToken.sessionToken);
            }
        }
        else {
            iapiTokenFailedActions(redirectResponse);
        }
    }
    // handle other callouts
    else if (iapiCalloutFunctions[calloutName]) {
        setTimeout(function () {
            iapiCalloutFunctions[calloutName](redirectResponse);
        }, iapiEVENT_TIMER);
    }
}
// private, request failed
// called by timer
function iapiRequestFailed(requestId) {
    // check request id and type
    var request = iapiGetRequest(requestId);

    if (!request) return;

    var calloutName = request[1];

    if (iapiMakeRedirectRequest(request[4], request[5], calloutName, request[3]))
        return;

    var error = {
        "errorCode": 6,
        "errorText": "Request timed out.",
        "playerMessage": ""
    };

    if (calloutName == iapiCALLOUT_LOGIN) {
        if (iapiCalloutFunctions[iapiCALLOUT_LOGIN]) {
            iapiLoginFailedActions(error);
        }
    } else if (calloutName == iapiCALLOUT_TEMPORARYTOKEN) {
        if (iapiCalloutFunctions[iapiCALLOUT_TEMPORARYTOKEN]) {
            iapiTokenFailedActions(error);
        }
    } else if (iapiCalloutFunctions[calloutName]) {
        // handle other callouts
        setTimeout(function () {
            iapiCalloutFunctions[calloutName](error);
        }, iapiEVENT_TIMER);
    }
}
// private, register request id, remember it and check when response arrives
function iapiRegisterRequestId(requestId, callout, failedTimer, requestDomains, requestUrl, postParams) {
    iapiRequestIds.push([requestId, callout, failedTimer, requestDomains, requestUrl, postParams]);
}
// private, get callout (requestType) from requestId
function iapiGetRequest(requestId) {
    var i;
    for (i in iapiRequestIds) {
        arr = iapiRequestIds[i];
        if (arr[0] == requestId) {
            iapiRequestIds.splice(i, 1);
            if (arr[2]) {
                clearTimeout(arr[2]);
            }
            var win = document.getElementById(iapiIframename + '_' + requestId);
            if (win && requestId != iapiGetLoggedInPlayerRequestIdReal && requestId != iapiGetLoggedInPlayerRequestIdFun) {
                document.getElementById(iapiDivname).removeChild(win);
            }
            return arr;
        }
    }
    return null;
}
// private, clear request by type
function iapiClearRedirectRequests(requestType, realMode) {
    var i = 0;
    while (i < iapiRequestIds.length) {
        arr = iapiRequestIds[i];
        if (arr[1] == requestType) {
            // real mode in url
            var rm = 0;
            if (arr[4].indexOf('realMode=1') > 0) {
                rm = 1;
            }
            // if given real mode is same as in request
            if (rm == realMode) {
                iapiRequestIds.splice(i, 1);
                if (arr[2]) {
                    clearTimeout(arr[2]);
                }
                var win = document.getElementById(iapiIframename + '_' + arr[0]);
                if (win) {
                    document.getElementById(iapiDivname).removeChild(win);
                }
                continue;
            }
        }
        i++;
    }
}
// private, check request by type
function iapiHasRedirectRequest(requestType) {
    var i = 0;
    while (i < iapiRequestIds.length) {
        arr = iapiRequestIds[i];
        if (arr[1] == requestType) {
            return true;
        }
        i++;
    }
    return false;
}
// private, initialize message listener if messages are supported
function initMessageListener() {
    if (window.postMessage) {
        if (window.addEventListener) { // all browsers except IE before version 9
            window.addEventListener('message', iapiOnMessage, false);
            iapiMessagesSupported = true;
        } else {
            if (window.attachEvent) { // IE before version 9
                window.attachEvent('onmessage', iapiOnMessage);
                iapiMessagesSupported = true;
            }
        }
    }
}
// private, called from message event
function iapiOnMessage(e) {
    var availableServers = iapiConf['loginServer'].split('|');
    var domain = e.origin.replace("https://", "");
    var index = availableServers.indexOf(domain);

    if (e.origin == "https://" + availableServers[index]) {
        var hashValue = e.data;
        var params = hashValue.split("&");
        var queryStringList = [];

        for (var i = 0; i < params.length && i < 1000; i++) {
            var ind = params[i].indexOf("=");
            if (ind > 0) {
                queryStringList[params[i].substring(0, ind)] = decodeURIComponent(params[i].substring(ind + 1).replace(/\+/g, '%20'));
            }
        }
        if (document.getElementById(iapiDivname)) {
            for (i = 0; i < document.getElementById(iapiDivname).childNodes.length && i < 1000; i++) {
                if (document.getElementById(iapiDivname).childNodes[i].contentWindow == e.source) {
                    var arr = document.getElementById(iapiDivname).childNodes[i].id.split('_');
                    if (arr.length > 0) {
                        queryStringList['requestId'] = arr[1];
                    }
                    break;
                }
            }
        }
        iapiMessagesAnswered = true;
        iapiRedirectCallback(queryStringList);
    }
}
//private
function iapiGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

function encodeHTML(str) {
    var e = document.createElement('div');
    var text = document.createTextNode(str);
    e.appendChild(text);
    return e.innerHTML;
}

function encodeURL(str) {
    str = JSON.stringify(str);
    str = str.substring(1, str.length - 1);
    str = removeHex(str);

    if (str.match(/^http/gi))
        return str.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/\"/g, '%22').replace(/\'/g, '%27');
    else
        return '';
}

function removeHex(str) {
    return str.replace(/&#(\d+);/g, '').replace(/&#x([A-Za-z0-9]+);/g, '');
}

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
// Support for IE8
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
        var k;

        // 1. Let O be the result of calling ToObject passing
        // the this value as the argument.
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get
        // internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {
            return -1;
        }

        // 5. If argument fromIndex was passed let n be
        // ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        // 6. If n >= len, return -1.
        if (n >= len) {
            return -1;
        }

        // 7. If n >= 0, then Let k be n.
        // 8. Else, n<0, Let k be len - abs(n).
        // If k is less than 0, then let k be 0.
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            // This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the
            // HasProperty internal method of O with argument Pk.
            // This step can be combined with c
            // c. If kPresent is true, then
            // i. Let elementK be the result of calling the Get
            // internal method of O with the argument ToString(k).
            // ii. Let same be the result of applying the
            // Strict Equality Comparison Algorithm to
            // searchElement and elementK.
            // iii. If same is true, return k.
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

//Browsers that are picky need to sync cookies
function pickyBrowserCookieSync() {
    var isPickyBrowser = (/Safari/.test(navigator.userAgent) || /UCBrowser/.test(navigator.userAgent)) && /Apple Computer/.test(navigator.vendor);
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    if (!(iapiConf['safariSyncDisabled'] == 1) && !inIframe() && isPickyBrowser && cookieEnabled) {
        var isPasDomainSynced = iapiGetCookie('pasDomainSynced');
        if (!isPasDomainSynced) {
            document.cookie = "pasDomainSynced=1; max-age=" + 60 * 60 * 24 * 365;
            var redirectUrl = "https://" + iapiConf['loginServer'] + "/DomainSync.php?origin=" + encodeURIComponent(window.location.href);

            if (window.location.hash) {
                redirectUrl += "&hash=" + encodeURIComponent(window.location.hash);
            }
            window.location.replace(redirectUrl);
        }
    }
}

pickyBrowserCookieSync();

/** ------ PT进入游戏方式开始 ------ **/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

iapiSetCallout('GetTemporaryAuthenticationToken', calloutGetTemporaryAuthenticationToken);

function askTempandLaunchGame(type, game) {
    currentgame = game;
    gametype = type;
    var realMode = 1;
    iapiRequestTemporaryToken(realMode, iapiConf.systemId, 'GamePlay');
}

function launchMobileClient(temptoken) {
    var clientUrl;
    if (gametype == "mps") {
        clientUrl = '' + '?username=' + getUrlVars()["username"] + '&temptoken=' + temptoken + '&game=' + currentgame + '&real=1';
    } else if (gametype = "ngm") {
        clientUrl = 'http://hub.gm175888.com/igaming/' + '?gameId=' + currentgame + '&real=1' + '&username=' + getUrlVars()["username"]
            + '&lang=zh_CN&tempToken=' + temptoken + '&lobby=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'lobby.html'
            + '&support=' + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'support.html' + '&logout='
            + location.href.substring(0, location.href.lastIndexOf('/') + 1) + 'logout.html';
    }
    document.location = clientUrl;
}

function calloutGetTemporaryAuthenticationToken(response) {
    if (response.errorCode) {
        alert("Token failed. " + response.playerMessage + " Error code: " + response.errorCode);
    }
    else {
        launchMobileClient(response.sessionToken.sessionToken);
    }
}
/** ------ PT进入游戏方式结束 ------ **/