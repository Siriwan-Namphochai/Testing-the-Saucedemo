// tests/pages/cart.page.js
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.removeBackpackBtn = page.locator('button[data-test="remove-sauce-labs-backpack"]');
  }

  async goto() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async removeBackpack() {
    await this.removeBackpackBtn.click();
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async checkout() {
    await this.checkoutBtn.click();
  }
}