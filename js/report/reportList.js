reportApp.onPageInit('report_reportList',function(page){

	var pageDiv=$$(page.container);
	
	var vm=new Vue({
		el:page.container,
		data:{
			response:{
				reports:[]
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
				this.response.reports=[];
				appConfig.ajax.get("Report?reportCategoryID="+page.query.categoryID,{},function(response){
					if(_.isArray(response.Data)){
						_.each(response.Data,function(item){
							vm.response.reports.push(item);
						});
					}
				});
			}
		}
	});

	vm.init();

});