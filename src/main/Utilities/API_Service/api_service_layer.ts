import { expect,Page } from "playwright/test";
import { getKey } from "../DataSeviceLayer/apiKey";



export class CRUD_UserDetails{
    page:Page;
    private baseURL:string;
    constructor(page:Page){
        this.page=page;
        this.baseURL = 'https://reqres.in';

    }
    async createNewUserDetails(request) {

        const users = [
            {
                id: 1,
                username: 'rohit_sdet',
                location: 'India',
                is_active: true
            },
            {
                id: 2,
                username: 'john_doe',
                location: 'USA',
                is_active: false
            },
            {
                id: 3,
                username: 'alex_finac',
                location: 'Canada',
                is_active: true
            }
        ];
    
        for (const user of users) {
            const response = await request.post(
                `${this.baseURL}/api/collections/finacplus-api/records?project_id=13872`,
                {
                    headers: {
                        'x-api-key': `${getKey.postMethod_apiKey}`,
                        'X-Reqres-Env': 'prod',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        data: user   
                    }
                }
            );
    
            console.log("USER DATA IS CREATED ... ");
        }
    }
    async fetchUserDetails(request){
        const response = await request.get(
            `${this.baseURL}/api/collections/finacplus-api/records?project_id=13872`,
            {
                headers: {
                    'x-api-key': `${getKey.getMethod_apiKey}`,
                    'X-Reqres-Env': 'prod',
                }
            }
        );
        const json = await response.json();
        const users = json.data.map(record => record.data);
        console.log(users);
    }
    async updateExistingUserDetails(request){
        const response = await request.post(`${this.baseURL}/api/collections/finacplus-api/records?project_id=13872`,{
            headers: {
                'x-api-key': `${getKey.postMethod_apiKey}`,
                'X-Reqres-Env': 'prod',
                'Content-Type': 'application/json'
            },
            data: {
                data: {
                    data: {   
                        id: 1,
                        location: "India",
                        username: "rohit_finacPlus_Sdet",
                        is_active: true
                    }
                }
            }
        });

    }
}