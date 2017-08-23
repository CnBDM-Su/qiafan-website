package com.qiafan.admin;

import java.util.ArrayList;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

@Before(AdminInterceptor.class)
public class AdminController extends Controller {
	
	private static AdminService adminService = new AdminService();
	
	public void index(){
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		setAttr("canteenNum", Db.find("select count(*) as num from canteen"));
		setAttr("dishNum", Db.find("select count(*) as num from dish"));
		setAttr("canteenNames", adminService.getCanteenNames());
		setAttr("dishs",adminService.getAll("dish", "canteen"));
		render("admin.html");
	}
	
	//添加食堂
	public void saveCanteen(){
		System.out.println("saveCanteen");
		//获取url传来的值
		String Cname = getPara("name");
		String Cschool = getPara("school");
		String Cdescription = getPara("description");	
		System.out.println(Cname + " " + Cschool + " " + Cdescription);
		//返回结果
		if(Cname.equals("")||Cschool.equals(""))
			renderJson("{\"text\":\"名称和学校不能为空！\"}");
		else
			renderJson(adminService.saveCanteen(Cname, Cschool, Cdescription));
	}
	
	//删除食堂
	public void deleteCanteen(){
		System.out.println("deleteCanteen");
		String id = getPara("id");
		Db.deleteById("canteen", "Cid", id);
		//返回现在有的所有食堂信息
		ArrayList<Object> str = new ArrayList<Object>();
		str.add(id);
		str.add(adminService.getCanteenNames());
		str.add(Db.find("select count(*) as num from canteen"));
		renderJson(str);
	}
	
	//修改食堂
	public void updateCanteen(){
		if(getPara("id").equals("")||getPara("name").equals("")||getPara("school").equals(""))
			renderJson("{\"text\":\"修改失败！名称和学校不能为空\"}");
		else{
			Record canteen = Db.findById("canteen", "Cid", getPara("id")).set("Cname", getPara("name"))
					.set("Cschool", getPara("school")).set("Cdescription", getPara("description"));
			Db.update("canteen", "Cid", canteen);
			renderJson("{\"text\":\"修改成功！\"}");
		}
	}
	
	//添加菜品
	public void saveDish(){
		System.out.println("savedish");
		String Dname = getPara("name");
		String Cname = getPara("cantName");
		String Ddescription = getPara("description");
		String Dprice = getPara("price");
		System.out.println(Dname+" "+Cname+" "+Ddescription+" "+Dprice);
		//返回结果
		if(Dname.equals("")||Dprice.equals(""))
			renderJson("{\"text\":\"名称和价格不能为空！\"}");
		else
			renderJson(adminService.saveDish(Dname, Cname, Ddescription, Dprice));
	}
	
	//删除菜品
	public void deleteDish(){
		System.out.println("deleteDish");
		String id = getPara("id");
		Db.deleteById("dish", "Did", id);
		//返回现在有的所有食堂信息
		ArrayList<Object> str = new ArrayList<Object>();
		str.add(id);
		str.add(Db.find("select count(*) as num from dish"));
		renderJson(str);
	}
	
	//修改菜品
	public void updateDish(){
		if(getPara("id").equals("")||getPara("name").equals("")||getPara("price").equals(""))
			renderJson("{\"text\":\"修改失败！名称和价格不能为空\"}");
		else{
			//String sql = "select * from canteen c where c.Cname='"+getPara("canteen")+"'";
			Record canteen = Db.findFirst("select * from canteen c where c.Cname='"+getPara("canteen")+"'");
			//System.out.println(Db.find(sql));
			
			Record dish = Db.findById("dish", "Did", getPara("id")).set("Dname", getPara("name"))
					.set("Cid", canteen.get("Cid")).set("Ddescription", getPara("description"))
					.set("Dprice", getPara("price"));
			Db.update("dish", "Did", dish);
			renderJson("{\"text\":\"修改成功！\"}");
		}
	}
	
	//修改管理员密码
	public void updatePassword(){
		System.out.println("update");
		//获取url传来的值
		String oldpw = getPara("oldpass");
		String newpw1 = getPara("newpass1");
		String newpw2 = getPara("newpass2");	
		System.out.println(oldpw + " " + newpw1 + " " + newpw2);
		//返回结果
		renderJson(adminService.updatePassword(oldpw, newpw1, newpw2));
		
	}

	//获取所有食堂信息
	public void Canteens(){
		renderJson(adminService.getAll("canteen",""));
	}
	
	//获取当前食堂信息
	public void Canteen(){
		renderJson(Db.findById("canteen", "Cid", getPara("id")));
	}
	
	//获取所有菜品信息
	public void Dishs(){
		renderJson(adminService.getAll("dish","canteen"));
	}
	
	//获取当前菜品信息
	public void Dish(){
		System.out.println(getPara("id"));
		Record dish = Db.findById("dish", "Did", getPara("id"));
		String Cname = Db.findById("canteen", "Cid", dish.get("Cid")).get("Cname");
		ArrayList<Object> str = new ArrayList<Object>();
		str.add(Cname);
		str.add(dish);
		renderJson(str);
	}
	
	
}
