import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { agruoupations } from '../agroupation/agroupation.mock';
import { List } from '../lists/list';
import { DialogAddAgroupationComponent } from './dialog-add-agroupation/dialog-add-agroupation.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class ListComponent implements OnInit {
  list: List;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    const state = window.history?.state as List | null | undefined;
    if (state) {
      this.list = state;
    } else {
      console.error('State or list not found.');
    }
  }

  openDialogAddAgroupation(
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ): void {
    const dialogRef = this.dialog.open(DialogAddAgroupationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { idsAgroupation: [] },
    });

    dialogRef.afterClosed().subscribe((agroupations: boolean[]) => {
      agroupations.forEach((isSelected, index) => {
        if (isSelected) {
          this.list.agroupations.push(agruoupations[index]);
        }
      });
    });
  }
}
