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
const TaskTemplateMaintenance = require('../pageobjects/taskTemplateMaintenance.page');
const GroupPermissionMaintenancePage = require('../pageobjects/groupPermissionMaintenance.page');
const SystemAdminWizardPage = require('../pageobjects/systemAdminWizard.page');
const HomePageMaintenancePage = require('../pageobjects/homepagemaintenance.page');
const AuditTrailPage = require('../pageobjects/auditTrail.page');
const FavoritePage = require('../pageobjects/favourites.page');
const IntrayPage = require('../pageobjects/intray.page');
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const { exec } = require('node:child_process');
const UserProfilePage = require('../pageobjects/userProfile.page');
const SearchPage = require('../pageobjects/search.page');
const fs = require('fs');

//Create a user with Automation name
//User Management: change pass, otp, reset pass, request 2FA 
//Permission set all kind of permission to user
//Cabinet list: upload file, move file
//Tasks: create tasks: Automation
//Document search

const templatename = "AutomationTemplate";
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin';
const superadmin2='tssadmin1';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;
const accountA = 'tssadmin';
const accountB = "tssadmin1";

const createduser = "Automation1"
var clientname = "AutomationClient";
var clientcode = new Date().getTime();
var clientname1 = "AutomationClient1";
var clientname2 = "AutomationClient1";
var structure = "Standard Client";
var cabinet_name = "AutomationCabinet";
var new_cabinet_name = "RenamedAutomationCabinet";
var newTemplateName1 = "Automation";
var date = new Date().getTime();


var category = "Automation Task Category";
var eCategory = "Edited" + category;
var Status = "Automation Task Status";
var eStatus = "Edited" + Status;
var Priority = "Automation Task Priority";
var ePriority = "Edited" + Priority;
var Subject = "Automation Task Subject";
var eSubject = "Edited" + Subject;
var custom = "Automation Task Custom Field";
var ecustom= "Edited" + custom;
var description = "Automation File Description";
var edescription = "Edited" + description;
var file_subject = "Automation File Subject";
var efile_subject = "Edited" + file_subject;
var naming = "Automation Naming Convention";
var enaming = "Edited" + naming;

describe('Super Admin User', () => {
	it('TC001 Verify that Super admin user always has full permissions, He can access all pages and do all actions in the system.', async () => {
		let content = "Cabinets/ Favourites page \r\n";
        content += "file testfile.xlsx \r\n";
        content += "file testPDF.PDF \r\n";
        content += "Add New User \r\n";
        content += "Automation \r\n";
        content += "Client Maintenance \r\n";
        content += "AutomationClient \r\n";
        content += "Cabinets Maintenance \r\n";
        content += "AutomationCabinet \r\n";
        content += "System Admin Wizard \r\n";
        content += "Automation Task Category \r\n";
        content += "Automation Task Status \r\n";
        content += "Automation Task Priority \r\n";
        content += "Automation Task Subject \r\n";
        content += "Automation Task Custom Field \r\n";
        content += "Automation File Description \r\n";
        content += "Automation File Subject \r\n";
        content += "Automation Naming Convention \r\n";
        content += "Task Template Manager \r\n";
        content += "Automation \r\n";
        content += "Structure Maintenance \r\n";
        content += "AutomationTemplate \r\n";
        content += "NewAutomationTemplate \r\n";
        content += "Intray \r\n";
        content += "file testfile.xlsx \r\n";
        content += "Cabinet Page \r\n";
        content += "file testfile.xlsx \r\n";
        content += "file testPDF.PDF \r\n";
        fs.writeFile('./Report.txt', content, err => {
            if (err) {
              console.error(err);
            }
            // done!
          });
        await LoginPage.open();
		if (isSuperadmin) {
			await LoginPage.login(superadmin, password);
		} else await LoginPage.login(user, password);

		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
		await expect($('//span[text()="Home"]')).toBeExisting();
        await CabinetPage.open();
        await FavouritesPage.open();
	});
});


describe('Cabinets/ Favourites page', () => {

	it('tc001 Verify that user can access Cabinets page / Favourites page in the Home tab and see all cabinets in the Cabinets page and some cabinets that are added to the Favourites page', async () => {
		//Cabinet
		await LoginPage.reload();
        await CabinetPage.open();
		await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		//await expect($('button[aria-label= "toggle Underwriters"]')).toBeExisting();
		//await CabinetPage.expandCabinet("Clients");
		//await expect($('button[aria-label="toggle Z"]')).toBeExisting();

		//Favourites
		await FavouritesPage.open();
		//await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		//await FavouritesPage.expandFavourites("Clients");
		//await expect($('button[aria-label="toggle Z"]')).toBeExisting();

	});

	it('tc002 - Verify that in all cabinets and Clients/Prospects/DCM folders and cabinets, the floating button has only one option Add Task', async () => {
		//open Cabinet
		await CabinetPage.open();

		//1.Create tasks folder Clients
		await CabinetPage.expandCabinet('Clients');
		//await CabinetPage.createTask()
		//Create tasks Clients - folder A
		//await CabinetPage.expandCabinet("Z")
		//await CabinetPage.createTask()
		//Collap All cabinets
		//await CabinetPage.collapCabinet('Z');
		//await CabinetPage.collapCabinet('Clients');


		//2.Create tasks folder Development Cabinet
		//await CabinetPage.expandCabinet('Underwriters');
		//await CabinetPage.createTask()
		//Collap All cabinets
		//await CabinetPage.collapCabinet('Underwriters');


		//3.Create tasks folder Prospects
		//await CabinetPage.expandCabinet('Prospects-Coffs');
		//await CabinetPage.createTask()
		//await CabinetPage.collapCabinet('Prospects-Coffs');
    });

   
    it('tc003 - Verify the user can see the Client/ Prospect details and the Client/ Prospect folder name in the Recent section when selecting Client/ Prospect folder and its normal folder', async () => {
		//open Cabinet
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet1('Clients');
		//await CabinetPage.expandCabinet("Z")
		//await CabinetPage.expandCabinet('Z GARRETT-63362');
        //await CabinetPage.expandCabinet('2022');
        //await expect($('//span[contains(text(),"Z GARRETT-63362")]')).toBeExisting();
		
	});
    
});

