import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Notice from "../components/boards/Notice";
import Qna from "../components/boards/Qna";
import Detail from "../components/boards/Detail";
import Add from "../components/boards/Add";
import Update from "../components/boards/Update";
import List from "../components/boards/List";
import SignUp from "../components/users/SignUp";
import SignIn from "../components/users/SignIn";

export default function AppRouter(){

    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/notice/">
                <Route path="list" element={<List />}></Route>
                <Route path="detail" element={<Detail />}></Route>
                <Route path="add" element={<Add />}></Route>
                <Route path="update" element={<Update />}></Route>
            </Route>

            <Route path="/user/">
                <Route path="signup" element={<SignUp />}></Route>
                <Route path="signin" element={<SignIn />}></Route>
            </Route>

            <Route path="/qna/list" element={<Qna />}></Route>
        </Routes>


    )
}