const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const InTraysPage = require('../pageobjects/intray.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenance = require('../pageobjects/structureMaintenance.page');
const CabinetAccessControl = require('../pageobjects/cabinetAccessControl.page');
const CabinetAccessControlPage = require('../pageobjects/cabinetAccessControl.page');
const CabinetSettingsPage = require('../pageobjects/cabinetSettings.page');
const TaskPage = require('../pageobjects/task.page');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = false;
var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();

describe('Login', () => {
	it('should login with valid credentials', async () => {
		await LoginPage.open();
		if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
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
		await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		await FavouritesPage.expandFavourites("Clients");
		await expect($('button[aria-label="toggle A"]')).toBeExisting();

	});

	it('tc002 - Verify that in all cabinets and Clients/Prospects/DCM folders and cabinets, the floating button has only one option Add Task', async () => {
		//open Cabinet
		await CabinetPage.open();

		//1.Create tasks folder Clients
		await CabinetPage.expandCabinet('Clients');
		await CabinetPage.createTask()
		//Create tasks Clients - folder A
		await CabinetPage.expandCabinet("A")
		//await CabinetPage.createTask()
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
		//await CabinetPage.createTask()
		//Collap All cabinets
		await CabinetPage.collapCabinet('A');
		await CabinetPage.collapCabinet('Prospects');
	});

});


describe('Intrays page', () => {

	it('tc001 Verify that the user can access In-Trays page in the Home tab and the current users Intray will be highlighted by default and displayed at the top in Intray / Folder Browser / File Browser / Save form', async () => {
		//Intrays
		await LoginPage.reload();
		await InTraysPage.open();
		await expect($('//span[text()= " Tuyen Le"]')).toBeExisting();

	});
});


describe('File', () => {
	it('tc001 Verify the Create QuickNote popup will display when clicking on Floating button > Create quicknote button', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
		await CabinetPage.expandCabinet("A")
		await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
		await CabinetPage.expandCabinet('2021');
		await CabinetPage.createQuickNote()
		await CabinetPage.collapCabinet('Clients');
	});

	it('tc002 Verify the Upload File(s) popup will display when clicking on Floating button > Upload button', async () => {
        //Cabinet
        await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
		await CabinetPage.expandCabinet("A")
		await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
		await CabinetPage.expandCabinet('2021');
        await CabinetPage.uploadFileSystem('testfile.xlsx')
        await expect($('(//span[contains(.,"testfile_xlsx")])[1]')).toBeExisting();
      
    });
});

