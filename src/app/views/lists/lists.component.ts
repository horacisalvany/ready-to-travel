import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ListService } from '../list/list.service';
import { DialogAddListComponent } from './dialog-add-list/dialog-add-list.component';
import { List } from './list';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, DragDropModule],
})
export class ListsComponent implements OnInit {
  lists: List[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.listService.getLists().subscribe((lists) => (this.lists = lists));
  }

  public onClickList(listId: string) {
    this.router.navigate([listId], {
      relativeTo: this.route,
    });
  }

  dropTrash(event: CdkDragDrop<any>) {
    const listId = event.item.data;
    if (listId) {
      this.listService.deleteList(listId).subscribe();
    }
  }

  dropList(_event: CdkDragDrop<any>) {
    // List order is managed by Firebase; no local reorder needed
  }

  openDialogAddList(
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ): void {
    const dialogRef = this.dialog.open(DialogAddListComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { idsGroup: [] },
    });

    dialogRef.afterClosed().subscribe((titleList: string) => {
      if (titleList) {
        this.listService.addList(titleList).subscribe();
      }
    });
  }
}
