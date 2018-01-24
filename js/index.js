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
	$("#foot a").click(function() {
		if(page*5>max+5)
			$("#foot a").text("没有更多");
		else
			add();
	});
});

var m = n = 0, count;

function banner() {
	var t = setInterval(function() {
		n = (n + 1) % count;
		$("#banner ul :eq(" + n * 2 + ")").trigger("click");
	}, 6000);
}

function bannerClick(i) {
	n = i-1;
	$("#banner_list :eq(" + n * 2 + ")").animate({
		opacity : '1'
	}, 1000);
	$("#banner_list :eq(" + n * 2 + ")").css("z-index",1001);
	$("#banner_list :eq(" + m * 2 + ")").animate({
		opacity : '0'
	}, 500);
	$("#banner_list :eq(" + m * 2 + ")").css("z-index",1000);
	$("#banner ul :eq(" + n * 2 + ")").css("background-color", '#900');
	$("#banner ul :eq(" + m * 2 + ")").css("background-color", '#6C6D6E');
	m = n;
}

function init() {
	bmobInit();
	initLogin();
	add();
			
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
			div1.append("<li class=\"on\" onClick=\"bannerClick("+1+")\"><a href=\"#\">1</a></li>");
			var a = object.get("gg_tp");
			div2.append("<a href=\"" + object.get("gg_wz") + "\"><img src=\""
					+ object.get("gg_tp")._url
					+ "!/fwfh/900x300\" width=\"900\" height=\"300\" alt=\""
					+ object.get("gg_name") + "\"/></a>");
			for (var i = 1; i < results.length; i++) {
				object = results[i];
				div1.append("<li onClick=\"bannerClick("+(i+1)+")\"><a href=\"#\">" + (i + 1) + "</a></li>");
				div2.append("<a href=\"" + object.get("gg_wz")
						+ "\"><img src=\"" + object.get("gg_tp")._url
						+ "!/fwfh/900x300\" width=\"900\" height=\"300\" alt=\""
						+ object.get("gg_name") + "\"/></a>");
			}
			
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	}).then(function(obj) {
		count = $("#banner_list a").length;
		$("#banner_list a").css("opacity" , '0');
		$("#banner_list a").css("z-index",1000);
		$("#banner_list :eq(" + n * 2 + ")").animate({
			opacity : '1'
		}, 1000);
		$("#banner_list :eq(" + n * 2 + ")").css("z-index",1001);
	}, function(error) {
	});;
}

function initLogin() {
	var currentUser = Bmob.User.current();
	if (currentUser) {
		$("#login a").text(currentUser.get("username"));
		$("#login a").attr("href","html/user.html");
	}
	else{
		$("#login a").text("登录");
		$("#login a").attr("href","html/login.html");
	}
}

var page=1;
var max=0;

function add() {
	var ZiXun = Bmob.Object.extend("ZiXun");
	var query = new Bmob.Query(ZiXun);
	query.count({
	  success: function(count) {
		  max=count;
	  },
	  error: function(error) {
	  }
	});

	query = new Bmob.Query(ZiXun);
	query.descending("createdAt");
	query.skip((page-1)*5);
	query.limit(5);
	query.include("zs_message");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			var div = $("#news ul");
			var img;
			var id;
			var message;
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				message=object.get("zs_message");
				var url="";
				for(var j=0; j<message.get("message").length;j++){
					obj=message.get("message")[j];
					if(url==""&&obj!=null&&obj.image!=null){
						url=obj.image._url;
						break;
					}
				}
				div.append("<li>" +
							"<div class=\"news\" onClick=\"divClick('"+message.id+"')\">" +
								"<span class=\"title\">"+HTMLEncode(object.get("zs_title"))+"</span>"+
								"<span class=\"time\">"+object.createdAt+"</span>"+
								"<img src=\""+url+"!/fwfh/160x160\">" +
							"</div>"+
							"</li>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
	page++;
}

function divClick(id) {
	window.open("html/detail.html?id="+id);   
}
