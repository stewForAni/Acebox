define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var containerId = "#module_container";
    var currentType = "Guidance";
    var TYPE_GUIDANCE = "Guidance";
    var TYPE_INTERACTION = "Interaction";
    var TYPE_COMPETITION = "Competition";

    init();

    function init() {
        $("#log_out").click(function() {
            logout();
            return false;
        });

        $("#add_module").click(function() {
            addModule();
            return false;
        });


        tabEvents();
        getModuleList(currentType);
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

            getModuleList(currentType);
        });
    }

    function getModuleList(currentType) {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_MODULE_LIST + "?per-page=" + 100 + "&type_id=" + currentType,
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
        var currentID = '';

        if (currentType == TYPE_GUIDANCE) {
            currentID = '#module_list_1';
        } else if (currentType == TYPE_INTERACTION) {
            currentID = '#module_list_2';
        } else if (currentType == TYPE_COMPETITION) {
            currentID = '#module_list_3';
        }

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
                '<li class="list-inline-item"><i class="icon-download mr-1"></i> 0</li>' +
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

            $(currentID).append(module_list_item);
        }
    }

    function addModule() {
        showAddModuleModal(containerId, "Add Module");
        var name = $("#module_name").val();
        var type = $("#module_type").val();
        var d = '{' +
            '"name": "' + name + '",' +
            '"part_code": "' + type + '"' +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_ADD_MODULE,
            contentType: "application/json; charset=UTF-8",
            type: "POST",
            data: d,
            success: function(result) {
                hideAddModuleModal();
            },
            error: function(e) { hideAddModuleModal(); }
        });
    }

});