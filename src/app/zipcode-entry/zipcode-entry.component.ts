import { Component, ViewChild } from '@angular/core';
import { StateButtonComponent } from 'app/state-button/state-button.component';
import { LocationService } from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
  @ViewChild(StateButtonComponent) stateButton!: StateButtonComponent;

  constructor(private service: LocationService) { }

  addLocation(zipcode: string) {
    this.service.addLocation(zipcode).then(() => this.stateButton.complete());
  }
}
