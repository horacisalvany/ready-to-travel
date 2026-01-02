import { TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsComponent], // si es standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),       // mock params
            queryParams: of({ filter: 'all' }), // mock query params
            snapshot: {
              paramMap: {
                get: (key: string) => '123', // snapshot mock
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
