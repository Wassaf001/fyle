import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() toggleView = new EventEmitter<boolean>();

  toggle(event: any) {
    const isTable = event.value === 'table';
    this.toggleView.emit(isTable);
    console.log("toggleView emitted: " + isTable); 
  }
}
