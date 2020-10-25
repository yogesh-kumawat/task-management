import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-input',
  styleUrls: ['./edit-input.component.scss'],
  templateUrl: './edit-input.component.html',
})
export class EditInputComponent implements OnInit {
  @Input() data: any;
  @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
  editMode = false;
  constructor() {}
  input = new FormControl('', Validators.required);

  ngOnInit() {
    this.input.setValue(this.data);
  }

  onFocusOut() {
    if (!this.input.invalid) {
      this.focusOut.emit(this.input.value);
    } else {
      this.input.setValue(this.data);
    }
  }
}
