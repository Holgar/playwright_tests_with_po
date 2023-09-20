const { BaseSwagLabPage } = require("./BaseSwagLab.page");

export class InventoryPage extends BaseSwagLabPage {
  url = "/inventory.html";

  get inventoryItems() {
    return this.page.locator(".inventory_item");
  }

  get inventoryItemName(){
    return this.page.locator('.inventory_item_name')
  }

  get inventoryItemPrice(){
    return this.page.locator('.inventory_item_price')
  }

  get addItemToCartBtns() {
    return this.page.locator('[id^="add-to-cart"]');
  }

  get selectSortDropdown() {
    return this.page.locator('[data-test="product_sort_container"]')
  }

  get defaultSelect(){
    return this.page.locator('.right_component .active_option')
  }

  get selectProductSort(){
    return this.page.locator('[data-test="product_sort_container"]')
  }

  async addItemToCartById(id) {
    await this.addItemToCartBtns.nth(id).click();
  }

  async clickOnSort(){
    await this.selectSortDropdown.click();
  }

  async getItemInfoById(id,item = this.inventoryItems.nth(id)){
    const name = await item.locator('.inventory_item_name').textContent();
    const desc = await item.locator('.inventory_item_desc').textContent();
    const price = await item.locator('.inventory_item_price').textContent();

    return {
        name,
        desc,
        price,
    };
  }

}