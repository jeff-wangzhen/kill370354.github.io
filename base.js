// JavaScript Document

(function($){
    $(document).ready(function () {$(".top").css("visibility","visible");
		$(".top").addClass("downIn").show();//导航条部分，从左到右出现
		setTimeout(function(){$(".banner").css("visibility","visible");
							  $(".banner").addClass("rightInbounce").show();  },1000);
		setTimeout(function(){$(".decoration").css("visibility","visible");
							  $(".decoration").addClass("downIn").show(); } ,2000);
   /* $("#code1").mouseover(function(){$("#code2").removeClass("flipOutXCode");
		$("#code2").addClass("flipInXCode").show();
	//	$("#code2").css("display","block");
									});
					  $("#code1").mouseout(function(){
	$("#code2").removeClass("flipInXCode");
								$("#code2").addClass("flipOutXCode");
						
});*/
		setTimeout(function() {
			$(".up ").css("visibility", "visible");
			$(".foot").css("visibility", "visible");
			$("#code1").css("visibility", "visible");
		}, 5000);//向上箭头、二维码、脚注不能起初便出现，要等5秒
	});
})(jQuery);




(function(){  document.write('<script type="text/javascript" src="jquery.sortable.js"></script>');})();//导航栏可自动排序

/*
//对二维码部分
window.onload=function(){
  var code1=document.getElementById("code1");
	//getElementById("son1")函数取出的son1对象不是数组
  var code2=document.getElementById("code2");
	code1.style.visibility="visible";
  code1.onmouseenter=function(){code2.style.display="block";code2.style.visibility="visible";
	code2.className=" flipInXCode";//style表示行内定义样式
	};
  code1.onmouseleave=function(){code2.style.display="block";
	code2.className=
		code2.className.replace("flipInXCode","flipOutXCode");//style表示行内定义样式
	};
//行内定义样式级别>id样式>内联样式>外联样式
};
*/

//下面的JS代码来源于腾讯课堂，对箭头加上慢速滚动效果

window.onload=function(){ 
			$("#code1").mouseenter(function(){
					$("#code2").fadeIn("slow");//鼠标移到小二维码上浮现大二维码
				});
	$("#code1").mouseleave(function(){$("#code2").fadeOut("slow");//慢速消失
				}
			);};

/*
调试网页代码切记：
清除浏览器缓存！
清除浏览器缓存！
清除浏览器缓存！

因未清除浏览器缓存而浪费的调试时间，永世不补！悔甚！悔甚！
为了达到二维码淡入淡出效果，已经浪费了不少时间，尝试过css动画flipX，和js代码，和jq代码，都在上面，只因未清除浏览器缓存难以调试成功。
或亦可换浏览器调试。

另外，网上说在html文档开头可补加：
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">   

清除浏览器缓存！
切记！
切记！
切记！
*/

if ($('html,body').scrollTop()<200){
				$('.up').hide();//默认初始时箭头不显示
			}
		
			$('.up').click(function(){
				$('html,body').animate({'scrollTop':'0px'},500);//滚动动画
			});
			$(window).scroll(function(){
				if($(this).scrollTop()<200){//高度不足200px，箭头自动隐藏，否则出现
					$('.up').fadeOut("slow");//慢速消失
				}else{$('.up').fadeIn("slow");//慢速显现
				}
			});
