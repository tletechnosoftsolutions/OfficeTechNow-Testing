const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SystemConfigurationPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnAdministration() {
        return $('//span[text()="Administration"]');
    }

    get btnSystemConfiguration() {
        return $('button[title="System Configuration "]');
    }

    /**
     * open the User Authentication Maintenance page
     */
    async open() {
        await this.btnAdministration.click();
        await this.btnSystemConfiguration.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * save changes
     */
    async save() {
        await $('//button/span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    /**
     * edit a textbox
     */
    async editBox(textboxName, content) {
        await $('//label[contains(.,"' + textboxName + '")]/parent::div/following-sibling::*//input').clearValue();
        await $('//label[contains(.,"' + textboxName + '")]/parent::div/following-sibling::*//input').setValue(content);
    }

    /**
     * edit a dropdown list
     */
    async editList(listName, value) {
        await $('//label[normalize-space()="'+listName+'"]/parent::div/following-sibling::*//*[@role="combobox"]').click();
        await $('//ng-dropdown-panel//span[contains(.,"' + value + '")]').click();
    }
}

module.exports = new SystemConfigurationPage();
