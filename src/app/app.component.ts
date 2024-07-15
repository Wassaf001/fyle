import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "./my_components/input/input.component";
import { PagesComponent } from "./my_components/pages/pages.component";
import { FilterComponent } from "./my_components/filter/filter.component";
import { GraphComponent } from './my_components/graph/graph.component';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, PagesComponent, FilterComponent, GraphComponent, CommonModule, MatButtonToggleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fyle';
  wasTable: boolean = true;

  toggleView(isTable: boolean) {
    console.log("toggleView received: " + isTable);
    console.log("isTable state before update: " + this.wasTable);
    this.wasTable = isTable;
    console.log("isTable state updated: " + this.wasTable);
  }
}
