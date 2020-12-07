import { Injectable } from '@angular/core';
import {ContentEventService, EventList} from '../../../../flotiq';
import {Observable} from 'rxjs';
import { TransferStateService } from '@scullyio/ng-lib';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private eventService: ContentEventService,
    private transferService: TransferStateService
    ) { }


  findBySlug(slug): Observable<EventList> {
    const slugFilter = {
      slug: {
        type: 'equals',
        filter: slug
      }
    };

    return this.transferService.useScullyTransferState(
      `event-${slug}`,
      this.eventService.listEvent(
        1,
        1,
        'id',
        'asc',
        1,
        JSON.stringify(slugFilter)
      )
    );
  }
}
