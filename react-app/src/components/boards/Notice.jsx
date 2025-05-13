import { useEffect, useState } from "react"

function Notice(){

    //Hook
    //state값이 변하면 Component는 재 렌더링
    //state값은 사라지지 않는다
    // const [변수명, set변수명]=useState(초기값)
    const [list, setList] = useState({pager:"", ar:[]});
    const [page, setPage] = useState(1);


    //useEffect
    //sideHook
    //useEffect(콜백함수,의존성배열)
    useEffect(()=>{
        console.log("useEffect")

        let params = new URLSearchParams();
        params.append('page', page)

        fetch(`http://localhost:81/notice/list?${params}`)
        .then(r=>r.json())
        .then(r=>{
            console.log(r)
            setList(r)
        })
    }, [page])
    


    function pageClick(e){
        console.log(e.target.getAttribute("data-page-num"))
        let p =e.target.getAttribute("data-page-num")
        setPage(p)

    }

    function makeNum(){
        const p = [];
        console.log(list.pager.start)
        console.log(list.pager.start)
        let b = <button onClick={pageClick} data-page-num={list.pager.start-1}>이전</button>
        p.push(b)
        for(let i=list.pager.start;i<=list.pager.end;i++){
            b = <button onClick={pageClick} data-page-num={i}>{i}</button>
            p.push(b)
        }
        b = <button onClick={pageClick} data-page-num={list.pager.end+1}>다음음</button>
        p.push(b)
        console.log(p)
        return p;
    }

    return(
        <>
            <h1>Notice</h1>

            <div>
                <input type="text" /><button>검색</button>
            </div>
           
            {
                list.ar.map(l=>
                    <li key={l.boardNum}>{l.boardTitle}</li>
                
                )

                

            }
            <hr></hr>
            {
                makeNum()
            }
            
            


        </>
    )
}

export default Notice