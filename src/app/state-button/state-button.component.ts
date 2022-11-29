import { Component, EventEmitter, Input, Output } from '@angular/core';

type StateType = 'default' | 'done' | 'working';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html'
})
export class StateButtonComponent {
  protected state: StateType = 'default';

  @Input() disabled: boolean;
  @Output() onClick = new EventEmitter<undefined>();

  complete() {
    this.state = 'done';
    setTimeout(() => this.state = 'default', 500);
  }

  protected click() {
    this.state = 'working';
    this.onClick.emit();
  }

  protected getClass() {
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
