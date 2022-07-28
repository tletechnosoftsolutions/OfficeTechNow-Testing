
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CabinetAccessControlPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnAdminstration() {
        return $('#Administration-link');
    }

    get btnCabinetAccessControl() {
        return $('button[title="Cabinet Access Control"]');
    }

     /**
     * search user then check
     */
    async searchUser(username) {
        await $('//app-multi-select-list-box[@title="Users"]//input[@type="text"]').setValue(username);
        await $('(//app-multi-select-list-box[@title="Users"]//input[@type="checkbox"]/parent::span)[2]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * check/uncheck in cabinets
     */
    async checkCabinet(cabinetName) {
        await $('//div[normalize-space()="' + cabinetName + '"]/preceding-sibling::div//input/parent::span').click();
    }

    /**
     * save changes
     */
    async save() {
        await $('//button/span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * post condition: uncheck
     */
    async postCondition(username) {
        this.open();
        this.searchUser(username);
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.checkCabinet("Clients");
        this.checkCabinet("Development Cabinet");
        this.checkCabinet("Prospects");
        this.save();
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnAdminstration.click();
        await this.btnCabinetAccessControl.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new CabinetAccessControlPage();
