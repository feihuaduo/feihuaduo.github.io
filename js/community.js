$(function() {
	init();
	$("#foot a").click(function() {
		if(page*15>max+15)
			$("#foot a").text("没有更多");
		else
			add();
	});
	$("#bar button").click(function() {
		var currentUser = Bmob.User.current();
		if (currentUser) {
			window.location.href="newPost.html";
		}
		else{
			alert("请先登录");
		}
	});
});

var page=1;
var max=0;

function init() {
	bmobInit();	
	initLogin();
	initSelect();
	initInput();
	add();
}

function initInput() {
	$("#bar button").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#bar button").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function add() {
	var Tiezi = Bmob.Object.extend("Tiezi");
	var query = new Bmob.Query(Tiezi);
	if(s1!=null)
		query.equalTo("tie_type", s2);
	query.count({
	  success: function(count) {
		  max=count;
	  },
	  error: function(error) {
	  }
	});

	query = new Bmob.Query(Tiezi);
	query.descending("createdAt");
	query.skip((page-1)*15);
	query.limit(15);
	if(s1!=null)
		query.equalTo("tie_type", s2);
	query.include("message,tiezuo");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			var div = $("#news ul");
			var img;
			var id;
			var message;
			for (var i = 0; i < results.length; i++) {
				object = results[i];
				message=object.get("message");
				var url="";
				for(var j=0; j<message.length;j++){
					obj=message[j];
					if(url==""&&obj!=null&&obj.image!=null){
						url=obj.image._url;
						break;
					}
				}
				if(url=="")
					url="http://bmob-cdn-16129.b0.upaiyun.com/2018/01/05/1744d368400ce5bd8041bcfbf6967d7f.jpg";
				var d="";
				for(var j=0; j<message.length;j++){
					obj=message[j];
					if(obj.image!=null)
						d+="[图片]";
					if(obj.message!=null)
						d+=obj.message;
				}
				div.append("<li>" +
								"<div class=\"news\" onClick=\"divClick('"+object.id+"')\">" +
									"<div style=\"height: 40px;\"\">" +
										"<img class=\"tx\" src=\""+getTouXiang(object.get("tiezuo"))+"\">" +
										"<span class=\"name\">"+HTMLEncode(object.get("tiezuo").get("username"))+"</span>"+
									"</div>"+
									"<hr>"+
									"<div class=\"neirong\">"+
										"<span class=\"title\">"+HTMLEncode(object.get("title"))+"</span>"+
										"<span class=\"detail\">"+HTMLEncode(d)+"</span>"+
										"<img class=\"img\" src=\""+url+"!/fwfh/100x100\">" +
									"</div>"+
									"<hr>"+
									"<div>" +
										"<span class=\"time\">"+object.createdAt+"</span>"+
										"<div class=\"pls\">"+
											"<img src=\"http://bmob-cdn-16129.b0.upaiyun.com/2018/01/18/2a4360ae401c857e8066947858824bc5.png!/fwfh/20x20\">" +
											"<span >"+object.get("pls")+"</span>"+
										"</div>"+
									"</div>"+
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


var s1=null;
var s2=null;

function initSelect() {
	var TieType = Bmob.Object.extend("TieType");
	var query = new Bmob.Query(TieType);
	query.descending("createdAt");
	query.find({
		success : function(results) {
			// 循环处理查询到的数据
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				if(object.get("type")==null)
					$("#bar select:first").append("<option value=\""+object.get("name")+"\">"+object.get("name"));
			}
			$("#bar select:last").attr("disabled","disabled");
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

function changeSelect() {
	$("#bar select:last").empty();
	s1=$("#bar select:first").val();
	if(s1=="闲谈"){
		$("#bar select:last").attr("disabled",true);
		var TieType = Bmob.Object.extend("TieType");
		var query = new Bmob.Query(TieType);
		query.descending("createdAt");
		query.equalTo("name", s1);
		query.find({
			success : function(results) {
				s2=results[0];
				changeSelect2();
			},
			error : function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		});
	}
	else if(s1!="全部"){
		$("#bar select:last").attr("disabled",false);
		var TieType = Bmob.Object.extend("TieType");
		var query = new Bmob.Query(TieType);
		query.descending("createdAt");
		query.include("type");
		query.find({
			success : function(results) {
				// 循环处理查询到的数据
				var a=0;
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					if(object.get("type")!=null&&object.get("type").get("name")==s1){
						if(a==0){
							$("#bar select:last").append("<option selected=\"selected\" value=\""+object.get("name")+"\">"+object.get("name"));
							a++;
						}
						else
							$("#bar select:last").append("<option value=\""+object.get("name")+"\">"+object.get("name"));
					}
				}
				changeSelect2();
			},
			error : function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		});
	}
	else{
		$("#bar select:last").attr("disabled","disabled");
		s1=null;
		s2=null;
		changeSelect2();
	}
}

function changeSelect2() {
	$("#news ul").empty();
	var s=$("#bar select:last").val();
	if(s!=null){
		var TieType = Bmob.Object.extend("TieType");
		var query = new Bmob.Query(TieType);
		query.descending("createdAt");
		query.equalTo("name", s);
		query.find({
			success : function(results) {
				s2=results[0];
				page=1;
				add();
			},
			error : function(error) {
				alert("查询失败: " + error.code + " " + error.message);
			}
		});
	}
	else{
		page=1;
		add();
	}
}