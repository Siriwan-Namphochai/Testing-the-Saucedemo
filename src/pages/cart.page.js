// src/pages/cart.page.js

export class CartPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/cart.html';
        this.continueShopping = this.page.locator('[data-test="continue-shopping"]'); // Corrected locator
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.cartItem = (itemName) => this.page.locator(`text=${itemName}`);
        this.cartItems = this.page.locator('.cart_item');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickContinueShopping() {
        await this.continueShopping.click();
    }
    
    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async getNumberOfItemsInCart() {
        return await this.cartItems.count();
    }

    async isItemInCart(itemName) {
        return await this.cartItem(itemName).isVisible();
    }

    async getItemPrice(itemName) {
        return await this.page.locator(`:has(div:has-text("${itemName}")) .inventory_item_price`).textContent();
    }

    async removeItem(itemName) {
        await this.page.locator(`[data-test="remove-sauce-labs-${itemName.toLowerCase().replace(/ /g, '-')}"]`).click();
    }
}