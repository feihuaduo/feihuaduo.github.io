$(function() {
	initInput();
});


var name_ts="账号";
var pass_ts="密码";

function initInput() {
	$("#c_name input").val(name_ts);
	$("#c_pass input").val(pass_ts);
	$("#c_name input").focus(function() {
		if(this.value==name_ts){
			this.value='';
			this.style.color='#000';
		}
	});
	$("#c_pass input").focus(function() {
		if(this.value==pass_ts){
			this.value='';
			this.style.color='#000';
			this.type='password';
		}
	});
	$("#c_name input").blur(function() {
		if(!this.value){
			this.value=name_ts;
			this.style.color='#999';
		}
	});
	$("#c_pass input").blur(function() {
		if(!this.value){
			this.value=pass_ts;
			this.style.color='#999';
			this.type='text';
		}
	});
	$("#c_btu input").mouseenter(function() {
		this.style.backgroundColor='#5378CD';
	});
	$("#c_btu input").mouseleave(function() {
		this.style.backgroundColor='#6188DF';
	});
}