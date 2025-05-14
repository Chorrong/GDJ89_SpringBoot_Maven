//디테일 페이지

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"

export default function Detail(){
    //  파라미터   : URL/파라미터값/파라미터값
    //  쿼리스트링 : URL?이름=값&이름=값
    //  state     : <Link to="" state={{키:밸류}}>


    //1. useParam (파라미터 데이터를 가져 올때 사용용)
    //const 변수명 = useParams();
    //const 변수명 = useParams().파라미터명;
    //const num = useParams();

    //console.log("BN : ", useParams().boardNum)

    //2. useSearchParams(쿼리스트링링)
    //const [searchParams, setSearchparms] = useSearchParams()
    //console.log(searchParams.get("boardNum"))

    //3. useLocation
    // hash : 주소의 #문자열 뒤의 값
    // pathname : 현재 주소 경로
    // search : ?를 포함한 쿼리스트링
    // state  : 페이지 이동시 임의로 넣을 수 있는 상태 값
    // key    : location 객체의 고유 값, 페이지가 변경 될 때 마다 고유의 값이 생성성
    const p = useLocation();
    console.log(p.state.boardNum)
    const [num, setNum] = useState(p);
    const [result, setResult] = useState({})

    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:81/notices/${p.state.boardNum}`)
        .then(r=>r.json())
        .then(r=>{
            setResult(r)
        })


    }, [])

    function deleteHandler(){
        fetch(`http://localhost:81/notices/${p.state.boardNum}`, {
            method:"DELETE"
        })
        .then(r=>r.json())
        .then(r=>{
            navigate("/notice/list")
        })
    }
    


    return(
        <>
        <h1>Detail</h1>
        <h3>{result.boardTitle}</h3>
        <h3>{result.boardContents}</h3>

        <Link>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
        </>
    )
}