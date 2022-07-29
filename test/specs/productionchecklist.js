const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');

describe('Login', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('tssadmin', 'Abc@12345');
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



