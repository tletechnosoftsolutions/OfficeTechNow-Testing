
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
     * rename group
     */
    async renameGroup(groupName) {
        await $('//label[normalize-space()="' + groupName + '"]/ancestor::mat-list-item//*[@mattooltip="Rename"]').scrollIntoView();
        await $('//label[normalize-space()="' + groupName + '"]/ancestor::mat-list-item//*[@mattooltip="Rename"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[formcontrolname="groupName"]').setValue("Edited " + groupName);
        await $('//button/span[contains(.,"Rename")]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * search group/users/permission
     * typeOfSearch: Group, User, Permission
     */
    async search(typeOfSearch, value) {
        await $('//div[contains(text(),"' + typeOfSearch + '")]/following-sibling::*//input[@type="text"]').setValue(value);
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
     * focus on group name
     */
    async focusOn(groupName) {
        await $('//label[normalize-space()="' + groupName + '"]').scrollIntoView();
        await $('//label[normalize-space()="' + groupName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    /**
     * verify message exists
     */
    async isMessageExist(message) {
        return await $('//p[contains(.,"' + message + '")]').isExisting();
    }

    /**
     * verify popup message
     */
    async isPopupExist(message) {
        return await $('(//snack-bar-container//*[contains(.,"' + message + '")])[last()]').isExisting();
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
