import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Badge, Box, Button, useTheme } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as database from '../database/index';
import { CheckOut } from "../model/CheckOut";
import { ProductCard } from "./ProductCard";

// insert card action re counter and add to shopping cart
const ProductCheckOutPage = () => {

    const theme = useTheme();    
    const history = useHistory();
    const [cardsArray, setCardsArray] = useState([]);
    const [customersArray, setCustomersArray] = useState([]);
    const [currentCustomer, setCurrentCustomer] = useState({});
    const [standardCounter, setStandardCounter] = useState(0);
    const [standOutCounter, setStandOutCounter] = useState(0);
    const [premiumCounter, setPremiumCounter] = useState(0);
    const [items, setItems] = useState([]);
    const [checkoutTotal, setCheckoutTotal] = useState(0);
    
    useEffect(() => {
        setCardsArray(database.products);
        setCustomersArray(database.customers);
        setCurrentCustomer(database.getCustomer('Default'));
    }, []);
    
    const customerDealsMessage = () => {
        if(currentCustomer.name === 'SecondBite'){
            return ('Special Deal: 3 for 2 Classic Ads!')
        } else if(currentCustomer.name === 'Axil'){
            return ('Special Deal: StandOut Ads $299.99!')
        } else if(currentCustomer.name === 'MYER'){
            return ('Special Deal: 5 for 4 StandOut Ads, and Premium Ads $389.99!')
        } else {
            return ('')
        } 
    }
    const handleSelectCustomer = (e) => {
        setCurrentCustomer(database.getCustomer(e.target.value));
        // need to add fresh/reset of page to clear other customer related UI
    }
    // add logic to establish counter name according to the specific card being rendered
    const counterValueLogic = (product) => {
        let counterValue = 0;
        if (product.name === 'ClassicAd'){
            counterValue = standardCounter;
        } else if (product.name === 'StandOutAd'){
            counterValue = standOutCounter;
        } else if (product.name === 'PremiumAd'){
            counterValue = premiumCounter;
        } else {
            console.log('error, product not found')
        }  
        return counterValue;
    }

    const handleAddProduct = (product) => {
        // create new item array and add each item to array shopping cart
        const newItems = [...items, database.getProduct(product.name)];
        setItems(newItems);
        if (product.name === 'ClassicAd'){
            const newCount = standardCounter + 1;
            setStandardCounter(newCount);
        } else if (product.name === 'StandOutAd'){
            const newCount = standOutCounter + 1;
            setStandOutCounter(newCount);
        } else if (product.name === 'PremiumAd'){
            const newCount = premiumCounter + 1;
            setPremiumCounter(newCount);
        } else {
            setStandardCounter(0);
            setStandOutCounter(0);
            setPremiumCounter(0);
        }  
    }

    const handleRemoveProduct = (product) => {
        // create new item array and remove from shopping cart
        const productName = product.name;
        const itemToBeRemoved = database.getProduct(productName);
        console.log(itemToBeRemoved);

        let removeAdsArray = [...items].filter((el) => el.name === productName);
        console.log(removeAdsArray);
        const otherAdsArray = [...items].filter((el) => el.name !== productName);
        console.log(otherAdsArray);

        if(removeAdsArray.length > 0){
            removeAdsArray.splice(0,1);
            if (productName === 'ClassicAd'){
                const newCount = standardCounter - 1;
                setStandardCounter(newCount);
            } else if (productName === 'StandOutAd'){
                const newCount = standOutCounter - 1;
                setStandOutCounter(newCount);
            } else if (productName === 'PremiumAd'){
                const newCount = premiumCounter - 1;
                setPremiumCounter(newCount);
            } else {
                setStandardCounter(standardCounter);
                setStandOutCounter(standOutCounter);
                setPremiumCounter(premiumCounter);
            }  
            const joinedArray = [...removeAdsArray, ...otherAdsArray];
            setItems(joinedArray); 
            return items;    
        }          
    }

    const handleCheckout = () => {
        // calculate the total price for the customer
        if(items.length > 0){
            const productCheckout = new CheckOut(currentCustomer, database.pricingRules);
            // add products to checkout
            for(let i = 0; i < items.length; i++){
                productCheckout.addItem(items[i]);
            }
            setCheckoutTotal(productCheckout.totalPrice().toFixed(2));  
        }
    }
      
return (
        <Box className="selectProducts" container width='91.5%'p={theme.spacing(1)} xs={12} sm={12} md={6} lg={4} >
        <h1>Select your ads and checkout</h1>
        {/* if expanded I'd put the shopping cart in nav, and navigate to new page for itemised list - and make running total display before hitting checkout as well*/}
        <Badge 
        color="secondary" badgeContent={items.length}>
         {checkoutTotal > 0 ? `$${checkoutTotal}` : ''} <ShoppingCartIcon /> 
        </Badge> 
        <Box>
        <Button variant="outlined" color="secondary" size="small" onClick={() => 
          handleCheckout()
        }
        >
         Checkout 
        </Button>
        </Box>
        
        <Box>
        <h3>Select customer</h3>
            <select onChange={handleSelectCustomer} value={currentCustomer.name}>{
            customersArray.map((el) => {
              return (
              <option
                key={el.id} 
                value={el.name} 
                >{el.name}</option>
                );
            })
          }</select>
          <h4 style={{ color: 'red' }}>{customerDealsMessage()}</h4>
          </Box>
        <Box className="productCards" container display='flex' flexDirection='row' flexWrap='wrap' xs={12} sm={12} md={12} lg={12}>
        
        {
            cardsArray.map((el) => {
              return (

              <ProductCard 
                // add a value for running total? e.g. value={items}
                el={el} 
                handleAddProduct={handleAddProduct}
                handleRemoveProduct={handleRemoveProduct}
                // logic to display counter value according to el name
                counter={counterValueLogic(el)}
                />
                );
            })
          } 
   </Box>
    </Box> 
    )
};

export { ProductCheckOutPage };