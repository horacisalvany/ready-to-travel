import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-add-list',
  templateUrl: './dialog-add-list.component.html',
  styleUrls: ['./dialog-add-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class DialogAddListComponent {
  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean[]
  ) {}

  onCreate(title: string) {
    this.result = title;
  }
  change(event: any) {
    this.result = event.target.value;
  }
}
