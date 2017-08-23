package com.qiafan.index;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class IndexService {
	
	
	
	//注册
	public String saveSign(String name, String pw1, String pw2){
		if(name.equals("")||pw1.equals("")||pw2.equals("")){
			return "{\"text\":\"用户名或密码不能为空！\"}";
		}
		int size = Db.find("select * from user u where u.Uusername='"+name+"'").size(); 
		String adminName = Db.findById("admin", "Aid", 1).get("Ausername");
		if(adminName.equals(name)){
			return "{\"text\":\"改用户名已有，请重新输入！\"}";
		}else if(size!=0){
			return "{\"text\":\"改用户名已有，请重新输入！\"}";
		}else{
			if(pw1.equals(pw2)){
				Record user = new Record().set("Uusername", name).set("Upassword", pw1);
				Db.save("user", "Uid", user);
				return "{\"text\":\"注册成功！\"}";
			}else{
				return "{\"text\":\"两次输入密码不一致！\"}";
			}
		}
	}
	
	//登陆
	public String verificationUser(String name,String pw,HttpSession session){
		if(name.equals("")||pw.equals(""))
			return "{\"text\":\"用户名或密码为空！\"}";
		List<Record> user =Db.find("select * from user u where u.Uusername='"+name+"' and u.Upassword='"+pw+"'");
		Record admin = Db.findFirst("select * from admin a where a.Ausername='"+name+"' and a.Apassword='"+pw+"'");
		if(user.size()!=0||admin!=null){
			session.setAttribute("username", name);
			session.setMaxInactiveInterval(600);
			return "{\"text\":\"登陆成功！\"}";
		}else{
			return "{\"text\":\"用户名或密码错误！\"}";
		}
	}
	
	//个人中心
	public String managerCenter(String name){
		String adminName = Db.findById("admin", "Aid", 1).get("Ausername");
		if(adminName.equals(name)){
			return "/admin";
		}else{
			return "/user";
		}
	}

	
}
