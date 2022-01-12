import express from 'express';
import cors from 'cors';
import ReimbursementDAO, { ReimbursementDaoCosmosDb } from './daos/reimbursement-dao';
import ReimbursementService, { ReimbursementServiceImpl } from './services/reimbursement-service';
import Reimbursement from './entities/reimbursement';
import UserDAO, { UserDaoCosmosDb } from './daos/user-dao';
import LoginService, { LoginServiceImpl } from './services/login-service';
import Employee from './entities/employee';
import errorHandler from './errors/error-handler';


const app = express();
app.use(express.json());
app.use(cors());

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();
const userDao: UserDAO = new UserDaoCosmosDb();
const reimbursementService: ReimbursementService = new ReimbursementServiceImpl(reimbursementDao);
const loginService: LoginService = new LoginServiceImpl(userDao);


app.get("/reimbursements", async (req, res) =>{
    const reimbursements: Reimbursement[] = await reimbursementService.getReimbursements();
    res.status(200);
    res.send(reimbursements);
})

app.get("/reimbursements/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const reimbursements: Reimbursement[] = await reimbursementService.getReimbursementsByUser(id);
        res.status(200);
        res.send(reimbursements);
    } catch (error) {
        errorHandler(error, req, res);
    }
})

app.post("/reimbursements", async (req, res) =>{
    const reimbursement: Reimbursement = req.body;
    const savedReimbursement: Reimbursement = await reimbursementService.createReimbursement(reimbursement);
    res.status(201);
    res.send(savedReimbursement);
})

app.patch("/login", async (req, res) =>{
    try {
        const body: {username: string, password: string} = req.body;
        const user: Employee = await loginService.loginWithUsernameAndPassword(body.username, body.password);
        res.send(user);
    } catch (error) {
        errorHandler(error, req, res);
    }
})

app.listen(5000, ()=>console.log("Application Started..."))