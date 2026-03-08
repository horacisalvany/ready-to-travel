import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Group } from 'src/app/views/group/group';

@Component({
  selector: 'dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class DialogAddGroupComponent {
  groups: Group[];
  selected: Set<string> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogAddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allGroups: Group[] }
  ) {
    this.groups = data.allGroups;
  }

  onGroup(id: string) {
    if (this.selected.has(id)) {
      this.selected.delete(id);
    } else {
      this.selected.add(id);
    }
  }

  getResult(): string[] {
    return Array.from(this.selected);
  }
}
