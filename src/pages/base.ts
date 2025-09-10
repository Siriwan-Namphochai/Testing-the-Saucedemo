// src/pages/base.ts

import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';

// สร้าง fixture สำหรับ page objects
export const test = base.extend<{
  loginPage: LoginPage;
  productPage: ProductPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect };