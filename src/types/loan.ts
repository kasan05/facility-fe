export default interface  Loan{
    id?:number,
    loanType:string,
    amount:number,
    paidAmount?:number,
    dueAmount?:number,
    bankId:number,
    applicantId:number
}