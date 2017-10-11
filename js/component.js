Vue.component('category-pic',{
	props:['url'],
	template:
		'<div style="max-width:64px">'+
			'<img class="img-responsive" v-if="url!=null" v-bind:src="url" />'+
			'<img class="img-responsive" v-if="url==null" src="img/category.png" />'+
		'</div>'
});

Vue.component('report-pic',{
	props:['url'],
	template:
		'<div style="max-width:64px">'+
			'<img class="img-responsive" v-if="url!=null" v-bind:src="url" />'+
			'<img class="img-responsive" v-if="url==null" src="img/report.png" />'+
		'</div>'
});

Vue.component('logo-pic',{
	props:['url'],
	template:
		'<div>'+
			'<img class="img-responsive center-block" v-if="url!=null" v-bind:src="url" onerror="javascript:this.src=\'img/logo.jpg\';" />'+
		'</div>'
});