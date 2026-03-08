import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Agroupation } from '../agroupation/agroupation';
import { AgroupationService } from '../agroupation/agroupation.service';
import { List } from '../lists/list';
import { DialogAddAgroupationComponent } from './dialog-add-agroupation/dialog-add-agroupation.component';
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
  agroupations: Agroupation[] = [];
  allAgroupations: Agroupation[] = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private listService: ListService,
    private agroupationService: AgroupationService
  ) {}

  ngOnInit(): void {
    this.agroupationService
      .getAgroupations()
      .subscribe((all) => {
        this.allAgroupations = all;
        this.updateDisplayedAgroupations();
      });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.listService.getList(id).subscribe((list) => {
          this.list = list;
          this.updateDisplayedAgroupations();
        });
      }
    });
  }

  private updateDisplayedAgroupations() {
    if (!this.list || !this.allAgroupations.length) return;
    this.agroupations = this.allAgroupations.filter((a) =>
      this.list!.agroupationIds.includes(a.id)
    );
  }

  openDialogAddAgroupation(
    enterAnimationDuration: string = '0ms',
    exitAnimationDuration: string = '0ms'
  ): void {
    const dialogRef = this.dialog.open(DialogAddAgroupationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { allAgroupations: this.allAgroupations },
    });

    dialogRef.afterClosed().subscribe((selectedIds: string[]) => {
      if (selectedIds && this.list) {
        const merged = [...new Set([...this.list.agroupationIds, ...selectedIds])];
        this.listService
          .updateListAgroupations(this.list.id, merged)
          .subscribe();
      }
    });
  }
}
