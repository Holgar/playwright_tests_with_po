const { expect } = require("@playwright/test");

export async function getItemsFromCart(shopingCartPage){
    const cartItems = [];
    for (let i = 0; i < await shopingCartPage.cartItems.count(); i++) {
        let item = await shopingCartPage.getItemInfoById(i);
        cartItems.push(item)
    }
    return cartItems;
}