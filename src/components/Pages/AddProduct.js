import React from "react";
import classes from "./AddProduct.module.css";
import { Typography, Grid, Box, Stack, TextField, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { height } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const AddProduct = (props) => {
  const [product, setProduct] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [weight, setWeight] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [file, setFile] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem('token')
  useEffect(() => {
    if(props.page==='edit'){
    fetch(`http://localhost:3020/api/product/${param.id}`, {
      headers: {
        "x-auth-token":
          token
      },
    })
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }
  }, [props.page]);

  const handleSumbit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (file) data.append("productImage", file);
    if (name) data.append("name", name);
    if (price) data.append("price", price);
    if (weight) data.append("weight", weight);
    if (description) data.append("description", description);
    if (category) data.append("category", category);
    if (quantity) data.append("quantity", quantity);
    
    const createProduct = async () => {
      
      await axios
        .post("http://localhost:3020/api/product", data,{
          headers:{
            'x-auth-token':token
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 400) toast(res.data.msg);
          if(res.status===401) toast(res.data.msg)
          if(res.status===403) toast(res.data.msg)
          if (res.status === 201) {
            setTimeout(() => {
              navigate("/");
            }, 6000);
            toast(res.data.msg);
          }
        })
        .catch((err) => toast(err.response.data.msg));
    };
    const productUpdate = async () => {
      axios
        .put(`http://localhost:3020/api/product/edit/${param.id}`, data,{
          headers:{
            'x-auth-token':token
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 400) toast(res.data.msg);
          if (res.status === 401) toast(res.data.msg);
          if(res.status===403) toast(res.data.msg)
          if (res.status === 200) {
            setTimeout(() => {
              navigate("/");
            }, 6000);
            toast(res.data.msg);
            console.log(res);
          }
        }).catch((err) => toast(err.response.data.msg));

    };
    if (props.page === "add") createProduct();
    else productUpdate();
  };
  return (
    <>
      <ToastContainer />
      <Typography variant="h3" sx={{ textAlign: "center", mt: "1rem" }}>
        {props.page === "add" ? "Add new Product" : "Edit new Product"}{" "}
      </Typography>
      <Stack sx={{ ml: "3rem" }}>
        <Typography variant="h5">
          {props.page === "add" ? "Add new properties" : "Edit new properties"}{" "}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: ".5rem", color: grey[700] }}>
          properties let you define extra product data,such as weight or
          quantity.
        </Typography>
        <Stack sx={{ justifyContent: "space-evenly", height: "95vh" }}>
          <form onSubmit={handleSumbit} enctype="multipart/form-data">
            <Grid>
              <Typography variant="h5">Name</Typography>
              <TextField
                id="outlined-basic"
                sx={{ width: "50%" }}
                placeholder={props.page == "edit" ? product?.name : name}
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
                required={props.page=='add'}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                Name for Product Name
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Price</Typography>
              <TextField
                id="outlined-basic"
                type="number"
                placeholder={props.page === "edit" ? product?.price : price}
                sx={{ width: "50%" }}
                variant="outlined"
                required={props.page=='add'}
                onChange={(event) => setPrice(event.target.value)}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                price for Product{" "}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">weight</Typography>
              <TextField
                id="outlined-basic"
                type="number"
                placeholder={props.page === "edit" ? product?.weight : weight}
                sx={{ width: "50%" }}
                variant="outlined"
                required={props.page=='add'}
                onChange={(event) => setWeight(event.target.value)}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                Weight for Product Item
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Description</Typography>
              <TextField
                id="outlined-basic"
                sx={{ width: "50%" }}
                placeholder={
                  props.page === "edit" ? product?.description : description
                }
                variant="outlined"
                required={props.page=='add'}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                Description for Product Item
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Category</Typography>
              <TextField
                id="outlined-basic"
                sx={{ width: "50%" }}
                placeholder={
                  props.page === "edit" ? product?.category : category
                }
                required={props.page=='add'}
                variant="outlined"
                onChange={(event) => setCategory(event.target.value)}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                Category for Product Item
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Quantity</Typography>
              <TextField
                id="outlined-basic"
                sx={{ width: "50%" }}
                placeholder={
                  props.page === "edit" ? product?.quantity : quantity
                }
                variant="outlined"
                required={props.page=='add'}
                onChange={(event) => setQuantity(event.target.value)}
              />
              <Typography variant="subtitle1" sx={{ color: grey[700] }}>
                Quantity for Product Item
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h5">Image upload</Typography>
              <input
                type="file"
                style={{ marginTop: ".5rem" }}
                onChange={(event) => setFile(event.target.files[0])}
                required={props.page=='add'}
              />
              <Typography
                variant="subtitle1"
                sx={{ mt: ".5rem", color: grey[700] }}
              >
                Upload for Product Image
              </Typography>
            </Grid>
            <Button
              type="Submit"
              color="primary"
              sx={{ mt: ".5rem", width: "50%" }}
              variant="contained"
            >
              {props.page === "add" ? "Create Product" : "Edit Product"}
            </Button>
          </form>
        </Stack>
      </Stack>
    </>
  );
};

export default AddProduct;
