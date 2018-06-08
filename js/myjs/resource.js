define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');
    require('multifileupload');
    var getData = require('getData');
    var currentOperation = 0;
    var currentFileType = -1;
    var fileTokenArray = new Array();


    init();

    function init() {

        $("#download_section").hide();

        $.ajax({
            url: ACE_BASE_URL + ACE_GET_FILE_TYPE,
            type: "GET",
            success: function(result) {
                setFileType(result);
                initUpload();
                initDownload();
            },
            error: function(e) {}
        });


        $("#select_operation").change(function() {
            currentOperation = $(this).children('option:selected').val();
            if (currentOperation == 0) {
                $('#upload_section').show();
                $('#file_type_content').show();
                $("#download_section").hide();
                $("#resource_download_search_btn").css("display", "none");
            } else if (currentOperation == 1) {
                $('#upload_section').hide();
                $('#file_type_content').hide();
                $("#download_section").show();
                $("#resource_download_search_btn").css("display", "inline");
            }
        });
    }


    function setFileType(data) {
        var d = data.data.items;
        var l = d.length;
        $('#select_file_type').empty();
        $('#select_file_type').append('<option value="0" selected>Select File Type</option>');
        for (var i = 0; i < l; i++) {
            $('#select_file_type').append('<option value="' + d[i].id + '">' + d[i].name + '</option>');
        }


        $("#select_file_type").change(function() {
            currentFileType = $(this).children('option:selected').val();
        });
    }


    function initUpload() {
        var params = {
            fileInput: $("#fileImage").get(0),
            dragDrop: $("#fileDragArea").get(0),
            upButton: $("#fileSubmit").get(0),
            url: ACE_BASE_URL + ACE_UPLOAD_RESOURCE,
            filter: function(files) {
                var arrFiles = [];
                for (var i = 0, file; file = files[i]; i++) {
                    if (file.type.indexOf("image") == 0) {
                        arrFiles.push(file);
                    } else {
                        alert('文件"' + file.name + '"不是图片。');
                    }
                }
                return arrFiles;
            },
            onSelect: function(files) {

                var html = '',
                    i = 0;
                var funAppendImage = function() {
                    file = files[i];
                    if (file) {
                        var reader = new FileReader()
                        var filename = "";
                        if (file.name.length > 12) {
                            filename = file.name.substring(0, 10) + "...";
                        } else {
                            filename = file.name;
                        }

                        reader.onload = function(e) {
                            html = html + '<div class="col-6 col-md-4 col-lg-3" id="uploadList_' + i + '" style="float:left; position:relative;margin-top:20px">' +
                                '<img id="uploadImage_' + i + '" src="' + e.target.result + '" style="width:120px;border-radius:4px;border-style: solid; border-width: 2px;border-color:#999999;object-fit:cover;"/>' +
                                '<div  id="uploadProgress_' + i + '" class="progress" style="height:5px;margin-top:10px;margin-left:20px;margin-right:20px;margin-bottom:5px;visibility: hidden;">' +
                                '<div id="progress_' + i + '" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%"></div>' +
                                '</div>' + filename +
                                '<br/><a href="javascript:" class="upload_delete" title="delete" data-index="' + i + '"><i class="icon-circle-with-cross"></i> delete</a>' +
                                '</div>';

                            i++;
                            funAppendImage();
                        }
                        reader.readAsDataURL(file);
                    } else {
                        $("#preview").html(html);
                        if (html) {
                            //删除方法
                            $(".upload_delete").click(function() {
                                MFUpload.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                                return false;
                            });
                            //提交按钮显示
                            $("#fileSubmit").show();
                        } else {
                            //提交按钮隐藏
                            $("#fileSubmit").hide();
                        }
                    }
                };
                funAppendImage();
            },
            onDelete: function(file) {
                $("#uploadList_" + file.index).fadeOut();
            },
            onDragOver: function() {
                $(this).addClass("upload_drag_hover");
            },
            onDragLeave: function() {
                $(this).removeClass("upload_drag_hover");
            },
            onProgress: function(file, loaded, total) {
                var eleProgress = $("#uploadProgress_" + file.index);
                var progress = $("#progress_" + file.index);
                var percent = (loaded / total * 100).toFixed(2) + '%';
                console.log(percent);
                eleProgress.css("visibility", "visible");
                progress.css('width', percent);
            },
            onSuccess: function(file, result) {
                $("#uploadInf").append("<small>[" + result.data.file_name + "] upload success,file address:" + ACE_BASE_IMG_URL + result.data.file_path + "</small>");
                fileTokenArray.push(result.data.token);
            },
            onFailure: function(file) {
                $("#uploadInf").append("<p>File : " + file.name + " upload failure</p>");
                $("#uploadImage_" + file.index).css("opacity", 0.2);
            },
            onComplete: function() {
                doAddResourceApi();
            },
            onComfireUpload: function() {
                console.log("2");
                if (currentFileType == -1 || currentOperation == -1 || isEmpty($("#resource_label").val())) {
                    console.log("3");
                    showModal("#resource_container", "Please select the file type and write label first !")
                    return true;
                }
                console.log("4");
                return false;
            },
        };

        MFUpload = $.extend(MFUpload, params);
        MFUpload.init();
    }


    function doAddResourceApi(result) {


        var token_str = "";
        var tag_str = $("#resource_label").val();

        for (var i = 0; i < fileTokenArray.length; i++) {
            token_str = token_str + fileTokenArray[i] + ",";
        }

        var d = {
            "type_id": currentFileType,
            "atgs": tag_str,
            "files_token": token_str
        };

        $.ajax({
            url: ACE_BASE_URL + ACE_GET_ADD_RESOURCE,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: d,
            success: function(result) {
                $("#fileSubmit").hide();
                $("#uploadInf").append("<p style=" + "color:#4582EC" + ";margin-top:10px" + "><i class=" + "icon-info-with-circle" + "></i> All files are uploaded and you can continue upload file.</p>");

            },
            error: function(e) {
                hideChangeStatusModal()
            }
        });
    }




    function initDownload() {

        var video = $("#video").get(0);
        var sourcebar = "";

        tabEvents();
        bodyEvents();
        keyEvents();

        function tabEvents() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                var currentElement = $(e.target).attr("href");
                if ("#picture" == currentElement) {
                    sourcebar = "picture";
                    get_resource_data(picture_api, $(currentElement), "GET");
                }
                if ("#video" == currentElement) {
                    sourcebar = "video";
                    get_resource_data(video_api, $(currentElement), "GET");
                }
                if ("#audio" == currentElement) {
                    sourcebar = "audio";
                    get_resource_data(audio_api, $(currentElement), "GET");
                }
                if ("#animation" == currentElement) {
                    sourcebar = "animation";
                    get_resource_data(animation_api, $(currentElement), "GET");
                }
            });
        }

        function bodyEvents() {
            $("body")
                .on('click', "#img-zoom", function() {
                    $('#img-modal').modal("hide");
                })
                .on('click', "#img-dialog", function() {
                    $('#img-modal').modal("hide");
                })
                .on('click', "#picture .pagination a", function() {
                    // $("#video").attr("src", $(this).attr("video"));
                    var p = $(this).text();
                    get_resource_data(picture_api, $("#picture"), "GET", p);
                    search();
                })
                .on('click', "#video .pagination a", function() {
                    var p = $(this).text();
                    get_resource_data(video_api, $("#video"), "GET", p);
                    search();
                })
                .on('click', "#audio .pagination a", function() {
                    var p = $(this).text();
                    get_resource_data(audio_api, $("#audio"), "GET", p);
                    search();
                })
                .on('click', "#animation .pagination a", function() {
                    var p = $(this).text();
                    get_resource_data(animation_api, $("#animation"), "GET", p);
                    search();
                })
                .on('click', ".index-list-content img", function() {
                    var src = $(this).attr("src");
                    $("#img-zoom").attr("src", src);
                    var oImg = $(this);
                    var img = new Image();
                    img.src = $(oImg).attr("src");
                    var realWidth = img.width; //真实的宽度
                    var realHeight = img.height; //真实的高度
                    var ww = $(window).width(); //当前浏览器可视宽度
                    var wh = $(window).height(); //当前浏览器可视宽度
                    var ll = $("#img-dialog").css('margin-left');
                    // alert(ll);
                    // alert(wh);
                    $("#img-content").css({ "top": 0, "left": 0, "height": "auto" });
                    // $("#img-zoom").css({"height":"auto"});
                    if ((realWidth + 20) > ww) {
                        $("#img-content").css({ "width": "100%" });
                        $("#img-zoom").css({ "width": "99%" });
                    } else {
                        $("#img-content").css({ "width": realWidth + 20, "height": realHeight + 20 });
                        $("#img-zoom").css({ "width": realWidth, "height": realHeight });
                    }
                    if ((wh - realHeight - 40) > 0) {
                        $("#img-content").css({ "top": (wh - realHeight) / 2 });
                    }
                    if ((ww - realWidth - 20) > 0) {
                        $("#img-content").css({ "left": ((ww - realWidth) / 2) });
                    }
                    // console.log("realWidth:"+realWidth+" realHeight:"+realHeight+" ww:"+ww)
                    $('#img-modal').modal();
                })
                .on('click', ".video-play-icon", function() {
                    $("#video").attr("src", $(this).parent().prev("img").attr("video"));
                })
                .on('click', "#video", function() {
                    videoSmart();
                })
                .on('click', ".search-button", function() {
                    search();
                });
        }

        function keyEvents() {
            $(document).keydown(function() {
                // console.log(event.keyCode);
                if (event.keyCode == 32) {
                    // 空格
                    videoSmart();
                } else if (event.keyCode == 37) {
                    // 回退
                    // console.log(video.currentTime);
                    recede();
                } else if (event.keyCode == 38) {
                    // 上键
                    volumeInc();
                } else if (event.keyCode == 39) {
                    // 右键
                    onward();
                } else if (event.keyCode == 40) {
                    // 下键
                    volumeDec();
                } else if (event.keyCode == 13) {
                    // 回车
                    search();
                }
            });
        }

        $('#resource_download_search_btn').click(function() {
            var tags = $('#resource_label').val();
            if (isEmpty(tags)) {
                showModal("#resource_container", "Please write label first !")
                return false;
            }
            get_resource_data(tags, $('#picture'));
            return false;
        });


        function get_resource_data(tags, ele) {

            $.ajax({
                url: ACE_BASE_URL + ACE_GET_RESOURCE_LIST + "?tags=" + tags + "&per-page=" + 40 + "&type_id=5",
                type: "GET",
                contentType: "application/json; charset=UTF-8",
                success: function(result) {
                    var col = '';
                    var contentList = ele.find(".index-list-content");
                    if (result.data.items.length == 0) {
                        contentList.append("没有数据！");
                    } else {
                        if (contentList.find("li").length) {
                            contentList.html("");
                        }
                        $.each(result.data.items, function(index, obj) {
                            col += col_data(obj);
                        });
                        contentList.append(col);
                        getData.page_data(result.data, ele);
                        scroll.commonscroll();
                    }
                },
                error: function(e) {
                    hideChangeStatusModal()
                }
            });

        }

        function col_data(object) {
            if (sourcebar == "picture" || sourcebar == "") {
                return getData.col_data('RESOURCE_PICTURE', object);
            } else if (sourcebar == "video") {
                return getData.col_data('RESOURCE_VIDEO', object);
            } else if (sourcebar == "audio") {
                return getData.col_data('RESOURCE_AUDIO', object);
            } else if (sourcebar == "animation") {
                return getData.col_data('RESOURCE_ANIMATION', object);
            }
        }

        // 暂停或播放
        function videoSmart() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }
        // 音量加
        function volumeInc() {
            video.volume > 0.9 ? video.volume = 1 : video.volume += 0.1;
        }
        // 音量减
        function volumeDec() {
            var video = $("#video").get(0);
            video.volume < 0.1 ? video.volume = 0 : video.volume -= 0.1;
        }
        // 前进10s
        function onward() {
            video.currentTime + 10 > video.duration ? video.currentTime = video.duration : video.currentTime += 10;
        }
        // 后退10s
        function recede() {
            video.currentTime - 10 < 0.1 ? video.currentTime = 0 : video.currentTime -= 10;
        }

        function search() {
            $.each($('.search-title'), function() {
                var str1 = $(this).html().toUpperCase();
                var str2 = $('input').val().toUpperCase();
                // console.log(str1);
                // console.log(str2);
                if ((str1 == str2) || ((str1.search(str2) != -1) && (str2))) {
                    $(this).css({ 'background': 'yellow' });
                } else {
                    $(this).css({ 'background': '' });
                }
            });
        }
    }

});