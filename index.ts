import express from 'express';
import cors from 'cors';
import ReimbursementDAO, { ReimbursementDaoCosmosDb } from './daos/reimbursement-dao';
import ReimbursementService, { ReimbursementServiceImpl } from './services/reimbursement-service';
import Reimbursement from './entities/reimbursement';


const app = express();
app.use(express.json());
app.use(cors());

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();
const reimbursementService: ReimbursementService = new ReimbursementServiceImpl(reimbursementDao);


app.get("/reimbursements", async (req, res) =>{
    const reimbursements: Reimbursement[] = await reimbursementService.getReimbursements();
    res.status(200);
    res.send(reimbursements);
})

app.post("/reimbursements", async (req, res) =>{
    const reimbursement: Reimbursement = req.body;
    const savedReimbursement: Reimbursement = await reimbursementService.createReimbursement(reimbursement);
    res.status(201);
    res.send(savedReimbursement);
})

app.listen(5000, ()=>console.log("Application Started..."))