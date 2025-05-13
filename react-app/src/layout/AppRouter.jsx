import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Notice from "../components/boards/Notice";
import Qna from "../components/boards/Qna";

export default function AppRouter(){

    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notice/list" element={<Notice />}></Route>
            <Route path="/qna/list" element={<Qna />}></Route>
        </Routes>


    )
}