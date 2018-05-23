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
        for (var i = 0; i < level_length; i++) {
            var data = level_data[i];
            var level_data_name = data.title;
            var level_data_id = data.id;
            var optionl = '<option value=' + level_data_id + '>' + level_data_name + '</option>';
            $('#select_level').append(optionl);
        }

        $("#select_level").change(function() {
            currentLevelid = $(this).children('option:selected').val()
            if (currentLevelid != "0") {
                for (var i = 0; i < level_length; i++) {
                    if (currentLevelid == level_data[i].id) {
                        $('#select_stage').empty();
                        $('#select_stage').append('<option value="0" selected>Select Stage</option>');
                        var stage_data = level_data[i].child;
                        var stage_length = stage_data.length;
                        for (var j = 0; j < stage_length; j++) {
                            var data = stage_data[i];
                            var stage_data_name = data.title;
                            var stage_data_id = data.id;
                            var options = '<option value=' + stage_data_id + '>' + stage_data_name + '</option>';
                            $('#select_stage').append(options);
                        }
                    }
                }
            }
        });



    }

});