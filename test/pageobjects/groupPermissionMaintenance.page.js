
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class GroupPermissionMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnGroupPermissionMaintenance() {
        return $('button[title="Group & Permission Maintenance"]');
    }

    get btnAdministration() {
        return $('#Administration-link');
    }

    /**
     * create new group
     */
    async createGroup(groupName) {
        await $('[mattooltip="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[formcontrolname="groupName"]').clearValue();
        await $('[formcontrolname="groupName"]').setValue(groupName);
        await $('//button[@type="submit"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * delete group
     */
    async deleteGroup(groupName) {
        await $('//label[normalize-space()="' + groupName + '"]/ancestor::mat-list-item//*[@mattooltip="Delete"]').scrollIntoView();
        await $('//label[normalize-space()="' + groupName + '"]/ancestor::mat-list-item//*[@mattooltip="Delete"]').click();
        await $('//button/span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

     /**
     * tick on object
     */
    async tickOn(objectName) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//div[normalize-space()="' + objectName + '"]/preceding-sibling::*//label').scrollIntoView();
        await $('//div[normalize-space()="' + objectName + '"]/preceding-sibling::*//label').click();
    }

     /**
     * save
     */
    async save() {
        await $('//button/span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * open the System Admin Wizard page
     */
    async open() {
        await this.btnAdministration.click()
        await this.btnGroupPermissionMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

module.exports = new GroupPermissionMaintenancePage();
