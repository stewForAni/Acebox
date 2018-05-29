define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');
    require('multifileupload');

    init();

    function init() {
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
                                '<img id="uploadImage_' + i + '" src="' + e.target.result + '" style="height:100px;width:100px;border-radius:5px;box-shadow: 1px 1px 1px #666666;object-fit:cover;"/>' +
                                '<br/>' + filename +
                                '<br/><a href="javascript:" class="upload_delete" title="delete" data-index="' + i + '"><i class="icon-trash display-12 opacity-60"></i> delete</a>' +
                                '<span id="uploadProgress_' + i + '" class="upload_progress" style="display:none; padding:5px; border-radius:10px; color:#fff; background-color:rgba(0,0,0,.6); position:absolute; left:25px; top:45px;"></span>' +
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
                var eleProgress = $("#uploadProgress_" + file.index),
                    percent = (loaded / total * 100).toFixed(2) + '%';
                eleProgress.show().html(percent);
            },
            onSuccess: function(file, response) {
                $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
            },
            onFailure: function(file) {
                $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
                $("#uploadImage_" + file.index).css("opacity", 0.2);
            },
            onComplete: function() {
                $("#fileSubmit").hide();
                $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
            }
        };
        MFUpload = $.extend(MFUpload, params);
        MFUpload.init();
    }


});