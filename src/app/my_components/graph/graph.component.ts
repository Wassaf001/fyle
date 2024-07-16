import { Component, OnInit } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { ChartModule } from 'primeng/chart';
import { WorkoutService } from '../../services/workout.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User{
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [MatRippleModule, MatTableModule, ChartModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit{
  displayedColumns: string[] = ['name'];
  dataSource : any;
  chartLabels: any;
  chartData: any;
  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
   this.dataSource = this.workoutService.getUsers();
   this.chartLabels = this.getWorkoutTypes();
   this.chartData = this.getChartData();
   this.workoutService.workoutData$.subscribe(data => {
  if (data) {
    this.workoutService.updateUserWorkouts(data.username, { type: data.workoutType, minutes: data.workoutMinutes });
    this.dataSource = this.workoutService.getUsers();
    this.chartLabels = this.getWorkoutTypes();
    this.updateChartData();
  }
});
  }
  
  getWorkoutTypes() {
    const types = new Set();
    this.dataSource.forEach((user:User) => user.workouts.forEach((workout: Workout) => types.add(workout.type)));
    return Array.from(types);
  }

  getWorkoutMinutes(user: any, labels: string[]) {
    const minutes: { [key: string]: number } = {}; 
    user.workouts.forEach((workout: Workout) => {
      minutes[workout.type] = (minutes[workout.type] || 0) + workout.minutes;
    });
    return labels.map(type => minutes[type] || 0);
  }

  getChartData() {
    return {
      labels: this.chartLabels,
      datasets: this.dataSource.slice(0, 5).map((user:User) => ({
        label: user.name,
        data: this.getWorkoutMinutes(user, this.chartLabels as string[]),
        fill: false,
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
      }))
    };
  }

  onHeaderClicked() {
    this.chartData = {
      labels: this.chartLabels,
      datasets: this.dataSource.map((user: User) => ({
        label: user.name,
        data: this.getWorkoutMinutes(user, this.chartLabels as string[]),
        fill: false,
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
      }))
    };
  }

  selectedRow: any;
  onRowClicked(row: any) {
    this.selectedRow = row;
    this.chartData = {
      labels: this.chartLabels,
      datasets: [{
        label: row.name,
        data: this.getWorkoutMinutes(row, this.chartLabels as string[]),
        fill: false,
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      }]
    };
  }

  updateChartData() {
    this.chartData = {
      labels: this.chartLabels,
      datasets: this.dataSource.map((user: User) => ({
        label: user.name,
        data: this.getWorkoutMinutes(user, this.chartLabels as string[]),
        fill: false,
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16), 
      }))
    };
  }
}