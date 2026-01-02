import { TestBed } from '@angular/core/testing';
import { AgroupationComponent } from './agroupation.component';
import { AgroupationService } from './agroupation.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const angularFireDatabaseMock = {
  list: (path: string) => ({
    valueChanges: () => of([]), // simula un observable vacío
    snapshotChanges: () => of([]),
  }),
};

describe('AgroupationComponent', () => {
  let component: AgroupationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [], // importa módulos standalone si tu componente lo es
      declarations: [AgroupationComponent],
      providers: [
        AgroupationService,
        { provide: AngularFireDatabase, useValue: angularFireDatabaseMock },
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
