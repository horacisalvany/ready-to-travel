import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Agroupation } from './agroupation';
import { agruoupations } from './agroupation.mock';
import { AgroupationService } from './agroupation.service';

@Component({
  selector: 'agroupation',
  templateUrl: './agroupation.component.html',
  styleUrls: ['./agroupation.component.scss'],
})
export class AgroupationComponent implements OnInit {
  agroupations: Agroupation[] = agruoupations;
  lastInputValue: string;

  constructor(private agroupationService: AgroupationService) {}

  ngOnInit(): void {
    this.loadAgroupations();
  }

  async loadAgroupations() {
    await this.agroupationService
      .getAgroupations()
      .subscribe((result) => (this.agroupations = result));
  }

  drop(event: CdkDragDrop<string[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // Get the agroupation id from event.container.id
    const agroupationId = Number(event.container.id.split('cdk-drop-list-')[1]);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, previousIndex, currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        previousIndex,
        currentIndex
      );
    }

    const agroupation: Agroupation | undefined = this.agroupations.find(
      (groupation) => groupation.id === agroupationId
    );
    if (agroupation) {
      this.updateFirebase(agroupationId, agroupation.items); // Update Firebase
    }
  }

  updateFirebase(id: number, items: string[]) {
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
    const agroupationId =
      Number.parseInt(event.previousContainer.id.split('cdk-drop-list-')[1]) -
      1;
    this.onDelete(agroupationId, event.previousIndex);
  }

  onDelete(agrupationIndex: number, elementIndex: number) {
    this.agroupations[agrupationIndex].items.splice(elementIndex, 1);
  }

  onAdd(index: number) {
    this.agroupations[index].items.push(this.lastInputValue);
  }

  change(event: any) {
    this.lastInputValue = event.target.value;
  }
}
