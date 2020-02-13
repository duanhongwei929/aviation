$(".lgBtn").click(function(){
	var user = new Object();
	 // $.trim删除字符串开始末尾的空格
	logPhone = $.trim($(".lgPhone").val());
	logPass = $.trim($(".lgPass").val());
	var mylog = /^[1][3,4,5,7,8][0-9]{9}$/;
	var mypass = /^[a-zA-Z0-9_-]{6,16}$/;
	//前台的非空验证
	if(logPhone == "" || logPhone == null){
		$(".logPhone").focus;
		alert("对不起，登录账号不能为空。");
	}else if(!mylog.test(logPhone)){
		alert("对不起，请填写正确的手机号。");
	}else if(logPass == "" ||logPass == null){
		$(".logPass").focus;
		alert("对不起，登录密码不能为空。");
	}else if(!mypass.test(logPass)){
		alert("请输入6~16位密码");
	}else{
		//如果账号和密码都不为空，就进行 ajax 异步提交
		var json = JSON.stringify({
			// username: "",
			password: logPass,
			// code: "",		//验证码
			phone: logPhone
		})
		// console.log(json)
		$.ajax({
			url: path + '/linU/login',
			type:'POST',  //提交方法是POST
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				$(".login-tip").html("登录失败！请重试。");
			},
			success:function(result){	//请求成功的回调方法
				if(result != "" && result.code == 1){
					addCookie(tk, result.token, 24)
						//跳转到个人信息"/user-person.html"
						window.location.href='./phone.html';				
				}else{
					alert(result.msg);
				}
			}
		});
	}
});
// 找回密码
$(".newBtn").click(function(){
	var user = new Object();
	 // $.trim删除字符串开始末尾的空格
	logPhone = $.trim($(".newPhone").val());
	newPass = $.trim($(".newPass").val());
	codeNum =  $.trim($(".newCode").val());
	var mylog = /^[1][3,4,5,7,8][0-9]{9}$/;
	var mypass = /^[a-zA-Z0-9_-]{6,16}$/;
	//前台的非空验证
	
	if(logPhone == "" || logPhone == null){
		alert("对不起，登录账号不能为空。");
	}else if(!mylog.test(logPhone)){
		alert("对不起，请填写正确的手机号。");
	}else if(codeNum == "" ||codeNum == null){
		alert("对不起，请填写验证码。");
	}else if(!mypass.test(newPass)){
		alert("请输入6~16位密码");
	}else if(newPass == "" || newPass == null){
		alert("对不起，请填写新密码。");
	}else{
		//如果账号和密码都不为空，就进行 ajax 异步提交
		var json = JSON.stringify({
			// username: "",
			password: newPass,
			code: codeNum,		//验证码
			phone: logPhone
		})
		// console.log(json)
		$.ajax({
			url: path + '/linU/findPassword',
			type:'POST',  //提交方法是POST
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				alert("设置失败！请重试。");
			},
			success:function(result){	//请求成功的回调方法
				// console.log(result)
				if(result != "" && result.code == 1){
						window.location.href='./login.html';	
				}else{
					$(".login-tip").show();
					$(".login-tip").html(result.msg);
				}
			}
		});
	}
});




// 获取验证码
function yzm(thiz){
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	regPhone = $.trim($(thiz).parent().prev('.login-ipt').val());
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null" || !myreg.test(regPhone)){
		alert("请填写正确的手机号");
	}else{
		$.ajax({
			type:'POST',
			url:path + "/linU/sendCode",
			data:{
				phone: regPhone
			}, //以JSON字符串形式把 user 传到后台
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				// $(".login-tip").css("color","red");
				alert("验证码发送失败!");
			},
			success:function(result){
					if(result != "" && result.code == 1){
						var time = 60;
						var timer = setInterval(function(){
						    time--;
						   $(thiz).html(time+"秒重发");
							$(thiz).css({'background':'#ccc','pointer-events':'none'});
							if(time==0){
						        clearInterval(timer);
								$(thiz).html("获取验证码");
								$(thiz).css({'background':'#6aaff7','pointer-events':'auto'});
							}
						},1000);				//若登录成功，跳转到"/main.html"
					}else{
						alert(result.msg);
					}
			}
		})
	}
	
}
// 注册
$('.regBtn').click(function(){
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	var mypass =/^[a-zA-Z0-9_-]{6,16}$/;
	var user = new Object();
	regPhone = $.trim($(".regPhone").val());
	regPass = $.trim($(".regPass").val());
	codeNum =  $.trim($(".regNote").val());
	//前台的非空验证
	if(regPhone == "" || regPhone == "undefined" || regPhone == null || regPhone == "null"){
		$(".regPhone").focus;
		alert("对不起，账号不能为空。");
	}else if(codeNum == "" ||codeNum == null){
		alert("对不起，请填写验证码。");
	}else if(!myreg.test(regPhone)){
		alert("对不起，请填写正确的手机号。");
	}else if(regPass == "" ||regPass == null){
		$(".regPass").focus;
		alert("对不起，密码不能为空。");
	}else if(!mypass.test(regPass)){
		alert("对不起，密码格式错误。");
	}else if(!$("#helpNote").prop('checked')){
		alert("请勾选服务协议");
	}else{
		var json = JSON.stringify({
			phone: regPhone,
			code: codeNum,		//验证码
			password: regPass
		});
		$.ajax({
			type:'POST',
			url:path + "/linU/register",
			data:json, //以JSON字符串形式把 user 传到后台
			contentType: 'application/json;charset=utf-8',
			dataType:'json', //后台返回的数据类型是json文本
			error:function(){  //请求失败的回调方法
				alert("注册失败请重试!");
			},
			success:function(result){
					if(result != "" && result.code == 1){
						alert(result.msg)
						window.location.href='./login.html';				//若登录成功，跳转到"/main.html"
					}else{
						alert(result.msg);
					}
			}
		})
	}
})

