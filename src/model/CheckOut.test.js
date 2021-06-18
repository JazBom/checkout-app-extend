import { CheckOut } from './CheckOut';
import * as database from '../database/index';

describe.only("Scenario tests", () => {
// create new customer
// basic happy path
it("tests scenario one where default customer has no deals", () => {
    //create current customer
    const defaultCustomer = database.getCustomer('Default');
    // create checkout
    const defaultCheckout = new CheckOut(defaultCustomer, database.pricingRules);
    //add products to checkout
    defaultCheckout.addItem(database.getProduct('ClassicAd'));
    defaultCheckout.addItem(database.getProduct('StandOutAd'));
    defaultCheckout.addItem(database.getProduct('PremiumAd'));
    //checkout - total price
    const defaultCheckoutTotal = defaultCheckout.totalPrice();
    //expected items count
    expect(defaultCheckout.items.length).toEqual(3);
    // expected total price
    expect(defaultCheckoutTotal).toEqual(987.97);
});

it("tests scenario two where SecondBite customer has four items and a ThreeForTwo deal on Classic Ads", () => {
    //create current customer
    const secondBiteCustomer = database.getCustomer('SecondBite');
    // create checkout
    const secondBiteCheckout = new CheckOut(secondBiteCustomer, database.pricingRules);
    //add products to checkout
    secondBiteCheckout.addItem(database.getProduct('ClassicAd'));
    secondBiteCheckout.addItem(database.getProduct('ClassicAd'));
    secondBiteCheckout.addItem(database.getProduct('ClassicAd'));
    secondBiteCheckout.addItem(database.getProduct('PremiumAd'));
    //checkout - total price
    const secondBiteCheckoutTotal = secondBiteCheckout.totalPrice();
    //expected items count
    expect(secondBiteCheckout.items.length).toEqual(4);
    // expected total price
    expect(secondBiteCheckoutTotal).toEqual(934.97);
});

it("tests scenario three where Axil customer has four items and discount on StandOut Ads", () => {
    //create current customer
    const axilCustomer = database.getCustomer('Axil');
    // create checkout
    const axilCheckout = new CheckOut(axilCustomer, database.pricingRules);
    //add products to checkout
    axilCheckout.addItem(database.getProduct('StandOutAd'));
    axilCheckout.addItem(database.getProduct('StandOutAd'));
    axilCheckout.addItem(database.getProduct('StandOutAd'));
    axilCheckout.addItem(database.getProduct('PremiumAd'));
    //checkout - total price
    const axilCheckoutTotal = axilCheckout.totalPrice();
    //expected items count
    expect(axilCheckout.items.length).toEqual(4);
    // expected total price
    expect(axilCheckoutTotal).toEqual(1294.96);
});


});