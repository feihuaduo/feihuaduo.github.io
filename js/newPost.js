$(function() {
	init();
	$("#img input").attr("disabled",true);
	$("#button input").click(function() {
		var currentUser = Bmob.User.current();
		if (currentUser) {
			var title=$("#title input").val();
			var text=$("#text textarea").val();
			if(title==""||text==""){
				alert("不能为空");
			}
			else if(title.length>20){
				alert("标题字数不能超过20个字");
			}
			else if(currentUser.get("shequ_qx")==1){
				alert("你已被禁言");
			}
			else{
				$("#button input").attr("disabled",true);
				$("#img input").attr("disabled",true);
				bj=false;
				var type;
				var message=new Array(1+$("#img img").length);
				var TieType = Bmob.Object.extend("TieType");
				var query = new Bmob.Query(TieType);
				query.get(s1, {
					success: function(tieType) {
						type=tieType;
					}
				}).then(function(obj) {
					$("#img span").text("上传图片中");
					message[0]={"message":text};
					var i=1;
					var promises = [];
					$.each(map, function(e, ele){
						var file = new Bmob.File(e.substring(e.lastIndexOf("\\")+1), ele);
						promises.push(file.save().then(function(obj) {
							message[i]={"message":"","image":{"group":"","url":file.url(),"filename":file.name()}};
//							message[i]={"message":"","image":file};
							i++;
						}));
					});
					return Bmob.Promise.when(promises);
				}).then(function() {
					var Tiezi = Bmob.Object.extend("Tiezi");
					var p = new Tiezi();
					p.set("title", title);
					p.set("neirong", "");
					p.set("tiezuo", currentUser);
					p.set("pls", 0);
					p.set("tie_type",type);
					p.set("message",message);
					p.save(null, {
					  success: function(gameScore) {
						  $("#img span").text("高级发帖模式请下载OURYGO APP");
						  window.location.href="community.html";
					  },
					  error: function(gameScore, error) {
						  alert(error.description);
					  }
					});
				});
			}
		}
		else{
			alert("请先登录");
		}
	});
	$("#img input").change(function() {
		if(map[$("#img input").val()]==null){
			$("#img").prepend("<img onClick=\"a(this,'"+$("#img input").val().replace(/\\/g,"\\\\") +"')\" src=\""+$("#img input").val()+"\">");
			map[$("#img input").val()]=$("#img input")[0].files[0];
		}
		$("#img input").val("");
	});
});

function a(t,s) {
	if(bj){
		delete map[s];
		t.remove();
	}
}

var map={};
var map2={};
var bj=true;

function init() {
	bmobInit();	
	initLogin();
	initInput();
	initSelect();
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
	$("#button input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#button input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

var s1;

function initSelect() {
	var TieType = Bmob.Object.extend("TieType");
	var query = new Bmob.Query(TieType);
	query.descending("createdAt");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				if(object.get("type")==null){
					if(object.get("name")=="闲谈"){
						$("#select select:first").append("<option selected=\"selected\" value=\""+object.id+"\">"+object.get("name"));
						s1=object.id;
					}
					else
						$("#select select:first").append("<option value=\""+object.id+"\">"+object.get("name"));
				}
			}
			$("#select select:last").attr("disabled","disabled");
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function changeSelect() {
	$("#select select:last").empty();
	s1=$("#select select:first").val();
	
	var TieType = Bmob.Object.extend("TieType");
	var query = new Bmob.Query(TieType);
	query.descending("createdAt");
	query.include("type");
	query.find({
		success : function(results) {
			$("#select select:last").attr("disabled",false);
			var temp;
			var a=0;
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				if(object.get("type")!=null&&object.get("type").id==s1){
					if(a==0){
						$("#select select:last").append("<option selected=\"selected\" value=\""+object.id+"\">"+object.get("name"));
						temp=object.id;
						a=1;
					}
					else
						$("#select select:last").append("<option value=\""+object.id+"\">"+object.get("name"));
				}
			}
			if(a==0)
				$("#select select:last").attr("disabled",true);
			else
				s1=temp;
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function changeSelect2() {
	s1=$("#select select:last").val();
}