reportApp.onPageInit('report_reportViewer', function(page) {

    var vm = new Vue({
        el: page.container,
        data: {
            viewUrl: ''
        },
        methods: {
            init: function() {
                if (page.query != undefined &&
                    page.query.reportID != undefined) {
                    this.viewUrl = appConfig.user.reportViewerUrl() + "?reportid=" + page.query.reportID + "&usercode=" + appConfig.user.code();
                    console.log(this.viewUrl);
                    appConfig.utility.showIndicator();
                }
            },
            //加载完毕
            loaded: function() {
                appConfig.utility.hideIndicator();
            },
            //加载出错
            errored: function() {
                appConfig.utility.hideIndicator();
            },
            //收藏
            favorite: function() {
                appConfig.ajax.post("Report?reportID=" + page.query.reportID, {}, function(response) {
                    appConfig.utility.showMessage('收藏成功');
                });
            }
        }
    });

    vm.init();

});