export interface Customer {
customerId: number;
customerCode: string;
customerName: string;
sectorName: string;
}


export interface LoanApplication {
loanApplicationId: number;
customerId: number;
customerCode: string;
customerName: string;
sector: string;
amount: number;
currency: string;
tenorDays: number;
product: string;
interestRate: number;
loanPurpose: string;
}