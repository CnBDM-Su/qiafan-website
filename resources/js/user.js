$(function(){
	$('#modify_password_button').click(function(){
		var data = {
				oldpw:$('#origin_password').val(),newpw1:$('#new_password').val(),
				newpw2:$('#confirm_password').val()
		};
		console.log(data);
		$.ajax({
			type: "post",
            url: "/user/updataPw",
            data: data,
            dataType: "json",
            success: function(data){
            	if(data.text=="修改成功！"){
            		window.location.reload();//刷新当前页面.
            		alert(data.text);
            	}else
            		alert(data.text);
            }
		});
	});
	
});