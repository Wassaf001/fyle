import {Component, Output, EventEmitter, signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [DropdownModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule ,MatButtonModule, MatDividerModule, CommonModule, MatIconModule, MatOption, MatSelect, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Output() workoutAdded = new EventEmitter<{username: string, workoutType: string, workoutMinutes: number}>();
  constructor(private workoutService: WorkoutService) { }
  
  errorMessageName = new BehaviorSubject<string>('');
  errorMessageType = new BehaviorSubject<string>('');
  errorMessageMinutes = new BehaviorSubject<string>('');
  readonly usernameControl = new FormControl('', [Validators.required]);
  readonly workoutTypeControl = new FormControl('', [Validators.required]);
  readonly workoutMinutesControl = new FormControl('', [Validators.required]);
  updateErrorMessageinName() {
    if (this.usernameControl.hasError('required')) {
      this.errorMessageName.next('You must enter a value');
    } else {
      this.errorMessageName.next('');
    }
  }
  updateErrorMessageinWorkout() {
    if (this.workoutTypeControl.hasError('required')) {
      this.errorMessageType.next('You must select a value');
    } else {
      this.errorMessageType.next('');
    }
  }
  updateErrorMessageinMinutes() {
    if (this.workoutMinutesControl.hasError('required')) {
      this.errorMessageMinutes.next('You must enter a value');
    } else if (!/^[0-9]{1,2}$/.test(this.workoutMinutesControl.value || '')) {
      this.errorMessageMinutes.next('Input must be a number <= 99');
    } else {
      this.errorMessageMinutes.next('');
    }
}
  addWorkout(username: string, workoutType: string, workoutMinutes: number) {
    console.log(`Adding workout: username=${username}, workoutType=${workoutType}, workoutMinutes=${workoutMinutes}`);
    this.workoutAdded.emit({username, workoutType, workoutMinutes});
    this.workoutService.updateWorkoutData({username, workoutType, workoutMinutes});
  }
}
