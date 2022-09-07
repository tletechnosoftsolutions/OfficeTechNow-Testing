
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CabinetSettingsPage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTools() {
        return $('//span[text()="Tools"]');
    }

    get btnCabinetSettings() {
        return $('button[title="Cabinet Settings"]');
    }

     /**
     * add the Cabinet. Param indexType: None, Alphabetic, Numeric, Alpha-Numeric
     */
    async addCabinet(cabinetName, indexType, isSuperadmin, yesNo) {
        await $('//span[normalize-space()="Add Cabinet"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('input[id*=input_folderName]').clearValue();
        await $('input[id*=input_folderName]').setValue(cabinetName);
        await $('//label[contains(.,"Index type")]/following-sibling::*//input').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('//div[@role="option"]/span[normalize-space()="' + indexType + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (isSuperadmin)  { await $('//label[normalize-space()="Enable DCM"]').click();}
        await $('//span[.="Create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!(yesNo == "" || yesNo == null))
            await $('//button[.="' + yesNo + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * delete the Cabinet
     */
    async deleteCabinet(cabinetName) {
        await $('//td[normalize-space()="' + cabinetName + '"]/following-sibling::*//i[.="delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//textarea').setValue("Automation Testing: delete Cabinet");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

     /**
     * rename the Cabinet
     */
    async renameCabinet(cabinetName, newCabinetName) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//td[normalize-space()="' + cabinetName + '"]/following-sibling::*//i[.="create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('input[id*=input_folderName]').clearValue();
        await $('input[id*=input_folderName]').setValue(newCabinetName);
        await $('//*[@role="dialog"]//span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

     /**
     * change Cabinet index type
     */
    async changeIndexType(cabinetName, newIndexType) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//td[normalize-space()="' + cabinetName + '"]/following-sibling::*//i[.="create"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//label[contains(.,"Index type")]/following-sibling::*//input').click();
        await $('//div[@role="option"]/span[normalize-space()="' + newIndexType + '"]').click();
        await $('//*[@role="dialog"]//span[.="Save"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * Get string of sub folders in Cabinet
     */
    async getStringOfSubFolders() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let subfolders_elements = $$('//mat-tree-node[@aria-level="2"]//span[@class="danger"]');
        let subfolders = await subfolders_elements.map(e => e.getText()).join('');
        return subfolders;
    }

    /**
     * verify popup message
     */
    async isPopupExist(message) {
        return await $('(//snack-bar-container//*[contains(.,"' + message + '")])[last()]').isExisting();
    }

    /**
     * open the Cabinet page
     */
    async open() {
        await this.btnTools.click();
        await this.btnCabinetSettings.click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = new CabinetSettingsPage();
