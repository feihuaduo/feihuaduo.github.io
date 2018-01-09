$(function() {
	init();
	$("#foot a").click(function() {
		add();
	});
});

var page=1;

function init() {
	bmobInit();		
	add();
}

function add() {
	var ZiXun = Bmob.Object.extend("ZiXun");
	var query = new Bmob.Query(ZiXun);
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
				div.append("<li><div class=\"news\"><a href=\"detail.html?id="+message.id+"\">"+
						  "<span class=\"title\">"+object.get("zs_title")+"</span>"+
						  "<span class=\"time\">"+object.createdAt+"</span>"+
						  "<img src=\""+url+"!/fwfh/160x160\"></a></div></li>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
	page++;
}