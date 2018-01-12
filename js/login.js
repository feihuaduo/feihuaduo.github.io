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
	if(getCookie("password_")!=null){
		$("#c_name input").val(getCookie("password_").split("\n")[0]);
		$("#c_pass input").val(getCookie("password_").split("\n")[1]);
		$("#c_ck input").get(0).checked=true;
	}
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
					  if($("#c_ck input").get(0).checked)
						  setCookie("password_",name+"\n"+password);
					  else
						  delCookie("password_");
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