const Page = require('./page');
const { exec } = require('child_process');
const ks = require('node-key-sender');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class TemplateMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTemplateMaintenance() {
        return $('button[title="Template Maintenance"]');
    }

    get btnTools() {
        return $('#Tools-link');
    }

    /**
     * open the Task page
     */
    async open() {
        await this.btnTools.click()
        await this.btnTemplateMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
    * a method to upload file
    */
    async uploadFileSystem(filename) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="file_upload"]').click();
        //await new Promise(resolve => setTimeout(resolve, 2000));
        //await $('//button//*[.="add_circle"]').click();
        //await clibboardy.writeSync(filename);
        await new Promise(resolve => setTimeout(resolve, 2000));
        //await ks.sendCombination(['control', 'v']);
        await ks.sendText(filename);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ks.sendKey('enter');
        await new Promise(resolve => setTimeout(resolve, 5000));
        //await clibboardy.writeSync(filename);
        //await browser.keys(['C:\\OTNow\\test\\testdata\\testfile_xlsx_1.7MB.xlsx']);
        //await browser.keys(['Enter']);
       
        /* Fill mandatory */
        //await $('//label[.="Type"]/following-sibling::*//span[@class="ng-arrow-wrapper"]').click();
        //await $('//span[.="fn - File Note"]').click();
        //await $('//label[.="Subject"]/following-sibling::*//span[@class="arrow-btn"]').click();
        //await $('//a[.="Subject A"]').click();
        //await $('#comment').setValue('testing upload');

        /* Click Upload button then Close */
        //await $('//button/span[.="Upload"]').click();
        //await new Promise(resolve => setTimeout(resolve, 10000));
        //await $('//button[.="Close"]').click();
        //await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
   * a method to add new template
   */
    async rightclickFolder(folder) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[normalize-space()="' + folder + '"]').click({ button: 'right' });        
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
   * a method to add new template
   */
    async clickFolder(folder) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[normalize-space()="' + folder + '"]').click();        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
   * a method to set folder color
   */
    async addFolder(folderName) {
        await $('//span[normalize-space()="Add Folder"]').click();
        //await $('[title=Macaroni]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//input[@id="folderName"]').setValue(folderName);
        await $('//span[.="Create"]').click();
    }
    /**
   * a method to set folder color
   */
    async addSubFolder(folderName) {
        await $('//span[normalize-space()="Add Sub Folder"]').click();
        //await $('[title=Macaroni]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//input[@id="folderName"]').setValue(folderName);
        await $('//span[.="Create"]').click();
    }

    /**
   * a method to set folder color
   */
    async openTemplate() {
        await $('(//button[@aria-label="File option"])[1]').click();
          await new Promise(resolve => setTimeout(resolve, 3000));
         await $('(//span[text()="Open"])').click();
          await new Promise(resolve => setTimeout(resolve, 3000));
          await $('(//span[text()="Close"])[2]').click();
    }

    /**
   * a method to set folder color
   */
    async reviewTemplate() {
       // await $('(//button[@aria-label="File option"])[1]').click();
       //   await new Promise(resolve => setTimeout(resolve, 3000));
         await $('(//button[text()="Preview"])').click();
          await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

module.exports = new TemplateMaintenancePage();
