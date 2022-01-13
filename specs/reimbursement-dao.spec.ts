import ReimbursementDAO, { ReimbursementDaoCosmosDb } from "../daos/reimbursement-dao"
import Reimbursement, { IsApproved } from "../entities/reimbursement"

const reimbursementDao: ReimbursementDAO = new ReimbursementDaoCosmosDb();
let savedReimbursement: Reimbursement = null;

describe("Reimbursement DAO Tests", ()=>{

    it("Should get all reimbursements", async ()=>{
        const allReimbursements: Reimbursement[] = await reimbursementDao.getAllReimbursements();
        expect(allReimbursements.length).toBeGreaterThan(2);
    })

    it("Should create a new reimbursement", async ()=>{
        const testReimbursement: Reimbursement = {id: "", ownerId: "test", ownerName: "Fake Name", amount: 300, reason: "Test reason", isApproved: IsApproved.no};
        savedReimbursement = await reimbursementDao.createNewReimbursement(testReimbursement);
        expect(savedReimbursement.id).toBeTruthy();
    })

    it("Should get reimbursements for a specific user", async ()=>{
        const reimbursements: Reimbursement[] = await reimbursementDao.getReimbursementsForUser("test");
        expect(reimbursements.length).toBeGreaterThanOrEqual(1);
    })

    it("Should update a reimbursement", async ()=> {
        const updatedReimbursement =  {id: savedReimbursement.id, ownerId: "test", ownerName: "Fake Name", amount: 300, reason: "Test reason", isApproved: IsApproved.yes};
        savedReimbursement = await reimbursementDao.updateReimbursement(updatedReimbursement);
        expect(savedReimbursement.isApproved).toBe("Approved");
    })

})