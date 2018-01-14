$(function() {
	init();
	$("#foot a").click(function() {
		if(page*10>max+10)
			$("#foot a").text("没有更多");
		else
			addPingLun(tiezi);
	});
	$("#huifu input[type=\"button\"]").click(function() {
		var currentUser = Bmob.User.current();
		if (currentUser) {
			var s=$("#huifu textarea").text();
			if(s==""){
				alert("不能为空");
			}
			else{
				var PingLun = Bmob.Object.extend("PingLun");
				var p = new PingLun();
				p.set("neirong", s);
				p.set("tiezi", tiezi);
				p.set("user", currentUser);
				if(hfs!=-1)
					p.set("hfneirong", pingluns[hfs]);
				p.save(null, {
				  success: function(gameScore) {
					  window.location.reload();
				  },
				  error: function(gameScore, error) {
					  alert(error.description);
				  }
				});
			}
		}
		else{
			alert("请先登录");
		}
	});
	$("#huifu span").click(function() {
		hfs=-1;
		$("#huifu span").text("");
	});
});

var page=1;
var max=0;
var tiezi;
var floor=1;
var pingluns;
var hfs=-1;

function init() {
	bmobInit();	
	initInput();
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
			pingluns=new Array(max);
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
	query.skip((page-1)*10);
	query.limit(10);
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
				$("#reply").append("<div class=\"reply\" onClick=\"hf("+(floor-1)+")\">"+
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
				pingluns[floor-1]=pinglun;
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

function initInput() {
	$("#huifu input[type=\"button\"]").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#huifu input[type=\"button\"]").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function hf(i) {
	if(hfs==i)
		hfs=-1;
	else
		hfs=i;
	if(hfs==-1)
		$("#huifu span").text("");
	else
		$("#huifu span").text("回复:"+pingluns[hfs].get("neirong"));
}