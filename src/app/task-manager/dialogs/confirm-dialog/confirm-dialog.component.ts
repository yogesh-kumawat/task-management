import {
  ChangeDetectionStrategy,
  Component,
Input,
Output,
EventEmitter
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'confirm-dialog',
  styleUrls: ['confirm-dialog.component.scss'],
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Input() public title: string;
  @Output() isDelete: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  deleteClick() {
    this.isDelete.emit(true);
    this.activeModal.close();
  }
}
