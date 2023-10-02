const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");
const { addRandomItemsToCart, getItemsFromCart} = require("../helpers/helpers");

test.describe("Check cart page", () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.performLogin("standard_user", "secret_sauce");
    });

    test("Add random items to cart", async ({ inventoryPage, shopingCartPage}) => {
      const addedItems = await inventoryPage.addRandomItemsToCart();
      await inventoryPage.shopingCart.click();
      const cartItems = await shopingCartPage.getItemsFromCart();
      expect(addedItems).toEqual(cartItems)
    })
});