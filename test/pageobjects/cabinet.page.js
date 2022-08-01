
const Page = require('./page');
const { exec } = require('child_process');
const ks = require('node-key-sender');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CabinetPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnHome() {
        return $('//span[text()="Home"]');
    }

    get btnCabinet() {
        return $('button[title="Cabinets"]');
    }

    /**
   * a method to quick find client
   */
    async openQuickFind(clientname) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//input[@placeholder="Quick Find"]').setValue(clientname);
        await $('(//span[contains(text(),"' + clientname + '")])').click();   
        await new Promise(resolve => setTimeout(resolve, 1000));
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
         await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="note_add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//div[contains(text(),"Create QuickNote")]')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
    * a method to create quick note
    */

    async uploadFileSystem(filename) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="file_upload"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//button//*[.="add_circle"]').click();
        //await clibboardy.writeSync(filename);
        await new Promise(resolve => setTimeout(resolve, 1000));
        //await ks.sendCombination(['control', 'v']);
        await ks.sendText(filename);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await ks.sendKey('enter');
        await new Promise(resolve => setTimeout(resolve, 10000));
        //await clibboardy.writeSync(filename);
        //await browser.keys(['C:\\OTNow\\test\\testdata\\testfile_xlsx_1.7MB.xlsx']);
        //await browser.keys(['Enter']);
       

        ////[Khúc này chưa chạy được - Upload file]
        ///* Select file */
        ////await $('//button//*[.="add_circle"]').click();
        //const filePath = "C:/OTNow/test/testdata/" + filename;
        ////const remotePath = browser.uploadFile(filePath);
        ////await fileLocateButton = $('//input[@type="file"]');
        //const fileLocateButton = await $('//input[@type="file"]');
        //browser.execute((e1) => e1.style.display = 'block', $('//input[@type="file"]'));
        //console.log("DEBUGGGGGGGGGGGGGGGGGGGGGGG 1");
        //await fileLocateButton.waitForDisplayed();
        //await new Promise(resolve => setTimeout(resolve, 1000));
        //await fileLocateButton.setValue(filePath);
        //console.log("DEBUGGGGGGGGGGGGGGGGGGGGGGG 2");
        //await new Promise(resolve => setTimeout(resolve, 20000));
        
        
        //[Khúc này chạy được rồi - Điền textbox và ấn nút]
        /* Fill mandatory */
        await $('//label[.="Type"]/following-sibling::*//span[@class="ng-arrow-wrapper"]').click();
        await $('//span[.="fn - File Note"]').click();
        await $('//label[.="Subject"]/following-sibling::*//span[@class="arrow-btn"]').click();
        await $('//a[.="Subject A"]').click();
        await $('#comment').setValue('testing upload');

        /* Click Upload button then Close */
        await $('//button/span[.="Upload"]').click();
        await new Promise(resolve => setTimeout(resolve, 15000));
        await $('//button[.="Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
    }

    /**
     * rename folder
     */
    async renameFolder(oldFolderName, newFolderName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//span[contains(.,"' + oldFolderName + '")])[1]').click({ button: 'right' });
         await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[contains(.,"Rename Folder")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('#folderName').setValue(newFolderName);
        await $('//button/span[.="Rename"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * delete folder
     */
    async deleteFolder(folderName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//span[contains(.,"' + folderName + '")])[1]').click({ button: 'right' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[contains(.,"Delete Folder")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//textarea').setValue('testing reason for deleting');
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnHome.click();
        await this.btnCabinet.click();
    }
}

module.exports = new CabinetPage();
