import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogCreateAgroupationComponent } from './dialog-add-agroupation.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DialogCreateAgroupationComponent', () => {
  let component: DialogCreateAgroupationComponent;
  let fixture: ComponentFixture<DialogCreateAgroupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateAgroupationComponent],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCreateAgroupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
