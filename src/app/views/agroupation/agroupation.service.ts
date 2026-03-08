import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Agroupation } from './agroupation';

@Injectable({
  providedIn: 'root',
})
export class AgroupationService {
  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  private userPath(): Observable<string | null> {
    return this.authService.user$.pipe(
      map((user) => (user ? `users/${user.uid}` : null))
    );
  }

  getAgroupations(): Observable<Agroupation[]> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of([]);
        return this.db
          .list(`${path}/agroupations`)
          .snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => {
                const data = c.payload.val() as any;
                return {
                  id: c.payload.key!,
                  title: data?.title ?? 'Untitled',
                  items: data?.items ?? [],
                } as Agroupation;
              })
            )
          );
      })
    );
  }

  updateAgroupation(id: string, updatedItems: string[]): Observable<void> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(undefined as void);
        return from(
          this.db
            .list(`${path}/agroupations`)
            .update(id, { items: updatedItems })
        );
      })
    );
  }

  addAgroupation(title: string, items: string[] = []): Observable<string | null> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(null);
        return from(
          this.db.list(`${path}/agroupations`).push({ title, items })
        ).pipe(map((ref) => ref.key));
      })
    );
  }

  deleteAgroupation(id: string): Observable<void> {
    return this.userPath().pipe(
      switchMap((path) => {
        if (!path) return of(undefined as void);
        return from(this.db.list(`${path}/agroupations`).remove(id));
      })
    );
  }
}
