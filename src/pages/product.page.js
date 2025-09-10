// src/pages/product.page.js
import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.baseUrl = 'https://www.saucedemo.com/';
        this.url = 'inventory.html';
        this.sortDropdown = '[data-test="product-sort-container"]';
        this.itemNames = '.inventory_item_name';
        this.itemPrices = '.inventory_item_price';
    }

    async goto() {
        await this.page.goto(this.baseUrl + this.url);
    }

    async sortItems(option) {
        await this.page.locator(this.sortDropdown).selectOption(option);
    }

    async getItemNames() {
        return await this.page.locator(this.itemNames).allTextContents();
    }

    async getItemPrices() {
        const pricesText = await this.page.locator(this.itemPrices).allTextContents();
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
    
}
