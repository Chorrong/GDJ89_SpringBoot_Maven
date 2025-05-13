import { Link } from "react-router-dom";

export default function Header(){

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/notice/list">Notice</Link>
            <Link to="/qna/list">Qna</Link>
        </>

    )
}