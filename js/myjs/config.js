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
        "commoncontent": "myjs/commoncontent",
        "multifileupload": "multifileupload",
        "phaser": "phaser",
        "phaser-spine": "phaser-spine",
        "flickity": "flickity.pkgd.min"
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
        "phaser-spine": [
            "phaser"
        ],
        "flickity": [
            "jquery"
        ],
    }
});