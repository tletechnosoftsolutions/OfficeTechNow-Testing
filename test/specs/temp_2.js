const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');
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
    let fileName = "testfile.xlsx";
    it('tc001 Verify that', async () => {
        //Verify Read permission (No move/delete permission)
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.createNewGroup(groupName);
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnUser(accountA);
        await IntrayAccessControlPage.tickOnPermission("Read");
        await IntrayAccessControlPage.tickOnIntray(superadmin);
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        //await expect($('[mattooltip="Delete"]')).not.toBeExisting();
        //await expect($('[mattooltip="Move To"]')).not.toBeExisting();
        await LoginPage.logout();

        //Verify Write permission (Can move, no delete permission)
        await LoginPage.login(superadmin, password);
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnPermission("Write");
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        //await expect($('[mattooltip="Delete"]')).not.toBeExisting(); //File cannot be deleted
        await expect($('[mattooltip="Move To"]')).toBeExisting(); //File can be moved
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.moveTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();
        await LoginPage.logout();

        //Verify Delete permission (Can delete files)
        await LoginPage.login(superadmin, password);
        await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnPermission("Delete");
        await IntrayAccessControlPage.save();
        await LoginPage.logout();

        await LoginPage.login(accountA, password);
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.delete();
        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
    });
});