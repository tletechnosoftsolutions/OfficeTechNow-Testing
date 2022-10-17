

const Page = require('./page');
const ks = require('node-key-sender');
const superadmin = 'tssadmin';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
//const url = `https://officetechnow-develop.azurewebsites.net` ;
const url = `https://avtest.officetechnow.com.au` ;


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//input[@id="username"]');
    }

    get inputPassword () {
        return $('//input[@type="password"]');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await new Promise(resolve => setTimeout(resolve, 2000));
        //await new Promise(resolve => setTimeout(resolve, 2000));
        let isExist = await $('(//button[@aria-label="Close"])').isExisting();
        if (isExist == true) {
            await $('(//button[@aria-label="Close"])').click();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
        let isExist2 = await $('(//span[.="×"])').isExisting();
        if (isExist2 == true) {
            await $('(//span[.="×"])').click();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    /**
     * a method to implement the logout
     */
    async logout() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//*[@class="avatar-container"]/div').click();
        await $('//span[text()="Log Out"]').click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open() {
        await browser.url(url);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async opensite (sitename) {
        await browser.url(sitename);
         await new Promise(resolve => setTimeout(resolve, 3000));
    }

     /**
     * overwrite specific options to adapt it to page object
     */
    async reloadsite (sitename) {
        await browser.url(sitename);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await new Promise(resolve => setTimeout(resolve, 2000));
        //let isExist = await $('(//button[@aria-label="Close"])').isExisting();
       //if (isExist == true) {
        //    await $('(//button[@aria-label="Close"])').click();
        //await new Promise(resolve => setTimeout(resolve, 3000));
       // }
        let isExist2 = await $('//div[.="OfficeTechNow ServiceHook is not working"]').isExisting();
        if (isExist2 == true) {
       //await browser.dismissAlert();
            await $('(//span[.="×"])').click();
            //await new Promise(resolve => setTimeout(resolve, 3000));
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        await ks.sendKey('enter');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async reload () {
        this.open();
       // let isExisting = await $('//input[@id="username"]').isExisting();
       // if (isExisting == true) {
       //     await this.login(superadmin, password);
       // }
        await new Promise(resolve => setTimeout(resolve, 2000));
        //let isExist = await $('(//button[@aria-label="Close"])').isExisting();
       //if (isExist == true) {
        //    await $('(//button[@aria-label="Close"])').click();
        //await new Promise(resolve => setTimeout(resolve, 3000));
       // }
        let isExist2 = await $('//div[.="OfficeTechNow ServiceHook is not working"]').isExisting();
        if (isExist2 == true) {
       //await browser.dismissAlert();
            await $('(//span[.="×"])').click();
            //await new Promise(resolve => setTimeout(resolve, 3000));
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        await ks.sendKey('enter');
    }

    
}

module.exports = new LoginPage();
