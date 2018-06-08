define(function(require) {
    var $ = require('jquery');

    return {
        page_data: page_data,
        col_data: col_data
    }

    function page_data(pagedata, multiplicity = '') {
        if (multiplicity == '') {
            var pagination = $(".pagination");
        } else {
            var pagination = multiplicity.find(".pagination");
        }
        if (pagination.find(".page-item").length == 0) {
            var page_item = '';
            for (var i = 1; i < pagedata.counts.total_page + 1; i++) {
                page_item += '<li class="page-item"><a class="page-link" href="javascript:void(0);">' + i + '</a></li>';
            }
            pagination.append(page_item);
        }
    }

    function col_data(type, object) {
        var COL = '';
        if (type == 'RESOURCE_PICTURE') {
            COL = '<li class="col-12 col-md-4 col-lg-3">\n' +
                '                    <div class="card">\n' +
                '                        <img class="card-img-top" src="' + object.download_file + '">' +
                '                        <div class="card-body">\n' +
                '                            <h4 class="card-title search-title">' + object.title + '</h4>\n' +
                '                            <p class="card-text">Holistic fitness tracking</p>\n' +
                '                        </div>\n' +
                '                        <div class="card-footer card-footer-borderless d-flex justify-content-between">\n' +
                '                            <div class="text-small">\n' +
                '                                <ul class="list-inline">\n' +
                '                                    <li class="list-inline-item"><i class="icon-heart"></i> 221</li>\n' +
                '                                    <a href="http://api.acebox.abc360.work/v1/downloadfiles?source_url=' + object.title_picture + '">\n' +
                '                                        <li class="list-inline-item">\n' +
                '                                            <i class="icon-download"></i> download\n' +
                '                                        </li>\n' +
                '                                    </a>\n' +
                '                                </ul>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </li>\n';
        } else if (type == 'RESOURCE_VIDEO') {
            COL = '<li class="col-12 col-md-6 col-lg-4">\n' +
                '    <div class="card">' +
                '        <div class="video-cover rounded">' +
                '            <img class="card-img-top" src="' + object.title_picture + '" video="' + object.file_url + '" alt="Card image cap">' +
                '            <div data-toggle="modal" data-target=".bs-modal-lg">' +
                '                <div class="video-play-icon">' +
                '                    <i class="icon-controller-play"></i>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '        <div class="card-body">' +
                '            <h4 class="card-title search-title">' + object.title + '</h4>' +
                '            <p class="card-text">视频描述</p>' +
                '        </div>' +
                '        <div class="card-footer card-footer-borderless d-flex justify-content-between">' +
                '            <div class="text-small">' +
                '                <ul class="list-inline">' +
                '                    <li class="list-inline-item"><i class="icon-heart"></i> 221</li>' +
                '                    <a href="' + object.file_url + '" download>' +
                '                        <li class="list-inline-item">' +
                '                            <i class="icon-download"></i> download' +
                '                        </li>' +
                '                    </a>' +
                '                </ul>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</li>';
        } else if (type == 'RESOURCE_AUDIO') {
            COL = '<li class="list-group-item" style="background: #FAFAFA;">' +
                '                <div class="media align-items-center">' +
                '                    <a href="#" class="mr-4">' +
                '                        <img alt="Image" src="' + object.title_picture + '" class="rounded avatar">' +
                '                    </a>' +
                '                    <div class="media-body row">' +
                '                        <div class="d-flex justify-content-between mb-2 col-sm-2">' +
                '                            <div>' +
                '                                <a href="#" class="mb-1">' +
                '                                    <h4>' + object.title + '</h4>' +
                '                                </a>' +
                '                            </div>' +
                '                        </div>' +
                '                        <div class="col-sm-5">' +
                '                    <span>' +
                '                        <audio src="' + object.file_url + '" controls>' +
                '                            此浏览器不支持aideo标签' +
                '                        </audio>' +
                '                    </span>' +
                '                        </div>' +
                '                        <div class="col-sm-3">' +
                '                            <ul class="list-inline" style="margin-top: 3px;">' +
                '                                <a href="' + object.file_url + '" download>' +
                '                                    <li class="list-inline-item">' +
                '                                        <i class="icon-download"></i> download' +
                '                                    </li>' +
                '                                </a>' +
                '                            </ul>' +
                '                        </div>' +
                '                    </div>' +
                '                </div>' +
                '            </li>';
        } else if (type == 'RESOURCE_ANIMATION') {
            COL = '<li class="list-group-item">' +
                '            <div class="media align-items-center">' +
                '                <a href="#" class="mr-4">' +
                '                    <img alt="Image" src="' + object.title_picture + '" class="rounded avatar avatar-lg">' +
                '                </a>' +
                '                <div class="media-body">' +
                '                    <div class="d-flex justify-content-between mb-2">' +
                '                        <div>' +
                '                            <a href="#" class="mb-1">' +
                '                                <h4>' + object.title + '</h4>' +
                '                            </a>' +
                '                            <span>动画描述</span>' +
                '                        </div>' +
                '                    </div>' +
                '                    <a class="badge badge-secondary badge-pill mb-2" href="#">动画标签</a>' +
                '                    <div class="text-small">' +
                '                        <ul class="list-inline">' +
                '                            <li class="list-inline-item"><i class="icon-heart"></i> 90</li>' +
                '                            <a href="' + object.file_url + '" download>' +
                '                                <li class="list-inline-item">' +
                '                                    <i class="icon-download"></i> download' +
                '                                </li>' +
                '                            </a>' +
                '                        </ul>' +
                '                    </div>' +
                '                </div>' +
                '            </div>' +
                '        </li>';
        } else if (type == 'USER_INFORMATION') {
            COL = '<tr class="bg-white">\n' +
                '            <th scope="row">\n' +
                '                <div class="media align-items-center">\n' +
                '                    <img alt="Image" src="' + object.picture + '" class="avatar">\n' +
                '                </div>\n' +
                '            </th>\n' +
                '            <td>\n' +
                '                <div class="media-body">\n' +
                '                        <span class="h6 mb-0">' + object.username + '\n' +
                '                            <span class="badge badge-secondary">' + object.usertype + '</span>\n' +
                '                        </span>\n' +
                '                </div>\n' +
                '            </td>\n' +
                '            <td>' + object.userid + '</td>\n' +
                '            <td>' + object.position + '</td>\n' +
                '            <td>\n' +
                '                <div class="dropdown">\n' +
                '                    <button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="dropdownMenuButton-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
                '                        <i class="icon-dots-three-horizontal"></i>\n' +
                '                    </button>\n' +
                '                    <div class="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0px; left: 0px; will-change: transform;">\n' +
                '                        <a class="dropdown-item" href="#">Contact</a>\n' +
                '                        <a class="dropdown-item" href="#">Assign</a>\n' +
                '                        <a class="dropdown-item" href="#">Share</a>\n' +
                '                        <div class="dropdown-divider"></div>\n' +
                '                        <a class="dropdown-item" href="#">Remove</a>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </td>\n' +
                '        </tr>\n' +
                '        <tr class="table-divider"></tr>';
        }
        return COL;
    }
})