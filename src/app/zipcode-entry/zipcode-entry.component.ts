import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateButtonComponent } from 'app/state-button/state-button.component';
import { LocationService } from '../location.service';

import COUNTRIES from 'assets/country-codes.json';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {
  @ViewChild(StateButtonComponent) stateButton!: StateButtonComponent;

  countries = COUNTRIES.map(c => c.name);

  form = new FormGroup({
    zip: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required)
  });

  constructor(private service: LocationService) { }

  async addLocation() {
    const { zip, country } = this.form.value;
    const code = COUNTRIES.find(c => c.name === country)?.code;

    try {
      await this.service.addLocation(zip, code);
      this.form.reset();
    } catch (error) {
      alert('Zipcode and country combination not found!')
    } finally {
      this.stateButton.complete();
    }
  }
}
