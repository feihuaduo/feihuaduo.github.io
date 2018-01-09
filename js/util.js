function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

function bmobInit() {
	Bmob.initialize("ded0beecb60386cf6d1175ab6c800a5a",
	"0265bad7535c4d46bc55359078f0c001");
}

function test(obj) {
	var s="";
	for(var i in obj)
		s+=i+"\n";
	alert(s);
}