var oXMLHttpRequest = false;

function fnCreateRequest(url,fnXHRCompleted) {   //初始化对象并发出XMLHttpRequest请求
    oXMLHttpRequest = false;
    if (window.XMLHttpRequest) {   //Mozilla等其他浏览器
        oXMLHttpRequest = new XMLHttpRequest();
        //修复某些版本的火狐浏览器的bug
        if (oXMLHttpRequest.overrideMimeType) {
            oXMLHttpRequest.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {     //IE浏览器
        try {
            oXMLHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                oXMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("无法创建xhr对象！");
            }
        }
    }
    if (!oXMLHttpRequest) {
        alert("不能创建XMLHTTP实例，请截图联系kill370354@qq.com");
        return false;
    }

    if(!fnXHRCompleted) {
         fnXHRCompleted=function () {
            console.log("ajax完成！");
        }
    }


    function fnXHRRsponse() {   	 //处理服务器返回的信息
        //   var oUserTip = document.getElementById("usertip");
        if (oXMLHttpRequest.readyState == 4) {
            if (oXMLHttpRequest.status == 200) {
                fnXHRCompleted(oXMLHttpRequest.responseText);
            }
        }
    }
    oXMLHttpRequest.onreadystatechange = fnXHRRsponse;
    sUrl = url.match(/.*?\.php/)[0];
    sRequest = url.substring(sUrl.length + 1)+"&timestamp=" + new Date().getTime();
    // console.log(url);   console.log(sRequest);
    // console.log(sUrl);
    //指定响应方法函数
    oXMLHttpRequest.open("POST", sUrl, true);
    oXMLHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oXMLHttpRequest.send(sRequest);
};
