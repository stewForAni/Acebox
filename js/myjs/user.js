define(function(require, exports, module) {
    require('bootstrap');
    require('jquery');
    require('ajaxUtil');
    require('aceApiTool');
    require('commoncontent');

    init();

    function init() {
        $("#log_out").click(function() {
            logout();
            return false;
        });

        getUserList();
    }

    function getUserList() {
        $.ajax({
            url: ACE_BASE_URL + ACE_GET_USER_LIST + "?per-page=" + 100,
            contentType: "application/json; charset=UTF-8",
            type: "GET",
            success: function(result) {
                dealUserListData(result);
            },
            error: function(e) {}
        });
    }

    function dealUserListData(result) {
        var d = result.data.items;
        var l = result.data.items.length;

        for (var i = 0; i < l; i++) {
            var item = d[i];
            var user_list_item =
                ' <tr class="bg-white">' +
                ' <th scope="row" style="width:200px">' +
                '     <div class="media align-items-center">' +
                '         <img alt="Image" src="' + ACE_BASE_IMG_URL + item.avatar + '" class="avatar">' +
                '    </div>' +
                '</th>' +
                ' <td>' + item.id + '</td>' +
                '<td>' +
                '   <div class="media-body">' +
                '      <span class="h6 mb-0">' + item.username +
                '    </span>' +
                '   </div>' +
                '        </td>' +
                '     <td>' + item.number + '</td>' +
                '         <td>' + item.position + '</td>' +
                '         <td>' +
                ' <div class="dropdown">' +
                '    <button class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-no-arrow" type="button" id="dropdownMenuButton-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                '       <i class="icon-dots-three-horizontal"></i>' +
                '  </button>' +
                ' <div class="dropdown-menu dropdown-menu-sm" aria-labelledby="dropdownMenuButton" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0px; left: 0px; will-change: transform;">' +
                '  <a class="dropdown-item">Edit</a>' +
                ' <div class="dropdown-divider"></div>' +
                '<a class="dropdown-item">Delete</a>' +
                ' </div>' +
                '  </div>' +
                '</td>' +
                '  </tr>' +
                '  <tr class="table-divider"></tr>';
            $('#user_list').append(user_list_item);
        }

    }
});