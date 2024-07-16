import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update workout data', () => {
    const data = { username: 'John Doe', workoutType: 'Running', workoutMinutes: 30 };
    service.updateWorkoutData(data);
    service.workoutData$.subscribe(updatedData => {
      expect(updatedData).toEqual(data);
    });
  });

  it('should return users', () => {
    const users = service.getUsers();
    expect(users.length).toBe(3);
  });

 it('should update existing user workouts', () => {
    const workout = { type: 'Running', minutes: 35 };
    service.updateUserWorkouts('John Doe', workout);
    const updatedUser = service.getUsers().find(user => user.name === 'John Doe');
    expect(updatedUser).toBeDefined();
    const foundWorkout = updatedUser?.workouts.find(w => w.type === 'Running');
    expect(foundWorkout).toBeDefined();
    expect(foundWorkout?.minutes).toBe(35);
});

it('should add new workout to existing user', () => {
    const workout = { type: 'Swimming', minutes: 30 };
    service.updateUserWorkouts('John Doe', workout);
    const updatedUser = service.getUsers().find(user => user.name === 'John Doe');
    expect(updatedUser).toBeDefined();
    const foundWorkout = updatedUser?.workouts.find(w => w.type === 'Swimming');
    expect(foundWorkout).toBeDefined();
    expect(foundWorkout?.minutes).toBe(30);
});
  it('should add new user', () => {
    const workout = { type: 'Running', minutes: 30 };
    service.updateUserWorkouts('New User', workout);
    const newUser = service.getUsers().find(user => user.name === 'New User');
    expect(newUser).toBeTruthy();
  });
});