package com.qiafan.rank;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class RankService {
	
	//获取跟用户有关的所有菜的评分信息
	public List<Record> getUserDishMark(String name){
		//获取用户id
		int uid = Db.findFirst("select * from user u where u.Uusername='"+name+"'").getInt("Uid");
		//通过用户id获得和该用户-菜有关的所有评分信息
		List<Record> marks = Db.find("select * from mark m where m.Uid="+uid);
		return marks;
	}
	
	
}
