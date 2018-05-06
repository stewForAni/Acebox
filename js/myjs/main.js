$(document).ready(function() {


getMainContentData();


  });


function getMainContentData(){


 $.ajax({
        url: ACE_BASE_URL + ACE_MAIN_CONTENT,
        type: "GET",
        success: function(result) {
            dealMianContentData(result);
            console.log("2222222");
        },
        error: function(e) {
            console.log("333333");
        }
    });

	
}

function dealMianContentData(data){

	var level_length = data.data.length;
	var level_data = data.data;


	for (var i = 0; i < level_length; i++) {
     var item = level_data[i];
     var level_content = '<div class="col-12 col-sm-6 col-md-4">'+
                    '<div class="card card-lg">'+
                     '   <a href="#"> <img class="card-img-top" src="'+item.img+'" alt="Pit Stop"></a>'+
                      '  <div class="card-body">'+
                       '     <h4 class="card-title">'+item.name+'</h4>'+
                           ' <p class="card-text">'+item.intro+'</p>'+
                            '<ul class="list-unstyled list-spacing-sm" id="pahse_ul_'+i+'">'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                '</div>';

        $('#main_content').append(level_content);

        var phase_length = item.phase.length;
        var phase_data = item.phase;

        for(var j = 0; j < phase_length; j++){
           var phase_item = phase_data[j];
           var phase_content = '<li id="phase_'+j+'">'+
                              '      <i class="icon-text-document text-muted mr-1"></i>'+
                               '     <a href="lesson.html">'+phase_item.phase1+'</a>'+
                               ' </li>';

            $('#pahse_ul_'+j).append(phase_content);

            (function(phase_item) {
            $("phase_"+j).click(function() {

                     var phaseId = phase_item.id;
                     var url = "lesson.html?pid=" + phaseId;
                     window.location.href = url;
                     
                return false;
            });
            })(phase_item);


        }
     }

	
}