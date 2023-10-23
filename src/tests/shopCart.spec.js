const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");

test.describe("Check cart page", () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.performLogin("standard_user", "secret_sauce");
    });

    test.only("Add random items to cart", async ({ inventoryPage, shopingCartPage}) => {
      const addedItems = await inventoryPage.addRandomItemsToCart();
      await inventoryPage.shopingCart.click();
      const cartItems = await shopingCartPage.getItemsFromCart();
      expect(addedItems).toEqual(cartItems)
    })
});