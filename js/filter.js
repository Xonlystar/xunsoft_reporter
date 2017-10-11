//日期过滤器
Vue.filter('date', function (value) {
  
  if(!appConfig.utility.hasValue(value)){
  	return "暂无";
  }

  //临时变量，时间对象
  var dateValue=null;

  //传递日期值
  if(_.isDate(value)){
  	dateValue=value;
  }
  //传递日期字符串
  if(_.isString(value)){
  	var datams=Date.parse(value);
  	dateValue=new Date(datams); 
  }
  //传递毫秒数
  if(_.isNumber(value)){
  	dateValue=new Date(value);
  }

  if(dateValue!=null){
  	return dateValue.getFullYear()+"-"+(dateValue.getMonth()+1)+"-"+dateValue.getDate();
  }
  return value;
  
})

//日期时间过滤器
Vue.filter('dateTime', function (value) {
  
  if(!appConfig.utility.hasValue(value)){
  	return "暂无";
  }

  //临时变量，时间对象
  var dateValue=null;

  //传递日期值
  if(_.isDate(value)){
  	dateValue=value;
  }
  //传递日期字符串
  if(_.isString(value)){
  	var datams=Date.parse(value);
  	dateValue=new Date(datams); 
  }
  //传递毫秒数
  if(_.isNumber(value)){
  	dateValue=new Date(value);
  }

  if(dateValue!=null){
  	return dateValue.getFullYear()+"-"+(dateValue.getMonth()+1)+"-"+dateValue.getDate()+
  		" "+(dateValue.getHours())+":"+(dateValue.getMinutes())+":"+(dateValue.getSeconds());
  }

  return value;
})