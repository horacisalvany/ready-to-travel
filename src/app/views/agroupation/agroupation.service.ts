import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agroupation } from './agroupation';

@Injectable({
  providedIn: 'root'
})
export class AgroupationService {
  constructor(private db: AngularFireDatabase) {}

  getAgroupations(): Observable<Agroupation[]> {
    return this.db
      .list('agroupations')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            const data: Agroupation | null | unknown = c.payload.val(); // data can be null
            if (data) {
              const typedData = data as Agroupation;
              return {
                id: typedData.id,
                title: typedData?.title,
                items: typedData?.items,
              } as Agroupation;
            }
            return {
              id: -1,
              title: 'Untitled',
              items: [],
            } as Agroupation;
          })
        )
      );
  }

  // Update method returns an Observable<void>
  updateAgroupation(id: number, updatedItems: string[]): Observable<void> {
    // Use 'from' to convert the Promise to an Observable
    return from(
      this.db
        .list('agroupations')
        .update(id.toString(), { items: updatedItems })
    );
  }
}
