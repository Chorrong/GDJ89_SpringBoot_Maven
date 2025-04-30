package com.winter.app.security.jwt;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenManager {
	
	@Value("${jwt.accessToken.ValidTime}")
	private long accessTokenValidTime;
	
	@Value("${jwt.issuer}")
	private String jwtIssuer;
	
	@Value("${jwt.secretKey}")
	private String jwtSecretKey;
	
	private SecretKey key;
	
	@PostConstruct //생성자도 사용 가능
	public void init() {
		String s = Base64.getEncoder().encodeToString(jwtSecretKey.getBytes());
		this.key= Keys.hmacShaKeyFor(s.getBytes());
	}
	
	
	/** Token 생성 **/
	public String createToken(Authentication authentication) {
		return Jwts
					.builder()
					.setSubject(authentication.getName())//사용자의 username
					//개발자가 추가 정보를 넣고 싶을 때 사용 claim
					.claim("roles", authentication.getAuthorities())
					.setIssuedAt(new Date(System.currentTimeMillis()))//token발급 시간
					.setExpiration(new Date(System.currentTimeMillis()+accessTokenValidTime))
					.setIssuer(jwtIssuer) //token 발급자
					.signWith(key)
					.compact();
		
		
	}

}
