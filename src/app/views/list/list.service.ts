import { Injectable } from '@angular/core';
import { delay, map, of } from 'rxjs';
import { List } from '../lists/list';
import { lists } from '../lists/list.mock';
@Injectable()
export class ListService {
  lists: List[] = lists;

  getList(id: number) {
    return of(true).pipe(
      delay(500),
      map(() => {
        return lists.find((list) => list.id === id);
      })
    );
  }

  getLists() {
    return of(true).pipe(
      delay(500),
      map(() => {
        return lists;
      })
    );
  }
}
