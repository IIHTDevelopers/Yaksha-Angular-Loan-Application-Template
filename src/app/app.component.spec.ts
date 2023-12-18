import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoanComponent } from './components/loan/loan.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, LoanComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should have Loan Application title initially', () => {
            expect(component.title).toEqual('Loan Application');
        });

        it('should have Loan Application h1 heading', () => {
            component.title = 'Loan Application';
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Loan Application');
        });
    });
});
