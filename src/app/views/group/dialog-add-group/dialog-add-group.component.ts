import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-group',
  templateUrl: './dialog-add-group.component.html',
  styleUrls: ['./dialog-add-group.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class DialogCreateGroupComponent {
  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  change(event: any) {
    this.result = event.target.value;
  }
}
