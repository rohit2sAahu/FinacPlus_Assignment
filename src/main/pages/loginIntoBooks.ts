
import{Page,expect} from '@playwright/test';
import { url } from '../config/pageURLs';

import fs from 'fs/promises';


export class BookLoginService{
    page:Page;
    private userNameInput;
    private bookSectionXpath;
    private passwordInput;
    private loginButtonXpath;
    private navigateToBookApplication;
    private searchBookXpath;
    private clickOnSearchedBook;
    private logoutButtonXpath;

    private getTitleXpath;
    private getAuthorXpath;
    private getPublisherXpath;
    
    constructor(page:Page){
        this.page = page;
        this.loginButtonXpath = this.page.getByRole('button',{name:'Login'});
        this.userNameInput = this.page.getByPlaceholder('UserName');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.bookSectionXpath = this.page.locator("//span[text()='Book Store']/parent::a");
        this.navigateToBookApplication = this.page.getByRole('link',{name:'Book Store Application'});
        this.searchBookXpath = this.page.getByPlaceholder('Type to search');
        this.clickOnSearchedBook = this.page.getByRole('link',{name:'Learning JavaScript Design Patterns',exact:true});
        this.logoutButtonXpath = this.page.getByRole('link',{name:'Log out'});
        
        this.getTitleXpath = this.page.locator("//div[@id='title-wrapper']//label");
        this.getAuthorXpath= this.page.locator("//div[@id='author-wrapper']//label");
        this.getPublisherXpath = this.page.locator("//div[@id='publisher-wrapper']//label");
    }

    async loginToBookStore(userName:string,password:string){
        await this.navigateToBookStore();
        
        await this.loginButtonXpath.click();
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButtonXpath.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);
        


    }
    // Clicks on the "Book Store Application" link and ensures the page is loaded
    // by waiting for DOM content to be fully available
    async navigateToBookStore(){
        await this.navigateToBookApplication.click();
        await this.page.waitForLoadState('domcontentloaded')
    }

    /**
     * Navigates from Profile page to Book Store (Books section)
     * by modifying the current URL.
     */

    async navigateToSearchBookSection(){
        const currentUrl =  this.page.url();
        const bookSectionURL = currentUrl.replace("/profile","/books");
        await this.page.goto(bookSectionURL);
    }
    /**
     * Searches for a specific book and navigates to its detail page.
     * Ensures the page is fully loaded before proceeding.
     */

    async searchForBooks(){
        await this.searchBookXpath.fill("Learning JavaScript Design Patterns");
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
        await this.clickOnSearchedBook.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);

    }
    /**
     * Collects and writes book details (Title, Author, Publisher)
     * into a file.
     */
    async printDetailsIntoFile(){
        await this.getTitleOfBookIntoFile();
        await this.getAuthorOfBookIntoFile();
        await this.getPublisherOfBookIntoFile();
    }
    /**
     * Extracts book titles from UI and appends them to a file.
     */
    async getTitleOfBookIntoFile(){
        let content = '';
        content+="\n";
        const count = await this.getTitleXpath.count();
        for(let i=0;i<count;i++){
            const text = await this.getTitleXpath.nth(i).textContent(); 
            content+=text+"  ";
        }
        await fs.appendFile('outputFile.txt',content);
    }
    /**
     * Extracts author names from the UI and appends them to a file.
     */
    async getAuthorOfBookIntoFile(){
        let content = '';
        content+="\n";
        const count = await this.getAuthorXpath.count();
        for(let i=0;i<count;i++){
            const text = await this.getAuthorXpath.nth(i).textContent(); 
            content+=text+"  ";
        }
        await fs.appendFile('outputFile.txt',content);
    }

    /**
     * Extracts publisher names from the UI and appends them to a file.
     */
    async getPublisherOfBookIntoFile(){
        let content = '';
        content+="\n";
        const count = await this.getPublisherXpath.count();
        for(let i=0;i<count;i++){
            const text = await this.getPublisherXpath.nth(i).textContent(); 
            content+=text+"  ";
        }
        await fs.appendFile('outputFile.txt',content);
    }
    /**
     * Logs out from the Book Store application.
     */
    async logoutFromBookApplication(){
        await this.logoutButtonXpath.click();
        
    }


}