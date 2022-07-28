

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CreateNewTaskPage extends Page {
    /**
     * define selectors using getter methods
     */
   
    get btnRightMenu() {
        return $('//button//i[.="add"]');
    }

    get btnAddTask() {
        return $('//button//i[.="add_task"]');
    }

    /**
    * a method to encapsule automation code to interact with the page
    */
    async getElementsInMenu() {
        //return await $$('//button//i[.="add"]/ancestor::button/following-sibling::*//button');
        return $$('button[class*= mat-button-base][title]');
    }

    /**
     * open the Right Menu
     */
    async openMenu() {
        await this.btnRightMenu.click();
    }

    async openAddTask() {
        await this.btnAddTask.click();
    }


}

module.exports = new CreateNewTaskPage();
