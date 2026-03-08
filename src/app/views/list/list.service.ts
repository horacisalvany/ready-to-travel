import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { List } from '../lists/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  private userPath(): Observable<string | null> {
    return this.authService.user$.pipe(
      map((user) => (user ? `users/${user.uid}` : null))
    );
  }

  getLists(): Observable<List[]> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of([]);
        return this.db
          .list(`${path}/lists`)
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => {
                const data = c.payload.val() as any;
                return {
                  id: c.payload.key!,
                  title: data?.title ?? 'Untitled',
                  groupIds: data?.groupIds ?? [],
                } as List;
              })
            )
          );
      })
    );
  }

  getList(id: string): Observable<List | undefined> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(undefined);
        return this.db
          .object(`${path}/lists/${id}`)
          .valueChanges()
          .pipe(
            map((data: any) => {
              if (!data) return undefined;
              return {
                id,
                title: data.title,
                groupIds: data.groupIds ?? [],
              } as List;
            })
          );
      })
    );
  }

  addList(title: string): Observable<string | null> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(null);
        return from(
          this.db.list(`${path}/lists`).push({ title, groupIds: [] })
        ).pipe(map((ref) => ref.key));
      })
    );
  }

  deleteList(id: string): Observable<void> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(undefined as void);
        return from(this.db.list(`${path}/lists`).remove(id));
      })
    );
  }

  updateListGroups(
    listId: string,
    groupIds: string[]
  ): Observable<void> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(undefined as void);
        return from(
          this.db.list(`${path}/lists`).update(listId, { groupIds: groupIds })
        );
      })
    );
  }
}
