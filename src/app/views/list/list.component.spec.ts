import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListService } from './list.service';
import { GroupService } from '../group/group.service';

const mockListService = {
  getLists: () => of([]),
  getList: () => of({ id: '1', title: 'Test List', groupIds: [] }),
  addList: jasmine.createSpy('addList').and.returnValue(of('key1')),
  updateListGroup: jasmine.createSpy('updateListGroup').and.returnValue(of(undefined)),
};

const mockGroupervice = {
  getGroups: () => of([]),
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: ListService, useValue: mockListService },
        { provide: GroupService, useValue: mockGroupervice },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '1' }),
            params: of({ id: '1' }),
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
