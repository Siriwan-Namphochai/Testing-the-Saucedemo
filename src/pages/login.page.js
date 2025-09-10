// src/pages/login.page.js
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
        console.log("DEBUG: Current URL ->", this.page.url()); 
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username);  
        await this.page.locator(this.locatorPassword).fill(password);  
    }

    async clickLogin(){
        await this.page.click(this.locatorButtonLogin);
    }

    async login(username, password) {   
    await this.fillUserPassword(username, password);
    await this.clickLogin();
    }

    get dashboard() {  
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
            await this.page.waitForSelector(this.locatorErrorMessage, { state: 'visible', timeout: 2000  });
            return await this.page.locator(this.locatorErrorMessage).innerText();
        } catch (e) { 
            return "";
        }
    }

    async isValidUrl(){
        const currentUrl = removeSlashUrl(this.page.url());
        const expectedUrl = removeSlashUrl(this.baseUrl);
        return currentUrl === expectedUrl;
    }
    // ตรวจสอบว่าล็อกอินสำเร็จ (dashboard visible)
        async isLoginSuccessful() {
    return await this.page.locator(this.locatorDashboard).isVisible();
    }

    // ตรวจสอบว่าล็อกอินล้มเหลว (error message visible)
    async isLoginFailed() {
    const msg = await this.getErrorMessage();
    return msg !== "";
    }

}