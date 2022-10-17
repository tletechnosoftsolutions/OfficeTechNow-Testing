

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
     * open the User Authentication Maintenance page
     */
    async open() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * open the User Authentication Maintenance page
     */
      async open1() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
     /**
     * open the User Authentication Maintenance page
     */
      async open2() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
     /**
     * open the User Authentication Maintenance page
     */
      async open3() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
     /**
     * open the User Authentication Maintenance page
     */
      async open4() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
     /**
     * open the User Authentication Maintenance page
     */
      async open5() {
        await this.btnAdministration.click();
        await this.btnUserAuthenticationMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    /**
     * create user
     */
    async inviteNewUser(user) {
        await $('//span[contains(text(), "Invite")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Info
        await $('//input[@placeholder="Enter Email"]').setValue(user + "@gmail.com");
        await $('//input[@placeholder="Enter First Name"]').setValue("Automation");
        await $('//input[@placeholder="Enter Last Name"]').setValue(user);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('(//span[text()="Invite"])').click();
    }
    
    /**
     * edit user
     */
    async editUser(user) {
        await $('//p[text()="'+user+'@gmail.com"]/parent::div/parent::td//parent::tr/td[4]//button[text()="Edit"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Info
        //await $('//input[@placeholder="Enter Email"]').setValue(user + "@gmail.com");
        await $('//input[@placeholder="Enter First Name"]').setValue("EditAutomation");
        await $('//input[@placeholder="Enter Last Name"]').setValue(user);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('(//span[text()="Save"])').click();
        
    }

    /**
     * admin edit user
     */
    async admineditUser(user) {
        await $('//p[text()="'+user+'@gmail.com"]/parent::div/parent::td//parent::tr/td[4]//button[text()="Edit"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Info
        await $('//input[@placeholder="Enter Email"]').setValue(user + "@gmail.com");
        await $('//input[@placeholder="Enter First Name"]').setValue("EditAutomation");
        await $('//input[@placeholder="Enter Last Name"]').setValue(user);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('(//span[contains(text(),"Save & Resend")])').click();
        
    }

    /**
     * edit and resend user
     */
    async editAndResendUser(user) {
        await $('//p[text()="'+user+'@gmail.com"]/parent::div/parent::td//parent::tr/td[4]//button[text()="Edit"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Info
        //await $('//input[@placeholder="Enter Email"]').setValue(user + "@gmail.com");
        await $('//input[@placeholder="Enter First Name"]').setValue("EditAutomation");
        await $('//input[@placeholder="Enter Last Name"]').setValue(user);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('(//span[contains(text(),"Save & Resend")])').click();
    }

    /**
     * deactivate user
     */
    async deactivateUser(userName) {
        await $('//p[normalize-space()="' + userName + '"]/ancestor::tr//button[contains(.,"Deactivate")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * activate user
     */
    async activateUser(userName) {
        await $('//p[normalize-space()="' + userName + '"]/ancestor::tr//button[contains(.,"Activate")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * disable CamUser
     */
    async disableCamUser(userName) {
        await $('//p[normalize-space()="' + userName + '"]/ancestor::tr//button[contains(.,"Disable Check CAM")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * enable CamUser
     */
    async enableCamUser(userName) {
        await $('//p[normalize-space()="' + userName + '"]/ancestor::tr//button[contains(.,"Enable Check CAM")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * verify popup message
     */
    async isPopupExist(message) {
        return await $('(//snack-bar-container//*[contains(.,"' + message + '")])[last()]').isExisting();
    }

    /**
     * clear all search bars
     */
    async clearSearchBars() {
        await $('#textSearch').clearValue();
        //Clear if existing "X" button
        let statusBar = await $('#status [title="Clear all"]');
        let faBar = await $('[formcontrolname="twoFactorStatus"] [title="Clear all"]');
        if (await statusBar.isExisting()) await statusBar.click();
        if (await faBar.isExisting()) await faBar.click();
    }

    /**
     * searchType and attribute: User (name), Status (Active, Pending, Migrated, Inactive), 2FA (Yes, No, Request)
     */
    async search(searchType, attribute) {
        switch (searchType) {
            case "2FA": {
                await $('[formcontrolname="twoFactorStatus"]').click();
                await new Promise(resolve => setTimeout(resolve, 500));
                await $('//ng-dropdown-panel//label[contains(.,"' + attribute + '")]').click();
                break;
            }

            case "Status": {
                await $('#status').click();
                await new Promise(resolve => setTimeout(resolve, 500));
                await $('//ng-dropdown-panel//label[contains(.,"' + attribute + '")]').click();
                break;
            }

            case "User": {
                await $('#textSearch').setValue(attribute);
                await new Promise(resolve => setTimeout(resolve, 500));
                break;
            }
        }
    }

    /**
     * export all users in table
     */
    async export() {
        await $('//button/span[contains(normalize-space(),"Export")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new UserAuthenticationMaintenancePage();
