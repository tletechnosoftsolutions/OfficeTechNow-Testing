
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class StructureMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTools() {
        return $('//span[text()="Tools"]');
    }

    get btnStructureMaintenance() {
        return $('button[title="Structure Maintenance"]');
    }
   /**
   * a method to add a folder or sub-folder
   */
    async addFolder(mainFolderName, isSubFolder, newFolderIndex) {
        let temp = isSubFolder ? "Sub " : "";
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        await $('//span[contains(.,"Add ' + temp + 'Folder")]/parent::button').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('#folderName').setValue(isSubFolder + " Folder " + newFolderIndex);
        await $('//span[.="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

   /**
   * a method to add 01 new folder and 02 new sub folders
   */
    async addFolders(mainFolderName) {
        this.addFolder(mainFolderName, true, 1);
        this.addFolder(mainFolderName, true, 2);
        this.addFolder(mainFolderName, false, 2);
    }

   /**
   * a method to set folder color
   */
    async setFolderColor(mainFolderName) {
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        await $('//span[normalize-space()="Set Folder Colour"]').click();
        await $('[title=Macaroni]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
   * a method to clone folder
   */
    async cloneFolder(mainFolderName) {
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        await $('//span[normalize-space()="Clone Folder"]').click();
        await $('//span[.="Clone"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
   * a method to rename folder
   */
    async renameFolder(mainFolderName, newFolderName) {
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        await $('//span[normalize-space()="Rename Folder"]').click();
        await $('#folderName').setValue(newFolderName);
        await $('//span[.="Rename"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

   /**
   * a method to delete folder
   */
    async deleteFolder(mainFolderName) {
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        await $('//span[normalize-space()="Delete Folder"]').click();
        await $('[formcontrolname=reason]').setValue("Testing deleting folder");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
   * a method to add new template
   */
    async selectTemplate(templatename) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[contains(.,"'+templatename+'")]').click();
    }

    async renameTemplate(templatename, newTemplatename) { 
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[contains(.,"' + templatename + '")]').click();
        await $('//button[contains(.,"Rename")]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//input[contains(@placeholder,"Enter Name")]').setValue(newTemplatename);
        await $('(//button[contains(.,"Rename")])[2]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        
    }

    /**
   * a method to add new template
   */
    async checkFolderFunctions(templatename, mainFolderName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[contains(.,"' + templatename+'")]').click();
        await $('//span[normalize-space()="' + mainFolderName + '"]/parent::button').click({ button: 'right' });
        
        
    }

    async applyCabinets(templatename, cabinet1, cabinet2){ 
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[contains(.,"' + templatename + '")]').click();
        await $('//div[contains(.,"' + cabinet1 + '") and @class="d-flex row-item ng-star-inserted"]/div/mat-checkbox').click();
        await $('//div[contains(.,"' + cabinet2 + '") and @class="d-flex row-item ng-star-inserted"]/div/mat-checkbox').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button[.="Save"]').click();
       
    }

   /**
   * a method to add new template
   */
    async addNewTemplate(templatename) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//*[contains(.,"New template")]/parent::button').click();
        await $('input[id*=input_templateName]').setValue(templatename);
        await $('//span[.="Create"]').click();
        /*
        //Check folder's function
        this.addFolders("New Folder");
        expect($('//span[normalize-space()="Sub Folder 1"]/ancestor::mat-tree-node[@aria-level="2"]')).toBeExisting();
        expect($('//span[normalize-space()="Sub Folder 2"]/ancestor::mat-tree-node[@aria-level="2"]')).toBeExisting();
        expect($('//span[normalize-space()="Folder 2"]/ancestor::mat-tree-node[@aria-level="1"]')).toBeExisting();

        this.setFolderColor("New Folder");
        expect($('//span[normalize-space()="New Folder"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
        
        this.cloneFolder("New Folder");
        expect($('//span[normalize-space()="Clone of New Folder"]')).toBeExisting();

        this.renameFolder("New Folder", "Folder 1");
        expect($('//span[normalize-space()="Folder 1"]')).toBeExisting();

        this.deleteFolder("Folder 2");
        expect($('//span[normalize-space()="Folder 2"]')).not.toBeExisting();
        */
    }

     /**
     * tick on Clients' radio box in Cabinet table
     */
    async tickOnClient() {
        await $('//div[normalize-space()="Clients"]/preceding-sibling::div//input/parent::span').click();
    }

     /**
     * save template
     */
    async saveTemplate() {
        await $('//span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnTools.click();
        await this.btnStructureMaintenance.click();
    }
}

module.exports = new StructureMaintenancePage();
