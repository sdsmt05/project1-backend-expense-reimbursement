export enum IsApproved {
    pending = "Pending",
    yes = "Approved",
    no = "Denied"
}

export default interface Reimbursement{
    id: string
    owner: string
    amount: number
    reason: string
    isApproved: IsApproved
}