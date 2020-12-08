import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() public calendarEvent;

  constructor(
    private router: Router,
    private activeModal: NgbActiveModal
  ) {  }

  closeModal(): void {
    this.activeModal.close('Save click');
  }
}
