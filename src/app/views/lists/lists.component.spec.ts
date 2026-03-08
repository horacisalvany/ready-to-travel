import { TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListService } from '../list/list.service';

const mockListService = {
  getLists: () => of([]),
  addList: jasmine.createSpy('addList').and.returnValue(of('key1')),
};

describe('ListsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsComponent],
      providers: [
        { provide: ListService, useValue: mockListService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            queryParams: of({ filter: 'all' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ListsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
