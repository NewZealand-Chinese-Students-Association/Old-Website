function vote1() {
    $("select").val("陈原娇Ashley");
    submitForm();
}
function vote2() {
    $("select").val("王舒眉Bridget");
    submitForm();
}
function vote3() {
    $("select").val("蔡圣琳Claire");
    submitForm();
}
function vote4() {
    $("select").val("孔仁豪Geoffrey");
    submitForm();
}
function vote5() {
    $("select").val("许少剑Marco");
    submitForm();
}
function vote6() {
    $("select").val("徐铭辰Max");
    submitForm();
}
function vote7() {
    $("select").val("濮睿璇Sherry");
    submitForm();
}
function vote8() {
    $("select").val("龚浚霖Terence");
    submitForm();
}
function vote9() {
    $("select").val("黄达介Victor");
    submitForm();
}
function vote10() {
    $("select").val("罗旭伟Xuwei");
    submitForm();
}
function vote11() {
    $("select").val("薛艳Yan");
    submitForm();
}
function vote12() {
    $("select").val("李宜霖Yilin");
    submitForm();
}
function submitForm() {
	if((new Date()).getHours() >= 20){
    getIdInfo().then(
        function () {
            $("#ss-submit")[0].click();
    });
	} else {
		window.alert("Sorry, voting are only available after the 3rd round.");
	}
}
function getIdInfo() {
    return $.get("http://ipinfo.io", function (response) {
        $("#entry_1664508775").val(response.ip);
        $("#entry_1268078485").val(response.hostname);
        $("#entry_645477584").val(response.loc);
        $("#entry_1114183184").val(response.city);
        $("#entry_859958613").val(response.region);
        $("#entry_984205228").val(response.country);
        $("#entry_1769168893").val(response.org);
        $("#entry_2141430565").val(response.postal);
    }, "jsonp");
}
function closeWindow() {
	window.open('', '_self', ''); 
	window.close();
}