// src/tests/product.spec.js
import { test, expect  } from "../pages/base";
import { validUsers } from "../test-data/user";
import { ProductPage } from "../pages/product.page";


test.describe('PRODUCT PAGE FUNCTION', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUsers[0].username, validUsers[0].password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('TC-013: Product should correctly sort items from A to Z', async ({ productPage }) => {
        await productPage.sortItems('az');
        const itemNames = await productPage.getItemNames();
        expect(productPage.isSortedFromAtoZ(itemNames)).toBeTruthy();
    });

    test('TC-014: Product should correctly sort items from Z to A', async ({ productPage }) => {
        // 1. เลือกการเรียงลำดับ "Name (Z to A)"
        await productPage.sortItems('za');
    
        // 2. ดึงชื่อสินค้าทั้งหมด
        const itemNames = await productPage.getItemNames();
    
        // 3. ตรวจสอบว่าชื่อสินค้าถูกเรียงจาก Z-A
        expect(productPage.isSortedFromZtoA(itemNames)).toBeTruthy();
    });

    test('TC-015: Product should correctly sort items from low to high price', async ({ productPage }) => {
        await productPage.sortItems('lohi');
        const prices = await productPage.getItemPrices();
        expect(productPage.isSortedPriceLowToHigh(prices)).toBeTruthy();
    });

    test('TC-016: Product should correctly sort items from high to low price', async ({ productPage }) => {
        await productPage.sortItems('hilo');
        const prices = await productPage.getItemPrices();
        expect(productPage.isSortedPriceHighToLow(prices)).toBeTruthy();
    });
});