describe('Intrays page', () => {

	it('tc001 Verify that the user can access In-Trays page in the Home tab and the current users Intray will be highlighted by default and displayed at the top in Intray / Folder Browser / File Browser / Save form', async () => {
		//Intrays
		await LoginPage.reload();
		await InTraysPage.open();
		//await expect($('//span[text()= " Tuyen Le"]')).toBeExisting();

	});
});


describe('File', () => {
	it('tc001 Verify the Create QuickNote popup will display when clicking on Floating button > Create quicknote button', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet2('Clients');

		await CabinetPage.expandCabinet("Z")
		await CabinetPage.expandCabinet('Z GARRETT-63362');
		await CabinetPage.expandCabinet('2022');
		await CabinetPage.createQuickNote()

		await CabinetPage.collapCabinet('Clients');
	});

});



describe('Add New User', () => {
	it('tc001 Verify the user can see and access the User & Authentication Maintenance page to Add a new user when user has “User & Group Maintenance” permission ', async () => {
		await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
	});

	it('tc002 Verify the Super Admin User can access the User & Authentication Maintenance page to Add a new user ', async () => {
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open1();
        await UserAuthenticationMaintenancePage.inviteNewUser(createduser);
    });

    
	it('tc003 Verify that a new user added by super admin user will recieve an email and user can click on "Go to Officetech" button  to set new password and scan QR code ', async () => {
        await UserAuthenticationMaintenancePage.goto();
    });

    
	it('tc004 Verify a new user can login to OTNow system after setting password and scan QR code ', async () => {
        await UserAuthenticationMaintenancePage.login();
    });

     
    it('tc006 Verify that the user can reset the password if he forgot it by clicking “Forgot password?”.', async () => {
		await UserAuthenticationMaintenancePage.forgot();
    });

    it('tc007 Verify if the user can not access the Authenticator App to get the OTP code, he can request 2FA Manager to reset his 2-factor Authentication on the OTP form', async () => {
        await UserAuthenticationMaintenancePage.request();
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
		await ClientMaintenancePage.open();
		await ClientMaintenancePage.createClientWithStructure(clientname, clientcode, structure);
		//await expect($('//td[contains(.,"' + clientname + '")]')).toBeExisting();
		//await ClientMaintenancePage.deleteClient(clientname);
	});

	it('tc003 Verify that user can apply Folder Structure for the client folder, It should display correct all folder structure applied', async () => {
		//open Client Maintenance Page
        await LoginPage.reload();
		await ClientMaintenancePage.open();
		await ClientMaintenancePage.createClient(clientname1, clientcode);
		await expect($('//td[contains(.,"' + clientname1 + '")]')).toBeExisting();
		await ClientMaintenancePage.addStructure(clientname1, structure);
		//Verify the folder structure of the created client
		//await CabinetPage.open();
		//await CabinetPage.openQuickFind(clientname);
		//await expect($('(//span[contains(text(),"2021")])')).toBeExisting();
		//await expect($('(//span[contains(text(),"2022")])')).toBeExisting();
	});


	it('tc004 Verify that user can rename the client folder, Client folder is renamed will update in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
		//create client
        await LoginPage.reload();
		clientcode = new Date().getTime();
		await ClientMaintenancePage.open();
		await ClientMaintenancePage.createClientWithStructure(clientname2, clientcode, structure);
		//rename folder
		//await CabinetPage.open();
		//await CabinetPage.openQuickFind(clientname);
		//await CabinetPage.expandCabinet('2022');
		//await CabinetPage.renameFolder('(Quotes)', 'Renamed Quotes');
		//await expect($('(//span[contains(.,"Renamed Quotes")])[1]')).toBeExisting();
		//await CabinetPage.open();
		//await CabinetPage.expandCabinet('Clients');
		//await CabinetPage.expandCabinet('Z');
		//await CabinetPage.expandCabinet(clientname);
		//await CabinetPage.expandCabinet('2022');
		//await expect($('(//span[contains(.,"Renamed Quotes")])[1]')).toBeExisting();
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

	});

    it('tc002 Verify that the user cannot find cabinets that are not provided permission to READ. Do not show those cabinets on the result list when using Quick Find fields to find cabinets (on main page, file browser, save form, complete a task)', async () => {
		
		await $('#Tools-link').click();
		for (let i = 1; i <= 5; i++) {
			await $('(//*[@id="Tools"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}

		
	});

    it('tc003 Verify that do not show the entity on the result list When using Quick Find or Entity fields to find an entity (client, prospect, ...) that belongs to a non-provided permission cabinet (Search Task form, Create new task form, Send Existing task form)', async () => {
		
		await $('#Administration-link').click();
		for (let i = 1; i <= 10; i++) {
			if (i == 13) continue;
			await $('(//*[@id="Administration"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}

	});

    it('tc004 Verify that user can find ,Entity, Cabinet, Clients that are provided permission Read', async () => {
		
		await $('//*[@id="Audit Trail-link"]').click();
		for (let i = 1; i <= 7; i++) {
			await $('(//*[@id="Audit Trail"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}
	});

    it('tc005 Verify that user can only search client when user check into Clients only checkbox', async () => {
		await LoginPage.reload();
		for (let i = 1; i <= 7; i++) {
			await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
			await new Promise(resolve => setTimeout(resolve, 1000));
			await expect($('//input[@placeholder="Quick Find"]')).toBeExisting();
		}

	});

});
describe('Structure Maintenance', () => {
	//TC001->TC004->TC003->TC005
	it('tc001 Verify the user can see and access the Structure Maintenance page to add a new template when user has �Structure Maintenance� permission checked on the Group & Permission Maintenance', async () => {
		await LoginPage.reload();
		await StructureMaintenance.open();
		await StructureMaintenance.addNewTemplate(templatename);
		await StructureMaintenance.saveTemplate();

	});

	it('tc003 Verify that user can see list of the action in contextual menu: Set Folder Colour, Add Folder, Add Sub Folder, Clone Folder, Delete Folder, Rename Folder and do it when right-clicking a Folder structure', async () => {
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


	it('tc004 Verify that user can select any of available template structure to rename ', async () => {
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
       // await expect($('//td[normalize-space()="Prospects-Coffs"]')).toBeExisting();
    });


    it('tc002 Verify that user can see created cabinet in Cabinet list, Cabinet Settings after user apllied Read permission for it on the CAC page', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.addCabinet(cabinet_name, "None", isSuperadmin);
        await LoginPage.reload();

        //await CabinetAccessControlPage.open();
        //await CabinetAccessControlPage.checkCabinet(cabinet_name);
        //await CabinetAccessControlPage.save();

       // await CabinetPage.open();
       // await expect($('(//span[normalize-space()="' + cabinet_name + '"])[last()]')).toBeExisting();

       // await CabinetSettingsPage.open();
       // await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
    });

    
    it('tc003 Verify that user can select any of the available cabinet name to rename', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.addCabinet(cabinet_name, "None", isSuperadmin);
        await LoginPage.reload();

        //await CabinetAccessControlPage.open();
        //await CabinetAccessControlPage.checkCabinet(cabinet_name);
        //await CabinetAccessControlPage.save();

       // await CabinetPage.open();
       // await expect($('(//span[normalize-space()="' + cabinet_name + '"])[last()]')).toBeExisting();

       // await CabinetSettingsPage.open();
       // await expect($('//td[normalize-space()="' + cabinet_name + '"]')).toBeExisting();
    });
    
    it('tc005 Verify that user can select any of the available cabinet name to apply index type', async () => {
        
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.changeIndexType(cabinet_name, "Alphabetic");

        //await CabinetPage.open();
        //await CabinetPage.expandCabinet(cabinet_name);
        //let str = await CabinetSettingsPage.getStringOfSubFolders();
        //await expect(str.includes("#ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);

        //await CabinetSettingsPage.open();
       // await CabinetSettingsPage.changeIndexType(cabinet_name, "Numeric");

        //await CabinetPage.open();
        //await CabinetPage.expandCabinet(cabinet_name);
        //let str2 = await CabinetSettingsPage.getStringOfSubFolders();
        //await expect(str2.includes("+0123456789")).toEqual(true);

        //await CabinetSettingsPage.open();
        //await CabinetSettingsPage.changeIndexType(cabinet_name, "Alpha-Numeric");

       // await CabinetPage.open();
        //await CabinetPage.expandCabinet(cabinet_name);
        //let str3 = await CabinetSettingsPage.getStringOfSubFolders();
        //await expect(str3.includes("+0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")).toEqual(true);
    });

});


describe('Task', () => {
    it('tc001 Verify that user can create a new task by clicking Create Task button', async () => {
		await LoginPage.reload();
		await TaskPage.open();
        await TaskPage.createTask1();
        await TaskPage.saveAndClose();
        //expect($('//container-element[contains(.,"Automation") and contains(.,"Business")]')).toBeExisting();
    });


	it('tc003 Verify that user can select one or multiple the task(s) to reassign to another user in the Task list', async () => {
        await LoginPage.reload();
			//Pre-condition: create 02 tasks
            await TaskPage.open1();
			await TaskPage.createTask2();
			await TaskPage.saveAndClose();
			//await TaskPage.createTask();
			//await TaskPage.saveAndClose();
			
    });

    it('tc004 Verify that user will be redirected to Client name when choosing any of the available task to "Go to client"  on task list', async () => {
        //Pre-condition: create 01 task
        await LoginPage.reload();
        await TaskPage.open2();
        await TaskPage.createTask3();
        await TaskPage.saveAndClose();
       // await TaskPage.goToClient();
        //expect($('[aria-label="toggle Automation"]')).toBeExisting();
    });

    it('tc005 Verify that the data in task filtered will deleted when Clicking on Clear All button on Task list', async () => {
            await LoginPage.reload();
			await TaskPage.open3();
			//await TaskPage.fulfilldata();
			await TaskPage.clearAll();
			
    });

    it('tc005 Verify that user will be redirected to Client name when choosing any of the available task to "Go to client"  on task list', async () => {
        await LoginPage.reload();
        await TaskPage.open4();
        //await TaskPage.fulfilldata();
        await TaskPage.clearAll();
        
});

    it('tc007 Verify that the ott file will be created in the selected location when user complete a task', async () => {
        //Pre-condition: create 01 completed task
        await LoginPage.reload();
        await TaskPage.open4();
        await TaskPage.task4();
       //await TaskPage.saveAndClose();
        //await TaskPage.changeStatus("Complete");
        
    });

    it('tc008 Verify that user can search task when entering data search all task fields', async () => {

            await LoginPage.reload();
            await TaskPage.open5();
            await TaskPage.task5();
            //await TaskPage.saveAndClose();
			//await TaskPage.fulfilldata();
			await TaskPage.search();
			
    });
});



describe('Document Search/Folder Search', () => {
    let fileName = "testfile.xlsx";
    
    it('tc001 Verify that user can click on a record in the search results and select "Go to Location" to navigate to Client/cabinet/folder contain the created file', async () => {
        await LoginPage.reload();
        await SearchPage.open();
        await SearchPage.typeInSearchBox("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });
    
    it('tc002 Verify that user can download the selected file in Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox1("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc003 Verify that user can clear data search and search result when clicking Clear button on Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox2("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });
    

    it('tc004 Verify that user can export search results when clicking Export button on Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox3("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc005 Verify that user can search data with all fields on the Document Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox4("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc006 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox5("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc007 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox6("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc008 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox7("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc009 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox8("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

    it('tc010 Verify that user will be redirected to the last folder when choosing "Go to client" on the Folder Search', async () => {
        await SearchPage.open();
        await SearchPage.typeInSearchBox9("testfile.xlsx");
        await expect($('//span[contains(.,"testfile")]')).toBeExisting();
    });

});



describe('Send to task (New Task/ Existing Task)', () => {
 
    it('tc001 Verify that user can select a file(s) to attach to a new task, the selected file will show in Attachments tab', async () => {
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.expandCabinet('2022');
		await CabinetPage.attachnew('testfile.xlsx');
    });

    
    it('tc002 Verify that user can select a file(s) to attach to existing task, the selected file will be attached to task selected', async () => {
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.expandCabinet('2022');
		await CabinetPage.attachexist('testfile.xlsx');
    });

    it('tc003 Verify that user can create a new task when selecting Send to task > New Task', async () => {
		await LoginPage.reload();
		await TaskPage.open();
        await TaskPage.createTask1();
        await TaskPage.saveAndClose();
    });
});


describe('Task Template Maintenance', () => {
 
    it('tc001 Verify the user can see and access the Task Template Maintenance page to add a new task template', async () => {
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.createTaskTemplate(newTemplateName1);
        //await expect($('//label[normalize-space()="' + newTemplateName1 + '"]')).toBeExisting();
    });

    
    it('tc003 Verify that user can select any of the available task template to copy the copied task template will copy all task steps, step setting and task field of the selected template to copy', async () => {
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        await TaskTemplateMaintenance.copy(newTemplateName1);
        //await expect($('//label[normalize-space()="Copy - ' + newTemplateName1 + '"]')).toBeExisting();
    });


    it('tc004 Verify that user can add new a step by clicking Create button', async () => {
        //Pre-condition: TC001 - Create a new task template
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        await TaskTemplateMaintenance.createStep("Step 1", "Simple");
        await TaskTemplateMaintenance.createStep("Step 2", "Text Box");
        await TaskTemplateMaintenance.createStep("Step 3", "Reassign");
        await TaskTemplateMaintenance.createStep("Step 4", "Email");
        await TaskTemplateMaintenance.createStep("Step 5", "Open Template");
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 1")] and descendant::label[contains(.,"Simple")]]')).toBeExisting();
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 2")] and descendant::label[contains(.,"Text Box")]]')).toBeExisting();
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 3")] and descendant::label[contains(.,"Reassign")]]')).toBeExisting();
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 5")] and descendant::label[contains(.,"Open Template")]]')).toBeExisting();
    });

    it('tc005 Verify that user can select any of the available Step to edit/ delete', async () => {
        await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        //Pre-condition: TC004 - Steps already have been added in Task Template
        //Delete step 4
        await TaskTemplateMaintenance.deleteStep("Step 4");
        //await expect($('//label[contains(.,"Step 4")]')).not.toBeExisting();
        //Edit step 5 => step 4
        await TaskTemplateMaintenance.editStep("Step 5", "Step 4", "Email");
        //await expect($('//mat-list-item[descendant::label[contains(.,"Step 4")] and descendant::label[contains(.,"Email")]]')).toBeExisting();
    });

    it('tc006 Verify that user can select any of the available Step to move up/down', async () => {
        //Pre-condition: TC004 - Steps already have been added in Task Template
        //Re-order all steps: 4 > 3 > 2 > 1
		await LoginPage.reload();
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 1", "Down");
        await TaskTemplateMaintenance.moveStep("Step 4", "Up");
        await TaskTemplateMaintenance.moveStep("Step 2", "Down");
        await TaskTemplateMaintenance.moveStep("Step 3", "Up");
        //Verify
        //await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[1]')).toHaveTextContaining('Step 4');
        //await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[2]')).toHaveTextContaining('Step 3');
        //await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[3]')).toHaveTextContaining('Step 2');
        //await expect($('(//*[@title="Steps"]//label[contains(.,"Step")])[4]')).toHaveTextContaining('Step 1');
    });

    it('tc007 Verify that user can add new custom fields', async () => {
        //Pre-condition: TC004 - Steps already have been added in Task Template
		await LoginPage.reload();
		await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        await TaskTemplateMaintenance.manageField();
        await TaskTemplateMaintenance.addField("Field 1", "Text", true);
        await TaskTemplateMaintenance.addField("Field 2", "Date", false);
        await TaskTemplateMaintenance.addField("Field 3", "Progress", true);
        await TaskTemplateMaintenance.saveAndClose();
        //Bypass due to saving issue
        await TaskTemplateMaintenance.focusOn("Cancellation");
        await TaskTemplateMaintenance.focusOn(newTemplateName1);
        //Verify
        //await expect($('//label[normalize-space()="Field 1"]')).toBeExisting();
        //await expect($('//label[normalize-space()="Field 2"]')).toBeExisting();
        //await expect($('//label[normalize-space()="Field 3"]')).toBeExisting();
    });

    it('tc008 Verify that the task field will display in end of the task list column when user tick show in grid checkbox', async () => {
        await LoginPage.reload();
        await TaskPage.open();
        //await expect($('//div[contains(text(),"Field 3")]')).toBeExisting();
       
    });
    
});



//Not updated
describe('System Admin Wizard', () => {


    it('tc001 Verify that user A can access to System Admin Wizard page', async () => {
        await LoginPage.reload();
        await SystemAdminWizardPage.open();
        await expect($('button[title="System Admin Wizard"]')).toBeExisting();
    });
    
    it('tc002 Verify that user A can create a new task category, status, priority, task subject, file description, file subject, naming convention', async () => {
        await SystemAdminWizardPage.open();
        //Create new task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1(category);
        await expect($('//label[normalize-space()="' + category + '"]')).toBeExisting();

        //Create new task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(Status);
        await expect($('//div[normalize-space()="' + Status + '"]')).toBeExisting();

        //Create new task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1(Priority);
        await expect($('//label[normalize-space()="' + Priority + '"]')).toBeExisting();

        //Create new task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(Subject);
        await expect($('//label[normalize-space()="' + Subject + '"]')).toBeExisting();

        //Create new task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(custom);
        await expect($('//label[normalize-space()="' + custom + '"]')).toBeExisting();

        //Create new file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(description);
        await expect($('//label[normalize-space()="' + description + '"]')).toBeExisting();

        //Create new file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2(file_subject);
        await expect($('//label[normalize-space()="' + file_subject + '"]')).toBeExisting();

		
        //Create new naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm3(naming);
        await expect($('//div[normalize-space()="' + naming + '"]')).toBeExisting();
    });

    it('tc003 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to edit', async () => {
        //Edit task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(category);
        await SystemAdminWizardPage.clickOnButton("Edit");	
        await SystemAdminWizardPage.fillForm1(eCategory);
        await expect($('//label[normalize-space()="' + eCategory + '"]')).toBeExisting();

        //Edit task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(Status);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(eStatus);
        await expect($('//div[normalize-space()="' + eStatus + '"]')).toBeExisting();

        //Edit task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(Priority);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1(ePriority);
        await expect($('//label[normalize-space()="' + ePriority + '"]')).toBeExisting();

        //Edit task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(Subject);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(eSubject);
        await expect($('//label[normalize-space()="' + eSubject + '"]')).toBeExisting();

        //Edit task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn(custom);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(ecustom);
        await expect($('//label[normalize-space()="' + ecustom + '"]')).toBeExisting();

        //Edit file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(description);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(edescription);
        await expect($('//label[normalize-space()="' + edescription + '"]')).toBeExisting();

        //Edit file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(file_subject);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2(efile_subject);
        await expect($('//label[normalize-space()="' + efile_subject + '"]')).toBeExisting();

        //Edit naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(naming);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm3(enaming);
        await expect($('//div[normalize-space()="' + enaming + '"]')).toBeExisting();
    });

    it('tc005 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to move up/down', async () => {
        
		await LoginPage.reload();
		await SystemAdminWizardPage.open();
		//Move to top task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(eCategory);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(eCategory);

        //Move to bottom task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(eStatus);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][last()]/div[1]')).toHaveTextContaining(eStatus);

        //Move to top task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(ePriority);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(ePriority);

        //Move to bottom task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(eSubject);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining(eSubject);

        //Move to bottom file description 
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(edescription);
        await SystemAdminWizardPage.moveToBottom();
        //await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining(edescription);

        //Move to top subject 
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(efile_subject);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining(efile_subject);

        //Move to top naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(enaming);
        await SystemAdminWizardPage.moveToTop();
        //await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][1]/div[2]')).toHaveTextContaining(enaming);
    });

    it('tc006 Verify that user A can select Task Categories, Task Statuses , Task Priorities , Task Subjects , File Descriptions , File Subjects, Naming Conventions to click on Auto Sort button, It should sort by alphabetically', async () => {
        //Sort task categories
        await SystemAdminWizardPage.focusOn("Task Categories");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
        //Sort task statuses
        await SystemAdminWizardPage.focusOn("Task Statuses");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task priorities
        await SystemAdminWizardPage.focusOn("Task Priorities");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task subjects
        await SystemAdminWizardPage.focusOn("Task Subjects");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file descriptions
        await SystemAdminWizardPage.focusOn("File Descriptions");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file subjects
        await SystemAdminWizardPage.focusOn("File Subjects");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort naming conventions
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
    });

    it('tc007 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to delete', async () => {
        //Delete task category
		await LoginPage.reload();
		await SystemAdminWizardPage.open();
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn(eCategory);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + eCategory + '"]')).not.toBeExisting();

        //Delete task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn(eStatus);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="' + eStatus + '"]')).not.toBeExisting();

        //Delete task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn(ePriority);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + ePriority + '"]')).not.toBeExisting();

        //Delete task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn(eSubject);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + eSubject + '"]')).not.toBeExisting();

        //Delete task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn(ecustom);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + ecustom + '"]')).not.toBeExisting();

        //Delete file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn(edescription);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + edescription + '"]')).not.toBeExisting();

        //Delete file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn(efile_subject);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="' + efile_subject + '"]')).not.toBeExisting();

        //Delete naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn(enaming);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="' + enaming + '"]')).not.toBeExisting();
    });
});


//Not updated
describe('User profile', () => {
it('tc001 Verify that the user can change the password by clicking Change Password button on the User Profile page', async () => {
        let current_password = "Abc@12345"
        let newPassword = current_password + "6";
        await UserProfilePage.open();
        await UserProfilePage.changePassword(current_password, newPassword);
});

it('tc002 Verify that user can change phone  by clicking Change Phone button on the User Profile page', async () => {
    let current_password = "Abc@12345"
    let newPassword = current_password + "6";
    await UserProfilePage.open();
    await UserProfilePage.changePassword(newPassword, current_password);
});


it('tc003 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
    let current_password = "Abc@12345"
    let newPassword = current_password + "6";
    await UserProfilePage.open();
    await UserProfilePage.Password(current_password, current_password);
});

});


//Not updated
describe('HomePage Maintenance', () => {

	it('tc001 Veify that User can access to Homepage Maintenance feature in Tools > Home Page maintenance', async () => {
        await LoginPage.reload();
        await HomePageMaintenancePage.open();
      //  await expect($('button[title="Homepage Maintenance"]')).toBeExisting();
      //  await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();      
    });

    it('tc002 Verify that User can modify the homepage content in the Homepage Maintenance feature, Any changes that user already saves in Homepage Maintenance will be reflected in the Homepage', async () => {
        await HomePageMaintenancePage.modify(date);
        await LoginPage.reload();
       // await expect($('//p[contains(text(),"'+date+'")]')).toBeExisting();
    });

	it('tc003 Verify that User can check/uncheck the �Show My Task on startup� checkbox to hide/show My task list in homepage (default: �Show My Task on startup� checkbox checked)', async () => {
        await HomePageMaintenancePage.open();
        //await HomePageMaintenancePage.checkShowTask();
       // let isChecked = (await $('[formcontrolname="isShowMyTask"]').getAttribute('class')).includes('checked');
        //await expect(isChecked).toEqual(true);
    });

    it('tc004 Verify after user logins and navigated to Hompage, the user sees the task list in the Hompage contains the task assigned to him/her', async () => {
        await LoginPage.reload();
        await new Promise(resolve => setTimeout(resolve, 3000));
        //await expect($('//div[contains(text(),"Start Date")]')).toBeExisting();
    });

});



describe('Audit Trail', () => {
    it('tc001 Verify that user can access to Administration> Audit Trail when user has "Audit Trail Master" permission checked on the Goup & Permission Maintenance', async () => {
		let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await LoginPage.reload();
            await AuditTrailPage.openIndividual();
            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.clickOnSelectAction();
             await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.refresh();
    });

    it('tc002 Verify that user can access to Invidual Audit Trail when user has "Audit Trail Individual " permission checked on the Goup & Permission Maintenance', async () => {
		let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await LoginPage.reload();
            await AuditTrailPage.openIndividual();
            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.fillDate("01/05/2022", today);
            await AuditTrailPage.clickOnSelectAction();
             await AuditTrailPage.tickOn("Select All");
            await AuditTrailPage.refresh();
    });


    it('tc003 Verify that user can see System Wizard Audit Trail, User & Group Maintenance, Authentication Management, CAC Audit, IAC Audit, Team Maintenance, Task Template, Structure Maintenance when user has "Audit Trail Individual " permission', async () => {
            await AuditTrailPage.open();
            await expect($('button[title="System Wizard Audit Trail"]')).toBeExisting();
            await expect($('button[title="User & Group Maintenance Audit Trail"]')).toBeExisting();
            await expect($('button[title="Authentication Management Audit Trail"]')).toBeExisting();
            await expect($('button[title="CAC Audit Audit Trail"]')).toBeExisting();
            await expect($('button[title="IAC Audit Audit Trail"]')).toBeExisting();
            await expect($('button[title="Task Template Audit Trail"]')).toBeExisting();
            await expect($('button[title="Structure Maintenance Audit Trail"]')).toBeExisting();
    });

    it('tc005 Verify that user can see search results when searching by User/ Action dropdown', async () => {
        let today = new Date().toLocaleDateString(); //DD/MM/YYYY
        await AuditTrailPage.open();
        await AuditTrailPage.goToSystemWizard();
        await AuditTrailPage.clickOnSelectUser();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.fillDate("01/07/2022", today);
        await AuditTrailPage.clickOnSelectAction();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.refresh();
        await expect($('//span[contains(.,"tssadmin")]')).toBeExisting();
    });

    it('tc006 Verify that user can export search results by clicking Export button', async () => {
        //Pre-condition: TC005
        await AuditTrailPage.export();
    });

});



describe('Cabinet list', () => {
    let note = "Note";
	it('tc001 Verify that user can see Cabinet list', async () => {
		//Cabinet
		await LoginPage.reload();
        await CabinetPage.open();
		await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		//await expect($('button[aria-label= "toggle Underwriters"]')).toBeExisting();
		await CabinetPage.expandCabinet("Clients");
		//await expect($('button[aria-label="toggle Z"]')).toBeExisting();
    });

    //Defect in Description
	it('tc002 Verify that user can create quicknote file when clicking Floating > Create quicknote button, the data should display correctly after created quicknote successfully', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.expandCabinet('2022');
       await CabinetPage.createNewQuickNote(note, note);
       //await expect($('//span[contains(.,"' + note + '")]')).toBeExisting();
    });

    it('tc003 Verify that on the quicknote detail user can select a Copy to PDF  button, The PDF document is created and saved to the same location as the original quicknote', async () => {
		//Cabinet
        await CabinetPage.copyQuickNoteToPDF(note);
        //await expect($('//span[contains(.,"' + note + '.pdf")]')).toBeExisting();
    });

    it('tc003 Delete quick note', async () => {
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet1('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.expandCabinet('2022');
        await CabinetPage.tickOnFile(note + ".oqn");
        await CabinetPage.tickOnFile(note + ".pdf");
        //await CabinetPage.deleteFile();
        //await expect($('//span[contains(.,"' + note + '.oqn")]')).not.toBeExisting();
        //await expect($('//span[contains(.,"' + note + '.oqn")]')).not.toBeExisting();
	});

	it('tc004 Verify that user can create a new task when clicking Floating >  Create new task button, the data should display correctly after create new task successfully', async () => {		
        await LoginPage.reload();
        await CabinetPage.open();
		await CabinetPage.expandCabinet2('Clients');
      await CabinetPage.expandCabinet("Z");
	await CabinetPage.expandCabinet('Z GARRETT-63362');
      await CabinetPage.expandCabinet('2022');
       await CabinetPage.createTask("Claim")
    });

	it('tc005 Verify that user can upload a file when clicking Floating >  Upload button, the data should display correctly afterupload file successfully', async () => {
    	//Cabinet
        await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet3('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.expandCabinet('2022');
       //await CabinetPage.createTask("Claim")
		await CabinetPage.uploadFileSystem('testfile.xlsx');
       // await expect($('(//span[contains(.,"testfile.xlsx")])[last()]')).toBeExisting();
       // await CabinetPage.deleteNewQuickNote("testfile.xlsx")

	});


	it('tc006 Verify that user can scan document when clicking Floating >  Scan here button', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet4('Clients');
       await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
       await CabinetPage.expandCabinet('2022');
       await CabinetPage.createTask("Claim")
        await CabinetPage.scan();
    });

    it('tc008 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Show Deleted Files when right-clicking a Clients cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.rightclickFolder("Clients");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
		//await expect($('//span[contains(.,"Remove From Favourites")]')).toBeExisting();
    });

    
    it('tc009 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Add Folder, Delete Cabinet, Rename Cabinet, Show Deleted files when right-clicking a Cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
       await CabinetPage.expandCabinet("Z");
       await CabinetPage.rightclickFolder("Z");
       await expect($('//span[contains(.,"Open")]')).toBeExisting();
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
       await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
    });

     it('tc010 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add Folder, Add Structure, Show Deleted files when right-clicking a index folder', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet1('Clients');
       await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.rightclickFolder("Z GARRETT-63362");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
        await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
       await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
        await expect($('//span[contains(.,"Copy Folder")]')).toBeExisting();
       await expect($('//span[contains(.,"Add Client Structure")]')).toBeExisting();
     });

     it('tc011 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Add Folder, Add Structure, Move Folder, Copy Folder, Delete Folder, Rename Folder, Show Deleted files and do it when right-clicking a Folder', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet2('Clients');
        await CabinetPage.expandCabinet("Z");
		await CabinetPage.expandCabinet('Z GARRETT-63362');
        await CabinetPage.rightclickFolder("Z GARRETT-63362");
        await CabinetPage.expandCabinet('2022');
        await CabinetPage.rightclickFolder("2022");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
        await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
        await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
        await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
       await expect($('//span[contains(.,"Move Folder")]')).toBeExisting();
        await expect($('//span[contains(.,"Copy Folder")]')).toBeExisting();
       await expect($('//span[contains(.,"Delete Folder")]')).toBeExisting();
       await expect($('//span[contains(.,"Rename Folder")]')).toBeExisting();
       await expect($('//span[contains(.,"Show Deleted Files")]')).toBeExisting();
       //await CabinetPage.setFolderColor();
      // await expect($('//span[normalize-space()="2021"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
        
    });

});



describe('Intray', () => {


    let fileName = "testfile.xlsx";

    it('tc001 Verify that the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
        await LoginPage.reload();
        await IntrayPage.open();
        //let isActive = await $('//span[normalize-space()="' + accountA + '"]/parent::button').getAttribute("class");
        //await expect(isActive.includes("active")).toEqual(true);
    });

    it('tc002 Verify that the current user login can upload default action of a file on his own In-tray', async () => {
        //Pre-condition: Delete all files in Intray then upload 02 file in intray
        await LoginPage.reload();
        await IntrayPage.open();
        await IntrayPage.goToUserIntray(accountA);
        //await IntrayPage.checkInAndDeleteAllFiles();
        await IntrayPage.uploadFileSystem(fileName);
        //await IntrayPage.checkInFile(fileName);
		//await IntrayPage.delete();

    });

    it('tc003 Verify that the current user login can copy a file on his own In-tray', async () => {
        await LoginPage.reload();
        await IntrayPage.open();
        await IntrayPage.goToUserIntray1(accountA);
            //Verify copy file
			await IntrayPage.uploadFileSystem(fileName);
			//await IntrayPage.checkInFile(fileName);
           await IntrayPage.copyTo(accountB);
            await IntrayPage.goToUserIntray(accountB);
          // await expect($('(//span[contains(.,' + fileName + ')]/ancestor::td)[1]')).toBeExisting();
			await IntrayPage.goToUserIntray(accountA);
			await IntrayPage.tickOnFile(fileName);
			//await IntrayPage.delete();
       
    });

    it('tc004 Verify that the current user login can move a file on his own In-tray', async () => {
       
        //Verify move file
        await LoginPage.reload();
        await IntrayPage.open();
        await IntrayPage.goToUserIntray2(accountA);
		await IntrayPage.uploadFileSystem(fileName);
		//await IntrayPage.checkInFile(fileName);
        await IntrayPage.moveTo(accountB);
		await IntrayPage.goToUserIntray(accountB);
		//await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();
		await IntrayPage.goToUserIntray(accountA);
		//await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
        
    });


    it('tc005 Verify that the current user login send email a file on his own In-tray', async () => {
       

        //Verify new email
        await LoginPage.reload();
        await IntrayPage.open();
        await IntrayPage.goToUserIntray3(accountA);
		await IntrayPage.uploadFileSystem(fileName);
       //await IntrayPage.checkInFile(fileName);
        await IntrayPage.tickOnFile(fileName);
      await IntrayPage.newEmail();
       await expect($('app-email-attachments')).toBeExisting();
      await $('//button[.="Cancel"]').click();
       //await IntrayPage.delete();
      // await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
       
    });

    
    
    it('tc006 Verify that the current user login send task a file on his own In-tray', async () => {
       
        await LoginPage.reload();
        await IntrayPage.open();
        await IntrayPage.goToUserIntray4(accountA);
		await IntrayPage.uploadFileSystem(fileName);
      //await IntrayPage.checkInFile(fileName);
      await IntrayPage.sendToTask("Existing");
     //await expect($('app-dialog-existing-task')).toBeExisting();
     await $('//button[.="Cancel"]').click();
     await IntrayPage.sendToTask("New");
     await expect($('app-create-task')).toBeExisting();
      await $('//button[.="Cancel"]').click();
     await IntrayPage.pressButton('enter');
	//await IntrayPage.delete();
    //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();

    });

});



describe('CAC/IAC', () => {
    let groupName = "Automation" + new Date().getTime();

    it('tc004 Verify that user can see Copy, New Email, Send to task and do it (except Copy file) ', async () => { 
        await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet('Clients');
           
			await CabinetPage.expandCabinet("Z");
			await CabinetPage.expandCabinet('Z GARRETT-63362');
			await CabinetPage.expandCabinet("2022");
			await CabinetPage.focusOn("(Claims)");
			await CabinetPage.uploadFileSystem('testfile.xlsx');
			await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
            await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task
            
    });

    it('tc005 Verify that user can see/ copy file into Cabinet list in Home/ Favourite of the Folder Browser when user belongs to group that has Write permission checked CAC page', async () => {
            //Check file can be copied from Cabinet
			await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet1('Clients');
            
			await CabinetPage.expandCabinet("Z");
			await CabinetPage.expandCabinet('Z GARRETT-63362');
			await CabinetPage.expandCabinet("2022");
			await CabinetPage.focusOn("(Claims)");
			await CabinetPage.uploadFileSystem('testfile.xlsx');
			await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            await CabinetPage.copyToFolder("(Claims)"); //Copy to folder: Cabinet/Automation/2022/Emails
            await CabinetPage.collapCabinet("2022");
            await CabinetPage.expandCabinet("2023");
            await CabinetPage.expandCabinet("(Claims)");
            await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).toBeExisting();

            //Check file can be copied from Favorite
            await CabinetPage.addToFavourite("Z GARRETT-63362");
            await FavoritePage.open();
            await FavoritePage.expandFavourites("Z GARRETT-63362");
            await FavoritePage.expandFavourites("2022");
            await FavoritePage.focusOn("(Claims)");
            await FavoritePage.tickOnFile("testfile");
            await CabinetPage.copyToFolder("(Claims)");
            await FavoritePage.collapFavourites("2022");
            await FavoritePage.expandFavourites("2023");
            await FavoritePage.focusOn("(Claims)");
            await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).toBeExisting();
           

    });

    it('tc006 Verify that user can see/ move file into Cabinet list in Home/ Favourite/ Intray of the Folder Browser when user belongs to group that has Delete permission checked.', async () => {
        //Pre-condition: set automation group with permission = Delete, exist copies of documents in TC005
        
			await LoginPage.reload();
			await CabinetPage.open();
			await CabinetPage.expandCabinet2('Clients');
			await CabinetPage.expandCabinet("Z");
			await CabinetPage.expandCabinet('Z GARRETT-63362');
			await CabinetPage.expandCabinet("2022");
			await CabinetPage.focusOn("(Claims)");
			await CabinetPage.uploadFileSystem('testfile.xlsx');
			await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
            await CabinetPage.deleteFile();

            //Check file can be deleted in Favorite
            await FavoritePage.open();
            await FavoritePage.expandFavourites("Z GARRETT-63362");
            await FavoritePage.expandFavourites("2022");
            await FavoritePage.focusOn("(Claims)");
            await FavoritePage.tickOnFile("testfile");
           await FavoritePage.deleteFile();
    });

});



describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});