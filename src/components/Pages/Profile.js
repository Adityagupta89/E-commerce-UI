import React from 'react'
import { Box, Container } from '@mui/system'
import {Stack,Grid} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import {TextField} from '@mui/material';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {Button} from '@mui/material';
import { useState } from 'react';
import {Chip} from '@mui/material';
import {Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate=useNavigate();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [mob, setMob] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState();
    const [date, setDate] = useState("");
    const [user,setUser]=useState('');
    const user_id=localStorage.getItem('user_id')
    useEffect(() => {
        fetch(`http://localhost:3020/api/user/${user_id}`)
          .then((res) => res.json())
          .then((res) => setUser(res.data))
          .catch(err=>console.log(err));
      }, []);
      const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            first_name:firstname?firstname:user?.first_name,
            last_name:lastname?lastname:user?.last_name,
            password:password?password:user?.password.Box,
            mobile_no:mob?mob:user?.mobile_no,
            address_info:{
                address1:address1?address1:user?.address_info?.address1,
                address2:address2?address2:user?.address_info?.address2,
                city:city?city:user?.address_info?.city,
                landmark:landmark?landmark:user?.address_info?.landmark,
                pincode:pincode?pincode:user?.address_info?.pincode
            },
            dob:date?date:user?.dob,
        }
        axios.put(`http://localhost:3020/api/user/${user_id}`, data)
        .then((res) => {
          if (res.status === 400) toast(res.data.msg);
          if (res.status === 404) toast(res.data.msg);
          if (res.status === 200) {
            setTimeout(() => {
              navigate("/");
            }, 6000);
            toast(res.data.msg);
    
          }
        }).catch((err) => toast(err.response.data.msg));
      }
      
  return (
    <>
        <ToastContainer/>
    <Box sx={{height:'20vh',backgroundColor:'#b3c2b3'}}>
        <Stack spacing={2} sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center',height:'100%',width:'100vw'}}>
        <Typography variant="h5" component="div" sx={{width:'55%'}}>
        <PersonIcon/> {`${user?.first_name} ${user?.last_name}`}
        </Typography>
      
        <Typography variant="h5" component="div" sx={{width:'55%'}}>
        <EmailIcon/> {`${user?.email}`}
        </Typography>
      
       </Stack>
    </Box>
    <Container sx={{marginTop:'5rem'}}>
    <Grid spacing={2} container sx={{justifyContent:'center'}}>
       <Stack  sx={{width:'60%'}}>
        <form onSubmit={handleSubmit} > 
            <Grid sx={{ mb: 2,display:'flex',alignItems:'center',justifyContent:'space-between' }} >
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                First Name
              </Typography>
              <TextField
                id="outlined-basic1"
                //   sx={{ mt: "1rem" }}
                placeholder={`${user?.first_name}`}
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                
              />
            </Grid>
            <Grid sx={{ mb: 2 ,display:'flex',alignItems:'center',justifyContent:'space-between'}} >
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                last Name
              </Typography>
              <TextField
                id="outlined-basic2"
                //   sx={{ mt: "1rem" }}
                
                placeholder={`${user?.last_name}`}
                onChange={(e) => setLastName(e.target.value)}
                variant="outlined"
                fullWidth
               
              />
            </Grid>
          
     
          <Grid sx={{ mb: 2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Password
              </Typography>
            <TextField
              id="outlined-basic4"
              //   sx={{ mt: "1rem" }} 
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              
              type="password"
              fullWidth
            />
          </Grid>
          <Grid sx={{ mb: 2 ,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Mobile Number
              </Typography>
            <TextField
              id="outlined-basic5"
              //   sx={{ mt: "1rem" }}
              
              placeholder={`${user?.mobile_no}`}
              onChange={(e) => setMob(e.target.value)}
              variant="outlined"
              disabled
              type="number"
              fullWidth
            />
            
          </Grid>
           <Divider>
            <Chip label="Address"/>
           </Divider>
            <Grid sx={{ mb: 2,mt:2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Address 1
              </Typography>
              <TextField
                id="outlined-basic6"
                //   sx={{ mt: "1rem" }}
                
                placeholder={`${user?.address_info?.address1}`}
                onChange={(e) => setAddress1(e.target.value)}
                variant="outlined"
                fullWidth
                
              />
            </Grid>
            <Grid sx={{ mb: 2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Address 2
              </Typography>
              <TextField
                id="outlined-basic7"
                //   sx={{ mt: "1rem" }}
                
                onChange={(e) => setAddress2(e.target.value)}
                placeholder={`${user?.address_info?.address2}`}
                variant="outlined"
                fullWidth
                
              />
            </Grid>
          
          
            <Grid sx={{ mb: 2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Landmark
              </Typography>
              <TextField
                id="outlined-basic8"
                //   sx={{ mt: "1rem" }}
                
                placeholder={`${user?.address_info?.landmark}`}
                onChange={(e) => setLandmark(e.target.value)}
                variant="outlined"
                
                fullWidth
              />
            </Grid>

            <Grid sx={{ mb: 2 ,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                City
              </Typography>
              <TextField
                id="outlined-basic9"
                //   sx={{ mt: "1rem" }}
                
                placeholder={`${user?.address_info?.city}`}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                fullWidth
                
              />
            </Grid>
            <Grid sx={{ mb: 2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                Pincode
              </Typography>
              <TextField
                id="outlined-basic10"
                //   sx={{ mt: "1rem" }}
               
                placeholder={`${user?.address_info?.pincode}`}
                onChange={(e) => setPincode(e.target.value)}
                type="number"
                variant="outlined"
                fullWidth
            
              />
            </Grid>
        <Divider/>
          <Grid sx={{ mb: 2,mt:2,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <Typography variant="subtitle1" component="div" sx={{width:'20%',textAlign:'center',mr:'2rem'}}>
                DOB
          </Typography>
          
            <TextField
              id="outlined-basic11"
              //   sx={{ mt: "1rem" }}
              placeholder="DOB"
              variant="outlined"
              onChange={(e) => setDate(e.target.value)}
              
              type="date"
              fullWidth
            />
          </Grid>
          <Button
            type="Submit"
            color="primary"
            sx={{ mt: ".5rem" }}
            variant="contained"
            fullWidth
          >
            Update
          </Button>
        </form>
        </Stack>
    </Grid>
 
    </Container>
    </>
  )
}

export default Profile