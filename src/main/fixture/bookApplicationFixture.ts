import{test as base} from '@playwright/test';

import{BookLoginService} from '../pages/loginIntoBooks';
import { userData } from '../Utilities/DataSeviceLayer/userData';
import { bookApplication } from '../pages/bookStoreApplication';

export const test = base.extend<{bookLoginServices:BookLoginService,bookHomeApplication:bookApplication}>({
    // Sets up the home page before tests
    bookHomeApplication:async({page},use)=>{
        const homePageObj = new bookApplication(page);
        await homePageObj.navigateToHomePage();
        await use(homePageObj);
    },
    // Logs into the application and navigates to the book section
    bookLoginServices:async({page},use)=>{
        const loginBook = new BookLoginService(page);
        await loginBook.loginToBookStore(userData.userName,userData.password);
        await loginBook.navigateToSearchBookSection();
        await use(loginBook);
    }
});

export {expect} from '@playwright/test';