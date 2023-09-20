const { ShopingCartPage } = require("./ShopingCart.page");
const { createRandomUser }  = require("../helpers/fakeData");
const { parsePrice } = require("../helpers/parsePrice");


export class CheckoutPage extends ShopingCartPage {
  url = "checkout-step-one.html";

  get firstName() {
    return this.page.locator('[id="first-name"]');
  }

  get lastName() {
    return this.page.locator('[id="last-name"]');
  }

  get postalCode() {
    return this.page.locator('[id="postal-code"]');
  }
  get continueButton() {
    return this.page.locator('[id="continue"]');
  }

  get tax() {
    return this.page.locator('.summary_tax_label')
  }

  get totalPrice() {
    return this.page.locator('.summary_total_label')
  }

  async fillData() {
    const user = createRandomUser();
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.postalCode.fill(user.postalCode);
  }
  
  async clickOnContinueButton(){
    return this.continueButton.click()
  }

  async taxNumber(){
    return parsePrice(await this.tax.textContent())
  }

  async totalPriceNumber(){
    return parsePrice(await this.totalPrice.textContent())
  }

  
}
