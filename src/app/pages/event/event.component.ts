import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../../flotiq';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {EventService} from './event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Event;
  eventDescriptionHtml: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventService.findBySlug(params.get('slug'))
        .subscribe((events) => {
          this.event = events.data[0];
          this.eventDescriptionHtml = this.event.description ? this.sanitizer.bypassSecurityTrustHtml(this.event.description) : '';
        });
    });
  }

  getImageUrl(image, size = '1920x0'): string {
    return `https://api.flotiq.com/image/${size}/${image.id}.${image.extension}`;
  }

}
