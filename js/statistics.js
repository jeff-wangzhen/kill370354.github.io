(function () {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return 0;
    }

    if (getCookie("time")) return;
    if (navigator.userAgent.indexOf("kill370354mixed") == -1) {
        var data = "{" + (new Date()).valueOf() + "}";//localStorage存储的数据必须使用双引号，采用反斜杠转义，否则JSON.parse()解析时会报错！
        var storage = window.localStorage;
        var interval = 3700000;

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        setCookie("time", 1, 0.5);//存储数据
        //fnCreateRequest("js/GetViwerInfo.php?url=" + window.location.href);
        fnCreateRequest("http://kill370354.gz01.bdysite.com/php/GetViwerInfo.php?url=" + window.location.href, function (result) {
//console.log(result);
            console.log("欢迎访问本站！");
        });
    }
})();

