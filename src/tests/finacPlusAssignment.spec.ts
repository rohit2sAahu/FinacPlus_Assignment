
import { bookApplication } from '../main/pages/bookStoreApplication';
import { BookLoginService } from '../main/pages/loginIntoBooks';
import { userData } from '../main/Utilities/DataSeviceLayer/userData';
import {test,expect} from "../main/fixture/bookApplicationFixture"
import { CRUD_UserDetails } from '../main/Utilities/API_Service/api_service_layer';

test("FinacPlus UI Assignment",async({bookHomeApplication,bookLoginServices})=>{

    await bookLoginServices.searchForBooks();
    await bookLoginServices.printDetailsIntoFile();
    
})
test('FinacPlus API Assignment',async({page,request})=>{
    const obj=  new CRUD_UserDetails(page);
    await obj.createNewUserDetails(request);
    await obj.updateExistingUserDetails(request);

    await obj.fetchUserDetails(request);
})
