import UserDAO from "../daos/user-dao"
import Employee from "../entities/employee"
import { InvalidPasswordError } from "../errors/error-handler";
import LoginService, { LoginServiceImpl } from "../services/login-service";

describe("Login Service Tests", ()=>{

    const userDaoStub: UserDAO = {
        async getUserByUsername(username: string): Promise<Employee>{
            return {id: "", fname: "Peter", lname: "Pan", username: "ppan", password: "MyPassword", isManager: false};
        }
    }

    const loginService: LoginService = new LoginServiceImpl(userDaoStub);

    it("Should throw an error if there is an incorrect password", async ()=>{
        try {
            await loginService.loginWithUsernameAndPassword("ppan", "invalidpassword");
            fail();
        } catch (error){
            expect(error).toBeInstanceOf(InvalidPasswordError);
        }
    })
})