

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
        await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
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
        await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
        await $('(//label[contains(text(),"' + structure + '")])').click();
        await $('//button/span[text()="Add"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
    * a method to create a client
    */
    async createClient(clientname, clientcode, structure) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="person_add"]').click();
        await $('(//label[.="Client Name"]/following-sibling::input)').setValue(clientname);
        await $('(//label[.="Client Code"]/following-sibling::input)').setValue(clientcode);
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
    * a method to create a client
    */
    async deleteClient(clientname) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await $('//button//i[.="delete"]').click();
        await $('//textarea').setValue("delete the tested" + clientname);
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
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
