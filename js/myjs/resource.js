define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var currentLevelid = 0;
    var currentStageid = 0;
    var currentLessonid = 0;

    init();

    function init() {
        $('#select_level').empty();
        $('#select_level').append('<option value="0" selected>Select Level</option>');
        reset();
        getdata();
    }

    function getdata() {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_ALL_STRUCT,
            type: "GET",
            success: function(result) {
                dealstructdata(result);
            },
            error: function(e) {}
        });
    }

    function dealstructdata(data) {

        var level_length = data.data.length;
        var level_data = data.data;
        var current_stage_length;
        var current_stage_data;

        for (var i = 0; i < level_length; i++) {
            var preleveldata = level_data[i];
            var level_data_name = preleveldata.title;
            var level_data_id = preleveldata.id;
            var optionl = '<option value=' + level_data_id + '>' + level_data_name + '</option>';
            $('#select_level').append(optionl);
        }

        $("#select_level").change(function() {
            currentLevelid = $(this).children('option:selected').val();
            if (currentLevelid != "0") {
                for (var k = 0; k < level_length; k++) {
                    if (currentLevelid == level_data[k].id) {
                        reset();
                        current_stage_data = level_data[k].child;
                        current_stage_length = current_stage_data.length;
                        for (var j = 0; j < current_stage_length; j++) {
                            var options = '<option value=' + current_stage_data[j].id + '>' + current_stage_data[j].title + '</option>';
                            $('#select_stage').append(options);
                        }
                    }
                }
            } else {
                reset()
            }
        });



        $("#select_stage").change(function() {
            currentStageid = $(this).children('option:selected').val();
            if (currentStageid != "0") {
                for (var t = 0; t < current_stage_length; t++) {
                    if (currentStageid == current_stage_data[t].id) {
                        reset_2();
                        var lesson_data = current_stage_data[t].child;
                        var lesson_length = lesson_data.length;
                        for (var k = 0; k < lesson_length; k++) {
                            var optionls = '<option value=' + lesson_data[k].id + '>' + lesson_data[k].title + '</option>';
                            $('#select_lesson').append(optionls);
                        }
                    }
                }
            } else {
                reset_2();
            }
        });


        $("#select_lesson").change(function() {
            currentLessonid = $(this).children('option:selected').val();
            console.log(currentLevelid);
            console.log(currentStageid);
            console.log(currentLessonid);
        });


        $('#uploadsth').click(function() {
            if (currentLessonid != 0) {
                window.location.href = "resourceupload.html"+"?id="+currentLessonid;
            } else {
                showModal("#resource_container", "Please choose the right lesson ! ");
            }

            return false;
        });


        $('#downloadsth').click(function() {
            if (currentLessonid != 0) {
                window.location.href = "resourceshow.html"+"?id="+currentLessonid;
            } else {
                showModal("#resource_container", "Please choose the right lesson ! ");
            }

            return false;
        });

    }


    function reset() {
        $('#select_stage').empty();
        $('#select_stage').append('<option value="0" selected>Select Stage</option>');
        $('#select_lesson').empty();
        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
    }

    function reset_2() {
        $('#select_lesson').empty();
        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
    }

});