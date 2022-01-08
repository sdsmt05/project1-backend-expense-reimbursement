import { CosmosClient } from "@azure/cosmos";
import Reimbursement from "../entities/reimbursement";
import {v4} from 'uuid';

//Cosmos Db Connection Information
const connection = new CosmosClient(process.env.AZURE_COSMOS_CONNECTION);
const database = connection.database('project-api-db');
const container = database.container('Reimbursements');


//ReimbursementDao Interface
export default interface ReimbursementDAO{

    getAllReimbursements(): Promise<Reimbursement[]>

    createNewReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>

}

//ReimbursementDao Implementation
export class ReimbursementDaoCosmosDb implements ReimbursementDAO{
    
    async getAllReimbursements(): Promise<Reimbursement[]> {
        const response = await container.items.readAll<Reimbursement>().fetchAll();
        return response.resources;
    }

    async createNewReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        reimbursement.id = v4();
        const response = await container.items.create(reimbursement);
        return response.resource;
    }
}