package com.winter.app.security;

import java.security.Key;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenManager {
	
	@Value("${jwt.accessToken.validTime}")
	private long accessTokenValidTime;
	
	@Value("${jwt.issuer}")
	private String issuer;
	
	@Value("${jwt.secretKey}")
	private String jwtSecretKey;
	
	private Key key;
	//1. Token 생성
	@PostConstruct
	public void init() {
		String sec = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());
		key = Keys.hmacShaKeyFor(sec.getBytes());
	}
	
	public String createToken(Authentication authentication) {
		
		return Jwts.builder()
				.setSubject(authentication.getName())   //유저의 ID
				.claim("role", authentication.getAuthorities())
				.setIssuedAt(Calendar.getInstance().getTime())
				.setExpiration(new Date(System.currentTimeMillis()+accessTokenValidTime))
				.setIssuer(issuer)
				.signWith(key)
				.compact();
	}

}
