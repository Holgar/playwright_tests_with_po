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

  async getItem(id){
    return await this.inventoryItems.nth(id);
  }

  async getItemInfoById(id){
    let item = await this.getItem(id);
    const name = await item.locator('.inventory_item_name').textContent();
    const desc = await item.locator('.inventory_item_desc').textContent();
    const price = await item.locator('.inventory_item_price').textContent();

    return {
        name,
        desc,
        price,
    };
  }

  async addRandomItemsToCart() {
    const itemsNumber = await (this.inventoryItems).count();
    let randomNumber = Math.floor(Math.random() * itemsNumber) + 1;
    console.log(`Adding ${randomNumber} items to the cart.`);
    let addedItems = 0;
    let addedItemsInfo = [];
    while (addedItems < randomNumber){
        let randomIndex = Math.floor(Math.random() * itemsNumber);
        let item = await this.inventoryItems.nth(randomIndex);
        let itemToCartButton = await item.locator('[id^="add-to-cart"]');
        let hasRemoveButton = await item.locator('[id^="remove"]').isVisible();
        if(!hasRemoveButton){
            await itemToCartButton.click();
            console.log(`Item ${randomIndex} added to the cart.`);
            addedItemsInfo.push(await this.getItemInfoById(randomIndex))
            addedItems++;
        };
    }
    return addedItemsInfo
  }

}