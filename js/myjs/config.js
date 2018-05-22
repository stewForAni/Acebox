require.config({
	baseUrl:"js",
	paths: {
		"jquery":"jquery-3.3.1.min",
		"bootstrap":"bootstrap.bundle.min", //包含了popper

		"http":"./service/http",
		"scroll":"./myjs/scrollre",
		"ajaxUtil":"./myjs/ajaxUtil",
		"getData":"./app/commongetdata",
		"commonData":"./app/commondata",
		"setting":"./service/setting",
		"commoncontent":"./myjs/commoncontent"
	},
	shim:{
		"bootstrap":[
			"jquery"
		],
		"http":[
			"jquery","setting"
		],
		"scroll":[
			"jquery"
		],
		"ajaxUtil":[
			"jquery","http"
		],
		"getData":[
			"jquery"
		],
		"commoncontent":[
			"jquery"
		],
	}
});