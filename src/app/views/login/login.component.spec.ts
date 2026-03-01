import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const mockAuthService = {
    user$: of(null),
    isAuthenticated$: of(false),
    login: jasmine.createSpy('login').and.returnValue(Promise.resolve()),
    loginWithGoogle: jasmine.createSpy('loginWithGoogle').and.returnValue(Promise.resolve()),
    register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),
    logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve()),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between login and register mode', () => {
    expect(component.isRegisterMode).toBeFalse();
    component.toggleMode();
    expect(component.isRegisterMode).toBeTrue();
    component.toggleMode();
    expect(component.isRegisterMode).toBeFalse();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTrue();
    component.hidePassword = !component.hidePassword;
    expect(component.hidePassword).toBeFalse();
  });
});
