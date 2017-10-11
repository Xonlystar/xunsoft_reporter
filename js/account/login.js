reportApp.onPageInit('account_login',function(page){

	var vm=new Vue({
		el:page.container,
		data:{
			dataModel:{
				userName:'',
				userPassword:''
			},
			logo:''
		},
		methods:{
			init:function(){
				this.dataModel.userName=appConfig.user.code();
				this.dataModel.userPassword=appConfig.user.password();
				this.logo=appConfig.user.serverUrl().substr(0,appConfig.user.serverUrl().indexOf('api'))+"img/logo_mobile.png"
				this.checkVer();
			},
			//登陆
			login:function(){

				var requestData={
					userName:this.dataModel.userName,
					userPassword:hex_md5(this.dataModel.userPassword)
				};

				appConfig.ajax.post('User',requestData,function(response){
					//保存用户名
					appConfig.user.code(vm.dataModel.userName);
					//保存用户密码
					appConfig.user.password(vm.dataModel.userPassword);
					//进入主页
					mainView.router.load({
						url:'page/home.html'
					});
				});
			},
			checkVer:function(){
				appConfig.ajax.get('User',{},function(response){});
			}
		}
	});

	vm.init();

});