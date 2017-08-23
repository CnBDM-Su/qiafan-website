$(function(){
	//注册
	$('#sign_up_modal_button').click(function (){
		var data ={
				username:$('#sign_up_modal_user_name').val(),password1:$('#sign_up_modal_password').val()
				,password2:$('#sign_up_modal_confirm_password').val()
		};
		$.ajax({
			type: "post",
            url: "/signUp",
            data: data,
            dataType: "json",
            success: function(data){
            	alert(data.text);
            	if(data.text=="注册成功！")
            		window.location.href="/index";
            }
		});
	});
	
	//登陆
	$('#log_in_modal_button').click(function (){
		var data = {
				name:$('#log_in_modal_user_name').val(),pw:$('#log_in_modal_password').val()
		};
		$.ajax({
			type: "post",
            url: "/logIn",
            data: data,
            dataType: "json",
            success: function(data){
            	if(data.text=="登陆成功！"){
            		window.location.reload();//刷新当前页面.
            		alert(data.text);
            	}
            	else
            		alert(data.text);
            }
		});
		
	});
	
});