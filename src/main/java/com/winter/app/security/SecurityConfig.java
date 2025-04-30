package com.winter.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.winter.app.security.jwt.JwtAuthenticationFilter;
import com.winter.app.security.jwt.JwtLoginFilter;
import com.winter.app.security.jwt.JwtTokenManager;
import com.winter.app.user.UserService;
import com.winter.app.user.UserSocialService;

import jakarta.websocket.Session;

@Configuration
@EnableWebSecurity//(debug = true)
public class SecurityConfig {
	
	@Autowired
	private AuthenticationConfiguration authenticationConfiguration;
	@Autowired
	private JwtTokenManager jwtTokenManager;
	
	//정적자원들을 Security에서 제외
	//anyRequest().permitAll() 권장
	
	
	//인증과 권한의 관한 설정
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
					/** CORS 허용, Filter에서 사용 가능*/
					.cors(cors-> cors.disable())
					.csrf(csrf-> csrf.disable())
					
					/** 권한 적용 **/
					.authorizeHttpRequests(authorizeRequest->{
						authorizeRequest
						.requestMatchers("/notice/add", "/notice/update", "/notice/delete").hasRole("ADMIN")
						.requestMatchers("/user/mypage","/user/update", "/user/logout").authenticated()
						.requestMatchers("/manager/**").hasAnyRole("ADMIN", "MANAGER")
						.anyRequest().permitAll()
						;
						
					})
					
					
					/** 
					 * Session 인증 방식이 아닌  
					   Token 기반 인증 방식을 사용 하기 때문에 	
					*  Session을 사용 하지 않음
					*  클라이언트에서 Token값을 서버에 전달 하지 않더라도 로그인 됨
					**/
					.sessionManagement(session ->{
						session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
					})
					
					/** Form 관련 설정**/
					.formLogin(formlogin ->formlogin.disable())
					/**
					 * 쿠키와 세션을 이용하는 방식이 아니라 
					 * Request Header에 ID, PW를 직접 보내는 방식이라 보안에 취약
					 * HTTPBasic방식은 해제
					 */
					.httpBasic(httpBasic -> httpBasic.disable())
				
					.addFilter(new JwtLoginFilter(authenticationConfiguration.getAuthenticationManager(), jwtTokenManager))
					.addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), jwtTokenManager))
					
					
					;
		
		
		return httpSecurity.build();
	}
	
	
	
	
	

}
