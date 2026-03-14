import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Group } from '../group/group';
import { GroupService } from '../group/group.service';
import { List } from '../lists/list';
import { DialogAddGroupComponent } from './dialog-add-group/dialog-add-group.component';
import { ListService, UNGROUPED_SECTION_TITLE } from './list.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, DragDropModule],
})
export class ListComponent implements OnInit {
  list: List | undefined;
  /*
    Boolean to control that something has been dropped. Without there are bugs like missclicks after you drop a list on the trash
    and the popup of add a new list is opened for no reason.
   */
  private recentlyDropped = false;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private listService: ListService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.listService.getList(id).subscribe((list) => {
          this.list = list;
        });
      }
    });
  }

  openDialogAddGroup(): void {
    if (this.recentlyDropped) return;
    this.groupService.getGroups().subscribe((allGroups) => {
      const dialogRef = this.dialog.open(DialogAddGroupComponent, {
        width: '250px',
        data: { allGroups },
      });

      dialogRef.afterClosed().subscribe((selectedGroups: Group[]) => {
        if (selectedGroups && this.list) {
          selectedGroups.forEach((group) => {
            this.listService.addSectionToList(this.list!.id, group).subscribe();
          });
        }
      });
    });
  }

  onAddItemToSection(sectionId: string, item: string): void {
    if (!this.list || !item.trim()) return;
    const section = this.list.sections.find((s) => s.id === sectionId);
    if (section) {
      const updatedItems = [...section.items, item.trim()];
      this.listService
        .updateSectionItems(this.list.id, sectionId, updatedItems)
        .subscribe();
    }
  }

  isUngroupedSection(title: string): boolean {
    return title === UNGROUPED_SECTION_TITLE;
  }

  dropTrash(event: CdkDragDrop<any>): void {
    this.markRecentlyDropped();
    const dragData = event.item.data;
    if (dragData?.type === 'section' && this.list) {
      const section = this.list.sections.find((s) => s.id === dragData.id);
      if (section && this.isUngroupedSection(section.title)) return;
      this.listService
        .removeSectionFromList(this.list.id, dragData.id)
        .subscribe();
    }
  }

  private markRecentlyDropped(): void {
    this.recentlyDropped = true;
    setTimeout(() => (this.recentlyDropped = false));
  }
}
