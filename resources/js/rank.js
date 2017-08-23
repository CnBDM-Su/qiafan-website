// $(document).ready(function(){
//
//     $(".div_1").mCustomScrollbar({
//         scrollButtons:{
//             enable:true
//         },
//         theme:"dark"
//     });
//
//     $(".bao_zi").raty();
// });
function setdish(data,i){
	var str = '<div class="card">\
				<div class="triangle-topleft"></div>\
        		<div class="number">\
            		<span>'+i+'</span>\
            	</div>\
     			<div class="aside">\
     				<img src="/resources/images/dish_pic/'+data.Dpic_path+'" alt="" class="avatar">\
     				<p class="dish_name">'+data.Dname+'</p>\
     				<h4>'+data.Dmark+'</h4>\
     			</div>\
     			<div class="main clearfix">\
     			<!--文字左半部分-->\
     				<div class="div_1 col-sm-8">\
     					<h3>介绍</h3>\
     					<p class="desc">'+data.Ddescription+'</p>\
     				</div>\
     				<!--文字右半部分-->\
     				<div class="div_2">\
     					<div>\
     						<h3 class="dinning_hall_name">-食堂</h3>\
     						<p>'+data.Cname+'</p>\
     						<h3 class="dish_price">-价格</h3>\
     						<p>￥ '+data.Dprice+'</p>\
     					</div>\
     					<div class="rate">\
     						<h3>-评分</h3>\
         					<span class="bao_zi'+i+'"></span>\
         					<span class="score" id="score'+i+'" data-id="'+data.Did+'"></span>\
     					</div>\
     				</div>\
     			</div>\
     		   </div>';
     return str;
}
//清除原先的节点
function clearContent(id){
	var Content=document.getElementById(id);
	var size=Content.childNodes.length;
	for(var i=size-1;i>=0;i--){
		Content.removeChild(Content.childNodes[i]);
	}
}

//设置评分图标区
function initStyle(id){
	$(".bao_zi"+id).raty({
    	hints: ['1','2','3','4','5'],
    	target: '#score'+id,
    	targetKeep : true,
	});
}
function realStyle(id,score){
	$(".bao_zi"+id).raty({
    	hints: ['1','2','3','4','5'],
    	target: '#score'+id,
    	readOnly:false,
    	score:score,
    	targetKeep : true,
	});
}

