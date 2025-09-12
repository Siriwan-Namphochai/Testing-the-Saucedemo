// src/pages/checkout.page.js

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Elements สำหรับ Checkout Step One
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButtonStepOne = page.locator('[data-test="cancel"]');
    this.errorText = page.locator('[data-test="error"]');

    // Elements สำหรับ Checkout Step Two
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButtonStepTwo = page.locator('[data-test="cancel"]');
    this.itemPrice = page.locator(".inventory_item_price");
    this.subtotalLabel = page.locator(".summary_subtotal_label");
    this.taxLabel = page.locator(".summary_tax_label");
    this.totalLabel = page.locator(".summary_total_label");
  }

  /**
   * กรอกข้อมูลการจัดส่งและกดปุ่ม Continue
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillShippingInfo(firstName, lastName, postalCode) {
    if (firstName) {
      await this.firstNameInput.fill(firstName);
    }
    if (lastName) {
      await this.lastNameInput.fill(lastName);
    }
    if (postalCode) {
      await this.postalCodeInput.fill(postalCode);
    }
    await this.continueButton.click();
  }

  /**
   * กดปุ่ม Finish เพื่อยืนยันการสั่งซื้อ
   */
  async completeCheckout() {
    await this.finishButton.click();
  }
}