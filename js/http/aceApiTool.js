//ace-API-configuration

var ACE_BASE_URL = "https://api.dev.landi.com/v1/";
var ACE_BASE_IMG_URL = "https://api.dev.landi.com/";
//ace login
var ACE_LOGIN_API = "auth/logins";
//ace_upload
var ACE_FILE_UPLOAD = "uploadfiles";
//ace_create_course
var ACE_CREATE_COURSE = "course/classification-imports";
//ace_get_course_level
var ACE_GET_COURSE_LEVEL_DATA = "course/classifications";
//ace_get_course_phase
var ACE_GET_COURSE_PHASE_DATA = "course/classifications";
//ace_get_course_lesson
var ACE_GET_COURSE_LESSON_DATA = "course/classifications";
//ace_add_course:phas，lesson
var ACE_ADD_COURSE_PL = "course/classification-import-generals";
//ace_edit_course:phas，lesson
var ACE_EDIT_COURSE = "course/classifications";
//ace_delete_course:level,phas，lesson
var ACE_DELETE_COURSE = "course/classifications";
//ace_main_content
var ACE_MAIN_CONTENT = "return-all-course-classifications";
//ace_lesson_list
var ACE_LESSON_LIST = "course/classifications";
//ace_lesson_log
var ACE_LESSON_VERSION_LOG = "course/courseware-verifications";
//ace_submit_test
var ACE_SUBMIT_TEST = "course/coursewares";
var ACE_CHOOSE_COURSEWARE = "course/courseware-file-lists";
var ACE_CHANGE_STATE = "course/courseware-verifications";
//logout
var ACE_LOG_OUT = "auth/logouts";
//ace_get_struct
var ACE_GET_ALL_STRUCT = "return-all-course-classifications";


function logout(){
	 $.ajax({
        url: ACE_BASE_URL + ACE_LOG_OUT,
        type: "GET",
        contentType:"application/json; charset=UTF-8",
        success: function(result) {
        	window.location.replace("index.html");
        },
        error: function(e) {
        }
    });
}
