const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenance = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControl = require('../pageobjects/cabinetAccessControl.page');

const { exec } = require("child_process");
const ks = require('node-key-sender');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;

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

// describe('File', () => {

    //it('tc002 Verify the Upload File(s) popup will display when clicking on Floating button > Upload button', async () => {
    //    //Cabinet
    //    await CabinetPage.open();
    //    await CabinetPage.expandCabinetToChild("Clients");
    //    await CabinetPage.uploadFileSystem('testfile_xlsx_1.7MB.xlsx')
    //    await expect($('(//span[contains(.,"testfile_xlsx")])[1]')).toBeExisting();

    //    /*
    //    exec("dir", (error, stdout, stderr) => {
    //        if (error) {
    //            console.log(`error: ${error.message}`);
    //            return;
    //        }
    //        if (stderr) {
    //            console.log(`stderr: ${stderr}`);
    //            return;
    //        }
    //        console.log(`stdout: ${stdout}`);
    //    });

    //    await ks.sendText('a');
    //    await ks.sendKey('enter');
    //    */
    //});

    //it('tc004 Verify that user can rename the client folder, Client folder is renamed will update in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
    //    //let clientname = 'Automation1658820485916';
    //    await CabinetPage.open();
    //    await CabinetPage.openQuickFind(clientname);
    //    await CabinetPage.expandCabinet('2021');
    //    await CabinetPage.renameFolder('Emails', 'Renamed Emails');
    //    await expect($('(//span[contains(.,"Renamed Emails")])[1]')).toBeExisting();
    //    await CabinetPage.open();
    //    await CabinetPage.expandCabinet('Clients');
    //    await CabinetPage.expandCabinet('A');
    //    await CabinetPage.expandCabinet(clientname);
    //    await CabinetPage.expandCabinet('2021');
    //    await expect($('(//span[contains(.,"Renamed Emails")])[1]')).toBeExisting();
    //});

    //it('tc005 Verify that user can delete the client folder, Client folder is deleted will not display in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
    //    //let clientname = 'Automation1658820485916';
    //    await CabinetPage.open();
    //    await CabinetPage.openQuickFind(clientname);
    //    await CabinetPage.expandCabinet('2022');
    //    await CabinetPage.deleteFolder('2022');
    //    await expect($('(//span[contains(.,"2022")])[1]')).not.toBeExisting();
    //});

    //it('tc001 Verify that user can see search quick find field on all pages', async () => {
    //    for (let i = 1; i <= 7; i++) {
    //        await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
    //        await new Promise(resolve => setTimeout(resolve, 1000));
    //        await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
    //    }

    //    await $('#Tools-link').click();
    //    for (let i = 1; i <= 6; i++) {
    //        await $('(//*[@id="Tools"]//button[contains(@class,"toolbar")])[' + i + ']').click();
    //        await new Promise(resolve => setTimeout(resolve, 1000));
    //        await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
    //    }

    //    await $('#Administration-link').click();
    //    for (let i = 1; i <= 14; i++) {
    //        if (i == 13) continue;
    //        await $('(//*[@id="Administration"]//button[contains(@class,"toolbar")])[' + i + ']').click();
    //        await new Promise(resolve => setTimeout(resolve, 1000));
    //        await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
    //    }

    //    await $('//*[@id="Audit Trail-link"]').click();
    //    for (let i = 1; i <= 7; i++) {
    //        await $('(//*[@id="Audit Trail"]//button[contains(@class,"toolbar")])[' + i + ']').click();
    //        await new Promise(resolve => setTimeout(resolve, 1000));
    //        await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
    //    }
    //});

    //it('tc002 Verify that the user cannot find cabinets that are not provided permission to READ. Do not show those cabinets on the result list when using Quick Find fields to find cabinets (on main page, file browser, save form, complete a task)', async () => {
    //    await CabinetAccessControl.open();
    //    await CabinetAccessControl.searchUser('tssadmin3');
    //    await CabinetAccessControl.checkCabinet('Clients');
    //    await CabinetAccessControl.checkCabinet('Development Cabinet');
    //    await CabinetAccessControl.checkCabinet('Prospects');
    //    await CabinetAccessControl.save();

    //    await CabinetPage.open();
    //    await new Promise(resolve => setTimeout(resolve, 1000));
    //    await expect($('//button[@aria-label="toggle Clients"]')).not.toBeExisting();
    //    await expect($('//button[@aria-label="toggle Development Cabinet"]')).not.toBeExisting();
    //    await expect($('//button[@aria-label="toggle Prospects"]')).not.toBeExisting();

    //    await CabinetAccessControl.postCondition('tssadmin3');
    //});
     //it('tc002 Verify that the user cannot find cabinets that are not provided permission to READ. Do not show those cabinets on the result list when using Quick Find fields to find cabinets (on main page, file browser, save form, complete a task)', async () => {
     //   await CabinetAccessControl.open();
     //   await CabinetAccessControl.searchUser('tle@technosoftsolutions.com.au');
     //   await CabinetAccessControl.checkCabinet('Clients');
     //   await CabinetAccessControl.checkCabinet('Development Cabinet');
     //   await CabinetAccessControl.checkCabinet('Prospects');
     //   await CabinetAccessControl.save();

     //   //login with different account
     //   await LoginPage.open();
     //    await LoginPage.logout();
     //    await LoginPage.open();
     //   await LoginPage.login('tle@technosoftsolutions.com.au', 'Abc@12345');
     //    await expect($('//span[text()="Home"]')).toBeExisting();

     //   await CabinetPage.open();
     //   await new Promise(resolve => setTimeout(resolve, 1000));
     //   await expect($('//button[@aria-label="toggle Clients"]')).not.toBeExisting();
     //   await expect($('//button[@aria-label="toggle Development Cabinet"]')).not.toBeExisting();
     //   await expect($('//button[@aria-label="toggle Prospects"]')).not.toBeExisting();

     //    await CabinetAccessControl.postCondition('tle@technosoftsolutions.com.au');


     //   //login again
     //   await LoginPage.open();
     //   await LoginPage.logout();
     //   await LoginPage.open();
     //    await LoginPage.login('tssadmin3', 'Abc@12345');
     //});

