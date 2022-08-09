import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Stack, Box, Container } from "@mui/material";
import ProductCart from "../UI/ProductCart";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import classes from './Cart.module.css'
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { cartAction } from "../redux/cartSlice";
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const products = useSelector((state) => state.cart.product);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [user, setUser] = useState({});
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const empty_Cart = (
    <Typography variant="h2" component="div" sx={{textAlign:'center'}}>
      Product cart is Empty
    </Typography>
  );
  const orderHandler=()=>{
    const createOrder= async (product)=>{
        const data={
            user_id:user_id,
            product_id:product?._id,
            amount:product?.price,
            address_info:{
                address1:"Pan Card Club Road",
                address2:"Shree laxmi pg Baner",
                landmark:'Seedling Pre School',
                city:"Pune",
                pincode:"244001",
            } 
        }
        await fetch("http://localhost:3020/api/order",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                'x-auth-token':token
            }
        }).catch(err=>console.log(err))
    }
    try{
    products.forEach(element => {
        createOrder(element);
    });
    }
    catch(err){toast(err.message)};
    setTimeout(()=>{
        dispatch(cartAction.clearCart())    
        navigate('/')
    },3000)
    toast('Order place')
  
  }
  console.log(products);
  useEffect(() => {
    fetch(`http://localhost:3020/api/user/${user_id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(user);
  return (
    <div className={classes.body}>
        <ToastContainer/>
    <Container sx={{width:'80vw'}}>
        {products.length==0 && empty_Cart}
      {products.length > 0 && (
        <>
    
        <Grid container sx={{mt:'2rem'}}>
          <Grid item sm={8} xs={12}>
          <Typography variant="h3" component="div" sx={{mb:'2rem'}}>
                Shopping Cart
              </Typography>
            {products.map((product) => (
              <ProductCart product={product} />
            ))}
            <hr/>
          </Grid>
          <Grid
            item
            sm={4}
            xs={12}
            sx={{ backgroundColor:'#e7e6e6' ,padding:'2rem'}}
          >
            <Stack sx={{ justifyContent: "space-between", height: "85%" }}>
            <Typography variant="h4" component="div">
                Shipping Address
                <hr/>
              </Typography>
              <Typography variant="h5" component="div">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="h5" component="div">
                {user.address_info?.address1}
              </Typography>
              <Typography variant="h5" component="div">
                {user.address_info?.landmark}
              </Typography>
              <Typography variant="h5" component="div">
                {user.address_info?.city} {user.address_info?.pincode}
                <hr />
              </Typography>

              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box> Total Amount </Box>
                <Box> {totalAmount}</Box>
              </Typography>
              <Button color="primary" variant="contained" onClick={orderHandler}>
                Place Order
              </Button>
            </Stack>
          </Grid>
        </Grid>
        </>
      )}
    </Container>
    </div>
  );
};

export default Cart;
