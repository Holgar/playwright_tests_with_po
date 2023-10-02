const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");
const { addRandomItemsToCart, getItemsFromCart, parsePrice } = require("../helpers/helpers");

test.describe("Checkout page", () => {

    let addedItems, prices, totalAdded;

    test.beforeEach(async ({ loginPage,inventoryPage,shopingCartPage }) => {
      await loginPage.navigate();
      await loginPage.performLogin("standard_user", "secret_sauce");
      addedItems = await inventoryPage.addRandomItemsToCart();
      prices = addedItems.map(product => parsePrice(product.price));
      totalAdded = prices.reduce((sum, price) => sum + price, 0);
      await inventoryPage.shopingCart.click();
      await shopingCartPage.clickOnCheckout();

    });

    test("Verify checkout flow", async ({checkoutPage}) => {
        await checkoutPage.fillUserData();
        await checkoutPage.clickOnContinueButton();      
        const cartItems = await checkoutPage.getItemsFromCart();
        expect(addedItems).toEqual(cartItems);
        const addedItemsWithTax = await checkoutPage.getTaxValue() + totalAdded;
        const checkoutItemTotal = await checkoutPage.getTotalPriceValue();
        expect(addedItemsWithTax).toEqual(checkoutItemTotal)
    })
});