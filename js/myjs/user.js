define(function(require, exports,module) {
    require('bootstrap');
    var $ = require('jquery'),
        httpService = require('http'),
        scroll = require('scroll'),
        getData = require('getData');
    require('ajaxUtil');

    var user_api = "",
        per_page = 3;

    init();


    function init(){
    	registerEvents();
    	get_user_data(user_api, "GET");
    }

    function registerEvents(){
    	$("body")
        .on('click', ".pagination a", function () {
            var p = $(this).text();
            get_user_data(user_api, "GET", p);
        });
    }

    function get_user_data(url, type, page=1){
        var parameterData = {
            "page":page,
            "per-page":per_page
        };
    	httpService.processData(url,type,parameterData).done(function(result){
    		var col = '';
    		var contentList = $("#table_user").find(".bg-white");
    		if(result.data.items.length == 0){
    			contentList.append("没有数据！");
    		}else{
    			if(contentList.length){
    				contentList.html("");
    			}
    			$.each(result.data.items, function(index, obj){
    				col += getData.col_data(obj);
    			});
    			contentList.append(col);
    			getData.page_data(result.data);
    		}
    	});
    }
});