import {page} from "@playwright/test"
import { removeSlashUrl } from "../utils";
export class LoginPage {

    baseUrl = 'https://www.saucedemo.com/v1/index.html';
    locatorUsername = '#user-name';
    locatorPassword = '#password';
    locatorButtonLogin = '#login-button';
    locatorErrorMesage = '[data-test="error"]';
    /**
     * 
     * @param {page} page 
     */
    constructor(page){
        this.page = page
    }

   async goto(){
        await this.page.goto(this.baseUrl);
    }

    async fillUserPassword(username, password){
        await this.page.locator(this.locatorUsername).fill('testuser');
        await this.page.locator(this.locatorPassword).fill('password');
    }
    async clickLogin(){
        await this.page.click(this.locatorButtonLogin);
    }
    async getUsername(){
        return await this.page.locator(this.locatorUsername).inputValue()
    }
    async getPassword(){
        return await this.page.locator(this.locatorPassword).inputValue()
    }
    async getErrorMessage(){
        try{
            return await this.page.locator(this.getErrorMessage).textContent() || "";
        }catch(e){ }

        return "";
    }

    isValidUrl(){
        console.log(this.page.url());
        console.log(this.page.url() === this.baseUrl);
    
    }
}