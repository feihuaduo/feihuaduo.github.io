$(function() {
	init();
	$("#huifu input[type=\"button\"]").click(function() {
		var currentUser = Bmob.User.current();
		if (currentUser) {
			var s=$("#huifu textarea").val();
			if(s==""){
				alert("不能为空");
			}
			else if(currentUser.get("liaotian_qx")==1){
				alert("你已被禁言");
			}
			else{
				var GroupChatMessage = Bmob.Object.extend("GroupChatMessage");
				var p = new GroupChatMessage();
				p.set("userid", currentUser);
				p.set("message", s);
				p.set("name", currentUser.get("username"));
				p.set("extra", "ourygo网页版");
				p.save(null, {
				  success: function(gameScore) {
					  $("#chat ul").empty();
						page=1;
						add();
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
	BmobSocketIo.updateTable("GroupChatMessage");
	BmobSocketIo.onUpdateTable = function(tablename,data) {    
		$("#chat ul").empty();
		page=1;
		add();
	};
});

function init() {
	bmobInit();
	bmobSocketIoInit();
	initLogin();
	initInput();
	add();
}

function initLogin() {
	var currentUser = Bmob.User.current();
	if (currentUser) {
		$("#login a").text(currentUser.get("username"));
		$("#login a").attr("href","user.html");
	}
	else{
		$("#login a").text("登录");
		$("#login a").attr("href","html/login.html");
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

var page=1;
var max=0;

function add() {
	var GroupChatMessage = Bmob.Object.extend("GroupChatMessage");
	var query = new Bmob.Query(GroupChatMessage);
	query.count({
	  success: function(count) {
		  max=count;
	  },
	  error: function(error) {
	  }
	});

	query = new Bmob.Query(GroupChatMessage);
	query.descending("createdAt");
	query.skip((page-1)*30);
	query.limit(30);
	query.include("userid");
	query.find({
		success : function(results) {
			var div=$("#chat ul");
			var currentUser = Bmob.User.current();
			var id="";
			if (currentUser)
				id=currentUser.id;
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				var color="";
				if(object.get("userid").id==id)
					color="style=\"color: blue;\"";
				else if(object.get("userid").get("user_qx")==1)
					color="style=\"color: red;\"";
				div.prepend("<li>"+
						"<div class=\""+(object.get("userid").id==id?"right":"left")+"\">"+
							"<img src=\""+getTouXiang(object.get("userid"))+"\">"+
							"<div class=\"chatdiv\">"+
								"<span "+color+">"+HTMLEncode(object.get("userid").get("username"))+"</span>"+
								"<span>"+HTMLEncode(object.get("message"))+"</span>"+
								"<span>"+object.createdAt+"</span>"+
							"</div>"+
						"</div>"+
					"</li>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	}).then(function(obj) {
		  $("#chat").scrollTop($("#chat")[0].scrollHeight);
	});
	page++;
}