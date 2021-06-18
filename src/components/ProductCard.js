import React from "react";
import { Badge, Box, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, useTheme, makeStyles } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveIcon from "@material-ui/icons/Remove";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: 'rgba(247,244,243,0.75)',
      width: 300,
      height: 450,
    },
    cardContent: {
      height: 80,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', 
    },
  }));

// still have to button/function invokation to add product to shopping cart
const ProductCard = (props) => {

    const classes = useStyles();  
    const theme = useTheme();    
      
return (
  <Box p={theme.spacing(1)} xs={12} sm={12} md={6} lg={4}>
<Card key={props.el.id} classes={classes}>
      <CardHeader
        title={props.el.name}
        subheader={`$${props.el.price}`}
      />
      <CardMedia
        className={classes.media}
        image={props.el.imageUrl}
        title={props.el.imageName}
      />
      <CardContent className={classes.cardContent}>
          <Typography>{props.el.description}</Typography>
         
      </CardContent>
       <CardActions>
           
        {/* if expanded could have an overall submit button for each card total item & price instead of repeatedly hitting same button to add*/}
        <IconButton type="submit" onClick={() => 
          props.handleAddProduct(props.el)
        }
        >
          <AddCircleOutlineIcon />
        </IconButton> 
            <Typography>{props.counter}</Typography>
        <IconButton type="submit" onClick={() => 
          props.handleRemoveProduct(props.el)
        }
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        
       </CardActions>
    </Card>

  </Box>
  
    )
};

export { ProductCard };