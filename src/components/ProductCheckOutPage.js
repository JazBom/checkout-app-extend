import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, useTheme } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import * as database from '../database/index';
import { CheckOut } from "../model/CheckOut";
import { ProductCard } from "./ProductCard";
import { Nav } from "./Nav";

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
    const [joraTotal, setJoraTotal] = useState(0);

    
    useEffect(() => {
        setCardsArray(database.products);
        setCustomersArray(database.customers);
        setCurrentCustomer(database.getCustomer('Default'));
    }, []);
    
    const customerDealsMessage = () => {
        if(currentCustomer.name === 'SecondBite'){
            return ('3 for 2 Classic Ads!')
        } else if(currentCustomer.name === 'Axil'){
            return ('StandOut Ads $299.99!')
        } else if(currentCustomer.name === 'MYER'){
            return ('5 for 4 StandOut Ads, and Premium Ads $389.99!')
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
            setJoraTotal(productCheckout.freeJoraSubscriptions(items));
            console.log(joraTotal);
        } else {
            setCheckoutTotal(0); 
        };
        
    }
      
return (
        <Box className="selectProducts" container width='98%' p={theme.spacing(0.25)} justifyContent='center' xs={12} sm={12} md={6} lg={4} >
        <Nav handleSelectCustomer={handleSelectCustomer} currentCustomer={currentCustomer} customersArray={customersArray} customerDealsMessage={customerDealsMessage} array={items} checkoutTotal={checkoutTotal} joraTotal={joraTotal}/>
        
        <h1>Select your ads and checkout</h1>
        
        <Box>
        <Button variant="outlined" color="secondary" size="small" onClick={() => 
          handleCheckout()
        }
        >
         Sub-total 
        </Button>
        <Button variant="outlined" color="primary" size="small" 
        // onClick={
        //   //navigate to checkout page
        // }
        >
         Checkout 
        </Button>
        </Box>
        
        <Box display='flex' width='100%' my={theme.spacing(0.1)} p={theme.spacing(0)} justifyContent='center' xs={12} sm={12} md={6} lg={4} >
        {currentCustomer.name === 'Default' ? (
            <Alert 
            alignContent='center'
            severity="info" 
            color="error">
                <p><strong>Sub-total:</strong> {checkoutTotal > 0 ? `$${checkoutTotal}` : ''} </p>
            <p>Free Jora subscription for each 10th item: {joraTotal > 0 ? `${joraTotal}` : '0'}</p>
            
        </Alert>
        ) : (
            <Box>
            <Alert 
                alignContent='center'
                severity="info" 
                color="error">
                    
                <strong>{customerDealsMessage()} </strong>
                <p><strong>Sub-total:</strong> {checkoutTotal > 0 ? `$${checkoutTotal}` : ''} </p>
                <p>Free Jora subscription for each 10th item: {joraTotal > 0 ? `${joraTotal}` : '0'}</p>
            </Alert>
            
        </Box>)
            }
          </Box>

        <Box className="productCards" container display='flex' flexDirection='row' flexWrap='wrap' justifyContent='center' xs={12} sm={12} md={12} lg={12}>
        
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