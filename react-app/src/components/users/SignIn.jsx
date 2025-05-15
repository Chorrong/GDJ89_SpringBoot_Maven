import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';

export default function SignIn(){
    const username = useRef("")
    const password = useRef("")

    function signInHandle(){
    

        const params = new URLSearchParams();
        params.append("username", username.current.value)
        params.append("password", password.current.value)

        fetch("http://localhost:81/user/login", {
            method:"POST",
            body:params

        }).then(r=>r.json())
        .then(r=>{
            console.log(r)
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
               <TextField id="standard-basic" label="Standard" variant="standard" inputRef={password} />
            </Box>

            <Button variant="outlined" onClick={signInHandle}>SIGN IN</Button>            
  
        </>
    )
}




