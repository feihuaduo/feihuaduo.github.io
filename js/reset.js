$(function() {
	initInput();
	bmobInit();
	reset();
});

function initInput() {
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}

function reset() {
	$("#cen form").submit(function() {
		var email=$("#c_email input").val();
		if(email=="")
			alert("不能为空");
		else{
			Bmob.User.requestPasswordReset(email, {
				  success: function() {
					  alert("已将密码重置链接发送到"+email);
					  $("#c_btu input").get(0).disabled=true;
				  },
				  error: function(error) {
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
		}
		return false;
	});
}