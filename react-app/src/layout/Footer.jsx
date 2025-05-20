import SockJS from "sockjs-client";
import { setHeaders } from "../commons/UserManger";

export default function Footer(){
    getSocket();


    function getSocket(){
        console.log("socket 연결 시도")
        const socket = new SockJS("/ws/chat", {
            Headers: setHeaders()
        })//WebSocket("/ws/chat") //SockJS("http://localhost:81/ws/chat")
        
        socket.onopen=function(){
            console.log("socket 연결 성공")
        }

        socket.onmessage=function(e){
            console.log("메세지 수신")
            console.log(e.data)
        }

        socket.onclose=function(){
            console.log("socket 연결 해제")
        }

        socket.onerror=function(){
            console.log('socket error')
        }

    }

    return (
        <>
            <hr></hr>
            <h1>Footer Page</h1>
        </>

    )
}