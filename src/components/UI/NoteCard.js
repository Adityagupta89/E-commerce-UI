import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import OrderForm from "./OrderForm";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cartSlice";
import { authAction } from "../redux/authSlice";
import RemoveIcon from '@mui/icons-material/Remove';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const NoteCard = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [image, setImage] = useState();
  const dispatch=useDispatch()
  const addProductHandler=()=>{
     dispatch(cartAction.addProduct({product:props.product}));
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
      <Card sx={{ maxWidth: 500, m: 3, borderStyle: "solid" }}>
       <Link
      to={`/api/product/${props.product._id}`}
      style={{ textDecoration: "none" }} >
        <CardHeader
          avatar={
            <Avatar sx={{ color: "black" }} aria-label="recipe">
              <SendToMobileIcon />
            </Avatar>
          }
         
          title={props.product.name}
          subheader="September 14, 2016"
        />
        </Link>
        <CardMedia
          style={{ marginLeft: "2rem" }}
          component="img"
          height="300"
          className="img"
          image={"http://localhost:3020/" + props.product.product_image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            {props.product.description}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            <strong style={{ fontSize: "1.5rem" }}>Price</strong>{" "}
            {props.product.price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{justifyContent:'space-evenly'}}>
       
          <Button
          sx={{backgroundColor:'#a1a1a1'}}
            variant="contained"    
            onClick={addProductHandler}        
          >
            Add Items
          </Button>
          <IconButton aria-label="share">
              <Link to={`/api/product/edit/${props.product._id}`}>
              <EditIcon />
            </Link>
          </IconButton>
          <OrderForm url={props.product._id}/>
        </CardActions>
      </Card>
    
  );
};

export default NoteCard;
