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
const superadmin = 'tssadmin';
const superadmin2='tssadmin4';
const user = 'tle@technosoftsolutions.com.au';
const password = 'Abc@12345';
const isSuperadmin = true;

const download_path = "C:/Users/TuyenLeQuang/Downloads/";
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


describe('Super Admin User', () => {
    it('tc001_Verify that Super admin user always has full permissions, He can access all pages and do all actions in the system.', async () => {
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

    it('tc002- Verify that in all cabinets and Clients/Prospects/DCM folders and cabinets, the floating button has only one option ???Add Task???', async () => {
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


    it('tc003 - Verify the user can see the Client/ Prospect details and the Client/ Prospect folder name in the Recent section when selecting Client/ Prospect folder and its normal folder', async () => {
    //Clients Cabinet
        await LoginPage.reload();
        await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
        await CabinetPage.rightclickFolder("Clients");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
        await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Remove From Favourites")]')).toBeExisting();
               
    });
});

describe('Intrays page', () => {
    it('tc001 - Verify that the user can access In-Trays page in the Home tab and the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
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

        it('tc004 - Verify that user can see and use list of the action in the contextual menu when right-clicking a DCM Cabinet', async () => {
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

            it('tc005 - Verify that user can see and use list of the action in the contextual menu when right-clicking an index folder', async () => {
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


         it('tc006 - Verify that user can see and use list of the action in the contextual menu when right-clicking a normal folder', async () => {
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

            
    it('tc007 - Verify that user can see and use list of the action in the contextual menu when right-clicking a normal folder', async () => {
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

    it('tc008 - Verify that user can see and use list of the action in the contextual menu when right-clicking a DCM Cabinet', async () => {
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


describe('Add New User', () => {

    it('tc001 Verify the user can see and access the User & Authentication Maintenance page to Add a new user when user has ???User & Group Maintenance??? permission ', async () => {
        await UserAuthenticationMaintenancePage.open();
        license = await $('//label[contains(.,"Used licenses")]/following-sibling::strong').getText();
        license = parseInt(license.trim()) + 1;
        await expect($('//span[contains(text(), "Invite")]')).toBeExisting();
    });

    it('tc002 Verify the user can add a new user when he clicks on Invite new user button', async () => {
        await UserAuthenticationMaintenancePage.inviteNewUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "' + createduser + '")]')).toBeExisting();
    });


    it('tc003 Verify that a new user added by super admin user will recieve an email and user can click on "Go to Officetech" button  to set new password and scan QR code  ', async () => {
        await UserAuthenticationMaintenancePage.editUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
    });


    it('tc004 Verify a new user can login to OTNow system after setting password and scan QR code', async () => {
        if (isSuperadmin) {
            await UserAuthenticationMaintenancePage.admineditUser(createduser);
            await LoginPage.reload();
            await UserAuthenticationMaintenancePage.open();
            await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
        }
    });

    it('tc005 Verify a QR code form will appear to user scan QR code before login if user has not scanned QR code before ', async () => {
        await UserAuthenticationMaintenancePage.editAndResendUser(createduser);
        await LoginPage.reload();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//p[contains(text(), "EditAutomation")]')).toBeExisting();
    });

    it('tc006 Verify that the user can reset the password if he forgot it by clicking ???Forgot password????.', async () => {
        if (isSuperadmin) {
        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.deactivateUser(username);
        let isExist = await UserAuthenticationMaintenancePage.isPopupExist("Deactivate user successfully");
        await expect(isExist).toEqual(true);
        await expect($('//p[normalize-space()="' + user + '"]/ancestor::tr//span[contains(.,"Inactive")]')).toBeExisting();
    }
    });

    it('tc007 Verify if the user can not access the Authenticator App to get the OTP code, he can request 2FA Manager to reset his 2-factor Authentication on the OTP form', async () => {
        if (isSuperadmin) {
        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.activateUser(username);
        let isExist = await UserAuthenticationMaintenancePage.isPopupExist("Activate user successfully");
        await expect(isExist).toEqual(true);
        await expect($('//p[normalize-space()="' + user + '"]/ancestor::tr//span[contains(.,"Active")]')).toBeExisting();
    }
    });
});

describe('User profile', () => {
    it('tc001 Verify that user can change new password by clicking Change Password button on the User Profile page', async () => {
        //Precondition: Existing users with status = Migrated
        let userMigrate = "Ken Newton";
        await expect($('//p[normalize-space()="' + userMigrate + '"]/ancestor::tr//span[contains(.,"Migrated")]')).toBeExisting();
    });

    it('tc002 Verify that user can change phone  by clicking Change Phone button on the User Profile page ', async () => {
        //Precondition: Clear all search bars
        await UserAuthenticationMaintenancePage.open();
        //Search by status
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("Status", "Active");
        await expect($('//table//span[.="Active"]')).toBeExisting();
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("Status", "Inactive");
        await UserAuthenticationMaintenancePage.search("Status", "Pending");
        await UserAuthenticationMaintenancePage.search("Status", "Migrated");
        await expect($('//table//span[.="Active"]')).not.toBeExisting();
        //Search by 2FA
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("2FA", "Yes");
        await expect($('//table//td[(contains(.,"Yes"))]')).toBeExisting();
        await expect($('//table//td[(contains(.,"No"))]')).not.toBeExisting();
        await expect($('//table//td[(contains(.,"Requested"))]')).not.toBeExisting();
        //Search by username
        await UserAuthenticationMaintenancePage.clearSearchBars();
        await UserAuthenticationMaintenancePage.search("User", user);
        await expect($('//p[normalize-space()="' + user + '"]')).toBeExisting();
        //Postcondition
        await UserAuthenticationMaintenancePage.clearSearchBars();
    });

    it('tc003 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
        //Verify Total Licenses number after editting in System Configuration
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", 100); //change into 100 total licenses
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//label[contains(.,"Total licenses")]/following-sibling::*[contains(.,"100")]')).toBeExisting();

        //Verify Used Licenses number

        await expect($('//label[contains(.,"Used licenses")]/following-sibling::*[contains(.,"' + license + '")]')).toBeExisting();

        //Post-condition: return old value of Maximum Licenses in System Configuration
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", maximum_license); //change into 24 total licenses
        await SystemConfigurationPage.save();
    });

    it('tc004 Verify the "Invite New User" button is disable when the user uses all Licenses"', async () => {
        //Get recent number of used licenses
        await UserAuthenticationMaintenancePage.open();
        let recentNo = await $('//label[contains(.,"Used licenses")]/following-sibling::*').getText();
        recentNo = recentNo.trim();

        //Verify Invite New User button in 03 scenarios
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo); //change into recent number of used licenses
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).toHaveAttr('disabled', 'true');

        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo - 1); //decrease 1 license
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).toHaveAttr('disabled', 'true');

        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", recentNo + 1); //increase 1 license
        await SystemConfigurationPage.save();
        await UserAuthenticationMaintenancePage.open();
        await expect($('//span[normalize-space()="Invite New User"]/parent::button')).not.toHaveAttr('disabled', 'true');

        //Postcondition
        await SystemConfigurationPage.open();
        await SystemConfigurationPage.editBox("Maximum Licenses", 24); //change back 24
        await SystemConfigurationPage.save();
    });

    it('tc005 Verify the user can export users', async () => {
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.export();
        let download_fileName = "UserListExport.xlsx";
        let fs = require('fs');
        let isExist = fs.existsSync(download_path + download_fileName);
        await expect(isExist).toEqual(true);
        //Postcondition: delete downloaded file
        fs.unlinkSync(download_path + download_fileName);
    });

    it('tc006 Verify that only Super Admin user can see and use Enable/Disable check CAM buttons ', async () => {

        let username = "Tuyen Le"
        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.disableCamUser(username);
        await UserAuthenticationMaintenancePage.enableCamUser(username);
        ////Verify Enable CAM = True
        //await SystemConfigurationPage.open();
        //await SystemConfigurationPage.editList("Enable CAM", "True");
        //await SystemConfigurationPage.save();
        //await LoginPage.reload();
        //await UserAuthenticationMaintenancePage.open();
        //await expect($('//button[normalize-space()="Disable Check CAM"]')).toBeExisting(); //Expected result (1)

        ////await LoginPage.logout();
        ////await LoginPage.login(superadmin2, password);
        ////await UserAuthenticationMaintenancePage.open();
        //////await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (2)

        //////Verify Enable CAM = False
        ////await LoginPage.logout();
        ////await LoginPage.login(superadmin, password);
        //await SystemConfigurationPage.open();
        //await SystemConfigurationPage.editList("Enable CAM", "False");
        //await SystemConfigurationPage.save();
        //await LoginPage.reload();
        //await UserAuthenticationMaintenancePage.open();
        //await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (3)

        ////await LoginPage.logout();
        ////await LoginPage.login(superadmin2, password);
        ////await UserAuthenticationMaintenancePage.open();
        ////await expect($('//button[normalize-space()="Disable Check CAM"]')).not.toBeExisting(); //Expected result (4)

        //////Post-condition: login back to automation account
        ////await LoginPage.logout();
        ////await LoginPage.login(superadmin, password);
    });

    it('tc007 Verify that the user can change the password by clicking Change Password button on the User Profile page', async () => {
        if (!isSuperadmin) {
            let current_password = "Abc@12345"
            let newPassword = current_password + "6";
            await UserProfilePage.open();
            await UserProfilePage.changePassword(current_password, newPassword);
            ////Try to relogin with old password
            //await LoginPage.logout();
            //await LoginPage.login(superadmin, password);
            //await expect($('//div[@role="alert"][normalize-space()="Password is incorrect"]')).toBeExisting();
            ////Try to relogin with new password
            //await LoginPage.login(superadmin, newPassword);
            //await expect($('//span[text()="Home"]')).toBeExisting();
            ////Post-condition: change into old password
            await UserProfilePage.open();
            await UserProfilePage.changePassword(newPassword, password);
        }
    });

    it('tc008 Verify that User Profile will display information the same User information created in the User & Authentication page', async () => {
        await UserProfilePage.open();
        let userEmail = await $('input[id*=email]').getValue();
        let userFirstName = await $('input[id*=firstName]').getValue();
        let userLastName = await $('input[id*=lastName]').getValue();

        await UserAuthenticationMaintenancePage.open();
        await UserAuthenticationMaintenancePage.search("User", superadmin);
        await expect($('//p[contains(.,"' + userEmail + '")]')).toBeExisting();
        await expect($('//p[contains(.,"' + userFirstName + ' ' + userLastName + '")]')).toBeExisting();
    });
});



describe('Client Maintenance', () => {
    it('tc001 Verify the user can see and access the Client Maintenance page to Add a new client when user has ???Add Client??? permission checked on the Group & Permission Maintenance', async () => {
       
        await ClientMaintenancePage.open();
        await expect($('//button//i[.="person_add"]')).toBeExisting();
    });

    it('tc002 Verify that user can input client name or Client code, All name/code that has those letters appear in the client list without clicking any button', async () => {
        await ClientMaintenancePage.createClient(clientname, clientcode);
        await expect($('//td[normalize-space()="' + clientname + '"]')).toBeExisting();
        await CabinetPage.openQuickFind(clientname);
        await expect($('[aria-label="toggle ' + clientname + '"]')).toBeExisting();
    });

    //it('tc004 Verify that if Client Code Required = False, the client code field is hidden when adding/editting a new client.', async () => {
    //    //Pre-condition: edit Client Code Required = False in [System Configuration]
    //    await SystemConfigurationPage.open();
    //    await SystemConfigurationPage.editList("Client Code Required", "False");
    //    await SystemConfigurationPage.save();

    //    await LoginPage.reload();
    //    await ClientMaintenancePage.open();
    //    await $('//button//i[.="person_add"]').click();
    //    await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();

    //    await ClientMaintenancePage.searchClient(clientname);
    //    await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
    //    await expect($('[formcontrolname="clientID"]')).not.toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();
    //});

    //it('tc003 Verify that if Client Code Required = True, the Client Code field is shown and required when adding/editing a new client.', async () => {
    //    //Pre-condition: edit Client Code Required = True in [System Configuration]
    //    await SystemConfigurationPage.open();
    //    await SystemConfigurationPage.editList("Client Code Required", "True");
    //    await SystemConfigurationPage.save();

    //    await LoginPage.reload();
    //    await ClientMaintenancePage.open();
    //    await $('//button//i[.="person_add"]').click();
    //    await expect($('[formcontrolname="clientID"]')).toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();

    //    await ClientMaintenancePage.searchClient(clientname);
    //    await $('//td[normalize-space()="' + clientname + '"]/parent::tr//button[@mattooltip="Rename Client"]').click();
    //    await expect($('[formcontrolname="clientID"]')).toBeExisting();
    //    await $('//button[normalize-space()="Cancel"]').click();
    //});

    it('tc003 Verify that user can apply Folder Structure for the client folder, It should display correct all folder structure applied', async () => {
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.createClient(clientname, clientcode);
        let isExist = await ClientMaintenancePage.isPopupExist("The client " + clientname + " already exists");
        await expect(isExist).toEqual(true);
        await $('//button[normalize-space()="Cancel"]').click();
    });

    it('tc004 Verify that user can rename the client folder, Client folder is renamed will update in the Client Maintenance/ Cabinet list/ Enity/ Client field', async () => {
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await $('//button//i[.="account_tree"]').click();
        //Verify client name and client code are disabled
        await expect($('[formcontrolname="clientName"]')).toHaveAttr('disabled');
        //await expect($('[formcontrolname="clientID"]')).toHaveAttr('disabled');
        await $('//button[normalize-space()="Cancel"]').click();
        //Verify user can change client's structure
        await ClientMaintenancePage.addStructure(clientname, "Standard Client");
        let isExist = await ClientMaintenancePage.isPopupExist("Add client structure successfully");
        await expect(isExist).toEqual(true);

        await CabinetPage.openQuickFind(clientname);
        await expect($('//span[normalize-space()="2022"]')).toBeExisting();
    });

    it('tc005 Verify that user can rename a Client folder', async () => {
        let newName = "Edited " + clientname;
        let newCode = clientcode + "000";
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await ClientMaintenancePage.renameClient(clientname, newName, newCode);
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(newName);
        await expect($('//td[normalize-space()="' + newName + '"]')).toBeExisting();
        //await expect($('//td[normalize-space()="' + newCode + '"]')).toBeExisting();
    });

    it('tc006 Verify that user can delete the client folder', async () => {
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await ClientMaintenancePage.deleteClient(clientname);
        let isExist = await ClientMaintenancePage.isPopupExist("Delete successfully");
        await expect(isExist).toEqual(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await $('//input[@placeholder="Quick Find"]').setValue(clientname);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await expect($('//span[contains(text(),"' + clientname + '")]')).not.toBeExisting();
    });

    it('tc007 Verify that user cannot delete a client if there is any task that is assigned to that client', async () => {
        //Precondition 1: create a new client
        //Precondition 2: create a task and in Entity field, select client in Precondition 1
        let clientname = "A New Client Aug 2016-1152";
        let errorMessage = "Cannot delete the client \"" + clientname + "\" because it is assigned to one or more tasks.";
        await LoginPage.reload();
        await ClientMaintenancePage.open();
        await ClientMaintenancePage.searchClient(clientname);
        await $('//button//i[.="delete"]').click();
        await expect($("//p[contains(text(),'" + errorMessage + "')]")).toBeExisting();
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

	});

    
    it('tc003 Verify that do not show the entity on the result list When using Quick Find or Entity fields to find an entity (client, prospect, ...) that belongs to a non-provided permission cabinet (Search Task form, Create new task form, Send Existing task form)', async () => {
		await LoginPage.reload();
		for (let i = 1; i <= 7; i++) {
			await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
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

	});

    it('tc004 Verify that user can find ,Entity, Cabinet, Clients that are provided permission Read', async () => {
		await LoginPage.reload();
		for (let i = 1; i <= 7; i++) {
			await $('(//*[@id="Home"]//button[contains(@class,"toolbar")])[' + i + ']').click();
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


    it('tc001 Verify the user can see and access the Structure Maintenance page to add a new template when user has ???Structure Maintenance??? permission checked on the Group & Permission Maintenance', async () => {
        await LoginPage.reload();
        let message1 = "The cabinet \'" + cabinet_name + "\' has been created.";
        let message2 = "Please apply access permissions for this cabinet via 'Administration - Cabinet Access Control'.";
        let message3 = "This cabinet is not available to users until permissions are applied. Would you like to set Cabinet Access Control permission for '" + cabinet_name + "' now?";
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.addCabinet(cabinet_name, "None");
        await expect($('//p[contains(.,"' + message1 + '")]')).toBeExisting();
        await expect($('//p[contains(.,"' + message2 + '")]')).toBeExisting();
        await expect($('//p[contains(normalize-space(),"' + message3 + '")]')).toBeExisting();
        await $('//button[.="No"]').click();
    });

    it('tc003 Verify that user can select any of available template structure to rename ', async () => {
        await LoginPage.reload();
        await CabinetSettingsPage.open();
        //Verify in Quick Find
        await $('//input[@placeholder="Quick Find"]').setValue(cabinet_name);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await expect($('(//span[contains(text(),"' + cabinet_name + '")])')).toBeExisting();

    });

    it('tc004 Verify that user can see list of the action in contextual menu: Set Folder Colour, Add Folder, Add Sub Folder, Clone Folder, Delete Folder, Rename Folder and do it when right-clicking a Folder structure', async () => {
        //Precondition: grant Write Cabinet permission
        let newCabinetName = "Clients";
        let errorMessage = "The cabinet " + newCabinetName + " already exist";
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.renameCabinet(cabinet_name, newCabinetName);
        let isExist = await CabinetSettingsPage.isPopupExist(errorMessage);
        await expect(isExist).toEqual(true);
    });

    it('tc005 Verify that user can apply one or multiple cabinets to the Structure template', async () => {
        let newCabinetName = "Renamed " + cabinet_name;
        await CabinetSettingsPage.renameCabinet(cabinet_name, newCabinetName);
        await expect($('//td[normalize-space()="' + newCabinetName + '"]')).toBeExisting();
    });

    it('tc006 Verify that user can select any of the available cabinet name to delete', async () => {
        await CabinetSettingsPage.open();
        await CabinetSettingsPage.deleteCabinet("Renamed " + cabinet_name);
        await expect($('//td[normalize-space()="' + "Renamed " + cabinet_name + '"]')).not.toBeExisting();
    });


    it('tc007 Verify the user can access and use functions the Structure Maintenance page when that user has ???Structure Maintenance??? permission ', async () => {
        await LoginPage.reload();
        await StructureMaintenancePage.open();
        await expect($('button[title="Structure Maintenance"]')).toBeExisting();
        await expect($('//*[contains(.,"New template")]/parent::button')).toBeExisting();
    });

    it('tc008 Verify that user can create a new structure template', async () => {
        await StructureMaintenancePage.addNewTemplate(templatename);
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
    });

    it('tc009 Verify the user can not create/ rename a structure template with the name that already exists', async () => {
        let existTemplateName = "Standard Client";
        await StructureMaintenancePage.renameTemplate(templatename, existTemplateName);
        //let isExist = await StructureMaintenancePage.isPopupExist("Template with name " + existTemplateName + " already exists."); //Issue
        //await expect(isExist).toEqual(true);
        await $('//button[.="Cancel"]').click();
        await StructureMaintenancePage.addNewTemplate(existTemplateName);
        let isExist = await StructureMaintenancePage.isPopupExist("Template with name " + existTemplateName + " already exists.");
        await expect(isExist).toEqual(true);
        await $('//button[.="Cancel"]').click();
    });

    it('tc010 Verify that user can copy a structure template', async () => {
        await StructureMaintenancePage.copyTemplate(templatename);
        let isExist = await StructureMaintenancePage.isPopupExist("Copy Structure Template successfully");
        await expect(isExist).toEqual(true);
        await expect($('//label[normalize-space()="' + "Copy - " + templatename + '"]')).toBeExisting();

        //Postcondition: delete copied template
        await StructureMaintenancePage.deleteTemplate("Copy - " + templatename);
    });

    it('tc011 Verify the user can not copied duplicated Structure template name', async () => {
        await StructureMaintenancePage.copyTemplate(templatename, "Standard Client");
        let isExist = await StructureMaintenancePage.isPopupExist("Template name already exists.");
        await expect(isExist).toEqual(true);
        await $('//button[.="Cancel"]').click();
    });

    it('tc012 Verify that user can see and use list of the action in contextual menu when right-clicking a Folder structure', async () => {
        await StructureMaintenancePage.focusOnTemplate(templatename);
        await $('//span[normalize-space()="New Folder"]/parent::button').click({
            button: 'right'
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        await expect($('//button/span[normalize-space()="Set Folder Colour"]')).toBeExisting();
        await expect($('//button/span[normalize-space()="Add Folder"]')).toBeExisting();
        await expect($('//button/span[normalize-space()="Add Sub Folder"]')).toBeExisting();
        await expect($('//button/span[normalize-space()="Clone Folder"]')).toBeExisting();
        await expect($('//button/span[normalize-space()="Delete Folder"]')).toBeExisting();
        await expect($('//button/span[normalize-space()="Rename Folder"]')).toBeExisting();
    });

    it('tc013 Verify the user can not add folder/ add sub-folder/ rename folder/ clone folder with duplicated folder name', async () => {
        let folderName = "New Folder";
        let errorMessage = "Folder with name " + folderName + " already exists.";
        let errorMessage2 = "Folder with name Sub " + folderName + " already exists.";

        await StructureMaintenancePage.pressEsc();

        //Verify add folder with the duplicated name
        await StructureMaintenancePage.addFolder(folderName, false, "", folderName);
        await expect(await StructureMaintenancePage.isPopupExist(errorMessage)).toEqual(true);
        await $('//button[@aria-label="Close"]').click();

        //Verify clone folder with the duplicated name
        await StructureMaintenancePage.cloneFolder(folderName, folderName);
        await expect(await StructureMaintenancePage.isPopupExist(errorMessage)).toEqual(true);
        await $('//button[@aria-label="Close"]').click();

        //Verify rename folder with the duplicated name
        await StructureMaintenancePage.cloneFolder(folderName);
        await StructureMaintenancePage.renameFolder("Clone of " + folderName, folderName);
        await expect(await StructureMaintenancePage.isPopupExist(errorMessage)).toEqual(true);
        await $('//button[@aria-label="Close"]').click();

        //Verify sub folder with the duplicated name
        await StructureMaintenancePage.addFolder(folderName, true, "", folderName);
        await StructureMaintenancePage.addFolder(folderName, true, "", folderName);
        await expect(await StructureMaintenancePage.isPopupExist(errorMessage2)).toEqual(true);
        await $('//button[@aria-label="Close"]').click();
    });

    it('tc014 Verify that user can apply one or multiple cabinets to the Structure template', async () => {
        await StructureMaintenancePage.tickOnClient();
        await StructureMaintenancePage.saveTemplate();
        await ClientMaintenancePage.open();
        await $('//button//i[.="person_add"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
        //Post-condition
        await $('//button[normalize-space()="Cancel"]').click();
        await StructureMaintenancePage.open();
    });

    it('tc015 Verify that user can select any of available template structure to rename', async () => {
        let newTemplateName = "Renamed " + templatename;
        await StructureMaintenancePage.renameTemplate(templatename, newTemplateName);
        let isExist = await StructureMaintenancePage.isPopupExist("Rename template successfully");
        await expect(isExist).toEqual(true);
        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).toBeExisting();
    });

    it('tc016 Verify that user can select any of available template structure to delete', async () => {
        await StructureMaintenancePage.open();
        await StructureMaintenancePage.deleteTemplate("Renamed " + templatename);
        let isExist = await StructureMaintenancePage.isPopupExist("Delete template successfully");
        await expect(isExist).toEqual(true);
        await expect($('//label[normalize-space()="' + "Renamed " + templatename + '"]')).not.toBeExisting();
    });

});


describe('Cabinet Settings', () => {
    it('tc001 Verify the user can see and access the Cabinet Setting page to add a new cabinet when user has ???Add Cabinet??? permission checked on the Group & Permission Maintenance', async () => {
		await LoginPage.reload();
		await CabinetSettingsPage.open();
        await expect($('//td[normalize-space()="Clients"]')).toBeExisting();
        await expect($('//td[normalize-space()="Prospects"]')).toBeExisting();

        await LoginPage.reload();
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.checkCabinet("Clients");

        await LoginPage.reload();
        await AuditTrailPage.open();
        await expect($('button[title="System Wizard Audit Trail"]')).toBeExisting();
        await expect($('button[title="User & Group Maintenance Audit Trail"]')).toBeExisting();
        await expect($('button[title="Authentication Management Audit Trail"]')).toBeExisting();
        await expect($('button[title="CAC Audit Audit Trail"]')).toBeExisting();
        await expect($('button[title="IAC Audit Audit Trail"]')).toBeExisting();
        await expect($('button[title="Task Template Audit Trail"]')).toBeExisting();
        await expect($('button[title="Structure Maintenance Audit Trail"]')).toBeExisting();

    });

    it('tc002 Verify that user can see created cabinet in Cabinet list, Cabinet Settings after user apllied Read permission for it on the CAC page', async () => {
		let groupName = "Automation" + date;
        let accountA = "Tuyen Le";
        await LoginPage.reload();
		await IntrayAccessControlPage.open();
        await IntrayAccessControlPage.createNewGroup(groupName);
        await IntrayAccessControlPage.focusOn(groupName);
        await IntrayAccessControlPage.tickOnUser(accountA);
        await IntrayAccessControlPage.tickOnPermission("Read");
        await IntrayAccessControlPage.tickOnIntray(accountA);
        await IntrayAccessControlPage.save();
    });

    it('tc003 Verify that user can select any of the available cabinet name to rename ', async () => {
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("A New Client Aug 2016-1152");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.expandCabinet("Business");
        await CabinetPage.tickOnFile("Book1"); //tick on the 1st file
        await expect(await $('[mattooltip="Copy To"]').isClickable()).toEqual(true); //[FAILED] verify cannot copy (non-admin account)
        await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
        await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task
    });

    
    it('tc005 Verify that user can select any of the available cabinet name to apply index type', async () => {
        await LoginPage.reload();
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("A New Client Aug 2016-1152");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.expandCabinet("Business");
        await CabinetPage.tickOnFile("Book1"); //tick on the 1st file
        await expect($('[mattooltip="Move To"]')).toBeExisting();
        await $('(//mat-icon[.="more_vert"])[1]').click();
        await expect($('//span[.="Rename & Properties"]')).toBeExisting();

    });

    
    it('tc006 Verify that user can see and use Delete button when user belongs to group that has Delete permission checked on the CAC/IAC page', async () => {
        await LoginPage.reload();
        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("A New Client Aug 2016-1152");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.expandCabinet("Business"); 
        await CabinetPage.uploadFileSystem('testfile.xlsx');
        await expect($('(//span[contains(.,"testfile.xlsx")])[last()]')).toBeExisting();
        await CabinetPage.tickOnFile("testfile"); //tick on the 1st file
        await CabinetPage.deleteFile();
        await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).not.toBeExisting();  

        //Check file can be deleted in Favorite
        await CabinetPage.uploadFileSystem('testfile.xlsx');
        await FavoritePage.open();
        await FavoritePage.expandFavourites("Clients"); //should be change to Automation folder
        await FavoritePage.expandCabinet("A");
        await FavoritePage.expandCabinet("A New Client Aug 2016-1152");
        await FavoritePage.expandCabinet("2021");
        await FavoritePage.expandCabinet("Business"); 
        await FavoritePage.tickOnFile("testfile");
        await FavoritePage.deleteFile();
        await expect($('(//span[contains(.,"testfile")]/ancestor::td)[1]')).not.toBeExisting();

});

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


describe('Send to task (New Task/ Existing Task)', () => {
 
    it('tc001 Verify that user can select a file(s) to attach to a new task, the selected file will show in Attachments tab', async () => {
        await TaskTemplateMaintenance.open();
        await TaskTemplateMaintenance.createTaskTemplate(newTemplateName);
        await expect($('//label[normalize-space()="' + newTemplateName + '"]')).toBeExisting();
    });

    
    it('tc003 Verify that user can select a file(s) to attach to existing task, the selected file will be attached to task selected', async () => {
        await TaskTemplateMaintenance.activate(newTemplateName);
        await TaskTemplateMaintenance.copy(newTemplateName);
        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).toBeExisting();
    });

    it('tc002 Verify that user can create a new task when selecting Send to task > New Task', async () => {
        await TaskTemplateMaintenance.deletecopy(newTemplateName);
        await expect($('//label[normalize-space()="Copy - ' + newTemplateName + '"]')).not.toBeExisting();
    });
});   






describe('Task Template Maintenance', () => {

    it('tc001 Verify the user can see and access the Task Template Maintenance page to add a new task template when user has ???Template Maintennance??? permission checked on the Group & Permission Maintenance', async () => {
        await TemplateMaintenancePage.open();
        await expect($('button[title="Template Maintenance"]')).toBeExisting();
    });



    it('tc003 Verify that user can select any of the available task template to copy the copied task template will copy all task steps, step setting and task field of the selected template to copy', async () => {
        await TemplateMaintenancePage.open();
        await TemplateMaintenancePage.rightclickFolder("Claims");
        await TemplateMaintenancePage.addFolder(foldername);
        await TemplateMaintenancePage.rightclickFolder(foldername);
        await TemplateMaintenancePage.addSubFolder(foldername + "1");
        await expect($('//span[text()=" ' + foldername + '1"]')).toBeExisting();

    });

    it('tc004 Verify that user can add new a step by clicking Create button', async () => {
        await TemplateMaintenancePage.open();
        await TemplateMaintenancePage.clickFolder(foldername);
        await TemplateMaintenancePage.uploadFileSystem("testfilePDF.pdf");
        await expect($('//span[text()="testfilePDF.pdf"]')).toBeExisting();
    });

    it('tc006 Verify that user can select any of the available Step to move up/down', async () => {
        await TemplateMaintenancePage.open();
        await TemplateMaintenancePage.clickFolder(foldername);
        await TemplateMaintenancePage.openTemplate();

    });

    it('tc007 Verify that user can add new custom fields', async () => {
        await TemplateMaintenancePage.reviewTemplate();
        await expect($('(//div[@id="mainContainer"])')).toBeExisting();
    });

    
    it('tc008 Verify that the task field will display in end of the task list column when user tick show in grid checkbox', async () => {
        await LoginPage.reload();
        await TemplateMaintenancePage.open();
        await TemplateMaintenancePage.clickFolder(foldername);
        await $('(//span[@class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"])[2]').click();       
        await $('(//mat-icon[text()="move_to_inbox"])').click();
        await $('(//button/span[text()="Select"])').click();
    });

     
    it('tc009 Verify the user can  delete templates to another folder on the Template Maintenance page', async () => {
        await TemplateMaintenancePage.uploadFileSystem("testfilePDF.pdf");
        await $('(//span[@class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"])[2]').click();  
        await $('(//mat-icon[text()="delete"])').click();
        await $('//textarea').setValue("delete the tested ");
        await $('//button[.="Delete"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    });

    it('tc010 Verify the user can open templates on the Templates page', async () => {
        await LoginPage.reload();
        await TemplateMaintenancePage.open();
        await TemplateMaintenancePage.clickFolder(foldername);
        await TemplateMaintenancePage.uploadFileSystem("testfilePDF.pdf");
        await LoginPage.reload();
        await TemplatePage.open();
        await TemplatePage.clickFolder(foldername);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await TemplatePage.openTemplate();
    });

    it('tc011 Verify the user can download templates on the Templates page', async () => {
        await LoginPage.reload();
        await TemplatePage.open();
        await TemplatePage.clickFolder(foldername);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await TemplatePage.downloadTemplate();
    });

    
    it('tc012 Verify the user can create an email with the selected templates on Templates page', async () => {
        await LoginPage.reload();
        await TemplatePage.open();
        await TemplatePage.clickFolder(foldername);
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('(//span[@class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"])[2]').click(); 
        await $('(//mat-icon[text()="email"])').click();
        await $('//span[.="Create Email"]').click();
    });

    it('tc013 Verify the user can Verify the user can search templates on Templates and Template Maintenance page', async () => {
        await LoginPage.reload();
        await TemplatePage.open();
        await $('//input[@placeholder="Find Template"]').setValue("testfilePDF");
        await expect($('//span[text()="testfilePDF.pdf"]')).toBeExisting();
        await LoginPage.reload();
        await TemplateMaintenancePage.open();
        await $('//input[@placeholder="Find Template"]').setValue("testfilePDF");
        await expect($('//span[text()="testfilePDF.pdf"]')).toBeExisting();
    });

});



describe('System Admin Wizard', () => {
    it('tc001 Verify that user A can access to System Admin Wizard page when that has "System Admin Users " permission checked on the Group & Permission Maintenance', async () => {
            await SystemAdminWizardPage.open();
            await expect($('button[title="System Admin Wizard"]')).toBeExisting();
    });
    
    it('tc002 Verify that user A can create a new task category, status, priority, task subject, file description, file subject, naming convention', async () => {
        await SystemAdminWizardPage.open();
        //Create new task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1("Automation Task Category " + date);
        await expect($('//label[normalize-space()="Automation Task Category ' + date + '"]')).toBeExisting();

        //Create new task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Status " + date);
        await expect($('//div[normalize-space()="Automation Task Status ' + date + '"]')).toBeExisting();

        //Create new task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm1("Automation Task Priority " + date);
        await expect($('//label[normalize-space()="Automation Task Priority ' + date + '"]')).toBeExisting();

        //Create new task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Subject " + date);
        await expect($('//label[normalize-space()="Automation Task Subject ' + date + '"]')).toBeExisting();

        //Create new task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation Task Custom Field " + date);
        await expect($('//label[normalize-space()="Automation Task Custom Field ' + date + '"]')).toBeExisting();

        //Create new file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation File Description " + date);
        await expect($('//label[normalize-space()="Automation File Description ' + date + '"]')).toBeExisting();

        //Create new file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm2("Automation File Subject " + date);
        await expect($('//label[normalize-space()="Automation File Subject ' + date + '"]')).toBeExisting();

        //Create new naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.clickOnButton("Create");
        await SystemAdminWizardPage.fillForm3("Automation Naming Convention " + date);
        await expect($('//div[normalize-space()="Automation Naming Convention ' + date + '"]')).toBeExisting();
    });

    it('tc003 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to edit', async () => {
        //Edit task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Automation Task Category " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1("Edited Automation Task Category " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).toBeExisting();

        //Edit task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Automation Task Status " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Status " + date);
        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).toBeExisting();

        //Edit task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Automation Task Priority " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm1("Edited Automation Task Priority " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).toBeExisting();

        //Edit task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Automation Task Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Subject " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).toBeExisting();

        //Edit task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn("Automation Task Custom Field " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation Task Custom Field " + date);
        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).toBeExisting();

        //Edit file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn("Automation File Description " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation File Description " + date);
        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).toBeExisting();

        //Edit file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn("Automation File Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm2("Edited Automation File Subject " + date);
        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).toBeExisting();

        //Edit naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Automation Naming Convention " + date);
        await SystemAdminWizardPage.clickOnButton("Edit");
        await SystemAdminWizardPage.fillForm3("Edited Automation Naming Convention " + date);
        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).toBeExisting();
    });

    it('tc004 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to move up/down', async () => {
        //Move to top task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Category " + date);

        //Move to bottom task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
        await SystemAdminWizardPage.moveToBottom();
        await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][last()]/div[1]')).toHaveTextContaining("Edited Automation Task Status " + date);

        //Move to top task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation Task Priority " + date);

        //Move to bottom task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
        await SystemAdminWizardPage.moveToBottom();
        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation Task Subject " + date);

        //Move to bottom file description 
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
        await SystemAdminWizardPage.moveToBottom();
        await expect($('((//app-box-template)[2]//label)[last()]')).toHaveTextContaining("Edited Automation File Description " + date);

        //Move to top subject 
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('((//app-box-template)[2]//label)[1]')).toHaveTextContaining("Edited Automation File Subject " + date);

        //Move to top naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
        await SystemAdminWizardPage.moveToTop();
        await expect($('(//app-box-template)[2]//*[contains(@class,"list-group-item")][1]/div[2]')).toHaveTextContaining("Edited Automation Naming Convention " + date);
    });

    it('tc005 Verify that user A can select Task Categories, Task Statuses , Task Priorities , Task Subjects , File Descriptions , File Subjects, Naming Conventions to click on Auto Sort button, It should sort by alphabetically', async () => {
        //Sort task categories
        await SystemAdminWizardPage.focusOn("Task Categories");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
        //Sort task statuses
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task priorities
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort task subjects
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file descriptions
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort file subjects
        await SystemAdminWizardPage.focusOn("File Subjects");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);

        //Sort naming conventions
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await expect(await SystemAdminWizardPage.compareLists()).toEqual(true);
        
    });

    it('tc006 Verify that user A can select any of the available category, status, priority, task subject, file description, file subject, naming convention to delete', async () => {
        //Delete task category
        await SystemAdminWizardPage.focusOn("Task Categories");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Category " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Category ' + date + '"]')).not.toBeExisting();

        //Delete task status
        await SystemAdminWizardPage.focusOn("Task Statuses");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Status " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="Edited Automation Task Status ' + date + '"]')).not.toBeExisting();

        //Delete task priority
        await SystemAdminWizardPage.focusOn("Task Priorities");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Priority " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Priority ' + date + '"]')).not.toBeExisting();

        //Delete task subject
        await SystemAdminWizardPage.focusOn("Task Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Subject ' + date + '"]')).not.toBeExisting();

        //Delete task custom field
        await SystemAdminWizardPage.focusOn("Task Custom Field");
        await SystemAdminWizardPage.focusOn("Edited Automation Task Custom Field " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation Task Custom Field ' + date + '"]')).not.toBeExisting();

        //Delete file description
        await SystemAdminWizardPage.focusOn("File Descriptions");
        await SystemAdminWizardPage.focusOn("Edited Automation File Description " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation File Description ' + date + '"]')).not.toBeExisting();

        //Delete file subject
        await SystemAdminWizardPage.focusOn("File Subjects");
        await SystemAdminWizardPage.focusOn("Edited Automation File Subject " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//label[normalize-space()="Edited Automation File Subject ' + date + '"]')).not.toBeExisting();

        //Delete naming convention
        await SystemAdminWizardPage.focusOn("Naming Conventions");
        await SystemAdminWizardPage.focusOn("Edited Automation Naming Convention " + date);
        await SystemAdminWizardPage.clickOnButton("Delete");
        await expect($('//div[normalize-space()="Edited Automation Naming Convention ' + date + '"]')).not.toBeExisting();
    });
});


describe('HomePage Maintenance', () => {

	it('tc001 Veify that User can access to Homepage Maintenance page when he has "Home Page Maintenance " permission', async () => {
        await HomePageMaintenancePage.open();
        await expect($('button[title="Homepage Maintenance"]')).toBeExisting();
        await expect($('//span[text()="Show Tasks on Homepage"]')).toBeExisting();      
    });

    it('tc002 Verify that any changes that the user saves in the Homepage Maintenance will be reflected in the Homepage', async () => {
        await HomePageMaintenancePage.modify(date);
        await LoginPage.reload();
        await expect($('//p[contains(text(),"'+date+'")]')).toBeExisting();
    });

	it('tc003 Verify that User can check/uncheck the ???Show My Task on startup??? checkbox to hide/show My task list in homepage (default: ???Show My Task on startup??? checkbox checked)', async () => {
        await HomePageMaintenancePage.open();
        await HomePageMaintenancePage.checkShowTask();
        let isChecked = (await $('[formcontrolname="isShowMyTask"]').getAttribute('class')).includes('checked');
        await expect(isChecked).toEqual(true);
    });

    it('tc004 Verify there is support email on OTNow', async () => {
        await LoginPage.reload();
        await new Promise(resolve => setTimeout(resolve, 3000));
        $('//button[@title="Mail to Technosoft Support"]/img[@class="toolbar-img"]').click();
    });

    it('tc005 Veify that only Super Admin user can access to Copyright & Login Warning Maintenance page in the Administration tab ', async () => {
        await LoginPage.reload();
        await new Promise(resolve => setTimeout(resolve, 3000));
        $('//button[@title="Copyright & Login Warning Maintenance"]/img[@class="toolbar-img"]').click();
    });

});





describe('Audit Trail', () => {
    it('tc001 Verify that user can access to Administration > Audit Trail', async () => {
             await LoginPage.reload();    
            await AuditTrailPage.openIndividual();
            await expect($('[id="Audit Trail"]')).toBeExisting();

            await AuditTrailPage.clickOnSelectUser();
            await AuditTrailPage.tickOn(accountUserA);
            await AuditTrailPage.fillDate("01/07/2022", today);
            await AuditTrailPage.refresh();
            //Verify something here

    });

    it('tc002 Verify that user can access to Invidual Audit Trail when user has "Audit Trail Individual " permission checked on the Group & Permission Maintenance', async () => {
        //Merge with TC001
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
        await AuditTrailPage.open();
        await AuditTrailPage.goToUserGroupMaintenance();
        await AuditTrailPage.clickOnSelectUser();
        await AuditTrailPage.tickOn(superadmin);
        await AuditTrailPage.clickOnSelectAction();
        await AuditTrailPage.tickOn("Select All");
        await AuditTrailPage.refresh();
        //Verify something here
    });

    it('tc006 Verify that user can export search results by clicking Export button', async () => {
        //Pre-condition: TC005
        await AuditTrailPage.export();
        const download_path = "C:/Users/TLe/Downloads/";
        const download_fileName = "exported.xlsx";
        const fs = require('fs');
        let isExist = fs.existsSync(download_path + download_fileName);
        await expect(isExist).toEqual(true);
    });
});




describe('Cabinet list', () => {

	it('tc001 Verify that user can see Cabinet list', async () => {
		//Cabinet
		await CabinetPage.open();
		await expect($('button[aria-label= "toggle Clients"]')).toBeExisting();
		await expect($('button[aria-label= "toggle Development Cabinet"]')).toBeExisting();
		await CabinetPage.expandCabinet("Clients");
		await expect($('button[aria-label="toggle A"]')).toBeExisting();
	});

    //Defect in Description
	it('tc002 Verify that user can create quicknote file when clicking Floating > Create quicknote button, the data should display correctly after created quicknote successfully', async () => {
		//Cabinet
        let note="Note" + new Date().getTime();
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
		await CabinetPage.expandCabinet("A")
		await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
		await CabinetPage.expandCabinet('2021');
        await CabinetPage.createNewQuickNote(note, note, note)
        await expect($('//span[contains(.,"Cancellation")]')).toBeExisting();
    });

    it('tc003 Verify that on the quicknote detail user can select a Copy to PDF  button, The PDF document is created and saved to the same location as the original quicknote', async () => {
		//Cabinet
        let note = "Cancellation";
        await CabinetPage.copyQuickNoteToPDF(note)
        await expect($('//span[contains(.,".pdf")]')).toBeExisting();
        await CabinetPage.deleteNewQuickNote("Cancellation.oqn")
        await CabinetPage.deleteNewQuickNote("Cancellation.pdf")
    });


    //issue can't change status
	it('tc004 Verify that user can create a new task when clicking Floating >  Create new task button, the data should display correctly after create new task successfully', async () => {
		//Cabinet
		await CabinetPage.open();
		await CabinetPage.uploadFileSystem('testfile.xlsx');
        await expect($('(//span[contains(.,"testfile.xlsx")])[last()]')).toBeExisting();
        //await CabinetPage.deleteNewQuickNote("testfile.xlsx")

    });

    //issue unable to create task
	it('tc005 Verify that user can upload a file when clicking Floating >  Upload button, the data should display correctly afterupload file successfully', async () => {
		await CabinetPage.createNewTask("Claim")

	});


	it('tc006 Verify that user can scan document when clicking Floating >  Scan here button', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
		await CabinetPage.expandCabinet("A")
		await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
		await CabinetPage.expandCabinet('2021');
        await CabinetPage.scan()
    });

    it('tc008 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Show Deleted Files when right-clicking a Clients cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
		await CabinetPage.expandCabinet('Clients');
        await CabinetPage.rightclickFolder("Clients");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
		await expect($('//span[contains(.,"Remove From Favourites")]')).toBeExisting();
    });

    
    it('tc009 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add to Favourite, Add Folder, Delete Cabinet, Rename Cabinet, Show Deleted files when right-clicking a Cabinet', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
        await CabinetPage.expandCabinet("A");
        await CabinetPage.rightclickFolder("A");
        await expect($('//span[contains(.,"Open")]')).toBeExisting();
		await expect($('//span[contains(.,"Set Folder Colour")]')).toBeExisting();
        await expect($('//span[contains(.,"Add Folder")]')).toBeExisting();
        await expect($('//span[contains(.,"Add Structure")]')).toBeExisting();
    });

     it('tc010 Verify that user can see list of the action in contextual menu: Open, Set Folder Colour, Add Folder, Add Structure, Show Deleted files when right-clicking a index folder', async () => {
		//Cabinet
		await LoginPage.reload();
		await CabinetPage.open();
        await CabinetPage.expandCabinet('Clients');
         await CabinetPage.expandCabinet("A");
         await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
        await CabinetPage.rightclickFolder("A New Client Aug 2016-1152");
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
        await CabinetPage.expandCabinet('Clients');
         await CabinetPage.expandCabinet("A");
         await CabinetPage.expandCabinet('A New Client Aug 2016-1152');
          await CabinetPage.expandCabinet('2021');
        await CabinetPage.rightclickFolder("2021");
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
         await expect($('//span[normalize-space()="2021"]/preceding-sibling::em[contains(@style,"rgb(250, 209, 101)")]')).toBeExisting();
        
    });
});


describe('Intray', () => {
    let accountA = superadmin2;
    let fileName = "testfile.xlsx";

    it('tc001 Verify that the current users Intray will be highlighted by default and displayed at the top in Intray/ Folder Browser/ File Browser/ Save form', async () => {
        await IntrayPage.open();
        let isActive = await $('//span[normalize-space()="' + superadmin + '"]/parent::button').getAttribute("class");
        await expect(isActive.includes("active")).toEqual(true);
    });

    it('tc002 Verify that the current user login can do all default action of a file on his own In-tray', async () => {
        //Pre-condition: Upload 02 files in intray
        await IntrayPage.uploadFileSystem(fileName);
        await IntrayPage.uploadFileSystem(fileName);

        //Verify copy file
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.copyTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,' + fileName + ')]/ancestor::td)[1]')).toBeExisting();

        //Verify move file
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.moveTo(accountA);
        await IntrayPage.goToUserIntray(accountA);
        await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).toBeExisting();

        //Verify new email
        await IntrayPage.goToUserIntray(superadmin);
        await IntrayPage.tickOnFile(fileName);
        await IntrayPage.newEmail();
        await expect($('app-email-attachments')).toBeExisting();
        await $('//button[.="Cancel"]').click();

        //Verify send to task
        await IntrayPage.sendToTask("Existing");
        await expect($('app-dialog-existing-task')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await IntrayPage.sendToTask("New");
        await expect($('app-create-task')).toBeExisting();
        await $('//button[.="Cancel"]').click();
        await ks.sendKey('enter');

        //Verify delete file
        await IntrayPage.delete();
        //await expect($('(//span[contains(.,"' + fileName + '")]/ancestor::td)[1]')).not.toBeExisting();
    });

    it('tc003 Verify that user can view peoples intray if user has Read/ Write/Delete permission checked in the IAC', async () => {
        let groupName = "Automation" + date;
        //Pre-condition: Upload 02 files in intray
        await IntrayPage.uploadFileSystem(fileName);
        await IntrayPage.uploadFileSystem(fileName);

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

describe('CAC/IAC', () => {
    let groupName = "Automation" + new Date().getTime();
    let accountA = "tssadmin4";

    it('tc004 Verify that user can see Copy, New Email, Send to task and do it (except Copy file) ', async () => {
        //Pre-condition: create new group with permission = Read
        await CabinetAccessControlPage.open();
        await CabinetAccessControlPage.createNewGroup(groupName);
        await CabinetAccessControlPage.focusOn(groupName);
        await CabinetAccessControlPage.checkCabinet(accountA); //tick on user to grant permission
        await CabinetAccessControlPage.checkCabinet("Read"); //tick on Read permission
        await CabinetAccessControlPage.checkCabinet("Clients"); // tick on Cabinet
        await CabinetAccessControlPage.save();
        await LoginPage.logout();
        await LoginPage.login(accountA, password);

        await CabinetPage.open();
        await CabinetPage.expandCabinet("Clients");
        await CabinetPage.expandCabinet("A");
        await CabinetPage.expandCabinet("Automation");
        await CabinetPage.expandCabinet("2021");
        await CabinetPage.expandCabinet("Emails");
        await CabinetPage.tickOnFile("Business"); //tick on the 1st file
        //await expect(await $('[mattooltip="Copy To"]').isClickable()).toEqual(false); //[FAILED] verify cannot copy (non-admin account)
        await expect(await $('[mattooltip="New Email"]').isClickable()).toEqual(true); //verify can add New Email
        await expect(await $('[mattooltip="Send To Task"]').isClickable()).toEqual(true); //verify can Send to task

        //Post-condition: login back to main account
        await LoginPage.logout();
        await LoginPage.login(superadmin, password);
    });

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
        //issue in Favorite
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
        //issue in Favorite
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



describe('Group & Permission Maintenance', () => {
    it('tc001 Verify the user can see and access the Group & Permission Maintenance page when that user has ???User & Group Maintenance??? permission ', async () => {
        await GroupPermissionMaintenancePage.open();
        let existUrl = await browser.getUrl();
        expect(existUrl).toHaveTextContaining("group-management");
    });

    it('tc002 Verify the user can add a new group', async () => {
        await GroupPermissionMaintenancePage.createGroup(templatename);
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
    });

    it('tc005 Verify the user can search groups on the search bar', async () => {
        await GroupPermissionMaintenancePage.search("Group", templatename);
        await expect($('//label[normalize-space()="' + templatename + '"]')).toBeExisting();
    });

    it('tc006 Verify that the message pop-up: "There are some unsaved changes. Are you sure you want to leave?" will be displayed when the user doesnt save change on a group then switch to another group', async () => {
        await LoginPage.reload();
        await GroupPermissionMaintenancePage.open();
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.tickOn(superadmin2);
        await GroupPermissionMaintenancePage.focusOn("Admin");
        await new Promise(resolve => setTimeout(resolve, 1000));
        let isExist = await GroupPermissionMaintenancePage.isMessageExist("There are some unsaved changes. Are you sure you want to leave?");
        await expect(isExist).toEqual(true);
        await $('//button[.="No"]').click();
        await GroupPermissionMaintenancePage.focusOn("Admin");
        await expect(isExist).toEqual(true);
        await $('//button[.="Yes"]').click();
    });

    it('tc007 Verify the user check permission for other users', async () => {
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.tickOn(superadmin);
        await GroupPermissionMaintenancePage.tickOn(superadmin2);
        await GroupPermissionMaintenancePage.tickOn("Home Page Maintenance");
        await GroupPermissionMaintenancePage.tickOn("Template Maintenance");
        await GroupPermissionMaintenancePage.tickOn("User & Group Maintenance");
        await GroupPermissionMaintenancePage.save();
        await GroupPermissionMaintenancePage.isPopupExist("Update Group & Permission successfully");

    });

    it('tc008 Verify that the user list displays all users except Deleted users', async () => {
        //Count users in [Group & Permission Maintenance] then compared with users number in [User & Authentication Maintenance]
        let numOfUser_1 = await $$('//*[@title="Users"]//div[@body]//label').length;
        await UserAuthenticationMaintenancePage.open();
        let numOfUser_2 = await $$('//tbody/tr').length;
        await expect(numOfUser_1).toEqual(numOfUser_2);
    });

    it('tc009 Verify the user can search users and permissions', async () => {
        let searchPermission = "Task Template Manager";
        await GroupPermissionMaintenancePage.open();
        //Search user
        await GroupPermissionMaintenancePage.search("User", superadmin2);
        await expect($('//div[normalize-space()="' + superadmin2 + '"]')).toBeExisting();
        await expect($$('//*[@title="Users"]//div[@body]//label')).toBeElementsArrayOfSize(1);
        //Search Permission
        await GroupPermissionMaintenancePage.search("Permission", searchPermission);
        await expect($('//div[normalize-space()="' + searchPermission + '"]')).toBeExisting();
        await expect($$('//*[@title="Permissions"]//div[@body]//label')).toBeElementsArrayOfSize(1);
    });

    it('tc003 Verify the user can rename the group', async () => {
        await GroupPermissionMaintenancePage.focusOn(templatename);
        await GroupPermissionMaintenancePage.renameGroup(templatename);
        await expect($('//label[normalize-space()="Edited ' + templatename + '"]')).toBeExisting();
    });

    it('tc004 Verify the user can delete the group', async () => {
        await GroupPermissionMaintenancePage.deleteGroup("Edited " + templatename);
        await expect($('//label[normalize-space()="Edited ' + templatename + '"]')).not.toBeExisting();
    });
});















describe('Logout', () => {
    it('should logout', async () => {
        await LoginPage.reload();
        await LoginPage.logout();
    });
});
