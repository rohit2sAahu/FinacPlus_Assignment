import { expect,Page } from "playwright/test";
import { getKey } from "../DataSeviceLayer/apiKey";



export class CRUD_UserDetails{
    page:Page;
    private userId: string;
    private baseURL:string;
    constructor(page:Page){
        this.page=page;
        this.baseURL = 'https://reqres.in';

    }
    // Sends API requests to create multiple users with given details
    async createNewUserDetails(request) {
        
            const response = await request.post(
                `${this.baseURL}/api/collections/users/records`,
                {
                    headers: {
                        'x-api-key': `${getKey.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        data: {
                            username: 'rohit_sdet',
                            location: 'India',
                            is_active: true
                        }  
                    }
                }
                
            );
            expect(response.status()).toBe(201);
            console.log(`Update Status: ${response.status()}`);
            const json = await response.json();
            console.log('Created User:', json);

            this.userId = json.data.id;
            console.log(`Stored userId: ${this.userId}`);

    }
    // Fetches all user records from the API
    async fetchUserDetails(request){
        console.log('userId at fetch time:', this.userId);
        const response = await request.get(
            `${this.baseURL}/api/collections/users/records/${this.userId}?project_id=13909`,
            {
                headers: {
                    'x-api-key': `${getKey.apiKey}`,
                    'X-Reqres-Env': 'prod',
                }
            }
        );
        expect(response.status()).toBe(200);
        console.log(`Get Status: ${response.status()}`);

        const json = await response.json();
        console.log('Fetched User:', JSON.stringify(json, null, 2));

    }
    // Updates an existing user's details via API request
    async updateExistingUserDetails(request){
        const response = await request.post(`${this.baseURL}/api/collections/users/records/${this.userId}`,
            {
            headers: {
                'x-api-key': `${getKey.apiKey}`,
                'X-Reqres-Env': 'prod',
                'Content-Type': 'application/json'
            },
            data: {
                data: {
                    data: {   
                        username: 'rohit_finacPlus_Sdet',  // updated name
                        location: 'India',
                        is_active: true
                    }
                }
            }
        });
        expect(response.status()).toBe(201);
        console.log(`Update Status: ${response.status()}`);
        const json = await response.json();
        console.log('Updated User:', json);
        expect(json.data.data.username).toBe('rohit_finacPlus_Sdet');

    }
}