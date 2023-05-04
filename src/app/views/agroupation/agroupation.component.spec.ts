import { DragDropModule } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { AgroupationComponent } from './agroupation.component';

describe('AgroupationComponent', () => {
  let component: AgroupationComponent;
  let fixture: ComponentFixture<AgroupationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, DragDropModule],
      declarations: [AgroupationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgroupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
