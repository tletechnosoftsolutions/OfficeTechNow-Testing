const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TaskTemplateMaintenance extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTaskTemplateMaintenance() {
        return $('button[title="Task Template Manager"]');
    }

    get btnAdministration() {
        return $('#Administration-link');
    }

    /**
     * create new task template
     */
    async createTaskTemplate(templateName) {
        await $('[title="Current Task Templates"] button[mattooltip="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[formcontrolname = "taskTemplateName"] input').clearValue();
        await $('[formcontrolname = "taskTemplateName"] input').setValue(templateName);
        await $('//mat-icon[contains(.,"arrow_drop_up")]').click();
        await $('//span[normalize-space()="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.focusOn(templateName);
    }

    /**
     * focus on task template
     */
    async focusOn(templateName) {
        await $('//label[normalize-space()="' + templateName + '"]').scrollIntoView();
        await $('//label[normalize-space()="' + templateName + '"]').click();
    }

     /**
     * create step:
     * + stepName: string
     * + stepType: Simple, Reassign, Text Box, Email, Open Template
     */
    async createStep(stepName, stepType) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('[title="Steps"] button[mattooltip = "Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('input[formcontrolname="stepName"]').clearValue();
        await $('input[formcontrolname="stepName"]').setValue(stepName);
        await $('[formcontrolname="stepType"] input').click();
        await $('//div[@role="option"]/*[.="' + stepType + '"]').click();
        await $('//span[normalize-space()="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * edit step:
     * + stepName: string
     * + stepType: Simple, Reassign, Text Box, Email, Open Template
     */
    async editStep(stepName, newStepName, newStepType) {
        await $('//label[contains(.,"' + stepName + '")]/ancestor::mat-list-item//button[@mattooltip="Edit"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('input[formcontrolname="stepName"]').clearValue();
        await $('input[formcontrolname="stepName"]').setValue(newStepName);
        await $('[formcontrolname="stepType"] input').click();
        await $('//div[@role="option"]/*[.="' + newStepType + '"]').click();
        await $('//mat-dialog-container//button/span[normalize-space()="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * delete step in template
     */
    async deleteStep(stepName) {
        await $('//label[contains(.,"' + stepName + '")]/ancestor::mat-list-item//button[@mattooltip="Delete"]').click();
        await $('//span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * moveOption: Up/Down
     */
    async moveStep(stepName, moveOption) {
        await $('//label[contains(.,"' + stepName + '")]/ancestor::mat-list-item//button[@mattooltip="' + moveOption + '"]').click();
        await $('//span[.="Yes"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    /**
     * click (+) button to manage fields
     */
    async manageField() {
        await $('button[mattooltip="Manage"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }    

    /**
     * click (+) button to add new field
     */
    async addField(fieldName, fieldType, isShowGrid) {
        await $('//app-task-custom-filed-manager//mat-icon[.="add_circle"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('(//*[@name="fieldName"])[last()]').setValue(fieldName);
        await $('(//*[@formcontrolname="dataType"])[last()]').click();
        await $('//ng-dropdown-panel//span[.="' + fieldType + '"]').click();
        if (isShowGrid) await $('(//span[contains(normalize-space(),"Show in Grid")])[last()]').click();
    }

    /**
     * save and close
     */
    async saveAndClose() {
        $('//span[.="Save & Close"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));        
    }

    /**
     * open the Task page
     */
    async open() {
        await this.btnAdministration.click()
        await this.btnTaskTemplateMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    
    /**
     * activate a task template
     */
    async activate(taskname) {
        await $('(//label[contains(.,"' + taskname + '")])[1]').click();
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }

     
    /**
     * copy a task template
     */
    async copy(taskname) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('(//label[contains(.,"' + taskname + '")]/parent::div/following-sibling::div/button[2])[1]').click();
        await $('//label[contains(.,"New Template Name")]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Enter']);
        //await browser.acceptAlert();

    }

    /**
     * delete a task template
     */
    async delete(taskname) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let script = "function getElementByXpath(path) { return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}; getElementByXpath('//label[contains(.,\""+taskname+"\")]/parent::div/following-sibling::div/button[1]').click();";
        await browser.execute(script);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Enter']);
        //await browser.acceptAlert();
    }

    /**
     * delete a task template
     */
    async deletecopy(taskname) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        let script = "function getElementByXpath(path) { return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}; getElementByXpath('//label[contains(.,\"Copy - "+taskname+"\")]/parent::div/following-sibling::div/button[1]').click();";
        await browser.execute(script);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await browser.keys(['Tab']);
        await browser.keys(['Tab']);
        await browser.keys(['Enter']);
        //await browser.acceptAlert();
    }
}

module.exports = new TaskTemplateMaintenance();
