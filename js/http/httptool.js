define(function(require) {
    return {
        processData: processData
    }


    var URI = 'Https://api.dev.landi.com/v1/';



    function processData(url, type, data, contentType = "application/json; charset=utf-8") {
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