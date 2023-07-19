import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Agroupation } from './agroupation';
import { agruoupations } from './agroupation.mock';

@Component({
  selector: 'agroupation',
  templateUrl: './agroupation.component.html',
  styleUrls: ['./agroupation.component.scss'],
})
export class AgroupationComponent {
  agroupations: Agroupation[] = agruoupations;
  lastInputValue: string;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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
