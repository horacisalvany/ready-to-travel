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
    this.groupService.getGroups().subscribe((allGroups) => {
      const dialogRef = this.dialog.open(DialogAddGroupComponent, {
        width: '250px',
        data: { allGroups },
      });

      dialogRef.afterClosed().subscribe((selectedGroups: Group[]) => {
        if (selectedGroups && this.list) {
          selectedGroups.forEach((group) => {
            this.listService
              .addSectionToList(this.list!.id, group)
              .subscribe();
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

  onRemoveSection(sectionId: string): void {
    if (!this.list) return;
    this.listService
      .removeSectionFromList(this.list.id, sectionId)
      .subscribe();
  }
}
