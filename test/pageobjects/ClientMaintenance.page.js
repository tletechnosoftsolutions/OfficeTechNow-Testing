

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ClientMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTools() {
        return $('//span[text()="Tools"]');
    }

    get btnClientMaintenance() {
        return $('button[title="Client Maintenance"]');
    }

    /**
    * a method to create a client
    */
    async cancelcreateClient(clientname, clientcode, structure) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="person_add"]').click();
        await $('(//label[.="Client Name"]/following-sibling::input)').setValue(clientname);
        //await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
        await $('(//label[contains(text(),"' + structure + '")])').click();   
        await $('//button[contains(text(),"Cancel")]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
    * a method to create a client with structure
    */
    async createClientWithStructure(clientname, clientcode, structure) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="person_add"]').click();
        await $('(//label[.="Client Name"]/following-sibling::input)').setValue(clientname);
        //await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
        await $('(//label[contains(text(),"' + structure + '")])').click();
        await $('//button/span[text()="Add"]').click();
        await new Promise(resolve => setTimeout(resolve, 6000));
    }

    /**
    * a method to create a client
    */
    async createClient(clientname, clientcode, structure) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="person_add"]').click();
        await $('(//label[.="Client Name"]/following-sibling::input)').setValue(clientname);
        //await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
        await $('//button/span[text()="Add"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
   * a method to add a structure to a client
   */
    async addStructure(clientname, structure) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="account_tree"]').click();
        await $('(//label[contains(text(),"' + structure + '")])').click();
        await $('//button/span[text()="Add"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
    * a method to delete a client
    */
    async deleteClient(clientname) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="delete"]').click();
        await $('//textarea').setValue("delete the tested " + clientname);
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
    * a method to search a client
    */
    async searchClient(clientname) {
        await $('#search-text').setValue(clientname);
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    /**
    * a method to edit/rename a client
    */
    async renameClient(clientOldName, clientNewName, clientNewCode) {
        await $('//td[normalize-space()="' + clientOldName + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('[formcontrolname="clientName"]').setValue(clientNewName);
        //if (clientNewCode != null || clientNewCode != "") await $('[formcontrolname="clientID"]').setValue(clientNewCode);
        await $('//button/span[.="Rename"]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    /**
     * verify popup message
     */
    async isPopupExist(message) {
        return await $('(//snack-bar-container//*[contains(.,"' + message + '")])[last()]').isExisting();
    }

    /**
     * open the Client Maintenance page
     */
    async open() {
        await this.btnTools.click();
        await this.btnClientMaintenance.click();
    }
}

module.exports = new ClientMaintenancePage();
