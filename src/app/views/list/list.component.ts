import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Group } from '../group/group';
import { GroupService } from '../group/group.service';
import { List } from '../lists/list';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { ListService } from './list.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class ListComponent implements OnInit {
  list: List | undefined;
  groups: Group[] = [];
  allGroups: Group[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private listService: ListService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.groupService
      .getGroups()
      .subscribe((all) => {
        this.allGroups = all;
        this.updateDisplayedGroups();
      });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.listService.getList(id).subscribe((list) => {
          this.list = list;
          this.updateDisplayedGroups();
        });
      }
    });
  }

  private updateDisplayedGroups() {
    if (!this.list || !this.allGroups.length) return;
    this.groups = this.allGroups.filter((a) =>
      this.list!.groupIds.includes(a.id)
    );
  }

  openDialogAddGroup(
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ): void {
    const dialogRef = this.dialog.open(DialogAddGroupComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { allGroups: this.allGroups },
    });

    dialogRef.afterClosed().subscribe((selectedIds: string[]) => {
      if (selectedIds && this.list) {
        const merged = [...new Set([...this.list.groupIds, ...selectedIds])];
        this.listService
          .updateListGroups(this.list.id, merged)
          .subscribe();
      }
    });
  }
}
