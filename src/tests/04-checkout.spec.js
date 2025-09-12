// Checkout.spec.js
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page.js";
import { CheckoutPage } from "../pages/checkout.page.js"
import { ProductPage } from "../pages/product.page.js"

const user = {
  firstName: "John",
  lastName: "Doe",
  postalCode: "12345",
};

test.describe("Sauce Demo Checkout E2E Tests", () => {
  let loginPage;
  let productPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);

    // 1. ล็อกอินเข้าสู่ระบบ
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect(loginPage.dashboard).toBeVisible();

    // 2. เพิ่มสินค้าลงในตะกร้าโดยใช้ ProductPage
    await productPage.addToCartProduct("sauce-labs-backpack");
    await expect(productPage.cartBadge).toHaveText("1");

    // 3. ไปที่หน้า Checkout Step One
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  // --- Tests สำหรับ Checkout Step One ---

  test.describe("Checkout Step One", () => {
    test("TC-023:   should display all input fields and buttons", async () => {
      await expect(checkoutPage.firstNameInput).toBeVisible();
      await expect(checkoutPage.lastNameInput).toBeVisible();
      await expect(checkoutPage.postalCodeInput).toBeVisible();
      await expect(checkoutPage.continueButton).toBeVisible();
      await expect(checkoutPage.cancelButtonStepOne).toBeVisible();
    });

    test("TC-024:   should show error when all fields are empty", async () => {
      await checkoutPage.fillShippingInfo("", "", "");
      await expect(checkoutPage.errorText).toHaveText(/First Name is required/);
    });

    test("TC-025:   should navigate to step two on valid input", async ({ page }) => {
      await checkoutPage.fillShippingInfo(user.firstName, user.lastName, user.postalCode);
      await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });
    
    test("TC-026:   should return to cart page when cancel is clicked", async ({ page }) => {
        await checkoutPage.cancelButtonStepOne.click();
        await expect(page).toHaveURL(/.*cart.html/);
      });
  });

  // --- Tests สำหรับ Checkout Step Two ---

  test.describe("Checkout Step Two", () => {
    test.beforeEach(async () => {
      await checkoutPage.fillShippingInfo(user.firstName, user.lastName, user.postalCode);
      await expect(checkoutPage.page).toHaveURL(/.*checkout-step-two.html/);
    });
    
    test("TC-027:   should display correct product and order information", async () => {
      await expect(checkoutPage.itemPrice).toHaveText("$29.99");
      await expect(checkoutPage.subtotalLabel).toHaveText("Item total: $29.99");
      await expect(checkoutPage.taxLabel).toContainText("Tax: $");
      await expect(checkoutPage.totalLabel).toContainText("Total: $");
    });
    
    test("TC-028:   should navigate to complete page on finish", async ({ page }) => {
      await checkoutPage.completeCheckout();
      await expect(page).toHaveURL(/.*checkout-complete.html/);
    });
    
    test("TC-029:   should navigate back to products page on cancel", async ({ page }) => {
      await checkoutPage.cancelButtonStepTwo.click();
      await expect(page).toHaveURL(/.*inventory.html/);
    });
  });
});