import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderForm =(props) =>{
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [landmark, setLandmark] = useState();
  const [user, setUser] = useState([]);
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const product_id = props.url;
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if (open) {
      fetch(`http://localhost:3020/api/user/${user_id}`)
        .then((res) => res.json())
        .then((res) =>
          setUser((prev) => {
            return res.data?.address_info?.filter((address) => {
              return address.primary;
            });
          })
        )
        .catch((err) => console.log(err));
    }
  }, [open,user_id]);

  const submitHandler = (e) => {
    console.log("Aditya");
    e.preventDefault();
    const data = {
      user_id: user_id,
      product_id: product_id,
      amount: props.price,
      address_info: {
        address1: address1,
        address2: address2,
        city: city,
        landmark: landmark,
        pincode: pincode,
      },
    };
    const createOrder = async () => {
      await fetch("http://localhost:3020/api/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 400) toast(res.msg);
          if (res.status === 201) {
            setTimeout(() => {
              navigate("/");
            }, 3000);
            toast(res.msg);
            setOpen(false);
          }
        })
        .catch((err) => console.log(err));
    };
    createOrder();
  };

  return (
    <div>
      <ToastContainer />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#4c93d8",
          fontSize: props.value ? "0.875rem" : "1.3rem",
        }}
        onClick={handleClickOpen}
      >
        Buy Now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subsc</DialogTitle> */}
        <form onSubmit={submitHandler}>
          <DialogContent>
            <DialogContentText sx={{ mb: "1rem", textAlign: "center" }}>
              Please Enter the details and place the order
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="amount"
              type="number"
              InputLabelProps={{ shrink: true }}
              value={props.price}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="address1"
              label="Address1"
              
              type="text"
              InputLabelProps={{ shrink: true }}
              placeholder={user[0]?.address1}
              onChange={(e) => setAddress1(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="address2"
              placeholder={user[0]?.address2}
              label="Address2"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setAddress2(e.target.value)}
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
              placeholder={user[0]?.landmark}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setLandmark(e.target.value)}
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
              InputLabelProps={{ shrink: true }}
               placeholder={user[0]?.city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="pincode"
              placeholder={user[0]?.pincode}
              onChange={(e) => setPincode(e.target.value)}
              InputLabelProps={{ shrink: true }}
              label="Pincode"
              type="number"
              fullWidth
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Place
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default OrderForm