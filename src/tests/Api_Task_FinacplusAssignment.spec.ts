import { expect,test } from "playwright/test";
import { CRUD_UserDetails } from "../main/Utilities/API_Service/api_service_layer";


/*
This test covers an end-to-end API automation flow starting with the creation of a new user via a POST request.
 The response is validated by checking the HTTP status code and extracting the generated user ID. Using this user ID,
  a GET request is made to retrieve the user details and validate the correctness of the stored data. Further,
  the test performs an update operation on the username using a PUT request and verifies that the updated details are reflected correctly for the same user ID, ensuring consistency across all API operations.
*/

test('FinacPlus API Assignment',async({page,request})=>{
    const obj=  new CRUD_UserDetails(page);
    await obj.createNewUserDetails(request);
    await obj.updateExistingUserDetails(request);
    await obj.fetchUserDetails(request);
})