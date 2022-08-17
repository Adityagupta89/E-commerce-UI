import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressForm =(props) =>{
  const [open, setOpen] = React.useState(false);
  const [address1,setAddress1]=useState();
  const [address2,setAddress2]=useState();
  const [landmark,setLandmark]=useState();
  const [city,setCity]=useState();
  const [pincode,setPincode]=useState();
  const token=localStorage.getItem('token')
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const data={
         email:props.email,
         address1:address1,
         address2:address2,
         city:city,
         pincode:pincode,
         landmark:landmark
    }
    const updateAddress= async ()=>{
        await fetch("http://localhost:3020/api/user/updateAddress",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                'x-auth-token':token
            }
        }).then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res.status===400)
            toast(res.msg)
            if(res.status===200){
            toast(res.msg)
            setOpen(false);
        }
        }).catch(err=>console.log(err))
    }
    updateAddress();
  }
  
  return (
    <div>
        <ToastContainer/>
      <Button variant="contained" color='primary' sx={{mt:'.7rem',ml:'.4rem'}} onClick={handleClickOpen}>
        Add Address
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subsc</DialogTitle> */}
        <form onSubmit={submitHandler}>
        <DialogContent>
          <DialogContentText sx={{mb:'1rem',textAlign:'center'}}>
            Please Enter the Address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="address1"
            label="Address1"
            type="text"
            onChange={(e)=>setAddress1(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="address2"
            label="Address2"
            onChange={(e)=>setAddress2(e.target.value)}
            type="text"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="landmark"
            label="Landmark"
            type="text"
            onChange={(e)=>setLandmark(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            onChange={(e)=>setCity(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="pincode"
            onChange={(e)=>setPincode(e.target.value)}
            label="Pincode"
            type="number"
            fullWidth
            variant="outlined"
            required
          />

        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='primary'  onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="contained" color='primary'  type='submit'>
        Add Address
      </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddressForm;