import { Component, OnInit } from '@angular/core';
import { items } from './group-items.mock';
import { GroupItems } from './group-items.model';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.component.html',
  styleUrls: ['./group-items.component.scss'],
})
export class GroupItemsComponent implements OnInit {
  breakpoint: number = 1;
  groupItems: GroupItems = {
    title: 'Makeup bag',
    items: items,
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
