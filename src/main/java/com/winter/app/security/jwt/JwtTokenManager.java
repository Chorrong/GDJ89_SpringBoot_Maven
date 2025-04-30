package com.winter.app.security.jwt;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.winter.app.user.UserDAO;
import com.winter.app.user.UserService;
import com.winter.app.user.UserVO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenManager {
	
	@Value("${jwt.accessToken.ValidTime}")
	private long accessTokenValidTime;
	
	@Value("${jwt.issuer}")
	private String jwtIssuer;
	
	@Value("${jwt.secretKey}")
	private String jwtSecretKey;
	
	private SecretKey key;
	
	@Autowired
	private UserService userService;
	
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
	
	/** Token 유효성 검증   **/
	public Claims tokenValidation(String token)throws Exception{
		
	return Jwts.parser()
			.setSigningKey(this.key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	
	//SecurityException || MalformedException || SignatureException 
	//: Invalid Jwt Signature -> 유효하지 않는 JWT 서명
	//ExpiredJwtException  -> 유효 기간이 만료된 Token
	//UnsupportedJwtException -> 지원되지 않는 Token
	//IllegalArgumentException -> Jwt claim is Empty, 잘못된 토큰
	
			
	
		//{sub=user2, roles=[{authority=ROLE_MANAGER}, {authority=ROLE_MEMBER}], iat=1745994012, exp=1745994072, iss=winter}
	
		//Authentication 객체 생성
		 //Authentication authentication = new UsernamePasswordAuthenticationToken(userVO, null);
		
		
	}
	
	public Authentication getAuthentication(String username) {
		UserDetails userDetails = userService.loadUserByUsername(username);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
		
		return authentication;
	}

}






