import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    Object.defineProperty(window.history, 'state', {
      value: { id: 1, title: 'Test List', agroupations: [] },
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [ListComponent], // standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // mockea parámetros si los usas
            snapshot: { paramMap: { get: () => '123' } }, // mock para snapshot
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
