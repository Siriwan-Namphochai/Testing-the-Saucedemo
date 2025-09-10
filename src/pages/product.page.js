// src/pages/product.page.js
import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.baseUrl = 'https://www.saucedemo.com/';
        this.url = 'inventory.html';
        this.sortDropdown = this.page.locator('[data-test="product-sort-container"]');
        this.itemNames = this.page.locator('.inventory_item_name');
        this.itemPrices = this.page.locator('.inventory_item_price');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
    }

    async goto() {
        await this.page.goto(this.baseUrl + this.url);
    }

    async sortItems(option) {
        await this.sortDropdown.selectOption(option);
    }

    async getItemNames() {
        return await this.itemNames.allTextContents();
    }

    async getItemPrices() {
        const pricesText = await this.itemPrices.allTextContents();
        return pricesText.map(p => parseFloat(p.replace('$', '')));
    }

    isSortedFromAtoZ(names) {
        const sortedNames = [...names].sort();
        return JSON.stringify(names) === JSON.stringify(sortedNames);
    }

    isSortedFromZtoA(names) {
        const sortedNames = [...names].sort().reverse();
        return JSON.stringify(names) === JSON.stringify(sortedNames);
    }

    isSortedPriceLowToHigh(prices) {
        const sorted = [...prices].sort((a, b) => a - b);
        return JSON.stringify(prices) === JSON.stringify(sorted);
    }

    isSortedPriceHighToLow(prices) {
        const sorted = [...prices].sort((a, b) => b - a);
        return JSON.stringify(prices) === JSON.stringify(sorted);
    }

    async addToCartProduct(itemId) {
        const locator = this.page.locator(`[data-test="add-to-cart-${itemId}"]`);
        await locator.click(); 
    }
    async addToCart(itemId) {
    if (itemId) {
        await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
    } else {
        await this.page.locator('[data-test="add-to-cart"]').click();
    }
}

    async removeFromCart(itemId) {
        const locator = this.page.locator(`[data-test="remove-${itemId}"]`);
        await locator.click();
    }

    async getCartBadge() {
        return this.cartBadge;
    }
}