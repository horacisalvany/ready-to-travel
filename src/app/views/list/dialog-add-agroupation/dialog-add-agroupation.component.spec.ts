import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAgroupationComponent } from './dialog-add-agroupation.component';

describe('DialogAddAgroupationComponent', () => {
  let component: DialogAddAgroupationComponent;
  let fixture: ComponentFixture<DialogAddAgroupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAgroupationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddAgroupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
