define(function(require, exports,module){
    require('bootstrap');
    var $ = require('jquery'),
        httpService = require('http'),
        scroll = require('scroll'),
        getData = require('getData');


    require('ajaxUtil');

    var picture_api = "material/lists",
        video_api = "",
        audio_api = "",
        animation_api = "",
        sourcebar = "",
        per_page = 3;
    // 视频
    var video = $("#video").get(0);

    init();

    function init() {
        registerEvents();
        get_resource_data(picture_api, $("#picture"), "GET");
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
                get_resource_data(picture_api, $(currentElement),"GET");
            }

            if ("#video" == currentElement) {
                sourcebar = "video";
                get_resource_data(video_api, $(currentElement), "GET");
            }

            if("#audio" == currentElement){
                sourcebar = "audio";
                get_resource_data(audio_api, $(currentElement), "GET");
            }

            if("#animation" == currentElement){
                sourcebar = "animation";
                get_resource_data(animation_api, $(currentElement), "GET");
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
        .on('click', "#picture .pagination a", function () {
            // $("#video").attr("src", $(this).attr("video"));
            var p = $(this).text();
            get_resource_data(picture_api, $("#picture"), "GET", p);
            search();
        })
        .on('click', "#video .pagination a", function () {
            var p = $(this).text();
            get_resource_data(video_api, $("#video"), "GET", p);
            search();
        })
        .on('click', "#audio .pagination a", function () {
            var p = $(this).text();
            get_resource_data(audio_api, $("#audio"), "GET", p);
            search();
        })
        .on('click', "#animation .pagination a", function () {
            var p = $(this).text();
            get_resource_data(animation_api, $("#animation"), "GET", p);
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

    function col_data(object){
        if(sourcebar == "picture" || sourcebar == ""){
            return getData.col_data('RESOURCE_PICTURE', object);
        }
        if(sourcebar == "video"){
            return getData.col_data('RESOURCE_VIDEO', object);
        }
        if(sourcebar == "audio"){
            return getData.col_data('RESOURCE_AUDIO', object);
        }
        if(sourcebar == "animation"){
            return getData.col_data('RESOURCE_ANIMATION', object);
        }
    }

    function get_resource_data(url, ele, type, page=1) {
        var parameterData = {
            "page":page,
            "per-page":per_page
        };
        httpService.processData(url, type, parameterData).done(function(result){
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
                getData.page_data(result.data, ele);
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