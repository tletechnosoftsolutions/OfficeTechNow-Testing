
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SystemAdminWizardPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnSystemAdminWizard() {
        return $('button[title="System Admin Wizard"]');
    }

    get btnAdministration() {
        return $('#Administration-link');
    }

    /**
     * menuItem: Task Categories, Task Statuses, Task Priorities, Task Subjects, Task Custom Field, File Description, File Subjects, Naming Conventions
     */
    async focusOn(menuItem) {
        await $('//label[normalize-space()="' + menuItem + '"]').scrollIntoView();
        await $('//label[normalize-space()="' + menuItem + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * buttonName: Create, Edit, Delete, Up, Down, Auto Sort
     */
    async clickOnButton(buttonName) {
        await $('//button/span[contains(.,"' + buttonName + '")]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }



    /**
     * open the System Admin Wizard page
     */
    async open() {
        await this.btnAdministration.click()
        await this.btnSystemAdminWizard.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

module.exports = new SystemAdminWizardPage();
