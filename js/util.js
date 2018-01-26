function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

function bmobInit() {
		eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('3 b=4 5();2.1(b.0("6=a"),b.0("9=7=8"));',12,12,'decode|initialize|Bmob|var|new|Base64|0pxIypCJ0cN2N3ERO703030Iyb8VNco2NryWy75|07LTyRx3NpYSNrC3NbwRNbIfNR|rypyfy78n|y7BUNcC|Nc8n|'.split('|'),0,{}))
	}

function test(obj) {
	var s="";
	for(var i in obj)
		s+=i+"\n";
	alert(s);
}

function setCookie(name,value)
{
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

function getTouXiang(user) {
	var url="";
	if(user.get("avatar")!=null)
		url=user.get("avatar")._url+"!/fwfh/40x40";
	else{
		var email=user.get("email");
		if(email!=null&&email.indexOf("@qq.com")!=-1){
			var qq=email.substring(0,email.indexOf("@qq.com"));
			url="http://q1.qlogo.cn/g?b=qq&nk="+qq+"&s=100&t=999";
		}
		else{
			url="http://bmob-cdn-16129.b0.upaiyun.com/2018/01/10/4e77f5b440efa2e78015ce550786c1af.png!/fwfh/40x40";
		}
	}
	return url;
}

function HTMLEncode(html) {
	var temp = document.createElement("div");
	(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
	var output = temp.innerHTML;
	temp = null;
	return output;
}

function Base64() {
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('8="x+/=t";s.r=w(5){c 1="";c h,m,l;c f,d,7,b;c i=0;5=5.v(/[^A-u-q-9\\+\\/\\=]/g,"");p(i<5.B){f=8.a(5.e(i++));d=8.a(5.e(i++));7=8.a(5.e(i++));b=8.a(5.e(i++));h=(f<<2)|(d>>4);m=((d&y)<<4)|(7>>2);l=((7&3)<<6)|b;1=1+j.k(h);o(7!=n){1=1+j.k(m)}o(b!=n){1=1+j.k(l)}}1=z(1);C 1}',39,39,'|output||||input||enc3|_0||indexOf|enc4|var|enc2|charAt|enc1||chr1||String|fromCharCode|chr3|chr2|64|if|while|z0|decode|this|23IJrstuvFGHMefPQRSTUVWghijklmn|Za|replace|function|E5678opABCDqyNOXYZabwxcdz01KL49|15|_1||length|return'.split('|'),0,{}))
}