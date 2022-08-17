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
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//app-dialog-folder-browser//button/span[normalize-space()="' + desUserIntrayFolder + '"]').click();
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * tick on file
     */
    async tickOnFile(fileName) {
        await $('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * go to user's intray
     */
    async goToUserIntray(userName) {
        await $('//button/span[normalize-space()="' + userName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * move file to another user's intray
     */
    async moveTo(desUserIntrayFolder) {
        await $('[mattooltip="Move To"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//app-dialog-folder-browser//button/span[normalize-space()="' + desUserIntrayFolder + '"]').click();
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * delete file
     */
    async delete() {
        await $('[mattooltip="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
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
        await new Promise(resolve => setTimeout(resolve, 1000));
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
        await new Promise(resolve => setTimeout(resolve, 10000));
        await $('//button[.="Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnHome.click();
        await this.btnInTrays.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new InTraysPage();
