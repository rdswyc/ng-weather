import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

type Option = { label: string; value: string };

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutoFilterComponent), multi: true }
  ]
})
export class AutoFilterComponent implements ControlValueAccessor {
  @HostBinding('style.display') display = 'inherit';

  private _options: Option[];
  @Input() set options(value: string[]) {
    this._options = value.map(v => ({ label: v.toUpperCase(), value: v }));
  };
  @Input() placeholder: string;

  protected active = new Subject<boolean>();
  protected control = new FormControl('');
  protected onChange: (value: string) => void;
  protected onTouched: (event: Event) => void;

  controlOptions$ = combineLatest([
    this.active,
    this.control.valueChanges.pipe(startWith(''))
  ]).pipe(
    debounceTime(300),
    map(([active, value]) => active ? value?.toUpperCase() : null),
    map(value => ({ options: this._options.filter(o => o.label.includes(value)), value })),
    map(res => res.options.map(o => ({ value: o.value, html: o.label.replace(res.value, `<strong>${res.value}</strong>`) }))),
    map(options => options.slice(0, 8))
  );

  blur(event: Event) {
    this.active.next(false);
    if (this.onTouched) this.onTouched(event);
  }

  select(item: string) {
    this.control.reset(item);
    if (this.onChange) this.onChange(item);
  }

  registerOnChange(fn: (v: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (e: Event) => void) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.control.disable() : this.control.enable();
  }

  writeValue(value: string) {
    const option = this._options.find(o => o.label === value?.toUpperCase());
    if (option) this.control.setValue(option.value);
    else this.control.reset('');
  }
}
