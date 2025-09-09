// src/pages/product.page.js

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

    /**
     * เลือกตัวเลือกการเรียงลำดับสินค้าจาก dropdown
     * @param {string} option ตัวเลือก เช่น 'az', 'za'
     */
    async sortItems(option) {
    await this.page.locator(this.sortDropdown).selectOption(option);
    }

    /**
     * ดึงชื่อสินค้าทั้งหมดจากหน้าเว็บ
     * @returns {Promise<string[]>}
     */
    async getItemNames() {
        const names = await this.page.locator(this.itemNames).allTextContents();
        return names;
    }

    /**
     * ตรวจสอบว่ารายการสินค้าถูกเรียงจาก A-Z อย่างถูกต้อง
     * @param {string[]} names ชื่อสินค้าที่ดึงมา
     * @returns {boolean}
     */
    isSortedFromAtoZ(names) {
        const sortedNames = [...names].sort();
        return JSON.stringify(names) === JSON.stringify(sortedNames);
    }
    
    /**
     * ตรวจสอบว่ารายการสินค้าถูกเรียงจาก Z-A อย่างถูกต้อง
     * @param {string[]} names ชื่อสินค้าที่ดึงมา
     * @returns {boolean}
     */
    isSortedFromZtoA(names) {
        const sortedNames = [...names].sort().reverse();
        return JSON.stringify(names) === JSON.stringify(sortedNames);
    }
    async getItemPrices() {
    const pricesText = await this.page.locator(this.itemPrices).allTextContents();
    // แปลงจาก $29.99 → 29.99 (float)
    return pricesText.map(p => parseFloat(p.replace('$', '')));
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

