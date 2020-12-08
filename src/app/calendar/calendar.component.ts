import {Component, ElementRef, ViewChild} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { ContentEventService } from '../../../flotiq';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild('modalContent', { static: true }) modalContent: ElementRef;

  constructor(
    private eventService: ContentEventService,
    private modalService: NgbModal
    ) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),
    events: this.getEvents.bind(this)
  };

  getEvents(info, successCallback, failureCallback): void {
    const filters = JSON.stringify({
      date: {
        type: 'inRange',
        filter: info.start,
        filter2: info.end
      }
    });
    this.eventService.listEvent(1, 1000, 'date', 'asc', 0, filters).subscribe((events) => {
      successCallback(events.data.map((event) => ({
        title: event.name,
        start: event.date,
        extendedProps: event
      })));
    }, (error => {
      failureCallback(error);
    }));
  }

  handleEventClick(calendarEvent): void {
    const modalRef = this.modalService.open(ModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });
    modalRef.componentInstance.calendarEvent = calendarEvent;
  }

}
