$(function() {
	init();
	logout();
});

function logout() {
	$("#cen form").submit(function() {
		Bmob.User.logOut();
		window.location.href="../index.html";
		return false;
	});
}

function init() {
	initInput();
	bmobInit();
	initLogin();
	
	var currentUser = Bmob.User.current();
	if (currentUser) {
		$("#c_name").text(currentUser.get("username"));
		$("#c_signature").text(currentUser.get("signature"));
		$("#c_email").text("邮箱："+currentUser.get("email"));
		$("#cen img").attr("src",getTouXiang(currentUser));
		if(currentUser.get("liaotian_qx")==1)
			$(".r:first").text("禁言");
		if(currentUser.get("shequ_qx")==1)
			$(".r:last").text("禁言");
	}
	else{
		alert("请先登录");
	}
}

function initInput() {
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
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