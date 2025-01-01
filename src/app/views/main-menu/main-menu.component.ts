import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public onClickMenu(option: string) {
    this.router.navigate([option], { relativeTo: this.route });
  }
}
