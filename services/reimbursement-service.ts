import ReimbursementDAO from "../daos/reimbursement-dao";
import Reimbursement from "../entities/reimbursement";


export default interface ReimbursementService{

    getReimbursements(): Promise<Reimbursement[]>;

    createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement>;
}

export class ReimbursementServiceImpl implements ReimbursementService{

    private reimbursementDao: ReimbursementDAO;

    constructor(reimbursementDao: ReimbursementDAO){
        this.reimbursementDao = reimbursementDao;
    }

    getReimbursements(): Promise<Reimbursement[]> {
        return this.reimbursementDao.getAllReimbursements();
    }
    createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        return this.reimbursementDao.createNewReimbursement(reimbursement);
    }

}