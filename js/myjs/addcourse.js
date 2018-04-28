  var file;
  var name;


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


          $("#add_course_container").append(getModalContent(modal_text2));
          $("#myModal").modal();

          return false;
      }

      var formData = new FormData();
      formData.append('file', file);

      $.ajax({
          url: ACE_BASE_URL + ACE_FILE_UPLOAD,
          type: "POST",
          contentType: "application/form-Data",
          data: formData,
          processData: false,
          contentType: false,
          success: function(result) {
              console.log("2222222");
          },
          error: function(e) {
              console.log("333333");
          }
      });


  }


  function checkInput() {
      var level = $("#level_name").val();
      var stage = $("#stage_name").val();
      var intro = $("#course_intro").val();
      if (isEmpty(level) || isEmpty(stage) || isEmpty(intro)) {
          $("#add_course_container").append(getModalContent(modal_text1));
          $("#myModal").modal();
          return false;
      }
      return true;

  }