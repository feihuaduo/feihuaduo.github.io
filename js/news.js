$(function() {
	init();
	$("#foot a").click(function() {
		if(page*5>max+5)
			$("#foot a").text("没有更多");
		else
			add();
	});
});

var page=1;
var max=0;

function init() {
	bmobInit();		
	initLogin();
	add();
}

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
				if(url=="")
					url="http://bmob-cdn-16129.b0.upaiyun.com/2018/01/05/1744d368400ce5bd8041bcfbf6967d7f.jpg";
				div.append("<li>" +
						"<div class=\"news\" onClick=\"divClick('"+message.id+"')\">" +
							"<span class=\"title\">"+object.get("zs_title")+"</span>"+
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
	window.open("detail.html?id="+id);   
}

function initLogin() {
	var currentUser = Bmob.User.current();
	if (currentUser) {
		$("#login a").text(currentUser.get("username"));
		$("#login a").attr("href","user.html");
	}
	else{
		$("#login a").text("登录");
		$("#login a").attr("href","login.html");
	}
}