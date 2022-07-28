

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InTraysPage extends Page {
    /**
     * define selectors using getter methods
     */
   
    get btnInTrays() {
        return $('button[title="In-Trays"]');
    }


    /**
     * open the Cabinet page
     */
    async open () {
        await this.btnInTrays.click();
    }
}

module.exports = new InTraysPage();
