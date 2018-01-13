$(function() {
	init();
	$("#foot a").click(function() {
		if(page*5>max+5)
			$("#foot a").text("没有更多");
		else
			addPingLun(tiezi);
	});
});

var page=1;
var max=0;
var tiezi;
var floor=1;

function init() {
	bmobInit();	
	initLogin();

	var id=getQueryString("id");
	var Tiezi = Bmob.Object.extend("Tiezi");
	var query = new Bmob.Query(Tiezi);
	query.equalTo("objectId", id);
	query.include("message,tiezuo");
	query.find({
		success : function(results) {
			tiezi=results[0];
			var user=tiezi.get("tiezuo");
			
			max=tiezi.get("pls");
			$("#title").append("<h1>"+tiezi.get("title")+"</h1>");
			$("#icon").attr("src",getTouXiang(user));
			$("#name").text(user.get("username"));
			$("#time").text(tiezi.createdAt);
			var message=tiezi.get("message");
			for(var i=0;i<message.length;i++){
				var meg=message[i];
				if(meg.image!=null)
					$("#detail").append("<img src=\""+meg.image._url+"!/fwfh/400x400\">");
				if(meg.message!=null)
					$("#detail").append("<p>"+meg.message+"</p>");
			}
			
			addPingLun(tiezi);
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function addPingLun(tiezi) {
	var PingLun = Bmob.Object.extend("PingLun");
	query = new Bmob.Query(PingLun);
	query.equalTo("tiezi", tiezi);
	query.skip((page-1)*5);
	query.limit(5);
	query.include("user,hfneirong");
	query.find({
		success : function(results) {
			for (var i = 0; i < results.length; i++) {
				var pinglun=results[i];
				user=pinglun.get("user");
				var hfneirong="";
				getTouXiang(user);
				if(pinglun.get("hfneirong")!=null)
					hfneirong="<span class=\"rhfmessage\">"+pinglun.get("hfneirong").get("neirong")+"</span>";
				$("#reply").append("<div class=\"reply\">"+
						"<hr>"+
						"<img class=\"ricon\" src=\""+getTouXiang(user)+"\">"+
						"<span class=\"rfloor\">"+floor+"楼</span>"+
						"<ul>"+
						"<li><span class=\"rname\">"+user.get("username")+"</span>"+
						"<li><span class=\"rtime\">"+pinglun.createdAt+"</span>"+
						"</ul>"+
						hfneirong+
						"<span class=\"rmessage\">"+pinglun.get("neirong")+"</span>"
				);
				floor++;
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
	page++;
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