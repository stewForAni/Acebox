define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');
    require('multifileupload');
    require('phaser');
    require('phaser-spine');


    var currentOperation = 0;
    var currentFileType = -1;
    var fileTokenArray = new Array();

    var TYPE_ID_PICTRUE = 5;
    var TYPE_ID_ANIMATION = 6;
    var TYPE_ID_AUDIO = 7;
    var TYPE_ID_VIDEO = 8;

    var containerId = "#resource_container";
    var AnimationDefaultName = '待机';

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

            $("#uploadInf").empty();
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
                    //if (file.type.indexOf("image") == 0) {
                    arrFiles.push(file);
                    // } else {
                    //     alert('文件"' + file.name + '"不是图片。');
                    // }
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

                            var imgsrc = "";
                            var l = file.name.length;
                            if (file.name.substring(l - 3, l) == "zip") {
                                imgsrc = "images/ani.png";
                            } else if (file.name.substring(l - 3, l) == "ogg") {
                                imgsrc = "images/audio.jpg";
                            } else if (file.name.substring(l - 3, l) == "mp4") {
                                imgsrc = "images/video.jpg";
                            } else {
                                imgsrc = e.target.result;
                            }

                            html = html + '<div class="col-6 col-md-4 col-lg-3" id="uploadList_' + i + '" style="float:left; position:relative;margin-top:20px">' +
                                '<img id="uploadImage_' + i + '" src="' + imgsrc + '" style="width:120px;height:100px;border-radius:4px;border-style: solid; border-width: 2px;border-color:#999999;object-fit:cover;"/>' +
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
                if (currentFileType == -1 || currentOperation == -1 || isEmpty($("#resource_label").val())) {
                    showModal(containerId, "Please select the file type and write label first !")
                    return true;
                }
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

        var d = '{' +
            '"type_id":' + currentFileType + ' ,' +
            '"tags": "' + tag_str + '",' +
            '"files_token": "' + token_str + '"' +
            '}';

        $.ajax({
            url: ACE_BASE_URL + ACE_GET_ADD_RESOURCE,
            type: "POST",
            contentType: "application/json; charset=UTF-8",
            data: d,
            success: function(result) {
                $("#fileSubmit").hide();
                $("#uploadInf").append("<p style=" + "color:#4582EC" + ";margin-top:10px" + "><i class=" + "icon-info-with-circle" + "></i> All files are uploaded and you can continue upload file.</p>");
                fileTokenArray = [];
            },
            error: function(e) {
                hideChangeStatusModal()
            }
        });
    }




    function initDownload() {

        var video;
        var currentElement = "#picture";
        var currentType = 5;
        tabEvents();

        function tabEvents() {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {

                currentElement = $(e.target).attr("href");
                var tags = $('#resource_label').val();

                if (isEmpty(tags)) {
                    showModal(containerId, "Please write label first !")
                    return false;
                }

                if ("#picture" == currentElement) {
                    currentType = TYPE_ID_PICTRUE;
                    get_resource_data(tags, TYPE_ID_PICTRUE);
                } else if ("#videos" == currentElement) {
                    currentType = TYPE_ID_VIDEO;
                    get_resource_data(tags, TYPE_ID_VIDEO);
                } else if ("#audios" == currentElement) {
                    currentType = TYPE_ID_AUDIO;
                    get_resource_data(tags, TYPE_ID_AUDIO);
                } else if ("#animations" == currentElement) {
                    currentType = TYPE_ID_ANIMATION;
                    get_resource_data(tags, TYPE_ID_ANIMATION);
                }

            });
        }

        $('#resource_download_search_btn').click(function() {
            var tags = $('#resource_label').val();
            if (isEmpty(tags)) {
                showModal(containerId, "Please write label first !")
                return false;
            }
            get_resource_data(tags, currentType);
            return false;
        });

        $('#search_btn').click(function() {
            var content = $('#search_input').val();
            if (isEmpty(content)) {
                return false;
            }
            window.find(content);
            return false;
        });

        function get_resource_data(tags, type_id) {

            $.ajax({
                url: ACE_BASE_URL + ACE_GET_RESOURCE_LIST + "?tags=" + tags + "&per-page=" + 100 + "&type_id=" + type_id,
                type: "GET",
                contentType: "application/json; charset=UTF-8",
                success: function(result) {
                    dealData(result, type_id);
                },
                error: function(e) {}
            });

        }


        function dealData(result, type_id) {
            if (type_id == TYPE_ID_PICTRUE) {
                dealPic(result, type_id);
            } else if (type_id == TYPE_ID_ANIMATION) {
                dealAni(result, type_id);
            } else if (type_id == TYPE_ID_AUDIO) {
                dealAud(result, type_id);
            } else if (type_id == TYPE_ID_VIDEO) {
                dealVid(result, type_id);
            }
        }


        function dealPic(result, type_id) {
            var itempic = '';
            $("#content_list_picture").empty();
            if (!result.data.items.length == 0) {
                $("#pic_no_data").hide();

                var data = result.data.items;
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    var d = data[i];
                    itempic = getListItem(d, type_id, i);
                    $("#content_list_picture").append(itempic);
                    (function(d) {
                        $("#item_pic_" + i).click(function() {
                            showPicModal(containerId, d);
                            return false;
                        });
                    })(d);
                }

            } else {
                $("#pic_no_data").show();
            }
        }


        function dealAni(result, type_id) {
            var listani = '';
            $("#content_list_animation").empty();
            if (!result.data.items.length == 0) {

                $("#ani_no_data").hide();

                var data = result.data.items;
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    var d = data[i];
                    listani = getListItem(d, type_id, i);
                    $("#content_list_animation").append(listani);
                    (function(d) {
                        $("#item_animation_" + i).click(function() {
                            showAnimation();
                            return false;
                        });
                    })(d);
                }


            } else {
                $("#ani_no_data").show();
            }
        }

        function dealAud(result, type_id) {
            var listaud = '';
            $("#content_list_audio").empty();
            if (!result.data.items.length == 0) {

                $("#audio_no_data").hide();

                var data = result.data.items;
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    var d = data[i];
                    listaud = getListItem(d, type_id, i);
                    $("#content_list_audio").append(listaud);
                    (function(d, i) {
                        $("#item_audio_" + i).click(function() {
                            $("#audio_" + i).get(0).play();
                            return false;
                        });
                    })(d, i);
                }



            } else {
                $("#audio_no_data").show();
            }
        }

        function dealVid(result, type_id) {
            var listvid = '';
            $("#content_list_video").empty();
            if (!result.data.items.length == 0) {

                $("#video_no_data").hide();

                var data = result.data.items;
                var l = data.length;
                for (var i = 0; i < l; i++) {
                    var d = data[i];
                    listvid = getListItem(d, type_id, i);
                    $("#content_list_video").append(listvid);
                    (function(d) {
                        $("#item_video_" + i).click(function() {
                            var videoUrl = ACE_BASE_VIDEO_URL + d.download_file;
                            showVideoModuleModal(containerId, videoUrl);
                            video = $("#video").get(0);
                            video.play();
                            $('#video-modal').on('hidden.bs.modal', function() {
                                video.pause();
                            })
                            keyEvents();

                            return false;
                        });
                    })(d);
                }

            } else {
                $("#video_no_data").show();
            }
        }


        function keyEvents() {
            $(document).keyup(function(event) {
                console.log(event.keyCode);

                if (isEmpty(video)) {
                    return;
                }

                if (event.keyCode == 32) {
                    videoSmart(); // 空格
                } else if (event.keyCode == 37) {
                    recede(); // 回退
                } else if (event.keyCode == 38) {
                    volumeInc(); // 上键
                } else if (event.keyCode == 39) {
                    onward(); // 右键
                } else if (event.keyCode == 40) {
                    volumeDec(); // 下键
                } else if (event.keyCode == 13) {
                    search(); // 回车
                }
            });
        }




        function getListItem(object, type_id, i) {
            var item = "";
            if (type_id == TYPE_ID_PICTRUE) {
                item = ' <li class="col-12 col-md-4 col-lg-3">' +
                    '<div class="card" style="background-color:#fefefe">' +
                    '<img id="item_pic_' + i + '" class="my-card-img-top" src="' + ACE_BASE_IMG_URL + object.download_file + '" style="object-fit:cover;cursor:pointer">' +

                    '<div>' +
                    '<h6 style="margin-top:20px;margin-left:10px;margin-right:20px">' + "[ " + object.id + " ] " + object.title + '</h6>' +
                    '<p style="margin-left:10px;margin-right:20px;margin-bottom:10px;"><small>' + getTime(object.created_at) + '<i class="icon-download" style="margin-right:5px;margin-left:20px"></i><a href="' + ACE_BASE_IMG_URL + object.download_file + '?">Download</a></small></p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            } else if (type_id == TYPE_ID_ANIMATION) {
                item = ' <li class="col-12 col-md-4 col-lg-3">' +
                    '<div class="card" style="background-color:#fefefe">' +
                    '<img class="my-card-img-top" src="images/media1.jpg" alt="Card image cap" style="object-fit:cover;">' +
                    '<div class="video-play-icon justify-content-center" style="position:absolute" id="item_animation_' + i + '" >' +
                    '     <i class="icon-controller-play"></i>' +
                    ' </div>' +
                    '<div>' +
                    '<h6 style="margin-top:20px;margin-left:10px;margin-right:20px">' + "[ " + object.id + " ] " + object.title + '</h6>' +
                    '<p style="margin-left:10px;margin-right:20px;margin-bottom:10px;"><small>' + getTime(object.created_at) + '<i class="icon-download" style="margin-right:5px;margin-left:20px"></i><a href="' + ACE_BASE_IMG_URL + object.download_file + '?">Download</a></small></p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            } else if (type_id == TYPE_ID_AUDIO) {
                item = ' <li class="col-12 col-md-4 col-lg-3">' +
                    '<div class="card" style="background-color:#fefefe;">' +
                    '<img class="my-card-img-top" src="images/media2.jpg" alt="Card image cap" style="object-fit:cover;">' +
                    '<div class="video-play-icon" style="position:absolute" id="item_audio_' + i + '">' +
                    '<i class="icon-controller-play"></i>' +
                    '</div>' +
                    '<audio src="' + ACE_BASE_AUDIO_URL + object.download_file + '" id="audio_' + i + '">Sorry,your browser not support audio.</audio><div>' +
                    '<h6 style="margin-top:20px;margin-left:10px;margin-right:20px">' + "[ " + object.id + " ] " + object.title + '</h6>' +
                    '<p style="margin-left:10px;margin-right:20px;margin-bottom:10px;"><small>' + getTime(object.created_at) + '<i class="icon-download" style="margin-right:5px;margin-left:20px"></i><a href="' + ACE_BASE_IMG_URL + object.download_file + '?">Download</a></small></p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            } else if (type_id == TYPE_ID_VIDEO) {
                item = ' <li class="col-12 col-md-4 col-lg-3">' +
                    '<div class="card" style="background-color:#fefefe">' +
                    '<img class="my-card-img-top" src="images/media2.jpg" alt="Card image cap" style="object-fit:cover;">' +
                    '<div class="video-play-icon" style="position:absolute" id="item_video_' + i + '">' +
                    '     <i class="icon-controller-play"></i>' +
                    ' </div>' +
                    '<div>' +
                    '<h6 style="margin-top:20px;margin-left:10px;margin-right:20px">' + "[ " + object.id + " ] " + object.title + '</h6>' +
                    '<p style="margin-left:10px;margin-right:20px;margin-bottom:10px;"><small>' + getTime(object.created_at) + '<i class="icon-download" style="margin-right:5px;margin-left:20px"></i><a href="' + ACE_BASE_IMG_URL + object.download_file + '?">Download</a></small></p>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
            }

            return item;
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


    }



    function getAnimationResource(d) {
        $.ajax({
            url: ACE_BASE_IMG_URL + d.download_file,
            type: "GET",
            xhr: function() { // custom xhr
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // check if upload property exists
                    myXhr.upload.addEventListener('progress', function(e) {
                        var percent = (e.loaded / e.total * 100).toFixed(2) + '%';
                        console.log(percent);
                    }, false); // for handling the progress of the upload
                }
                return myXhr;
            },
            processData: false,
            contentType: false,
            success: function(result) {
                console.log('ccc');
            },
            error: function(err) {
                console.log('vvv');
            }
        });
    }



    function showAnimation() {

        showAniModal(containerId);

        $('#animationModal').on('hidden.bs.modal', function() {
            $('#animationModal').remove();
            $('.modal-backdrop').remove();
        })

        var width = 600;
        var height = 450;

        var game = new Phaser.Game(width, height, Phaser.AUTO, 'animation_content', { init: init, preload: preload, create: create });

        function init() {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        function preload() {
            game.plugins.add(PhaserSpine.SpinePlugin);
            game.stage.disableVisibilityChange = true;
            game.load.spine('body', "assets/xiaodi.json");
            game.load.image("background", "assets/bg.png");

        }

        function create() {
            background = game.add.tileSprite(0, 0, width, height, 'background');
            background.smoothed = false;
            body = game.add.spine(width / 2, height / 2, "body");
            body.scale.set(1);
            body.setAnimationByName(0, AnimationDefaultName, true);
        }


    }

});