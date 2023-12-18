import { Component } from '@angular/core';

export interface Loan {
  id: number;
  customerName: string;
  amount: number;
  interestRate: number;
  durationMonths: number;
}

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  loans: Loan[] = [];
  newLoan: Loan = {} as Loan;
  editedLoan: Loan = {} as Loan;
  isEditing = false;
  searchKeyword = '';

  addLoan(): void {
  }

  editLoan(loan: Loan): void {
  }

  saveEditedLoan(): void {
  }

  cancelEdit(): void {
  }

  deleteLoan(loan: Loan): void {
  }

  get filteredLoans(): Loan[] {
    return [];
  }
}
