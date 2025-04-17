import {Client,Account,ID,Functions} from "appwrite"
import { configDotenv } from "dotenv";
configDotenv();
// Initialize the Appwrite client
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID

const account = new Account(client);

// complete verification for the client
export const updateVerification = async (userId, secret) => {
    try{
       const response=await account.updateVerification(userId, secret);
         console.log(response); // Success
            return response;
    }
    catch(error){
        console.log(error); // Failure
        throw error;
    }
}

// update and reset the password
export const updateNewPassword = async (userId, secret, password,password_confirm) => {
    try {
        const response = await account.updateRecovery(userId, secret, password,password_confirm);
        console.log(response); // Success
        return response;
    } catch (error) {
        console.log(error); // Failure
        throw error;
    }
};