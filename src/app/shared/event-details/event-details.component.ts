import {Component, Input} from '@angular/core';
import {Event} from '../../../../flotiq';
import {faClock, faMapMarker} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {

  @Input() event: Event;
  @Input() padded = true;

  faClock = faClock;
  faMapMarker = faMapMarker;

}
