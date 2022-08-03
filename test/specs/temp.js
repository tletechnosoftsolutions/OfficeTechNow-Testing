const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenance = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const TaskPage = require('../pageobjects/task.page');

const { exec } = require("child_process");
const ks = require('node-key-sender');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();

const superadmin = 'tssadmin3';
const user = 'tle@technosoftsolutions.com.au';

describe('Login', () => {
    it('should login with valid credentials', async () => {
       await LoginPage.open();
      await LoginPage.login(superadmin, 'Abc@12345');
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
        await expect($('//span[text()="Home"]')).toBeExisting();
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
    //    await CabinetAccessControlPage.open();
    //    await CabinetAccessControlPage.searchUser('tssadmin3');
    //    await CabinetAccessControlPage.checkCabinet('Clients');
    //    await CabinetAccessControlPage.checkCabinet('Development Cabinet');
    //    await CabinetAccessControlPage.checkCabinet('Prospects');
    //    await CabinetAccessControlPage.save();

    //    await CabinetPage.open();
    //    await new Promise(resolve => setTimeout(resolve, 1000));
    //    await expect($('//button[@aria-label="toggle Clients"]')).not.toBeExisting();
    //    await expect($('//button[@aria-label="toggle Development Cabinet"]')).not.toBeExisting();
    //    await expect($('//button[@aria-label="toggle Prospects"]')).not.toBeExisting();

    //    await CabinetAccessControlPage.postCondition('tssadmin3');
    //});
     //it('tc002 Verify that the user cannot find cabinets that are not provided permission to READ. Do not show those cabinets on the result list when using Quick Find fields to find cabinets (on main page, file browser, save form, complete a task)', async () => {
     //   await CabinetAccessControlPage.open();
     //   await CabinetAccessControlPage.searchUser('tle@technosoftsolutions.com.au');
     //   await CabinetAccessControlPage.checkCabinet('Clients');
     //   await CabinetAccessControlPage.checkCabinet('Development Cabinet');
     //   await CabinetAccessControlPage.checkCabinet('Prospects');
     //   await CabinetAccessControlPage.save();

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

     //    await CabinetAccessControlPage.postCondition('tle@technosoftsolutions.com.au');


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



//describe('Structure Maintenance', () => {
//	//TC001->TC004->TC003->TC005
//	it('tc001 Verify the user can see and access the Structure Maintenance page to add a new template when user has “Structure Maintenance” permission checked on the Group & Permission Maintenance', async () => {
//		await StructureMaintenancePage.open();
//		await StructureMaintenancePage.addNewTemplate(templatename);
//		await StructureMaintenancePage.saveTemplate();

//	});

//	it('tc004 Verify that user can see list of the action in contextual menu: Set Folder Colour, Add Folder, Add Sub Folder, Clone Folder, Delete Folder, Rename Folder and do it when right-clicking a Folder structure', async () => {
//        await LoginPage.reload();
//        await StructureMaintenancePage.open();
//		await StructureMaintenancePage.checkFolderFunctions(templatename, "New Folder");
//		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
//		await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
//		await expect($('//span[contains(.,"Add Sub Folder")]')).toBeExisting();
//		await expect($('//span[contains(.,"Clone Folder")]')).toBeExisting();
//		await expect($('//span[contains(.,"Delete Folder")]')).toBeExisting();
//		await expect($('//span[contains(.,"Rename Folder")]')).toBeExisting();
//	});


//	it('tc003 Verify that user can select any of available template structure to rename ', async () => {
//		await LoginPage.reload();
//		await StructureMaintenancePage.open();
//		await StructureMaintenancePage.renameTemplate(templatename, newTemplatename);
//		await expect($('//label[contains(.,"' + newTemplatename + '")]')).toBeExisting();
//	});


//	it('tc005 Verify that user can apply one or multiple cabinets to the Structure template ', async () => {
//		await LoginPage.reload();
//		await StructureMaintenancePage.open();
//		await StructureMaintenancePage.applyCabinets(newTemplatename, "Clients", "Prospects");
//		await expect($('//span[contains(.,"Change(s) on mapping the structure to cabinet(s) has been updated successfully")]')).toBeExisting();
//	});
//});

//describe('Cabinet Settings', () => {
//    it('tc001 Verify the user can see and access the Cabinet Setting page to add a new cabinet', async () => {
//        await CabinetSettingsPage.open();
//        await expect($('//td[normalize-space()="Clients"]')).toBeExisting();
//        await expect($('//td[normalize-space()="Prospects"]')).toBeExisting();
//    });


//    it('tc002 Verify that user can see created cabinet in Cabinet list, Cabinet Settings after user apllied Read permission for it on the CAC page', async () => {
//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.addCabinet(cabinet_name, "None");

//        await CabinetAccessControlPage.open();
//        await CabinetAccessControlPage.checkCabinet(cabinet_name);
//        await CabinetAccessControlPage.save();

//        await CabinetPage.open();
//        await expect($('(//span[normalize-space()="' + cabinet_name + '"])[last()]')).toBeExisting();

//        await CabinetSettingsPage.open();
//        await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
//    });

//    it('tc005 Verify that user can select any of the available cabinet name to apply index type', async () => {
//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alphabetic");

//        await CabinetPage.open();
//        await CabinetPage.expandCabinet(cabinet_name);
//        let str = await CabinetSettingsPage.getStringOfSubFolders();
//        await expect(str.includes("#ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);

//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.changeIndexType(cabinet_name, "Numeric");

//        await CabinetPage.open();
//        await CabinetPage.expandCabinet(cabinet_name);
//        let str2 = await CabinetSettingsPage.getStringOfSubFolders();
//        await expect(str2.includes("+0123456789")).toEqual(true);

//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alpha-Numeric");

//        await CabinetPage.open();
//        await CabinetPage.expandCabinet(cabinet_name);
//        let str3 = await CabinetSettingsPage.getStringOfSubFolders();
//        await expect(str3.includes("+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);
//    });


//    it('tc003 Verify that user can select any of the available cabinet name to rename', async () => {
//        await CabinetSettingsPage.open();
//        await CabinetSettingsPage.renameCabinet(cabinet_name, new_cabinet_name);
//        await expect($('//td[normalize-space()="' + new_cabinet_name +'"]')).toBeExisting();
//    });

//    //it('tc004 Verify that user can select any of the available cabinet name to delete, The deleted cabinet will be removed from the cabinet Setting and not displayed in Cabinet list/Structure Maintennance/ Cabinet Access Control/ Search page', async () => {
//    //    let cabinet_name = "Renamed Testing Cabinet";
//    //    await CabinetSettingsPage.open();
//    //    await CabinetSettingsPage.deleteCabinet(cabinet_name);
//    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

//    //    await CabinetAccessControlPage.open();
//    //    await expect($('//div[normalize-space()="' + cabinet_name + '"]/preceding-sibling::div//input/parent::span')).not.toBeExisting();

//    //    await CabinetPage.open();
//    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

//    //    await $('//input[@placeholder="Quick Find"]').setValue(cabinet_name);
//    //    expect($('//span[contains(.,"Cabinet: '+cabinet_name +'")]')).not.toBeExisting();

//    //    await StructureMaintenancePage.open();
//    //    expect($('(//div[contains(.,"' + cabinet_name + '")])[last()]')).not.toBeExisting();
//    //});
//});


describe('Task', () => {
    it('tc001 Verify that user can create a new task by clicking Create Task button', async () => {
        await TaskPage.open();
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeExisting();
    });

    it('tc003 Verify that user can select one or multiple the task(s) to reassign to another user in the Task list', async () => {
        let assignee = "tssadmin4";
        //Pre-condition: create 02 tasks
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        //Reassign
        await TaskPage.tickOnTasks();
        await TaskPage.reassignTask(assignee);
        expect($('app-datatable tbody')).toBeElementsArrayOfSize(0);
        await LoginPage.logout();
        await LoginPage.login(assignee, "Abc@12345");
        await TaskPage.open();
        expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeElementsArrayOfSize(2);
        //Post-condition: relog to current account
        await LoginPage.logout();
        await LoginPage.login("tssadmin3", "Abc@12345");
    });

    it('tc004 Verify that user can create a new task by clicking Create Task button', async () => {
        //Pre-condition: create 01 task
        await TaskPage.open();
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        await TaskPage.goToClient();
        expect($('[aria-label="toggle Automation"]')).toBeExisting();
    });

    it('tc005 Verify that the data in task filtered will deleted when Clicking on Clear All button on Task list', async () => {
        await TaskPage.open();
        await TaskPage.fulfilldata();
        await TaskPage.clearAll();
        let isZero = await TaskPage.isEmptyFields();
        await expect(isNaN(isZero) ? true : false).toEqual(true);
    });

    /*need to fix subjet dropdown list*/
    it('tc007 Verify that the ott file will be created in the selected location when user complete a task', async () => {
        //Pre-condition: create 01 completed task
        await LoginPage.reload();
        await TaskPage.open();
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        await TaskPage.changeStatus("Complete");
        await TaskPage.openTask('Task: Automation -- Business -- ',' -- Complete');
        await TaskPage.saveAndClose();
        await TaskPage.saveToOfficeNow();
        let today = new Date().getFullYear()+'.'+ ("0" + (new Date().getMonth() + 1)).slice(-2)+'.'+("0" + (new Date().getDate())).slice(-2);
        await expect($('//span[contains(.,"Business.ott") and contains(.,"'+today+'")]')).toBeExisting();      
        await TaskPage.switchWindow('OTNOW-Develop');
    });

     it('tc002 Verify that user can select one or multiple task(s) in the Task list to delete', async () => {
        //Pre-condition: create 01 task
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        //Delete selected tasks
        await TaskPage.tickOnTasks();
        await TaskPage.deleteTask();
        expect($('app-datatable tbody')).toBeElementsArrayOfSize(0);
    });
});

