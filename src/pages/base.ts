// src/pages/base.ts

import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';
import { InventoryItemPage } from './inventoryItem.page';
import { CartPage } from './cart.page';
import { CheckoutPage } from './checkout.page';

// สร้าง fixture สำหรับ page objects
export const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
  inventoryItemPage: InventoryItemPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  inventoryItemPage: async ({ page }, use) => {
        await use(new InventoryItemPage(page));
  },
  cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
  },
});

export { expect };