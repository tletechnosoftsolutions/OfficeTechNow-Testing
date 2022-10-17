
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AuditTrailPage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnAuditTrailLink() {
        return $('[id="Audit Trail-link"]');
    }

    get btnAdministration() {
        return $('#Administration-link');
    }

    get btnAuditTrail() {
        return $('//button[@title="Audit Trail"]');
    }

     /**
     * go to item on menu
     */
    async goToSystemWizard() {
        await $('button[title="System Wizard Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToUserGroupMaintenance() {
        await $('button[title="User & Group Maintenance Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToAuthenticationManagement() {
        await $('button[title="Authentication Management Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToCACAudit() {
        await $('button[title="CAC Audit Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToIACAudit() {
        await $('button[title="IAC Audit Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToTaskTemplate() {
        await $('button[title="Task Template Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    async goToStructureMaintenance() {
        await $('button[title="Structure Maintenance Audit Trail"]').click();
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    /**
     * tick on user or action
     */
    async tickOn(objName) {
        if (objName == "Select All")
            await $('//span[contains(.,"Select All")]').click();
        else
            await $('//label[normalize-space()="' + objName + '"]').click();
    }

    /**
     * click on search user textbox to display user's dropdown list
     */
    async clickOnSelectUser() {
        await $('[formcontrolname="users"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * click on action textbox to display action's dropdown list
     */
    async clickOnSelectAction() {
        await $('[formcontrolname="auditActions"]').click();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

     /**
     * click on export button
     */
    async export() {
        await $('//span[contains(.,"Export")]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

     /**
     * click on refresh button
     */
    async refresh() {
        await $('//span[contains(.,"Refresh")]').click();
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

     /**
     * fill from and to date. Format: DD/MM/YYYY
     */
    async fillDate(fromDate, toDate) {
        await $('[formcontrolname="fromDate"] input').setValue(fromDate);
        await $('[formcontrolname="toDate"] input').setValue(toDate);
    }

    /**
     * open the Audit Trail page
     */
    async open() {
        await this.btnAuditTrailLink.click()
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    async openIndividual() {
        await this.btnAdministration.click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.btnAuditTrail.click()
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

module.exports = new AuditTrailPage();
