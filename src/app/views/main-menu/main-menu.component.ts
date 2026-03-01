import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  userEmail$ = this.authService.user$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  public onClickMenu(option: string) {
    this.router.navigate([option], { relativeTo: this.route });
  }

  public async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
