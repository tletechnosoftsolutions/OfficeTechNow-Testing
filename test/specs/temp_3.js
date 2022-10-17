const LoginPage = require('../pageobjects/login.page');
const CabinetPage = require('../pageobjects/cabinet.page');
const FavouritesPage = require('../pageobjects/favourites.page');
const ClientMaintenancePage = require('../pageobjects/ClientMaintenance.page');
const StructureMaintenancePage = require('../pageobjects/structureMaintenance.page');
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
const IntrayAccessControlPage = require('../pageobjects/intrayAccessControl.page');
const UserAuthenticationMaintenancePage = require('../pageobjects/UserAuthenticationMaintenance.page');
const TemplateMaintenancePage = require('../pageobjects/templateMaintenance.page');
const TemplatePage = require('../pageobjects/template.page');
const SystemConfigurationPage = require('../pageobjects/systemConfiguration.page');
const UserProfilePage = require('../pageobjects/userProfile.page');
const SearchPage = require('../pageobjects/search.page');

const { exec } = require('node:child_process');
const { group } = require('node:console');

const templatename = "AutomationTemplate" + new Date().getTime();
const newTemplatename = "New" + templatename;
const superadmin = 'tssadmin3';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = false;

const download_path = "C:/Users/TLe/Downloads/";
var foldername = "AutomationFolder" + new Date().getTime();
//var foldername = "AutomationFolder1663063974499";
var clientname = "Automation" + new Date().getTime();
var clientcode = new Date().getTime();
var structure = "01. Standard Client";
var cabinet_name = "Automation Testing Cabinet" +new Date().getTime();
var new_cabinet_name = "Renamed Automation Testing Cabinet" + new Date().getTime();
var newTemplateName = "Automation Task Template " + new Date().getTime();
var date = new Date().getTime();

var createduser = new Date().getTime();
var license = 1; 
var maximum_license = 24;

/*
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
*/


describe('Cabinets/ Favourites page', () => {
    it('tc001 Verify that user can see Cabinet list when user has Read permission checked on the CAC page', async () => {
		await LoginPage.reload();
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

    it('tc009 - Verify that in all cabinets and Clients/Prospects/DCM folders and cabinets, the floating button has only one option Add Task', async () => {
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


    it('tc011 - Verify that user can see and use list of the actions in the contextual menu when right-clicking a Clients cabinet', async () => {
    //Clients Cabinet
        await LoginPage.reload();
        await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
        await CabinetPage.rightclickFolder("Clients");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
        await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Remove From Favourites")]')).toBeExisting();
               
    });

    it('tc012 - Verify that user can see and use list of the action in the contextual menu when right-clicking a Normal Cabinet', async () => {
        //Normal Cabinet
        await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Prospects');
        await CabinetPage.rightclickFolder("Prospects");
         await expect($('//span[contains(.,"Open")]')).toBeExisting();
         await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
         await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
         await expect($('//span[contains(.,"Delete Cabinet")]')).toBeExisting();
         await expect($('//span[contains(.,"Rename Cabinet")]')).toBeExisting();
      });

        it('tc013 - Verify that user can see and use list of the action in the contextual menu when right-clicking a DCM Cabinet', async () => {
            //DCM Cabinet
                await LoginPage.reload();
                await CabinetPage.open();
                await CabinetPage.expandCabinet('DCM Test');
                await CabinetPage.rightclickFolder("DCM Test");
                await expect($('//span[contains(.,"Open")]')).toBeExisting();
                await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
                await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
                await expect($('//span[contains(.,"Add DCM Test")]')).toBeExisting();
                await expect($('//span[contains(.,"Delete Cabinet")]')).toBeExisting();
                await expect($('//span[contains(.,"Rename Cabinet")]')).toBeExisting();
                              
            });

            it('tc014 - Verify that user can see and use list of the action in the contextual menu when right-clicking an index folder', async () => {
                await LoginPage.reload();
                await CabinetPage.open();
                await CabinetPage.expandCabinet('Test');
                await CabinetPage.expandCabinet("1");
                await CabinetPage.rightclickFolder("1");
                await expect($('//span[contains(.,"Open")]')).toBeExisting();
                await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
                await CabinetPage.setFolderColor();
                await expect($('//span[normalize-space()="1"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();    
               
         });


         it('tc015 - Verify that user can see and use list of the action in the contextual menu when right-clicking a normal folder', async () => {
            //Normal Cabinet
            await LoginPage.reload();
            await CabinetPage.open();
            await CabinetPage.expandCabinet('Prospects');
             await CabinetPage.expandCabinet("A");
             await CabinetPage.expandCabinet('A New Test Pros-1337');
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
             await CabinetPage.setFolderColor();
             await expect($('//span[normalize-space()="2022"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
             
               
            });

            
    it('tc016 - Verify that user can see and use list of the action in the contextual menu when right-clicking a normal folder', async () => {
        //Normal Cabinet
        await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
         await CabinetPage.expandCabinet("A");
         await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
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
         await CabinetPage.setFolderColor();
         await expect($('//span[normalize-space()="2022"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
         
           
        });

    it('tc017 - Verify that user can see and use list of the action in the contextual menu when right-clicking a DCM Cabinet', async () => {
        //DCM Cabinet
            await LoginPage.reload();
            await CabinetPage.open();
            await CabinetPage.expandCabinet('DCM Test');
            await CabinetPage.expandCabinet("A");
            await CabinetPage.expandCabinet('AAATEST');
            await CabinetPage.rightclickFolder("AAATEST");
            await expect($('//span[contains(.,"Open")]')).toBeExisting();
            await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
            await expect($('//span[contains(.,"Add To Favourites")]')).toBeExisting();
            await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
            await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
            await expect($('//span[contains(.,"Move Folder")]')).toBeExisting();
            await expect($('//span[contains(.,"Move DCM Test")]')).toBeExisting();
            await expect($('//span[contains(.,"Copy Folder")]')).toBeExisting();
            await expect($('//span[contains(.,"Delete Folder")]')).toBeExisting();
            await expect($('//span[contains(.,"Rename Folder")]')).toBeExisting();
            await expect($('//span[contains(.,"Add DCM Test Structure")]')).toBeExisting();
            await expect($('//span[contains(.,"Delete DCM Test")]')).toBeExisting();
            await expect($('//span[contains(.,"Rename DCM Test")]')).toBeExisting();            
            await CabinetPage.setFolderColor();
            await expect($('//span[normalize-space()="AAATEST"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();    
            
        });
       

});



/*
describe('Logout', () => {
	it('should logout', async () => {
		await LoginPage.reload();
		await LoginPage.logout();
	});
});
*/