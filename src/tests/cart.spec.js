// tests/cart.spec.js
import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page.js';
import { LoginPage } from '../pages/login.page.js';
import { validUsers } from '../test-data/user.js';

test.describe.only('CART PAGE FUNCTION', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsers[0].username, validUsers[0].password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');   

    // Add item
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');

    // Go to cart page
    const cartPage = new CartPage(page);
    await cartPage.goto();
  });

  // TC-018 View Items
  test('TC-018: Should show all items that were added to cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  });

  // TC-019 Remove Item
  test('TC-019: Should remove an item from the cart', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeBackpack();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
  });

  // TC-020 Continue Shopping
  test('TC-020: Should navigate back to the product page', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory.html/);
  });

  // TC-021 Checkout
  test('TC-021: Should navigate to the checkout page', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one.html/);
  });

  // TC-022 Empty Cart
  test('TC-022: Should show empty cart when there are no items', async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.removeBackpack();
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });
});
