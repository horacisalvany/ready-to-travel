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
}
