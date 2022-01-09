import { CosmosClient} from "@azure/cosmos";
import Employee from "../entities/employee";
import { UserNotFoundError } from "../errors/error-handler";

//Cosmos Db Connection Information
const connection = new CosmosClient(process.env.AZURE_COSMOS_CONNECTION);
const database = connection.database('project-api-db');
const container = database.container('Users');

//UserDAO Interface
export default interface UserDAO{

    getUserByUsername(username: string) : Promise<Employee>

}

//UserDAO Implementation
export class UserDaoCosmosDb implements UserDAO{

    async getUserByUsername(username: string): Promise<Employee> {
        const query = container.items.query(`SELECT u.id, u.fname, u.lname, u.username, u.password, u.isManager FROM Users u WHERE u.username = "${username}"`);
        const response = await query.fetchAll();
        if(!response.resources[0]){
            throw new UserNotFoundError(`Could not find a user with username of ${username}`);
        }
        return response.resources[0];
    }
}