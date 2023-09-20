const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");
const { addRandomItemsToCart } = require("../helpers/addRandomItems");
const { getItemsFromCart } = require("../helpers/getItemsFromCart");
const { parsePrice } = require("../helpers/parsePrice");

test.describe("Checkout page", () => {
    test.beforeEach(async ({ loginPage,inventoryPage }) => {
      await loginPage.navigate();
      await loginPage.performLogin("standard_user", "secret_sauce");

    });

    test("Verify checkout flow", async ({ inventoryPage, shopingCartPage, checkoutPage, page}) => {
        const addedItems = await addRandomItemsToCart(inventoryPage);
        const prices = addedItems.map(product => parsePrice(product.price));
        const totalAdded = prices.reduce((sum, price) => sum + price, 0);
        await inventoryPage.shopingCart.click();
        await shopingCartPage.clickOnCheckout();
        await checkoutPage.fillData();
        await checkoutPage.clickOnContinueButton();      
        const cartItems = await getItemsFromCart(checkoutPage);
        expect(addedItems).toEqual(cartItems);
        const addedItemsWithTax = await checkoutPage.taxNumber() + totalAdded;
        const checkoutItemTotal = await checkoutPage.totalPriceNumber();
        expect(addedItemsWithTax).toEqual(checkoutItemTotal)
    })
});