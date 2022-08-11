import React from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import NoteCard from "../UI/NoteCard";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Button} from "@mui/material";
import { Link } from "react-router-dom";
import { positions } from "@mui/system";
import { useSelector } from "react-redux";
import { useMemo } from "react";
const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const admin = useSelector((state) => state.auth.isAdmin);
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  useMemo(() => {
    if (sort === "name") {
      const result = products.sort((a, b) => a.name.localeCompare(b.name));
      setProducts(result);
    }
    if (sort === "price") {
      const result = products.sort((a, b) => +a.price - +b.price);
      setProducts(result);
    }
  }, [sort]);
  useEffect(() => {
    fetch("http://localhost:3020/api/product/", {
      headers: {
        "x-auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNTIxYTdiM2M3YTY4OGQ2YWE2MTQiLCJpc19BZG1pbiI6dHJ1ZSwiaWF0IjoxNjU4NzM3ODk4fQ.PYgHclewRgYHexzZZ6G2qOmnjSRxTDDbVu6yeYbHpJo",
      },
    })
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []);
  return (
    <>
      <Container sx={{ mt: 8 }}>
        <Box
          sx={{
            minWidth: 120,
            display: "flex",
            justifyContent: "flex-end",
            mr: "2rem",
          }}
        >
        {admin &&(<Button variant="outlined" color='primary' sx={{mr:'1rem'}}>   
            <Link
              to="api/product/"
              style={{ textDecoration: "none",  }}
            >
              Add
            </Link>
          </Button>)}
          <FormControl sx={{ minWidth: "12rem" }}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Sort"
              onChange={handleChange}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container>
          {products
            .filter((product) => {
              if (props.searchData == "") return product;
              else if (
                product.name
                  .toLowerCase()
                  .includes(props.searchData.toLowerCase())
              )
                return product;
            })
            .map((product) => (
              <Grid item key={product.id} xs={12} sm={6} lg={4}>
                <NoteCard product={product} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};
export default Home;
