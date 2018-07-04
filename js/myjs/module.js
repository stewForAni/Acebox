define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');
    var Flickity = require('flickity');

    var containerId = "#module_container";
    var currentType = "guidance";
    var TYPE_GUIDANCE = "guidance";
    var TYPE_INTERACTION = "interaction";
    var TYPE_COMPETITION = "competition";


    var title;
    var description;
    var coverName;
    var coverFile;
    var pics = new Array();
    var picsName = new Array();
    var picsTokens = new Array();

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
        var currentID = '';

        if (currentType == TYPE_GUIDANCE) {
            currentID = '#module_list_1';
        } else if (currentType == TYPE_INTERACTION) {
            currentID = '#module_list_2';
        } else if (currentType == TYPE_COMPETITION) {
            currentID = '#module_list_3';
        }

        $(currentID).html('');

        for (var i = 0; i < l; i++) {
            var item = d[i];
            var pic = item.cover;
            var title = item.title;
            var description = item.detail;
            var time = getTime(item.created_at);

            if (isEmpty(pic)) {
                pic = "images/changelog_icon1.jpg";
            } else {
                pic = ACE_BASE_IMG_URL + pic;
            }

            if (isEmpty(title)) {
                title = "N/A";
            }


            if (isEmpty(description)) {
                description = "N/A";
            }

            var module_list_item = '<li class="col-12 col-md-6 col-lg-3">' +



                '<div class="card">' +
                '<img class="my-card-img-top" src="' + pic + '"  alt="Card image cap" style="object-fit:cover;cursor:pointer" id="module_cover_' + i + '"> ' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + title + '</h5>' +
                '<small style="color:#4582EC">' + time + '</small>' +
                '<small class="card-text text-body" style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">' + description + '</small>' +
                '</div>' +
                '<div class="card-footer card-footer-borderless d-flex justify-content-between">' +
                '<div class="text-small">' +
                '<ul class="list-inline">' +
                '<li class="list-inline-item" style="color:#666666"><i class="icon-heart mr-1"></i>999+</li>' +
                '<li class="list-inline-item" style="color:#666666"><i class="icon-download mr-1"></i>999+</li>' +
                '</ul>' +
                '</div>' +
                '<div class="dropup">' +
                '<button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="BenchButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '<i class="icon-dots-three-horizontal"></i>' +
                '</button>' +
                '<div class="dropdown-menu dropdown-menu-sm" aria-labelledby="BenchButton">' +
                '<a class="dropdown-item" id="module_edit_' + i + '" style="cursor:pointer;">Edit</a>' +
                '<div class="dropdown-divider"></div>' +
                '<a class="dropdown-item" id="module_delete_' + i + '" style="cursor:pointer;">Delete</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>';

            $(currentID).append(module_list_item);




            (function(item) {
                $("#module_edit_" + i).click(function() {
                    editModule(item);
                    return false;
                });
            })(item);

            (function(item) {
                $("#module_delete_" + i).click(function() {
                    return false;
                });
            })(item);


            (function(item) {
                $("#module_cover_" + i).click(function() {
                    showModuleDetail(item);
                    return false;
                });
            })(item);
        }


    }

    function showModuleDetail(item) {
        showModuleDetailModal(containerId, item);
        var d = item.screenshots;
        var l = d.length;

        for (var i = 0; i < l; i++) {
            var cell_content = '<div class="carousel-cell col-12 text-center">' +
                '<div class="card text-white col-12"  style="height:400px">' +
                '<div class="card-body d-flex align-items-center justify-content-center">' +
                '<img alt="Image" src="' + ACE_BASE_IMG_URL + d[i] + '" class="bg-image"/>' +
                '</div>' +
                '</div>' +
                '<div class="row" style="margin-top:30px">' +
                '<div class="col">' +
                '<small>' + item.detail + '</small>' +
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




        $('#showModuleDetailModal').on('shown.bs.modal', function(event) {
            flkty.resize();
        });


    }

    function editModule(item) {
        showEditModuleModal(containerId, 'Module');

        $('#module_cover_input').change(function() {
            coverFile = this.files[0];
            $('#cover_file_name').html(coverFile.name);
        });

        $('#module_pics_input').change(function() {
            pics = this.files;
            var picsText = "";
            for (var i = 0; i < pics.length; i++) {
                picsText = picsText + (i + 1) + ' . ' + pics[i].name + '<br/>';
            }
            $('#pics_file_name').html(picsText);
        });

        $("#edit_module").click(function() {
            title = $('#module_name').val();
            description = $('#module_des').val();
            if (isEmpty(coverFile) || isEmpty(pics) || isEmpty(title) || isEmpty(description)) {
                return false;
            }
            uploadCover(item);
            return false;
        });
    }


    function uploadCover(item) {
        var formData = new FormData();
        formData.append('file', coverFile);
        $.ajax({
            url: ACE_BASE_URL + ACE_FILE_UPLOAD,
            type: "POST",
            contentType: "application/form-Data",
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                uploadScreenShots(result.data.token, item);
            },
            error: function(e) {
                hideEditModuleModal();
            }
        });
    }


    function uploadScreenShots(coverToken, item) {

        for (var i = 0; i < pics.length; i++) {
            var file = pics[i];
            (function(file) {
                var formData = new FormData();
                formData.append('file', file);
                $.ajax({
                    url: ACE_BASE_URL + ACE_FILE_UPLOAD,
                    type: "POST",
                    contentType: "application/form-Data",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(result) {
                        picsTokens.push(result.data.token);
                        if (picsTokens.length == pics.length) {
                            editModuleApi(coverToken, picsTokens, item);
                        }
                    },
                    error: function(e) {
                        hideEditModuleModal();
                    }
                });
            })(file);
        }
    }


    function editModuleApi(token, tokens, item) {
        var screenshotTokens = '';
        for (var i = 0; i < pics.length; i++) {
            if (i == (pics.length - 1)) {
                screenshotTokens = screenshotTokens + tokens[i];
            } else {
                screenshotTokens = screenshotTokens + tokens[i] + ',';
            }
        }

        var d = '{' +
            '"title": "' + title + '",' +
            '"cover": "' + token + '",' +
            '"detail": "' + description + '",' +
            '"screenshots": "' + screenshotTokens + '"' +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_EDIT_MODULE + '/' + item.id,
            contentType: "application/json; charset=UTF-8",
            type: "PUT",
            data: d,
            success: function(result) {
                hideEditModuleModal();
            },
            error: function(e) {
                hideEditModuleModal();
            }
        });
    }


    function addModule() {
        showAddModuleModal(containerId, "Add Module");
        $("#confirm_add_module").click(function() {
            var name = $("#module_name").val();
            var type = $("#module_type").val();

            if (isEmpty(name) || isEmpty(type)) {
                return false;
            }

            var d = '{' +
                '"title": "' + name + '",' +
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
            return false;
        });
    }

});