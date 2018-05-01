  var file;
  var name;
  var containerId = "#add_course_container";

  $(document).ready(function() {

      $('#create_course').click(function() {
          if (checkInput()) {
              doUploadFileApi();
          }

          return false;
      });

      $('#cover_name_input').change(function() {
          file = this.files[0];
          name = file.name.substring(file.name.length - 3, file.name.length);
      });

  });

  function doUploadFileApi() {

      if (isEmpty(file) || isEmpty(name) || (name != "jpeg") && (name != "jpg") && (name != "png")) {
          showModal(containerId, modal_text2);
          return false;
      }

      var formData = new FormData();
      formData.append('file', file);

      showProgressModal(containerId);

      $.ajax({
          url: ACE_BASE_URL + ACE_FILE_UPLOAD,
          type: "POST",
          contentType: "application/form-Data",
          data: formData,
          processData: false,
          contentType: false,
          success: function(result) {
              doAddCourseApi(result.data.token);
              console.log("2222222");
          },
          error: function(e) {
              hideProgressModal();
              console.log("333333");
          }
      });


  }


  function doAddCourseApi(token) {

      var level = $("#level_name").val();
      var stage = $("#stage_name").val();
      var intro = $("#course_intro").val();


      var data = '{"level": {' +
          '                  "title": "' + level + '",' +
          '                  "description": "' + intro + '",' +
          '                  "cover_token": "' + token + '"' +
          '                  },' +
          '        "stage": "' + stage + '"' +
          '      }';

      $.ajax({
          url: ACE_BASE_URL + ACE_CREATE_COURSE,
          type: "POST",
          contentType: "application/json",
          data: data,
          success: function(result) {
              hideProgressModal();
              console.log("444444");
          },
          error: function(e) {
              hideProgressModal();
              console.log("555555");
          }
      });


  }

  function checkInput() {
      var level = $("#level_name").val();
      var stage = $("#stage_name").val();
      var intro = $("#course_intro").val();
      if (isEmpty(level) || isEmpty(stage) || isEmpty(intro)) {
          showModal(containerId, modal_text1);
          return false;
      }
      return true;

  }