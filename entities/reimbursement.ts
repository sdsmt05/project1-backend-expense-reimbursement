export enum IsApproved {
    pending = "Pending",
    yes = "Approved",
    no = "Denied"
}

export default interface Reimbursement{
    id: string
    ownerId: string
    ownerName: string
    amount: number
    reason: string
    isApproved: IsApproved
    mgrComment?: string
    imageUrl?: string
}