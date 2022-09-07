
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
        await $('//label[normalize-space()="' + menuItem + '"]|//div[normalize-space()="' + menuItem + '"]').scrollIntoView();
        await $('//label[normalize-space()="' + menuItem + '"]|//div[normalize-space()="' + menuItem + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * buttonName: Create, Edit, Delete, Up, Down, Auto Sort
     */
    async clickOnButton(buttonName) {
        await $('//button/span[contains(.,"' + buttonName + '")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (buttonName == "Delete") {
            await $('//button/span[.="Yes"]').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

     /**
     * form #1 is the popup form laid in: Task Categories, Task Priorities
     */
    async fillForm1(name) {
        await $('//label[contains(.,"Name")]/parent::div//input').clearValue();
        await $('//label[contains(.,"Name")]/parent::div//input').setValue(name);
        await $('#colorBox [title=Macaroni]').click();
        this.tryToClickSave();        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * form #2 is the popup form laid in: Task Statuses, Task Subjects, Task Custom Field, File Description, File Subjects
     */
    async fillForm2(name) {
        await $('//label[contains(.,"Name")]/parent::div//input').clearValue();
        await $('//label[contains(.,"Name")]/parent::div//input').setValue(name);
        this.tryToClickSave();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * form #3 is the popup form laid in: Naming Convention
     */
    async fillForm3(name) {
        await $('[id*=input_prefix]').clearValue();
        await $('[id*=input_prefix]').setValue(name.slice(name.length - 3, name.length)); //get last 3 digits from the postfix passed
        await $('[id*=input_name]').clearValue();
        await $('[id*=input_name]').setValue(name);
        this.tryToClickSave();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * Try to click on Create/Save button twice or many times after editing or creating new object
     */
    async tryToClickSave() {
        let isToastMessageExist;
        do {
            await $('//button[.="Cancel"]/following-sibling::button').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            isToastMessageExist = await $('snack-bar-container').isDisplayed();
        }
        while (isToastMessageExist == false);
        await $('snack-bar-container button[aria-label=Close]').click();
    }

    /**
     * Move object up to top. Must to focus on the object before using this method
     */
    async moveToTop() {
        let num = await $$('(//app-box-template)[2]//*[contains(@class,"list-group-item")][contains(@class,"d active") or contains(@class,"active ng")]/preceding-sibling::*').length;
        for (let i = 0; i < num; i++) {
            await this.clickOnButton("Up");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

     /**
     * Move object down to bottom. Must to focus on the object before using this method
     */
    async moveToBottom() {
        let num = await $$('(//app-box-template)[2]//*[contains(@class,"list-group-item")][contains(@class,"d active") or contains(@class,"active ng")]/following-sibling::*').length;
        for (let i = 0; i < num; i++) {
            await this.clickOnButton("Down");
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    /**
     * Get objects' names and save in list
     */
    async getListItems() {
        return await $$('(//app-box-template)[2]//*[contains(@class,"list-group-item")]//label').map(e => e.getText()).join(',');
    }

    /**
     * verify list before and after sort
     */
    async compareLists() {
        //Get list before sorting
        let listItems_before = (await this.getListItems()).split(',').sort();
        //Get list after sorting
        await this.clickOnButton("Auto Sort");
        let listItems_after = await this.getListItems();
        console.log("DEBUGGGGGGGGGGGGGGGGGGGGGGG before: " + listItems_before);
        console.log("DEBUGGGGGGGGGGGGGGGGGGGGGGG after: " + listItems_after);
        return listItems_before == listItems_after;
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
