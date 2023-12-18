import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoanComponent } from './loan.component';

describe('LoanComponentComponent', () => {
  let component: LoanComponent;
  let fixture: ComponentFixture<LoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a loan', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4); // Check for the number of input fields
    });

    it('should have a button for adding a loan', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Loan');
    });

    it('should display search input for filtering loans', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit loan form when editing a loan', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a loan when submitting the add loan form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleLoan = {
        customerName: 'John Doe',
        amount: 10000,
        interestRate: 5,
        durationMonths: 12,
      };

      inputFields[0].value = sampleLoan.customerName;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleLoan.amount;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleLoan.interestRate;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = sampleLoan.durationMonths;
      inputFields[3].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.loans.length).toBe(1);
      expect(component.loans[0]).toEqual({
        ...sampleLoan,
        id: 1,
      });
    });

    it('should have initial loans array empty', () => {
      expect(component.loans).not.toBeNull();
      expect(component.loans).toEqual([]);
    });

    it('should add a new loan', () => {
      component.newLoan = {
        id: 1,
        customerName: 'Jane Smith',
        amount: 20000,
        interestRate: 6,
        durationMonths: 24,
      };
      component.addLoan();
      expect(component.loans).not.toBeNull();
      expect(component.loans.length).toBe(1);
    });

    it('should not add a loan with empty fields', () => {
      component.newLoan = {
        id: 0,
        customerName: '',
        amount: 0,
        interestRate: 0,
        durationMonths: 0,
      };
      component.addLoan();
      expect(component.loans).not.toBeNull();
      expect(component.loans.length).toBe(1);
    });

    it('should edit a loan and update it', () => {
      component.newLoan = {
        id: 1,
        customerName: 'Jane Smith',
        amount: 20000,
        interestRate: 6,
        durationMonths: 24,
      };
      component.addLoan();

      component.editLoan(component.loans[0]);
      const updatedLoan = {
        id: component.loans[0].id,
        customerName: 'Updated Name',
        amount: 30000,
        interestRate: 7,
        durationMonths: 36,
      };
      component.editedLoan = { ...updatedLoan };
      component.saveEditedLoan();
      expect(component.loans).not.toBeNull();
      expect(component.loans[0]).not.toBeNull();
      expect(component.loans[0]).toEqual(updatedLoan);
    });

    it('should not edit a loan with empty fields', () => {
      component.newLoan = {
        id: 1,
        customerName: 'Jane Smith',
        amount: 20000,
        interestRate: 6,
        durationMonths: 24,
      };
      component.addLoan();

      component.editLoan(component.loans[0]);
      const originalLoan = { ...component.loans[0] };
      component.newLoan = {
        id: originalLoan.id,
        customerName: '',
        amount: 0,
        interestRate: 0,
        durationMonths: 0,
      };
      component.saveEditedLoan();
      expect(component.loans).not.toBeNull();
      expect(component.loans[0]).not.toBeNull();
      expect(component.loans[0]).toEqual(originalLoan);
    });

    it('should delete a loan', () => {
      component.newLoan = {
        id: 1,
        customerName: 'Jane Smith',
        amount: 20000,
        interestRate: 6,
        durationMonths: 24,
      };
      component.addLoan();

      expect(component.loans).not.toBeNull();
      expect(component.loans.length).toBe(1);
      component.deleteLoan(component.loans[0]);
      expect(component.loans.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editLoan({
        id: 1,
        customerName: 'Jane Smith',
        amount: 20000,
        interestRate: 6,
        durationMonths: 24,
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedLoan).toEqual({});
    });

    it('should filter loans based on search keyword', () => {
      component.newLoan = {
        id: 1,
        customerName: 'John Doe',
        amount: 10000,
        interestRate: 5,
        durationMonths: 12,
      };
      component.addLoan();

      component.searchKeyword = 'John';
      expect(component.filteredLoans.length).toBe(1);

      component.searchKeyword = 'Jane';
      expect(component.filteredLoans.length).toBe(0);
    });
  });
});
