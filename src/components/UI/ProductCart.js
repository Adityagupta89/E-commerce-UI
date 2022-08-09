import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Grid,Stack} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { cartAction } from "../redux/cartSlice";
import {IconButton} from '@mui/material';
import { borderRadius } from '@mui/system';
export default function ProductCart(props) {
    const dispatch=useDispatch();
    const addProductHandler=()=>{
        dispatch(cartAction.addProduct({product:props.product}));
     }
     const removeProductHandler=()=>{
       dispatch(cartAction.removeProduct({id:props.product._id}))
     }
  return (
    <>
    <hr/>
    <Grid container sx={{ maxWidth: '100%'}}>
        <Stack sx={{width:'100%',flexDirection:'row'}}>
        <Stack sx={{width:'50%',height:'100%'}}>
        <img
          src={"http://localhost:3020/" + props.product.product_image}
          alt="green iguana"
          style={{width:'70%',backgroundSize:'auto',height:'250px'}}
        />
        </Stack>
        <Stack sx={{justifyContent:'space-between'}} >
          <Typography gutterBottom variant="h5" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.product.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Qty : {  props.product.size }
            <IconButton aria-label="share">
              <AddIcon sx={{border:'1px solid black',borderRadius:'1rem',ml:'.5rem'}} onClick={addProductHandler} />            
          </IconButton>
          <IconButton aria-label="share">
            <RemoveIcon sx={{border:'1px solid black', borderRadius:'1rem'}} onClick={removeProductHandler} />
          </IconButton>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Price : {  props.product.price}
          </Typography>
        </Stack>
        </Stack>
        </Grid>
        </>
  );
}
