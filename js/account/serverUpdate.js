reportApp.onPageInit('account_serverUpdate', function(page) {

    var vm = new Vue({
        el: page.container,
        data: {
            dataModel: {
                id: (new Date()).getTime(),
                name: '',
                serverUrl: '',
                reportUrl: ''
            }
        },
        methods: {
            load: function() {
                if (page.query.data != undefined) {
                    if (page.query.data.id) {
                        vm.dataModel.id = page.query.data.id;
                    }
                    vm.dataModel.name = page.query.data.name;
                    vm.dataModel.serverUrl = page.query.data.serverUrl;
                    vm.dataModel.reportUrl = page.query.data.reportUrl;
                } else {
                    mainView.router.back();
                }
            },
            save: function() {
                var savedServerList = appConfig.user.serverList();

                if (this.dataModel.serverUrl.indexOf('http') < 0) {
                    this.dataModel.serverUrl = "http://" + this.dataModel.serverUrl + "/api/"
                }

                if (this.dataModel.reportUrl.indexOf('http') < 0) {
                    this.dataModel.reportUrl = "http://" + this.dataModel.reportUrl + "/ReportViewer/MobileViewer"
                }

                var existItem = _.find(savedServerList, function(item) { return item.id == vm.dataModel.id.toString(); });
                if (existItem) {
                    existItem.name = vm.dataModel.name;
                    existItem.serverUrl = vm.dataModel.serverUrl;
                    existItem.reportUrl = vm.dataModel.reportUrl;
                } else {
                    savedServerList.push(vm.dataModel);
                }
                appConfig.user.serverList(savedServerList);
                appConfig.utility.showMessage('地址修改成功');
                mainView.router.back();
                if (page.query.callback) { page.query.callback(); }
            }
        }
    });

    vm.load();
});