import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddGroupComponent } from './dialog-add-group.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogAddGroupComponent', () => {
  let component: DialogAddGroupComponent;
  let fixture: ComponentFixture<DialogAddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddGroupComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { allGroups: [] } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
