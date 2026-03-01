import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Agroupation } from 'src/app/views/agroupation/agroupation';

@Component({
  selector: 'dialog-add-agroupation',
  templateUrl: './dialog-add-agroupation.component.html',
  styleUrls: ['./dialog-add-agroupation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class DialogAddAgroupationComponent {
  agroupations: Agroupation[];
  selected: Set<string> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogAddAgroupationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { allAgroupations: Agroupation[] }
  ) {
    this.agroupations = data.allAgroupations;
  }

  onAgroupation(id: string) {
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
