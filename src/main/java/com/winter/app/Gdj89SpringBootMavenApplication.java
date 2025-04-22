package com.winter.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
//@EnableAspectJAutoProxy
//@EnableTransactionManagement
@ServletComponentScan //@WebFilter 스캔
public class Gdj89SpringBootMavenApplication {

	public static void main(String[] args) {
		SpringApplication.run(Gdj89SpringBootMavenApplication.class, args);
	}

}
