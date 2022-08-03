import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect,useState } from 'react';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import { Link } from 'react-router-dom';
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
const NoteCard = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const [image,setImage]=useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Link to={`/api/product/${props.product._id}`} style={{textDecoration:'none'}}>
    <Card sx={{ maxWidth: 500,m:3,borderStyle:'solid' }}>
      <CardHeader
        avatar={
          <Avatar sx={{color:'black' }} aria-label="recipe">
            <SendToMobileIcon/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.product.name}
        subheader="September 14, 2016"
      />
      <CardMedia 
         style={{marginLeft:'2rem'}}
        component="img"
        height="300"
        className='img'
        image={'http://localhost:3020/'+props.product.product_image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {props.product.description}
        </Typography>
        <Typography variant="h5" color="text.secondary">
         <strong style={{fontSize:'1.5rem'}}>Price</strong>   {props.product.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
       
      </CardActions>
    </Card>
    </Link>
  );

}

export default NoteCard