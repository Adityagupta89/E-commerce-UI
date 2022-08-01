import React from 'react'
import { Grid,Paper,Avatar } from '@mui/material'
import TextField from '@mui/material/TextField';
import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const paperStyling={width:'20vw',margin: '10rem auto',padding:'20px'}
const Login = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleSubmit=(event)=>{
        event.preventDefault();
       const data={
          email:username,
          password:password
       }
       const login= async ()=>{
       await fetch("http://localhost:3020/api/auth",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.status===400)
            toast(res.msg)
            if(res.status===200)
            navigate('/');
        })

    }
    login();
    
    }
  return (
    <>
    <ToastContainer/>
    <Grid >
        <Paper elevation={20} style={paperStyling}>
            <Grid align="center">
            <Avatar style={{backgroundColor:"green"}}><LockOpenOutlinedIcon/></Avatar>
            <h2>Signin</h2>
            </Grid>
            <form onSubmit={handleSubmit}>
            <Grid>
            <TextField  id="standard-basic1"sx={{mt:'1rem'}} label="Username" onChange={(e)=>setUsername(e.target.value)} placeholder='Username' variant="standard" required fullWidth/>
            <TextField id="standard-basic2" sx={{mt:'1.5rem'}} label="Password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} type="password" variant="standard" required fullWidth/>
            <Button type="Sumbit" color="primary" sx={{mt:'2rem'}} variant='contained' fullWidth>Sign in</Button>
            </Grid>
            </form>
            <Typography sx={{mt:'2rem'}}>
                Create a new account ? <Link to="/signup">Sign up</Link>
            </Typography>
        </Paper>


    </Grid>
    </>
  )
}

export default Login