describe('Client Maintenance', () => {

	it('tc001 Verify the user can see and access the Client Maintenance page to Add a new client', async () => {
		await LoginPage.reload();
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
		//await expect($('//td[contains(.,"' + clientname + '")]')).not.toBeExisting();
		//let deleted = await $('//td[contains(.,"' + clientname + '")]').isExisting();
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
		await LoginPage.reload();
		for (let i = 1; i <= 7; i++) {
			await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}

		await $('#Tools-link').click();
		for (let i = 1; i <= 5; i++) {
			await $('(//*[@id="Tools"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}

		await $('#Administration-link').click();
		for (let i = 1; i <= 10; i++) {
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

describe('Structure Maintenance', () => {
	//TC001->TC004->TC003->TC005
	it('tc001 Verify the user can see and access the Structure Maintenance page to add a new template when user has “Structure Maintenance” permission checked on the Group & Permission Maintenance', async () => {
		await LoginPage.reload();
		await StructureMaintenance.open();
		await StructureMaintenance.addNewTemplate(templatename);
		await StructureMaintenance.saveTemplate();

	});

	it('tc004 Verify that user can see list of the action in contextual menu: Set Folder Colour, Add Folder, Add Sub Folder, Clone Folder, Delete Folder, Rename Folder and do it when right-clicking a Folder structure', async () => {
        await LoginPage.reload();
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
		await LoginPage.reload();
		await StructureMaintenance.open();
		await StructureMaintenance.renameTemplate(templatename, newTemplatename);
		await expect($('//label[contains(.,"' + newTemplatename + '")]')).toBeExisting();
	});


	it('tc005 Verify that user can apply one or multiple cabinets to the Structure template ', async () => {
		await LoginPage.reload();
		await StructureMaintenance.open();
		await StructureMaintenance.applyCabinets(newTemplatename, "Clients", "Prospects");
		await expect($('//span[contains(.,"Change(s) on mapping the structure to cabinet(s) has been updated successfully")]')).toBeExisting();
	});
});



describe('Cabinet Settings', () => {
    it('tc001 Verify the user can see and access the Cabinet Setting page to add a new cabinet', async () => {
		await LoginPage.reload();
		await CabinetSettingsPage.open();
        await expect($('//td[normalize-space()="Clients"]')).toBeExisting();
        await expect($('//td[normalize-space()="Prospects"]')).toBeExisting();
    });


    it('tc002 Verify that user can see created cabinet in Cabinet list, Cabinet Settings after user apllied Read permission for it on the CAC page', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.addCabinet(cabinet_name, "None", isSuperadmin);

        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.checkCabinet(cabinet_name);
        await CabinetAccessControlPage.save();

        await CabinetPage.open();
        await expect($('(//span[normalize-space()="' + cabinet_name + '"])[last()]')).toBeExisting();

        await CabinetSettingsPage.open();
        await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
    });
    
    it('tc005 Verify that user can select any of the available cabinet name to apply index type', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alphabetic");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str.includes("#ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);

        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Numeric");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str2 = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str2.includes("+0123456789")).toEqual(true);

        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alpha-Numeric");

        await CabinetPage.open();
        await CabinetPage.expandCabinet(cabinet_name);
        let str3 = await CabinetSettingsPage.getStringOfSubFolders();
        await expect(str3.includes("+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);
    });


    it('tc003 Verify that user can select any of the available cabinet name to rename', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.renameCabinet(cabinet_name, new_cabinet_name);
        await expect($('//td[normalize-space()="' + new_cabinet_name +'"]')).toBeExisting();
    });

    //it('tc004 Verify that user can select any of the available cabinet name to delete, The deleted cabinet will be removed from the cabinet Setting and not displayed in Cabinet list/Structure Maintennance/ Cabinet Access Control/ Search page', async () => {
    //    let cabinet_name = "Renamed Testing Cabinet";
    //    await CabinetSettingsPage.open();
    //    await CabinetSettingsPage.deleteCabinet(cabinet_name);
    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

    //    await CabinetAccessControlPage.open();
    //    await expect($('//div[normalize-space()="' + cabinet_name + '"]/preceding-sibling::div//input/parent::span')).not.toBeExisting();

    //    await CabinetPage.open();
    //    await expect($('//td[normalize-space()="' + cabinet_name + '"]')).not.toBeExisting();

    //    await $('//input[@placeholder="Quick Find"]').setValue(cabinet_name);
    //    expect($('//span[contains(.,"Cabinet: '+cabinet_name +'")]')).not.toBeExisting();

    //    await StructureMaintenancePage.open();
    //    expect($('(//div[contains(.,"' + cabinet_name + '")])[last()]')).not.toBeExisting();
    //});
});




describe('Task', () => {
    it('tc001 Verify that user can create a new task by clicking Create Task button', async () => {
		await LoginPage.reload();
		await TaskPage.open();
        await TaskPage.createTask();
        await TaskPage.saveAndClose();
        expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeExisting();
    });

	it('tc003 Verify that user can select one or multiple the task(s) to reassign to another user in the Task list', async () => {
		if (isSuperadmin) { 
			let assignee = superadmin2;
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
			await LoginPage.login(superadmin, "Abc@12345");
		}
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
		if (isSuperadmin) {
			await TaskPage.open();
			await TaskPage.fulfilldata();
			await TaskPage.clearAll();
			let isZero = await TaskPage.isEmptyFields();
			await expect(isNaN(isZero) ? true : false).toEqual(true);
		}
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
        if (isSuperadmin) {
            await LoginPage.reload();
            await TaskPage.open();
			await TaskPage.search();
			await expect($('(//td[contains(.,"Automation -- Business")])[1]')).toBeExisting();
		}
    });

    it('tc005 Verify that user can search task when entering data search all task fields', async () => {
        if (isSuperadmin) {
            await LoginPage.reload();
            await TaskPage.open();
            await TaskPage.createTask();
            await TaskPage.saveAndClose();
			await TaskPage.fulfilldata();
			await TaskPage.search();
			await expect($('(//td[contains(.,"Automation -- Business")])[1]')).toBeExisting();
		}
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

describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});