const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');

const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');

const FavoritePage = require('../pageobjects/favourites.page');
const IntrayPage = require('../pageobjects/intray.page');
const { exec } = require('node:child_process');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;

describe('Login', () => {
    it('should login with valid credentials', async () => {
       await LoginPage.open();
      if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
    });
});


describe('CAC/IAC', () => {
    let groupName = "Automation" + new Date().getTime();
    let accountA = "tssadmin4";

    it('tc005 Verify that user can see/ copy file into Cabinet list in Home/ Favourite of the Folder Browser when user belongs to group that has Write permission checked CAC page', async () => {
        //Pre-condition: set automation group with permission = Write
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet("Write");
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        //Check file can be copied from Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.focusOn("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        await CabinetPage.copyTo(); //Copy to folder: Cabinet/Automation/2022/Emails
        await CabinetPage.collapCabinet("2021");
        await CabinetPage.expandCabinet("2022");
        await CabinetPage.expandCabinet("Emails");
        //verify file successfully copied
        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).toBeExisting();

        //Check file can be copied from Favorite
        await FavoritePage.open();
        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
        await FavoritePage.expandFavourites("2021");
        await FavoritePage.focusOn("Business");
        await FavoritePage.tickOnFile("Endorsement");
        await FavoritePage.copyTo();
        await FavoritePage.collapFavourites("2021");
        await FavoritePage.expandFavourites("2022");
        await FavoritePage.focusOn("Business");
        //verify file successfully copied
        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).toBeExisting();

        //Post-condition: login back to main account
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
    });

    it('tc006 Verify that user can see/ move file into Cabinet list in Home/ Favourite/ Intray of the Folder Browser when user belongs to group that has Delete permission checked.', async () => {
        //Pre-condition: set automation group with permission = Delete, exist copies of documents in TC005
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet("Delete"); //tick on Read permission
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        //Check file can be deleted in Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2022");
        await CabinetPage.focusOn("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        await CabinetPage.deleteFile();
        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).not.toBeExisting();

        //Check file can be deleted in Favorite
        await FavoritePage.open();
        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
        await FavoritePage.expandFavourites("2022");
        await FavoritePage.focusOn("Business");
        await FavoritePage.tickOnFile("Endorsement");
        await FavoritePage.deleteFile();
        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).not.toBeExisting();
    });
});