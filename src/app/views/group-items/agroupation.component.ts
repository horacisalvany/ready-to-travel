import { Component, OnInit } from '@angular/core';
import { Agroupation } from './agroupation';
import { agroupations } from './agroupation.mock';

@Component({
  selector: 'agroupation',
  templateUrl: './agroupation.component.html',
  styleUrls: ['./agroupation.component.scss'],
})
export class AgroupationComponent implements OnInit {
  breakpoint: number = 1;
  groupItems: Agroupation = {
    title: 'Makeup bag',
    items: agroupations,
  };

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
}
