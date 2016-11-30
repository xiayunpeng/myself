package com.icss.ship;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 获得订单数据
 */
@WebServlet("/GetOrderServlet")
public class GetOrderServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
//		设置编码
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
//		输出流
		PrintWriter out = response.getWriter();
		
//		获得表单数据
		String[] prices= request.getParameterValues("price"); //票价
		String[] names = request.getParameterValues("name"); //乘客姓名
		String[] codes = request.getParameterValues("code"); //证件号码
		String[] mobiles = request.getParameterValues("mobile"); //手机
		
		String ticketCount = request.getParameter("ticket"); //票的数量
		String totalPrice = request.getParameter("totalPrice"); //订单总额
		
		System.out.println(Arrays.toString(names));
		System.out.println(Arrays.toString(prices));
		System.out.println(Arrays.toString(codes));
		System.out.println(Arrays.toString(mobiles));	
		
		System.out.println("票的数量：" + ticketCount);
		System.out.println("订单总额：" + totalPrice);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doGet(request, response);
	}

}