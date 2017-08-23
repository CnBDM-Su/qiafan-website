package com.qiafan.rank;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.qiafan.admin.AdminInterceptor;
import com.qiafan.user.UserInterceptor;

public class RankController extends Controller {
	
	private static RankService rankService = new RankService();
	
	public void index(){
		if(getSessionAttr("username")!=null){
			setAttr("name", getSessionAttr("username"));
		}
		render("rank.html");
	}
	
	//获取所有菜和菜相关的评分
	public void compreheRank(){
		List<Record> dishs = Db.find("select d.*,c.Cname from dish d,canteen c where d.Cid=c.Cid");
		List<Object> rankdish = new ArrayList<Object>();
		rankdish.add(dishs);
		if(getSessionAttr("username")==null){
			rankdish.add("还没登陆，无法评分！");
		}else if(getSessionAttr("username").equals(Db.findById("admin", "Aid", 1).get("Ausername"))){
			rankdish.add("管理员不能评分！");
		}else{
			String name = getSessionAttr("username");
			rankdish.add("可以评分");
			rankdish.add(rankService.getUserDishMark(name));
		}
		renderJson(rankdish);
	}
	
	//保存用户评分到评分表
	@Before({UserInterceptor.class, AdminInterceptor.class})
	public void saveMark(){	
		String name = getSessionAttr("username");
		Record user = Db.findFirst("select u.Uid as uid from user u where u.Uusername='"+name+"'");
		int did = getParaToInt("did");
		int uid = user.get("uid");
		if(Db.find("select * from mark where Did="+did+" and Uid="+uid).size()!=0){
			Record mark = Db.findFirst("select * from mark where Did="+did+" and Uid="+uid).set("Mmark", getPara("score"));
			Db.update("mark", "Mid", mark);
		}else{
			Record mark = new Record().set("Did", did).set("Uid", uid)
					.set("Mmark", getPara("score"));			
			Db.save("mark", "Mid", mark);
		}
		//更新菜的评分
		List<Record> marks = Db.find("select m.Mmark as mark from mark m where m.Did="+did);
		float C=5,n=marks.size(),m=3;//C平均投票人数，n改菜现有的投票人数，m平均评分
		float marksSum = 0;
		for (Record mr : marks) {
			marksSum += mr.getFloat("mark");
		}
		float dmark = (C*m+marksSum)/(n+C);
		Record dish = Db.findById("dish", "Did",did).set("Dmark", dmark);
		Db.update("dish", "Did", dish);
		//更新食堂的评分
		
		renderJson("{\"text\":\"评分成功\"}");
	}
	
	//获取价格排行菜的数据
	public void priceRank(){
		List<Record> dishs = Db.find("select c.Cname,d.* from canteen c,dish d where c.Cid=d.Cid order by d.Dprice asc");
		List<Object> data = new ArrayList<Object>();
		data.add(dishs);
		if(getSessionAttr("username")!=null){//判断用户是否登录
			String name = getSessionAttr("username");
			if(name.equals("admin"))
				data.add("未登录");
			else
				data.add(rankService.getUserDishMark(name));
		}else{
			data.add("未登录");
		}
		renderJson(data);
	}
	
	//获取评分排行菜的数据
	public void markRank(){
		List<Record> dishs = Db.find("select c.Cname,d.* from canteen c,dish d where c.Cid=d.Cid order by d.Dmark desc");
		List<Object> data = new ArrayList<Object>();
		data.add(dishs);
		if(getSessionAttr("username")!=null){//判断用户是否登录
			String name = getSessionAttr("username");
			if(name.equals("admin"))
				data.add("未登录");
			else
				data.add(rankService.getUserDishMark(name));
		}else{
			data.add("未登录");
		}
		renderJson(data);
	}
	
	
}
