import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of } from 'rxjs';
import { ListService } from './list.service';
import { AuthService } from '../../services/auth.service';

describe('ListService', () => {
  let service: ListService;
  let mockDb: jasmine.SpyObj<AngularFireDatabase>;
  let mockDbObject: jasmine.SpyObj<any>;

  beforeEach(() => {
    mockDbObject = jasmine.createSpyObj('AngularFireObject', [
      'valueChanges',
      'update',
    ]);

    mockDb = jasmine.createSpyObj('AngularFireDatabase', ['object', 'list']);
    mockDb.object.and.returnValue(mockDbObject);

    const mockAuth = {
      user$: of({ uid: 'testUid', email: 'test@test.com' }),
    };

    TestBed.configureTestingModule({
      providers: [
        ListService,
        { provide: AngularFireDatabase, useValue: mockDb },
        { provide: AuthService, useValue: mockAuth },
      ],
    });
    service = TestBed.inject(ListService);
  });

  describe('getSharedList', () => {
    it('should read from sharedLists path', (done) => {
      mockDbObject.valueChanges.and.returnValue(
        of({ title: 'Shared Trip', sections: {}, ownerEmail: 'friend@test.com' })
      );

      service.getSharedList('sharedId1').subscribe((list) => {
        expect(mockDb.object).toHaveBeenCalledWith('sharedLists/sharedId1');
        expect(list?.title).toBe('Shared Trip');
        expect(list?.isShared).toBeTrue();
        done();
      });
    });

    it('should return undefined when shared list does not exist', (done) => {
      mockDbObject.valueChanges.and.returnValue(of(null));

      service.getSharedList('nonexistent').subscribe((list) => {
        expect(list).toBeUndefined();
        done();
      });
    });
  });

  describe('updateSharedSectionItems', () => {
    it('should update items at sharedLists path', (done) => {
      mockDbObject.update.and.returnValue(Promise.resolve());

      service.updateSharedSectionItems('sharedId1', 'sec1', ['item1', 'item2']).subscribe(() => {
        expect(mockDb.object).toHaveBeenCalledWith('sharedLists/sharedId1/sections/sec1');
        expect(mockDbObject.update).toHaveBeenCalledWith({ items: ['item1', 'item2'] });
        done();
      });
    });
  });
});
