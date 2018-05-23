require.config({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-3.3.1.min",
        "bootstrap": "bootstrap.bundle.min", //包含了popper
        "cookies": "js.cookie",
        "base64": "jquery.base64",
        "scrollbartool": "myjs/scrollbartool",
        "ajaxUtil": "http/ajaxUtil",
        "aceApiTool": "http/aceApiTool",
        "getData": "app/commongetdata",
        "commoncontent": "myjs/commoncontent"
    },
    shim: {
        "bootstrap": [
            "jquery"
        ],
        "scrollbartool": [
            "jquery"
        ],
        "ajaxUtil": [
            "jquery"
        ],
        "getData": [
            "jquery"
        ],
        "commoncontent": [
            "jquery"
        ],
        "base64": [
            "jquery"
        ],
        "aceApiTool": [
            "jquery"
        ],
    }
});