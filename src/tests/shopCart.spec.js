const { expect } = require("@playwright/test");
const { test } = require("../fixture/fixture");
const { addRandomItemsToCart } = require("../helpers/addRandomItems");
const { getItemsFromCart } = require("../helpers/getItemsFromCart")

test.describe("Check cart page", () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.performLogin("standard_user", "secret_sauce");
    });

    test("Add random items to cart", async ({ inventoryPage, shopingCartPage}) => {
      const addedItems = await addRandomItemsToCart(inventoryPage);
      await inventoryPage.shopingCart.click();
      const cartItems = await getItemsFromCart(shopingCartPage);
      expect(addedItems).toEqual(cartItems)
    })
});