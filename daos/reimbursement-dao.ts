import { CosmosClient } from "@azure/cosmos";
import Reimbursement from "../entities/reimbursement";
import {v4} from 'uuid';
import { ResourceNotFoundError } from "../errors/error-handler";

//Cosmos Db Connection Information
const connection = new CosmosClient(process.env.AZURE_COSMOS_CONNECTION);
const database = connection.database('project-api-db');
const container = database.container('Reimbursements');


//ReimbursementDao Interface
export default interface ReimbursementDAO{

    getAllReimbursements(): Promise<Reimbursement[]>

    getReimbursementsForUser(id: string): Promise<Reimbursement[]>

    createNewReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>

    updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>

}

//ReimbursementDao Implementation
export class ReimbursementDaoCosmosDb implements ReimbursementDAO{
    
    async getAllReimbursements(): Promise<Reimbursement[]> {
        const response = await container.items.readAll<Reimbursement>().fetchAll();
        return response.resources;
    }

    async getReimbursementsForUser(id: string): Promise<Reimbursement[]> {
        const query = container.items.query(`SELECT r.id, r.ownerId, r.ownerName, r.amount, r.reason, r.isApproved, r.mgrComment FROM Reimbursements r WHERE r.ownerId = "${id}"`);
        const response = await query.fetchAll();
        if(!response.resources){
            throw new ResourceNotFoundError(`Could not find reimbursements for user with id of  ${id}`);
        }
        return response.resources;
    }

    async createNewReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        reimbursement.id = v4();
        const response = await container.items.create(reimbursement);
        return response.resource;
    }

    async updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        const response = await container.items.upsert<Reimbursement>(reimbursement);
        return response.resource;
    }
}