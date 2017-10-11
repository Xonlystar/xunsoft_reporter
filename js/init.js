document.addEventListener("deviceready", function() {
    setTimeout(function() {
        mainView.router.load({
            url: "page/account/server.html"
        });
    }, 800);

    //获取应用版本号码
    navigator.appInfo.getAppInfo(function(appInfo) {
        appConfig.user.appVersion(appInfo.version);
    }, function(err) {
        appConfig.user.appVersion('X.X');
    });

}, false);

//回退按钮
document.addEventListener("backbutton", function() {
    if (mainView.activePage.name === "account_server") {
        navigator.app.exitApp();
    }
    if (mainView.activePage.name === "home") {
        reportApp.confirm('您确定要退出当前应用吗?', '退出', function() {
            navigator.app.exitApp();
        });
    }
}, false);

//是否是测试模式
if (window.cordova === undefined) {
    console.log('测试模式');
    setTimeout(function() {
        mainView.router.load({
            url: "page/account/server.html"
        });
    }, 200);
}