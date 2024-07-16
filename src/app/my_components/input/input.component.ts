import {Component, Output, EventEmitter} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatOption } from '@angular/material/select';
import { MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [DropdownModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule ,MatButtonModule, MatDividerModule, CommonModule, MatIconModule, MatOption, MatSelect],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Output() workoutAdded = new EventEmitter<{username: string, workoutType: string, workoutMinutes: number}>();
  constructor(private workoutService: WorkoutService) { }
  addWorkout(username: string, workoutType: string, workoutMinutes: number) {
    console.log(`Adding workout: username=${username}, workoutType=${workoutType}, workoutMinutes=${workoutMinutes}`);
    this.workoutAdded.emit({username, workoutType, workoutMinutes});
    this.workoutService.updateWorkoutData({username, workoutType, workoutMinutes});
  }
}
