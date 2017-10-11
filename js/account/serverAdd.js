reportApp.onPageInit('account_serverAdd',function(page){

	var vm=new Vue({
		el:page.container,
		data:{
			dataModel:{
				id:(new Date()).getTime(),
				name:'',
				serverUrl:'',
				reportUrl:''
			}
		},
		methods:{
			save:function(){				
				var savedServerList=appConfig.user.serverList();

				if(this.dataModel.serverUrl.indexOf('http')<0){
					this.dataModel.serverUrl="http://"+this.dataModel.serverUrl+"/api/"
				}

				if(this.dataModel.reportUrl.indexOf('http')<0){
					this.dataModel.reportUrl="http://"+this.dataModel.reportUrl+"/ReportViewer/MobileViewer"
				}

				savedServerList.push(this.dataModel);
				appConfig.user.serverList(savedServerList);
				appConfig.utility.showMessage('地址保存成功');
				mainView.router.back();				
			}
		}
	});
});