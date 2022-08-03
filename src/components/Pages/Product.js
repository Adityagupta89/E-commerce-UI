import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";
const Product = () => {
  const param = useParams();
  const [product, setProduct] = useState({});
  const image = "http://localhost:3020/" + product.product_image;

  useEffect(() => {
    fetch(`http://localhost:3020/api/product/${param.id}`, {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNTIxYTdiM2M3YTY4OGQ2YWE2MTQiLCJpc19BZG1pbiI6dHJ1ZSwiaWF0IjoxNjU4NzM3ODk4fQ.PYgHclewRgYHexzZZ6G2qOmnjSRxTDDbVu6yeYbHpJo",
      },
    })
      .then((res) => res.json())
      .then((res) => setProduct(res));
  }, []);
  console.log(product);
  return (
    <>
      <Grid container sx={{mt:4}}>
        <Grid item xs={12} sm={6}>
          <Box>
            <img
              src={image}
              
              style={{ width: "80%", height: "70vh", backgroundSize: "cover" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              height: "50%",
            }}
          >
            <Typography
              variant="h3"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {product.description}
            </Typography>
            <Typography variant="h4" color="text.secondary" sx={{textAlign:"center"}}>
              <strong style={{ fontSize: "1.5rem" }}> Price</strong>
              {product.price}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
