$(function() {
	init();
});

function init() {
	bmobInit();		

	var id=getQueryString("id");
	var Tiezi = Bmob.Object.extend("Tiezi");
	var query = new Bmob.Query(Tiezi);
	query.equalTo("objectId", id);
	query.include("message,tiezuo");
	query.find({
		success : function(results) {
			var tiezi=results[0];
			var user=tiezi.get("tiezuo");
			
			$("#title").append("<h1>"+tiezi.get("title")+"</h1>");
			$("#icon").attr("src",user.get("avatar")._url+"!/fwfh/60x60");
			$("#name").text(user.get("signature"));
			$("#time").text(tiezi.createdAt);
			var message=tiezi.get("message");
			for(var i=0;i<message.length;i++){
				var meg=message[i];
				if(meg.image!=null)
					$("#detail").append("<img src=\""+meg.image._url+"!/fwfh/400x400\">");
				if(meg.message!=null)
					$("#detail").append("<p>"+meg.message+"</p>");
			}
		},
		error : function(error) {
			alert("查询失败: " + error.code + " " + error.message);
		}
	});
}

