reportApp.onPageInit('account_server',function(page){

	//视图模型
	var vm=new Vue({
		el:page.container,
		data:{
			servers:[]
		},
		methods:{
			init:function(){				
				this.servers=appConfig.user.serverList();

				$$(page.container).find('.pull-to-refresh-content').on('refresh',function(){

					vm.servers=[];
					vm.servers=appConfig.user.serverList();

					reportApp.pullToRefreshDone();
				});

			},
			itemSelected:function(server){
				appConfig.user.serverUrl(server.serverUrl);
				appConfig.user.reportViewerUrl(server.reportUrl);				
			},
			//删除
			delete:function(item){
				reportApp.confirm('您确定删除选中的服务器地址吗？',function(){
					vm.servers.$remove(item);
					appConfig.user.serverList(vm.servers);
				});
			},
			//修改
			update:function(item){
				mainView.router.load({
					url:'page/account/serverUpdate.html',
					query:{
						data:item
					}
				});
			}
		}
	});

	vm.init();

});