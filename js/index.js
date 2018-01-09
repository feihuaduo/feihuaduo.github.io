$(function() {
//	var system ={};  
//        var p = navigator.platform;       
//        system.win = p.indexOf("Win") == 0;  
//        system.mac = p.indexOf("Mac") == 0;  
//       system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);     
//       if(system.win||system.mac||system.xll){
//		   //如果是电脑跳转到           
//			// alert("这是电脑");
//      }else{  
//	 		 //如果是手机,跳转到
//             window.location.href="m/index.html";
//			//alert("这是手机");
//        }
	init();
	banner();
});
function banner() {
	var m = n = 0, count;
	count = $("#banner_list a").length;
	$("#banner_list a").css("opacity" , '0');
	$("#banner_list :eq(" + n * 2 + ")").animate({
		opacity : '1'
	}, 1000);
	var t = setInterval(function() {
		n = (n + 1) % count;
		$("#banner ul :eq(" + n * 2 + ")").trigger("click");
	}, 6000);
	var y=setInterval(function() {
		if(count==0){
			count = $("#banner_list a").length;
			$("#banner_list a").css("opacity" , '0');
			bannerBind();
			$("#banner_list :eq(" + n * 2 + ")").animate({
				opacity : '1'
			}, 1000);
		}
		else{
			clearInterval(y);
		}
	}, 100);
	function bannerBind() {
		$("#banner li").click(function() {
			var i = $(this).text() - 1;
			n = i;
			$("#banner_list :eq(" + n * 2 + ")").animate({
				opacity : '1'
			}, 1000);
			$("#banner_list :eq(" + m * 2 + ")").animate({
				opacity : '0'
			}, 500);
			$("#banner ul :eq(" + n * 2 + ")").css("background-color", '#900');
			$("#banner ul :eq(" + m * 2 + ")").css("background-color", '#6C6D6E');
			m = n;
		});
	}
	bannerBind();
}

function init() {
	bmobInit();
			
		
			
	var GuangGao = Bmob.Object.extend("GuangGao");
	var query = new Bmob.Query(GuangGao);
	query.equalTo("gg_yc", 1);
	query.descending("createdAt");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			var div1 = $("#banner ul");
			var div2 = $("#banner_list");
			var object = results[0];
			div1.append("<li class=\"on\"><a href=\"#\">1</a></li>");
			var a = object.get("gg_tp");
			div2.append("<a href=\"" + object.get("gg_wz") + "\"><img src=\""
					+ object.get("gg_tp")._url
					+ "!/fwfh/900x300\" width=\"900\" height=\"300\" alt=\""
					+ object.get("gg_name") + "\"/></a>");
			for (var i = 1; i < results.length; i++) {
				object = results[i];
				div1.append("<li><a href=\"#\">" + (i + 1) + "</a></li>");
				div2.append("<a href=\"" + object.get("gg_wz")
						+ "\"><img src=\"" + object.get("gg_tp")._url
						+ "!/fwfh/900x300\" width=\"900\" height=\"300\" alt=\""
						+ object.get("gg_name") + "\"/></a>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}
