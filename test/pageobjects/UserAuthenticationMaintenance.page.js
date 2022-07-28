

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class UserAuthenticationMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnAdministration() {
        return $('//span[text()="Administration"]');
    }

    get btnUserAuthenticationMaintenance() {
        return $('button[title="User & Authentication Maintenance"]');
    }


    /**
    * a method to expand folder
    */
    async expandCabinet(folder) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        //await $('button[aria-label="toggle ' + folder + '"]').click();
        await $('//span[text()=" ' + folder + '"]').click();
    }

    /**
   * a method to expand folder to the 4th child
   */
    async expandCabinetToChild(folder) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        //await $('button[aria-label="toggle ' + folder + '"]').click();
        await $('//span[text()=" ' + folder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//*[@aria-level="2"]/button/span)[1]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//*[@aria-level="3"]/button/span)[1]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//*[@aria-level="4"]/button/span)[1]').click();
    }

    /**
    * a method to collap folder
    */
    async collapCabinet(folder) {
        await $('button[aria-label="toggle ' + folder + '"]').click();
    }

    /**
    * a method to create task
    */
    async createTask() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await $('//button//i[.="add_task"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//div[contains(text(),"Create New Task")]')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //await browser.keys(['Enter']);
        await browser.acceptAlert();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
   * a method to create quick note
   */
    async createQuickNote() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await $('//button//i[.="note_add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//div[contains(text(),"Create QuickNote")]')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
    }
}

module.exports = new UserAuthenticationMaintenancePage();
