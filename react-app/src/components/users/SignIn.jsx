import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStateContext } from '../../contexts/LoginStateContext';

export default function SignIn(){

    const loginState = useLoginStateContext();

    const username = useRef("")
    const password = useRef("")

    const nav = useNavigate();

    function signInHandle(){
    

        const params = new URLSearchParams();
        params.append("username", username.current.value)
        params.append("password", password.current.value)

        fetch("http://localhost:81/user/login", {
            method:"POST",
            body:params

        })
        .then(r=> {
            if(!r.ok){
                
                //console.log(r.text())
                throw new Error(r.status)
                //return r.json().then(Promise.reject.bind(Promise))
            }

            return r.headers

        }
            
        )
        .then(r=>{
            console.log("success")
            //session 
            window.sessionStorage.setItem("AccessToken", r.get('AccessToken'))

            //local
            window.localStorage.setItem('RefreshToken', r.get('RefreshToken'))

            console.log(loginState.isLogin)
            loginState.setLogin()
            nav("/")
            console.log(loginState.isLogin)
        })
        .catch(e=>{
            if(e=='Error: 521'){
                alert('없는 사용자')
            }
            if(e=='Error: 522'){
                alert('비번 틀림')
            }
           
           
        })
 

    }


    return (
        <>
           

             <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
               <TextField id="standard-basic" label="Standard" variant="standard" inputRef={username} />
            </Box>
             <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
               <TextField id="standard-basic" type='password' label="Standard" variant="standard" inputRef={password} />
            </Box>

            <Button variant="outlined" onClick={signInHandle}>SIGN IN</Button>            
  
        </>
    )
}




