import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workout } from '../my_components/pages/pages.component';
import { UserData } from '../my_components/pages/pages.component';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutData = new BehaviorSubject<{ username: string, workoutType: string, workoutMinutes: number } | null>(null);
  workoutData$ = this.workoutData.asObservable();

  private users: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ],
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 75
    },
    {
      id: 2,
      name: 'Jane Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Swimming', minutes: 30 }
      ],
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 60
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ],
      numberOfWorkouts: 2,
      totalWorkoutMinutes: 90
    }
  ];

  updateWorkoutData(data: { username: string, workoutType: string, workoutMinutes: number }) {
    this.workoutData.next(data);
  }

  getUsers() {
    return this.users;
  }

  updateUserWorkouts(username: string, workout: Workout) {
  let user = this.users.find(user => user.name === username);
  if (user) {
    let existingWorkout = user.workouts.find(w => w.type === workout.type);
    if (existingWorkout) {
      if (existingWorkout.minutes !== workout.minutes) {
        user.totalWorkoutMinutes -= existingWorkout.minutes; 
        existingWorkout.minutes = workout.minutes; 
        user.totalWorkoutMinutes += workout.minutes; 
      }
    } else {
      user.workouts.push(workout);
      user.totalWorkoutMinutes += workout.minutes;
    }
    user.numberOfWorkouts = user.workouts.length;
  } else {
    user = {
      id: this.users.length + 1,
      name: username,
      workouts: [workout],
      numberOfWorkouts: 1,
      totalWorkoutMinutes: workout.minutes
    };
    this.users.push(user);
  }
}
}