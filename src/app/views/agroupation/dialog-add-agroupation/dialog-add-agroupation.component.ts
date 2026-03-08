import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-agroupation',
  templateUrl: './dialog-add-agroupation.component.html',
  styleUrls: ['./dialog-add-agroupation.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class DialogCreateAgroupationComponent {
  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogCreateAgroupationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  change(event: any) {
    this.result = event.target.value;
  }
}
