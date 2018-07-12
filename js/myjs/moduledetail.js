define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');
    require('zoom');
    var Flickity = require('flickity');

    var type;
    var id;

    init();

    function init() {

        var url = location.search;
        var obj = {};

        if (url.indexOf("?") != -1) {
            var strs = url.substr(1).split("&");　
            for (var i = 0; i < strs.length; i++) {
                obj[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }

        type = obj.module_type;
        id = obj.module_id;

        getModuleList(type);
    }


    function getModuleList(currentType) {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_MODULE_LIST + "?per-page=" + 100 + "&part_code=" + currentType,
            contentType: "application/json; charset=UTF-8",
            type: "GET",
            success: function(result) {
                dealModuleListData(result);
            },
            error: function(e) {}
        });
    }

    function dealModuleListData(result) {
        var d = result.data.items;
        var l = result.data.items.length;
        var currentModuleData;

        for (var i = 0; i < l; i++) {
            if (d[i].id == id) {
                currentModuleData = d[i];
                break;
            }
        }

        if (!isEmpty(currentModuleData)) {

            $('#moduledetail_section').append(getModuleDetailContent(currentModuleData));

            var d1 = currentModuleData.screenshots;
            var l1 = d1.length;

            for (var i = 0; i < l1; i++) {
                var cell_content = '<div class="carousel-cell col-12" style="width:70%">' +
                    '<div class="card text-white col-12"  style="height:250px">' +
                    '<div class="card-body">' +
                    '<img data-action="zoom" alt="Image" src="' + ACE_BASE_IMG_URL + d1[i] + '" class="bg-image" style="box-shadow: 1px 1px 2px #888888;border-radius:3px;cursor:pointer"/>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" style="margin-top:30px">' +
                    '<div class="col">' +
                    '<small>' + currentModuleData.detail + '</small>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('.main-carousel').append(cell_content);
            }

            var flkty = new Flickity('.main-carousel', {
                cellAlign: "center",
                contain: true,
                prevNextButtons: true,
                pageDots: true,
                wrapAround: true,
                autoPlay: 5000,
                imagesLoaded: true
            });
        }
    }






    function getModuleDetailContent(item) {
        var name = item.author;
        if (isEmpty(name)) {
            name = "最初版本";
        }
        var content ='<div class="container">'+
            '<div class="row">' +
            '<div class="col">' +

            '<div class="media align-items-center">' +
            '<img alt="Image" src="' + ACE_BASE_IMG_URL + item.cover + '" class="avatar avatar-lg avatar-square" style="box-shadow: 1px 1px 2px #888888;border-radius: 3px;" />' +
            '<div class="media-body">' +
            '<div class="mb-3">' +
            '<h1 class="h2 mb-2">' + item.title + '</h1>' +
            '<span>' + '[' + name + ']' + getTime(item.created_at) + '</span>' +
            '</div>' +
            '<div>' +
            '<ul class="list-inline text-small d-inline-block">' +
            '<li class="list-inline-item" style="color:#666666"><i class="icon-heart mr-1"></i>999+</li>' +
            '<li class="list-inline-item" style="color:#666666"><i class="icon-download mr-1"></i>999+</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div class="col-auto">' +
            '<button class="btn btn-primary" id="add_module"><i class="icon-download mr-2"></i>Download</button>' +
            '</div>' +
            '</div>' +


            '<div class="row" style="margin-top:30px">' +
            '<div class="col">' +
            '<small>' + item.detail + '</small>' +
            '</div>' +
            '</div>' +

            '<div class="row" style="margin-top:30px">' +
            '<div class="col">' +
            '<div class="main-carousel mb-5">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return content;
    }



});