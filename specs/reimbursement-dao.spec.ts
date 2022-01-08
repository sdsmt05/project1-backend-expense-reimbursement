import ReimbursementDAO, { ReimbursementDaoCosmosDb } from "../daos/reimbursement-dao"
import Reimbursement, { IsApproved } from "../entities/reimbursement"

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();

describe("Reimbursement DAO Tests", ()=>{

    it("Should get all reimbursements", async ()=>{
        const allReimbursements: Reimbursement[] = await reimbursementDao.getAllReimbursements();
        expect(allReimbursements.length).toBeGreaterThan(2);
    })

    it("Should create a new reimbursement", async ()=>{
        const testReimbursement: Reimbursement = {id: "", owner: "test", amount: 300, reason: "Test reason", isApproved: IsApproved.no};
        const reimbursement: Reimbursement = await reimbursementDao.createNewReimbursement(testReimbursement);
        expect(reimbursement.id).toBeTruthy()
    })

})