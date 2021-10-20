const Order = require("./assignment1Order");
//variable declaration
const smallShawarmaPrice    = 5;
const regularShawarmaPrice  = 9;
const largeShawarmaPrice    = 15;
const smallBurritoPrice     = 4;
const regularBurritoPrice   = 6;
const largeBurritoPrice     = 8;
const smallHamBurgerPrice   = 2.50;
const regularHamBurgerPrice = 4;
const largeHamBurgerPrice   = 6;
const fillingCost           = 2;
const sauceCost             = 1;
const drinksCost            = 2;
const tax                   = 0.13;
//object created
const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    ITEM: Symbol("items"),
    SIZE: Symbol("size"),
    SAUCES: Symbol("sauces"),
    FILLINGS: Symbol("fillings"),
    DRINKS: Symbol("drinks"),
    MORE: Symbol("more"),
    INVOICE: Symbol("invoice")
});

module.exports = class foodOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sItem = "";
        this.sSize = "";
        this.sSauces = "";
        this.sFillings = "";
        this.sDrinks = "";
        this.sMore = "";
        this.sInvoice = "";
        this.sMessage = "";
        this.sSubTotal = 0;
        this.sTax = 0;
        this.sTotalCost = 0;
        this.sBool = "true";
    }
    handleInput(sInput){
        //array created
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                //welcome message
                if(this.sBool == "true")
                {
                aReturn.push("Welcome to BKV Fast Food Cafeteria.");
                this.sBool = "false";
                }
                //menu list
                aReturn.push("Our Menu \n 1.Shawarma \n 2.Burrito \n 3.Hamburger.");
                aReturn.push("What  would you like to order ?");
                break;
            case OrderState.SIZE:
                this.sItem = sInput;
                //checking which item ordered
                if(this.sItem.toLowerCase() == "shawarma")
                {
                    this.stateCur = OrderState.FILLINGS;
                }
                else if(this.sItem.toLowerCase() == "burrito")
                {
                    this.stateCur = OrderState.FILLINGS;
                }
                else if(this.sItem.toLowerCase() == "hamburger")
                {
                    this.stateCur = OrderState.SAUCES;
                }
                aReturn.push("what size would you like to order?");
                aReturn.push("small / regular / large");
                break;
            case OrderState.FILLINGS:
                this.sSize = sInput;
                this.stateCur = OrderState.DRINKS;
                this.sSubTotal += fillingCost;
                aReturn.push("what fillings would you like to have?");
                break;
            case OrderState.SAUCES:
                this.sSize = sInput;
                this.stateCur = OrderState.DRINKS;
                this.sSubTotal += sauceCost;
                aReturn.push("what sauces would you like to have?")
                aReturn.push("hot / barbecue / cocktail / tartar")
                break;
            case OrderState.DRINKS:
                this.sFillings = sInput;
                this.stateCur = OrderState.MORE;
                aReturn.push("would you like to order drinks?")
                aReturn.push("please select cola / pepsi / orange juice or press no if you dont want."); 
                break;
            case OrderState.MORE:
                this.stateCur = OrderState.INVOICE;
                this.sDrinks = sInput;
                //output message of ordered items.
                this.sMessage += `${this.sSize} ${this.sFillings} ${this.sItem} `;
                if(this.sDrinks.toLowerCase() != "no")
                {   //with drinks execute here
                    this.sMessage += ` with ${this.sDrinks} .\n\n`;
                    this.sSubTotal += drinksCost;
                }
                else
                {
                    //without drinks execute here
                    this.sMessage += "\n\n";
                }
                if(this.sItem.toLowerCase() == "shawarma")
                {
                    if(this.sSize == "small")
                    {
                    this.sSubTotal += smallShawarmaPrice;
                    }
                    else if(this.sSize == "regular")
                    {
                        this.sSubTotal  += regularShawarmaPrice;
                    }
                    else if(this.sSize == "large")
                    {
                        this.sSubTotal += largeShawarmaPrice;
                    }
                }
                else if(this.sItem.toLowerCase() == "burrito")
                {
                    if(this.sSize == "small")
                    {
                    this.sSubTotal  += smallBurritoPrice;
                    }
                    else if(this.sSize == "regular")
                    {
                        this.sSubTotal  += regularBurritoPrice;
                    }
                    else if(this.sSize == "large")
                    {
                        this.sSubTotal  += largeBurritoPrice;
                    }
                }
                else if(this.sItem.toLowerCase() == "hamburger")
                {
                    if(this.sSize == "small")
                    {
                    this.sSubTotal  += smallHamBurgerPrice;
                    }
                    else if(this.sSize == "regular")
                    {
                        this.sSubTotal  += regularHamBurgerPrice;
                    }
                    else if(this.sSize == "large")
                    {
                        this.sSubTotal  += largeHamBurgerPrice;
                    }
                }
                aReturn.push("would you like to order more?")
                break;
            case OrderState.INVOICE:
                //execute here to order more items
                if(sInput.toLowerCase() == "yes")
                {
                    aReturn.push("please type 'OK' to continue!");
                    this.stateCur = OrderState.WELCOMING;
                }
                else{
                    //after all order execute here for bill payment and pickup time
                    this.isDone(true);
                    aReturn.push("Thank-you for your order of");
                    aReturn.push(this.sMessage);
                    this.sTax = this.sSubTotal * tax;
                    this.sTotalCost = this.sSubTotal + this.sTax;
                    aReturn.push(`Total Cost  :$ ${this.sTotalCost.toFixed(2)}`);
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                 }
                 break;
        }
        return aReturn;
    }
}