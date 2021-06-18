class CheckOut {
    constructor(currentCustomer, pricingRules){
        this.currentCustomer = currentCustomer;
        this.pricingRules = pricingRules;
        this.items = [];
    }

    // function to add items
    addItem(item) {
        this.items.push(item);
    }
    //function to calculate total price adjusting price for each item in this.items, using this.currentCustomer, this.items and this.pricingRules
    totalPrice() {
        for(let i = 0; i < this.pricingRules.length; i++){
            this.items = this.pricingRules[i].runRule(this.currentCustomer, this.pricingRules[i].customers, this.pricingRules[i].type, this.items);
        }
        let total = 0;
        for(let i = 0; i < this.items.length; i++){
            total += this.items[i].price;
        }
        return total;
    }
};

export { CheckOut };




