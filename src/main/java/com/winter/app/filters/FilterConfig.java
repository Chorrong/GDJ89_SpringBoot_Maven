package com.winter.app.filters;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.Filter;

//XML
@Configuration
public class FilterConfig implements WebMvcConfigurer {
	
	//1. Filter 객체 생성
	//2. Filter 등록
	//3. 순서 지정
	//4. URL Mapping
	@Bean//<bean></bean>
	FilterRegistrationBean<Filter> filterRegistrationBean(){
		FilterRegistrationBean<Filter> f1 = new FilterRegistrationBean<>();
		f1.setFilter(new TestFilter());
		f1.setOrder(1);
		//f1.addUrlPatterns("/user/login", "/notice/list");
		f1.addUrlPatterns("/notice/*");
		return f1;
	}
	
	@Bean//<bean></bean>
	FilterRegistrationBean<Filter> filterRegistrationBean2(){
		FilterRegistrationBean<Filter> f1 = new FilterRegistrationBean<>();
		f1.setFilter(new NoticeFilter());
		f1.setOrder(2);
		//f1.addUrlPatterns("/user/login", "/notice/list");
		f1.addUrlPatterns("/notice/detail");
		return f1;
	}
	
	

}
