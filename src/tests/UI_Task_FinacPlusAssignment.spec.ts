
import { bookApplication } from '../main/pages/bookStoreApplication';
import { BookLoginService } from '../main/pages/loginIntoBooks';
import { userData } from '../main/Utilities/DataSeviceLayer/userData';
import {test,expect} from "../main/fixture/bookApplicationFixture"
import { CRUD_UserDetails } from '../main/Utilities/API_Service/api_service_layer';

/*
In this test i had implemented end-to-end UI automation flow starting from the home page navigation to the Book Store application.
 The flow includes user login, navigating to the book list, selecting the specified book, and extracting details such as title, author, and publisher.
  The extracted data is then written and appended to an output.txt file for persistence and validation.
*/

test("FinacPlus UI Assignment",async({bookHomeApplication,bookLoginServices})=>{

    await bookLoginServices.searchForBooks();
    await bookLoginServices.printDetailsIntoFile();
    
})

