import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddAgroupationComponent } from './dialog-add-agroupation.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogAddAgroupationComponent', () => {
  let component: DialogAddAgroupationComponent;
  let fixture: ComponentFixture<DialogAddAgroupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddAgroupationComponent], // standalone component
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // mock any data passed to the dialog
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddAgroupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
