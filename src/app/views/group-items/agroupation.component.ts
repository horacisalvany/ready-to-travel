import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Agroupation } from './agroupation';
import { agruoupations } from './agroupation.mock';

@Component({
  selector: 'agroupation',
  templateUrl: './agroupation.component.html',
  styleUrls: ['./agroupation.component.scss'],
})
export class AgroupationComponent implements OnInit {
  breakpoint: number = 1;
  agroupations: Agroupation[] = agruoupations;

  ngOnInit() {
    if (window.innerWidth <= 400) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 800) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }

  onResize() {
    if (window.innerWidth <= 400) {
      this.breakpoint = 1;
    } else if (window.innerWidth <= 900) {
      this.breakpoint = 2;
    } else {
      this.breakpoint = 3;
    }
  }
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
