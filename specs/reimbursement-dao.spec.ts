import ReimbursementDAO, { ReimbursementDaoCosmosDb } from "../daos/reimbursement-dao"
import Reimbursement, { IsApproved } from "../entities/reimbursement"

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();

describe("Reimbursement DAO Tests", ()=>{

    it("Should get all reimbursements", async ()=>{
        const allReimbursements: Reimbursement[] = await reimbursementDao.getAllReimbursements();
        expect(allReimbursements.length).toBeGreaterThan(2);
    })

    it("Should create a new reimbursement", async ()=>{
        const testReimbursement: Reimbursement = {id: "", ownerId: "test", ownerName: "Fake Name", amount: 300, reason: "Test reason", isApproved: IsApproved.no};
        const reimbursement: Reimbursement = await reimbursementDao.createNewReimbursement(testReimbursement);
        expect(reimbursement.id).toBeTruthy();
    })

    it("Should get reimbursements for a specific user", async ()=>{
        const reimbursements: Reimbursement[] = await reimbursementDao.getReimbursementsForUser("test");
        expect(reimbursements.length).toBe(1);
    })

})