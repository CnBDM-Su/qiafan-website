package com.qiafan.user;

import javax.servlet.http.HttpSession;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

public class UserInterceptor implements Interceptor {

	@Override
	public void intercept(Invocation inv) {
		// TODO Auto-generated method stub
		HttpSession session = inv.getController().getSession();
		//String name = session.getAttribute("username");
		if(session.getAttribute("username")==null){
			inv.getController().redirect("/index");
			return ;
		}
		inv.invoke();
	}

}
