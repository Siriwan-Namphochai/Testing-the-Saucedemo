// src/tests/login.spec.js
import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { validUsers, problemUsers } from "../test-data/user";


test.describe('LOGIN FUCTION', () => {


test.beforeEach(async({loginPage})=>{
    await loginPage.goto();
})

test('TC-001: Input fields should display as the data that was filled', async ({ loginPage }) => {

  await loginPage.fillUserPassword('testuser', 'password');

  expect(await loginPage.getUsername()).toBe('testuser');
  expect(await loginPage.getPassword()).toBe('password');
});


test('TC-002: Should show an error message if log in without a username', async ({ loginPage }) => {

  await loginPage.fillUserPassword('', 'secret_sauce'); // password ถูกต้อง แต่ไม่มี username
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  console.log("DEBUG Error:", message);
  expect(message).toContain('Epic sadface: Username is required');
  expect (await loginPage.isValidUrl()).toBe(true);
});

test('TC-003: Should show an error message if log in without a password', async ({ loginPage }) => {

  await loginPage.fillUserPassword('standard_user', ''); // username ถูกต้อง แต่ไม่มี password
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  expect(message).toContain('Epic sadface: Password is required');
  expect (await loginPage.isValidUrl()).toBe(true);
});

test('TC-004: Should show an error message if log in with both fields blank', async ({ loginPage }) => {

  await loginPage.fillUserPassword('', '');             
  await loginPage.clickLogin();

  const message = await loginPage.getErrorMessage();
  expect(message).toContain('Epic sadface: Username is required'); 
  expect(await loginPage.isValidUrl()).toBe(true);
});

for(const { username, password } of validUsers) {
  test(`TC-005: Should logged in successfully with valid credentials: ${username}`, async ({ loginPage, page }) => {
    await loginPage.login(username, password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(await loginPage.isLoginSuccessful()).toBeTruthy();
  });
}

for (const { username, password } of problemUsers) {
  test(`TC-006: Should fail to login with an error message when using invalid credentials: ${username}`, async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(await loginPage.isLoginFailed()).toBeTruthy();
  });
}

});