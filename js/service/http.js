define(function(require){
    var $ = require('jquery');
    return {
        getList:getList
    }

    function getList(url,type,page) {
        return $.ajax({
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            type: type,
            url: url,
            cache: false,
            data: {
                "page": page,
                "per-page": 3
            }
        });
    }
})