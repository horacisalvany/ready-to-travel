import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Agroupation } from './agroupation';
import { AgroupationService } from './agroupation.service';
import { DialogCreateAgroupationComponent } from './dialog-add-agroupation/dialog-add-agroupation.component';

@Component({
  selector: 'agroupation',
  templateUrl: './agroupation.component.html',
  styleUrls: ['./agroupation.component.scss'],
})
export class AgroupationComponent implements OnInit {
  agroupations: Agroupation[] = [];
  lastInputValue: string = '';

  constructor(
    private agroupationService: AgroupationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAgroupations();
  }

  loadAgroupations() {
    this.agroupationService
      .getAgroupations()
      .subscribe((result) => (this.agroupations = result));
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    const containerId = event.container.id;
    const agroupation = this.agroupations.find(
      (a) => 'cdk-drop-list-' + a.id === containerId
    );

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        previousIndex,
        currentIndex
      );

      // Also update the source agroupation
      const prevContainerId = event.previousContainer.id;
      const prevAgroupation = this.agroupations.find(
        (a) => 'cdk-drop-list-' + a.id === prevContainerId
      );
      if (prevAgroupation) {
        this.updateFirebase(prevAgroupation.id, prevAgroupation.items);
      }
    }

    if (agroupation) {
      this.updateFirebase(agroupation.id, agroupation.items);
    }
  }

  updateFirebase(id: string, items: string[]) {
    this.agroupationService.updateAgroupation(id, items).subscribe(
      () => {
        console.log('Firebase updated successfully');
      },
      (error) => {
        console.error('Error updating Firebase:', error);
      }
    );
  }

  dropTrash(event: CdkDragDrop<string[]>) {
    const prevContainerId = event.previousContainer.id;
    const agroupation = this.agroupations.find(
      (a) => 'cdk-drop-list-' + a.id === prevContainerId
    );
    if (agroupation) {
      agroupation.items.splice(event.previousIndex, 1);
      this.updateFirebase(agroupation.id, agroupation.items);
    }
  }

  onDelete(agroupationIndex: number, elementIndex: number) {
    const agroupation = this.agroupations[agroupationIndex];
    agroupation.items.splice(elementIndex, 1);
    this.updateFirebase(agroupation.id, agroupation.items);
  }

  onAdd(index: number) {
    const agroupation = this.agroupations[index];
    agroupation.items.push(this.lastInputValue);
    this.updateFirebase(agroupation.id, agroupation.items);
  }

  change(event: any) {
    this.lastInputValue = event.target.value;
  }

  openDialogAddAgroupation(): void {
    const dialogRef = this.dialog.open(DialogCreateAgroupationComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((title: string) => {
      if (title) {
        this.agroupationService.addAgroupation(title).subscribe();
      }
    });
  }
}
