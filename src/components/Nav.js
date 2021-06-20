import React from "react";
import { Badge, Box, FormControl, FormHelperText, MenuItem, Select, useTheme } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Nav = (props) => {
    const theme = useTheme();  
      
return (
   
          <Box className="Nav" container width='100%' p={theme.spacing(0)} display='flex' flexDirection='row' justifyContent='space-between' xs={12} sm={12} md={6} lg={4}> 
    <Box display='flex' flexDirection='row'>

    <FormControl>
    
    <Select 
    displayEmpty
    onChange={props.handleSelectCustomer} 
    value={props.currentCustomer.name}>
    
    {
            props.customersArray.map((el) => {
              return (
              <MenuItem
                key={el.id} 
                value={el.name} 
                >{el.name}</MenuItem>
                );
            })
          }
    </Select>
    <FormHelperText>Select Customer</FormHelperText>
    </FormControl>
          </Box> 
          
          <Box> 
              
        <Badge 
        color="secondary" badgeContent={props.array.length}>
         {props.checkoutTotal > 0 ? `$${props.checkoutTotal}` : ''} <ShoppingCartIcon /> 
         
        </Badge> 
       
    </Box> 
    
    </Box> 
    )
};

export { Nav };