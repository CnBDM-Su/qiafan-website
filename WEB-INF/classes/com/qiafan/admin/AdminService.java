package com.qiafan.admin;


import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class AdminService {
	
	public List<Record> getCanteenNames(){
		String sql = "select c.Cname as name from canteen c";
		return Db.find(sql);
	}
	
	public List<Record> getAll(String tableName1, String tableName2){
		String sql;
		if(tableName2.equals(""))
			sql = "select * from "+tableName1;
		else
			sql = "select d.*,c.Cname from "+tableName1+" d,"+tableName2+" c where d.Cid = c.Cid";
		return Db.find(sql);
	}
	
	public String saveDish(String name, String cname, String description, String price){
		int cid = Db.findFirst("select * from canteen c where c.Cname='"+cname+"'").getInt("Cid");
		System.out.println(cid);
		if(Db.find("select * from dish d where d.Dname='"+name+"' and d.Cid="+cid).size()!=0){
			return "{\"text\":\"该食堂"+name+"菜已经存在！\"}";
		}		
		Record dish = new Record().set("Dname", name).set("Cid", cid)
				.set("Ddescription", description).set("Dprice", price).set("Dmark", 0);
		Db.save("dish", "Did", dish);
		return "{\"text\":\"添加成功！\"}";
	}
	
	public String saveCanteen(String name, String school, String description){
		if(Db.find("select * from canteen c where c.Cname='"+name+"' and c.Cschool='"+school+"'").size()!=0){
			return "{\"text\":\"食堂已经存在！\"}";
		}		
		Record canteen = new Record().set("Cname", name).set("Cschool", school)
				.set("Cdescription", description).set("Cmark", 0);
		Db.save("canteen", "Cid", canteen);
		return "{\"text\":\"添加成功！\"}";
	}
	
	public String updatePassword(String oldpw, String newpw1, String newpw2){
		
		String sql = "select * from admin";
		Record admin = Db.findFirst(sql);
		String password = admin.get("Apassword");
		String username = admin.get("Ausername");
		System.out.println(password);
		if(!password.equals(oldpw)){
			return "{\"text\":\"原密码错误！\"}";
		}
		if(!newpw1.equals(newpw2)){
			return "{\"text\":\"两次输入密码不一样！\"}";
		}
		admin = Db.findById("admin", "Ausername", username).set("Apassword", newpw1);
		Db.update("admin", "Ausername", admin);
		return "{\"text\":\"修改成功！\"}";
	}
}
