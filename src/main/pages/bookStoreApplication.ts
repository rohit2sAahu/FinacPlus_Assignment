import { Page } from '@playwright/test';
import { url } from '../config/pageURLs';

export {expect} from '@playwright/test';

export class bookApplication{
    page:Page;
    private bookApplicationXpath;
    constructor(page:Page){
        this.page = page;
        this.bookApplicationXpath  =  this.page.getByRole('link',{name: 'Book Store Application'});
    }

// this function is helping to navigating to the home page
    async navigateToHomePage(){
        await this.page.goto(url.baseHomePageURL);
    }

}