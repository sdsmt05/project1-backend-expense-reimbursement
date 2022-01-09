import UserDAO, { UserDaoCosmosDb } from "../daos/user-dao";
import Employee from "../entities/employee";

const userDao: UserDAO = new UserDaoCosmosDb();

describe("User DAO Tests", ()=>{

    it("Should get user by username", async ()=>{
        const user = await userDao.getUserByUsername("mmouse");
        expect(user.isManager).toBe(true);
    })

})