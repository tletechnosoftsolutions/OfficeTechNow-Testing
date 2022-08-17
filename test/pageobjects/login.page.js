

const Page = require('./page');

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
        await new Promise(resolve => setTimeout(resolve, 3000));
        $('(//button[@aria-label="Close"])').click();

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
    async open () {
        await browser.url(`https://officetechnow-develop.azurewebsites.net`);
         await new Promise(resolve => setTimeout(resolve, 3000));
    }
    /**
     * overwrite specific options to adapt it to page object
     */
    async reload () {
        await browser.url(`https://officetechnow-develop.azurewebsites.net`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('(//button[@aria-label="Close"])').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

module.exports = new LoginPage();
