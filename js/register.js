$(function() {
	initInput();
	bmobInit();
	register();
});

function initInput() {
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function register() {
	$("#cen form").submit(function() {
		var name=$("#c_name input").val();
		var password=$("#c_pass input").val();
		var email=$("#c_email input").val();
		if(name=="" || password=="" ||email=="")
			alert("不能为空");
		else{
			var user = new Bmob.User();
			user.set("username", name);
			user.set("password", password);
			user.set("email", email);
			user.set("userzt", true);
			user.set("user_qx", 0);
			user.set("shequ_qx", 0);
			user.set("liaotian_qx", 0);
			user.set("userpoint", new Bmob.GeoPoint({latitude: 0, longitude: 0}));
			user.set("signature", "因为有你我才得以坚持下去");
			user.signUp(null, {
			 success: function(user) {
				 Bmob.User.requestEmailVerify(email, {
						success: function() {
							alert("请到邮箱激活账号");
						},
						error: function(error) {
						}
				 });
				 setTimeout(function(){window.location.href="login.html";},5000);
				 alert("注册成功，5秒后自动跳转到登录页面");
			  },
			  error: function(user, error) {
				  alert("Error: " + error.code + " " + error.message);
			  }
			});
		}
		return false;
	});
}