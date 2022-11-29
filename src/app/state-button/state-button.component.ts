import { Component, EventEmitter, Output } from '@angular/core';

type StateType = 'default' | 'done' | 'working';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html'
})
export class StateButtonComponent {
  state: StateType = 'default';

  @Output() onClick = new EventEmitter<undefined>();

  click() {
    this.state = 'working';
    this.onClick.emit();
  }

  complete() {
    this.state = 'done';
    setTimeout(() => this.state = 'default', 500);
  }

  getClass() {
    switch (this.state) {
      case 'default':
        return 'btn btn-primary';
      case 'done':
        return 'btn btn-success';
      case 'working':
        return 'btn btn-info';
    }
  }
}
