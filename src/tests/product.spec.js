// src/tests/product.spec.js
import { test, expect } from "../pages/base";
import { validUsers } from "../test-data/user";


test.describe('PRODUCT PAGE FUNCTION', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUsers[0].username, validUsers[0].password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        
    });

    test('TC-007: Product should correctly sort items from A to Z', async ({ productPage }) => {
        await productPage.sortItems('az');
        const itemNames = await productPage.getItemNames();
        expect(productPage.isSortedFromAtoZ(itemNames)).toBeTruthy();
    });

    test('TC-008: Product should correctly sort items from Z to A', async ({ productPage }) => {
        await productPage.sortItems('za');
        const itemNames = await productPage.getItemNames();
        expect(productPage.isSortedFromZtoA(itemNames)).toBeTruthy();
    });

    test('TC-009: Product should correctly sort items from low to high price', async ({ productPage }) => {
        await productPage.sortItems('lohi');
        const prices = await productPage.getItemPrices();
        expect(productPage.isSortedPriceLowToHigh(prices)).toBeTruthy();
    });

    test('TC-010: Product should correctly sort items from high to low price', async ({ productPage }) => {
        await productPage.sortItems('hilo');
        const prices = await productPage.getItemPrices();
        expect(productPage.isSortedPriceHighToLow(prices)).toBeTruthy();
    });
});


test.describe('ADD TO CART FUNCTION', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUsers[0].username, validUsers[0].password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('TC-011: Add Sauce Labs Backpack to cart', async ({ productPage }) => {
        await productPage.addToCartProduct('sauce-labs-backpack');
        await expect(await productPage.getCartBadge()).toHaveText('1');
    });

    test('TC-012: Add multiple items to cart', async ({ productPage }) => {
        await productPage.addToCartProduct('sauce-labs-backpack');
        await expect(await productPage.getCartBadge()).toHaveText('1');

        await productPage.addToCartProduct('sauce-labs-bike-light');
        await expect(await productPage.getCartBadge()).toHaveText('2');

        await productPage.addToCartProduct('sauce-labs-bolt-t-shirt');
        await expect(await productPage.getCartBadge()).toHaveText('3');
    });

    test('TC-013: Remove item from cart', async ({ productPage }) => {
        await productPage.addToCartProduct('sauce-labs-backpack');
        await productPage.addToCartProduct('sauce-labs-bike-light');
        await expect(await productPage.getCartBadge()).toHaveText('2');

        await productPage.removeFromCart('sauce-labs-backpack');
        await expect(await productPage.getCartBadge()).toHaveText('1');
    });
});

test.describe('NAVIGATE TO PRODUCT DETAILS', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUsers[0].username, validUsers[0].password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('TC-014: Navigate to product details by clicking item name', async ({ productPage, page }) => {
        await productPage.page.locator('text=Sauce Labs Backpack').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    });

    test('TC-015: Navigate to product details by clicking item image', async ({ productPage, page }) => {
        await productPage.page.locator('#item_4_img_link').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    });

});

test.describe('ADD/REMOVE FROM PRODUCT DETAILS PAGE', () => {
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.goto();
        await loginPage.login(validUsers[0].username, validUsers[0].password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
    test('TC-016: Adding an item to the cart from the product details page', async ({ productPage, page }) => {
        await productPage.page.locator('text=Sauce Labs Backpack').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
        await productPage.addToCart();
        await expect(await productPage.getCartBadge()).toHaveText('1');

    });
    test('TC-017: Remove an item from the cart on the product details page', async ({ productPage, page }) => {
        await productPage.page.locator('text=Sauce Labs Backpack').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
        await productPage.addToCart();
        await expect(await productPage.getCartBadge()).toHaveText('1');

        await page.locator('button:has-text("Remove")').click();
        await expect(await productPage.getCartBadge()).not.toBeVisible();

    });
});