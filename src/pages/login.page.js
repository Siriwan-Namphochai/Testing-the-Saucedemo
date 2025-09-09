import {page} from "@playwright/test"
import { removeSlashUrl } from "../utils";
export class LoginPage {

    baseUrl = 'https://www.saucedemo.com/';
    locatorUsername = '#user-name';
    locatorPassword = '#password';
    locatorButtonLogin = '#login-button';
    locatorErrorMessage = '[data-test="error"]';
    locatorDashboard = '.inventory_list';
    /**
     * 
     * @param {page} page 
     */
    constructor(page){
        this.page = page
    }

    async goto() {
        await this.page.goto(this.baseUrl);
        console.log("DEBUG: Current URL ->", this.page.url()); // ✅ Debug url
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username);  // ✅ ใช้ parameter
        await this.page.locator(this.locatorPassword).fill(password);  // ✅ ใช้ parameter
    }

    async clickLogin(){
        await this.page.click(this.locatorButtonLogin);
    }

    async login(username, password) {   
    await this.fillUserPassword(username, password);
    await this.clickLogin();
    }

    get dashboard() {  // เพิ่ม
    return this.page.locator(this.locatorDashboard);
    }

    async getUsername(){
        return await this.page.locator(this.locatorUsername).inputValue()
    }

    async getPassword(){
        return await this.page.locator(this.locatorPassword).inputValue()
    }

    async getErrorMessage(){
        try {
            await this.page.waitForSelector(this.locatorErrorMesage, { state: 'visible' });
            return await this.page.locator(this.locatorErrorMesage).innerText();
        } catch (e) { 
            return "";
        }
    }

    async isValidUrl(){
        const currentUrl = removeSlashUrl(this.page.url());
        const expectedUrl = removeSlashUrl(this.baseUrl);
        return currentUrl === expectedUrl;
    }
    
    async isLoginSuccessful() {
    return await this.dashboard.isVisible();
    }

    async isLoginFailed() {
    return await this.page.locator(this.locatorErrorMessage).isVisible();
    }

}