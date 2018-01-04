$(function() {
	banner();
});
function banner() {
	var m = n = 0, count;
	count = $("#banner_list a").length;
	$("#banner_list a").hide();
	$("#banner_list :eq(" + n * 2 + ")").animate({
		width : 'toggle'
	}, 1500);
	var t = setInterval(function() {
		n = (n + 1) % count;
		$("#banner ul :eq(" + n * 2 + ")").trigger("click");
	}, 6000);
	$("#banner li").click(function() {
		var i = $(this).text() - 1;
		n = i;
		$("#banner_list :eq(" + n * 2 + ")").animate({
			width : 'toggle'
		}, 1500);
		$("#banner_list :eq(" + m * 2 + ")").animate({
			width : 'toggle'
		}, 1500);
		$("#banner ul :eq(" + n * 2 + ")").css("background-color", '#900');
		$("#banner ul :eq(" + m * 2 + ")").css("background-color", '#6C6D6E');
		m = n;
	});
}