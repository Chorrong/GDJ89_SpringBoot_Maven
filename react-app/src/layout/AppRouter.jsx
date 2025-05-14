import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Notice from "../components/boards/Notice";
import Qna from "../components/boards/Qna";
import Detail from "../components/boards/Detail";
import Add from "../components/boards/Add";
import Update from "../components/boards/Update";

export default function AppRouter(){

    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notice/">
                <Route path="list" element={<Notice />}></Route>
                <Route path="detail" element={<Detail />}></Route>
                <Route path="add" element={<Add />}></Route>
                <Route path="update" element={<Update />}></Route>
            </Route>
            <Route path="/qna/list" element={<Qna />}></Route>
        </Routes>


    )
}