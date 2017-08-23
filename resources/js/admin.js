/**
 * Created by jessy on 06/29/17.
 */
/*$('.form_date').datetimepicker({
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});*/
$(function(){
	//修改密码
	$('#modify_password_button').click(function(){
		$.ajax({
			type: "post",
            url: "/admin/updatePassword",
            data: {oldpass:$("#origin_password").val(), newpass1:$("#new_password").val(), newpass2:$("#confirm_password").val()},
            dataType: "json",
            success: function(data){
            	alert(data.text);
            	if(data.text == "修改成功！")
            		window.location.href="/admin";
            }
		});
	});
	//添加食堂
	$('#add_dinning_hall_submit').click(function(){
		var data = {
				name:$("#dinning_hall_name").val(), school:$("#dinning_hall_school").val(),
				description:$("#dinning_hall_description").val()
		};
		$.ajax({
			type: "get",
            url: "/admin/saveCanteen",
            data: data,
            dataType: "json",
            success: function(data){
            	alert(data.text);
            	if(data.text == "添加成功！")
            		window.location.href="/admin";
            }
		});
	});
	//添加菜
	$('#add_dish_submit').click(function(){
		var data = {
				name:$("#dish_name").val(), cantName:$("#dish_dinning_hall").val(),
				description:$("#dish_description").val(),price:$("#dish_price").val()
		};
		$.ajax({
			type: "get",
            url: "/admin/saveDish",
            data: data,
            dataType: "json",
            success: function(data){
            	alert(data.text);
            	if(data.text == "添加成功！")
            		window.location.href="/admin";
            }
		});
	});
	//显示当前页面的所有食堂
	$('#show_canteen').click(function (){
		$.ajax({
			type: "get",
            url: "/admin/Canteens",
            dataType: "json",
            success: function(data){
        		clearContent("dinning_halls");
        		for(var i=1; i<=data.length; i++)
        			$('#dinning_halls').append(setCanteen(data[i-1],i));

        		//监听删除当前食堂
        		$('.delete_canteen').click(function(){
        			var id = $(this).attr("data-id");
        			$.ajax({
        				type: "get",
        	            url: "/admin/deleteCanteen",
        	            data: {id:id},
        	            dataType: "json",
        	            success: function(data){
        	            	console.log("hahaah");
        	            	var data1 = data[0];
        	            	var data2 = data[1];
        	            	var data3 = data[2];
        	            	$('#canteenId_'+data1).remove();
        	            	clearContent("dish_dinning_hall");
        	        		clearContent("dish_dinning_hall_modal");
        	        		for(var i=0; i<data2.length; i++){
        	        			$('#dish_dinning_hall').append("<option>"+data2[i].name+"</option>");
        	        			$('#dish_dinning_hall_modal').append("<option>"+data2[i].name+"</option>");
        	        		}
        	        		$('#show_canteen').children('span').text(data3[0].num);
        	            }
        			});
        		});
        		//获取当前食堂信息
        		$('.modify_canteen').click(function(){
        			var id = $(this).attr("data-id");
        			$.ajax({
        				type: "get",
        	            url: "/admin/Canteen",
        	            data: {id:id},
        	            dataType: "json",
        	            success: function(data){
        	            	console.log(data);
        	            	$('#dinning_hall_name_modal').val(data.Cname);
        	            	$('#dinning_hall_school_modal').val(data.Cschool);
        	            	$('#dinning_hall_description_modal').val(data.Cdescription);
        	            	$('#modify_canteen_model_button').attr("data-id",data.Cid);
        	            }
        			});
        		});
            }
		});		
	});	
	//修改当前食堂信息
	$('#modify_canteen_model_button').click(function(){
		console.log($('#dinning_hall_name_modal').val());
		var data = {
				id:$('#modify_canteen_model_button').attr("data-id"),name:$('#dinning_hall_name_modal').val()
				,school:$('#dinning_hall_school_modal').val(),description:$('#dinning_hall_description_modal').val()
		};
		$.ajax({
			type: "get",
            url: "/admin/updateCanteen",
            data: data,
            dataType: "json",
            success: function(data){
            	if(data.text=="修改成功！"){
            		setTimeout(function(){
            			alert(data.text);
            		},200);
            		$('#show_canteen').trigger("click");
            	}else{
            		alert(data.text);
            	}
            }
		});
	});
	//显示当前页面的所有菜品
	$('#show_dish').click(function(){
		$.ajax({
			type: "get",
            url: "/admin/Dishs",
            dataType: "json",
            success: function(data){
            	clearContent("dishes");
        		for(var i=1; i<=data.length; i++)
        			$('#dishes').append(setDish(data[i-1],i));
        		//监听删除当前菜品
        		$('.delete_dish').click(function(){
        			var id = $(this).attr("data-id");
        			deleteDish(id);
        		});
        		//获取当前菜品信息
        		$('.modify_dish').click(function(){
        			var id = $(this).attr("data-id");
        			getDishById(id);
        		});
            }
		});
	});
	//监听删除当前菜品
	$('.delete_dish').click(function(){
		var id = $(this).attr("data-id");
		deleteDish(id);
	});
	//获取当前菜品信息
	$('.modify_dish').click(function(){
		var id = $(this).attr("data-id");
		getDishById(id);
	});
	//修改当前菜品信息
	$('#modify_dish_model_button').click(function(){
		var data = {
				id:$('#modify_dish_model_button').attr("data-id"),name:$('#dish_name_modal').val()
				,canteen:$('#dish_dinning_hall_modal').val(),description:$('#dish_description_modal').val()
				,price:$('#dish_price_modal').val()
		};
		$.ajax({
			type: "get",
            url: "/admin/updateDish",
            data: data,
            dataType: "json",
            success: function(data){
            	if(data.text=="修改成功！"){
            		setTimeout(function(){
            			alert(data.text);
            		},200);
            		$('#show_dish').trigger("click");
            	}else{
            		alert(data.text);
            	}
            }
		});
	});
	
});
//定义一个删除菜品函数
function deleteDish(id){
	console.log(id);
	$.ajax({
		type: "get",
        url: "/admin/deleteDish",
        data: {id:id},
        dataType: "json",
        success: function(data){	
        	var data1 = data[0];
        	var data2 = data[1];
        	$('#dishId_'+data1).remove();
    		$('#show_dish').children('span').text(data2[0].num);
        }
	});
}
//定义一个获取当前菜品信息
function getDishById(id){
	console.log(id);
	$.ajax({
		type: "get",
        url: "/admin/Dish",
        data: {id:id},
        dataType: "json",
        success: function(data){
        	console.log(data);
        	$('#dish_name_modal').val(data[1].Dname);
        	$('#dish_dinning_hall_modal').val(data[0]);
        	$('#dish_description_modal').val(data[1].Ddescription);
        	$('#dish_price_modal').val(data[1].Dprice);      	
        	$('#modify_dish_model_button').attr("data-id",data[1].Did);
        }
	});
}
//设置菜品样式
function setDish(data,i){
	var dt = setBarColor(data.Dmark);
	var str ='<div class="panel panel-default" id="dishId_'+data.Did+'">\
				<div class="panel-heading">\
					<h4 class="panel-title">\
					<div class="panel-group">\
                 		<a data-toggle="collapse" data-parent="#dishes" href="#dish_'+i+'">\
							'+data.Dname+'\
						</a>\
                 <button type="button" class="btn btn-danger col-sm-offset-1 pull-right delete_button delete_dish" data-id="'+data.Did+'">删除</button>\
                 <button type="submit" class="btn btn-warning col-sm-offset-2 pull-right modify_dish" data-toggle="modal" data-target="#modify_dish_modal" data-id="'+data.Did+'">修改</button>\
             </div>\
         </h4>\
     </div>';
    if(i==1)
        str+='<div id="dish_'+i+'" class="panel-collapse collapse in">';
	else
		str+='<div id="dish_'+i+'" class="panel-collapse collapse">';
    str +='\
         <div class="panel-body">\
             <p>食堂：'+data.Cname+'</p>\
             <p>描述：'+data.Ddescription+'</p>\
             <p>价格：RMB '+data.Dprice+'</p>\
             <div class="col-sm-2">\
                 <span class="glyphicon glyphicon-align-left"> 评分(满分10分)：</span>\
             </div>\
             <div class="col-sm-10">\
                 <div class="progress">\
                     <div class="progress-bar '+dt[0]+' progress-bar-striped active" role="progressbar" aria-valuenow="'+data.Dmark*10+'"\
                          aria-valuemin="0" aria-valuemax="100" style="width:'+data.Dmark*10+'%">\
                          	'+data.Dmark+'分 （'+dt[1]+'）\
                     </div>\
                 </div>\
             </div>\
         </div>\
     </div>\
     </div>';
     return str;
}

