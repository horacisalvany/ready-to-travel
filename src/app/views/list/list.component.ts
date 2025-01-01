import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { agruoupations } from '../agroupation/agroupation.mock';
import { List } from '../lists/list';
import { DialogAddAgroupationComponent } from './dialog-add-agroupation/dialog-add-agroupation.component';
import { ListService } from './list.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [ListService],
})
export class ListComponent implements OnInit {
  list: List | undefined;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    const state = window.history?.state as List | null | undefined;
    if (this.isList(state)) {
      this.list = state;
    } else {
      console.error('State or list not found.');
      console.log(this.route);
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        // Convert the string to a number if needed
        const numericId = id ? +id : null;

        if (numericId !== null) {
          this.listService.getList(numericId).subscribe((x) => (this.list = x));
        }
      });
    }
  }

  private isList(obj: any): obj is List {
    return 'id' in obj && 'title' in obj && 'agroupations' in obj;
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
        if (isSelected && this.list) {
          this.list.agroupations.push(agruoupations[index]);
        }
      });
    });
  }
}
