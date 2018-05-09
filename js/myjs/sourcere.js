define(function(require, exports,module){
    require('bootstrap');
    var $ = require('jquery'),
        httpService = require('http'),
        scroll = require('scroll');

    var picture_url = "http://api.acebox.abc360.work/v1/material/lists";
    var video_url = "";
    var audio_url = "";
    var animation_url = "";
    var sourcebar = "";
    // 视频
    var video = $("#video").get(0);

    init();

    function init() {
        registerEvents();
        get_source_data(picture_url, $("#picture"), "GET");
    }

    function registerEvents() {
        tabEvents();
        bodyEvents();
        keyEvents();
    }

    function tabEvents(){
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var currentElement = $(e.target).attr("href");
            if ("#picture" == currentElement) {
                sourcebar = "picture";
                get_source_data(picture_url, $(currentElement),"GET");
            }

            if ("#video" == currentElement) {
                sourcebar = "video";
                get_source_data(video_url, $(currentElement), "GET");
            }

            if("#audio" == currentElement){
                sourcebar = "audio";
                get_source_data(audio_url, $(currentElement), "GET");
            }

            if("#animation" == currentElement){
                sourcebar = "animation";
                get_source_data(animation_url, $(currentElement), "GET");
            }
        });
    }

    function bodyEvents(){
        $("body")
        .on('click', "#img-zoom", function () {
            $('#img-modal').modal("hide");
        })
        .on('click', "#img-dialog", function () {
            $('#img-modal').modal("hide");
        })
        .on('click', ".pagination a", function () {
            // $("#video").attr("src", $(this).attr("video"));
            var p = $(this).text();
            // alert(p);
            get_source_data(picture_url, $("#picture"), "GET", p);
            search();
        })
        .on('click', ".index-list-content img", function () {
            var src = $(this).attr("src");
            $("#img-zoom").attr("src", src);
            var oImg = $(this);
            var img = new Image();
            img.src = $(oImg).attr("src");
            var realWidth = img.width;//真实的宽度
            var realHeight = img.height;//真实的高度
            var ww = $(window).width();//当前浏览器可视宽度
            var wh = $(window).height();//当前浏览器可视宽度
            var ll = $("#img-dialog").css('margin-left');
            // alert(ll);
            // alert(wh);
            $("#img-content").css({"top": 0, "left": 0, "height": "auto"});
            // $("#img-zoom").css({"height":"auto"});
            if ((realWidth + 20) > ww) {
                $("#img-content").css({"width": "100%"});
                $("#img-zoom").css({"width": "99%"});
            } else {
                $("#img-content").css({"width": realWidth + 20, "height": realHeight + 20});
                $("#img-zoom").css({"width": realWidth, "height": realHeight});
            }
            if ((wh - realHeight - 40) > 0) {
                $("#img-content").css({"top": (wh - realHeight) / 2});
            }
            if ((ww - realWidth - 20) > 0) {
                $("#img-content").css({"left": ((ww - realWidth) / 2)});
            }
            // console.log("realWidth:"+realWidth+" realHeight:"+realHeight+" ww:"+ww)
            $('#img-modal').modal();
        })
        .on('click', ".video-play-icon", function () {
            $("#video").attr("src", $(this).parent().prev("img").attr("video"));
        })
        .on('click',"#video",function(){
            videoSmart();
        })
        .on('click',".search-button",function(){
            search();
        });
    }

    function keyEvents(){
        $(document).keydown(function () {
            // console.log(event.keyCode);
            if(event.keyCode == 32){
                // 空格
                videoSmart();
            }else if(event.keyCode == 37){
                // 回退
                // console.log(video.currentTime);
                recede();
            }else if(event.keyCode == 38){
                // 上键
                volumeInc();
            }else if(event.keyCode == 39){
                // 右键
                onward();
            }else if(event.keyCode == 40){
                // 下键
                volumeDec();
            }else if(event.keyCode == 13){
                // 回车
                search();
            }
        });
    }

    function page_data(pagedata){
        var pagination = $(".pagination");
        if ($(".pagination>.page-item").length == 0) {
            for (var i = 1; i < pagedata.counts.total_page + 1; i++) {
                var page_item = '<li class="page-item"><a class="page-link" href="javascript:void(0);">' + i + '</a></li>';
                $(".pagination").append(page_item);
            }
        }
    }

    function col_data(object){
        if(sourcebar == "picture" || sourcebar == ""){
            var picture_col = '<li class="col-12 col-md-6 col-lg-4">\n' +
                        '                    <div class="card">\n' +
                        '                        <img class="card-img-top" src="' + object.title_picture + '">' +
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
                        '                </li>';
            return picture_col;
        }
        if(sourcebar == "video"){

            var video_col = '<li class="col-12 col-md-6 col-lg-4">\n' +
                        '    <div class="card">' +
                        '        <div class="video-cover rounded">' +
                        '            <img class="card-img-top" src="'+ object.title_picture +'" video="'+ object.file_url +'" alt="Card image cap">' +
                        '            <div data-toggle="modal" data-target=".bs-modal-lg">' +
                        '                <div class="video-play-icon">' +
                        '                    <i class="icon-controller-play"></i>' +
                        '                </div>' +
                        '            </div>' +
                        '        </div>' +
                        '        <div class="card-body">' +
                        '            <h4 class="card-title search-title">'+ object.title +'</h4>' +
                        '            <p class="card-text">视频描述</p>' +
                        '        </div>' +
                        '        <div class="card-footer card-footer-borderless d-flex justify-content-between">' +
                        '            <div class="text-small">' +
                        '                <ul class="list-inline">' +
                        '                    <li class="list-inline-item"><i class="icon-heart"></i> 221</li>' +
                        '                    <a href="'+ object.file_url +'" download>' +
                        '                        <li class="list-inline-item">' +
                        '                            <i class="icon-download"></i> download' +
                        '                        </li>' +
                        '                    </a>' +
                        '                </ul>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</li>';
            return video_col;
        }
        if(sourcebar == "audio"){
            var audio_col = '<li class="list-group-item" style="background: #FAFAFA;">' +
                        '                <div class="media align-items-center">' +
                        '                    <a href="#" class="mr-4">' +
                        '                        <img alt="Image" src="'+ object.title_picture +'" class="rounded avatar">' +
                        '                    </a>' +
                        '                    <div class="media-body row">' +
                        '                        <div class="d-flex justify-content-between mb-2 col-sm-2">' +
                        '                            <div>' +
                        '                                <a href="#" class="mb-1">' +
                        '                                    <h4>'+ object.title +'</h4>' +
                        '                                </a>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="col-sm-5">' +
                        '                    <span>' +
                        '                        <audio src="'+ object.file_url +'" controls>' +
                        '                            此浏览器不支持video标签' +
                        '                        </audio>' +
                        '                    </span>' +
                        '                        </div>' +
                        '                        <div class="col-sm-3">' +
                        '                            <ul class="list-inline" style="margin-top: 3px;">' +
                        '                                <a href="'+ object.file_url +'" download>' +
                        '                                    <li class="list-inline-item">' +
                        '                                        <i class="icon-download"></i> download' +
                        '                                    </li>' +
                        '                                </a>' +
                        '                            </ul>' +
                        '                        </div>' +
                        '                    </div>' +
                        '                </div>' + 
                        '            </li>';
            return audio_col;
        }
        if(sourcebar == "animation"){
            var animation_col = '<li class="list-group-item">' +
                            '            <div class="media align-items-center">' +
                            '                <a href="#" class="mr-4">' +
                            '                    <img alt="Image" src="'+ object.title_picture +'" class="rounded avatar avatar-lg">' +
                            '                </a>' +
                            '                <div class="media-body">' +
                            '                    <div class="d-flex justify-content-between mb-2">' +
                            '                        <div>' +
                            '                            <a href="#" class="mb-1">' +
                            '                                <h4>'+ object.title +'</h4>'
                            '                            </a>' +
                            '                            <span>动画描述</span>' +
                            '                        </div>' +
                            '                    </div>' +
                            '                    <a class="badge badge-secondary badge-pill mb-2" href="#">动画标签</a>' +
                            '                    <div class="text-small">' +
                            '                        <ul class="list-inline">' +
                            '                            <li class="list-inline-item"><i class="icon-heart"></i> 90</li>' +
                            '                            <a href="'+ object.file_url +'" download>' +
                            '                                <li class="list-inline-item">' +
                            '                                    <i class="icon-download"></i> download' +
                            '                                </li>' +
                            '                            </a>' +
                            '                        </ul>' +
                            '                    </div>' +
                            '                </div>' +
                            '            </div>' +
                            '        </li>';
            return animation_col;
        }
    }

    function get_source_data(url, ele, type, page=1) {
        httpService.getList(url, type, page).done(function(result){
            var col = '';
                var contentList = ele.find(".index-list-content");
                if (result.data.items.length == 0) {
                    contentList.append("没有数据！");
                } else {
                    if (contentList.find("li").length) {
                        contentList.html("");
                    }
                    $.each(result.data.items, function (index, obj) {
                        col += col_data(obj);
                    });
                    contentList.append(col);
                    page_data(result.data);
                    scroll.commonscroll();
                }
        })
        .fail(function(){
        });
    }

    

    // 暂停或播放
    function videoSmart(){
        if(video.paused){
            video.play();
        }else{
            video.pause();
        }
    }
    // 音量加
    function volumeInc(){
        video.volume > 0.9?video.volume = 1 : video.volume += 0.1;
    }
    // 音量减
    function volumeDec(){
        var video = $("#video").get(0);
        video.volume < 0.1?video.volume = 0 : video.volume -= 0.1;
    }
    // 前进10s
    function onward(){
        video.currentTime + 10 > video.duration ?video.currentTime = video.duration : video.currentTime += 10;
    }
    // 后退10s
    function recede(){
        video.currentTime - 10 < 0.1?video.currentTime = 0 : video.currentTime -= 10;
    }

    function search() {
        $.each($('.search-title'),function () {
            var str1 = $(this).html().toUpperCase();
            var str2 = $('input').val().toUpperCase();
            // console.log(str1);
            // console.log(str2);
            if((str1 == str2) || ((str1.search(str2) != -1) && (str2))){
                $(this).css({'background':'yellow'});
            }else{
                $(this).css({'background':''});
            }
        });
    }
    
});