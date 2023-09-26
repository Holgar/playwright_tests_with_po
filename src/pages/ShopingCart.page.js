const { InventoryPage } = require("./Inventory.page");

export class ShopingCartPage extends InventoryPage {
  url = "/cart.html";

  cartItemSelector = ".cart_item";
  removeItemSelector = '[id^="remove"]';
  checkoutSelector = '[id^="checkout"]'

  get headerTitle() {
    return this.page.locator(".title");
  }

  get cartItems() {
    return this.page.locator(this.cartItemSelector);
  }

  get checkoutButton() {
    return this.page.locator(this.checkoutSelector);
  }

  // async below added to show the function returns a promise
  async getCartItemByName(name) {
    return this.page.locator(this.cartItemSelector, { hasText: name });
  }

  async removeCartItemByName(name) {
    const item = await this.getCartItemByName(name);
    return item.locator(this.removeItemSelector);
  }

  async removeCartItemById(id) {
    await this.cartItems.nth(id).locator(this.removeItemSelector).click();
  }

  async getItemInfoById(id){
    const item = this.cartItems.nth(id);
    return super.getItemInfoById(id, item)
  }

  async clickOnCheckout() {
    await this.checkoutButton.click();
  }
  
  async getItemsFromCart(){
    const cartItems = [];
    for (let i = 0; i < await this.cartItems.count(); i++) {
        let item = await this.getItemInfoById(i);
        cartItems.push(item)
    }
    return cartItems;
} 

}
