$(function() {
	init();
	$("#foot a").click(function() {
		if(page*15>max+15)
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
	var currentUser = Bmob.User.current();
	var MessageAlert = Bmob.Object.extend("MessageAlert");
	var query = new Bmob.Query(MessageAlert);
	query.equalTo("hfuser", currentUser);
	query.notEqualTo("senduser", currentUser);
	switch(s1){
		case "已读":
			query.equalTo("isShow", true);
			break;
		case "未读":
			query.equalTo("isShow", false);
			break;
	}
	query.count({
	  success: function(count) {
		  max=count;
	  },
	  error: function(error) {
	  }
	});

	query = new Bmob.Query(MessageAlert);
	query.equalTo("hfuser", currentUser);
	query.notEqualTo("senduser", currentUser);
	switch(s1){
		case "已读":
			query.equalTo("isShow", true);
			break;
		case "未读":
			query.equalTo("isShow", false);
			break;
	}
	query.descending("createdAt");
	query.skip((page-1)*15);
	query.limit(15);
	query.include("senduser,hfhf,hftie");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			var div = $("#news ul");
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				var hfneirong="";
				if(object.get("hfhf")!=null)
					hfneirong="<span class=\"rhfmessage\">"+HTMLEncode(object.get("hfhf").get("neirong"))+"</span>";
				var s="未读";
				if(object.get("isShow"))
					s="已读";
				div.append("<li>"+
					"<hr>"+
					"<div class=\"reply\" onClick=\"divClick('"+object.id+"')\">"+
						"<img class=\"ricon\" src=\""+getTouXiang(object.get("senduser"))+"\">"+
						"<span class=\"rfloor\">"+s+"</span>"+
						"<ul>"+
							"<li><span class=\"rname\">"+HTMLEncode(object.get("senduser").get("username"))+"</span>"+
							"<li><span class=\"rtime\">"+object.createdAt+"</span>"+
						"</ul>"+
						hfneirong+
						"<span class=\"rmessage\">"+HTMLEncode(object.get("sendmessage"))+"</span>"+
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
	var MessageAlert = Bmob.Object.extend("MessageAlert");
	var query = new Bmob.Query(MessageAlert);
	query.include("hftie");
	query.get(id, {
		success: function(messageAlert) {
			window.open("detail.html?id="+messageAlert.get("hftie").id);
			messageAlert.set("isShow",true);
			messageAlert.save();
		},
		error: function(object, error) {
		}
	});
}

function initLogin() {
	var currentUser = Bmob.User.current();
	if (currentUser) {
		$("#login a").text(currentUser.get("username"));
		$("#login a").attr("href","user.html");
	}
	else{
		window.location.href="login.html";
	}
}


var s1="全部";

function changeSelect() {
	s1=$("#bar select:first").val();
	page=1;
	$("#news ul").empty();
	add();
}