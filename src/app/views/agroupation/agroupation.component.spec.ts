import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { AgroupationComponent } from './agroupation.component';
import { AgroupationService } from './agroupation.service';

const mockAgroupationService = {
  getAgroupations: () => of([]),
  updateAgroupation: jasmine.createSpy('updateAgroupation').and.returnValue(of(undefined)),
  addAgroupation: jasmine.createSpy('addAgroupation').and.returnValue(of('key1')),
  deleteAgroupation: jasmine.createSpy('deleteAgroupation').and.returnValue(of(undefined)),
};

describe('AgroupationComponent', () => {
  let component: AgroupationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule],
      declarations: [AgroupationComponent],
      providers: [
        { provide: AgroupationService, useValue: mockAgroupationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AgroupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
