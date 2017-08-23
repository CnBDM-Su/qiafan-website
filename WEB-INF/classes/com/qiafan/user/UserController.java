package com.qiafan.user;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

@Before(UserInterceptor.class)
public class UserController extends Controller {
	
	public void index(){
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		render("user.html");
	}
	
	//修改密码
	public void updataPw(){
		String oldpw = getPara("oldpw");
		String newpw1 = getPara("newpw1");
		String newpw2 = getPara("newpw2");
		String name = getSessionAttr("username");
		if(newpw1.equals("")||newpw2.equals("")){
			renderJson("{\"text\":\"输入不能为空！\"}");
		}else{
			Record user = Db.findFirst("select * from user u where u.Uusername='"+name+"'");
			if(user!=null && oldpw.equals(user.get("Upassword"))){
				if(newpw1.equals(newpw2)){
					user.set("Upassword", newpw1);
					Db.save("user", "Uid", user);
					renderJson("{\"text\":\"修改成功！\"}");
				}else{
					renderJson("{\"text\":\"两次输入密码不一致！\"}");
				}
			}else{
				renderJson("{\"text\":\"原密码错误！\"}");	
			}
		}
	}
}
