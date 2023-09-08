const { BaseSwagLabPage } = require("./BaseSwagLab.page");

export class InventoryPage extends BaseSwagLabPage {
  url = "/inventory.html";

  get headerTitle() {
    return this.page.locator(".title");
  } 

  get inventoryItems() {
    return this.page.locator(".inventory_item");
  }

  get addItemToCartBtns() {
    return this.page.locator('[id^="add-to-cart"]');
  }

  async addItemToCartById(id) {
    await this.addItemToCartBtns.nth(id).click();
  }
}
