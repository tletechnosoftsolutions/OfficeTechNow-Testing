

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FavouritesPage extends Page {
    /**
     * define selectors using getter methods
     */
   
    get btnFavourites() {
        return $('button[title="Favourites"]');
    }


    /**
    * a method to encapsule automation code to interact with the page
    * e.g. to login using username and password
    */
    async expandFavourites(folder) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await $('button[aria-label="toggle ' + folder + '"]').click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    /**
     * open the Cabinet page
     */
    async open () {
        await this.btnFavourites.click();
    }
}

module.exports = new FavouritesPage();
