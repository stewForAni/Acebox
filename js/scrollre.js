define(["jquery"],function($){
	return {
		commonscroll:scroll
	}

	function scroll(){
		w1 = $(window).width();
	    $('html').addClass('fancybox-lock-test');
	    w2 = $(window).width();
	    $('html').removeClass('fancybox-lock-test');
	    if(w2 > w1){
	        $("<style type='text/css'>body.modal-open {padding-right: 0 !important;overflow-y: scroll;}</style>").appendTo("head");
	    }
	}
})
