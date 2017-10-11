var appConfig={

	//用户配置
	user:{
		//用户代码
		code:function(userCode){
			if(userCode===null || userCode===undefined){
				return window.localStorage.getItem('reporter_userCode');
			}else{
				window.localStorage.setItem('reporter_userCode',userCode);
			}
		},
		//用户密码
		password:function(userPassword){
			if(userPassword===null || userPassword===undefined){
				return window.localStorage.getItem('reporter_userPassword');
			}else{
				window.localStorage.setItem('reporter_userPassword',userPassword);
			}
		},
		//用户应用版本号
		appVersion:function(version){
			if(version===undefined){
				var version = window.localStorage.getItem('reporter_appVersion');
				if(version!=undefined){
					return version;
				}
				return "X.X";
			}else{
				window.localStorage.setItem('reporter_appVersion',version);
			}
		},
		//服务器地址
		serverUrl:function(serverUrl){
			if(serverUrl===null || serverUrl===undefined){
				return window.sessionStorage.getItem('reporter_serverUrl');
			}else{
				window.sessionStorage.setItem('reporter_serverUrl',serverUrl);
			}
		},
		//报表查看器地址
		reportViewerUrl:function(reportViewerUrl){
			if(reportViewerUrl===null || reportViewerUrl===undefined){
				return window.sessionStorage.getItem('reporter_reportViewerUrl');
			}else{
				window.sessionStorage.setItem('reporter_reportViewerUrl',reportViewerUrl);
			}
		},
		//获取报表服务器列表
		serverList:function(serverList){

			if(serverList!=undefined && _.isArray(serverList)){
				window.localStorage.setItem('reporter_serverList',JSON.stringify(serverList));
				return;
			}

			//本地保存的服务器列表
			var savedServerList=window.localStorage.getItem('reporter_serverList');
			if(savedServerList!=undefined){
				var serverList=JSON.parse(savedServerList);
				if(_.isArray(serverList)){
					return serverList;
				}
			}

			return new Array();
		}
	},

	//实用工具
	utility:{
		showIndicator:function(){
			reportApp.showIndicator();
		},
		hideIndicator:function(){
			reportApp.hideIndicator();
		},
		showMessage:function(message,title){
			if(message===null || message===undefined){
				return;
			}
			var messageTitle=title?title:'提示';
			reportApp.addNotification({
				title:messageTitle,
				message:message,
				hold:2000
			});
		},
		hasValue:function(val){
			if(val===null || val===undefined){
				return false;
			}

			if(_.isString(val)){
				if(val.trim()==''){
					return false;
				}
			}
			return true;
		},
	},

	//Ajax请求
	ajax:{
		get:function(url,data,success,error){
			$$.ajax({
				method:'GET',
				url:appConfig.user.serverUrl()+url,
				data:data,
				dataType:'json',
				timeout:1000*60,
				headers:{
					usercode:appConfig.user.code(),
					appver:appConfig.user.appVersion(),
					apptype:'2'
				},
				beforeSend:function(){
					reportApp.showPreloader('正在获取数据...');
				},
				success:function(response){
					reportApp.hidePreloader();
					if(success!=undefined){
						if(response.Code!=0){
							if(response.Message!==null || response.Message!==undefined){
								appConfig.utility.showMessage(response.Message,'错误');
							}else{
								appConfig.utility.showMessage('未知的错误类型,请联系系统管理员','警告');
							}
						}else{
							success(response);
						}
					}
				},
				error:function(response){
					reportApp.hidePreloader();
					if(error!=undefined){
						error(response);
					}
					appConfig.utility.showMessage('请求失败,请稍后重试或者联系系统管理员','警告');
				}
			});
		},
		post:function(url,data,success,error){
			$$.ajax({
				method:'POST',
				url:appConfig.user.serverUrl()+url,
				data:data,
				dataType:'json',
				timeout:1000*60,
				headers:{
					usercode:appConfig.user.code(),
					appver:appConfig.user.appVersion(),
					apptype:'2'
				},
				beforeSend:function(){
					reportApp.showPreloader('正在提交处理');
				},
				success:function(response,status,xhr){
					reportApp.hidePreloader();
					if(success!=undefined){
						if(response.Code!=0){
							if(response.Message!==null || response.Message!==undefined){
								appConfig.utility.showMessage(response.Message,'错误');
							}else{
								appConfig.utility.showMessage('未知的错误类型,请联系系统管理员','警告');
							}
						}else{
							success(response);
						}
					}
				},
				error:function(xhr,status){
					reportApp.hidePreloader();
					if(error!=undefined){
						error();
					}
					appConfig.utility.showMessage('请求失败,请稍后重试或者联系系统管理员','警告');
				}
			});
		}
	}
};