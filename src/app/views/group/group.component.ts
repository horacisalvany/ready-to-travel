import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Group } from './group';
import { GroupService } from './group.service';
import { DialogCreateGroupComponent } from './dialog-add-group/dialog-add-group.component';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  groups: Group[] = [];
  lastInputValue: string = '';

  constructor(
    private groupService: GroupService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadgroups();
  }

  loadgroups() {
    this.groupService
      .getGroups()
      .subscribe((result) => (this.groups = result));
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const containerId = event.container.id;
    const group = this.groups.find(
      (a) => 'cdk-drop-list-' + a.id === containerId
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        previousIndex,
        currentIndex
      );

      // Also update the source group
      const prevContainerId = event.previousContainer.id;
      const prevgroup = this.groups.find(
        (a) => 'cdk-drop-list-' + a.id === prevContainerId
      );
      if (prevgroup) {
        this.updateFirebase(prevgroup.id, prevgroup.items);
      }
    }

    if (group) {
      this.updateFirebase(group.id, group.items);
    }
  }

  updateFirebase(id: string, items: string[]) {
    this.groupService.updateGroup(id, items).subscribe(
      () => {
        console.log('Firebase updated successfully');
      },
      (error) => {
        console.error('Error updating Firebase:', error);
      }
    );
  }

  dropTrash(event: CdkDragDrop<string[]>) {
    const dragData = event.item.data;
    if (dragData?.type === 'group') {
      this.groupService.deleteGroup(dragData.id).subscribe();
      return;
    }
    const prevContainerId = event.previousContainer.id;
    const group = this.groups.find(
      (a) => 'cdk-drop-list-' + a.id === prevContainerId
    );
    if (group) {
      group.items.splice(event.previousIndex, 1);
      this.updateFirebase(group.id, group.items);
    }
  }

  dropGroupCard(_event: CdkDragDrop<any[]>) {
    // Group order is managed by Firebase; no local reorder needed
  }

  groupCardPredicate = (drag: CdkDrag) => drag.data?.type === 'group';
  itemPredicate = (drag: CdkDrag) => drag.data?.type === 'item';

  onDelete(groupIndex: number, elementIndex: number) {
    const group = this.groups[groupIndex];
    group.items.splice(elementIndex, 1);
    this.updateFirebase(group.id, group.items);
  }

  onAdd(index: number) {
    const group = this.groups[index];
    group.items.push(this.lastInputValue);
    this.updateFirebase(group.id, group.items);
  }

  change(event: any) {
    this.lastInputValue = event.target.value;
  }

  openDialogAddGroup(): void {
    const dialogRef = this.dialog.open(DialogCreateGroupComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((title: string) => {
      if (title) {
        this.groupService.addGroup(title).subscribe();
      }
    });
  }
}
