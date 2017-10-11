reportApp.onPageInit('home',function(page){
	
	var pageDiv=$$(page.container);

	var vm=new Vue({
		el:page.container,
		data:{
			response:{
				categories:[]
			}
		},
		methods:{
			init:function(){
				this.load();
				pageDiv.find('.pull-to-refresh-content').on('refresh',function(){
					reportApp.pullToRefreshDone();
					vm.load();
				});
			},
			load:function(){
				this.response.categories=[];
				//获取分类
				appConfig.ajax.get("Category",{},function(response){
					if(_.isArray(response.Data)){
						_.each(response.Data,function(item){
							vm.response.categories.push(item);
						});
					}
				});
			},
			//退出
			singOut:function(){
				mainView.router.load({
					url:'page/account/server.html'
				});
			},
		}
	});

	vm.init();

});