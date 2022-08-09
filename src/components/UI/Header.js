import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Stack, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import classes from "./Header.module.css";
import { authAction } from "../redux/authSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import {Grid} from '@mui/material';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header(props) {
  const [search, setSearch] = useState("");
  const dispatch=useDispatch()
  const login = useSelector((state) => state.auth.isLogin);
  const navigate=useNavigate();
  const buttonHandle=()=>{
    dispatch(authAction.admin({value:false}))
    dispatch(authAction.logout());
    localStorage.removeItem('token')
    navigate('/login');
  }
  props.search(search);
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
       { login &&(<Stack direction="row">
          <Button color="inherit" ><Link to='/' style={{textDecoration:'none',color:'white'}}>Product</Link></Button>
          <Button color="inherit"> <Link to='api/order/' style={{textDecoration:'none',color:'white'}}>Order</Link></Button>
          <Button color="inherit"> <Link to='api/product/' style={{textDecoration:'none',color:'white'}}>Add</Link></Button>
        </Stack>)}
        { login && (<div className={classes.search}>
          <Search onChange={(e) => setSearch(e.target.value)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Link to='api/profile'>
          <AccountCircleIcon />
          </Link>
          <Link to='api/cart/'>
          <ShoppingCartIcon  />
          </Link>
          <LogoutIcon onClick={buttonHandle} sx={{cursor:'pointer'}}/> 
        </div>)}
      </Toolbar>
    </AppBar>
  );
}
