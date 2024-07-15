import { Component } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';

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

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [MatRippleModule, MatTableModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  displayedColumns: string[] = ['name'];
  dataSource = users; 
}
