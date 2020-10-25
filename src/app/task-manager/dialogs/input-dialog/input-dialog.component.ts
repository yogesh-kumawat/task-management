import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'input-dialog',
  styleUrls: ['input-dialog.component.scss'],
  templateUrl: './input-dialog.component.html',
})
export class InputDialogComponent {
  @Input() public title: string;
  @Output() public save: EventEmitter<any> = new EventEmitter();
  set initialValue(value: string) {
    this.input.setValue(value);
  }
  public input = new FormControl('', [
    Validators.required,
    Validators.pattern(/([\S]+[\s]*)*[\S]+/), // Accept non-whitespace text on both ends
  ]);
  constructor(public activeModal: NgbActiveModal) {}

  create() {
    this.save.emit(this.input.value);
    this.activeModal.close();
  }

  isFilterValid() {
    return true;
  }

}
