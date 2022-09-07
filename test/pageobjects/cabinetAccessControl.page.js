
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
     * check/uncheck in cabinets/permissions/users
     */
    async checkCabinet(objName) {
        await $('//div[normalize-space()="' + objName + '"]/preceding-sibling::div//input/parent::span').scrollIntoView();
        await $('//div[normalize-space()="' + objName + '"]/preceding-sibling::div//input/parent::span').click();
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
     * create new group to grant permission 
     */
    async createNewGroup(groupName) {
        await $('//button/span[contains(.,"New group")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[id*="input_groupName"]').clearValue();
        await $('[id*="input_groupName"]').setValue(groupName);
        await $('//span[.="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
        await $('//span[.="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * focus on group name
     */
    async focusOn(groupName) {
        await $('//label[normalize-space()="' + groupName + '"]').scrollIntoView();
        await $('//label[normalize-space()="' + groupName + '"]').click();
    }

    /**
     * check/uncheck in intray/permissions/users
     */
    async tickOnUser(userName) {
        await $('//*[@title="Users"]//div[normalize-space()="' + userName + '"]/preceding-sibling::div//input/parent::span').scrollIntoView();
        await $('//*[@title="Users"]//div[normalize-space()="' + userName + '"]/preceding-sibling::div//input/parent::span').click();
    }

    async tickOnCabinet(cabinetName) {
        await $('//div[normalize-space()="Cabinets"]/following-sibling::*//div[normalize-space()="' + cabinetName + '"]').scrollIntoView();
        await $('//div[normalize-space()="Cabinets"]/following-sibling::*//div[normalize-space()="' + cabinetName + '"]').click();
    }

    async tickOnPermission(permissionName) {
        await $('//*[@title="Permissions"]//div[normalize-space()="' + permissionName + '"]/preceding-sibling::div//input/parent::span').scrollIntoView();
        await $('//*[@title="Permissions"]//div[normalize-space()="' + permissionName + '"]/preceding-sibling::div//input/parent::span').click();
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
