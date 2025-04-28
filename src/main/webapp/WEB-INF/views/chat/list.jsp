<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<c:import url="/WEB-INF/views/templates/header.jsp"></c:import>
</head>
<body id="page-top">
	<div id="wrapper">
		<c:import url="/WEB-INF/views/templates/sidebar.jsp"></c:import>
	
		<div id="content-wrapper" class="d-flex flex-column">
			<div id="content">
				<c:import url="/WEB-INF/views/templates/topbar.jsp"></c:import>
				<div class="container-fluid">
					
					<h1>Chat List</h1>
							<div class="table-responsive">
								<table class="table table-bordered" id="dataTable" width="100%"
									cellspacing="0">
									<tbody>
										<c:forEach items="${list}" var="vo">
											<tr>
												<td>${vo.username}</td>
												<td>${vo.name}</td>
												<td>
													<div class="dropdown-list-image mr-3">
														<img width="30" height="30" class="rounded-circle" src="/files/user/${vo.fileName}"
															alt="...">
														<div class="status-indicator bg-warning"></div>
													</div>
												</td>
												<td>
													<div style="width:15px; height:15px">
														<span class="btn ${vo.status?'btn-primary':'btn-danger'} btn-circle"></span>
													</div>
												</td>
												
											</tr>
										</c:forEach>

									</tbody>
								</table>
							</div>					
					
					
					
					
				</div>
			</div>
			<!-- End Content -->
			<c:import url="/WEB-INF/views/templates/foot.jsp"></c:import>
		</div>
		<!-- End Content-wrapper -->	
	</div>
	<!-- End wrapper -->

	
	<c:import url="/WEB-INF/views/templates/footer.jsp"></c:import>
<!-- 	<script type="text/javascript">
		const websocket = new WebSocket("/ws/chat")
		const send = document.getElementById("send")
		const message = document.getElementById("message")

		
		
		//webSocket 연결이 되었을 때
		websocket.onopen=()=>{
			websocket.send("님이 입장했습니다")
		}
		
		//websocket으로 메세지를 수신 했을 때
		websocket.onmessage=(m)=>{
			//

			console.log(m)
		}

		//webSocket연결이 종료 되었을 때
		websocket.onclose=()=>{
			websocket.send("님이 나갔습니다다")
		}
		
		//개발자가 메세시 송신 할 때
		send.addEventListener("click", ()=>{
			let m = message.value
			websocket.send(m)

		})

		//websocke error 발생시
		// websocket.onerror=()=>{

		// }

		websocket.onerror=webSocketError;

		function webSocketError(){

		}
		
		



		
		
		
		
	
	</script> -->
	
	
</body>
</html>