$(function() {
	init();
	banner();
});
function banner() {
	var m = n = 0, count;
	count = $("#banner_list a").length;
	$("#banner_list a").hide();
	$("#banner_list :eq(" + n * 2 + ")").animate({
		width : 'toggle'
	}, 1500);
	var t = setInterval(function() {
		n = (n + 1) % count;
		$("#banner ul :eq(" + n * 2 + ")").trigger("click");
	}, 6000);
	var y=setInterval(function() {
		if(count==0){
			count = $("#banner_list a").length;
			$("#banner_list a").hide();
			bannerBind();
			$("#banner_list :eq(" + n * 2 + ")").animate({
				width : 'toggle'
			}, 1500);
		}
		else{
			y.clearInterval();
		}
	}, 100);
	function bannerBind() {
		$("#banner li").click(function() {
			var i = $(this).text() - 1;
			n = i;
			$("#banner_list :eq(" + n * 2 + ")").animate({
				width : 'toggle'
			}, 1500);
			$("#banner_list :eq(" + m * 2 + ")").animate({
				width : 'toggle'
			}, 1500);
			$("#banner ul :eq(" + n * 2 + ")").css("background-color", '#900');
			$("#banner ul :eq(" + m * 2 + ")").css("background-color", '#6C6D6E');
			m = n;
		});
	}
	bannerBind();
}

function init() {
	Bmob.initialize("ded0beecb60386cf6d1175ab6c800a5a",
			"0265bad7535c4d46bc55359078f0c001");
	var GuangGao = Bmob.Object.extend("GuangGao");
	var query = new Bmob.Query(GuangGao);
	query.equalTo("gg_yc", 1);
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
					+ "\" width=\"900\" height=\"300\" alt=\""
					+ object.get("gg_name") + "\"/></a>");
			for (var i = 1; i < results.length; i++) {
				object = results[i];
				div1.append("<li><a href=\"#\">" + (i + 1) + "</a></li>");
				div2.append("<a href=\"" + object.get("gg_wz")
						+ "\"><img src=\"" + object.get("gg_tp")._url
						+ "\" width=\"900\" height=\"300\" alt=\""
						+ object.get("gg_name") + "\"/></a>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}