//设置食堂样式
function setCanteen(data,i){
	var dt = setBarColor(data.Cmark);
	var str = '<div class="panel panel-default" id="canteenId_'+data.Cid+'">\
			<div class="panel-heading">\
				<h4 class="panel-title">\
        		<div class="panel-group">\
            		<a data-toggle="collapse" data-parent="#dinning_halls" href="#dinning_hall_'+i+'">\
                    	'+data.Cname+'\
            		</a>\
            		<button type="button" class="btn btn-danger col-sm-offset-1 pull-right delete_button delete_canteen" data-id="'+data.Cid+'">删除</button>\
            		<button type="submit" class="btn btn-warning col-sm-offset-2 pull-right modify_canteen" data-toggle="modal" data-target="#modify_dinning_hall_modal" data-id="'+data.Cid+'">修改</button>\
            	</div>\
        		</h4>\
        	</div>';
	if(i==1)
		str+='<div id="dinning_hall_'+i+'" class="panel-collapse collapse in">';
    else
        str+='<div id="dinning_hall_'+i+'" class="panel-collapse collapse">';
    str+='<div class="panel-body">\
        	<p>学校：'+data.Cschool+'</p>\
        	<p>描述：'+data.Cdescription+'</p>\
        	<div class="col-sm-2">\
            	<span class="glyphicon glyphicon-align-left"> 评分(满分10分)：</span>\
        	</div>\
          	<div class="col-sm-10">\
            	<div class="progress">\
                	<div class="progress-bar '+dt[0]+' progress-bar-striped active" role="progressbar" aria-valuenow="'+data.Cmark*10+'"\
						aria-valuemin="0" aria-valuemax="100" style="width:'+data.Cmark*10+'%">\
                    	'+data.Cmark+'分 （'+dt[1]+'）\
                	</div>\
            	</div>\
          	</div>\
		  </div>\
		</div>\
	</div>';
	return str;
}
//通过Mark设置bar的颜色
function setBarColor(dt){
	if(dt<6)
		return ["progress-bar-danger","不及格"];
	else if(dt>=6&&dt<8)
		return ["progress-bar-info","良好"];
	else
		return ["progress-bar-success","优秀"];
}
//清除原先的节点
function clearContent(id){
	var Content=document.getElementById(id);
	var size=Content.childNodes.length;
	for(var i=size-1;i>=0;i--){
		Content.removeChild(Content.childNodes[i]);
	}
}