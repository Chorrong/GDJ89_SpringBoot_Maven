//작성자,제목, 내용, 첨부파일3개 고정

import { useRef, useState } from "react"


export default function Add(){
    const username = useRef();
    const title = useRef();
    const contents = useRef();

    const [datas, setDatas]=useState({
        userName:"",
        boardTitle:"",
        boardContents:""
    });

    

    function changeInput(e){
       
        setDatas((prevState)=>({
            ...prevState, //전개
            [e.target.name]:e.target.value
        })
        )
    }

    function add(e){
        let f = new FormData(e.target)
        fetch("http://localhost:81/notices", {
            method:"POST",
            headers:{

            },
            body:f
        }).then(r=>r.json())
        .then(r=>{
            console.log(r)
        })

    }

    function add2(){
        console.log(datas);
        // console.log(username.current.value)
        // console.log(title.current.value)
        // console.log(contents.current.value)

        //1. URLSearchParams
        // let params = new URLSearchParams();
        // params.append("username", username.current.value);
        // params.append("boardTitle", title.current.value);
        // params.append("boardContents", contents.current.value);

        //2. formData 객체 이용
        let d = new FormData();
        d.append("userName", "");
        d.append("attaches", document.getElementById(""))

        // //Server 요청시 CORS(METHOD) 허용 Spring Security 사용

        fetch("http://localhost:81/notices", {
            method:"POST",
            headers:{

            },
            body:d//JSON.stringfy(datas)
        }).then(r=>r.json())
        .then(r=>{
            console.log(r)
        })


    }

    return (
        <>
            <form onSubmit={add}>
            <div>
            <input type="text" name="userName" onChange={changeInput} ref={username} />
            </div>
            <div>
            <input type="text" name="boardTitle" onChange={changeInput} ref={title} />
            </div>
            <div>
            <textarea name="boardContents" id="" onChange={changeInput} ref={contents}></textarea>
            </div>
            <div>
            <input type="file" name="attaches" id="" />
            <input type="file" name="attaches" id="" />
            <input type="file" name="attaches" id="" />
            </div>
            <div>
                <button type="submit" >Write</button>
            </div>
            </form>
        </>

    )
}