(function($){
	//导航栏
    $(".div_1").mCustomScrollbar({
        scrollButtons:{
            enable:true
        },
        theme:"dark"
    });
    //排行榜选项
    $(".nav_rank li a").click(function(){
        $(".nav_rank li a").each(function(){
            $(this).css({"fontSize":"1em"});
        });
        $(this).css({"fontSize":"1.5em"});
    });
    $.ajax({
		type: "get",
        url: "/rank/compreheRank",
        dataType: "json",
        success: function(data){
        	console.log(data);
        	clearContent("list");
        	if(data[1]!="可以评分"){
        		for(var i=1;i<=data[0].length;i++){
        			$('#list').append(setdish(data[0][i-1],i));
        			initStyle(i);
        		}
        	}else{
        		for(var i=1;i<=data[0].length;i++){
        			$('#list').append(setdish(data[0][i-1],i));
        			var flag = true;
        			for(var j=0;j<data[2].length;j++){
            			if(data[2][j].Did==data[0][i-1].Did){
            				realStyle(i,data[2][j].Mmark);
            				flag = false;break;
            			}
        			}
        			if(flag)
        				initStyle(i);
        		}
        	}
        	//评分区监听
        	$('.div_2').click(function(){
    			var score = $(this).children('.rate').children('.score').text();
    			var dishid = $(this).children('.rate').children('.score').attr("data-id");
        		if(data[1]=="可以评分"){
                	console.log(dishid);
                	var dt = {
                			score:score,did:dishid
                	}
                	$.ajax({
                		type: "get",
                        url: "/rank/saveMark",
                        data: dt,
                        dataType: "json",
                        success: function(data){
                        	alert(data.text);
                        	window.location.href="/rank";
                        }	
                	});
        		}else{
                	alert(data[1]);
                	window.location.href="/rank";
                }
            });
        	
        }
	});
    
    //综合排行
    $('#dish_compre_rank').click(function(){
    	$.ajax({
    		type: "get",
            url: "/rank/compreheRank",
            dataType: "json",
            success: function(data){
            	console.log(data);
            	clearContent("list");
            	if(data[1]!="可以评分"){
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			initStyle(i);
            		}
            	}else{
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			var flag = true;
            			for(var j=0;j<data[2].length;j++){
                			if(data[2][j].Did==data[0][i-1].Did){
                				realStyle(i,data[2][j].Mmark);
                				flag = false;break;
                			}
            			}
            			if(flag)
            				initStyle(i);
            		}
            	}
            	//评分区监听
            	$('.div_2').click(function(){
        			var score = $(this).children('.rate').children('.score').text();
        			var dishid = $(this).children('.rate').children('.score').attr("data-id");
            		if(data[1]=="可以评分"){
                    	console.log(dishid);
                    	var dt = {
                    			score:score,did:dishid
                    	}
                    	$.ajax({
                    		type: "get",
                            url: "/rank/saveMark",
                            data: dt,
                            dataType: "json",
                            success: function(data){
                            	alert(data.text);
                            	window.location.href="/rank";
                            }	
                    	});
            		}else{
                    	alert(data[1]);
                    	window.location.href="/rank";
                    }
                });
            	
            }
    	});   	
    });
    //价格排行
    $('#dish_price_rank').click(function(){
    	$.ajax({
    		type: "get",
            url: "/rank/priceRank",
            dataType: "json",
            success: function(data){
            	clearContent("list");
            	if(data[1]=="未登录"){
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			initStyle(i);
            		}
            	}else{
            		console.log(data);
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			var flag = true;
            			for(var j=0;j<data[1].length;j++){
                			if(data[1][j].Did==data[0][i-1].Did){
                				realStyle(i,data[1][j].Mmark);
                				flag = false;break;
                			}
            			}
            			if(flag)
            				initStyle(i);
            		}
            	}
            	//评分区监听
            	$('.div_2').click(function(){
        			var score = $(this).children('.rate').children('.score').text();
        			var dishid = $(this).children('.rate').children('.score').attr("data-id");
            		if(data[1]!="未登录"){
                    	console.log(dishid);
                    	var dt = {
                    			score:score,did:dishid
                    	}
                    	$.ajax({
                    		type: "get",
                            url: "/rank/saveMark",
                            data: dt,
                            dataType: "json",
                            success: function(data){
                            	alert(data.text);
                            	window.location.href="/rank";
                            }	
                    	});
            		}else{
                    	alert(data[1]+"或管理员,不能评分！");
                    	window.location.href="/rank";
                    }
                });
            }
    	});
    });
    //评分排行
    $('#dish_mark_rank').click(function(){
    	$.ajax({
    		type: "get",
            url: "/rank/markRank",
            dataType: "json",
            success: function(data){
            	clearContent("list");
            	if(data[1]=="未登录"){
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			initStyle(i);
            		}
            	}else{
            		console.log(data);
            		for(var i=1;i<=data[0].length;i++){
            			$('#list').append(setdish(data[0][i-1],i));
            			var flag = true;
            			for(var j=0;j<data[1].length;j++){
                			if(data[1][j].Did==data[0][i-1].Did){
                				realStyle(i,data[1][j].Mmark);
                				flag = false;break;
                			}
            			}
            			if(flag)
            				initStyle(i);
            		}
            	}
            	//评分区监听
            	$('.div_2').click(function(){
        			var score = $(this).children('.rate').children('.score').text();
        			var dishid = $(this).children('.rate').children('.score').attr("data-id");
            		if(data[1]!="未登录"){
                    	console.log(dishid);
                    	var dt = {
                    			score:score,did:dishid
                    	}
                    	$.ajax({
                    		type: "get",
                            url: "/rank/saveMark",
                            data: dt,
                            dataType: "json",
                            success: function(data){
                            	alert(data.text);
                            	window.location.href="/rank";
                            }	
                    	});
            		}else{
                    	alert(data[1]+"或管理员,不能评分！");
                    	window.location.href="/rank";
                    }
                });
            }
    	});
    });
    
    
    
    
})(jQuery);