
export class InventoryItemPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/inventory-item.html';
        this.backToProductsButton = this.page.locator('[data-test="back-to-products"]');
        this.itemName = this.page.locator('.inventory_details_name');
        this.itemPrice = this.page.locator('.inventory_details_price');
        this.itemDescription = this.page.locator('.inventory_details_desc');
    }

    async clickBackToProducts() {
        await this.backToProductsButton.click();
        // ทำไมหน้านี้ไม่ถูกอัพพพพ 5555555
    }
}