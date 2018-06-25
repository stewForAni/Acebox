define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var containerId = "#module_container";
    var currentType = 1;
    var TYPE_GUIDANCE = 1;
    var TYPE_INTERACTION = 2;
    var TYPE_COMPETITION = 3;

    init();

    function init() {
        $("#log_out").click(function() {
            logout();
            return false;
        });
        
        tabEvents();
        getModuleList();
    }

    function tabEvents() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {

            var currentElement = $(e.target).attr("href");

            if ("#Guidance" == currentElement) {
                currentType = TYPE_GUIDANCE;
            } else if ("#Interaction" == currentElement) {
                currentType = TYPE_INTERACTION;
            } else if ("#Competition" == currentElement) {
                currentType = TYPE_COMPETITION;
            }

            getDataList(currentType);
        });
    }

    function getModuleList() {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_MODULE_LIST + "?per-page=" + 100,
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

        for (var i = 0; i < l; i++) {
            var item = d[i];
            var module_list_item = '<li class="col-12 col-md-6 col-lg-3">' +
                '<div class="card">' +
                '<img class="card-img-top" src="' + ACE_BASE_IMG_URL + item.sketch + '" alt="Card image cap">' +
                '<div class="card-body">' +
                '<h4 class="card-title">' + item.title + '</h4>' +
                '<p class="card-text text-body">' + item.description + '</p>' +
                '</div>' +
                '<div class="card-footer card-footer-borderless d-flex justify-content-between">' +
                '<div class="text-small">' +
                '<ul class="list-inline">' +
                '<li class="list-inline-item"><i class="icon-heart mr-1"></i> 0</li>' +
                '<li class="list-inline-item"><i class="icon-download mr-1"></i> 62</li>' +
                '</ul>' +
                '</div>' +
                '<div class="dropup">' +
                '<button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="BenchButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<i class="icon-dots-three-horizontal"></i>' +
                '</button>' +
                '<div class="dropdown-menu dropdown-menu-sm" aria-labelledby="BenchButton">' +
                '<a class="dropdown-item" href="#">Edit</a>' +
                '<div class="dropdown-divider"></div>' +
                '<a class="dropdown-item" href="#">Delete</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>';

            $('#module_list').append(module_list_item);
        }
    }

});