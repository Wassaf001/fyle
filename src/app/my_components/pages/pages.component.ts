import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatorModule } from 'primeng/paginator';
import { MatSelectModule } from '@angular/material/select';
import { InputComponent } from '../input/input.component';
import { ChangeDetectorRef } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

export interface Workout {
  type: string;
  minutes: number;
}

export interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, PaginatorModule, CommonModule, MatSelectModule],
})
export class PagesComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'workouts', 'numberOfWorkouts', 'totalWorkoutMinutes'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  constructor(private workoutService: WorkoutService, private cd: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.workoutService.getUsers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
    this.workoutService.workoutData$.subscribe(data => {
      if (data !== null) {
        const { username, workoutType, workoutMinutes } = data;
        this.workoutService.updateUserWorkouts(username, { type: workoutType, minutes: workoutMinutes });
        this.dataSource.data = this.workoutService.getUsers();
        this.cd.detectChanges();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByWorkoutType(workoutType: string) {
    if (workoutType === 'All') {
      this.dataSource.data = this.workoutService.getUsers();
    } else {
      this.dataSource.data = this.workoutService.getUsers().filter(user => user.workouts.some(workout => workout.type === workoutType));
    }
  }
}
