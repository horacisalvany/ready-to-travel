import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { GroupComponent } from './group.component';
import { GroupService } from './group.service';

const mockGroupService = {
  getGroups: () => of([]),
  updateGroup: jasmine.createSpy('updateGroup').and.returnValue(of(undefined)),
  addGroup: jasmine.createSpy('addGroup').and.returnValue(of('key1')),
  deleteGroup: jasmine.createSpy('deleteGroup').and.returnValue(of(undefined)),
};

describe('GroupComponent', () => {
  let component: GroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule],
      declarations: [GroupComponent],
      providers: [
        { provide: GroupService, useValue: mockGroupService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
