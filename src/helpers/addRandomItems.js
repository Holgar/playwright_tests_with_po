const { expect } = require("@playwright/test");

export async function addRandomItemsToCart(inventoryPage) {
    const itemsNumber = await (inventoryPage.inventoryItems).count();
    let randomNumber = Math.floor(Math.random() * itemsNumber) + 1;
    console.log(`Adding ${randomNumber} items to the cart.`);
    let addedItems = 0;
    let addedItemsInfo = [];
    while (addedItems < randomNumber){
        let randomIndex = Math.floor(Math.random() * itemsNumber);
        let item = await inventoryPage.inventoryItems.nth(randomIndex);
        let itemToCartButton = await item.locator('[id^="add-to-cart"]');
        let hasRemoveButton = await item.locator('[id^="remove"]').isVisible();
        if(!hasRemoveButton){
            await itemToCartButton.click();
            console.log(`Item ${randomIndex} added to the cart.`);
            addedItemsInfo.push(await inventoryPage.getItemInfoById(randomIndex))
            addedItems++;
        };
    }
    expect(await inventoryPage.getNumberOfItemsInCart()).toBe(`${randomNumber}`);
    return addedItemsInfo
}