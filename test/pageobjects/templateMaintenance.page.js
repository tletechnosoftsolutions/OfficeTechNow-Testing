const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class TemplateMaintenancePage extends Page {
    /**
     * define selectors using getter methods
     */

    get btnTemplateMaintenance() {
        return $('button[title="Template Maintenance"]');
    }

    get btnTools() {
        return $('#Tools-link');
    }

    /**
     * open the Task page
     */
    async open() {
        await this.btnTools.click()
        await this.btnTemplateMaintenance.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

}

module.exports = new TemplateMaintenancePage();
