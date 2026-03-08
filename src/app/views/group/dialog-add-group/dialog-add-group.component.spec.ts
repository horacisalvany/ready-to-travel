import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCreateGroupComponent } from './dialog-add-group.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogCreateGroupComponent', () => {
  let component: DialogCreateGroupComponent;
  let fixture: ComponentFixture<DialogCreateGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateGroupComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
