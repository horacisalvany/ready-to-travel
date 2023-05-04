import { Component } from '@angular/core';
import { GroupItems } from './group-items.model';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.component.html',
  styleUrls: ['./group-items.component.scss'],
})
export class GroupItemsComponent {
  groupItems: GroupItems = {
    title: 'Makeup bag',
    items: ['toothbrush', 'Razor blade', 'ear plugs', 'Dormidina'],
  };
}
