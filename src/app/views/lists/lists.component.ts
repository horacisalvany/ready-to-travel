import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { List } from './list';
import { lists } from './list.mock';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class ListsComponent {
  lists: List[] = lists;

  constructor(private router: Router, private route: ActivatedRoute) {}

  public onClickList(listId: number) {
    const list = lists.find((list) => list.id === listId);
    this.router.navigate([listId], {
      relativeTo: this.route,
      state: list,
    });
  }
}
