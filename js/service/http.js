define(function(require){
    var $ = require('jquery');
    require('setting');
    return {
        processData:processData
    }

    function processData(url,type,data,contentType="application/json; charset=utf-8") {
        return $.ajax({
            crossDomain: true,
            contentType: contentType,
            type: type,
            url: URI + url,
            cache: false,
            data: data
        });
    }

})