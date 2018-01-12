$(function() {
	initInput();
	bmobInit();
	activation();
});

function initInput() {
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function activation() {
	$("#cen form").submit(function() {
		var name=$("#c_name input").val();
		var email=$("#c_email input").val();
		if(name=="" || email=="")
			alert("不能为空");
		else{
			var query = new Bmob.Query(Bmob.User);
			query.equalTo("username", name);
			query.find({
				success: function(results) {
					var user = results[0];
					if(user.get("email")==email){
						 Bmob.User.requestEmailVerify(email, {
							 success: function() {
							    alert("已将激活链接发送到"+email);
							    $("#c_btu input").get(0).disabled=true;
							 },
							 error: function(error) {
								alert("Error: " + error.code + " " + error.message);
							 }
						});
					}
					else
						alert("用户名与邮箱不匹配");
				},
				error: function(user, error) {
					alert("用户名不存在");
				}
			});
		}
		return false;
	});
}