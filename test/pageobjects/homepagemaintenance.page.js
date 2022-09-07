

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePageMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */
   
    
    get btnTools() {
        return $('//span[text()="Tools"]');
    }

    get btnHomePageMaintenance() {
        return $('button[title="Homepage Maintenance"]');
    }


    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnTools.click();
        await this.btnHomePageMaintenance.click();
    }

    /**
    * a method to create a client
    */
    async modify(text) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys([text.toString()]); 
        await $('//button/span[contains(text(),"Save")]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * uncheck Show Tasks if it has been checked
     */
    async uncheckShowTask() {
        let isChecked = (await $('[formcontrolname="isShowMyTask"]').getAttribute('class')).includes('checked');
        if (isChecked) {
            await $('//span[text()="Show Tasks on Homepage"]').click();
            await $('//button/span[contains(text(),"Save")]').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    /**
     * check Show Tasks if it has been unchecked
     */
    async checkShowTask() {
        let isChecked = (await $('[formcontrolname="isShowMyTask"]').getAttribute('class')).includes('checked');
        if (!isChecked) {
            await $('//span[text()="Show Tasks on Homepage"]').click();
            await $('//button/span[contains(text(),"Save")]').click();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

    }

}

module.exports = new HomePageMaintenancePage();
