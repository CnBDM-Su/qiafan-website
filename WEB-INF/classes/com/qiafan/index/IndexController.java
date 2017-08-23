package com.qiafan.index;


import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class IndexController extends Controller {
	
	private static IndexService indexService = new IndexService();
	
	public void index(){
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		render("index.html");
	}
	
	//食堂介绍
	public void introduction(){
		Record canteen = Db.findById("canteen", "Cid", getParaToInt(0));
		String paths = canteen.get("Cpic_path");
		String[] path = paths.split("&");
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		setAttr("canteen", canteen);
		setAttr("canteen_pic", path[0]);
		setAttr("canteen_text", path[1]);
		render("intro.html");
	}
	
	
	//关于我们
	public void about(){
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		render("about.html");
	}
	
	//注册
	public void signUp(){
		String result = indexService.saveSign(getPara("username"), getPara("password1"), getPara("password2"));
		renderJson(result);
	}
	//登陆
	public void logIn(){
		String result = indexService.verificationUser(getPara("name"), getPara("pw"), getSession());
		renderJson(result);
	}
	//退出 
	public void logOut(){
		if(getSessionAttr("username")!=null){
			removeAttr("username");//注销session中的对象
			getSession().invalidate();//关闭session
		}else{
			getSession().invalidate();//关闭session
		}
		redirect("/index");;
	}

	//个人中心（是管理员就进入后台管理，是用户就进入用户管理）
	public void managerCenter(){
		if(getSessionAttr("username")!=null){
			String name = getSessionAttr("username");
			setAttr("name", name);
			redirect(indexService.managerCenter(name));
		}else{
			redirect("/index");
		}
	}
}
