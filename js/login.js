$(function() {
	initInput();
	login();
});

function initInput() {
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function login() {
	$("#cen form").submit(function() {
		var name=$("#c_name input").val();
		var password=$("#c_pass input").val();
		if(name=="" || password=="")
			alert("不能为空");
		else{
			Bmob.User.logIn(name, password, {
				  success: function(user) {
					  window.location.href="../index.html";
				  },
				  error: function(user, error) {
					  alert("用户名不存在或密码错误");
				  }
			});
		}
		return false;
	});
}