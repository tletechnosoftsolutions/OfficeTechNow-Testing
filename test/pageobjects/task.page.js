
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TaskPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTask() {
        return $('button[title=Tasks]');
    }

    get btnHome() {
        return $('//span[text()="Home"]');
    }

    /**
     * create and fill information of task
     */
    async createTask() {
        await $('//mat-icon[.="add_circle"]/parent::span').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        //Entity
        await $('//mat-dialog-container//div[.="Select Entity"]/following-sibling::*/input').setValue("Automation");
        await $('(//div[@role="option"])[1]').click();
        //Category
        await $('//mat-dialog-container//label[.="Category"]/following-sibling::*//input').click();
        await $('//a[.="Business"]').click();
        //Progress
        await $('//mat-dialog-container//label[normalize-space()="Progress"]/following-sibling::*//input').click();
        await $('//span[normalize-space()="Awaiting Client"]').click();
        //End date
        let end_date = new Date().setDate(new Date().getDate() + 30).toLocaleDateString;
        await $('(//mat-dialog-container//label[normalize-space()="End Date"]/following-sibling::*//input)[1]').setValue(end_date);
        //Note
        await $('//div[contains(@data-placeholder,"Notes")]').setValue("Automation Testing Create Task");
    }

    /**
     * save and close task
     */
    async saveAndClose() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//span[contains(.,"Save & Close")]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

     /**
     * tick on tasks
     */
    async tickOnTasks() {
        await $('//thead//input[@type="checkbox"]/parent::span').click();
    }

     /**
     * delete on selected tasks
     */
    async deleteTask() {
        await $('button[mattooltip=Delete]').click();
        await $('//span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

     /**
     * reassign on selected task
     */
    async reassignTask(assignee) {
        await $('button[mattooltip="Bulk Reassign Task"]').click();
        await $('//app-dialog-bulk-reassign-task//*[@role="combobox"]').click();
        await $('//div[normalize-space()="' + assignee + '" and @role]').click();
        await $('//span[normalize-space()="Reassign"]/parent::button').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

     /**
     * go to client on selected task
     */
    async goToClient() {
        //Tick on task
        await $('//container-element[contains(.,"Automation") and contains(.,"Business")]/ancestor::td').click();
        //Go to client
        await $('button[mattooltip="Go To Client"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * change task's status
     */
    async changeStatus(status) {
        //Tick on task
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//container-element[contains(.,"Automation") and contains(.,"Business")]/ancestor::td').click();
        //Change status
        await $('button[mattooltip="Set Status"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('app-task-status-chooser-field input').click();
        await $('//ng-dropdown-panel//span[.="' + status + '"]').click();
        await $('//button//span[.="Set"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * open task in new window
     */
    async openTask(task, status) {
        await $('button[mattooltip = "Open task"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        let today = ("0" + (new Date().getDate())).slice(-2)+'/'+("0" + (new Date().getMonth() + 1)).slice(-2)+'/'+new Date().getFullYear();
        await browser.switchWindow(task +today+status);
        //Task: Automation -- Business -- 03/08/2022 -- Complete
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

     /**
     * click on yes button and save completed task
     */
    async saveToOfficeNow() {
        await $('//span[.="Yes"]').click();       
        await new Promise(resolve => setTimeout(resolve, 3000));
        let folder = "2021";
        await $('//span[text()=" ' + folder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        /*need to fix subjet dropdown list*/
        //await $('(//mat-icon[text()="arrow_drop_down"])[3]').click();
        //await $('//a[.="Subject A"]').click();
        await $('(//input[@type="text"])[20]').setValue("Subject A");
        /**/
        await $('//textarea').setValue("Automation testing completed task");
        await $('//span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 4000));
        
    }

    async switchWindow(title) {
        await browser.switchWindow(title);
    }
    /**
     * fulfill data search 
     */
    async fulfilldata() {
        await $('//label[normalize-space()="Task Quick Find"]/following-sibling::*//input[contains(@id,"formly") and contains(@id,"input")]').setValue("Automation");
        await $('//label[normalize-space()="Entity"]/following-sibling::*//input[@type="text"]').click();
        await $('//label[normalize-space()="Entity"]/following-sibling::*//input[@type="text"]').setValue("Automation");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//div[normalize-space()="Client: Automation"])[last()]').click();
        await $('//label[normalize-space()="Priority"]/following-sibling::*//input[@type="text"]').click();
        await $('//ng-dropdown-panel//span[.="Normal"]').click();
        await $('//label[normalize-space()="Category"]/following-sibling::*//input[@type="text"]').click();
        await $('//a[.="Business"]').click();
        await $('//label[normalize-space()="Status"]/following-sibling::*//input[@type="text"]').click();
        await $('//ng-dropdown-panel//span[.="Complete"]').click();
        await $('//label[normalize-space()="Subject"]/following-sibling::*//input[@type="text"]').click();
        await $('//a[.="Task Subject 01"]').click();
        await $('//label[normalize-space()="Reminder For"]/following-sibling::*//input[@type="text"]').click();
        await $('//ng-dropdown-panel//span[normalize-space()="tssadmin3"]').click();
        await $('//label[normalize-space()="Assigned To"]/following-sibling::*//input[@type="text"]').click();
        await $('//ng-dropdown-panel//span[normalize-space()="tssadmin3"]').click();
        await $('//label[normalize-space()="Assigned By"]/following-sibling::*//input[@type="text"]').click();
        await $('//ng-dropdown-panel//span[normalize-space()="tssadmin3"]').click();
        await $('//label[normalize-space()="Filter By Date"]/following-sibling::*//input[@type="text"]').click();
        await $('//span[.="Created Date"]').click();
        await $('//label[normalize-space()="From" and contains(@for,"fromDate")]/following-sibling::*//input').setValue("01/07/2022");
        await $('//label[normalize-space()="To" and contains(@for,"toDate")]/following-sibling::*//input').setValue("01/08/2022");
        await $('//label[normalize-space()="Step Name"]/following-sibling::*//input').click();
        await $('//span[.="Email UW"]').click();
        await $('//label[normalize-space()="State"]/following-sibling::*//input').click();
        await $('//ng-dropdown-panel//span[.="Complete"]').click();
        await $('//label[normalize-space()="Field Name"]/following-sibling::*//input').click();
        await $('//ng-dropdown-panel//span[.="Business Type"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[normalize-space()="Value"]/following-sibling::*//div[@role="combobox"]').click();
        await $('//ng-dropdown-panel//span[.="CGU"]').click();
    }

     /**
     * check all fields are empty
     */
    async isEmptyFields() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return 
            await $('//label[normalize-space()="Task Quick Find"]/following-sibling::*//input[contains(@id,"formly") and contains(@id,"input")]').getText() +
            await $('//label[normalize-space()="Client"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Priority"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Category"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Status"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Subject"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Reminder For"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Assigned To"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Assigned By"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="Filter By Date"]/following-sibling::*//input[@type="text"]').getText() +
            await $('//label[normalize-space()="From" and contains(@for,"fromDate")]/following-sibling::*//input').getText() +
            await $('//label[normalize-space()="To" and contains(@for,"toDate")]/following-sibling::*//input').getText() +
            await $('//label[normalize-space()="Step Name"]/following-sibling::*//input').getText() +
            await $('//label[normalize-space()="State"]/following-sibling::*//input').getText() +
            await $('//label[normalize-space()="Field Name"]/following-sibling::*//input').getText() +
            await $('(//label[normalize-space()="Value"]/following-sibling::*//input)[1]').getText();
    }
    
     /**
     * check all fields are empty
     */
    async clearAll() {
        await $('//span[normalize-space()="Clear All"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnHome.click()
        await this.btnTask.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

module.exports = new TaskPage();