//describe('File', () => {
//    it('tc001 Verify the Create QuickNote popup will display when clicking on Floating button > Create quicknote button', async () => {
//        //Cabinet
//        await CabinetPage.open();
//        await CabinetPage.expandCabinet('Clients');
//        await CabinetPage.expandCabinet("A")
//        await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
//        await CabinetPage.expandCabinet('2021');
//        await CabinetPage.createQuickNote()
//       await CabinetPage.collapCabinet('Clients');

//    });



describe('Structure Maintenance', () => {
	//TC001->TC004->TC003->TC005
	it('tc001 Verify the user can see and access the Structure Maintenance page to add a new template when user has “Structure Maintenance” permission checked on the Group & Permission Maintenance', async () => {
		await StructureMaintenance.open();
		await StructureMaintenance.addNewTemplate(templatename);
		await StructureMaintenance.saveTemplate();

	});

	it('tc004 Verify that user can see list of the action in contextual menu: Set Folder Colour, Add Folder, Add Sub Folder, Clone Folder, Delete Folder, Rename Folder and do it when right-clicking a Folder structure', async () => {
        await LoginPage.open();
        await StructureMaintenance.open();
		await StructureMaintenance.checkFolderFunctions(templatename, "New Folder");
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
		await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
		await expect($('//span[contains(.,"Add Sub Folder")]')).toBeExisting();
		await expect($('//span[contains(.,"Clone Folder")]')).toBeExisting();
		await expect($('//span[contains(.,"Delete Folder")]')).toBeExisting();
		await expect($('//span[contains(.,"Rename Folder")]')).toBeExisting();
	});


	it('tc003 Verify that user can select any of available template structure to rename ', async () => {
		await LoginPage.open();
		await StructureMaintenance.open();
		await StructureMaintenance.renameTemplate(templatename, newTemplatename);
		await expect($('//label[contains(.,"' + newTemplatename + '")]')).toBeExisting();
	});


	it('tc005 Verify that user can apply one or multiple cabinets to the Structure template ', async () => {
		await LoginPage.open();
		await StructureMaintenance.open();
		await StructureMaintenance.applyCabinets(newTemplatename, "Clients", "Prospects");
		await expect($('//span[contains(.,"Change(s) on mapping the structure to cabinet(s) has been updated successfully")]')).toBeExisting();
	});
});

describe('Cabinet Settings', () => {
        
});