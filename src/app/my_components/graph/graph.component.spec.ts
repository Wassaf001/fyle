import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';
import { GraphComponent } from './graph.component';
import { ChangeDetectorRef } from '@angular/core';
import { UserData } from '../pages/pages.component';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;
  let changeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    const workoutServiceSpy = jasmine.createSpyObj('WorkoutService', ['getUsers', 'updateUserWorkouts']);
    const changeDetectorRefSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      declarations: [GraphComponent],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceSpy },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    changeDetectorRef = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data on ngOnInit', () => {
    const mockUsers: UserData[] = [{ 
      id: 1, 
      name: 'Test', 
      workouts: [], 
      numberOfWorkouts: 0, 
      totalWorkoutMinutes: 0 
    }];
    const mockWorkoutData = { username: 'Test', workoutType: 'Running', workoutMinutes: 30 };
    workoutService.getUsers.and.returnValue(mockUsers);
    workoutService.updateUserWorkouts.and.returnValue(of({ username: 'Test', workoutType: 'Running', workoutMinutes: 30 }));

    component.ngOnInit();

    expect(workoutService.getUsers).toHaveBeenCalled();
    expect(workoutService.updateUserWorkouts).toHaveBeenCalledWith(mockWorkoutData.username, { type: mockWorkoutData.workoutType, minutes: mockWorkoutData.workoutMinutes });
    expect(changeDetectorRef.detectChanges).toHaveBeenCalled();
  });
});