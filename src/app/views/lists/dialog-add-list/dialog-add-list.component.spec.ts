import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddListComponent } from './dialog-add-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogAddListComponent', () => {
  let component: DialogAddListComponent;
  let fixture: ComponentFixture<DialogAddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddListComponent], // standalone component
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // mock any data passed to the dialog
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
