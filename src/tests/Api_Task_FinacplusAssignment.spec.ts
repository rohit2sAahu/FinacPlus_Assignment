import { expect,test } from "playwright/test";
import { CRUD_UserDetails } from "../main/Utilities/API_Service/api_service_layer";

test('FinacPlus API Assignment',async({page,request})=>{
    const obj=  new CRUD_UserDetails(page);
    await obj.createNewUserDetails(request);
    await obj.updateExistingUserDetails(request);
    await obj.fetchUserDetails(request);
})