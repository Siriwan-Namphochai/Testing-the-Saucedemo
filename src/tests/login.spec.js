import { expect } from "@playwright/test";
import { test } from "../pages/base";

test.beforeEach(async({loginPage})=>{
    await loginPage.goto();
})

test.skip('Input fields should display as the data that was filled', async ({ loginPage }) => {
  await loginPage.fillUserPassword('testuser', 'password');

  expect(await loginPage.getUsername()).toBe('testuser');
  expect(await loginPage.getPassword()).toBe('password');
});

test.only('Should show an error message if log in without a username', async ({ loginPage }) => {
  await loginPage.fillUserPassword('', 'password');

  await loginPage.clickLogin();
  const message = await loginPage.getErrorMessage();
  console.log(message);
  expect(message).toContain('is required');
  expect (loginPage.isValidUrl()).toBe(true);
});
/*test('Should show an error message if log in without a password', async ({ loginPage }) => {});
test('Should show an error message if log in with both fields blank', async ({ loginPage }) => {});
test('Should logged in successfully with valid credentials', async ({ loginPage }) => {});
test('Should logged in fail with an error message when using invalid credentials', async ({ loginPage }) => {});*/