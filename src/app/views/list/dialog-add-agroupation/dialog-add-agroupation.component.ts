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
import { agruoupations } from 'src/app/views/agroupation/agroupation.mock';

@Component({
  selector: 'dialog-add-agroupation',
  templateUrl: './dialog-add-agroupation.component.html',
  styleUrls: ['./dialog-add-agroupation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class DialogAddAgroupationComponent {
  agruoupations: Agroupation[] = agruoupations;
  result: boolean[] = new Array(agruoupations.length).fill(false);

  constructor(
    public dialogRef: MatDialogRef<DialogAddAgroupationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean[]
  ) {}

  onAgroupation(index: number) {
    this.result[index] = !this.result[index];
  }
}
