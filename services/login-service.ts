import UserDAO from "../daos/user-dao";
import Employee from "../entities/employee";
import { InvalidPasswordError } from "../errors/error-handler";

export default interface LoginService{

    loginWithUsernameAndPassword(username: string, password: string): Promise<Employee>

}

export class LoginServiceImpl implements LoginService{

    private userDao: UserDAO;

    constructor(userDao: UserDAO){
        this.userDao = userDao;
    }
    
    async loginWithUsernameAndPassword(username: string, password: string): Promise<Employee> {
        const user: Employee = await this.userDao.getUserByUsername(username);
        if(user.password !== password){
            throw new InvalidPasswordError("Invalid Password");
        } else {
            return user;
        }
    }

}