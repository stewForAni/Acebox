require.config({
	baseUrl:"/acebox_test/js",
	paths: {
		"jquery":"jquery-3.3.1.min",
		"bootstrap":"bootstrap.bundle.min",
		"http":"./myjs/service/http",
		"scroll":"./myjs/scrollre"
	},
	shim:{
		"bootstrap":[
			"jquery"
		],
		"https":[
			"jquery"
		],
		"scroll":[
			"jquery"
		],
	}
});