const { BasePage } = require("./Base.page");

export class BaseSwagLabPage extends BasePage {
    
    get headerTitle() {
        return this.page.locator(".title");
      } 

    get mainMenuBtn() {
        return this.page.locator("TBD");
    }

    get shopingCart() {
        return this.page.locator(".shopping_cart_link");
    }

    get shopingCartBadge() {
        return this.page.locator(".shopping_cart_badge");
    }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }

}
