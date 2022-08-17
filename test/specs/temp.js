const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenance = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const TaskPage = require('../pageobjects/task.page');
const TaskTemplateMaintenancePage = require('../pageobjects/taskTemplateMaintenance.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const SystemAdminWizardPage = require('../pageobjects/systemAdminWizard.page');
const HomePageMaintenancePage = require('../pageobjects/homepagemaintenance.page');
const AuditTrailPage = require('../pageobjects/auditTrail.page');
const FavoritePage = require('../pageobjects/favourites.page');
const IntrayPage = require('../pageobjects/intray.page');
const { exec } = require('node:child_process');
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;

var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

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


//describe('MS Applications Integration', () => {
//    it('tc001 Verify that user can open a new MS word document, The system should open MS applications with blank page(s) instead of template(s)', async () => {
//        let app = "C:\\Sikuli\\sikulixide-2.0.5-win.jar -r C:\\Sikuli\\word.sikuli -f C:\\Sikuli\\word.log"
//        await exec(app, (error, stdout, stderr) => {
//          if (error) {
//            console.error(`exec error: ${error}`);
//            return;
//          }
//          console.log(`stdout: ${stdout}`);
//          //console.error(`stderr: ${stderr}`);
//        });
//        await new Promise(resolve => setTimeout(resolve, 10000));
//    });

//    it('tc002 Verify that user can open a new MS excel document, The system should open MS applications with blank page(s) instead of template(s)', async () => {
//        let app = "C:\\Sikuli\\sikulixide-2.0.5-win.jar -r C:\\Sikuli\\excel.sikuli -f C:\\Sikuli\\excel.log"
//        await exec(app, (error, stdout, stderr) => {
//          if (error) {
//            console.error(`exec error: ${error}`);
//            return;
//          }
//          console.log(`stdout: ${stdout}`);
//          //console.error(`stderr: ${stderr}`);
//        });
//        await new Promise(resolve => setTimeout(resolve, 10000));
//    });
//});

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


//describe('Task', () => {
//    it('tc001 Verify that user can create a new task by clicking Create Task button', async () => {
//		await LoginPage.reload();
//		await TaskPage.open();
//        await TaskPage.createTask();
//        await TaskPage.saveAndClose();
//        expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeExisting();
//    });

//	it('tc003 Verify that user can select one or multiple the task(s) to reassign to another user in the Task list', async () => {
//		if (isSuperadmin) { 
//			let assignee = superadmin2;
//			//Pre-condition: create 02 tasks
//			await TaskPage.createTask();
//			await TaskPage.saveAndClose();
//			await TaskPage.createTask();
//			await TaskPage.saveAndClose();
//			//Reassign
//			await TaskPage.tickOnTasks();
//			await TaskPage.reassignTask(assignee);
//			expect($('app-datatable tbody')).toBeElementsArrayOfSize(0);
//			await LoginPage.logout();
//			await LoginPage.login(assignee, "Abc@12345");
//			await TaskPage.open();
//			expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeElementsArrayOfSize(2);
//			//Post-condition: relog to current account
//			await LoginPage.logout();
//			await LoginPage.login(superadmin, "Abc@12345");
//		}
//    });

//    it('tc004 Verify that user can create a new task by clicking Create Task button', async () => {
//        //Pre-condition: create 01 task
//        await TaskPage.open();
//        await TaskPage.createTask();
//        await TaskPage.saveAndClose();
//        await TaskPage.goToClient();
//        expect($('[aria-label="toggle Automation"]')).toBeExisting();
//    });

//    it('tc005 Verify that the data in task filtered will deleted when Clicking on Clear All button on Task list', async () => {
//		if (isSuperadmin) {
//			await TaskPage.open();
//			await TaskPage.fulfilldata();
//			await TaskPage.clearAll();
//			let isZero = await TaskPage.isEmptyFields();
//			await expect(isNaN(isZero) ? true : false).toEqual(true);
//		}
//    });

//    /*need to fix subjet dropdown list*/
//    it('tc007 Verify that the ott file will be created in the selected location when user complete a task', async () => {
//        //Pre-condition: create 01 completed task
//        await LoginPage.reload();
//        await TaskPage.open();
//        await TaskPage.createTask();
//        await TaskPage.saveAndClose();
//        await TaskPage.changeStatus("Complete");
//        await TaskPage.openTask('Task: Automation -- Business -- ',' -- Complete');
//        await TaskPage.saveAndClose();
//        await TaskPage.saveToOfficeNow();
//        let today = new Date().getFullYear()+'.'+ ("0" + (new Date().getMonth() + 1)).slice(-2)+'.'+("0" + (new Date().getDate())).slice(-2);
//        await expect($('//span[contains(.,"Business.ott") and contains(.,"'+today+'")]')).toBeExisting();      
//        await TaskPage.switchWindow('OTNOW-Develop');
//        if (isSuperadmin) {
//            await LoginPage.reload();
//            await TaskPage.open();
//			await TaskPage.search();
//			await expect($('(//td[contains(.,"Automation -- Business")])[1]')).toBeExisting();
//		}
//    });

//    it('tc008 Verify that user can search task when entering data search all task fields', async () => {
//        if (isSuperadmin) {
//            await LoginPage.reload();
//            await TaskPage.open();
//            await TaskPage.createTask();
//            await TaskPage.saveAndClose();
//			await TaskPage.fulfilldata();
//			await TaskPage.search();
//			await expect($('(//td[contains(.,"Automation -- Business")])[1]')).toBeExisting();
//		}
//    });

//     it('tc002 Verify that user can select one or multiple task(s) in the Task list to delete', async () => {
//        //Pre-condition: create 01 task
//        await TaskPage.createTask();
//        await TaskPage.saveAndClose();
//        //Delete selected tasks
//        await TaskPage.tickOnTasks();
//        await TaskPage.deleteTask();
//        expect($('app-datatable tbody')).toBeElementsArrayOfSize(0);
//    });
//});

//describe('Send to task', () => {
  //  it('tc001 Verify that user can select a file(s) to attach to a new task, the selected file will show in Attachments tab', async () => {
  //      //Pre-condition: attach a file in cabinet's folder
  //      let fileName = "testfile.xlsx";
  //      await CabinetPage.open();
  //      await CabinetPage.expandCabinet('Clients');
  //      await CabinetPage.expandCabinet("A");
		//await CabinetPage.expandCabinet('Automation');
		//await CabinetPage.expandCabinet('2021');
		//await CabinetPage.uploadFileSystem(fileName);
  //      //Attach to new task
  //      await CabinetPage.tickOnFile(fileName);
  //      await CabinetPage.sendToTask("New Task");
  //      await TaskPage.switchTab("Attachments");
  //      await expect($('//mat-dialog-container//td[contains(.,"' + fileName + '")]')).toBeExisting();
  //      //Fill task info
  //      await TaskPage.createTask2();
  //      await TaskPage.saveAndClose();
  //      await CabinetPage.collapCabinet('Automation');
  //      expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeExisting();
  //  });

    //it('tc002 Verify that user can select a file(s) to attach to existing task, the selected file will be attached to task selected', async () => {
    //    //Upload new file
    //    let fileName = "testfilePDF.pdf";
    //    await CabinetPage.open();
    //    await CabinetPage.expandCabinet('Clients');
    //    await CabinetPage.expandCabinet("A");
    //    await CabinetPage.expandCabinet('Automation');
    //    await CabinetPage.expandCabinet('2021');
    //    await CabinetPage.uploadFileSystem(fileName);
    //    //Attach to existing task and save task
    //    await CabinetPage.tickOnFile(fileName);
    //    await CabinetPage.sendToTask("Existing Task");
    //    await TaskPage.selectExistingTask("Task: Automation -- Business -- ", " -- New");
    //    await TaskPage.saveAndClose();
    //    await TaskPage.switchWindow('OTNOW-Develop');
    //    //Back main window and verify attachment is successfully saved
    //    await CabinetPage.collapCabinet('Automation');
    //    await TaskPage.openTask("Task: Automation -- Business -- ", " -- New");
    //    await TaskPage.switchTab("Attachments");
    //    await expect($('//td[contains(.,"' + fileName + '")]')).toBeExisting();
    //});
//});

//describe('Task Template Maintenance', () => {

//    it('tc001 Verify the user can see and access the Task Template Maintenance page to add a new task template', async () => {
//        await TaskTemplateMaintenancePage.open();
//        await TaskTemplateMaintenancePage.createTaskTemplate(newTemplateName);
//        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).toBeExisting();
//    });


//    it('tc003 Verify that user can select any of the available task template to copy the copied task template will copy all task steps, step setting and task field of the selected template to copy', async () => {
//        await TaskTemplateMaintenancePage.activate(newTemplateName);
//        await TaskTemplateMaintenancePage.copy(newTemplateName);
//        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).toBeExisting();
//    });

//    it('tc002 Verify that user can select any of the available task template to delete', async () => {
//        await TaskTemplateMaintenancePage.deletecopy(newTemplateName);
//        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).not.toBeExisting();
//    });

//    it('tc004 Verify that user can add new a step by clicking Create button', async () => {
//        //Pre-condition: TC001 - Create a new task template
//        await TaskTemplateMaintenancePage.activate(newTemplateName);
//        await TaskTemplateMaintenancePage.createStep("Step 1", "Simple");
//        await TaskTemplateMaintenancePage.createStep("Step 2", "Text Box");
//        await TaskTemplateMaintenancePage.createStep("Step 3", "Reassign");
//        await TaskTemplateMaintenancePage.createStep("Step 4", "Email");
//        await TaskTemplateMaintenancePage.createStep("Step 5", "Open Template");
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 1")] and descendant::label[contains(.,"Simple")]]')).toBeExisting();
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 2")] and descendant::label[contains(.,"Text Box")]]')).toBeExisting();
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 3")] and descendant::label[contains(.,"Reassign")]]')).toBeExisting();
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 5")] and descendant::label[contains(.,"Open Template")]]')).toBeExisting();
//    });

//    it('tc005 Verify that user can select any of the available Step to edit/ delete', async () => {
//        await TaskTemplateMaintenancePage.activate(newTemplateName);
//        //Pre-condition: TC004 - Steps already have been added in Task Template
//        //Delete step 4
//        await TaskTemplateMaintenancePage.deleteStep("Step 4");
//        await expect($('//label[contains(.,"Step 4")]')).not.toBeExisting();
//        //Edit step 5 => step 4
//        await TaskTemplateMaintenancePage.editStep("Step 5", "Step 4", "Email");
//        await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
//    });

//    it('tc006 Verify that user can select any of the available Step to move up/down', async () => {
//        //Pre-condition: TC004 - Steps already have been added in Task Template
//        //Re-order all steps: 4 > 3 > 2 > 1
//        await TaskTemplateMaintenancePage.activate(newTemplateName);
//        await TaskTemplateMaintenancePage.moveStep("Step 1", "Down");
//        await TaskTemplateMaintenancePage.moveStep("Step 1", "Down");
//        await TaskTemplateMaintenancePage.moveStep("Step 1", "Down");
//        await TaskTemplateMaintenancePage.moveStep("Step 4", "Up");
//        await TaskTemplateMaintenancePage.moveStep("Step 2", "Down");
//        await TaskTemplateMaintenancePage.moveStep("Step 3", "Up");
//        //Verify
//        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[1]')).toHaveTextContaining('Step 4');
//        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[2]')).toHaveTextContaining('Step 3');
//        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[3]')).toHaveTextContaining('Step 2');
//        await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[4]')).toHaveTextContaining('Step 1');
//    });

//    it('tc007 Verify that user can add new custom fields', async () => {
//        //Pre-condition: TC004 - Steps already have been added in Task Template
//        await TaskTemplateMaintenancePage.activate(newTemplateName);
//        await TaskTemplateMaintenancePage.manageField();
//        await TaskTemplateMaintenancePage.addField("Field 1", "Text", true);
//        await TaskTemplateMaintenancePage.addField("Field 2", "Date", false);
//        await TaskTemplateMaintenancePage.addField("Field 3", "New Field", true);
//        await TaskTemplateMaintenancePage.saveAndClose();
//        //Bypass due to saving issue
//        //await TaskTemplateMaintenancePage.focusOn("My Template");
//        //await TaskTemplateMaintenancePage.focusOn(tp);
//        //Verify
//        await expect($('//label[normalize-space()="Field 1"]')).toBeExisting();
//        await expect($('//label[normalize-space()="Field 2"]')).toBeExisting();
//        await expect($('//label[normalize-space()="Field 3"]')).toBeExisting();
//    });

//    it('tc008 Verify that the task field will display in end of the task list column when user tick show in grid checkbox', async () => {
//        await LoginPage.reload();
//        await TaskPage.open();
//        await expect($('//div[contains(text(),"Field 3")]')).toBeExisting();

//    });

//    it('tc002 Verify that user can select any of the available task template to delete', async () => {
//        await LoginPage.reload();
//        await TaskTemplateMaintenancePage.open();
//        await TaskTemplateMaintenancePage.delete(newTemplateName);
//        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).not.toBeExisting();
//    });

//});



//describe('System Admin Wizard', () => {
//    it('tc001 Verify that user A can access to System Admin Wizard page', async () => {
//        let accountUserA = "tssadmin4"; //Should be replaced by other user's account
//        let group="AutomationGroup" + new Date().getTime();
//        await GroupPermissionMaintenancePage.open();
//        await GroupPermissionMaintenancePage.createGroup(group);
//        await GroupPermissionMaintenancePage.tickOn(accountUserA);
//        await GroupPermissionMaintenancePage.tickOn("System Admin Wizard");
//        await GroupPermissionMaintenancePage.save();

//        await LoginPage.logout();
//        await LoginPage.login(accountUserA, password);

//        await SystemAdminWizardPage.open();
//        await expect($('button[title="System Admin Wizard"]')).toBeExisting();

//        await LoginPage.logout();
//        await LoginPage.login(superadmin, password);
//        ////await GroupPermissionMaintenancePage.open();
//        ////await GroupPermissionMaintenancePage.deleteGroup("Automation Test");
//    });

//    it('tc002 Verify that user A can create a new task category, status, priority, task subject, file description, file subject, naming convention', async () => {
//        await SystemAdminWizardPage.open();
//        //Create new task category
//        await SystemAdminWizardPage.focusOn("Task Categories");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm1("Automation Task Category " + date);
//        await expect($('//label[normalize-space()="Automation Task Category ' + date + '"]')).toBeExisting();

//        //Create new task status
//        await SystemAdminWizardPage.focusOn("Task Statuses");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm2("Automation Task Status " + date);
//        await expect($('//div[normalize-space()="Automation Task Status ' + date + '"]')).toBeExisting();

//        //Create new task priority
//        await SystemAdminWizardPage.focusOn("Task Priorities");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm1("Automation Task Priority " + date);
//        await expect($('//label[normalize-space()="Automation Task Priority ' + date + '"]')).toBeExisting();

//        //Create new task subject
//        await SystemAdminWizardPage.focusOn("Task Subjects");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm2("Automation Task Subject " + date);
//        await expect($('//label[normalize-space()="Automation Task Subject ' + date + '"]')).toBeExisting();

//        //Create new task custom field
//        await SystemAdminWizardPage.focusOn("Task Custom Field");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm2("Automation Task Custom Field " + date);
//        await expect($('//label[normalize-space()="Automation Task Custom Field ' + date + '"]')).toBeExisting();

//        //Create new file description
//        await SystemAdminWizardPage.focusOn("File Descriptions");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm2("Automation File Description " + date);
//        await expect($('//label[normalize-space()="Automation File Description ' + date + '"]')).toBeExisting();

//        //Create new file subject
//        await SystemAdminWizardPage.focusOn("File Subjects");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm2("Automation File Subject " + date);
//        await expect($('//label[normalize-space()="Automation File Subject ' + date + '"]')).toBeExisting();

//        //Create new naming convention
//        await SystemAdminWizardPage.focusOn("Naming Conventions");
//        await SystemAdminWizardPage.clickOnButton("Create");
//        await SystemAdminWizardPage.fillForm3("Automation Naming Convention " + date);
//        await expect($('//div[normalize-space()="Automation Naming Convention ' + date + '"]')).toBeExisting();
//    });

//    it('tc003 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to edit', async () => {
//        //Edit task category
//        await SystemAdminWizardPage.focusOn("Task Categories");
//        await SystemAdminWizardPage.focusOn("Automation Task Category " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm1("Edited Automation Task Category " + date);
//        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).toBeExisting();

//        //Edit task status
//        await SystemAdminWizardPage.focusOn("Task Statuses");
//        await SystemAdminWizardPage.focusOn("Automation Task Status " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm2("Edited Automation Task Status " + date);
//        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).toBeExisting();

//        //Edit task priority
//        await SystemAdminWizardPage.focusOn("Task Priorities");
//        await SystemAdminWizardPage.focusOn("Automation Task Priority " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm1("Edited Automation Task Priority " + date);
//        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).toBeExisting();

//        //Edit task subject
//        await SystemAdminWizardPage.focusOn("Task Subjects");
//        await SystemAdminWizardPage.focusOn("Automation Task Subject " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm2("Edited Automation Task Subject " + date);
//        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).toBeExisting();

//        //Edit task custom field
//        await SystemAdminWizardPage.focusOn("Task Custom Field");
//        await SystemAdminWizardPage.focusOn("Automation Task Custom Field " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm2("Edited Automation Task Custom Field " + date);
//        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).toBeExisting();

//        //Edit file description
//        await SystemAdminWizardPage.focusOn("File Descriptions");
//        await SystemAdminWizardPage.focusOn("Automation File Description " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm2("Edited Automation File Description " + date);
//        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).toBeExisting();

//        //Edit file subject
//        await SystemAdminWizardPage.focusOn("File Subjects");
//        await SystemAdminWizardPage.focusOn("Automation File Subject " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm2("Edited Automation File Subject " + date);
//        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).toBeExisting();

//        //Edit naming convention
//        await SystemAdminWizardPage.focusOn("Naming Conventions");
//        await SystemAdminWizardPage.focusOn("Automation Naming Convention " + date);
//        await SystemAdminWizardPage.clickOnButton("Edit");
//        await SystemAdminWizardPage.fillForm3("Edited Automation Naming Convention " + date);
//        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).toBeExisting();
//    });

//    it('tc005 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to move up/down', async () => {
//        //Move to top task category
//        await SystemAdminWizardPage.focusOn("Task Categories");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
//        await SystemAdminWizardPage.moveToTop();
//        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Category " + date);

//        //Move to bottom task status
//        await SystemAdminWizardPage.focusOn("Task Statuses");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
//        await SystemAdminWizardPage.moveToBottom();
//        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation Task Status " + date);

//        //Move to top task priority
//        await SystemAdminWizardPage.focusOn("Task Priorities");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
//        await SystemAdminWizardPage.moveToTop();
//        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Priority " + date);

//        //Move to bottom task subject
//        await SystemAdminWizardPage.focusOn("Task Subjects");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
//        await SystemAdminWizardPage.moveToBottom();
//        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation Task Subject " + date);

//        ////[Issue] Move to bottom file description 
//        //await SystemAdminWizardPage.focusOn("File Descriptions");
//        //await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
//        //await SystemAdminWizardPage.moveToBottom();
//        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation File Description " + date);

//        ////[Issue] Move to top subject 
//        //await SystemAdminWizardPage.focusOn("File Subjects");
//        //await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
//        //await SystemAdminWizardPage.moveToTop();
//        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation File Subject " + date);

//        //Move to top naming convention
//        await SystemAdminWizardPage.focusOn("Naming Conventions");
//        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
//        await SystemAdminWizardPage.moveToTop();
//        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Naming Convention " + date);
//    });

//    it('tc006 Verify that user A can select Task Categories, Task Statuses , Task Priorities , Task Subjects , File Descriptions , File Subjects, Naming Conventions to click on Auto Sort button, It should sort by alphabetically', async () => {
//        await SystemAdminWizardPage.open();
//        //Sort task categories
//        await SystemAdminWizardPage.focusOn("Task Categories");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort task statuses
//        await SystemAdminWizardPage.focusOn("Task Statuses");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort task priorities
//        await SystemAdminWizardPage.focusOn("Task Priorities");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort task subjects
//        await SystemAdminWizardPage.focusOn("Task Subjects");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort file descriptions
//        await SystemAdminWizardPage.focusOn("File Descriptions");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort file subjects
//        await SystemAdminWizardPage.focusOn("File Subjects");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

//        //Sort naming conventions
//        await SystemAdminWizardPage.focusOn("Naming Conventions");
//        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
//    });

//    it('tc004 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to delete', async () => {
//        //Delete task category
//        await SystemAdminWizardPage.focusOn("Task Categories");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).not.toBeExisting();

//        //Delete task status
//        await SystemAdminWizardPage.focusOn("Task Statuses");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).not.toBeExisting();

//        //Delete task priority
//        await SystemAdminWizardPage.focusOn("Task Priorities");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).not.toBeExisting();

//        //Delete task subject
//        await SystemAdminWizardPage.focusOn("Task Subjects");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).not.toBeExisting();

//        //Delete task custom field
//        await SystemAdminWizardPage.focusOn("Task Custom Field");
//        await SystemAdminWizardPage.focusOn("Edited Automation Task Custom Field " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).not.toBeExisting();

//        //Delete file description
//        await SystemAdminWizardPage.focusOn("File Descriptions");
//        await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).not.toBeExisting();

//        //Delete file subject
//        await SystemAdminWizardPage.focusOn("File Subjects");
//        await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).not.toBeExisting();

//        //Delete naming convention
//        await SystemAdminWizardPage.focusOn("Naming Conventions");
//        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
//        await SystemAdminWizardPage.clickOnButton("Delete");
//        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).not.toBeExisting();
//    });
//});



//describe('Audit Trail', () => {
//    it('tc001 Verify that user can access to Administration > Audit Trail', async () => {
//        let accountUserA = "tssadmin4"; //Should be replaced by other user's account
//        let group = "AutomationGroup" + new Date().getTime();
//        let today = new Date().toLocaleDateString(); //DD/MM/YYYY

//        await GroupPermissionMaintenancePage.open();
//        await GroupPermissionMaintenancePage.createGroup(group);
//        await GroupPermissionMaintenancePage.tickOn(accountUserA);
//        await GroupPermissionMaintenancePage.tickOn("Audit Trail Individual");
//        await GroupPermissionMaintenancePage.save();

//        await LoginPage.logout();
//        await LoginPage.login(accountUserA, password);

//        await AuditTrailPage.openIndividual();
//        await expect($('[id="Audit Trail"]')).toBeExisting();

//        await AuditTrailPage.clickOnSelectUser();
//        await AuditTrailPage.tickOn(accountUserA);
//        await AuditTrailPage.fillDate("01/07/2022", today);
//        await AuditTrailPage.refresh();
//        //Verify something here

//        await LoginPage.logout();
//        await LoginPage.login(superadmin, password);  
//    });

//    it('tc002 Verify that user can access to Invidual Audit Trail when user has "Audit Trail Individual " permission checked on the Group & Permission Maintenance', async () => {
//        //Merge with TC001
//    });

//    it('tc003 Verify that user can see System Wizard Audit Trail, User & Group Maintenance, Authentication Management, CAC Audit, IAC Audit, Team Maintenance, Task Template, Structure Maintenance when user has "Audit Trail Individual " permission', async () => {
//        let accountUserA = "tssadmin4"; //Should be replaced by other user's account
//        let group = "AutomationGroup" + new Date().getTime();

//        await GroupPermissionMaintenancePage.open();
//        await GroupPermissionMaintenancePage.createGroup(group);
//        await GroupPermissionMaintenancePage.tickOn(accountUserA);
//        await GroupPermissionMaintenancePage.tickOn("User & Group Maintenance");
//        await GroupPermissionMaintenancePage.tickOn("CAC Managers");
//        await GroupPermissionMaintenancePage.tickOn("IAC Managers");
//        await GroupPermissionMaintenancePage.tickOn("Structure Maintenance");
//        await GroupPermissionMaintenancePage.tickOn("Task Template Manager");
//        await GroupPermissionMaintenancePage.tickOn("System Admin Wizard");
//        await GroupPermissionMaintenancePage.tickOn("System Admin Users");
//        await GroupPermissionMaintenancePage.save();

//        await LoginPage.logout();
//        await LoginPage.login(accountUserA, password);

//        await AuditTrailPage.open();
//        await expect($('button[title="System Wizard Audit Trail"]')).toBeExisting();
//        await expect($('button[title="User & Group Maintenance Audit Trail"]')).toBeExisting();
//        await expect($('button[title="Authentication Management Audit Trail"]')).toBeExisting();
//        await expect($('button[title="CAC Audit Audit Trail"]')).toBeExisting();
//        await expect($('button[title="IAC Audit Audit Trail"]')).toBeExisting();
//        await expect($('button[title="Task Template Audit Trail"]')).toBeExisting();
//        await expect($('button[title="Structure Maintenance Audit Trail"]')).toBeExisting();

//        await LoginPage.logout();
//        await LoginPage.login(superadmin, password);  
//    });

//    it('tc005 Verify that user can see search results when searching by User/ Action dropdown', async () => {
//        await AuditTrailPage.open();
//        await AuditTrailPage.goToUserGroupMaintenance();
//        await AuditTrailPage.clickOnSelectUser();
//        await AuditTrailPage.tickOn(superadmin);
//        await AuditTrailPage.clickOnSelectAction();
//        await AuditTrailPage.tickOn("Select All");
//        await AuditTrailPage.refresh();
//        //Verify something here
//    });

//    it('tc006 Verify that user can export search results by clicking Export button', async () => {
//        //Pre-condition: TC005
//        await AuditTrailPage.export();
//        const download_path = "C:/Users/TLe/Downloads/";
//        const download_fileName = "exported.xlsx";
//        const fs = require('fs');
//        let isExist = fs.existsSync(download_path + download_fileName);
//        await expect(isExist).toEqual(true);
//    });
//});

//describe('CAC/IAC', () => {
//    let groupName = "Automation" + new Date().getTime();
//    let accountA = "tssadmin4";

//    it('tc004 Verify that user can see Copy, New Email, Send to task and do it (except Copy file) ', async () => {
//        //Pre-condition: create new group with permission = Read
//        await CabinetAccessControlPage.open();
//        await CabinetAccessControlPage.createNewGroup(groupName);
//        await CabinetAccessControlPage.focusOn(groupName);
//        await CabinetAccessControlPage.checkCabinet(accountA); //tick on user to grant permission
//        await CabinetAccessControlPage.checkCabinet("Read"); //tick on Read permission
//        await CabinetAccessControlPage.checkCabinet("Clients"); // tick on Cabinet
//        await CabinetAccessControlPage.save();
//        await LoginPage.logout();
//        await LoginPage.login(accountA, password);

//        await CabinetPage.open();
//        await CabinetPage.expandCabinet("Clients");
//        await CabinetPage.expandCabinet("A");
//        await CabinetPage.expandCabinet("Automation");
//        await CabinetPage.expandCabinet("2021");
//        await CabinetPage.expandCabinet("Emails");
//        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
//        //await expect(await $('[mattooltip="Copy To"]').isClickable()).toEqual(false); //[FAILED] verify cannot copy (non-admin account)
//        await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
//        await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task

//        //Post-condition: login back to main account
//        await LoginPage.logout();
//        await LoginPage.login(superadmin, password);
//    });

//    it('tc005 Verify that user can see/ copy file into Cabinet list in Home/ Favourite of the Folder Browser when user belongs to group that has Write permission checked CAC page', async () => {
//        //Pre-condition: set automation group with permission = Write
//        await CabinetAccessControlPage.open();
//        await CabinetAccessControlPage.focusOn(groupName);
//        await CabinetAccessControlPage.checkCabinet("Write");
//        await CabinetAccessControlPage.save();
//        await LoginPage.logout();
//        await LoginPage.login(accountA, password);

//        //Check file can be copied from Cabinet
//        await CabinetPage.open();
//        await CabinetPage.expandCabinet("Clients");
//        await CabinetPage.expandCabinet("A");
//        await CabinetPage.expandCabinet("Automation");
//        await CabinetPage.expandCabinet("2021");
//        await CabinetPage.focusOn("Emails");
//        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
//        await CabinetPage.copyTo(); //Copy to folder: Cabinet/Automation/2022/Emails
//        await CabinetPage.collapCabinet("2021");
//        await CabinetPage.expandCabinet("2022");
//        await CabinetPage.expandCabinet("Emails");
//        //verify file successfully copied
//        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).toBeExisting();

//        //Check file can be copied from Favorite
//        await FavoritePage.open();
//        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
//        await FavoritePage.expandFavourites("2021");
//        await FavoritePage.focusOn("Business");
//        await FavoritePage.tickOnFile("Endorsement");
//        await FavoritePage.copyTo();
//        await FavoritePage.collapFavourites("2021");
//        await FavoritePage.expandFavourites("2022");
//        await FavoritePage.focusOn("Business");
//        //verify file successfully copied
//        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).toBeExisting();

//        //Post-condition: login back to main account
//        await LoginPage.logout();
//        await LoginPage.login(superadmin, password);
//    });

//    it('tc006 Verify that user can see/ move file into Cabinet list in Home/ Favourite/ Intray of the Folder Browser when user belongs to group that has Delete permission checked.', async () => {
//        //Pre-condition: set automation group with permission = Delete, exist copies of documents in TC005
//        await CabinetAccessControlPage.open();
//        await CabinetAccessControlPage.focusOn(groupName);
//        await CabinetAccessControlPage.checkCabinet("Delete"); //tick on Read permission
//        await CabinetAccessControlPage.save();
//        await LoginPage.logout();
//        await LoginPage.login(accountA, password);

//        //Check file can be deleted in Cabinet
//        await CabinetPage.open();
//        await CabinetPage.expandCabinet("Clients");
//        await CabinetPage.expandCabinet("A");
//        await CabinetPage.expandCabinet("Automation");
//        await CabinetPage.expandCabinet("2022");
//        await CabinetPage.focusOn("Emails");
//        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
//        await CabinetPage.deleteFile();
//        await expect($('(//span[contains(.,"Business")]/ancestor::td)[1]')).not.toBeExisting();

//        //Check file can be deleted in Favorite
//        await FavoritePage.open();
//        await FavoritePage.expandFavourites("A New Client Aug 2016-1152"); //should be change to Automation folder
//        await FavoritePage.expandFavourites("2022");
//        await FavoritePage.focusOn("Business");
//        await FavoritePage.tickOnFile("Endorsement");
//        await FavoritePage.deleteFile();
//        await expect($('(//span[contains(.,"Endorsement")]/ancestor::td)[1]')).not.toBeExisting();
//    });

//describe('Intray', () => {
//    let accountA = superadmin2;
//    let fileName = "testfile.xlsx";

//    it('tc001 Verify that the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
//        await IntrayPage.open();
//        let isActive = await $('//span[normalize-space()="' + superadmin + '"]/parent::button').getAttribute("class");
//        await expect(isActive.includes("active")).toEqual(true);
//    });

//    it('tc002 Verify that the current user login can do all default action of a file on his own In-tray', async () => {
//        //Pre-condition: Upload 02 files in intray
//        await IntrayPage.uploadFileSystem(fileName);
//        await IntrayPage.uploadFileSystem(fileName);

//        //Verify copy file
//        await IntrayPage.tickOnFile(fileName);
//        await IntrayPage.copyTo(accountA);
//        await IntrayPage.goToUserIntray(accountA);
//        await expect($('(//span[contains(.,' + fileName + ')]/ancestor::td)[1]')).toBeExisting();

//        //Verify move file
//        await IntrayPage.goToUserIntray(superadmin);
//        await IntrayPage.tickOnFile(fileName);
//        await IntrayPage.moveTo(accountA);
//        await IntrayPage.goToUserIntray(accountA);
//        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();

//        //Verify new email
//        await IntrayPage.goToUserIntray(superadmin);
//        await IntrayPage.tickOnFile(fileName);
//        await IntrayPage.newEmail();
//        await expect($('app-email-attachments')).toBeExisting();
//        await $('//button[.="Cancel"]').click();

//        //Verify send to task
//        await IntrayPage.sendToTask("Existing");
//        await expect($('app-dialog-existing-task')).toBeExisting();
//        await $('//button[.="Cancel"]').click();
//        await IntrayPage.sendToTask("New");
//        await expect($('app-create-task')).toBeExisting();
//        await $('//button[.="Cancel"]').click();
//        await ks.sendKey('enter');

//        //Verify delete file
//        await IntrayPage.delete();
//        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
//    });

//    it('tc003 Verify that user can view peoples intray if user has Read/ Write/Delete permission checked in the IAC', async () => {
//        let groupName = "Automation" + date;
//        //Pre-condition: Upload 02 files in intray
//        await IntrayPage.uploadFileSystem(fileName);
//        await IntrayPage.uploadFileSystem(fileName);

//        //Verify Read permission (No move/delete permission)
//        await IntrayAccessControlPage.open();
//        await IntrayAccessControlPage.createNewGroup(groupName);
//        await IntrayAccessControlPage.focusOn(groupName);
//        await IntrayAccessControlPage.tickOnUser(accountA);
//        await IntrayAccessControlPage.tickOnPermission("Read");
//        await IntrayAccessControlPage.tickOnIntray(superadmin);
//        await IntrayAccessControlPage.save();
//        await LoginPage.logout();

//        await LoginPage.login(accountA, password);
//        await IntrayPage.open();
//        await IntrayPage.goToUserIntray(superadmin);
//        //await expect($('[mattooltip="Delete"]')).not.toBeExisting();
//        //await expect($('[mattooltip="Move To"]')).not.toBeExisting();
//        await LoginPage.logout();

//        //Verify Write permission (Can move, no delete permission)
//        await LoginPage.login(superadmin, password);
//        await IntrayAccessControlPage.open();
//        await IntrayAccessControlPage.focusOn(groupName);
//        await IntrayAccessControlPage.tickOnPermission("Write");
//        await IntrayAccessControlPage.save();
//        await LoginPage.logout();

//        await LoginPage.login(accountA, password);
//        await IntrayPage.open();
//        await IntrayPage.goToUserIntray(superadmin);
//        //await expect($('[mattooltip="Delete"]')).not.toBeExisting(); //File cannot be deleted
//        await expect($('[mattooltip="Move To"]')).toBeExisting(); //File can be moved
//        await IntrayPage.tickOnFile(fileName);
//        await IntrayPage.moveTo(accountA);
//        await IntrayPage.goToUserIntray(accountA);
//        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();
//        await LoginPage.logout();

//        //Verify Delete permission (Can delete files)
//        await LoginPage.login(superadmin, password);
//        await IntrayAccessControlPage.open();
//        await IntrayAccessControlPage.focusOn(groupName);
//        await IntrayAccessControlPage.tickOnPermission("Delete");
//        await IntrayAccessControlPage.save();
//        await LoginPage.logout();

//        await LoginPage.login(accountA, password);
//        await IntrayPage.open();
//        await IntrayPage.goToUserIntray(superadmin);
//        await IntrayPage.tickOnFile(fileName);
//        await IntrayPage.delete();
//        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
//    });
//});