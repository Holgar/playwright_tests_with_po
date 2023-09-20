const { expect } = require("@playwright/test");

export async function getItemsFromCart(page){
    const cartItems = [];
    for (let i = 0; i < await page.cartItems.count(); i++) {
        let item = await page.getItemInfoById(i);
        cartItems.push(item)
    }
    return cartItems;
}