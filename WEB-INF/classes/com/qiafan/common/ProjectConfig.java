package com.qiafan.common;


import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.druid.DruidPlugin;
import com.jfinal.template.Engine;
import com.qiafan.admin.AdminController;
import com.qiafan.index.IndexController;
import com.qiafan.rank.RankController;
import com.qiafan.user.UserController;

public class ProjectConfig extends JFinalConfig{

	/**
	 * 配置常量
	 */
	@Override
	public void configConstant(Constants me) {
		// TODO Auto-generated method stub
		me.setDevMode(true);
		PropKit.use("config.properties");
	}

	/**
	 * 配置路由
	 */
	@Override
	public void configRoute(Routes me) {
		// TODO Auto-generated method stub
		me.add("/admin", AdminController.class, "/html");
		me.add("/", IndexController.class, "/html");
		me.add("/user", UserController.class, "/html");
		me.add("/rank", RankController.class, "/html");
	}

	/**
	 * 配置模型文件路径
	 */
	@Override
	public void configEngine(Engine me) {
		// TODO Auto-generated method stub
		//me.addSharedFunction("/html/common/foot.html");
	}
	
	/**
	 * 配置插件
	 */
	@Override
	public void configPlugin(Plugins me) {
		// TODO Auto-generated method stub
		// 配置C3p0数据库连接池插件
		DruidPlugin dp = new DruidPlugin(PropKit.get("jdbcUrl"),
				PropKit.get("user"), PropKit.get("password").trim());
		me.add(dp);
		ActiveRecordPlugin arp = new ActiveRecordPlugin(dp);
		arp.setShowSql(true);
		//arp.addMapping("project", "p_id", Project.class);
		//arp.addMapping("admin", "username", Admin.class);
		me.add(arp);
	}

	/**
	 * 配置全局拦截器
	 */
	@Override
	public void configInterceptor(Interceptors me) {
		// TODO Auto-generated method stub
		
	}
	
	/**
	 * 配置处理器
	 */
	@Override
	public void configHandler(Handlers me) {
		// TODO Auto-generated method stub
		me.add(new ContextPathHandler("basePath"));
	}
	
}
