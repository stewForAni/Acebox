// 首先保存原有的$.ajax方法
var ajax = $.ajax,
    noop = function() {};

//重写$.ajax
//保持和原生的$.ajax方法参数一致
$.ajax = function(options) {

    /**
     * 保存业务代码中传递的成功回调和失败回调
     */
    var func = {
        beforeSend: 'function' === typeof options.beforeSend ? options.beforeSend : noop,
        success: 'function' === typeof options.success ? options.success : noop,
        error: 'function' === typeof options.error ? options.error : noop
    }

    var _ops = $.extend({}, options, {

        beforeSend: function(xhr, data) {

            if (!(data.url.indexOf("logins")!=-1)) {
                var sigh = getLocalSigh();
                if (!isEmpty(sigh)) {
                    xhr.setRequestHeader("Authorization", "Bearer " + sigh);
                }
            }

            func.beforeSend(xhr);

        },
        success: function(data, state, xhr) {
            console.log("111111");
            /**
             * 统一处理的逻辑
             */
            if (data.code_status !== 0) {
                alert(data.error_msg);
                return;
            }
            /**
             * 调用业务端的回调。
             */
            func.success(data, state, xhr);
        },
        error: function(e) {
            console.log("00000");
            func.error(e);
        }
    });

    return ajax.call($, _ops);
}


function getLocalSigh() {
    if (window.localStorage) {
        return window.localStorage.getItem("sigh");
    }
}



function isEmpty(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
};