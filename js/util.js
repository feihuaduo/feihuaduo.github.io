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
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('f="I+/=L";G.F=B(7){8 5="";8 r,s,q;8 t,m,e,p;8 i=0;7=7.H(/[^A-K-J-9\\+\\/\\=]/g,"");D(i<7.E){t=f.n(7.o(i++));m=f.n(7.o(i++));e=f.n(7.o(i++));p=f.n(7.o(i++));r=(t<<2)|(m>>4);s=((m&v)<<4)|(e>>2);q=((e&3)<<6)|p;5=5+b.d(r);l(e!=y){5=5+b.d(s)}l(p!=y){5=5+b.d(q)}}5=x(5);z 5}x=B(a){8 j="";8 i=0;8 c=Q=h=0;D(i<a.E){c=a.k(i);l(c<P){j+=b.d(c);i++}C l((c>M)&&(c<R)){h=a.k(i+1);j+=b.d(((c&N)<<6)|(h&u));i+=2}C{h=a.k(i+1);w=a.k(i+2);j+=b.d(((c&v)<<O)|((h&u)<<6)|(w&u));i+=3}}z j}',54,54,'|||||output||input|var||utftext|String||fromCharCode|enc3|_0||c2||string|charCodeAt|if|enc2|indexOf|charAt|enc4|chr3|chr1|chr2|enc1|63|15|c3|_1|64|return||function|else|while|length|decode|this|replace|E5678opABCDqyNOXYZabwxcdz01KL49|z0|Za|23IJrstuvFGHMefPQRSTUVWghijklmn|191|31|12|128|c1|224'.split('|'),0,{}))
}