import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function(){
    const loc = useLocation()
    const [result, setResult]=useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:81/notices/${loc.state.boardNum}`)
        .then(r=>r.json())
        .then(r=>{
            setResult(r);
            console.log(r);
        })

    }, [])

    function update(e){
        e.preventDefault();
        let f = new FormData(e.target)

        fetch(`http://localhost:81/notices`, {
            method:"PATCH",
            body:f
        }).then(r=>r.json())
        .then(r=>{
            navigate("/notice/detail", {state: {boardNum:loc.state.boardNum}})
        });

    }


    return(
        <>
            <form onSubmit={update} >
            <input type="hidden" name="boardNum" defaultValue={result.boardNum} />    
            <div>
            <input type="text" name="userName" defaultValue={result.userName} />
            </div>
            <div>
            <input type="text" name="boardTitle" defaultValue={result.boardTitle}  />
            </div>
            <div>
            <textarea name="boardContents" id="" defaultValue={result.boardContents} ></textarea>
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