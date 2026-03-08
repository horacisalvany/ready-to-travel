import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListService } from './list.service';
import { AgroupationService } from '../agroupation/agroupation.service';

const mockListService = {
  getLists: () => of([]),
  getList: () => of({ id: '1', title: 'Test List', agroupationIds: [] }),
  addList: jasmine.createSpy('addList').and.returnValue(of('key1')),
  updateListAgroupations: jasmine.createSpy('updateListAgroupations').and.returnValue(of(undefined)),
};

const mockAgroupationService = {
  getAgroupations: () => of([]),
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: ListService, useValue: mockListService },
        { provide: AgroupationService, useValue: mockAgroupationService },
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
