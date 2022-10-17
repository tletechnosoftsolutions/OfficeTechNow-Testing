const Page = require('./page');
const ks = require('node-key-sender');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InTraysPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnHome() {
        return $('//span[text()="Home"]');
    }
   
    get btnInTrays() {
        return $('button[title="In-Trays"]');
    }

     /**
     * copy file to another user's intray
     */
    async copyTo(desUserIntrayFolder) {
        await $('[mattooltip="Copy To"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//app-dialog-folder-browser//button/span[normalize-space()="' + desUserIntrayFolder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * tick on file
     */
    async tickOnFile(fileName) {
        await $('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]').click();
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    async tickAllFiles() {
        await $('th label').click();
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    /**
     * go to user's intray
     */
    async goToUserIntray(userName) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//button/span[normalize-space()="' + userName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * move file to another user's intray
     */
    async moveTo(desUserIntrayFolder) {
        await $('[mattooltip="Move To"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        //await $('//app-dialog-folder-browser//button/span[normalize-space()="' + desUserIntrayFolder + '"]').scrollIntoView();
        await $('//app-dialog-folder-browser//button/span[normalize-space()="' + desUserIntrayFolder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * delete file
     */
    async delete() {
        await $('[mattooltip="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('//textarea').setValue("Automation testing delete");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * create new email from selected attachment
     */
    async newEmail() {
        await $('[mattooltip="New Email"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * send to task: type of task: New, Existing
     */
    async sendToTask(typeOfTask) {
        await $('[mattooltip="Send To Task"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="' + typeOfTask + ' Task"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
    * a method to upload file
    */
    async uploadFileSystem(filename) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="file_upload"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//button//*[.="add_circle"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await ks.sendText(filename);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ks.sendKey('enter');
        await new Promise(resolve => setTimeout(resolve, 5000));

        /* Fill mandatory */
        await $('//label[.="Type"]/following-sibling::*//span[@class="ng-arrow-wrapper"]').click();
        await $('//span[.="fn - File Note"]').click();
        await $('//label[.="Subject"]/following-sibling::*//span[@class="arrow-btn"]').click();
        await $('//a[.="Subject A"]').click();
        await $('#comment').setValue('testing upload');

        /* Click Upload button then Close */
        await $('//button/span[.="Upload"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//button[.="Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
    * a method to check in file to grant Move and Delete permission
    */
    async checkInFile(filename) {
        let isCheckable = await $('//span[contains(.,"' + filename + '")]/ancestor::tr//td[contains(@class,"status")]//span').isExisting();
        if (isCheckable) {
            await $('//span[contains(.,"' + filename + '")]/ancestor::tr//button').click();
            await new Promise(resolve => setTimeout(resolve, 200));
            await $('//span[.="Check in"]').click();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    async checkInAllFiles() {
        let loopTime = await $$('td[class*=status] span').length;
        for (let i = 0; i < loopTime; i++) {
            await $('(//td[contains(@class,"status")]//span)[1]/ancestor::tr//button').click();
            await new Promise(resolve => setTimeout(resolve, 200));
            await $('//span[.="Check in"]').click();
            await new Promise(resolve => setTimeout(resolve, 500));
            if (i == loopTime - 1) {
                await this.tickAllFiles();
                await this.tickAllFiles();
            }
        }
    }

    async checkInAndDeleteAllFiles() {
        await this.checkInAllFiles();
        await this.tickAllFiles();
        let isDisabled = (await $('[mattooltip="Delete"]').getAttribute('class')).includes('disabled');
        if (!isDisabled) await this.delete();
        else await this.tickAllFiles();
    }

    /**
     * open the Intray page
     */
    async pressButton(buttonName) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await ks.sendKey(buttonName);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * open the Intray page
     */
    async open() {
        await this.btnHome.click();
        await this.btnInTrays.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new InTraysPage();
