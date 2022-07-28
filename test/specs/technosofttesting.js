const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";

describe('Login', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('tssadmin3', 'Abc@12345');
        await expect($('//span[text()="Home"]')).toBeExisting();
    });
});


describe('Cabinets/ Favourites page', () => {
    
    it('tc001 Verify that user can access Cabinets page / Favourites page in the Home tab and see all cabinets in the Cabinets page and some cabinets that are added to the Favourites page', async () => {
        //Cabinet
        await CabinetPage.open();
        await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
        await expect($('button[aria-label= "toggle Development Cabinet"]')).toBeExisting();
        await CabinetPage.expandCabinet("Clients");
        await expect($('button[aria-label="toggle A"]')).toBeExisting();

        //Favourites
        await FavouritesPage.open();
        await expect($('button[aria-label= "toggle A New Client Aug 2016-1152"]')).toBeExisting();
        await FavouritesPage.expandFavourites("A New Client Aug 2016-1152");
        await expect($('button[aria-label="toggle 2021"]')).toBeExisting();

    });
  
    it('tc002 - Verify that in all cabinets and Clients/Prospects/DCM folders and cabinets, the floating button has only one option Add Task', async () => {
        //open Cabinet
        await CabinetPage.open();

        //1.Create tasks folder Clients
        await CabinetPage.expandCabinet('Clients');
        await CabinetPage.createTask()
        //Create tasks Clients - folder A
        await CabinetPage.expandCabinet("A")
        await CabinetPage.createTask()
        //Collap All cabinets
        await CabinetPage.collapCabinet('A');
        await CabinetPage.collapCabinet('Clients');


        //2.Create tasks folder Development Cabinet
        await CabinetPage.expandCabinet('Development Cabinet');
        await CabinetPage.createTask()
        //Collap All cabinets
        await CabinetPage.collapCabinet('Development Cabinet');


        //3.Create tasks folder Prospects
        await CabinetPage.expandCabinet('Prospects');
        await CabinetPage.createTask()
        //Create tasks Clients - folder A
        await CabinetPage.expandCabinet("A")
        await CabinetPage.createTask()
        //Collap All cabinets
        await CabinetPage.collapCabinet('A');
        await CabinetPage.collapCabinet('Prospects');
    });

});


describe('Intrays page', () => {

    it('tc001 Verify that the user can access In-Trays page in the Home tab and the current users Intray will be highlighted by default and displayed at the top in Intray / Folder Browser / File Browser / Save form', async () => {
        //Intrays
        await InTraysPage.open();
        await expect($('//span[text()= " tssadmin "]')).toBeExisting();

    });
});

describe('File', () => {
    it('tc001 Verify the Create QuickNote popup will display when clicking on Floating button > Create quicknote button', async () => {
        //Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinetToChild("Clients");
        await CabinetPage.createQuickNote()
        await CabinetPage.collapCabinet('Clients');

    });
});
describe('Client Maintenance', () => {

    it('tc001 Verify the user can see and access the Client Maintenance page to Add a new client', async () => {
        //open Client Maintenance Page
        await ClientMaintenancePage.open();
        await expect($('//button//i[.="person_add"]')).toBeExisting();
    });

    it('tc002 Verify that user can input client name or Client code, All name/code that has those letters appear in the client list without clicking any button', async () => {
        //open Client Maintenance Page
        clientname = "Automation" + new Date().getTime();
        clientcode = new Date().getTime();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClientWithStructure(clientname, clientcode, structure);
        await expect($('//td[contains(.,"' + clientname + '")]')).toBeExisting();
        await ClientMaintenancePage.deleteClient(clientname);     
    });
    
    it('tc003 Verify that user can apply Folder Structure for the client folder, It should display correct all folder structure applied', async () => {
        //open Client Maintenance Page
        clientname = "Automation" + new Date().getTime();
        clientcode = new Date().getTime();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClient(clientname, clientcode);
        await expect($('//td[contains(.,"' + clientname + '")]')).toBeExisting();
        await ClientMaintenancePage.addStructure(clientname, structure);
        //Verify the folder structure of the created client
        await CabinetPage.open();
        await CabinetPage.openQuickFind(clientname);
        await expect($('(//span[contains(text(),"2021")])')).toBeExisting();
        await expect($('(//span[contains(text(),"2022")])')).toBeExisting();
    });


    it('tc003 Verify that user can delete the client', async () => {
        //open Client Maintenance Page
        clientname = "Automation" + new Date().getTime();
        clientcode = new Date().getTime();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClientWithStructure(clientname, clientcode, structure);
        await expect($('//td[contains(.,"' + clientname + '")]')).toBeExisting();
        await ClientMaintenancePage.deleteClient(clientname);
        await expect($('//td[contains(.,"' + clientname + '")]')).not.toBeExisting();
        let deleted = await $('//td[contains(.,"' + clientname + '")]').isExisting();
    });

    it('tc004 Verify that user can rename the client folder, Client folder is renamed will update in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
        //create client
        clientname = "Automation" + new Date().getTime();
        clientcode = new Date().getTime();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClientWithStructure(clientname, clientcode, structure);
        //rename folder
        await CabinetPage.open();
        await CabinetPage.openQuickFind(clientname);
        await CabinetPage.expandCabinet('2021');
        await CabinetPage.renameFolder('Emails', 'Renamed Emails');
        await expect($('(//span[contains(.,"Renamed Emails")])[1]')).toBeExisting();
        await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
        await CabinetPage.expandCabinet('A');
        await CabinetPage.expandCabinet(clientname);
        await CabinetPage.expandCabinet('2021');
        await expect($('(//span[contains(.,"Renamed Emails")])[1]')).toBeExisting();
    });

    it('tc005 Verify that user can delete the client folder, Client folder is deleted will not display in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
         //create client
        clientname = "Automation" + new Date().getTime();
        clientcode = new Date().getTime();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClientWithStructure(clientname, clientcode, structure);
        //delete folder
        await CabinetPage.open();
        await CabinetPage.openQuickFind(clientname);
        await CabinetPage.expandCabinet('2022');
        await CabinetPage.deleteFolder('2022');
        await expect($('(//span[contains(.,"2022")])[1]')).not.toBeExisting();
    });
});


describe('Search quick find', () => {
    it('tc001 Verify that user can see search quick find field on all pages', async () => {
        for (let i = 1; i <= 7; i++) {
            await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
        }

        await $('#Tools-link').click();
        for (let i = 1; i <= 6; i++) {
            await $('(//*[@id="Tools"]//button[contains(@class,"toolbar")])[' + i + ']').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
        }

        await $('#Administration-link').click();
        for (let i = 1; i <= 14; i++) {
            if (i == 13) continue;
            await $('(//*[@id="Administration"]//button[contains(@class,"toolbar")])[' + i + ']').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
        }

        await $('//*[@id="Audit Trail-link"]').click();
        for (let i = 1; i <= 7; i++) {
            await $('(//*[@id="Audit Trail"]//button[contains(@class,"toolbar")])[' + i + ']').click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
        }
    });

  });

describe('Logout', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.logout();
    });
});




