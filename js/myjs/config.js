require.config({
	baseUrl:"./js",
	paths: {
		"jquery":"jquery-3.3.1.min",
		"bootstrap":"bootstrap.bundle.min",
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
			"jquery"
		],
		"getData":[
			"jquery"
		],
		"commoncontent":[
			"jquery"
		],
	}
});


//paths:只是明确引用js文件的路径

//shim:只是明确依赖关系