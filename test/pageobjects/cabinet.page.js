
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
        await new Promise(resolve => setTimeout(resolve, 500));
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
        await new Promise(resolve => setTimeout(resolve, 500));
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
    * a method to create task
    */
    async createNewTask(categoryname) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
        await $('//button//i[.="add_task"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));       
        //Category
        await $('//mat-dialog-container//label[.="Category"]/following-sibling::*//input').click();
        await $('//a[.="'+categoryname+'"]').click();
        //Progress
        await $('//mat-dialog-container//label[normalize-space()="Progress"]/following-sibling::*//input').click();
        await $('//span[normalize-space()="Awaiting Client"]').click();
        //End date
        let end_date = new Date().setDate(new Date().getDate() + 30).toLocaleDateString;
        await $('(//mat-dialog-container//label[normalize-space()="End Date"]/following-sibling::*//input)[1]').setValue(end_date);
        //Note
        await $('//div[contains(@data-placeholder,"Notes")]').setValue("Automation Testing Create Task");
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//span[contains(.,"Save & Close")]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
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
    async createNewQuickNote(title, note) {
        await $('//button//i[.="add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="note_add"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('input[id*=input_title]').setValue(title);
        await $('div[class*=editor][contenteditable]').setValue(note);
        await new Promise(resolve => setTimeout(resolve, 200));
        //Issue at Description
        //await $('[id*=input_description]').clearValue();
        //await $('[id*=input_description]').setValue("Cancellation");
        await $('[id*=subject-chooser] input').click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await $('//a[contains(.,"Subject A")]').click();
        await $('[id*=textarea_comment]').setValue("Note Automation Testing");
        await $('//button/span[.="Save & Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

     /**
   * a method to create quick note
   */
    async scan() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="add"]').click();
         await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="scanner"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//div[contains(text(),"Scan Document")]')).toBeExisting();     
        await $('//button[.="Cancel"]').click();
        
    }

     /**
   * a method to set folder color
   */
    async setFolderColor() {
        await $('//span[normalize-space()="Set Folder Colour"]').click();
        await $('[title=Macaroni]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

   /**
   * a method to add new template
   */
    async rightclickFolder(folder) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[normalize-space()="' + folder + '"]').click({ button: 'right' });        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async deleteNewQuickNote(note) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//span[contains(.,"' + note + '")])[last()]').click();
        await $('//span[contains(.,"delete")]').click();
        await $('//textarea').setValue('testing reason for deleting');
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    async copyQuickNoteToPDF(note) {
        await $('//span[contains(.,"' + note + '")]/ancestor::tr//button[@aria-label="File option"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//span[contains(.,"Open")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button/span[.="Copy to PDF"]').click();
        await new Promise(resolve => setTimeout(resolve, 15000));
        await $('//button/span[.="Save & Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await $('//button/span/mat-icon[.="sync_problem"]').click();
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
     * tick on file
     */
    async tickOnFile(fileName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]').click();
    }

     /**
     * send to task - typeOfTask: "New Task" or "Existing Task"
     */
    async sendToTask(typeOfTask) {
        await $('button[mattooltip = "Send To Task"]').click();
        await $('//span[.="' + typeOfTask + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * copy file to new directory
     */
    async copyTo() {
        await $('[mattooltip="Copy To"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('app-dialog-folder-browser [aria-label="toggle 2022"]').click();
        await $('(//app-dialog-folder-browser//button/span[contains(.,"Emails")])[2]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * copy file to new directory
     */
    async copyToFolder(folder) {
        await $('[mattooltip="Copy To"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('app-dialog-folder-browser [aria-label="toggle 2023"]').click();
        await $('(//app-dialog-folder-browser//button/span[contains(.,"'+folder+'")])[2]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//button/span[.="Select"]').click();
        await new Promise(resolve => setTimeout(resolve, 7000));
    }

    /**
     * delete file
     */
    async deleteFile() {
        await $('[mattooltip="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//textarea').setValue("Automation test deleting");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * focus on folder
     */
    async focusOn(folderName) {
        await $('//button/span[normalize-space()="' + folderName + '"]').scrollIntoView();
        await $('//button/span[normalize-space()="' + folderName + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * add to favorite
     */
    async addToFavourite(cabinetName) {
        await this.rightclickFolder(cabinetName);
        let isAddedFavourite = await $('//span[normalize-space()="Remove From Favourites"]').isExisting();
        if (!isAddedFavourite) {
            await $('//span[normalize-space()="Add To Favourites"]').click();
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        else await ks.sendKey('escape');
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
