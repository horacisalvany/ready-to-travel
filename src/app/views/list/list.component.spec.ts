import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ListComponent } from './list.component';
import { ListService } from './list.service';
import { GroupService } from '../group/group.service';
import { Group } from '../group/group';
import { List } from '../lists/list';

const MOCK_GROUPS: Group[] = [
  { id: 'g1', title: 'Packing', items: ['Passport', 'Tickets'] },
  { id: 'g2', title: 'Documents', items: ['ID Card'] },
  { id: 'g3', title: 'Electronics', items: ['Phone', 'Charger'] },
];

const MOCK_LIST: List = {
  id: 'list1',
  title: 'Paris Trip',
  groupIds: ['g1', 'g3'],
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockListService: jasmine.SpyObj<ListService>;
  let mockGroupService: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    mockListService = jasmine.createSpyObj('ListService', [
      'getList',
      'updateListGroups',
    ]);
    mockListService.getList.and.returnValue(of({ ...MOCK_LIST, groupIds: [...MOCK_LIST.groupIds] }));
    mockListService.updateListGroups.and.returnValue(of(undefined));

    mockGroupService = jasmine.createSpyObj('GroupService', ['getGroups']);
    mockGroupService.getGroups.and.returnValue(
      of(MOCK_GROUPS.map((g) => ({ ...g, items: [...g.items] })))
    );

    await TestBed.configureTestingModule({
      imports: [ListComponent, MatDialogModule, MatListModule, MatIconModule],
      providers: [
        { provide: ListService, useValue: mockListService },
        { provide: GroupService, useValue: mockGroupService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 'list1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- ngOnInit / loading ---

  it('should load all groups on init', () => {
    expect(mockGroupService.getGroups).toHaveBeenCalled();
    expect(component.allGroups.length).toBe(3);
  });

  it('should load the list from route param on init', () => {
    expect(mockListService.getList).toHaveBeenCalledWith('list1');
    expect(component.list).toBeDefined();
    expect(component.list!.title).toBe('Paris Trip');
  });

  // --- updateDisplayedGroups ---

  it('should filter groups to only those in the list groupIds', () => {
    expect(component.groups.length).toBe(2);
    expect(component.groups.map((g) => g.id)).toEqual(['g1', 'g3']);
  });

  it('should not include groups not referenced by the list', () => {
    const ids = component.groups.map((g) => g.id);
    expect(ids).not.toContain('g2');
  });

  it('should set groups to empty when list has no groupIds', () => {
    component.list = { id: 'list2', title: 'Empty', groupIds: [] };
    component.allGroups = [...MOCK_GROUPS];
    component['updateDisplayedGroups']();
    expect(component.groups.length).toBe(0);
  });

  it('should not update groups when list is undefined', () => {
    component.list = undefined;
    component.allGroups = [...MOCK_GROUPS];
    component.groups = [];
    component['updateDisplayedGroups']();
    expect(component.groups.length).toBe(0);
  });

  it('should not update groups when allGroups is empty', () => {
    component.allGroups = [];
    component.groups = [];
    component['updateDisplayedGroups']();
    expect(component.groups.length).toBe(0);
  });

  // --- openDialogAddGroup ---

  it('should open dialog and merge selected group ids on confirm', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(['g2']));
    spyOn(component.dialog, 'open').and.returnValue(dialogRef);

    component.openDialogAddGroup();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(mockListService.updateListGroups).toHaveBeenCalledWith(
      'list1',
      ['g1', 'g3', 'g2']
    );
  });

  it('should deduplicate group ids when merging', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(['g1', 'g3']));
    spyOn(component.dialog, 'open').and.returnValue(dialogRef);

    component.openDialogAddGroup();

    expect(mockListService.updateListGroups).toHaveBeenCalledWith(
      'list1',
      ['g1', 'g3']
    );
  });

  it('should not update when dialog is cancelled', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(undefined));
    spyOn(component.dialog, 'open').and.returnValue(dialogRef);

    component.openDialogAddGroup();

    expect(component.dialog.open).toHaveBeenCalled();
    expect(mockListService.updateListGroups).not.toHaveBeenCalled();
  });

  it('should not update when list is undefined', () => {
    component.list = undefined;
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(['g2']));
    spyOn(component.dialog, 'open').and.returnValue(dialogRef);

    component.openDialogAddGroup();

    expect(mockListService.updateListGroups).not.toHaveBeenCalled();
  });

  it('should pass allGroups to the dialog data', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(undefined));
    const openSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRef);

    component.openDialogAddGroup();

    const dialogConfig = openSpy.calls.mostRecent().args[1];
    expect(dialogConfig!.data).toEqual({ allGroups: component.allGroups });
  });

  // --- route param handling ---

  it('should not call getList when route param id is null', async () => {
    mockListService.getList.calls.reset();

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ListComponent, MatDialogModule, MatListModule, MatIconModule],
      providers: [
        { provide: ListService, useValue: mockListService },
        { provide: GroupService, useValue: mockGroupService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }),
          },
        },
      ],
    }).compileComponents();

    const f = TestBed.createComponent(ListComponent);
    f.detectChanges();

    expect(mockListService.getList).not.toHaveBeenCalled();
  });
});
