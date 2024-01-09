import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { DialogAddListComponent } from './dialog-add-list/dialog-add-list.component';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  public onClickList(listId: number) {
    const list = lists.find((list) => list.id === listId);
    this.router.navigate([listId], {
      relativeTo: this.route,
      state: list,
    });
  }

  openDialogAddList(
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ): void {
    const dialogRef = this.dialog.open(DialogAddListComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { idsAgroupation: [] },
    });

    dialogRef.afterClosed().subscribe((titleList: string) => {
      this.lists.push({ title: titleList, id: 12, agroupations: [] } as List);
    });
  }
}
