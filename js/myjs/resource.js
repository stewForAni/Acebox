define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var currentLevelid;
    var currentStageid;
    var currentLessonid;

    init();

    function init() {
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
            currentLevelid = $(this).children('option:selected').val()
            if (currentLevelid != "0") {
                for (var k = 0; k < level_length; k++) {
                    if (currentLevelid == level_data[k].id) {
                        $('#select_stage').empty();
                        $('#select_stage').append('<option value="0" selected>Select Stage</option>');

                        $('#select_lesson').empty();
                        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
                        current_stage_data = level_data[k].child;
                        current_stage_length = current_stage_data.length;
                        for (var j = 0; j < current_stage_length; j++) {
                            var prestagedata = current_stage_data[j];
                            var stage_data_name = prestagedata.title;
                            var stage_data_id = prestagedata.id;
                            var options = '<option value=' + stage_data_id + '>' + stage_data_name + '</option>';
                            $('#select_stage').append(options);
                        }
                    }
                }
            } else {
                $('#select_stage').empty();
                $('#select_stage').append('<option value="0" selected>Select Stage</option>');

                $('#select_lesson').empty();
                $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
            }
        });



        $("#select_stage").change(function() {
            currentStageid = $(this).children('option:selected').val()
            if (currentStageid != "0") {
                for (var t = 0; t < current_stage_length; t++) {
                    if (currentStageid == current_stage_data[t].id) {
                        $('#select_lesson').empty();
                        $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
                        var lesson_data = current_stage_data[t].child;
                        var lesson_length = lesson_data.length;
                        for (var k = 0; k < lesson_length; k++) {
                            var prelessondata = lesson_data[k];
                            var lesson_data_name = prelessondata.title;
                            var lesson_data_id = prelessondata.id;
                            var optionls = '<option value=' + lesson_data_id + '>' + lesson_data_name + '</option>';
                            $('#select_lesson').append(optionls);
                        }
                    }
                }
            } else {
                $('#select_lesson').empty();
                $('#select_lesson').append('<option value="0" selected>Select Lesson</option>');
            }
        });

    }

});