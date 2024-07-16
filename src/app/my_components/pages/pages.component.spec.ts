import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [PagesComponent],
  exports: [PagesComponent]
})
class TestModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    const workoutServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([])),
      workoutData$: of(null),
      updateUserWorkouts: jasmine.createSpy('updateUserWorkouts')
    };

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        TestModule // import TestModule instead of declaring PagesComponent
      ],
      providers: [
        { provide: WorkoutService, useValue: workoutServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter', () => {
    const event = { target: { value: 'test' } };
    component.applyFilter(event as any);
    expect(component.dataSource.filter).toBe('test');
  });

  it('should filter by workout type', () => {
    const workoutType = 'Running';
    component.filterByWorkoutType(workoutType);
    expect(workoutService.getUsers).toHaveBeenCalled();
  });

  it('should update user workouts on workout data change', () => {
    const data = { username: 'John', workoutType: 'Running', workoutMinutes: 30 };
    workoutService.workoutData$ = of(data);
    component.ngAfterViewInit();
    expect(workoutService.updateUserWorkouts).toHaveBeenCalledWith(data.username, { type: data.workoutType, minutes: data.workoutMinutes });
  });
});