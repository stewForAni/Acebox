define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    var containerId = "#module_container";
    
    init();

    function init() {
        $("#log_out").click(function() {
            logout();
            return false;
        });
    }

  
});