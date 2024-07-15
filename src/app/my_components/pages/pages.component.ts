import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {PaginatorModule} from 'primeng/paginator';
import { MatSelectModule } from '@angular/material/select';
import { InputComponent } from '../input/input.component';

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
  @ViewChild(InputComponent) inputComponent: InputComponent | undefined; 

  originalData: UserData[] = [];

  constructor() {
    const users = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Swimming', minutes: 30 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      },
      {
        id: 4,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      },
      {
        id: 5,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      },
      {
        id: 6,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      },
      {
        id: 7,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
    ];

    // 
    this.originalData = users.map(user => ({
      ...user,
      numberOfWorkouts: user.workouts.length,
      totalWorkoutMinutes: user.workouts.reduce((total, workout) => total + workout.minutes, 0)
    }));
    this.dataSource = new MatTableDataSource(this.originalData);
  }

  ngOnInit() {
    this.inputComponent?.workoutAdded.subscribe(({username, workoutType, workoutMinutes}) => {
      console.log(`Received workout: username=${username}, workoutType=${workoutType}, workoutMinutes=${workoutMinutes}`); 
      const user = this.dataSource.data.find(user => user.name === username);
      if (user) {
        console.log('User before adding workout:', user); 
        user.workouts.push({ type: workoutType, minutes: workoutMinutes });
        user.numberOfWorkouts++;
        user.totalWorkoutMinutes += workoutMinutes;
        console.log('User after adding workout:', user); 
        this.dataSource._updateChangeSubscription();
      }
      else{
        console.log(`User not found: username=${username}`);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator || null;
    this.dataSource.sort = this.sort || null;
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
      this.dataSource.data = this.originalData;
    } else {
      this.dataSource.data = this.originalData.filter(user => user.workouts.some(workout => workout.type === workoutType));
    }
  }
}