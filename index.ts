import express from 'express';
import cors from 'cors';
import ReimbursementDAO, { ReimbursementDaoCosmosDb } from './daos/reimbursement-dao';
import ReimbursementService, { ReimbursementServiceImpl } from './services/reimbursement-service';
import Reimbursement, { IsApproved } from './entities/reimbursement';
import UserDAO, { UserDaoCosmosDb } from './daos/user-dao';
import LoginService, { LoginServiceImpl } from './services/login-service';
import Employee from './entities/employee';
import errorHandler from './errors/error-handler';
import { logger } from './logger/logger';
import multer from 'multer';
import BlobDAO, { BlobDao } from './daos/blob-dao';


const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});
app.use(express.json());
app.use(cors());

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();
const userDao: UserDAO = new UserDaoCosmosDb();
const reimbursementService: ReimbursementService = new ReimbursementServiceImpl(reimbursementDao);
const loginService: LoginService = new LoginServiceImpl(userDao);
const blobDao: BlobDAO = new BlobDao();


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
        logger.error(error.message);
    }
})

app.post("/reimbursements", async (req, res) =>{
    const reimbursement: Reimbursement = req.body;
    const savedReimbursement: Reimbursement = await reimbursementService.createReimbursement(reimbursement);
    res.status(201);
    res.send(savedReimbursement);
})

app.post("/upload", upload.single('myFile'), async (req, res) =>{
    const originalName = req.file.originalname;
    const buffer = req.file.buffer;
    const size = req.file.size;
    const uploadedBlobUri = await blobDao.createBlob(originalName, buffer, size);
    res.status(200);
    res.send(uploadedBlobUri);
})

app.patch("/login", async (req, res) =>{
    try {
        const body: {username: string, password: string} = req.body;
        const user: Employee = await loginService.loginWithUsernameAndPassword(body.username, body.password);
        res.send(user);
    } catch (error) {
        errorHandler(error, req, res);
        logger.error(error.message)
    }
})

app.put("/reimbursements/:id", async (req, res) =>{
    const reimbursement = req.body;
    const updatedReimbursement: Reimbursement = await reimbursementService.updateReimbursement(reimbursement);
    res.status(201);
    res.send(updatedReimbursement);
})

app.listen(process.env.PORT ?? 5000, ()=>console.log("Application Started..."))